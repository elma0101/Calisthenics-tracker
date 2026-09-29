/* Forma — framework-free, local-first training journal. */
(() => {
  'use strict';
  const F = window.Forma;
  const { AXES, EXERCISES } = F;
  const SKILL_ART = {
    'handstand': { pose: 'Freestanding', alt: 'Athlete balancing in a straight freestanding handstand with legs together.' },
    'front-lever': { pose: 'Full front lever', alt: 'Athlete holding a front lever beneath a pull-up bar, body horizontal and chest facing upward.' },
    'planche': { pose: 'Full planche', alt: 'Athlete holding a full planche, balancing on straight arms with both feet off the floor.' },
    'l-sit': { pose: 'Full L-sit', alt: 'Athlete holding an L-sit on parallettes with an upright torso and straight horizontal legs.' },
    'back-lever': { pose: 'Full back lever', alt: 'Athlete holding a back lever from gymnastic rings, body horizontal and chest facing downward.' },
    'muscle-up': { pose: 'Above-bar transition', alt: 'Athlete completing the transition of a bar muscle-up with the chest above the bar.' },
    'human-flag': { pose: 'Full human flag', alt: 'Athlete holding a human flag, body extended horizontally beside a vertical pole with both arms straight.' },
    'elbow-lever': { pose: 'Full elbow lever', alt: 'Athlete balancing horizontally on bent arms with elbows tucked against the torso and feet off the floor.' },
    'dragon-flag': { pose: 'Full dragon flag', alt: 'Athlete lowering a straight body above a bench with only the shoulders supported and hands gripping behind the head.' },
    'pistol-squat': { pose: 'Full pistol squat', alt: 'Athlete in a deep single-leg squat, the other leg extended straight forward above the floor.' },
    'handstand-push-up': { pose: 'Wall-assisted rep', alt: 'Athlete at the bottom of a wall-assisted handstand push-up, inverted with bent elbows and feet against the wall.' },
    'one-arm-pull-up': { pose: 'Strict one-arm pull-up', alt: 'Athlete pulling the chin above a bar using one arm, with the free arm resting beside the body.' },
    'push-up': { pose: 'Standard push-up', alt: 'Athlete lowering a straight body toward the floor in a push-up.' },
    'pull-up': { pose: 'Strict pull-up', alt: 'Athlete pulling the chin above a bar with both hands.' },
    'dip': { pose: 'Parallel bar dip', alt: 'Athlete performing a dip between parallel bars with bent elbows and feet lifted.' },
    'hollow-body': { pose: 'Full hollow hold', alt: 'Athlete holding straight arms and legs above the floor while lying face up with the lower back grounded.' },
    'arch-hold': { pose: 'Full arch hold', alt: 'Athlete lying face down with arms and legs lifted gently above the floor.' },
    'frog-stand': { pose: 'Frog balance', alt: 'Athlete balancing on two palms with knees supported on the upper arms and feet lifted.' },
    'scapular-pull-up': { pose: 'Active hang', alt: 'Athlete hanging from a bar with straight arms and shoulders drawn away from the ears.' },
    'hanging-leg-raise': { pose: 'Straight leg raise', alt: 'Athlete hanging from a bar with straight legs lifted horizontally in front.' },
    'ring-support': { pose: 'Straight-arm support', alt: 'Athlete supporting a vertical body on gymnastic rings with straight arms beside the hips.' },
    'skin-the-cat': { pose: 'Tucked inverted phase', alt: 'Athlete in the tucked inverted hang phase of skin the cat on gymnastic rings.' }
  };
  const STORAGE_KEY = 'forma-journal-v1';
  const DEMO_KEY = 'forma-demo-v1';
  const MODE_KEY = 'forma-mode-v1';
  let storageAvailable = true, storageCorrupt = false, demo = false, state, realState;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    realState = saved ? F.validateState(JSON.parse(saved)) : F.emptyState();
    demo = localStorage.getItem(MODE_KEY) === 'demo';
  } catch (error) {
    realState = F.emptyState();
    try { storageCorrupt = !!localStorage.getItem(STORAGE_KEY); } catch { storageAvailable = false; }
  }
  state = realState;
  if (demo) {
    try { const saved = localStorage.getItem(DEMO_KEY); state = saved ? F.validateState(JSON.parse(saved)) : F.makeDemo(); }
    catch { state = F.makeDemo(); }
  }
  let page = location.hash.slice(1) || 'overview', historyFilter = 'all', historyQuery = '', chartWeeks = 8;
  let chartExercise = {}, chartVariation = {}, draftSession = null, draftGoal = null, pendingImport = null;
  let inventoryFilters = { query: '', category: 'all', status: 'all', unit: 'all' };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const number = value => new Intl.NumberFormat('en', { maximumFractionDigits: 1 }).format(value);
  const dateLabel = (date, options = { month: 'short', day: 'numeric' }) => F.dateAt(date).toLocaleDateString('en', options);
  const style = axis => `--axis:${AXES[axis].color};--tint:${({skills:'#f9ede5',endurance:'#eaf0e4',weighted:'#efebf5'})[axis]}`;
  const iconPaths = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    skill: '<circle cx="12" cy="4" r="2"/><path d="M12 6v6m-7-4 7 3 7-3M12 12l-5 8m5-8 5 8M4 21h5m6 0h5"/>',
    endurance: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    weight: '<path d="M7 12h10M3 9v6m4-9v12M17 6v12m4-9v6M3 12h4m10 0h4"/>',
    history: '<path d="M3 11a9 9 0 1 1 2 7M3 4v7h7m2-5v6l4 2"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    settings: '<path d="m9 3-1 3-3 1 1 3-2 2 2 2-1 3 3 1 1 3h6l1-3 3-1-1-3 2-2-2-2 1-3-3-1-1-3Z"/><circle cx="12" cy="12" r="3"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
    upload: '<path d="M12 16V4m-5 5 5-5 5 5M4 16v5h16v-5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
    diagonal: '<path d="M6 18 18 6M6 6h12v12"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 10h18m-14 5h2m4 0h2"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    trophy: '<path d="M8 3h8v6a4 4 0 0 1-8 0V3Zm0 2H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4m-4 1v6m-5 2h10m-8-2h6"/>',
    leaf: '<path d="M20 3c-8 0-15 2-15 9a6 6 0 0 0 6 6c7 0 9-7 9-15ZM4 21 16 9"/>',
    chart: '<path d="M3 3v18h18M7 15l4-5 4 2 5-7"/>',
    trash: '<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>',
    edit: '<path d="m15 4 5 5M4 20l5-1L21 7a2 2 0 0 0-5-5L4 14v6Z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>',
    spark: '<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.grid}</svg>`;
  const hydrateIcons = () => $$('[data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon); });
  let toastTimer;
  function toast(message) { clearTimeout(toastTimer); $('#toast').textContent = message; $('#toast').classList.add('visible'); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 4500); }
  function persist(next) {
    let validated;
    try { validated = F.validateState(next); } catch (e) { toast(e.message); return false; }
    if (storageCorrupt && !demo) { toast('Your existing saved data could not be read. Export it from Preferences before replacing it.'); return false; }
    try { localStorage.setItem(demo ? DEMO_KEY : STORAGE_KEY, JSON.stringify(validated)); storageAvailable = true; }
    catch { storageAvailable = false; toast('Browser storage is unavailable. Your changes are in memory; export a backup before closing.'); }
    state = validated;
    if (!demo) realState = state;
    return true;
  }
  function toggleDemo() {
    if (!demo) {
      realState = state;
      try { const saved = localStorage.getItem(DEMO_KEY); state = saved ? F.validateState(JSON.parse(saved)) : F.makeDemo(); } catch { state = F.makeDemo(); }
      demo = true;
    } else {
      demo = false;
      try { const saved = localStorage.getItem(STORAGE_KEY); if (saved) realState = F.validateState(JSON.parse(saved)); } catch {}
      state = realState;
    }
    try { localStorage.setItem(MODE_KEY, demo ? 'demo' : 'personal'); } catch {}
    closeDialog(); render(); toast(demo ? 'Exploring sample data. Your own journal is kept separate.' : 'Your personal journal is ready.');
  }
  function openDialog(body) { $('#dialog-content').innerHTML = body; if (!$('#editor-dialog').open) $('#editor-dialog').showModal(); }
  function closeDialog() { $('#editor-dialog').close(); }
  function dialogHead(title, subtitle = '') { return `<div class="dialog-header"><div><h2 id="dialog-title">${title}</h2>${subtitle ? `<p>${subtitle}</p>` : ''}</div><button class="icon-button" data-action="close" aria-label="Close dialog">${icon('close')}</button></div>`; }
  const sortedSessions = () => [...state.sessions].sort((a,b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  function renderNav() {
    const navPage = page === 'skill-inventory' ? 'skills' : page;
    const items = [['overview','grid','Overview'],['skills','skill','Skills'],['endurance','endurance','Endurance'],['weighted','weight','Weighted'],['history','history','History'],['goals','target','Goals']];
    $('#navigation').innerHTML = items.map(([id,ic,label],i) => `${i === 1 ? '<div class="nav-divider"></div><div class="nav-section-label">THE THREE AXES</div>' : i === 4 ? '<div class="nav-divider"></div>' : ''}<a href="#${id}" class="nav-item ${navPage === id ? 'active' : ''}" ${navPage === id ? 'aria-current="page"' : ''} title="${label}">${icon(ic)}<span>${label}</span>${id === 'goals' && state.goals.length ? `<span class="nav-count">${state.goals.length}</span>` : ''}</a>`).join('');
    $('#profile-name').textContent = state.settings.name;
    $('#avatar').textContent = state.settings.name.charAt(0).toUpperCase();
    $('#storage-status').textContent = demo ? 'Demo workspace' : storageCorrupt ? 'Saved data needs recovery' : storageAvailable ? 'Saved on this device' : 'Unsaved · export backup';
    $('#today-label').textContent = dateLabel(F.today(), { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    $('#breadcrumb-current').textContent = page === 'skill-inventory' ? 'Skill inventory' : items.find(i => i[0] === page)?.[2] || 'Overview';
    $('#log-label').textContent = demo ? 'Log demo session' : 'Log session';
    $('#mode-banner').innerHTML = demo ? `<div class="mode-banner"><span>${icon('info')} Demo workspace · You’re viewing sample progress.</span><button class="text-button" data-action="toggle-demo">Use my own data ${icon('arrow')}</button></div>` : storageCorrupt ? '<div class="mode-banner"><span>Your existing data could not be read. Open Preferences to recover the original backup.</span><button class="text-button" data-action="settings">Preferences</button></div>' : !storageAvailable ? '<div class="mode-banner"><span>Storage is unavailable. Export your journal before closing this page.</span><button class="text-button" data-action="export">Export backup</button></div>' : '';
  }
  function heading(eyebrow, title, description, action = '') { return `<div class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${description}</p></div>${action}</div>`; }
  function empty(title, description, action = '', ic = 'chart', compact = false) { return `<div class="empty-state ${compact ? 'compact' : ''}"><div class="empty-icon">${icon(ic)}</div><h3>${title}</h3><p>${description}</p>${action}</div>`; }
  const logButton = (axis, text = 'Log a session') => `<button class="button primary small" data-action="log" ${axis ? `data-axis="${axis}"` : ''}>${icon('plus')}${text}</button>`;
  const heroArt = () => `<div class="hero-art" aria-hidden="true"><svg viewBox="0 0 280 225" fill="none"><defs><pattern id="hero-grid" width="23" height="23" patternUnits="userSpaceOnUse"><path d="M23 0H0v23" stroke="#b9c7aa" stroke-opacity=".3" stroke-width=".7"/></pattern></defs><rect x="28" width="242" height="225" fill="url(#hero-grid)"/><circle cx="157" cy="104" r="73" stroke="#c0cbaa" stroke-dasharray="3 5"/><circle cx="157" cy="104" r="54" fill="#d6dfc6"/><path d="M30 209H251" stroke="#9cac88" stroke-width="1.4"/><path d="M75 198h119" stroke="#849577" stroke-width="4" stroke-linecap="round"/><path d="M112 196c3-13 8-30 18-43l7-33" stroke="#b88058" stroke-width="13" stroke-linecap="round"/><path d="m154 121 6 39 19 34" stroke="#dca27a" stroke-width="13" stroke-linecap="round"/><path d="m130 139 7-38 17 2 6 37" fill="#334b36"/><path d="m140 104-5-40-22-38" stroke="#334b36" stroke-width="15" stroke-linecap="round"/><path d="m150 105 18-44 23-33" stroke="#415b3c" stroke-width="15" stroke-linecap="round"/><path d="m110 26-8-9m90 10 10-4" stroke="#e0a27b" stroke-width="9" stroke-linecap="round"/><circle cx="145" cy="158" r="12" fill="#d7a077"/><path d="M134 159c-2-12 15-20 22-7l-5 3-4-2-3 8-7 3" fill="#253e2d"/><path d="m106 198-9 1m82-3 11 3" stroke="#dba27c" stroke-width="6" stroke-linecap="round"/><path d="m213 86 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" fill="#c47b53"/><circle cx="68" cy="137" r="4" fill="#c1ccae"/><path d="m228 158 7-7m-7 0 7 7" stroke="#94a981" stroke-width="1.5"/><rect x="174" y="172" width="78" height="28" rx="14" fill="#fffdf3"/><circle cx="188" cy="186" r="6" fill="#e9eedd"/><path d="m185 186 2 2 3-4" stroke="#6f8760" stroke-width="1.2"/><text x="199" y="189" fill="#7b886c" font-size="7" font-family="sans-serif" letter-spacing=".4">FIND YOUR FORM</text></svg></div>`;
  function weekCard() {
    const start = F.weekStart(), end = F.shiftDate(start, 6), sessions = state.sessions.filter(s => s.date >= start && s.date <= end);
    const days = new Set(sessions.map(s => s.date)), count = sessions.length;
    return `<div class="weekly-card"><div class="card-kicker">This week<button class="text-button" data-action="settings" aria-label="Edit weekly session target">${icon('calendar')}</button></div><div class="week-progress"><strong>${count}</strong><span>/ ${state.settings.weeklyGoal} sessions</span></div><div class="week-days">${['M','T','W','T','F','S','S'].map((day,i) => { const date = F.shiftDate(start,i); return `<div class="week-day" title="${dateLabel(date)} · ${days.has(date) ? 'Trained' : 'No session'}"><span class="day-dot ${days.has(date) ? 'done' : ''} ${date === F.today() ? 'today' : ''}">${days.has(date) ? '✓' : '·'}</span>${day}</div>`; }).join('')}</div><p class="weekly-caption">${count >= state.settings.weeklyGoal ? 'Weekly target reached. Keep finding your rhythm.' : `${state.settings.weeklyGoal - count} more ${state.settings.weeklyGoal - count === 1 ? 'session' : 'sessions'} to your weekly target.`}</p></div>`;
  }
  function sparkline(values, color) {
    if (!values.length) return `<svg class="sparkline" viewBox="0 0 200 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 25H200" stroke="${color}" stroke-opacity=".3" stroke-dasharray="4 5"/></svg>`;
    const max = Math.max(...values,1), min = Math.min(...values,0);
    const points = values.map((v,i) => `${values.length === 1 ? 100 : i / (values.length - 1) * 200},${27 - (v - min) / (max - min || 1) * 23}`).join(' ');
    return `<svg class="sparkline" viewBox="0 0 200 32" preserveAspectRatio="none" aria-hidden="true"><polyline points="0,32 ${points} 200,32" fill="${color}" fill-opacity=".045"/><polyline points="${points}" fill="none" stroke="${color}" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
  }
  function axisCard(axis) {
    const meta = AXES[axis], sessions = state.sessions.filter(s => s.axis === axis);
    const exerciseCount = new Set(sessions.flatMap(s => s.entries.map(e => e.exercise))).size;
    const totalReps = sessions.reduce((sum,s) => sum + s.entries.reduce((n,e) => n + (e.reps || 0) * e.sets,0),0);
    const maxWeight = sessions.length ? Math.max(...sessions.flatMap(s => s.entries.map(e => e.weight || 0))) : 0;
    const goals = state.goals.filter(g => g.axis === axis), completed = goals.filter(g => F.goalProgress(state,g).percent === 100).length;
    const countValues = Array.from({length:8},(_,i) => { const start = F.shiftDate(F.weekStart(), (i - 7) * 7); return sessions.filter(s => s.date >= start && s.date <= F.shiftDate(start,6)).length; });
    return `<a class="axis-card" href="#${axis}" style="${style(axis)}"><div class="axis-heading"><div><span class="axis-icon">${icon(meta.icon)}</span><div><h3>${meta.name}</h3><div class="eyebrow">${meta.eyebrow}</div></div></div><span class="circle-arrow">${icon('diagonal')}</span></div><div class="axis-stat"><strong>${axis === 'skills' ? exerciseCount : number(axis === 'endurance' ? totalReps : maxWeight)}</strong><span>${axis === 'skills' ? 'skills practiced' : axis === 'endurance' ? 'total reps' : 'kg best load'}</span>${completed ? `<small>${completed} goal${completed > 1 ? 's' : ''} hit</small>` : ''}</div><p class="axis-description">${meta.description}</p>${sparkline(sessions.length ? countValues : [], meta.color)}<div class="axis-footer"><span>${sessions.length} ${sessions.length === 1 ? 'session' : 'sessions'} logged</span><strong>Explore ${meta.name.toLowerCase()} ${'↗'}</strong></div></a>`;
  }
  function activityPanel() {
    const weeks = Array.from({length:chartWeeks},(_,i) => { const date = F.shiftDate(F.weekStart(), (i - chartWeeks + 1) * 7); const counts = Object.keys(AXES).map(axis => state.sessions.filter(s => s.axis === axis && s.date >= date && s.date <= F.shiftDate(date,6)).length); return { date, counts, total: counts.reduce((a,b) => a+b,0) }; });
    const max = Math.max(...weeks.map(w => w.total), 4), total = weeks.reduce((n,w) => n+w.total,0);
    return `<section class="panel"><div class="section-heading"><h2>Consistency compounds.</h2><div class="segmented" aria-label="Activity chart period">${[4,8].map(n => `<button data-action="chart-weeks" data-weeks="${n}" class="${chartWeeks === n ? 'active' : ''}" aria-pressed="${chartWeeks === n}">${n}W</button>`).join('')}</div></div><p class="panel-subtitle">Your sessions, across all three axes.</p><div class="bar-chart" role="img" aria-label="Weekly training sessions: ${weeks.map(w => `${dateLabel(w.date)}: ${w.total}`).join('; ')}">${weeks.map(w => `<div class="bar-column" title="Week of ${dateLabel(w.date)}: ${w.counts.map((c,i) => `${Object.values(AXES)[i].name} ${c}`).join(', ')}"><div class="bar-stack" style="height:${Math.max(1,w.total/max*100)}%">${w.counts.map((c,i) => c ? `<span style="--axis:${Object.values(AXES)[i].color};height:${c / w.total * 100}%"></span>` : '').join('')}</div></div>`).join('')}</div><div class="bar-labels">${weeks.map(w => `<span>${dateLabel(w.date)}</span>`).join('')}</div><div class="chart-foot"><p><strong>${total} sessions</strong> in ${chartWeeks} weeks</p><div class="legend">${Object.keys(AXES).map(a => `<span style="${style(a)}"><i></i>${AXES[a].name}</span>`).join('')}</div></div></section>`;
  }
  function goalRow(g) {
    const ex = F.exercise(g.axis,g.exercise), progress = F.goalProgress(state,g);
    return `<div class="goal-row" style="${style(g.axis)}"><div class="goal-row-top"><span class="goal-mini-icon">${icon(AXES[g.axis].icon)}</span><div class="goal-row-title"><strong>${ex.name}</strong><span>${g.axis === 'skills' ? escape(g.variation) : g.axis === 'weighted' ? 'Best added weight' : 'Best reps in one set'}</span></div><div class="goal-value">${number(progress.value)} <span>/ ${number(g.target)} ${ex.unit}</span></div></div><div class="progress-track" role="progressbar" aria-label="${ex.name} goal" aria-valuenow="${progress.percent}" aria-valuemin="0" aria-valuemax="100"><div class="progress-fill" style="width:${progress.percent}%"></div></div><div class="goal-progress-text"><span>${progress.percent === 100 ? 'Goal achieved ✓' : `${progress.percent}% of your target`}</span>${!progress.hasData ? '<span>Ready to begin</span>' : ''}</div></div>`;
  }
  function goalsPanel() { return `<section class="panel"><div class="section-heading"><h2>The next milestone</h2><a class="text-button" href="#goals">View all ${icon('arrow')}</a></div><p class="panel-subtitle">A clear target. One session closer.</p>${state.goals.length ? [...state.goals].sort((a,b) => (F.goalProgress(state,a).percent === 100) - (F.goalProgress(state,b).percent === 100)).slice(0,3).map(goalRow).join('') : empty('Give your progress a direction.', 'Set a hold time, a rep target, or your next added weight.', '<button class="button secondary" data-action="goal">Set your first goal</button>', 'target')}</section>`; }
  function entryText(axis,e) { const ex = F.exercise(axis,e.exercise); return axis === 'skills' ? `${e.sets} × ${number(e.value)} ${ex.unit}` : axis === 'weighted' ? `${e.sets} × ${e.reps} · +${number(e.weight)} kg` : `${e.sets} × ${e.reps} reps`; }
  function sessionRow(s) {
    const main = s.entries[0], ex = F.exercise(s.axis,main.exercise);
    return `<div class="session-row" style="${style(s.axis)}"><span class="session-axis-icon">${icon(AXES[s.axis].icon)}</span><div><strong>${AXES[s.axis].name} session</strong><span>${ex.name}${s.entries.length > 1 ? ` + ${s.entries.length - 1} more` : ''}</span></div><div class="session-result">${entryText(s.axis,main)}</div><span class="session-date">${dateLabel(s.date)}</span><span class="session-duration">${s.duration} min</span><button class="icon-button" data-action="session" data-id="${escape(s.id)}" aria-label="View ${AXES[s.axis].name.toLowerCase()} session on ${dateLabel(s.date)}">${icon('arrow')}</button></div>`;
  }
  function renderOverview() {
    const greeting = state.settings.name === 'Athlete' ? 'Your progress, in motion.' : `Keep moving, ${escape(state.settings.name)}.`;
    return `${heading('THE LONG GAME STARTS HERE', greeting, 'Every hold, every rep, every kilo. It all adds up.', !state.sessions.length && !demo ? '<button class="button secondary small" data-action="toggle-demo">Explore demo '+icon('diagonal')+'</button>' : '<button class="button secondary small" data-action="goal">'+icon('target')+'Set a goal</button>')}<div class="hero-grid"><section class="hero"><div class="hero-copy"><div class="eyebrow">${icon('spark')} YOUR ONLY COMPETITION IS YOU</div><h2>Small reps.<br><span>Big progress.</span></h2><p>Build control. Find your endurance.<br>Get stronger, on your own terms.</p></div>${heroArt()}</section>${weekCard()}</div><div class="section-heading"><h2>Three axes. One stronger you.</h2><span>YOUR LIFETIME PROGRESS</span></div><div class="axis-grid">${Object.keys(AXES).map(axisCard).join('')}</div><div class="dashboard-bottom">${activityPanel()}${goalsPanel()}</div><section class="recent-section panel"><div class="section-heading"><h2>Latest efforts</h2><a class="text-button" href="#history">All sessions ${icon('arrow')}</a></div>${state.sessions.length ? `<div class="session-list">${sortedSessions().slice(0,3).map(sessionRow).join('')}</div>` : empty('Your first session starts the story.', 'Log what you trained today. Your records and charts will grow with you.', logButton(), 'history', true)}</section>`;
  }
  function selectedVariation(axis, ex) {
    if (axis !== 'skills') return undefined;
    const logged = F.entriesFor(state,axis,ex.id);
    return ex.variations[Math.max(0, ...logged.map(e => ex.variations.indexOf(e.variation)))];
  }
  function exerciseCard(axis, ex) {
    const variation = selectedVariation(axis,ex), value = F.best(state,axis,ex.id,variation), entries = F.entriesFor(state,axis,ex.id);
    const latest = entries.at(-1), stage = value === null ? -1 : ex.variations?.indexOf(variation);
    const art = axis === 'skills' ? SKILL_ART[ex.id] : null;
    const visual = art ? `<figure class="skill-visual"><img src="assets/skills/${ex.id}.png" alt="${escape(art.alt)}" width="1254" height="1254" loading="lazy" decoding="async"><figcaption>${art.pose}</figcaption></figure>` : `<span class="axis-icon">${icon(AXES[axis].icon)}</span>`;
    return `<div class="exercise-card ${art ? 'illustrated-skill' : ''}" style="${style(axis)}">${visual}<h3>${ex.name}</h3><p>${axis === 'skills' ? `${value === null ? 'Start with' : 'Recorded variation'} · ${escape(variation)}` : axis === 'weighted' ? 'Best added weight' : 'Best reps in one set'}</p><div class="exercise-result">${value === null ? '—' : `${axis === 'weighted' ? '+' : ''}${number(value)}`} <span>${ex.unit}</span></div><div class="exercise-sub">${value === null ? 'Your next starting point' : 'Personal best'}</div>${ex.variations ? `<div class="variation-steps" aria-label="${value === null ? 'No variation logged' : `${escape(variation)} is your most advanced logged variation`}">${ex.variations.map((v,i) => `<span class="${i <= stage ? 'filled' : ''}" title="${escape(v)}"></span>`).join('')}</div>` : ''}<div class="exercise-card-footer"><small>${latest ? `Last trained ${dateLabel(latest.date)}` : 'No sessions yet'}</small><button class="text-button" data-action="log" data-axis="${axis}" data-exercise="${ex.id}">Log effort ${icon('plus')}</button></div></div>`;
  }
  function lineChart(axis, ex, variation) {
    const all = F.entriesFor(state,axis,ex.id,variation), byDate = new Map();
    all.forEach(e => byDate.set(e.date, Math.max(byDate.get(e.date) ?? 0,e.valueMetric)));
    const points = [...byDate.entries()].slice(-12);
    if (!points.length) return empty('Your progress will take shape here.', 'Log this exercise to see your best set from each training day.', logButton(axis), 'chart', true);
    const width = 560, height = 190, top = 15, bottom = 160, left = 37, right = 534, max = Math.max(...points.map(p=>p[1])) * 1.15;
    const firstTime = F.dateAt(points[0][0]).getTime(), lastTime = F.dateAt(points.at(-1)[0]).getTime();
    const coords = points.map(([d,v]) => ({x:points.length === 1 ? (left+right)/2 : left+(F.dateAt(d).getTime()-firstTime)/(lastTime-firstTime)*(right-left), y:bottom-v/max*(bottom-top), d,v}));
    return `<svg class="line-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${ex.name} best set per day: ${points.map(([d,v]) => `${dateLabel(d)} ${number(v)} ${ex.unit}`).join(', ')}">${[0,1,2,3].map(i => {const y=bottom-i/3*(bottom-top);return `<path d="M${left} ${y}H${right}" stroke="#e9ebe1" stroke-dasharray="3 4"/><text x="25" y="${y+3}" text-anchor="end">${number(max*i/3)}</text>`;}).join('')}<path d="M${coords[0].x} ${bottom} ${coords.map(c=>`L${c.x} ${c.y}`).join(' ')} L${coords.at(-1).x} ${bottom}Z" fill="${AXES[axis].color}" fill-opacity=".07"/><polyline points="${coords.map(c=>`${c.x},${c.y}`).join(' ')}" fill="none" stroke="${AXES[axis].color}" stroke-width="2.5" stroke-linejoin="round"/>${coords.map(c=>`<circle cx="${c.x}" cy="${c.y}" r="4" fill="${AXES[axis].color}" stroke="#fffefa" stroke-width="2"><title>${dateLabel(c.d)}: ${number(c.v)} ${ex.unit}</title></circle>`).join('')}${coords.filter((c,i)=>i===0||i===coords.length-1||(coords.length>5&&i===Math.floor(coords.length/2))).map(c=>`<text x="${c.x}" y="184" text-anchor="middle">${dateLabel(c.d)}</text>`).join('')}</svg><p class="chart-note">Best set per training day · ${ex.unit}${variation ? ` · ${escape(variation)}` : ''} · Last ${points.length} recorded ${points.length === 1 ? 'day' : 'days'}</p>`;
  }
  function trendPanel(axis) {
    const ex = F.exercise(axis,chartExercise[axis]) || EXERCISES[axis][0]; chartExercise[axis] = ex.id;
    const variation = axis === 'skills' ? ex.variations.includes(chartVariation[ex.id]) ? chartVariation[ex.id] : selectedVariation(axis,ex) : undefined;
    return `<section class="panel"><div class="section-heading"><h2>See the progress.</h2><span>${icon('chart')}</span></div><p class="panel-subtitle">Compare the same exercise, one session at a time.</p><div class="chart-controls"><select id="chart-exercise" aria-label="Exercise to chart">${EXERCISES[axis].map(e=>`<option value="${e.id}" ${e.id===ex.id?'selected':''}>${e.name}</option>`).join('')}</select>${axis === 'skills' ? `<select id="chart-variation" aria-label="Skill variation to chart">${ex.variations.map(v=>`<option ${v===variation?'selected':''}>${v}</option>`).join('')}</select>` : ''}</div>${lineChart(axis,ex,variation)}</section>`;
  }
  function skillTabs() {
    return `<nav class="skill-tabs" aria-label="Skills pages"><a href="#skills" ${page==='skills'?'aria-current="page"':''}>My progress</a><a href="#skill-inventory" ${page==='skill-inventory'?'aria-current="page"':''}>Skill inventory <span>${EXERCISES.skills.length}</span></a></nav>`;
  }
  function inventoryBanner() {
    return `<section class="inventory-banner" aria-labelledby="inventory-banner-title"><div class="inventory-banner-copy"><div class="eyebrow">YOUR MOVEMENT LIBRARY</div><h2 id="inventory-banner-title">More skills. New possibilities.</h2><p>Explore ${EXERCISES.skills.length} illustrated movements, from the essentials to the skills you’re working toward.</p><a class="button primary" href="#skill-inventory">Explore skill inventory ${icon('arrow')}</a></div><div class="inventory-preview" aria-hidden="true">${['frog-stand','handstand','ring-support'].map(id=>`<img src="assets/skills/${id}.png" alt="" width="1254" height="1254">`).join('')}</div></section>`;
  }
  function inventoryCard(ex) {
    const art=SKILL_ART[ex.id], practiced=F.entriesFor(state,'skills',ex.id).length>0;
    return `<article class="inventory-card" aria-labelledby="inventory-${ex.id}"><button class="inventory-image" data-action="skill-details" data-exercise="${ex.id}" aria-label="View ${ex.name} details"><img src="assets/skills/${ex.id}.png" alt="${escape(art.alt)}" width="1254" height="1254" loading="lazy" decoding="async"><span class="inventory-status ${practiced?'is-practiced':''}">${practiced?'Practiced':'To explore'}</span></button><div class="inventory-card-body"><div class="inventory-kicker">${ex.category}${ex.foundation?' <span>Foundation</span>':''}</div><h2 id="inventory-${ex.id}"><button data-action="skill-details" data-exercise="${ex.id}">${ex.name}</button></h2><p>${ex.description}</p><div class="inventory-meta"><span>${ex.equipment}</span><span>${ex.unit==='sec'?'Timed hold':'Reps'}</span></div><button class="inventory-variations text-button" data-action="skill-details" data-exercise="${ex.id}">${ex.variations.length} variations ${icon('arrow')}</button><div class="inventory-card-actions"><button class="button secondary small" data-action="log" data-axis="skills" data-exercise="${ex.id}" aria-label="Log ${ex.name}">${icon('plus')}Log effort</button><button class="text-button" data-action="goal" data-axis="skills" data-exercise="${ex.id}" aria-label="Set ${ex.name} goal">Set goal ${icon('target')}</button></div></div></article>`;
  }
  function inventoryResults() {
    const skills=F.filterSkills(state,inventoryFilters);
    return skills.length ? `<div class="inventory-grid">${skills.map(inventoryCard).join('')}</div>` : `<section class="panel">${empty('No skills match yet.','Try a different search or clear the filters to see the full collection.','<button class="button secondary" data-action="inventory-reset">Clear filters</button>','skill')}</section>`;
  }
  function updateInventoryResults() {
    $('#inventory-results').innerHTML=inventoryResults();
    $('#inventory-count').textContent=`${F.filterSkills(state,inventoryFilters).length} of ${EXERCISES.skills.length} skills`;
    $$('[data-action="inventory-category"]').forEach(button=>{
      const active=button.dataset.category===inventoryFilters.category;
      button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));
    });
  }
  function renderInventory() {
    const practiced=F.filterSkills(state,{status:'practiced'}).length;
    return `${heading('EXPLORE. PRACTICE. PROGRESS.','Skill inventory.','Your complete movement library. Find a starting point, or your next challenge.')} ${skillTabs()}<section class="inventory-intro"><div><span class="inventory-total">${EXERCISES.skills.length}</span><span>skills to explore<br><small>Foundations to advanced movements</small></span></div><p><strong>${practiced}</strong> practiced <span>·</span> <strong>${EXERCISES.skills.length-practiced}</strong> to discover</p></section><section class="inventory-controls" aria-label="Filter skill inventory"><div class="inventory-search-row"><input type="search" id="inventory-search" placeholder="Search skills, equipment, or variations…" aria-label="Search skill inventory" value="${escape(inventoryFilters.query)}"><label>Status<select id="inventory-status">${[['all','All skills'],['practiced','Practiced'],['unpracticed','To explore']].map(([value,label])=>`<option value="${value}" ${inventoryFilters.status===value?'selected':''}>${label}</option>`).join('')}</select></label><label>Measure<select id="inventory-unit">${[['all','Holds & reps'],['sec','Timed holds'],['reps','Reps']].map(([value,label])=>`<option value="${value}" ${inventoryFilters.unit===value?'selected':''}>${label}</option>`).join('')}</select></label></div><div class="filter-chips" aria-label="Skill categories">${['all','foundations','Balance','Push','Pull','Core','Legs'].map(category=>`<button class="filter-chip ${inventoryFilters.category===category?'active':''}" data-action="inventory-category" data-category="${category}" aria-pressed="${inventoryFilters.category===category}">${category==='all'?'All movements':category==='foundations'?'Foundations':category}</button>`).join('')}</div></section><div class="inventory-results-heading"><p id="inventory-count" role="status" aria-live="polite">${F.filterSkills(state,inventoryFilters).length} of ${EXERCISES.skills.length} skills</p><button class="text-button" data-action="inventory-reset">Clear filters</button></div><div id="inventory-results">${inventoryResults()}</div><div class="hint-panel">Log a skill or set a goal to see it on <a href="#skills"><strong>My progress</strong></a>. “Practiced” means you have logged it in Skills. Each variation keeps its own records.</div>`;
  }
  function showSkill(exerciseId) {
    const ex=F.exercise('skills',exerciseId);if(!ex)return;
    const art=SKILL_ART[ex.id];
    openDialog(`${dialogHead(ex.name,ex.description)}<div class="dialog-body skill-detail"><figure><img src="assets/skills/${ex.id}.png" alt="${escape(art.alt)}" width="1254" height="1254"><figcaption>Illustrated: ${art.pose}</figcaption></figure><div class="session-summary"><span class="summary-chip">${ex.category}</span><span class="summary-chip">${ex.equipment}</span><span class="summary-chip">${ex.unit==='sec'?'Hold time in seconds':'Controlled reps'}</span></div><h3>Variations & your records</h3><p class="field-hint">Choose the variation you train. These are options to track, not a required sequence.</p><ul class="skill-variation-list">${ex.variations.map(variation=>{const best=F.best(state,'skills',ex.id,variation);return `<li><span>${escape(variation)}</span><strong>${best===null?'Not logged':number(best)+' '+ex.unit}</strong></li>`;}).join('')}</ul><div class="dialog-footer"><button class="button secondary" data-action="goal" data-axis="skills" data-exercise="${ex.id}">${icon('target')}Set goal</button><button class="button primary" data-action="log" data-axis="skills" data-exercise="${ex.id}">${icon('plus')}Log effort</button></div></div>`);
  }
  function renderAxis(axis) {
    const sessions = state.sessions.filter(s=>s.axis===axis), minutes = sessions.reduce((n,s)=>n+s.duration,0), exerciseCount = new Set(sessions.flatMap(s=>s.entries.map(e=>e.exercise))).size;
    const axisGoals = state.goals.filter(g=>g.axis===axis);
    const activeIds = new Set([...sessions.flatMap(s=>s.entries.map(e=>e.exercise)), ...axisGoals.map(g=>g.exercise)]);
    const collection = axis === 'skills' ? EXERCISES.skills.filter(ex=>activeIds.size ? activeIds.has(ex.id) : ['push-up','hollow-body','frog-stand'].includes(ex.id)) : EXERCISES[axis];
    return `${heading(AXES[axis].eyebrow, `${AXES[axis].name}, on your terms.`, {skills:'Track your variations, hold times, and controlled reps.',endurance:'Follow your best sets and build your total training volume.',weighted:'Track added load, sets, and reps as your strength grows.'}[axis], logButton(axis,'Log '+axis))}${axis==='skills'?skillTabs():''}<div class="stats-strip"><div class="stat-box"><span>SESSIONS LOGGED</span><strong>${sessions.length}</strong></div><div class="stat-box"><span>TIME INVESTED</span><strong>${number(minutes/60)}<small>hours</small></strong></div><div class="stat-box"><span>EXERCISES PRACTICED</span><strong>${exerciseCount}<small>/ ${EXERCISES[axis].length}</small></strong></div></div>${axis==='skills'?inventoryBanner():''}<div class="section-heading"><h2>${axis==='skills'?(activeIds.size?'Your skill practice':'A few places to begin'):'Your movements'}</h2>${axis==='skills'?'<a class="text-button" href="#skill-inventory">All skills '+icon('arrow')+'</a>':'<span>PERSONAL RECORDS</span>'}</div>${axis==='skills'?'<p class="panel-subtitle">'+(activeIds.size?'Movements you have logged or set a goal for.':'Log a skill or set a goal to make this space your own.')+'</p>':''}<div class="exercise-grid">${collection.map(ex=>exerciseCard(axis,ex)).join('')}</div><div class="trend-layout">${trendPanel(axis)}<section class="panel"><div class="section-heading"><h2>Keep a target in sight.</h2></div><p class="panel-subtitle">Your ${AXES[axis].name.toLowerCase()} milestones.</p>${axisGoals.length ? axisGoals.map(goalRow).join('') : empty('One clear next step.', 'Choose a movement and give yourself a target to work toward.', `<button class="button secondary" data-action="goal" data-axis="${axis}">Set a goal ${icon('plus')}</button>`,'target')}</section></div>${axis==='skills'?'<div class="hint-panel">Variation bars show the <strong>most advanced variation you have logged</strong>, not a mastery rating. Charts compare the same variation so your progress stays meaningful.</div>':axis==='weighted'?'<div class="hint-panel">Load is recorded as <strong>added weight in kilograms</strong>, excluding body weight. Your best load is the heaviest logged set; reps and sets remain visible in your history.</div>':'<div class="hint-panel">A personal record is your <strong>highest rep count in one set</strong>. Total volume includes every logged set: sets × reps.</div>'}`;
  }
  function historyResults() {
    const query=historyQuery.trim().toLowerCase();
    const sessions=sortedSessions().filter(s=>(historyFilter==='all'||s.axis===historyFilter)&&(!query||`${AXES[s.axis].name} ${s.date} ${s.notes} ${s.entries.map(e=>F.exercise(s.axis,e.exercise).name+' '+(e.variation||'')).join(' ')}`.toLowerCase().includes(query)));
    return `<div class="history-count">${sessions.length} ${sessions.length===1?'session':'sessions'}${query?' found':' in your journal'}</div><section class="panel">${sessions.length?sessions.map(sessionRow).join(''):empty(state.sessions.length?'No sessions match.':'Make your first entry.',state.sessions.length?'Try another search or training axis.':'A few details today become a useful picture of your progress.',state.sessions.length?'':logButton(),'history')}</section>`;
  }
  function renderHistory() { return `${heading('THE WORK YOU PUT IN','Your training, recorded.','A journal of every effort, across all three axes.')}<div class="toolbar"><div class="filter-chips" aria-label="Filter sessions by training axis">${['all',...Object.keys(AXES)].map(axis=>`<button class="filter-chip ${historyFilter===axis?'active':''}" data-action="filter" data-axis="${axis}" aria-pressed="${historyFilter===axis}">${axis==='all'?'All sessions':AXES[axis].name}</button>`).join('')}</div><input class="search-input" id="history-search" type="search" placeholder="Search exercises or notes…" aria-label="Search sessions" value="${escape(historyQuery)}"></div><div id="history-results">${historyResults()}</div>`; }
  function renderGoals() {
    const complete=state.goals.filter(g=>F.goalProgress(state,g).percent===100).length;
    return `${heading('A LITTLE FURTHER FROM HERE','The next version of you.','Personal targets for the things you want to get better at.','<button class="button primary" data-action="goal">'+icon('plus')+'New goal</button>')}<div class="stats-strip"><div class="stat-box"><span>ACTIVE GOALS</span><strong>${state.goals.length-complete}</strong></div><div class="stat-box"><span>MILESTONES REACHED</span><strong>${complete}</strong></div><div class="stat-box"><span>AXES WITH TARGETS</span><strong>${new Set(state.goals.map(g=>g.axis)).size}<small>/ 3</small></strong></div></div>${state.goals.length?`<div class="goal-grid">${state.goals.map(g=>{const ex=F.exercise(g.axis,g.exercise), p=F.goalProgress(state,g);return `<article class="goal-card" style="${style(g.axis)}"><div class="goal-card-top"><span class="axis-pill">${icon(AXES[g.axis].icon)}${AXES[g.axis].name}</span>${p.percent===100?icon('check'):icon('target')}</div><h3>${ex.name}</h3><p>${g.axis==='skills'?escape(g.variation):g.axis==='weighted'?'Best added weight':'Best reps in one set'}</p><div class="goal-amount">${number(p.value)} <span>/ ${number(g.target)} ${ex.unit}</span></div><div class="progress-track" role="progressbar" aria-label="${ex.name} goal" aria-valuenow="${p.percent}" aria-valuemin="0" aria-valuemax="100"><div class="progress-fill" style="width:${p.percent}%"></div></div><div class="goal-progress-text"><span>${p.percent===100?'Milestone reached ✓':'One effort at a time'}</span><span>${p.percent}%</span></div><div class="goal-card-footer"><button class="text-button" data-action="edit-goal" data-id="${escape(g.id)}">${icon('edit')}Edit goal</button><button class="text-button" data-action="delete-goal" data-id="${escape(g.id)}">${icon('trash')}Remove</button></div></article>`;}).join('')}</div>`:`<section class="panel">${empty('What are you working toward?','A 30-second handstand. Twenty pull-ups. Your first +20 kg dip. Make it yours.','<button class="button primary" data-action="goal">'+icon('plus')+'Set your first goal</button>','target')}</section>`}<div class="hint-panel">Goals use your <strong>best recorded set</strong>, across your full journal. Skill goals are specific to a variation. Update a target whenever you’re ready for the next step.</div>`;
  }
  function render() {
    if (!['overview','skills','skill-inventory','endurance','weighted','history','goals'].includes(page)) page='overview';
    renderNav();
    $('#main').innerHTML=page==='overview'?renderOverview():page==='skill-inventory'?renderInventory():Object.hasOwn(AXES,page)?renderAxis(page):page==='history'?renderHistory():renderGoals();
    hydrateIcons();
    document.title=`${page==='overview'?'Your progress':page==='skill-inventory'?'Skill inventory':Object.hasOwn(AXES,page)?AXES[page].name:page==='history'?'History':'Goals'} — Forma`;
  }

  function newEntry(axis, exerciseId) {
    const ex=F.exercise(axis,exerciseId)||EXERCISES[axis][0];
    return axis==='skills'?{exercise:ex.id,variation:selectedVariation(axis,ex),sets:3,value:''}:axis==='weighted'?{exercise:ex.id,sets:3,reps:5,weight:''}:{exercise:ex.id,sets:3,reps:''};
  }
  function startSession(axis, exerciseId, sessionId) {
    const existing=state.sessions.find(s=>s.id===sessionId);
    const chosen=axis||(Object.hasOwn(AXES,page)?page:'skills');
    draftSession=existing?JSON.parse(JSON.stringify(existing)):{id:F.id(),axis:chosen,date:F.today(),duration:45,rpe:7,notes:'',entries:[newEntry(chosen,exerciseId)]};
    draftSession.editing=!!existing;
    renderSessionForm();
  }
  function captureSessionForm() {
    const form=$('#session-form'); if(!form||!draftSession)return;
    for(const key of ['date','duration','rpe','notes']) draftSession[key]=form.elements[key].value;
    draftSession.entries=$$('[data-entry]',form).map(row=>{
      const e={}; $$('[data-field]',row).forEach(field=>e[field.dataset.field]=field.value);return e;
    });
  }
  function axisSelector(axis, action) { return `<div class="axis-selector" aria-label="Training axis">${Object.keys(AXES).map(a=>`<button type="button" class="axis-option ${a===axis?'active':''}" style="${style(a)}" data-action="${action}" data-axis="${a}" aria-pressed="${a===axis}">${icon(AXES[a].icon)}${AXES[a].name}</button>`).join('')}</div>`; }
  function entryForm(e,i,axis) {
    const ex=F.exercise(axis,e.exercise);
    return `<div class="entry-card" data-entry="${i}"><div class="entry-top"><span>EFFORT ${String(i+1).padStart(2,'0')}</span><button type="button" class="icon-button" data-action="remove-entry" data-index="${i}" ${draftSession.entries.length===1?'disabled':''} aria-label="Remove effort ${i+1}">${icon('close')}</button></div><div class="form-grid ${axis!=='skills'?'single':''}" ${axis!=='skills'?'style="grid-template-columns:1fr"':''}><label>Exercise<select data-field="exercise" data-entry-exercise="${i}">${EXERCISES[axis].map(ex=>`<option value="${ex.id}" ${ex.id===e.exercise?'selected':''}>${ex.name}</option>`).join('')}</select></label>${axis==='skills'?`<label>Variation<select data-field="variation">${ex.variations.map(v=>`<option ${v===e.variation?'selected':''}>${v}</option>`).join('')}</select></label>`:''}</div><div class="entry-values ${axis!=='weighted'?'two':''}"><label>Sets<input data-field="sets" type="number" min="1" max="100" step="1" value="${escape(e.sets)}" required inputmode="numeric"></label>${axis==='skills'?`<label>${ex.unit==='sec'?'Hold per set (sec)':'Reps per set'}<input data-field="value" type="number" min="${ex.unit==='sec'?'0.1':'1'}" max="3600" step="${ex.unit==='sec'?'0.1':'1'}" value="${escape(e.value)}" placeholder="${ex.unit==='sec'?'e.g. 15':'e.g. 3'}" required inputmode="decimal"></label>`:`<label>Reps per set<input data-field="reps" type="number" min="1" max="1000" step="1" value="${escape(e.reps)}" placeholder="e.g. 10" required inputmode="numeric"></label>`}${axis==='weighted'?`<label>Added kg<input data-field="weight" type="number" min="0.25" max="500" step="0.25" value="${escape(e.weight)}" placeholder="e.g. 10" required inputmode="decimal"></label>`:''}</div></div>`;
  }
  function renderSessionForm() {
    const s=draftSession;
    openDialog(`${dialogHead(s.editing?'Edit your session':demo?'Log a demo session':'Log your session',demo?'You’re editing sample data. Your personal journal stays separate.':'The effort is yours. Let’s make a note of it.')}<form id="session-form" class="dialog-body">${axisSelector(s.axis,'session-axis')}<div class="form-grid three"><label>Date<input name="date" type="date" value="${escape(s.date)}" min="2000-01-01" max="${F.today()}" required></label><label>Duration (min)<input name="duration" type="number" min="1" max="600" step="1" value="${escape(s.duration)}" required></label><label>Effort / 10<select name="rpe">${Array.from({length:10},(_,i)=>`<option value="${i+1}" ${+s.rpe===i+1?'selected':''}>${i+1}${i===0?' · Easy':i===6?' · Challenging':i===9?' · Maximum':''}</option>`).join('')}</select></label></div><div class="form-section-label">Your movements</div><div id="session-entries">${s.entries.map((e,i)=>entryForm(e,i,s.axis)).join('')}</div><p class="field-hint" style="margin-bottom:12px">Each effort groups sets with the same result. Add another effort if your reps, hold time, or load changed.</p><button type="button" class="add-exercise" data-action="add-entry" ${s.entries.length>=30?'disabled':''}>${icon('plus')}Add an effort</button><label>Session notes <small>Optional</small><textarea name="notes" maxlength="2000" placeholder="How did it feel? What’s worth remembering?">${escape(s.notes)}</textarea></label><div class="form-error" id="form-error" role="alert"></div><div class="dialog-footer"><span class="left-note">${demo?'Sample workspace':'Saved in your browser'}</span><button type="button" class="button secondary" data-action="close">Cancel</button><button type="submit" class="button primary">${icon('check')}${s.editing?'Save changes':'Save session'}</button></div></form>`);
  }
  function savedToast(message) { toast(storageAvailable?message:'Changes are in memory only. Export a backup before closing.'); }
  function saveSession(event) {
    event.preventDefault(); captureSessionForm();
    const d=draftSession;
    const session={id:d.id,axis:d.axis,date:d.date,duration:+d.duration,rpe:+d.rpe,notes:d.notes.trim(),entries:d.entries.map(e=>({exercise:e.exercise,sets:+e.sets,...(d.axis==='skills'?{variation:e.variation,value:+e.value}:{reps:+e.reps,...(d.axis==='weighted'?{weight:+e.weight}:{})})}))};
    const next={...state,sessions:d.editing?state.sessions.map(s=>s.id===d.id?session:s):[...state.sessions,session]};
    try{ F.validateState(next); }catch(e){$('#form-error').textContent=e.message;return;}
    if(!persist(next))return;
    closeDialog();render();savedToast(d.editing?'Session updated.':'Session saved. Another effort in the bank.');
  }
  function showSession(id) {
    const s=state.sessions.find(s=>s.id===id);if(!s)return;
    openDialog(`${dialogHead(`${AXES[s.axis].name} session`,dateLabel(s.date,{weekday:'long',month:'long',day:'numeric',year:'numeric'}))}<div class="dialog-body"><div class="session-summary"><span class="summary-chip">${s.duration} minutes</span><span class="summary-chip">Effort ${s.rpe}/10</span><span class="summary-chip">${s.entries.reduce((n,e)=>n+e.sets,0)} sets</span></div>${s.entries.map(e=>`<div class="detail-entry"><div><strong>${F.exercise(s.axis,e.exercise).name}</strong><small>${s.axis==='skills'?escape(e.variation):s.axis==='weighted'?'Added load, excluding body weight':'Bodyweight movement'}</small></div><b>${entryText(s.axis,e)}</b></div>`).join('')}${s.notes?`<div class="form-section-label">Your notes</div><p class="session-notes">${escape(s.notes)}</p>`:''}<div class="dialog-footer"><button class="text-button" style="margin-right:auto;color:#a56a54" data-action="delete-session" data-id="${escape(s.id)}">${icon('trash')}Delete</button><button class="button secondary" data-action="close">Close</button><button class="button primary" data-action="edit-session" data-id="${escape(s.id)}">${icon('edit')}Edit session</button></div></div>`);
  }
  function startGoal(axis, goalId, exerciseId) {
    const existing=state.goals.find(g=>g.id===goalId), a=existing?.axis||axis||(Object.hasOwn(AXES,page)?page:'skills'), ex=F.exercise(a,exerciseId)||EXERCISES[a][0];
    draftGoal=existing?{...existing,editing:true}:{id:F.id(),axis:a,exercise:ex.id,...(a==='skills'?{variation:selectedVariation(a,ex)}:{}),target:'',editing:false};
    renderGoalForm();
  }
  function captureGoal() {
    const form=$('#goal-form');if(!form)return;
    draftGoal.exercise=form.elements.exercise.value;draftGoal.target=form.elements.target.value;
    if(draftGoal.axis==='skills')draftGoal.variation=form.elements.variation.value;
  }
  function renderGoalForm() {
    const g=draftGoal,ex=F.exercise(g.axis,g.exercise);
    openDialog(`${dialogHead(g.editing?'Move the goalpost.':'Set your next milestone.','Choose a target that means something to you.')}<form id="goal-form" class="dialog-body">${axisSelector(g.axis,'goal-axis')}<div class="form-grid"><label>Exercise<select name="exercise" id="goal-exercise">${EXERCISES[g.axis].map(e=>`<option value="${e.id}" ${e.id===g.exercise?'selected':''}>${e.name}</option>`).join('')}</select></label>${g.axis==='skills'?`<label>Variation<select name="variation">${ex.variations.map(v=>`<option ${g.variation===v?'selected':''}>${v}</option>`).join('')}</select></label>`:''}<label>Target (${ex.unit})<input type="number" name="target" min="${ex.unit==='kg'?'.25':ex.unit==='sec'?'.1':'1'}" max="${ex.unit==='kg'?500:ex.unit==='sec'?3600:1000}" step="${ex.unit==='kg'?'.25':ex.unit==='sec'?'.1':'1'}" placeholder="${ex.unit==='kg'?'e.g. 30':'e.g. 20'}" value="${escape(g.target)}" required></label></div><p class="field-hint">${g.axis==='skills'?'Measured against your best single set of this exact variation.':g.axis==='endurance'?'Measured against your highest reps in one set.':'Measured against your heaviest added weight in a completed set, at any rep count.'}</p><div class="form-error" id="form-error" role="alert"></div><div class="dialog-footer"><button type="button" class="button secondary" data-action="close">Cancel</button><button class="button primary" type="submit">${icon('target')}${g.editing?'Update goal':'Create goal'}</button></div></form>`);
  }
  function saveGoal(event) {
    event.preventDefault();captureGoal();const g=draftGoal;
    const goal={id:g.id,axis:g.axis,exercise:g.exercise,target:+g.target,...(g.axis==='skills'?{variation:g.variation}:{})};
    const next={...state,goals:g.editing?state.goals.map(old=>old.id===g.id?goal:old):[...state.goals,goal]};
    try{F.validateState(next);}catch(e){$('#form-error').textContent=e.message;return;}
    if(!persist(next))return;closeDialog();render();savedToast(g.editing?'Goal updated.':'Your next milestone is set.');
  }
  function showSettings() {
    openDialog(`${dialogHead('Make it yours.','A few details for your personal training space.')}<div class="dialog-body"><form id="settings-form"><div class="form-grid"><label>Your name<input name="name" maxlength="40" value="${escape(state.settings.name)}" required></label><label>Weekly session target<input name="weeklyGoal" type="number" min="1" max="14" step="1" value="${state.settings.weeklyGoal}" required></label></div><div class="form-error" id="form-error" role="alert"></div><div class="dialog-footer"><span class="left-note">${demo?'Demo preferences':'Your personal preferences'}</span><button class="button primary small" type="submit">Save preferences</button></div></form><div class="settings-section"><h3>Your data, with you.</h3><p>Sessions and goals are saved in this browser on this device. Export a JSON backup to keep a copy or move to another browser. Importing replaces the currently selected workspace.</p><div class="settings-buttons"><button class="button secondary small" data-action="export">${icon('download')}Export backup</button><button class="button secondary small" data-action="import">${icon('upload')}Import backup</button></div>${storageCorrupt?'<div class="form-error">Your stored data could not be read. Download the original before resetting or importing a valid backup.</div><button class="button secondary small" data-action="export-raw" style="margin-top:10px">Download original data</button>':''}</div><div class="settings-section"><h3>${demo?'Back to your own training':'Take a look around'}</h3><p>${demo?'Your personal journal has been kept separate from these sample sessions.':'Explore a sample journal with sessions, charts, and goals. Your own data stays separate.'}</p><div class="settings-buttons"><button class="button secondary small" data-action="toggle-demo">${demo?'Use my own data':'Explore demo'} ${icon('arrow')}</button></div><details><summary>Workspace reset</summary><p>Remove every session and goal in the ${demo?'demo':'personal'} workspace. Export a backup first if you want to keep your history.</p><button class="text-button" style="color:#ac6047;margin-top:10px" data-action="reset">Reset ${demo?'demo':'personal'} journal</button></details></div></div>`);
  }
  function confirmDialog(title, description, action, id, label='Delete') {
    openDialog(`${dialogHead(title,description)}<div class="dialog-body"><div class="dialog-footer" style="margin-top:0"><button class="button secondary" data-action="close">Cancel</button><button class="button danger" data-action="${action}" ${id?`data-id="${escape(id)}"`:''}>${label}</button></div></div>`);
  }
  function download(content,filename,type='application/json') {
    const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);
  }
  function exportData() { download(JSON.stringify({...state,exportedAt:new Date().toISOString()},null,2),`forma-${demo?'demo-':''}backup-${F.today()}.json`);toast('Your journal backup is downloading.'); }
  async function readImport(file) {
    if(!file)return;
    try {
      if(file.size>10*1024*1024)throw new Error('Choose a backup smaller than 10 MB.');
      pendingImport=F.validateState(JSON.parse(await file.text()));
      openDialog(`${dialogHead('Import this journal?','Review your backup before replacing this workspace.')}<div class="dialog-body"><div class="session-summary"><span class="summary-chip">${pendingImport.sessions.length} sessions</span><span class="summary-chip">${pendingImport.goals.length} goals</span><span class="summary-chip">${escape(pendingImport.settings.name)}</span></div><p class="field-hint">This replaces the ${demo?'demo':'personal'} workspace (${state.sessions.length} sessions, ${state.goals.length} goals). Export your current journal first if you want to keep it.</p><div class="dialog-footer"><button class="text-button" data-action="export" style="margin-right:auto">Export current data</button><button class="button secondary" data-action="close">Cancel</button><button class="button primary" data-action="confirm-import">Replace & import</button></div></div>`);
    } catch(e) {pendingImport=null;toast(e instanceof SyntaxError?'This file is not valid JSON. Choose a Forma backup.':e.message);}
    finally{$('#import-file').value='';}
  }
  document.addEventListener('click',event=>{
    const el=event.target.closest('[data-action]');if(!el)return;
    const action=el.dataset.action,axis=el.dataset.axis,id=el.dataset.id;
    switch(action){
      case 'log':startSession(axis,el.dataset.exercise);break;
      case 'close':closeDialog();break;
      case 'settings':showSettings();break;
      case 'toggle-demo':toggleDemo();break;
      case 'chart-weeks':chartWeeks=+el.dataset.weeks;render();break;
      case 'goal':startGoal(axis,null,el.dataset.exercise);break;
      case 'skill-details':showSkill(el.dataset.exercise);break;
      case 'inventory-category':inventoryFilters.category=el.dataset.category;updateInventoryResults();break;
      case 'inventory-reset':inventoryFilters={query:'',category:'all',status:'all',unit:'all'};render();$('#inventory-search').focus();break;
      case 'edit-goal':startGoal(null,id);break;
      case 'delete-goal':confirmDialog('Remove this goal?','Your training sessions and records will stay in your journal.','confirm-delete-goal',id,'Remove goal');break;
      case 'confirm-delete-goal':if(persist({...state,goals:state.goals.filter(g=>g.id!==id)})){closeDialog();render();savedToast('Goal removed.');}break;
      case 'session':showSession(id);break;
      case 'edit-session':startSession(null,null,id);break;
      case 'delete-session':confirmDialog('Delete this session?','Your records and goal progress will be recalculated. This cannot be undone.','confirm-delete-session',id,'Delete session');break;
      case 'confirm-delete-session':if(persist({...state,sessions:state.sessions.filter(s=>s.id!==id)})){closeDialog();render();savedToast('Session deleted.');}break;
      case 'filter':historyFilter=axis;render();break;
      case 'session-axis':
        captureSessionForm();if(draftSession.axis!==axis){draftSession.axis=axis;draftSession.entries=[newEntry(axis)];renderSessionForm();}break;
      case 'add-entry':captureSessionForm();if(draftSession.entries.length<30){draftSession.entries.push(newEntry(draftSession.axis));renderSessionForm();const last=$$('[data-entry]').at(-1);$('select',last).focus();}break;
      case 'remove-entry':captureSessionForm();if(draftSession.entries.length>1){draftSession.entries.splice(+el.dataset.index,1);renderSessionForm();}break;
      case 'goal-axis':captureGoal();if(draftGoal.axis!==axis){const ex=EXERCISES[axis][0];draftGoal={...draftGoal,axis,exercise:ex.id,variation:axis==='skills'?selectedVariation(axis,ex):undefined,target:''};renderGoalForm();}break;
      case 'export':exportData();break;
      case 'export-raw':try{download(localStorage.getItem(STORAGE_KEY)||'',`forma-original-recovery-${F.today()}.json`);}catch{toast('Unable to read browser storage.');}break;
      case 'import':$('#import-file').click();break;
      case 'confirm-import':if(pendingImport){const wasCorrupt=storageCorrupt;storageCorrupt=false;if(persist(pendingImport)){pendingImport=null;closeDialog();render();savedToast('Backup imported. Welcome back to your progress.');}else{storageCorrupt=wasCorrupt;}}break;
      case 'reset':confirmDialog(`Reset your ${demo?'demo':'personal'} journal?`,'All sessions and goals in this workspace will be removed. Export a backup first to keep a copy.','confirm-reset',null,'Reset journal');break;
      case 'confirm-reset':{const next=F.emptyState();next.settings={...state.settings};storageCorrupt=false;if(persist(next)){closeDialog();render();savedToast('Your journal has been reset.');}}break;
    }
  });
  document.addEventListener('change',event=>{
    const el=event.target;
    if(el.id==='inventory-status'||el.id==='inventory-unit'){inventoryFilters[el.id==='inventory-status'?'status':'unit']=el.value;updateInventoryResults();}
    else if(el.id==='chart-exercise'){chartExercise[page]=el.value;render();}
    else if(el.id==='chart-variation'){chartVariation[chartExercise[page]]=el.value;render();}
    else if(el.hasAttribute('data-entry-exercise')){captureSessionForm();const i=+el.dataset.entryExercise,ex=F.exercise(draftSession.axis,el.value);if(draftSession.axis==='skills'){draftSession.entries[i].variation=selectedVariation('skills',ex);draftSession.entries[i].value='';}renderSessionForm();}
    else if(el.id==='goal-exercise'){captureGoal();const ex=F.exercise(draftGoal.axis,el.value);if(draftGoal.axis==='skills')draftGoal.variation=selectedVariation('skills',ex);draftGoal.target='';renderGoalForm();}
    else if(el.id==='import-file')readImport(el.files[0]);
  });
  document.addEventListener('input',event=>{if(event.target.id==='inventory-search'){inventoryFilters.query=event.target.value;updateInventoryResults();}else if(event.target.id==='history-search'){historyQuery=event.target.value;$('#history-results').innerHTML=historyResults();}});
  document.addEventListener('submit',event=>{
    if(event.target.id==='session-form')saveSession(event);
    else if(event.target.id==='goal-form')saveGoal(event);
    else if(event.target.id==='settings-form'){
      event.preventDefault();const form=event.target,name=form.elements.name.value.trim();
      if(!name){$('#form-error').textContent='Enter a name or nickname.';return;}
      if(persist({...state,settings:{name,weeklyGoal:+form.elements.weeklyGoal.value}})){closeDialog();render();savedToast('Preferences saved.');}
    }
  });
  $('#editor-dialog').addEventListener('click',event=>{if(event.target===$('#editor-dialog')){const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog();}});
  window.addEventListener('hashchange',()=>{if(location.hash==='#main'){$('#main').focus();return;}page=location.hash.slice(1)||'overview';render();window.scrollTo({top:0});});
  window.addEventListener('storage',event=>{
    if(event.key===(demo?DEMO_KEY:STORAGE_KEY)&&event.newValue){try{state=F.validateState(JSON.parse(event.newValue));if(!demo)realState=state;render();toast('Journal updated from another tab.');}catch{toast('Another tab saved unreadable data. Export a backup of this tab.');}}
  });
  render();
})();
