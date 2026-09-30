const {test}=require('node:test');
const assert=require('node:assert/strict');
const F=require('../core.js');
const C=require('../endurance-circuits.js');
const stateWith=entries=>({...F.emptyState(),sessions:[{id:'circuit-result',axis:'endurance',date:F.today(),duration:20,rpe:7,notes:'Circuit result',entries}]});
test('circuit rounds remain sets, keeping endurance personal records per set',()=>{
  const entries=C.resultEntries('push','standard',3);
  const state=F.validateState(stateWith(entries));
  assert.equal(F.best(state,'endurance','push-up'),12);
  assert.equal(entries.reduce((n,e)=>n+e.sets*e.reps,0),108);
});
test('Cindy records whole rounds and ordered partial reps without inventing completed work',()=>{
  const entries=C.resultEntries('cindy','standard',5,[5,7,0]);
  assert.deepEqual(entries,[{exercise:'pull-up',sets:5,reps:5},{exercise:'push-up',sets:5,reps:10},{exercise:'squat',sets:5,reps:15},{exercise:'pull-up',sets:1,reps:5},{exercise:'push-up',sets:1,reps:7}]);
  const state=F.validateState(stateWith(entries));
  assert.equal(entries.reduce((n,e)=>n+e.sets*e.reps,0),162);
  assert.equal(F.best(state,'endurance','push-up'),10);
  assert.deepEqual(C.resultEntries('cindy','beginner',0,[2,0,0]),[{exercise:'ring-row',sets:1,reps:2}]);
});
test('incomplete, out-of-order, or impossible circuit results are rejected',()=>{
  for(const args of [
    ['push','standard',0],['push','standard',1.5],['pull','unknown',3],['unknown','standard',3],
    ['cindy','standard',0],['cindy','standard',2,[0,4,0]],['cindy','standard',2,[4,10,0]],
    ['cindy','standard',2,[6,0,0]],['cindy','standard',2,[5,10,15]],['cindy','standard',2,[1]],
    ['cindy','standard',2,[NaN,0,0]],['push','standard',2,[0,0,0,0]],['push','standard',101]
  ])assert.throws(()=>C.resultEntries(...args));
});
test('assisted exercises do not replace strict personal records',()=>{
  const state=stateWith(C.resultEntries('pull','assisted',3));
  assert.equal(F.best(state,'endurance','assisted-pull-up'),4);
  assert.equal(F.best(state,'endurance','pull-up'),null);
});
test('every circuit option and cycle week survives backup round trips',()=>{
  for(const circuit of C.circuits)for(const variant of circuit.variants)for(const week of C.weeks){
    const state=stateWith(C.resultEntries(circuit.id,variant.id,week.rounds));
    assert.deepEqual(F.validateState(JSON.parse(JSON.stringify(state))),state);
  }
});
test('no-jump legs preserve separate squat efforts and total counts for both legs',()=>{
  const entries=C.resultEntries('legs','no-jump',3),state=stateWith(entries);
  assert.equal(entries.some(e=>e.exercise==='jumping-lunge'||e.exercise==='squat-jump'),false);
  assert.deepEqual(entries.filter(e=>e.exercise==='squat').map(e=>e.reps),[10,5]);
  assert.equal(F.best(state,'endurance','squat'),10);
  assert.equal(entries.reduce((n,e)=>n+e.sets*e.reps,0),105);
});
