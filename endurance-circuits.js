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
    cindy: { label: 'CrossFit · Cindy', url: 'https://www.crossfit.com/cindy' },
    heria200: { label: 'THENX / Chris Heria · 200 push-ups', url: 'https://www.youtube.com/watch?v=yjBWjaY6JSw', channel: 'THENX / Chris Heria' },
    thenx100: { label: 'THENX · 100 Pull-Up Challenge', url: 'https://thenx.com/blogs/news/100-pull-up-challenge-2021', channel: 'THENX' },
    boges: { label: 'K Boges · High-rep bodyweight squats', url: 'https://www.youtube.com/watch?v=guG1LT7ejDU', channel: 'K Boges' },
    goodMoney: { label: 'That’s Good Money · The Proof’s 50 / 100 challenge', url: 'https://www.youtube.com/watch?v=-6Hs4AaZ2Xo', channel: 'That’s Good Money' }
  };
  const move = (exercise, reps, note = '') => ({ exercise, reps, note });
  const buildCycle = doses => doses.map((rounds, i) => ({
    week: i + 1, rounds,
    title: ['Establish your baseline', 'Build if recovered', 'Target week', 'Reduce & recover'][i],
    description: [
      'Use this dose only if it is close to work you already tolerate. Otherwise choose the lower-volume option.',
      'Advance only after completing the previous dose with controlled reps and recovering between sessions. Otherwise repeat it.',
      'Reach the target only if week two stayed controlled. Keep the same rest; adding volume is enough.',
      'Reduce the number of sets. Reassess before another block; do not add a max-rep test on top.'
    ][i]
  }));
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
    },
    {
      id: 'advanced-push', name: '200-rep push builder', category: 'Push', image: 'push-up', kind: 'rounds', level: 'advanced',
      target: 'Build toward 10 × 20', day: 'Monday', cycle: buildCycle([8, 9, 10, 6]),
      description: 'Accumulate quality push-ups in repeatable sets. Week three reaches 200 reps with the standard option.',
      rest: '60–90 sec between sets; extend the rest if clean reps would otherwise break down',
      readiness: 'Start with a set size you can repeat while leaving about two clean reps in reserve. Use 10-rep sets if 20 is too close to your limit.',
      method: 'Complete one push-up set, rest, then repeat. Log each actual set size separately if your reps change.',
      attribution: 'Forma adaptation inspired by the 200-rep target in THENX / Chris Heria’s challenge. We use standard push-ups, planned rest, and a four-week cycle; the video uses multiple variations. The daily challenge schedule is not used here.', source: 'heria200',
      variants: [
        { id: 'standard', name: '20-rep sets · 200-rep target', moves: [move('push-up', 20)] },
        { id: 'lower-volume', name: '10-rep sets · 100-rep target', moves: [move('push-up', 10)] }
      ]
    },
    {
      id: 'advanced-pull', name: '100-rep pull builder', category: 'Pull', image: 'pull-up', kind: 'rounds', level: 'advanced',
      target: 'Build toward 20 × 5', day: 'Wednesday', cycle: buildCycle([16, 18, 20, 12]),
      description: 'Spread a large pulling target across small, strict sets. Week three reaches 100 reps.',
      rest: '90–120 sec between sets; keep the rest consistent when comparing sessions',
      readiness: 'Choose strict only if five clean reps remain repeatable well below your maximum. The assisted option keeps its own records.',
      method: 'Use one consistent grip and a controlled range of motion. Record band or assistance details in session notes.',
      attribution: 'Forma adaptation inspired by THENX’s bodyweight 100 Pull-Up Challenge. The five-rep sets, rest intervals, and four-week cycle are our programming; they do not reproduce the video’s grip sequence.', source: 'thenx100',
      variants: [
        { id: 'standard', name: 'Strict · 5-rep sets', moves: [move('pull-up', 5)] },
        { id: 'assisted', name: 'Assisted · 5-rep sets', moves: [move('assisted-pull-up', 5, 'Record the assistance used')] },
        { id: 'lower-volume', name: 'Strict · 3-rep sets / 60-rep target', moves: [move('pull-up', 3)] }
      ]
    },
    {
      id: 'advanced-legs', name: '300-rep leg builder', category: 'Legs', image: 'bodyweight-squat', kind: 'rounds', level: 'advanced',
      target: 'Build toward 6 × 50', day: 'Friday', cycle: buildCycle([4, 5, 6, 3]),
      description: 'Alternate squats and reverse lunges for a high-volume leg session without jumping.',
      rest: '30–60 sec after squats · 90–120 sec after lunges, before the next round',
      readiness: 'Use a comfortable range of motion and a repeatable pace. Start with the lower-volume option if 50 reps per round is a large jump from your usual work.',
      method: 'Complete the listed squats, then alternating reverse lunges. Lunge reps count both legs together; the per-leg count appears under the exercise.',
      attribution: 'Forma adaptation inspired by K Boges’ high-rep squat training. The squat-and-lunge pairing, set sizes, rest, and weekly doses are ours; this is not his 525-rep set or his daily routine.', source: 'boges',
      variants: [
        { id: 'standard', name: '50 reps per round · 300-rep target', moves: [move('squat', 30), move('reverse-lunge', 20, '10 per leg')] },
        { id: 'lower-volume', name: '30 reps per round · 180-rep target', moves: [move('squat', 20), move('reverse-lunge', 10, '5 per leg')] }
      ]
    },
    {
      id: 'advanced-density', name: '50 / 100 density practice', category: 'Push + pull', image: 'pull-up', kind: 'rounds', level: 'advanced',
      target: 'Build toward 50 pulls + 100 pushes', cycle: buildCycle([8, 9, 10, 6]),
      description: 'Pair small pull-up and push-up sets. At ten rounds, you reach the familiar 50 / 100 rep target.',
      rest: '15–30 sec between movements · 60–90 sec between rounds',
      readiness: 'Choose this in place of a push or pull session. Keep both set sizes repeatable and leave recovery time before more upper-body work.',
      method: 'Alternate the listed pull-up and push-up sets each round. Record total elapsed time, including rest. This is practice with planned breaks, not a five-minute challenge attempt.',
      attribution: 'Forma adaptation inspired by the rep target in The Proof’s challenge on That’s Good Money. Alternating small sets, the rest schedule, and the four-week cycle are ours. These training results are not equivalent to the original challenge score.', source: 'goodMoney',
      variants: [
        { id: 'standard', name: '5 pulls + 10 pushes per round', moves: [move('pull-up', 5), move('push-up', 10)] },
        { id: 'lower-volume', name: '3 pulls + 6 pushes per round', moves: [move('pull-up', 3), move('push-up', 6)] }
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
  function getWeeks(circuit) { return circuit.cycle || weeks; }
  function plan(circuit, variant, week = 1) {
    const dose = getWeeks(circuit).find(w => w.week === week);
    if (!dose || !variant || !circuit.variants.includes(variant)) throw new Error('Choose a valid workout option and cycle week.');
    return { ...dose, totalReps: dose.rounds * variant.moves.reduce((n, m) => n + m.reps, 0) };
  }
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
  const api = { exercises, sources, circuits, weeks, getCircuit, getVariant, getWeeks, plan, resultEntries };
  root.FormaCircuits = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
