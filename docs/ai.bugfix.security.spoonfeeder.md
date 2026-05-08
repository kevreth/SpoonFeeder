# SpoonFeeder AI Bugfixing Platform — Security Finding Register

## Purpose
Tracks security findings identified during gap analysis and platform implementation. Each finding must be resolved or formally accepted before the platform reaches Phase 6 gate. Findings marked **Mandatory Human Escalation** cannot be auto-merged by AI agents regardless of confidence score.

---

## Finding Register

### SF-001 — API key stored as plain text in localStorage

| Field | Value |
|---|---|
| **ID** | SF-001 |
| **Severity** | High |
| **Subsystem** | Spoony (`spoonyStorage.ts`) |
| **Key** | `spoony_api_key` |
| **Discovery** | Gap analysis Phase 2 / `scripts/security-scan.ts` |
| **Status** | Open |
| **Mandatory Human Escalation** | Yes — changes to secret storage |

**Description:**
`SPOONY_API_KEY` is stored as a plain string in `localStorage` via `WebStorageVariable('spoony_api_key', localStorage)`. The key is visible to any JavaScript running on the page (XSS) and visible in plaintext in browser DevTools. Any user of a shared device can read another user's API key.

**Current code:**
```ts
const _apiKey = new WebStorageVariable('spoony_api_key', localStorage)
export const SPOONY_API_KEY = {
  get(): string | null { return _apiKey.get() },
  set(val: string) { _apiKey.set(val) },
  ...
}
```

**Risk:**
- XSS attack on any SpoonFeeder page can exfiltrate the API key.
- Shared device / shared browser profile exposes key to other users.
- API key is a `Bearer` token for `gen.pollinations.ai`; theft enables API abuse billed to the key owner.

**Recommended resolution:**
Migrate to Web Crypto API symmetric encryption at rest (encrypt with a device-derived key before storing) or, on Android, use Capacitor's Biometrics / SecureStorage plugin. Neither is trivial and both require UX design for key entry and recovery. This is a human-escalation item — do not implement as an AI patch.

**Invariant registered:**
`storage.sensitive-not-empty` (Phase 3): `spoony_api_key` must never be written as an empty string.

**Interim mitigation (Phase 3):**
Register `spoony_api_key` with `sensitive: true` in `SchemaRegistry`. This enables the `isSensitive` check in the adapter but does not encrypt the value. Log a warning on read in development builds only. Does not resolve the finding.

---

### SF-002 — Cypress catch-all suppresses all runtime exceptions in E2E

| Field | Value |
|---|---|
| **ID** | SF-002 |
| **Severity** | Medium |
| **Subsystem** | Test infrastructure (`cypress/e2e/example.cy.ts`) |
| **Discovery** | Gap analysis |
| **Status** | Resolved (Phase 5) |
| **Mandatory Human Escalation** | No |

**Description:**
The Cypress test file contains:
```ts
Cypress.on('uncaught:exception', (err, runnable) => {
  console.log('Error:', err);
  return false;  // prevents Cypress from failing the test
});
```
This suppresses **all** uncaught exceptions globally, including exceptions thrown by SpoonFeeder business logic. AI-generated patches that introduce runtime errors will pass E2E tests because the errors are swallowed.

**Risk:**
- Real bugs masked by the catch-all pass the E2E gate and reach the confidence score as `e2e_tests_passed: true`.
- The differential replay deviation count is artificially low because errors don't produce observable state differences.

**Recommended resolution (Phase 5):**
Replace the catch-all with targeted suppression. Identify third-party library errors that are genuinely non-fatal (e.g., MathJax rendering warnings, highlight.js async load failures) by error message pattern and suppress only those:
```ts
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('MathJax')) return false;
  // add other known safe suppressions here
  return true; // fail the test for all other errors
});
```

**Invariant registered:** None — this is a test infrastructure issue, not a runtime invariant.

---

### SF-003 — SaveData.get() silently accepts corrupted JSON

| Field | Value |
|---|---|
| **ID** | SF-003 |
| **Severity** | Medium |
| **Subsystem** | SaveData (`dataaccess/saveData/saveData.ts`) |
| **Discovery** | Gap analysis / code review |
| **Status** | Resolved (Phase 3) |
| **Mandatory Human Escalation** | No |

**Description:**
```ts
public static get(): Array<SaveData> {
  const data = getSaveData(COURSE_NAME.get() as string) as string;
  const data1 = JSON.parse(data);  // throws on invalid JSON — unhandled
  const arr1 = new Array<SaveData>();
  const arr: Array<SaveData> = extend<Array<SaveData>>(arr1, data1);
  return arr;  // data1 is not validated against SaveData schema
}
```
If `localStorage` contains a corrupted or externally modified value for the course key, `JSON.parse` throws an unhandled exception. If `data1` is valid JSON but not a `SaveData[]` array, `extend` silently produces a malformed array that is used for quiz state decisions.

**Risk:**
- Corrupted save data causes an unhandled exception that crashes the quiz without a recovery path.
- Malformed data (wrong shape but valid JSON) produces incorrect quiz state silently.

**Recommended resolution (Phase 3):**
After migrating to `StorageAdapter`, `get` on the save data key will:
1. Run `SaveDataArraySchema.parse(data)` — throws with a readable error if shape is wrong.
2. Wrap the throw at the `SaveData.get()` call site with a recovery handler that clears the corrupted key and returns an empty array (i.e., restarts the course).

This is not a security finding in the traditional sense but is listed here because silent data corruption has the same effect as a security integrity violation.

**Invariant registered:**
`storage.schema-valid` (Phase 3): all reads from registered keys must pass Zod validation.

---

### SF-004 — SaveDataDispatcher.end() and .next() throw in reachable states

| Field | Value |
|---|---|
| **ID** | SF-004 |
| **Severity** | Medium |
| **Subsystem** | Quiz state (`dataaccess/saveData/slideDispatcher2.ts`) |
| **Discovery** | Code review during PRD authoring |
| **Status** | Resolved (Phase 4) |
| **Mandatory Human Escalation** | No |

**Description:**
`SaveDataDispatcher.next()` and `SaveDataDispatcher.end()` both throw `'Method not implemented.'`. The `END` state is reachable from `_getCurrentSlide()` (which calls `dispatch2` with `advance: false`) when the course is complete (`save.cont === true && saves.length === slides.length`). This means `getCurrentSlideExplanation()` crashes when called on the final slide after course completion.

**Risk:**
- Runtime crash on a user-visible code path (viewing explanation after final slide).
- The crash is currently swallowed by the Cypress catch-all (SF-002), so E2E tests do not detect it.

**Recommended resolution (Phase 4):**
Implement `SaveDataDispatcher.end()` to return an appropriate slide (e.g., the results/summary slide, or the last answered slide) rather than throwing. Register the `quiz.end-reachable` invariant that fires in development when the END state is entered with an unimplemented handler.

**Invariant registered:**
`quiz.end-reachable` (Phase 4).

---

## Mandatory Human Escalation Summary

The following categories always require human review regardless of AI confidence score:

| Category | Applies To |
|---|---|
| Changes to API key storage or handling | SF-001; any change to `spoonyStorage.ts` key storage mechanism |
| Changes to encryption or hashing | Any future introduction of Web Crypto or Capacitor SecureStorage |
| Changes affecting student data retention or privacy | Purge, export, or transmission of `SaveData` arrays |
| Changes to financial transactions or billing | N/A currently; applies if Spoony usage becomes metered |
| Significant performance regression (>10%) | Any patch; assessed by Risk Agent performance scan |
| Breaking changes to `SaveData` schema or format | Any Zod schema change to `SaveDataArraySchema` without migration |
| Patches modifying patch validation rules | Any change to `scripts/ai-patch-validate.ts` |
| Patches flagged by differential replay with storage state deviations | Any patch; assessed by differential replay script |

---

## Finding Status Definitions

| Status | Meaning |
|---|---|
| Open | Finding confirmed; no fix in place |
| Mitigated | Partial control in place; root cause not resolved |
| Resolved | Fix implemented and verified |
| Accepted | Risk formally accepted; no fix planned; rationale documented |
