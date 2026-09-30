(function (root) {
  'use strict';
  const exercises = [
    { id: 'pike-push-up', name: 'Pike push-ups', unit: 'reps' },
    { id: 'incline-push-up', name: 'Incline push-ups', unit: 'reps' },
    { id: 'assisted-pull-up', name: 'Assisted pull-ups', unit: 'reps' },
    { id: 'scapular-pull-up', name: 'Scapular pull-ups', unit: 'reps' },
    { id: 'forward-lunge', name: 'Forward lunges', unit: 'reps', trackingNote: 'Count both legs together: 10 total reps means 5 per leg.' },
    { id: 'reverse-lunge', name: 'Reverse lunges', unit: 'reps', trackingNote: 'Count both legs together: 10 total reps means 5 per leg.' },
    { id: 'jumping-lunge', name: 'Jumping lunges', unit: 'reps', trackingNote: 'Count each alternating landing as one rep: 10 total means 5 per leg.' },
    { id: 'squat-jump', name: 'Squat jumps', unit: 'reps' },
    { id: 'ring-row', name: 'Ring rows', unit: 'reps' },
    { id: 'assisted-push-up', name: 'Assisted push-ups', unit: 'reps', trackingNote: 'Note your assistance or incline height so you can compare like-for-like efforts.' }
  ];
  const sources = {
    stew: { label: 'Stew Smith · submaximal circuits', url: 'https://www.stewsmithfitness.com/blogs/news/14296809-daily-push-ups-and-pull-ups-why' },
    mti: { label: 'MTI · Mini Leg Blaster', url: 'https://fitness.mtntactical.com/exercises/details.php?id=leg-blaster' },
    cindy: { label: 'CrossFit · Cindy', url: 'https://www.crossfit.com/cindy' }
  };
  const move = (exercise, reps, note = '') => ({ exercise, reps, note });
  const circuits = [
    {
      id: 'push', name: 'Push endurance', category: 'Push', image: 'dip', day: 'Monday', kind: 'rounds',
      description: 'Build repeatable pressing effort, from the bars to the floor.',
      rest: '30–60 sec between exercises · 2 min between rounds',
      attribution: 'Forma example. The circuit approach is informed by Stew Smith; the exercise choices, reps, and rest are our adaptation.', source: 'stew',
      variants: [{ id: 'standard', name: 'Standard circuit', moves: [move('dip', 6), move('push-up', 12), move('pike-push-up', 6), move('incline-push-up', 12)] }]
    },
    {
      id: 'pull', name: 'Pull endurance', category: 'Pull', image: 'pull-up', day: 'Wednesday', kind: 'rounds',
      description: 'Pair vertical pulls with rows and controlled shoulder-blade work.',
      rest: '45–60 sec between exercises · 2 min between rounds',
      attribution: 'Forma example. The circuit approach is informed by Stew Smith; the exercise choices, reps, and rest are our adaptation.', source: 'stew',
      variants: [
        { id: 'standard', name: 'Strict pull-ups', moves: [move('pull-up', 4), move('row', 10), move('scapular-pull-up', 6)] },
        { id: 'assisted', name: 'Assisted pull-ups', moves: [move('assisted-pull-up', 4, 'Note the assistance used'), move('row', 10), move('scapular-pull-up', 6)] }
      ]
    },
    {
      id: 'legs', name: 'Mini Leg Blaster', category: 'Legs', image: 'bodyweight-squat', day: 'Friday', kind: 'rounds',
      description: 'A compact squat-and-lunge circuit, with a no-jump option.',
      rest: 'Move between exercises as ready · 2 min between rounds',
      attribution: 'Exercise sequence from MTI. Three rounds, the rest interval, the no-jump option, and the four-week block are Forma adaptations.', source: 'mti',
      variants: [
        { id: 'standard', name: 'Original exercise sequence', moves: [move('squat', 10), move('forward-lunge', 10, '5 per leg'), move('jumping-lunge', 10, '5 per leg'), move('squat-jump', 5)] },
        { id: 'no-jump', name: 'No jumping', moves: [move('squat', 10), move('forward-lunge', 10, '5 per leg'), move('reverse-lunge', 10, '5 per leg'), move('squat', 5)] }
      ]
    },
    {
      id: 'cindy', name: 'Cindy', category: 'Full body', image: 'push-up', kind: 'amrap',
      description: 'Repeat pull, push, and squat. Count full rounds and the reps that follow.',
      rest: 'Rest as needed to keep your movement controlled',
      attribution: 'Published CrossFit benchmark, including its beginner option. AMRAP means as many rounds and reps as possible within the time limit.', source: 'cindy',
      variants: [
        { id: 'standard', name: 'Standard · 20 minutes', minutes: 20, moves: [move('pull-up', 5), move('push-up', 10), move('squat', 15)] },
        { id: 'beginner', name: 'Beginner · 12 minutes', minutes: 12, moves: [move('ring-row', 3), move('assisted-push-up', 6), move('squat', 9)] }
      ]
    }
  ];
  const weeks = [
    { week: 1, rounds: 3, title: 'Find your pace', description: 'Establish manageable reps across three controlled rounds.' },
    { week: 2, rounds: 3, title: 'Make it repeatable', description: 'Keep the same work, technique, and rest consistent.' },
    { week: 3, rounds: 4, title: 'Build when ready', description: 'Add a fourth round only if three remain controlled. Otherwise repeat week two.' },
    { week: 4, rounds: 2, title: 'Ease back & reassess', description: 'Use two rounds, then reassess before your next block.' }
  ];
  function getCircuit(id) { return circuits.find(c => c.id === id); }
  function getVariant(circuit, id) { return circuit?.variants.find(v => v.id === id); }
  function resultEntries(circuitId, variantId, completedRounds, extraReps = []) {
    const circuit = getCircuit(circuitId), variant = getVariant(circuit, variantId);
    if (!variant) throw new Error('Choose a valid circuit and option.');
    const minimum = circuit.kind === 'amrap' ? 0 : 1;
    if (!Number.isInteger(completedRounds) || completedRounds < minimum || completedRounds > 100) throw new Error(`Enter ${minimum}–100 completed rounds.`);
    if (!Array.isArray(extraReps) || (extraReps.length && (circuit.kind !== 'amrap' || extraReps.length !== variant.moves.length))) throw new Error('Extra reps must match the exercises in the next round.');
    const extras = extraReps.length ? extraReps : variant.moves.map(() => 0);
    let incomplete = false;
    extras.forEach((reps, index) => {
      if (!Number.isInteger(reps) || reps < 0 || reps > variant.moves[index].reps) throw new Error('Extra reps must stay within one round.');
      if (incomplete && reps > 0) throw new Error('Enter extra reps in circuit order. Finish one exercise before the next.');
      if (reps < variant.moves[index].reps) incomplete = true;
    });
    if (circuit.kind === 'amrap' && extras.every((reps, index) => reps === variant.moves[index].reps)) throw new Error('That is a full round. Add it to completed rounds and reset extra reps to zero.');
    const entries = completedRounds ? variant.moves.map(m => ({ exercise: m.exercise, sets: completedRounds, reps: m.reps })) : [];
    extras.forEach((reps, index) => { if (reps) entries.push({ exercise: variant.moves[index].exercise, sets: 1, reps }); });
    if (!entries.length) throw new Error('Enter at least one completed rep.');
    return entries;
  }
  const api = { exercises, sources, circuits, weeks, getCircuit, getVariant, resultEntries };
  root.FormaCircuits = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
