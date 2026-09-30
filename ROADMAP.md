# Forma remaining feature plan

Forma already supports logging, records, goals, a large illustrated skill inventory, and endurance program examples. This proposed plan focuses on making it useful during a workout and across a full training cycle. It is a prioritized backlog based on the current code, not a list of previously promised features or work already underway.

Build the first release around saved endurance cycles and resumable workouts. Preserve HTML, CSS, vanilla JavaScript, the current visual style, and existing training data. A framework rewrite is not required for the next milestone.

## Recommended order

| Order | Task | Outcome | Depends on | Relative size |
| --- | --- | --- | --- | --- |
| 1 | R1 Data migrations and program references | New features can persist without losing old journals. | Existing baseline | Medium |
| 2 | R2 Saved cycles and schedule | Start a program, know the next workout, and retain progress. | R1 | Large |
| 3 | R3 Workout runner and draft recovery | Follow sets, rest, pause, resume, and save actual work. | R1; R2 for scheduled workouts | Large |
| 4 | R4 Reusable workout templates | Save and reuse personal sessions and edited program workouts. | R1; integrate with R3 | Medium |
| 5 | R5 Skill progression tracking | Track what you want to learn and what you can perform consistently. | R1 | Medium |
| 6 | R6 Weighted records and progression | Compare added load at the same rep count and follow strength targets. | R1 | Medium |
| 7 | R7 Better history and analytics | See progress over chosen periods and compare program attempts. | R2; R6 for new weighted metrics | Medium |
| 8 | R8 Portable and offline release | Faster artwork, deployable app, installability, and reliable offline behavior. | Stable data model and key workflows | Medium to large |
| Later | Optional account sync and attachments | Use multiple devices automatically or attach evidence of technique. | Product decisions and a separate backend design | Large |

Sizes are relative planning estimates, not delivery dates. Each task should be a separately reviewable change. R5 and R6 can be reordered to match the user's training priorities once the daily workout flow works.

## R1 Data migrations and program references

**Problem:** `validateState` currently accepts only version 1 and discards fields outside its whitelist. Program, week, and round details survive only as editable session notes.

Introduce an explicit migration path from the existing state before adding features. Keep storage reading compatible with the current `forma-journal-v1` and demo keys; changing key names alone must not make journals appear empty. Preserve the previous serialized data until the migrated data validates and saves successfully.

Add optional structured metadata for newly logged circuit sessions: program ID, variant ID, cycle week, enrollment/workout IDs where applicable, and a snapshot or version of the prescription used. Planned quantities and actual entries must remain separate. Historical prescriptions should not change when a built-in program definition is edited later. Keep legacy circuit notes untouched; do not infer authoritative structured results from free text.

Touch `core.js` for migration and validation, `app.js` for persistence/import and session review, and `endurance-circuits.js` for program metadata. A small dedicated persistence module is reasonable if it improves clarity. Avoid a large unrelated refactor.

Done when:

- Version 1 personal and demo journals load and import with identical sessions, records, goals, and dates.
- New metadata survives save, reload, export, and import.
- Unsupported future versions and malformed data produce a recovery path without overwriting the original.
- Cancelled or failed migrations leave the original journal available.
- Editing actual entries does not retain a falsely certified round count; stale summaries are recalculated where valid or clearly marked as edited.

## R2 Saved cycles and schedule

**Problem:** The current four-week selector is a preview. The app does not remember that the user started a program or know which workout comes next.

Add **Start cycle** to existing program cards. Let the user choose a variant, start date, and training days. Show an active cycle panel with the current week, next planned session, completed work, and options to repeat a week, reschedule, pause, or end the cycle. Begin with the existing four-week programs and a simple agenda; a complex drag-and-drop calendar can wait.

Proposed entities are a `programEnrollment` linked to a built-in program and variant, and separate scheduled workout occurrences with stable IDs and local dates. Saved sessions link back to an occurrence. Completion must be derived from valid linked sessions or kept synchronized when those sessions change.

Touch the state validator and `renderCircuits`/`renderCircuitForm`; reuse the existing session review and dose calculations. Show essentials and advanced cycles using their own existing prescriptions.

Done when:

- A user starts a cycle, reloads the app, and sees the same schedule and progress.
- Starting or opening a planned workout does not add a session, a PR, or weekly training volume.
- Completing a workout links one actual session; repeated taps cannot double-count it.
- Editing/deleting that session updates the cycle view without phantom completion.
- Skipping or rescheduling work does not invent completed training or advance the week silently.
- Lower-volume and assisted variants retain their correct totals and records.
- Export/import retains enrollment and schedule data.

## R3 Workout runner and draft recovery

**Problem:** Users can review and log a workout, but cannot run its sets and rest periods inside the app. Unsaved session drafts live only in memory.

Add a **Start workout** flow from a planned workout or program. Display the current exercise and set, intended reps, previous actual result, rest countdown, elapsed duration, and a clear complete/skip control. Allow actual reps, hold time, and added load to differ from the plan. Include pause, resume, and an explicit final review before saving.

Persist an in-progress draft separately from completed sessions. Calculate elapsed time from timestamps and accumulated pauses rather than counting timer ticks, so backgrounding does not accumulate clock drift. Group identical actual sets into efforts only when doing so preserves the result. Define behavior for more than 30 distinct efforts before changing the existing limit.

Done when:

- Reloading or briefly backgrounding the app preserves the active workout and timer state.
- Paused time is handled consistently and the duration label explains what is counted.
- A planned 5 × 10 changed to actual sets of 10, 10, 8, 8, and 6 produces 42 reps and a 10-rep per-set record.
- Abandoning a draft does not create history or PRs; saving twice cannot duplicate a session.
- Rest alerts are optional, and a blocked sound or notification does not stop the workout.
- The flow works with one hand on a phone and is usable with a keyboard.

## R4 Reusable workout templates

Add **Save as template** and **Repeat workout**. Let users name a workout, select one axis, order existing exercises, choose variations, enter sets/reps/holds/load, and set rest guidance. Templates can be used alone or assigned to scheduled days.

Keep the first version to existing catalog movements and one axis per session, matching current validation. Mixed-axis workouts and user-defined exercises require a separate data design; they are not prerequisites for useful templates.

Done when editing a template does not rewrite past sessions or an active workout snapshot; deleting one keeps historical entries; templates round-trip through backups; and starting one still requires review of actual work before saving.

## R5 Skill progression tracking

**Problem:** The current catalog is rich, but a logged variation is not evidence that it has been mastered. Users cannot maintain a separate learning list.

Add per-variation states such as **Want to learn**, **Practicing**, and **Consistent**, plus a pin/favorite control. Keep these self-reported states distinct from recorded performance. Add a variation detail view with personal best, recent attempts, notes, and an explicit next practice target.

Introduce optional, source-backed learning paths for a small set of popular skills first: handstand, L-sit, muscle-up, front lever, and planche. Describe suggested prerequisites and technique criteria without treating the existing variation array as a universal difficulty order. Keep the rest of the inventory available immediately.

Done when statuses persist by exercise and variation; logging one effort does not automatically award mastery; pinned skills are visible without fake sessions; old IDs and variations remain valid; and guidance, depicted pose, and tracking choice are clearly distinguished.

## R6 Weighted records and progression

**Problem:** The current Weighted page only compares the heaviest added load, regardless of reps. A +20 kg set for one rep and a +20 kg set for eight reps receive the same primary value.

Add records by exact rep count and recent set history. Support a goal such as **+20 kg for 5 reps**, while preserving existing best-load goals. Introduce reusable strength templates with user-chosen rep ranges and load increments. Any suggestion to add load should be explained and accepted by the user rather than silently changing the workout.

Add an optional kilograms/pounds display preference while keeping one canonical unit in storage. Body-weight history and total system load are separate optional additions. Estimated maximum formulas can wait; they should not be presented as measured strength.

Done when rep-specific records use the same exercise and rep count; conversions do not change stored loads or historical records; existing kilogram goals remain valid; zero-added-load handling is deliberately specified; and edits/deletions recalculate all related records.

## R7 Better history and analytics

Add date-range filters, per-exercise history, weekly volume, and comparisons between attempts of the same program and variant. Show changes in reps, hold time, or added load only for comparable records. Add CSV export for analysis while keeping JSON as the complete restoration format.

Use structured program links from R1/R2 rather than searching notes to calculate completion or adherence. Separate scheduled attendance, saved sessions, and actual volume. Duration should not become a challenge score unless the workout has the same exercises, scaling, counting rules, and time definition.

Done when date ranges honor local calendar dates; empty periods are handled clearly; editing/deleting a session updates charts; assisted and strict efforts stay separate; and CSV columns document units, exercise IDs, variations, and set grouping.

## R8 Portable and offline release

Optimize the roughly 101 MiB illustration library without losing the approved visual quality. Add appropriately sized card/detail assets, efficient formats and fallbacks where needed, explicit dimensions, and lazy loading. Keep source art or an archive so future edits remain possible.

Prepare a static deployment with a documented base path, then add a web app manifest and versioned service worker. Cache the app shell and essential assets first; avoid forcing the entire illustration library into the first install. Make app updates explicit and ensure they cannot discard an active draft. Self-hosting the current fonts is a possible follow-up after checking their distribution requirements.

Add a repeatable verification command or CI job for existing domain tests and the new migration tests. Add a small browser smoke suite for the critical saving/importing/cycle flow if tooling is introduced. Audit actual contrast, dialog focus, labels, touch targets, reduced motion, and horizontal overflow instead of assuming that existing styling is sufficient.

Done when a deployed subpath can load every route and asset; the installed app opens offline after setup; cached artwork behavior is clear; updates preserve history and drafts; exported backups restore on another device; and agreed desktop/mobile browser checks pass. A hosted URL still will not synchronize local journals by itself.

## Optional later work

These are product choices, not requirements for the first complete personal tracker:

- **Accounts and cloud sync:** introduce only if automatic device-to-device continuity is wanted. Design authentication, user-owned records, revision/conflict handling, offline edits, deletion, and backup export together. A backend service has not been chosen.
- **Technique photos or video links:** start with links and notes. File uploads need storage, size limits, privacy controls, and backup behavior; keep them out of localStorage.
- **Custom exercises and mixed-axis sessions:** preserve historical catalog definitions and prevent duration from being counted once per axis for a single workout.
- **Reminders, coaching, social features, and leaderboards:** defer until the personal training flow is reliable and the user requests them.

## First implementation milestone

The recommended first deliverable is **R1 plus R2**: a user starts an existing endurance cycle, returns later, sees the next planned workout, logs actual results, and retains both the schedule and journal through export/import.

Implement in this order:

1. Add fixtures for existing personal, demo, skill-variation, and circuit journals; implement and test migration.
2. Add validated structured program/session references and backup support.
3. Add cycle enrollment and a basic schedule to the Endurance page.
4. Link actual saved sessions to scheduled workouts; handle edit, delete, skip, and reschedule.
5. Verify reload/import, empty states, desktop and mobile layouts, and all existing record semantics.

Treat the roadmap as a checklist for incremental delivery. Do not start by regenerating approved artwork, replacing the UI, adding every possible calisthenics variation, or introducing a backend solely to support this milestone.
