import {Application,Container,Graphics,Text} from "pixi.js";
import {createRun,validateRun,tileAt,known,passable,returnCost,cargoUsed,travel,cut,terminal,collect,extract} from "./engine.js";
import "./style.css";
const SAVE_KEY="derelict-salvagers-v1";
const LAST_KEY="derelict-salvagers-last-valid-v1";
const $=id=>document.getElementById(id);
function load(){
  for(const key of [SAVE_KEY,LAST_KEY]){
    try{const raw=localStorage.getItem(key);if(!raw)continue;const data=JSON.parse(raw);if(validateRun(data))return data;}catch(e){console.warn("Save load failed:",e);}
  }
  return createRun(1);
}
let state=load(),pixi,scene;
function save(){
  try{
    const serialized=JSON.stringify(state);
    // Keep the previously committed valid state as a recovery checkpoint.
    const old=localStorage.getItem(SAVE_KEY);
    if(old){try{if(validateRun(JSON.parse(old)))localStorage.setItem(LAST_KEY,old);}catch{}}
    localStorage.setItem(SAVE_KEY,serialized);
  }catch(e){$("message").textContent="Storage unavailable: this run may not survive reload.";console.warn(e);}
}
function action(fn){fn();save();render();}
function near(p){return Math.abs(state.x-p.x)+Math.abs(state.y-p.y)===1;}
function makeButton(label,fn){const b=document.createElement("button");b.type="button";b.textContent=label;b.addEventListener("click",()=>action(fn));$("actions").appendChild(b);}
function render(){
  $("oxygen").textContent=state.oxygen;
  $("tool").textContent=state.tool;
  $("cargo").textContent=`${cargoUsed(state)}/${state.cargoLimit}`;
  const cost=returnCost(state);
  $("return").textContent=`Known return: ${cost===null?"unavailable":cost+" oxygen"}`;
  $("reserve").textContent=`Reserve: ${cost===null?"unknown":state.oxygen-cost}`;
  $("message").textContent=state.message;
  $("actions").replaceChildren();
  const salvage=state.items.filter(i=>!i.collected&&i.x===state.x&&i.y===state.y);
  if(state.phase!=="exploring"){
    $("context-title").textContent=state.phase==="extracted"?"Extraction complete":"Expedition failed";
    $("context").textContent=state.phase==="extracted"?"Recovered: "+(state.cargo.map(id=>state.items.find(i=>i.id===id)?.name).join(", ")||"no cargo"):"The operator ran out of oxygen.";
  }else{
    $("context-title").textContent="Expedition controls";
    $("context").textContent="Tap the map to move. Actions appear when nearby. Your shuttle is the blue tile.";
    if(near(state.door)&&!state.door.open)makeButton("Cut bulkhead · 2 O₂ + 2 tool",()=>cut(state));
    if(near(state.terminal)&&!state.terminal.used)makeButton("Restore circuit · 1 O₂",()=>terminal(state));
    for(const item of salvage)makeButton(`Collect ${item.name} · ${item.size} cargo`,()=>collect(state,item.id));
    if(state.x===state.dock.x&&state.y===state.dock.y)makeButton("Extract to shuttle",()=>extract(state));
  }
  draw();
}
function draw(){
  if(!scene)return;
  scene.removeChildren().forEach(child=>child.destroy({children:true}));
  const TILE=40;
  for(const tile of state.tiles){
    const isKnown=known(state,tile.x,tile.y);
    const wall=tile.type==="wall";
    const g=new Graphics().rect(tile.x*TILE+1,tile.y*TILE+1,TILE-2,TILE-2).fill(!isKnown?0x101a25:wall?0x172b37:tile.type==="bulkhead"&&!state.door.open?0x94694d:0x354b57);
    g.eventMode="static";g.cursor="pointer";
    g.on("pointertap",()=>action(()=>travel(state,tile.x,tile.y)));
    scene.addChild(g);
    if(!isKnown)continue;
    let symbol="";
    let color=0xd8e8ec;
    if(tile.x===state.dock.x&&tile.y===state.dock.y){symbol="⌂";color=0x73c8ed;}
    if(tile.x===state.terminal.x&&tile.y===state.terminal.y){symbol="T";color=0xb1db83;}
    if(tile.type==="bulkhead"&&!state.door.open){symbol="▥";color=0xf0bd82;}
    const item=state.items.find(i=>!i.collected&&i.x===tile.x&&i.y===tile.y);
    if(item){symbol="◆";color=0xf1d581;}
    if(tile.x===state.x&&tile.y===state.y){symbol="●";color=0xffffff;}
    if(symbol){
      const t=new Text({text:symbol,style:{fontFamily:"Arial,sans-serif",fontSize:22,fill:color,fontWeight:"bold"}});
      t.anchor.set(.5);t.position.set(tile.x*TILE+TILE/2,tile.y*TILE+TILE/2);scene.addChild(t);
    }
  }
}
async function start(){
  pixi=new Application();
  await pixi.init({width:400,height:360,background:0x101a25,antialias:false,resolution:Math.min(window.devicePixelRatio||1,2),autoDensity:true});
  $("map").appendChild(pixi.canvas);
  scene=new Container();pixi.stage.addChild(scene);
  $("reset").addEventListener("click",()=>{
    if(!confirm("Replace the current expedition with a new one?"))return;
    action(()=>{state=createRun((state.seed%100000)+1);});
  });
  render();
}
start().catch(err=>{$("message").textContent="Rendering could not start. Check PixiJS installation and browser compatibility.";console.error(err);});
