# Forma — Calisthenics journal

A responsive progress tracker built with HTML, CSS, and vanilla JavaScript. No framework, build step, account, or backend is required.

## Open the app

Open `index.html` in a modern browser. Keep `index.html`, `styles.css`, `core.js`, `app.js`, and the `assets` folder together.

For consistent browser storage, run a local server from this folder:

```sh
python3 -m http.server 8847 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:8847`. Keep using the same browser and address: each browser and origin has its own journal. Some browsers restrict storage when an HTML file is opened directly.

## The three axes

- **Skills:** 22 illustrated movements, with a dedicated searchable skill inventory. The original 12 movements are joined by push-up, pull-up, dip, hollow body hold, arch hold, frog stand, scapular pull-up, hanging leg raise, ring support hold, and skin the cat. Track a specific variation with hold time or reps. Records and goals compare the same variation. Variation bars indicate your most advanced logged variation, not verified mastery.
- **Endurance:** Pull-ups, push-ups, dips, squats, Australian rows, and burpees. Track sets and reps. Personal records use reps in one set; total volume sums sets × reps.
- **Weighted:** Pull-ups, dips, chin-ups, and push-ups. Track sets, reps, and added kilograms, excluding body weight. Personal records use the heaviest logged load, at any rep count.

## Skill inventory

Open **Skills → Skill inventory**, or go directly to `#skill-inventory`.

- Browse all 22 movements with original illustrations, descriptions, equipment, and trackable variations.
- Search by movement name, equipment, description, or variation. Search ignores case and hyphens.
- Combine movement-category, foundation, hold/reps, and practiced-status filters.
- Open an illustration, skill name, or variation count to see the detail view and personal records for each variation.
- Use **Log effort** or **Set goal** to open a form with that skill selected.
- **My progress** shows skills you have logged or set goals for. An empty journal offers three starter cards; the complete collection is always available in the inventory.

“Practiced” means there is a session for that movement on the Skills axis. Endurance and Weighted records remain separate, including movements such as pull-ups that appear on more than one axis. Foundation labels group common building blocks; they are not a personalized difficulty assessment. Variations are tracking choices, not a required sequence.

Movement references consulted include [GMB’s push-up guide](https://gmb.io/push-up/) for basic pressing variations and [CrossFit Journal’s ring guide](https://library.crossfit.com/free/pdf/44_06_GotRings_NowWhat.pdf) for ring support and skin-the-cat terminology. The catalog is curated for this tracker.

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
- `core.js` — exercise catalog, dates, record calculations, backup validation, and demo data
- `app.js` — views, charts, session and goal workflows, storage, and import/export
- `assets/skills/` — 22 locally bundled movement illustrations and their generation prompts. Each image caption identifies the illustrated position; the recorded variation appears separately below the skill name.

## Validation performed

Nine domain checks cover variation-specific records, per-set endurance records, weighted records after deletion, goal completion, invalid backups, and date boundaries. Browser checks cover all three session types, multiple efforts, editing, persistence after reload, search, goal creation, backup import, and mobile layout.

New inventory illustrations were generated with the built-in image generation tool. Their prompts, including the frog-stand posture correction, are recorded in `assets/skills/INVENTORY-PROMPTS.md`.

## Development checks

With Node.js installed, run the domain and inventory tests from this folder:

```sh
node --test tests/core.test.cjs
node --check app.js
```
