# Forma — Calisthenics journal

A responsive progress tracker built with HTML, CSS, and vanilla JavaScript. No framework, build step, account, or backend is required.

## Open the app

Open `index.html` in a modern browser. Keep `index.html`, `styles.css`, `skill-catalog.js`, `endurance-circuits.js`, `core.js`, `app.js`, and the `assets` folder together.

For consistent browser storage, run a local server from this folder:

```sh
python3 -m http.server 8847 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:8847`. Keep using the same browser and address: each browser and origin has its own journal. Some browsers restrict storage when an HTML file is opened directly.

## The three axes

- **Skills:** 64 illustrated movements and 255 tracking variations across foundations, balance, pushing, pulling, core, legs, rings, mobility, and freestyle. Records and goals compare the same variation. Explore the complete collection in Skill inventory.
- **Endurance:** 16 movements, including the original pull-ups, push-ups, dips, squats, Australian rows, and burpees, plus exercises for the endurance circuits. Track sets and reps. Personal records use reps in one set; total volume sums sets × reps.
- **Weighted:** Pull-ups, dips, chin-ups, and push-ups. Track sets, reps, and added kilograms, excluding body weight. Personal records use the heaviest logged load, at any rep count.

## Skill inventory

Open **Skills → Skill inventory**, or go directly to `#skill-inventory`.

- Browse all 64 movements with original illustrations, descriptions, equipment, and trackable variations.
- Search by movement name, equipment, description, or variation. Search ignores case and hyphens.
- Combine category, level, timed/reps, and practiced-status filters. Rings includes shared ring equipment across movement families.
- Switch between illustrated cards and a compact list. Search common aliases such as Australian pull-up or OAHS.
- Open an illustration, skill name, or variation count to see the detail view and personal records for each variation.
- Use **Log effort** or **Set goal** to open a form with that skill selected.
- **My progress** shows skills you have logged or set goals for. An empty journal offers three starter cards; the complete collection is always available in the inventory.

“Practiced” means there is a session for that movement on the Skills axis. Endurance and Weighted records remain separate, including movements such as pull-ups that appear on more than one axis. Foundation labels group common building blocks; they are not a personalized difficulty assessment. Variations are tracking choices, not a required sequence.

Movement references consulted include [GMB’s push-up guide](https://gmb.io/push-up/) for basic pressing variations and [CrossFit Journal’s ring guide](https://library.crossfit.com/free/pdf/44_06_GotRings_NowWhat.pdf) for ring support and skin-the-cat terminology. The catalog is curated for this tracker.

See [the complete skill catalog and research references](SKILL-CATALOG.md) for the 42 added entries, all tracking variations, and counting conventions. Level labels describe movement families; specialist skills are optional.

## Endurance circuits

Open **Endurance** to find Push endurance, Pull endurance, Mini Leg Blaster, and Cindy. Every card lists exercises in order, sets and reps, rounds or a time limit, and rest guidance. The page also contains an example four-week block: 3, 3, optionally 4, then 2 rounds, with Monday push, Wednesday pull, and Friday legs. Cindy is an alternative timed session.

**View & log** opens workout options and a result form. Pull has an assisted option, legs has a no-jump option, and Cindy includes its 12-minute beginner version. The four-week selector changes the planned dose for the three separate circuits; it does not mark workouts completed or schedule sessions automatically.

Enter completed rounds, then review and edit actual sets, reps, duration, and effort in the normal session form. Nothing is saved until **Save session**. Cindy also accepts extra reps in the next unfinished round, in exercise order. Partial rounds become separate efforts so they are counted accurately, and per-set records are not inflated by the whole workout's volume. Different reps within a circuit can be adjusted or split into more efforts before saving.

Circuit names, options, week, and reported round results are retained in editable session notes and can be searched in History. If you change the completed work in the review form, update the round summary in notes to match. Assisted exercises have separate identifiers from strict movements. Lunge reps count both legs together.

Push and pull are Forma examples informed by [Stew Smith's submaximal circuits](https://www.stewsmithfitness.com/blogs/news/14296809-daily-push-ups-and-pull-ups-why). The [MTI Mini Leg Blaster](https://fitness.mtntactical.com/exercises/details.php?id=leg-blaster) supplies the leg exercise sequence; its suggested dose, rest, and no-jump option here are Forma adaptations. [Cindy and its beginner option](https://www.crossfit.com/cindy) are CrossFit benchmarks. The four-week block is an example adaptation, not a personalized prescription or an automatic progression.

## Using your journal

1. Choose **Log session**, then select the training axis.
2. Set the date, duration, and perceived effort.
3. Add one or more efforts. Each effort groups sets with identical reps, hold time, and load. Use separate efforts if those values change.
4. Save to update your records, charts, history, and goals.
5. Set personal targets in **Goals**, and set your weekly session target in **Preferences**.

Each session covers one axis. If you train multiple axes in one workout, log a separate entry for each axis and split the duration to avoid double-counting time.

History supports searching by exercise, variation, notes, and date, filtering by axis, and viewing, editing, or deleting sessions. Charts show weekly session counts and the best set per recorded training day.

**Explore demo** opens a separate workspace containing sample sessions and goals. **Use my own data** returns to your personal journal. Sample sessions are never automatically added to your journal.

## Backups and privacy

Your journal is stored in this browser’s local storage. There is no cloud synchronization. Clearing browser data can remove the journal, so export backups regularly from **Preferences → Export backup**.

**Import backup** validates a Forma JSON file and shows a preview before replacing the currently selected workspace. Export your current journal first if you want to preserve it.

If browser storage is unavailable, the app keeps changes in memory and displays a warning to export before closing. If saved data is unreadable, Preferences offers a download of the original data for recovery.

The app does not send session data to a server. Google Fonts is used for typography when a network connection is available; system fonts are used as a fallback. All tracking functionality is implemented locally.

## Files

- `index.html` — application shell and accessible dialogs
- `styles.css` — responsive desktop, tablet, and mobile layouts
- `core.js` — core exercises, dates, records, filtering, backup validation, and demo data
- `skill-catalog.js` — researched expansion, levels, aliases, tracking notes, image captions, and reference links
- `endurance-circuits.js` — circuit exercises, options, four-week example, source attribution, and conversion of completed rounds into journal efforts
- `SKILL-CATALOG.md` — full inventory, additions, and research sources
- `app.js` — views, charts, session and goal workflows, storage, and import/export
- `assets/hero/` — transparent handstand artwork for the overview banner, with its generation prompt.
- `assets/skills/` — 64 locally bundled movement illustrations and their generation prompts. Each image caption identifies the illustrated position; the recorded variation appears separately below the skill name.

## Validation performed

Domain and catalog checks cover variation-specific records, goals, backup validation and round trips, date boundaries, combined filters, aliases, legacy compatibility, and bundled image availability. Browser checks cover all three session types, multiple efforts, editing, persistence after reload, search, goal creation, backup import, and mobile layout.

New inventory illustrations were generated with the built-in image generation tool. Their prompts, including the frog-stand posture correction, are recorded in `assets/skills/INVENTORY-PROMPTS.md`.

## Development checks

With Node.js installed, run the domain and inventory tests from this folder:

```sh
node --test tests/*.test.cjs
node --check app.js
```

The 42 expansion illustrations use the built-in image generation tool; the full prompt set is in `assets/skills/CATALOG-PROMPTS.md`. Legacy movement identifiers and variation strings remain valid, including V-sit under L-sit.
