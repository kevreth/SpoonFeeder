---
title: "PRD-002: Global jQuery Removal — Course-Content load() Migration"
repo: "spoonfeeder/SpoonFeeder"
created: "2026-06-05"
status: "Deferred"
priority: "3 — follow-up to PRD-001; not blocking"
---

# PRD-002: Global jQuery Removal — Course-Content `load()` Migration

## Problem

PRD-001 removes the npm `jquery` package, but a **second, independent** jQuery remains: a global `lib/jquery.min.js` loaded via `<script src="lib/jquery.min.js" inline="">` in `index.html`. It exists solely so course-content inline scripts can call `$('#table0').load("…")` to pull HTML fragments (usually reference tables) into a slide at runtime.

While jQuery is loaded globally on every page, the app cannot truthfully claim to be jQuery-free, and course authors are encouraged to keep writing jQuery. This is the last jQuery dependency in the product.

This was split out of PRD-001 because it is **course-content** work (not exercise rendering), spans many course files, and carries content-regression risk that should not gate the Quasar conversion.

## Scope

### In scope

- Replace every course-content `$('#id').load(url)` call with a framework-free equivalent (native `fetch` + `innerHTML`, or a small shared helper exposed on `window`)
- Migrate the test course's richer jQuery usage (`src/courses/test/big.history.timeline.highlight.cosmology.html` — `$(function(){…})`, selector reads, `load()` with callback)
- Remove the `<script src="lib/jquery.min.js">` tag from `index.html`
- Delete the `lib/jquery.min.js` source asset (the `dist/` and `src-capacitor/` copies are build outputs and regenerate)
- Confirm no remaining global `$` / `jQuery` reference anywhere in shipped source

### Out of scope

- Anything in PRD-001 (exercise rendering, npm `jquery`) — assumed already complete
- Redesigning the table/reference content itself; this is a like-for-like behavior migration

## Affected files (initial inventory — verify first)

- `index.html` — the `<script src="lib/jquery.min.js">` tag (line ~24)
- `lib/jquery.min.js` — source asset to delete
- Course `course.yml` with `$('#table0').load("src/courses/english/english.html")`: `express`, `node`, `typescript`, `kotlin`, `kubernetes`, `template`, `react`, `kafka`, `quasar` (9 courses). **Note:** `android/course.yml` matches `.load(` only via `SoundPool.load()` text — not jQuery; exclude it
- `src/courses/test/big.history.timeline.highlight.cosmology.html` — richer jQuery (document-ready wrapper, selectors, `load()` with callback)

## Migration approach

The recurring pattern is:
```html
<div id="table0"></div>
<script>$('#table0').load("src/courses/english/english.html")</script>
```
Replace with a tiny global helper (defined once in a boot file or inline in `index.html`) so course YAML stays terse:
```html
<div id="table0"></div>
<script>sfLoad('#table0', 'src/courses/english/english.html')</script>
```
where `sfLoad(sel, url)` does `fetch(url).then(r => r.text()).then(html => { const el = document.querySelector(sel); if (el) el.innerHTML = html; })`. The test-course cosmology file needs its `$(function(){…})`, selector reads, and `load()`-callback flow ported to `DOMContentLoaded` + `querySelector` + the `fetch` helper's `.then()`.

## Success Criteria

- [ ] No `$(` / `jQuery` reference in any shipped source (`src/`, `index.html`); `lib/jquery.min.js` deleted
- [ ] Every migrated course still renders its injected table/reference content identically
- [ ] The test-course cosmology timeline behaves identically (content + any post-load DOM reads)
- [ ] `index.html` no longer loads jQuery
- [ ] `yarn test:all` passes

## Testing

- **E2E (Cypress):** add/extend a spec that loads a course using the `load()` pattern and asserts the injected fragment is present in the DOM (none of the current specs cover table injection)
- **Manual smoke:** open one migrated course per pattern and confirm the table/reference renders
- **Differential replay:** confirm no change to stored data (content migration should not touch persistence)
