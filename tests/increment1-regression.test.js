import test from "node:test";
import assert from "node:assert/strict";
import {createRun,move,travel,terminal,cut,collect,extract,returnCost,validateRun,known} from "../src/engine.js";

test("a saved expedition retains location, oxygen, salvage and discovery after JSON round-trip",()=>{
  const s=createRun(1);
  move(s,2,4);move(s,3,4);
  terminal(s);
  const restored=JSON.parse(JSON.stringify(s));
  assert.equal(validateRun(restored),true);
  assert.deepEqual(restored,s);
  assert.equal(restored.oxygen,37);
  assert.equal(restored.door.open,true);
  assert.equal(returnCost(restored),2);
});

test("travel to a known distant tile stops on newly discovered tiles",()=>{
  const s=createRun(1);
  move(s,2,4);move(s,3,4);
  const before=s.oxygen;
  assert.equal(travel(s,1,4),true);
  assert.equal(s.x,1);
  assert.equal(s.oxygen,before-2);
});

test("cannot pass closed bulkhead, and opening it costs resources",()=>{
  const s=createRun(1);
  for(const x of [2,3,4])move(s,x,4);
  assert.equal(move(s,5,4),false);
  const before=s.oxygen;
  assert.equal(cut(s),true);
  assert.equal(s.oxygen,before-2);
  assert.equal(move(s,5,4),true);
});

test("cargo and completed extraction persist in serialized state",()=>{
  const s=createRun(1);
  s.x=2;s.y=2;
  assert.equal(collect(s,"data"),true);
  s.x=s.dock.x;s.y=s.dock.y;
  assert.equal(extract(s),true);
  const restored=JSON.parse(JSON.stringify(s));
  assert.equal(validateRun(restored),true);
  assert.equal(restored.phase,"extracted");
  assert.deepEqual(restored.cargo,["data"]);
});

test("zero oxygen away from dock ends the expedition",()=>{
  const s=createRun(1);
  s.oxygen=1;
  assert.equal(move(s,2,4),true);
  assert.equal(s.phase,"failed");
  assert.equal(move(s,3,4),false);
});

test("unknown tiles do not become known after serialization alone",()=>{
  const s=createRun(1);
  assert.equal(known(s,8,7),false);
  const restored=JSON.parse(JSON.stringify(s));
  assert.equal(known(restored,8,7),false);
});
