const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const F=require('../core.js');

test('catalog levels combine with family, measure, and search aliases',()=>{
  const state=F.emptyState();
  assert.deepEqual(F.filterSkills(state,{level:'Specialist',category:'Freestyle',unit:'reps'}).map(ex=>ex.id),['swing-180','swing-360']);
  assert.deepEqual(F.filterSkills(state,{query:'Australian pull-up',level:'Foundation'}).map(ex=>ex.id),['inverted-row']);
  assert.deepEqual(F.filterSkills(state,{query:'OAHS',level:'Specialist'}).map(ex=>ex.id),['one-arm-handstand']);
  assert.equal(F.filterSkills(state,{level:'Foundation',category:'Freestyle'}).length,0);
});
test('rings filter includes shared equipment and existing ring foundations',()=>{
  const ids=F.filterSkills(F.emptyState(),{category:'Rings'}).map(ex=>ex.id);
  for(const id of ['ring-support','skin-the-cat','false-grip-hang','iron-cross','front-lever'])assert.ok(ids.includes(id),id);
  assert.ok(!ids.includes('handstand'));
});
test('catalog entries have unique identifiers, tracking choices, levels, and valid reference links',()=>{
  assert.equal(new Set(F.EXERCISES.skills.map(ex=>ex.id)).size,F.EXERCISES.skills.length);
  for(const ex of F.EXERCISES.skills){
    assert.ok(ex.variations.length>0,ex.id);
    assert.equal(new Set(ex.variations).size,ex.variations.length,ex.id);
    assert.ok(['Foundation','Developing','Advanced','Specialist'].includes(ex.level),ex.id);
    assert.equal(ex.foundation,ex.level==='Foundation',ex.id);
    for(const source of ex.sources)assert.ok(F.SKILL_SOURCES[source]?.url.startsWith('https://'),ex.id);
  }
});
test('legacy V-sit records remain valid and separate from the dedicated movement',()=>{
  const state=F.emptyState();
  state.sessions=[{id:'legacy',axis:'skills',date:F.today(),duration:20,rpe:6,notes:'',entries:[{exercise:'l-sit',variation:'V-sit',sets:3,value:12}]}];
  state.goals=[{id:'legacy-goal',axis:'skills',exercise:'l-sit',variation:'V-sit',target:24}];
  const restored=F.validateState(JSON.parse(JSON.stringify(state)));
  assert.equal(F.best(restored,'skills','l-sit','V-sit'),12);
  assert.equal(F.best(restored,'skills','v-sit','High V'),null);
  assert.equal(F.goalProgress(restored,restored.goals[0]).percent,50);
});
test('all movement illustrations are bundled as readable PNG files',()=>{
  for(const ex of F.EXERCISES.skills){
    const image=fs.readFileSync(path.join(__dirname,'../assets/skills',ex.id+'.png'));
    assert.equal(image.subarray(1,4).toString(),'PNG',ex.id);
    assert.ok(image.length>10000,ex.id);
  }
});
