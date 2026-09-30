(function (root) {
  'use strict';
  const CATALOG = typeof module !== 'undefined' && module.exports ? require('./skill-catalog.js') : root.FormaCatalog;
  const CIRCUITS = typeof module !== 'undefined' && module.exports ? require('./endurance-circuits.js') : root.FormaCircuits;
  const AXES = {
    skills: { name: 'Skills', eyebrow: 'CONTROL & TECHNIQUE', color: '#d5724d', icon: 'skill', description: 'Own the movement.', unit: 'sec' },
    endurance: { name: 'Endurance', eyebrow: 'CAPACITY & CONSISTENCY', color: '#64856c', icon: 'endurance', description: 'Go a little further.', unit: 'reps' },
    weighted: { name: 'Weighted', eyebrow: 'STRENGTH & LOAD', color: '#9381b7', icon: 'weight', description: 'Build your strength.', unit: 'kg' }
  };
  const EXERCISES = {
    skills: [
      { id: 'handstand', name: 'Handstand', unit: 'sec', variations: ['Wall hold', 'Wall toe pulls', 'Freestanding'] },
      { id: 'front-lever', name: 'Front lever', unit: 'sec', variations: ['Tuck', 'Advanced tuck', 'One leg', 'Straddle', 'Full'] },
      { id: 'planche', name: 'Planche', unit: 'sec', variations: ['Lean', 'Tuck', 'Advanced tuck', 'Straddle', 'Full'] },
      { id: 'l-sit', name: 'L-sit', unit: 'sec', variations: ['Tuck', 'One leg', 'Full', 'V-sit'] },
      { id: 'back-lever', name: 'Back lever', unit: 'sec', variations: ['Tuck', 'Advanced tuck', 'Straddle', 'Full'] },
      { id: 'muscle-up', name: 'Muscle-up', unit: 'reps', variations: ['Band assisted', 'Kipping', 'Strict', 'Rings'] },
      { id: 'human-flag', name: 'Human flag', unit: 'sec', variations: ['Vertical hold', 'Tuck', 'One leg', 'Straddle', 'Full'] },
      { id: 'elbow-lever', name: 'Elbow lever', unit: 'sec', variations: ['Feet assisted', 'Tuck', 'Straddle', 'Full'] },
      { id: 'dragon-flag', name: 'Dragon flag', unit: 'reps', variations: ['Bent knee', 'Negative', 'One leg', 'Full'] },
      { id: 'pistol-squat', name: 'Pistol squat', unit: 'reps', variations: ['Assisted', 'Box pistol', 'Full', 'Paused'] },
      { id: 'handstand-push-up', name: 'Handstand push-up', unit: 'reps', variations: ['Pike push-up', 'Elevated pike', 'Wall partial range', 'Wall full range', 'Freestanding'] },
      { id: 'one-arm-pull-up', name: 'One-arm pull-up', unit: 'reps', variations: ['Assisted', 'Negative', 'Partial range', 'Strict'] },
      { id: 'push-up', name: 'Push-up', unit: 'reps', variations: ['Wall', 'Incline', 'Knee', 'Standard', 'Diamond', 'Archer'] },
      { id: 'pull-up', name: 'Pull-up', unit: 'reps', variations: ['Feet assisted', 'Band assisted', 'Negative', 'Strict', 'Chest to bar'] },
      { id: 'dip', name: 'Dip', unit: 'reps', variations: ['Feet assisted', 'Band assisted', 'Negative', 'Parallel bars', 'Rings'] },
      { id: 'hollow-body', name: 'Hollow body hold', unit: 'sec', variations: ['Tuck', 'One leg', 'Arms by sides', 'Full'] },
      { id: 'arch-hold', name: 'Arch hold', unit: 'sec', variations: ['Arms by sides', 'Arms overhead', 'Full'] },
      { id: 'frog-stand', name: 'Frog stand', unit: 'sec', variations: ['Toe assisted', 'Short balance', 'Full hold'] },
      { id: 'scapular-pull-up', name: 'Scapular pull-up', unit: 'reps', variations: ['Feet assisted', 'Full', 'Paused'] },
      { id: 'hanging-leg-raise', name: 'Hanging leg raise', unit: 'reps', variations: ['Knee raise', 'Bent leg raise', 'Straight leg raise', 'Toes to bar'] },
      { id: 'ring-support', name: 'Ring support hold', unit: 'sec', variations: ['Feet assisted', 'Neutral rings', 'Rings turned out'] },
      { id: 'skin-the-cat', name: 'Skin the cat', unit: 'reps', variations: ['Feet assisted', 'Tucked partial range', 'Tucked full range', 'Pike'] }
    ],
    endurance: [
      { id: 'pull-up', name: 'Pull-ups', unit: 'reps' }, { id: 'push-up', name: 'Push-ups', unit: 'reps' },
      { id: 'dip', name: 'Dips', unit: 'reps' }, { id: 'squat', name: 'Squats', unit: 'reps' },
      { id: 'row', name: 'Australian rows', unit: 'reps' }, { id: 'burpee', name: 'Burpees', unit: 'reps' }
    ],
    weighted: [
      { id: 'pull-up', name: 'Weighted pull-ups', unit: 'kg' }, { id: 'dip', name: 'Weighted dips', unit: 'kg' },
      { id: 'chin-up', name: 'Weighted chin-ups', unit: 'kg' }, { id: 'push-up', name: 'Weighted push-ups', unit: 'kg' }
    ]
  };
  const SKILL_DETAILS = {
    'handstand': ['Balance', 'Floor / wall', false, 'Find your balance upside down and develop a controlled body line.'],
    'front-lever': ['Pull', 'Bar / rings', false, 'Build toward a straight-body horizontal hold beneath the bar.'],
    'planche': ['Push', 'Floor / parallettes', false, 'Explore straight-arm strength with your body suspended above the floor.'],
    'l-sit': ['Core', 'Floor / parallettes', false, 'Combine support strength and compression in an L-shaped hold.'],
    'back-lever': ['Pull', 'Bar / rings', false, 'Practice a face-down horizontal hold with straight arms behind you.'],
    'muscle-up': ['Pull', 'Bar / rings', false, 'Connect a pull, transition, and dip into one complete movement.'],
    'human-flag': ['Balance', 'Vertical pole', false, 'Develop a horizontal side hold using a push-and-pull grip.'],
    'elbow-lever': ['Balance', 'Floor / parallettes', false, 'Balance a horizontal body on bent arms with elbows supporting the torso.'],
    'dragon-flag': ['Core', 'Bench / fixed support', false, 'Control a long body line while lowering from a shoulder-supported position.'],
    'pistol-squat': ['Legs', 'Floor / support', false, 'Develop single-leg strength, balance, and control through a deep squat.'],
    'handstand-push-up': ['Push', 'Floor / wall', false, 'Build an inverted press from pike variations to freestanding reps.'],
    'one-arm-pull-up': ['Pull', 'Bar', false, 'Work on single-arm pulling strength through assisted and controlled reps.'],
    'push-up': ['Push', 'Floor', true, 'A foundational horizontal press with variations for different levels of strength.'],
    'pull-up': ['Pull', 'Bar', true, 'Build strict vertical pulling strength with controlled bodyweight reps.'],
    'dip': ['Push', 'Parallel bars / rings', true, 'Build support and pressing strength through controlled bent-arm reps.'],
    'hollow-body': ['Core', 'Floor', true, 'Practice whole-body tension in a low, face-up hold.'],
    'arch-hold': ['Core', 'Floor', true, 'Develop body-line control in a face-down, gently extended hold.'],
    'frog-stand': ['Balance', 'Floor', true, 'Explore hand balancing with bent arms and knees supported above the elbows.'],
    'scapular-pull-up': ['Pull', 'Bar', true, 'Practice shoulder-blade control while keeping your arms straight.'],
    'hanging-leg-raise': ['Core', 'Bar', true, 'Build hanging core control from knee raises to straight-leg variations.'],
    'ring-support': ['Push', 'Rings', true, 'Build a stable straight-arm support position on gymnastic rings.'],
    'skin-the-cat': ['Pull', 'Rings', false, 'Practice a controlled rotation through an inverted hang on rings.']
  };
  EXERCISES.endurance.push(...CIRCUITS.exercises);
  EXERCISES.skills.forEach(ex => {
    const [category, equipment, foundation, description] = SKILL_DETAILS[ex.id];
    Object.assign(ex, { category, equipment, foundation, description, level: foundation ? 'Foundation' : 'Developing', sources: ['gymfit'], aliases: [] }, CATALOG.existing[ex.id]);
  });
  EXERCISES.skills.push(...CATALOG.additions);
  const SKILL_SOURCES = CATALOG.sources;
  function filterSkills(state, { query = '', category = 'all', status = 'all', unit = 'all', level = 'all' } = {}) {
    const normalize = text => text.toLowerCase().replace(/[-–—]/g, ' ').replace(/\s+/g, ' ').trim();
    const words = normalize(query).split(' ').filter(Boolean);
    const practiced = new Set(state.sessions.filter(s => s.axis === 'skills').flatMap(s => s.entries.map(e => e.exercise)));
    return EXERCISES.skills.filter(ex => {
      const searchable = normalize([ex.name, ex.category, ex.equipment, ex.description, ex.level, ...ex.variations, ...ex.aliases].join(' '));
      return words.every(word => searchable.includes(word)) &&
        (category === 'all' || (category === 'foundations' ? ex.foundation : category === 'Rings' ? /rings/i.test(ex.equipment) : ex.category === category)) &&
        (unit === 'all' || ex.unit === unit) &&
        (level === 'all' || ex.level === level) &&
        (status === 'all' || (status === 'practiced' ? practiced.has(ex.id) : !practiced.has(ex.id)));
    }).sort((a, b) => Number(b.foundation) - Number(a.foundation) || a.name.localeCompare(b.name));
  }
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
  const dateAt = str => new Date(`${str}T12:00:00`);
  const shiftDate = (date, days) => { const d = dateAt(date); d.setDate(d.getDate() + days); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
  const weekStart = (date = today()) => { const d = dateAt(date); return shiftDate(date, -((d.getDay() + 6) % 7)); };
  const id = () => root.crypto?.randomUUID?.() || `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const emptyState = () => ({ version: 1, settings: { name: 'Athlete', weeklyGoal: 4 }, sessions: [], goals: [] });
  const exercise = (axis, exId) => EXERCISES[axis]?.find(e => e.id === exId);
  const metric = (axis, entry) => axis === 'skills' ? entry.value : axis === 'endurance' ? entry.reps : entry.weight;
  function entriesFor(state, axis, exId, variation) {
    return state.sessions.filter(s => s.axis === axis).flatMap(s => s.entries.filter(e => e.exercise === exId && (variation === undefined || e.variation === variation)).map(e => ({ ...e, date: s.date, sessionId: s.id, valueMetric: metric(axis, e) }))).sort((a,b) => a.date.localeCompare(b.date));
  }
  function best(state, axis, exId, variation) {
    const entries = entriesFor(state, axis, exId, variation);
    return entries.length ? Math.max(...entries.map(e => e.valueMetric)) : null;
  }
  const goalProgress = (state, goal) => { const value = best(state, goal.axis, goal.exercise, goal.axis === 'skills' ? goal.variation : undefined); return { value: value ?? 0, hasData: value !== null, percent: Math.min(100, Math.round((value || 0) / goal.target * 100)) }; };
  function validateState(data) {
    const fail = message => { throw new Error(message); };
    const num = (v, min, max, integer = false) => typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max && (!integer || Number.isInteger(v));
    const str = (v, max) => typeof v === 'string' && v.length <= max;
    const validDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(dateAt(value)) && shiftDate(value, 0) === value && value >= '2000-01-01' && value <= today();
    if (!data || data.version !== 1 || !Array.isArray(data.sessions) || !Array.isArray(data.goals) || !data.settings) fail('This is not a supported Forma backup.');
    if (!str(data.settings.name, 40) || !data.settings.name.trim() || !num(data.settings.weeklyGoal, 1, 14, true)) fail('Invalid profile settings.');
    if (data.sessions.length > 20000 || data.goals.length > 100) fail('This backup exceeds the supported size.');
    const sessionIds = new Set();
    const sessions = data.sessions.map(s => {
      if (!s || !str(s.id, 100) || !s.id || sessionIds.has(s.id) || !Object.hasOwn(AXES, s.axis) || !validDate(s.date) || !num(s.duration, 1, 600, true) || !num(s.rpe, 1, 10, true) || !str(s.notes, 2000) || !Array.isArray(s.entries) || !s.entries.length || s.entries.length > 30) fail('A session contains invalid or missing fields.');
      sessionIds.add(s.id);
      const entries = s.entries.map(e => {
        const ex = exercise(s.axis, e?.exercise);
        if (!ex || !num(e.sets, 1, 100, true)) fail('An exercise or set count is invalid.');
        if (s.axis === 'skills') {
          if (!ex.variations.includes(e.variation) || !num(e.value, ex.unit === 'reps' ? 1 : 0.1, 3600, ex.unit === 'reps')) fail('Invalid skill variation or result.');
          return { exercise: e.exercise, variation: e.variation, sets: e.sets, value: e.value };
        }
        if (!num(e.reps, 1, 1000, true)) fail('Reps must be a positive whole number.');
        if (s.axis === 'weighted' && !num(e.weight, 0.25, 500)) fail('Added weight must be between 0.25 and 500 kg.');
        return { exercise: e.exercise, sets: e.sets, reps: e.reps, ...(s.axis === 'weighted' ? { weight: e.weight } : {}) };
      });
      return { id: s.id, axis: s.axis, date: s.date, duration: s.duration, rpe: s.rpe, notes: s.notes, entries };
    });
    const goalIds = new Set();
    const goals = data.goals.map(g => {
      const ex = exercise(g?.axis, g?.exercise);
      if (!g || !str(g.id, 100) || !g.id || goalIds.has(g.id) || !ex || !num(g.target, ex.unit === 'kg' ? 0.25 : ex.unit === 'sec' ? 0.1 : 1, ex.unit === 'kg' ? 500 : ex.unit === 'sec' ? 3600 : 1000, ex.unit === 'reps')) fail('A goal contains invalid fields.');
      if (g.axis === 'skills' && !ex.variations.includes(g.variation)) fail('A goal has an invalid skill variation.');
      goalIds.add(g.id);
      return { id: g.id, axis: g.axis, exercise: g.exercise, target: g.target, ...(g.axis === 'skills' ? { variation: g.variation } : {}) };
    });
    return { version: 1, settings: { name: data.settings.name.trim(), weeklyGoal: data.settings.weeklyGoal }, sessions, goals };
  }
  function makeDemo() {
    const state = emptyState(); state.settings.name = 'Athlete';
    const axes = ['skills','endurance','weighted'];
    for (let i = 0; i < 32; i++) {
      const axis = axes[i % 3], n = Math.floor(i / 3);
      const entries = axis === 'skills' ? [ { exercise: 'handstand', variation: 'Freestanding', sets: 5, value: 8 + n * 2 }, { exercise: 'front-lever', variation: 'Advanced tuck', sets: 4, value: 5 + Math.floor(n / 2) } ] : axis === 'endurance' ? [ { exercise: 'pull-up', sets: 4, reps: 8 + Math.floor(n / 2) }, { exercise: 'push-up', sets: 3, reps: 20 + n * 2 } ] : [ { exercise: 'pull-up', sets: 4, reps: 5, weight: 10 + n * 2.5 }, { exercise: 'dip', sets: 4, reps: 6, weight: 20 + n * 2.5 } ];
      state.sessions.push({ id: `demo-${i}`, axis, date: shiftDate(today(), -Math.floor((31 - i) * 1.65)), duration: 35 + i % 5 * 5, rpe: 6 + i % 3, notes: i === 31 ? 'Felt strong today. Kept every rep controlled.' : '', entries });
    }
    state.goals = [
      { id: 'demo-goal-1', axis: 'skills', exercise: 'handstand', variation: 'Freestanding', target: 40 },
      { id: 'demo-goal-2', axis: 'skills', exercise: 'front-lever', variation: 'Advanced tuck', target: 15 },
      { id: 'demo-goal-3', axis: 'endurance', exercise: 'pull-up', target: 20 },
      { id: 'demo-goal-4', axis: 'weighted', exercise: 'pull-up', target: 50 }
    ];
    return state;
  }
  const api = { AXES, EXERCISES, SKILL_SOURCES, filterSkills, today, dateAt, shiftDate, weekStart, id, emptyState, exercise, metric, entriesFor, best, goalProgress, validateState, makeDemo };
  root.Forma = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
