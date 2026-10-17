// Authoritative rules only: no PixiJS, DOM, or storage imports.
export const WIDTH=10, HEIGHT=9, SAVE_VERSION=1;
const key=(x,y)=>`${x},${y}`;
const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
const inside=(x,y)=>x>=0&&y>=0&&x<WIDTH&&y<HEIGHT;
const neighbors=(x,y)=>dirs.map(([dx,dy])=>[x+dx,y+dy]).filter(([a,b])=>inside(a,b));
const dist=(a,b)=>Math.abs(a.x-b.x)+Math.abs(a.y-b.y);
const itemDefinitions=[{id:"coupling",name:"Power coupling",size:3},{id:"scrap-a",name:"Scrap bundle",size:2},{id:"scrap-b",name:"Spare components",size:2},{id:"data",name:"Survey data",size:1}];
export function createRun(seed=1){
  const doorY=seed%2?4:3;
  const tiles=[];
  for(let y=0;y<HEIGHT;y++)for(let x=0;x<WIDTH;x++){
    const floor=x>=1&&x<=8&&y>=1&&y<=7;
    tiles.push({x,y,type:!floor?"wall":x===5?(y===doorY?"bulkhead":"wall"):"floor"});
  }
  const items=itemDefinitions.map((item,i)=>({...item,x:i===0?7:i===1?3:i===2?8:2,y:i===0?doorY:i===1?6:i===2?6:2,collected:false}));
  const run={version:SAVE_VERSION,seed,phase:"exploring",oxygen:40,tool:6,cargoLimit:6,cargo:[],x:1,y:doorY,dock:{x:1,y:doorY},door:{x:5,y:doorY,open:false},terminal:{x:3,y:doorY-1,used:false},tiles,items,discovered:[],message:"Explore the wreck. Your shuttle is the blue tile."};
  reveal(run);return run;
}
export function tileAt(s,x,y){return s.tiles.find(t=>t.x===x&&t.y===y);}
export function known(s,x,y){return s.discovered.includes(key(x,y));}
export function passable(s,x,y){const t=tileAt(s,x,y);return !!t&&(t.type==="floor"||(t.type==="bulkhead"&&s.door.open));}
export function reveal(s){
  const seen=new Set(s.discovered);
  for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(inside(s.x+dx,s.y+dy))seen.add(key(s.x+dx,s.y+dy));
  s.discovered=[...seen];
}
export function shortestPath(s,from,to,knownOnly=true){
  const start=key(from.x,from.y),goal=key(to.x,to.y),queue=[[from.x,from.y]],seen=new Set([start]),prev=new Map();
  for(let i=0;i<queue.length;i++){
    const [x,y]=queue[i];if(key(x,y)===goal){
      const path=[];let cur=goal;while(cur!==start){const [a,b]=cur.split(",").map(Number);path.unshift({x:a,y:b});cur=prev.get(cur);}return path;
    }
    for(const [a,b] of neighbors(x,y)){const k=key(a,b);if(seen.has(k)||!passable(s,a,b)||(knownOnly&&!known(s,a,b)))continue;seen.add(k);prev.set(k,key(x,y));queue.push([a,b]);}
  }
  return null;
}
export function returnCost(s){const p=shortestPath(s,{x:s.x,y:s.y},s.dock);return p?p.length:null;}
export function cargoUsed(s){return s.cargo.reduce((sum,id)=>sum+(s.items.find(i=>i.id===id)?.size||0),0);}
function spend(s,oxygen,tool=0){if(s.oxygen<oxygen||s.tool<tool)return false;s.oxygen-=oxygen;s.tool-=tool;return true;}
function finishIfDepleted(s){if(s.phase==="exploring"&&s.oxygen===0){s.phase="failed";s.message="Oxygen depleted. Expedition lost.";}}
export function move(s,x,y){
  if(s.phase!=="exploring")return false;
  if(dist(s,{x,y})!==1||!passable(s,x,y)){s.message="That tile cannot be entered.";return false;}
  if(!spend(s,1)){s.message="Not enough oxygen to move.";finishIfDepleted(s);return false;}
  s.x=x;s.y=y;reveal(s);s.message="Moved one tile.";finishIfDepleted(s);return true;
}
export function travel(s,x,y){
  if(s.phase!=="exploring")return false;
  if(dist(s,{x,y})===1)return move(s,x,y);
  const path=shortestPath(s,{x:s.x,y:s.y},{x,y});if(!path){s.message="No known, passable route. Explore adjacent tiles.";return false;}
  let moved=false;
  for(const step of path){
    const count=s.discovered.length;
    if(!move(s,step.x,step.y))break;
    moved=true;
    if(s.phase!=="exploring"||s.discovered.length>count){s.message="Travel paused at a new discovery.";break;}
  }
  return moved;
}
export function cut(s){
  if(s.phase!=="exploring"||s.door.open||dist(s,s.door)!==1)return false;
  if(!spend(s,2,2)){s.message="Cutting requires 2 oxygen and 2 tool power.";return false;}
  s.door.open=true;s.message="Bulkhead cut open (2 oxygen, 2 tool).";finishIfDepleted(s);return true;
}
export function terminal(s){
  if(s.phase!=="exploring"||s.terminal.used||dist(s,s.terminal)>1)return false;
  if(!spend(s,1)){s.message="Terminal requires 1 oxygen.";return false;}
  s.terminal.used=true;s.door.open=true;s.message="Power restored. Bulkhead unlocked (1 oxygen).";finishIfDepleted(s);return true;
}
export function collect(s,id){
  if(s.phase!=="exploring")return false;
  const item=s.items.find(i=>i.id===id&&!i.collected&&i.x===s.x&&i.y===s.y);
  if(!item)return false;
  if(cargoUsed(s)+item.size>s.cargoLimit){s.message="Not enough cargo space. Leave something behind.";return false;}
  if(!spend(s,1)){s.message="Salvage requires 1 oxygen.";return false;}
  item.collected=true;s.cargo.push(item.id);s.message=`Recovered ${item.name} (${item.size} spaces).`;finishIfDepleted(s);return true;
}
export function extract(s){
  if(s.phase!=="exploring"||s.x!==s.dock.x||s.y!==s.dock.y){s.message="Return to the shuttle docking tile to extract.";return false;}
  s.phase="extracted";s.message=`Extraction complete. ${s.cargo.length} salvage items recovered.`;return true;
}
export function validateRun(s){
  if(!s||s.version!==SAVE_VERSION||!Number.isInteger(s.seed)||!["exploring","failed","extracted"].includes(s.phase))return false;
  if(!Number.isInteger(s.x)||!Number.isInteger(s.y)||!inside(s.x,s.y)||!Array.isArray(s.tiles)||s.tiles.length!==WIDTH*HEIGHT||!Array.isArray(s.discovered)||!Array.isArray(s.items)||!Array.isArray(s.cargo))return false;
  if(!Number.isInteger(s.oxygen)||s.oxygen<0||s.oxygen>40||!Number.isInteger(s.tool)||s.tool<0||s.tool>6||s.cargoLimit!==6)return false;
  if(!s.dock||!s.door||!s.terminal||typeof s.door.open!=="boolean"||typeof s.terminal.used!=="boolean")return false;
  if(!passable(s,s.x,s.y)||s.cargo.some(id=>!s.items.some(i=>i.id===id&&i.collected))||cargoUsed(s)>s.cargoLimit)return false;
  return true;
}
