# Forma project handoff

Prepared on September 30, 2026 for the next developer or coding assistant. Forma is a working calisthenics progress tracker built with HTML, CSS, and vanilla JavaScript. Continue the existing app and visual design. The next substantial improvement is to turn its endurance program examples into saved, resumable training cycles.

This document records the implemented baseline. [ROADMAP.md](ROADMAP.md) contains proposed future work, priorities, dependencies, and acceptance criteria. Those proposals have not been implemented or approved as a fixed scope.

## Get the project running

The source repository is [elma0101/Calisthenics-tracker](https://github.com/elma0101/Calisthenics-tracker), branch `main`. The latest implemented app commit at this handoff is [`f4e98be`](https://github.com/elma0101/Calisthenics-tracker/commit/f4e98be62b41c2f7ac7577347390a4b4a0a7e988), **Add advanced endurance programs and refine training icons**. It was successfully pushed and its remote hash verified. The source working tree was clean when this handoff was prepared.

Clone the repository, or extract the supplied ZIP. The ZIP contains the app, all illustrations, existing tests, and these two handoff documents. The handoff and roadmap are maintained in the repository root and included in the transfer package; they were added after the app baseline commit above. Prefer cloning for continued Git work: the ZIP is a runnable snapshot and deliberately omits Git internals.

```sh
git clone https://github.com/elma0101/Calisthenics-tracker.git
cd Calisthenics-tracker
python3 -m http.server 8847 --bind 127.0.0.1
```

Open `http://127.0.0.1:8847`. For the ZIP, run the same server command inside its `calisthenics-tracker` folder. Keep that terminal running. There is no npm install, build command, API key, environment file, account service, or database to configure. Python is only a convenient static server; Node.js is needed only for the existing tests.

The app can also open through `index.html`, but HTTP is preferable for predictable browser storage. The localhost address is a development preview, not a deployed website. No hosted production URL has been verified in this handoff.

## Transfer your personal journal separately

The Git repository and ZIP contain code and artwork, not your personal training history. Personal sessions, goals, and preferences live in the browser's local storage.

1. In the current app, switch to **Use my own data** if you are in the demo workspace.
2. Open **Preferences → Export backup** and keep the downloaded Forma JSON file.
3. On the new device or browser, start the app, select the personal workspace, and open **Preferences → Import backup**.
4. Check the preview, then choose **Replace & import**. Import replaces the selected workspace; it does not merge two journals.
5. Check your session count, goals, and recent entries before retiring the old copy.

Changing browser, hostname, port, or moving to a hosted URL creates a different storage origin. Even `localhost` and `127.0.0.1` have separate journals. No personal backup was exported or included in this package automatically. Keep your backup outside the source repository.

## What is already implemented

| Area | Working behavior |
| --- | --- |
| Overview | Weekly session target, activity chart, summaries of the three axes, goal progress, latest efforts, and illustrated handstand banner. |
| Skills | 64 illustrated movements with 255 tracking variations. Holds use seconds; repetition movements use reps. Records and goals compare the same variation. |
| Skill inventory | Separate `#skill-inventory` page, category and level filters, timed/reps filter, practiced status, alias search, cards/list views, detail dialog, and shortcuts to log or set a goal. |
| My skill progress | Shows movements with logged practice or goals. Empty journals show starter cards. Practice status is derived from Skills sessions. |
| Endurance | 16 movements, sets and reps logging, total volume, per-set personal records, and eight built-in workouts/programs. |
| Weighted | Pull-ups, dips, chin-ups, and push-ups. Logs sets, reps, and added kilograms; shows heaviest added load and its history. |
| Session journal | Date, duration, perceived effort from 1 to 10, notes, and multiple efforts. View, edit, and delete saved sessions. |
| History | Search exercise, variation, notes, and date; filter by training axis. |
| Goals | Create, edit, remove, and calculate progress from actual saved records. |
| Preferences | Athlete name and weekly session target. |
| Data handling | Local persistence, validated JSON export/import with replacement preview, unreadable-data recovery download, and warning when storage is unavailable. |
| Demo | Separate sample workspace; demo sessions are not automatically added to the personal journal. |
| Presentation | Responsive desktop/tablet/mobile layout, local illustrations, image captions, accessible form labels, focus styling, dialogs, and decorative SVG icons. |

The catalog covers foundations, balance, pushing, pulling, core, legs, rings, mobility, and freestyle. It is a curated collection, not an exhaustive list of every possible movement or a curriculum every athlete must complete. [SKILL-CATALOG.md](https://github.com/elma0101/Calisthenics-tracker/blob/f4e98be62b41c2f7ac7577347390a4b4a0a7e988/SKILL-CATALOG.md) documents the collection and its references.

## Existing endurance programs

The **Advanced** tab opens by default; **Essentials** remains available. Cards show exercises, sets or rounds, reps, rest, options, and attribution. Four-week selectors change the planned dose. They do not enroll a user, save a current week, or schedule workouts.

| Collection | Programs |
| --- | --- |
| Essentials | Push endurance; Pull endurance; Mini Leg Blaster with a no-jump option; Cindy with standard 20-minute and beginner 12-minute options. |
| Advanced | 200-rep push builder; 100-rep pull builder; 300-rep leg builder; 50 / 100 density practice. |

The advanced cycles use the following standard doses. The numbers in the last column are sets or rounds in weeks 1 through 4.

| Program | Work in each set or round | Four-week doses |
| --- | --- | --- |
| Push builder | 20 push-ups | 8 / 9 / 10 / 6 sets |
| Pull builder | 5 pull-ups | 16 / 18 / 20 / 12 sets |
| Leg builder | 30 squats + 20 reverse lunges, counting both legs | 4 / 5 / 6 / 3 rounds |
| Density practice | 5 pull-ups + 10 push-ups | 8 / 9 / 10 / 6 rounds |

Lower-volume options and assisted pulling are implemented. Totals update with the chosen week and variant. Source links and readiness/rest guidance are in the app and [README.md](https://github.com/elma0101/Calisthenics-tracker/blob/f4e98be62b41c2f7ac7577347390a4b4a0a7e988/README.md). Advanced plans are explicitly **Forma adaptations** inspired by THENX/Chris Heria, K Boges, and That's Good Money; they are not represented as those creators' exact programs.

**View & log** asks for completed work, converts rounds into efforts, and opens the normal session review. Nothing counts as training until the user saves the session. Cindy supports full rounds plus ordered partial reps. Circuit context is currently saved in editable notes, not structured program fields. If actual sets change during review, the user must update the notes summary manually.

## Preserve the current design

The user repeatedly approved the artwork and requested the current icon refinements. Preserve the warm paper background, forest green navigation, rounded cards, restrained typography, and illustrated movement library.

| Axis | Color | Current icon |
| --- | --- | --- |
| Skills | Terracotta `#d5724d` | One-arm handstand silhouette with split legs. |
| Endurance | Sage `#64856c` | Athlete pushing a boulder uphill, inspired by the user's reference. |
| Weighted | Lavender `#9381b7` | Stacked-plate dumbbell. |

Axis icons are shared inline SVGs in `app.js` under `iconPaths`, with a 32 × 32 viewBox. The badge styling is near the end of `styles.css`. Editing the shared icon updates navigation, axis cards, session selectors, and other uses. Do not replace them with generic emoji or unrelated icon styles.

Skill illustrations are local PNGs in `assets/skills/`; hero artwork is in `assets/hero/`. Generation prompts are retained beside the artwork. Preserve filenames, movement captions, and the distinction between the pictured pose and the selected tracking variation. The assets occupy about 101 MiB on disk, so delivery optimization is a useful later task.

## Code map

| File or location | Responsibility and extension points |
| --- | --- |
| `index.html` | App shell, dialog host, and script loading. Preserve order: `skill-catalog.js`, `endurance-circuits.js`, `core.js`, then `app.js`. Cache query strings are manually updated. |
| `styles.css` | Design tokens, layouts, responsive rules, inventory, circuits, and SVG badge presentation. Some legacy rules are densely formatted. |
| `core.js` | Browser global `Forma` and CommonJS export for tests. Exercises, record calculations, goals, dates, filtering, demo generation, and `validateState`. |
| `skill-catalog.js` | Browser global `FormaCatalog`. Expansion of 42 skills plus metadata for the original 22; aliases, levels, variations, illustration metadata, and sources. |
| `endurance-circuits.js` | Browser global `FormaCircuits`. Movements, eight program definitions, dose calculations, source attribution, `plan`, `getWeeks`, and `resultEntries`. |
| `app.js` | Rendering, hash navigation, dialogs, event delegation, storage, import/export, and draft forms. Key functions include `renderAxis`, `renderInventory`, `renderCircuits`, `renderCircuitForm`, `startSession`, `saveSession`, `persist`, and `readImport`. |
| `tests/core.test.cjs` | Record semantics, dates, validation, goals, and backup behavior. |
| `tests/catalog.test.cjs` | Catalog integrity, search/filters, legacy compatibility, and image availability. |
| `tests/circuits.test.cjs` | Actual-work conversion, partial rounds, assistance separation, dose scaling, and round trips. |
| `README.md` and `SKILL-CATALOG.md` | Usage, run instructions, program sources, catalog, and counting conventions. |

Routes are `#overview`, `#skills`, `#skill-inventory`, `#endurance`, `#weighted`, `#history`, and `#goals`. Preferences and editors are dialogs, not separate routes.

## Data contract and migration traps

Current storage keys are `forma-journal-v1` for personal data, `forma-demo-v1` for demo data, and `forma-mode-v1` for the selected workspace.

The state shape is:

```js
{
  version: 1,
  settings: { name: "Athlete", weeklyGoal: 4 },
  sessions: [],
  goals: []
}
```

Each session has `id`, `axis`, `date` as local `YYYY-MM-DD`, `duration` in minutes, integer `rpe`, `notes`, and `entries`. The three entry shapes are:

```js
// Skills: value is seconds or reps, as defined by the exercise.
{ exercise: "handstand", variation: "Freestanding", sets: 3, value: 20 }

// Endurance: sets share the same rep count.
{ exercise: "pull-up", sets: 5, reps: 8 }

// Weighted: weight is added kilograms, excluding body weight.
{ exercise: "dip", sets: 4, reps: 5, weight: 20 }
```

Goals have `id`, `axis`, `exercise`, and `target`; Skills goals also have `variation`. An effort groups identical sets. Different reps, hold lengths, or loads require separate efforts. Each session currently belongs to one axis.

Preserve these rules when extending the app:

- **Validation rebuilds the object.** `validateState` returns a normalized whitelist of fields. Adding fields only in the UI will lose them when saving or importing. Extend validation, persistence, and backup handling together.
- **Only version 1 is accepted today.** Add explicit migrations before introducing a new schema, and test legacy import/reload. Never reset an existing journal just because its schema is older.
- **Identifiers are historical data.** Keep existing exercise IDs and skill variation strings valid. The legacy `V-sit` variation under `l-sit` must remain valid even though a dedicated V-sit movement exists.
- **Records have specific meanings.** Skills compare the exact variation. Endurance records are reps in one set, while volume is sets × reps. Weighted records are the heaviest added load at any rep count; there is no estimated maximum or rep-specific record yet.
- **Keep assistance separate.** Assisted endurance movements have their own IDs and must not replace strict records.
- **Logging is not mastery.** The Skills variation bar reflects the most advanced logged variation; it does not establish mastery or validate technique.
- **Planned work is not a session.** Current saved sessions cannot have future dates. Future scheduling needs a separate planned-work model.
- **Existing limits matter.** The validator allows 20,000 sessions, 100 goals, 30 efforts per session, 1–100 sets per effort, and durations of 1–600 minutes. JSON import rejects files larger than 10 MiB. Review these intentionally if a future workout runner produces many separate sets.
- **User content is escaped for rendering.** Preserve this when adding names, notes, templates, and imported content.

## Known limits and verification

There is no backend, login, cloud sync, installed PWA, service worker, active-workout timer, persisted workout draft, workout template builder, cycle enrollment, training calendar, custom exercise editor, or structured circuit result history. There are no body-weight records, pounds setting, rep-specific weighted PRs, video attachments, or automated coaching decisions.

Browser storage can be cleared or become unavailable. Imports replace a workspace. Multiple open tabs can receive updates, but conflict merging is not implemented. Google Fonts is the external typography dependency; system fallbacks exist. A cached page is not a guaranteed offline installation.

At the implemented baseline, **all 28 existing tests passed**. JavaScript syntax and Git whitespace checks passed. Prior browser checks covered the three logging axes, editing, persistence, search, goals, import, inventory, advanced program review, and responsive layouts. The latest icons were checked on desktop and mobile with no browser errors observed. These are development checks, not a complete cross-browser or accessibility audit.

Run from the app root:

```sh
node --test tests/*.test.cjs
node --check app.js
git diff --check
```

The last command applies to a Git checkout; the two Node commands also work in the extracted ZIP.

Before shipping future changes, verify a blank journal and the separate demo workspace; log/edit/delete across all axes; export/import a backup; check mobile layout and keyboard access; and verify legacy records still calculate correctly. Use test data rather than modifying the owner's personal history.

## Prompt for the next coding assistant

Copy this prompt after sharing the repository or extracted package and both handoff files:

```text
Continue Forma, my existing calisthenics tracker. Read HANDOFF.md,
ROADMAP.md, README.md, and the source before editing. The implemented
baseline is f4e98be on main in elma0101/Calisthenics-tracker.

Keep HTML, CSS, and vanilla JavaScript, preserve the current design,
64 skill illustrations, three custom axis icons, and all saved-data
compatibility. Do not rebuild the app from scratch.

Start with roadmap task R1: versioned data migrations and structured
program references, including tests for legacy backups. Then implement
R2: saved endurance cycle enrollment, a simple schedule, and progress
linked to actual saved sessions. Planned workouts must never count as
completed training. Keep the existing Essentials and Advanced programs.

The roadmap is a proposed backlog. Implement the first milestone before
starting later features. Run the existing tests, add meaningful tests for
the new behavior, and verify the UI on desktop and mobile. Report what
changed and how it was checked. Keep personal training backups out of Git.
```
