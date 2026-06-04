---
title: "TSK-002: Global jQuery Removal — Course-Content load() Migration"
prd: "PRD-002-global-jquery-removal.md"
created: "2026-06-05"
status: "TODO"
---

# TSK-002: Global jQuery Removal — Course-Content `load()` Migration

Follow-up to TSK-001. Do not start until PRD-001 (npm `jquery` removal) is complete.
Execute top-to-bottom.

---

## Inventory

- [ ] **T-010** Confirm the full surface before changing anything
  - `grep -rn "\$(\|jQuery\|\.load(" src index.html` and classify each hit as jQuery vs false positive (e.g. `SoundPool.load()` in `android/course.yml` is NOT jQuery)
  - Produce the authoritative list of `course.yml` files using `$('#…').load(…)` and any `.html` course assets using jQuery

## Shared helper

- [ ] **T-020** Add a framework-free `sfLoad(selector, url)` helper
  - `fetch(url).then(r => r.text()).then(html => { const el = document.querySelector(selector); if (el) el.innerHTML = html; })` returning the promise (so callers can chain)
  - Expose it globally (boot file assigning `window.sfLoad`, or a small inline script in `index.html`) so course YAML inline scripts can call it
  - Unit-test the helper (mock `fetch`, assert target element receives the fragment, missing element is a no-op)

## Course migration

- [ ] **T-030** Migrate the simple `course.yml` pattern across the 9 courses (`express`, `node`, `typescript`, `kotlin`, `kubernetes`, `template`, `react`, `kafka`, `quasar`)
  - Replace `<script>$('#table0').load("…")</script>` with `<script>sfLoad('#table0', "…")</script>`
  - Leave `android/course.yml` untouched (false positive)

- [ ] **T-040** Migrate `src/courses/test/big.history.timeline.highlight.cosmology.html`
  - `$(function(){…})` → `document.addEventListener('DOMContentLoaded', …)`
  - `$('#sel')` reads → `document.querySelector('#sel')`
  - `$('#html0').load(file, cb)` → `sfLoad('#html0', file).then(cb)`

## Remove jQuery

- [ ] **T-050** Remove the global jQuery
  - Delete `<script src="lib/jquery.min.js" inline=""></script>` from `index.html`
  - Delete the `lib/jquery.min.js` source asset (build outputs in `dist/` and `src-capacitor/` regenerate)
  - Verify no `$(` / `jQuery` reference remains in `src/` or `index.html`

## Validation

- [ ] **T-060** Add/extend a Cypress spec that loads a `sfLoad`-using course and asserts the injected fragment renders
- [ ] **T-070** ✓ `yarn test:all` — 0 failures
- [ ] **T-080** Manual smoke: one migrated course per pattern renders its table/reference content identically; cosmology timeline behaves identically
- [ ] **T-090** Differential replay snapshot unchanged (content migration must not affect persistence)
