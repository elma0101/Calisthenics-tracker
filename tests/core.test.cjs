const {test}=require('node:test');
const assert=require('node:assert/strict');
const F=require('../core.js');
const session=(axis,entries,id='s1')=>({id,axis,date:F.today(),duration:40,rpe:7,notes:'',entries});
test('empty journal and demo pass the backup validator',()=>{assert.deepEqual(F.validateState(F.emptyState()),F.emptyState());assert.equal(F.validateState(F.makeDemo()).sessions.length,32);});
test('skill records and goals never mix variations',()=>{const state=F.emptyState();state.sessions=[session('skills',[{exercise:'handstand',variation:'Wall hold',sets:4,value:60},{exercise:'handstand',variation:'Freestanding',sets:3,value:8}])];assert.equal(F.best(state,'skills','handstand','Freestanding'),8);assert.equal(F.goalProgress(state,{axis:'skills',exercise:'handstand',variation:'Freestanding',target:20}).percent,40);assert.equal(F.best(state,'skills','handstand','Wall toe pulls'),null);});
test('endurance record uses reps per set, not total session reps',()=>{const state=F.emptyState();state.sessions=[session('endurance',[{exercise:'pull-up',sets:5,reps:10},{exercise:'pull-up',sets:1,reps:12}])];assert.equal(F.best(state,'endurance','pull-up'),12);});
test('weighted records track added load and update after deletion',()=>{const state=F.emptyState();state.sessions=[session('weighted',[{exercise:'pull-up',sets:3,reps:5,weight:25}]),session('weighted',[{exercise:'pull-up',sets:2,reps:8,weight:20}],'s2')];assert.equal(F.best(state,'weighted','pull-up'),25);state.sessions.shift();assert.equal(F.best(state,'weighted','pull-up'),20);});
test('goal progress is capped at 100 and reports absence of records',()=>{const state=F.makeDemo();const goal={axis:'endurance',exercise:'pull-up',target:5};assert.equal(F.goalProgress(state,goal).percent,100);assert.deepEqual(F.goalProgress(F.emptyState(),goal),{value:0,hasData:false,percent:0});});
test('invalid dates, future dates, zero reps, duplicate ids, and arbitrary exercises rejected',()=>{
  const base=()=>{const s=F.emptyState();s.sessions=[session('endurance',[{exercise:'pull-up',sets:3,reps:10}])];return s;};
  for(const mutate of [s=>s.sessions[0].date='2026-02-30',s=>s.sessions[0].date=F.shiftDate(F.today(),1),s=>s.sessions[0].entries[0].reps=0,s=>s.sessions.push({...s.sessions[0]}),s=>s.sessions[0].entries[0].exercise='unknown']){const s=base();mutate(s);assert.throws(()=>F.validateState(s));}
});
test('weighted and skill metrics reject invalid values',()=>{for(const s of [session('weighted',[{exercise:'pull-up',sets:2,reps:5,weight:-10}]),session('skills',[{exercise:'handstand',sets:2,variation:'Made up',value:20}]),session('skills',[{exercise:'muscle-up',sets:2,variation:'Strict',value:1.5}])]){const state=F.emptyState();state.sessions=[s];assert.throws(()=>F.validateState(state));}});
test('week calculations cross month and year boundaries in local dates',()=>{assert.equal(F.weekStart('2026-01-01'),'2025-12-29');assert.equal(F.shiftDate('2024-03-01',-1),'2024-02-29');assert.equal(F.shiftDate('2026-03-01',-1),'2026-02-28');});
test('backup normalization retains data and drops unrecognized fields',()=>{const state=F.makeDemo();state.extra='ignore';state.settings.extra='ignore';assert.equal(F.validateState(state).extra,undefined);assert.deepEqual(F.validateState(JSON.parse(JSON.stringify(state))).goals,state.goals);});
test('inventory search matches variations and normalizes hyphens and whitespace',()=>{
  const state=F.emptyState();
  assert.deepEqual(F.filterSkills(state,{query:'  CHEST   TO-BAR '}).map(e=>e.id),['pull-up']);
  assert.ok(F.filterSkills(state,{query:'rings'}).some(e=>e.id==='ring-support'));
  assert.deepEqual(F.filterSkills(state,{query:'not a real skill'}),[]);
});
test('inventory combines category, measure, and practiced status',()=>{
  const state=F.emptyState();
  state.sessions=[session('skills',[{exercise:'hollow-body',variation:'Full',sets:3,value:20}])];
  assert.deepEqual(F.filterSkills(state,{category:'foundations',unit:'sec',status:'practiced'}).map(e=>e.id),['hollow-body']);
  assert.equal(F.filterSkills(state,{category:'Pull',unit:'sec',status:'practiced'}).length,0);
  assert.ok(!F.filterSkills(state,{status:'unpracticed'}).some(e=>e.id==='hollow-body'));
});
test('inventory practice status and skill records stay separate from other axes',()=>{
  const state=F.emptyState();
  state.sessions=[session('endurance',[{exercise:'pull-up',sets:3,reps:12}]),session('weighted',[{exercise:'pull-up',sets:3,reps:5,weight:20}],'s2')];
  assert.equal(F.filterSkills(state,{status:'practiced'}).length,0);
  state.sessions.push(session('skills',[{exercise:'pull-up',variation:'Strict',sets:3,value:4}],'s3'));
  assert.deepEqual(F.filterSkills(state,{status:'practiced'}).map(e=>e.id),['pull-up']);
  assert.equal(F.best(state,'skills','pull-up','Strict'),4);
});
test('expanded catalog sessions and goals survive backup round trips',()=>{
  const state=F.emptyState();
  state.sessions=[session('skills',F.EXERCISES.skills.map(ex=>({exercise:ex.id,variation:ex.variations[0],sets:3,value:ex.unit==='sec'?10.5:5})))];
  state.goals=F.EXERCISES.skills.map(ex=>({id:'goal-'+ex.id,axis:'skills',exercise:ex.id,variation:ex.variations[0],target:ex.unit==='sec'?21:10}));
  const restored=F.validateState(JSON.parse(JSON.stringify(state)));
  assert.deepEqual(restored,state);
  for(const goal of restored.goals)assert.equal(F.goalProgress(restored,goal).percent,50);
});
