---
title: "SpoonFeeder — Gamification & Experience PRD"
---

# SpoonFeeder — Gamification & Experience PRD

## Overview

SpoonFeeder is programmatic instruction software serving 20+ courses across audiences ranging from young children to professional test prep candidates. This PRD covers the product direction for improving the learning experience through gamification, navigation, accessibility, skinning, and platform quality. It is a developer reference: it defines what to build and why, with implementation details left to feature-level specifications.

The guiding principle throughout is **gameful design** (Healey, 2019; Deterding et al., 2011): game elements are incorporated because they serve learner motivation and outcomes, not as decoration. Per Self-Determination Theory (Deci & Ryan, 1985), the design must support three psychological needs — autonomy, competence, and relatedness — without allowing extrinsic mechanics (points, stars, streaks) to crowd out intrinsic motivation.

---

## Constraints

These constraints apply to every feature in this PRD.

- **Offline-first.** SpoonFeeder is designed for use in poor connectivity environments. All features except Spoony must work fully offline.
- **Spoony is online-only.** Spoony is only available when the device has internet connectivity. The Spoony icon is hidden when offline — it does not appear disabled or locked, it simply does not appear. Connectivity checks must be lightweight and must not affect application startup or runtime performance.
- **No server-side components** beyond Spoony's API calls. Leaderboards, shared achievements, and other social features requiring a server are out of scope for the app itself.
- **Multi-platform via Quasar.** The app is distributed as Web, Electron, Android, and iOS from a single Quasar codebase. Platform-specific behaviour should be minimal and Quasar-mediated.
- **Linear course progression.** Learners cannot skip forward through content except via diagnostic pre-test results. The course structure is intentionally sequential; concepts build on each other.
- **Exercises are interleaved by default.** The test course is unrepresentative — real courses mix exercise types within modules.
- **Spoony is a lightweight assistant.** Spoony uses a limited model and is not capable of pedagogically sophisticated reasoning. It must not be designed as if it were an intelligent tutor. Distractor explanations and hint content are content-authored in YAML, not AI-generated.

---

## 1. Immediate Quality Fixes

These are the highest-visibility rough edges in the current product. They are listed here as explicit requirements but are largely subsumed by the Quasar conversion in Section 2 — they must be resolved as part of that conversion, not as standalone patches applied to the existing imperative rendering system.

### 1.1 MC/MA Button Styling
The global `button` rule in `style1.css` sets `background: #c5c5c5` on all buttons. MC/MA answer buttons inherit this grey default and receive raw CSS color keywords (`green`, `red`) as inline feedback. This is the most visible symptom of the app's dated feel.

- Replace with styled Quasar choice components — full-width, dark fill, subtle themed border, hover and active states
- Correct/incorrect feedback must use design token colors, not raw CSS keywords
- Feedback should include a visual transition, not an instant color snap

### 1.2 Gap Fill Token Theme
Gap fill tokens use `background: #E6F1FB` and `color: #0C447C` — light-mode colors that clash with the dark starfield background. Align token styling with the app's dark theme and design token system.

### 1.3 Continue Button
The continue button is injected at the bottom of `#slide` after every answer via direct DOM manipulation. It re-renders abruptly with no transition and has no consistent positioning.

- Consistent position across all exercise types
- Smooth appearance transition on render
- Should feel like part of the component, not appended procedurally

### 1.4 Correct/Incorrect Feedback
Currently only a color change on the selected button. There is no animation, no reinforcement moment, and no summary statement. The feedback is instantaneous and easy to miss.

- Add an animation and a clear reinforcement moment on answer
- Correct: rewarding, celebratory in proportion to skin intensity
- Incorrect: encouraging, not discouraging — never punitive in tone

These requirements are delivered through the Quasar conversion (Section 2), not before it.

---

## 2. Exercise Rendering — Quasar Conversion

The current exercise rendering system generates raw HTML strings, injects them via `innerHTML`, then imperatively patches the DOM with event listeners and inline style changes. This is the root cause of the dated feel and the main barrier to consistent design.

### 2.1 Architecture
- Convert all exercise types from imperative DOM manipulation to **Quasar components**
- **Quasar's Material Design component library** (QBtn, QCard, QLinearProgress, QDialog, etc.) is the structural foundation across all exercise types — it provides interaction patterns, ripple effects, elevation, accessibility, and layout primitives
- The **TS business logic layer** (`quiz/`, `slide/`, `slidetype/`) remains framework-agnostic throughout — it is not converted
- Each exercise type gets a dedicated Quasar/Vue component that receives a `SlideInterface` as props and emits answer events back to the mediator
- The `conclude()` / `decorate()` logic (marking correct/incorrect) moves from imperative DOM patching to Vue reactive state within each component

### 2.2 Conversion Sequence
Conversion is done type-by-type. The existing implementation remains live until its replacement is ready.

| Phase | Types | Notes |
|-------|-------|-------|
| 1 | `mc`, `ma` | Most common, no DnD, highest visual impact |
| 2 | `info` | Continues to use `v-html` for AsciiDoc output |
| 3 | `bool`, `select` | Simple interactions |
| 4 | `vocab` | Expanded scope — see Section 8 |
| 5 | `gap`, `sort` | DnD types; existing implementations run in parallel until replaced |

### 2.3 GSAP Removal
The sort exercise currently uses GSAP (`gsap` + `gsap/dist/Draggable`) for drag handling and position tweening. GSAP is a heavyweight dependency used only for this one type and produces complex code.

- GSAP is removed **as part of the sort Quasar conversion**, not before
- Replacement: a Quasar-compatible sortable list library (e.g. `vue-draggable-plus` wrapping SortableJS)
- Position animations replaced with CSS transitions

---

## 3. Navigation

### 3.1 Remove Transitional Slides
`JsonProcessor` auto-generates a title slide at the start of every scope boundary (course, unit, lesson, module). These slides render identically to content slides and have no visual distinction. They are removed entirely.

The navigational and pedagogical roles of transitional slides are absorbed by:
- The SumNavigation widget (persistent location awareness)
- The scope completion pulse (milestone moment)
- Quest framing in the game skin (narrative thread)

Removing transitional slides changes the flat slide array, which shifts review boundary indices and `highestReachedIndex` tracking. This is a non-trivial implementation dependency that must be resolved before removal.

### 3.2 SumNavigation Widget
A persistent widget displayed continuously in the top-left corner of the screen.

- **Updates on scope completion**, not on scope entry — it reflects what has been accomplished, not where the learner currently is
- **Displays dashes** until the first scope is completed
- **Content:** ordinal position (e.g. "Unit 2 of 5"), score, and completion at course, unit, lesson, and module levels
- **Score display is skin-defined** — game skin shows 1-3 stars; professional skin shows percentages; an intermediate teen skin may combine both
- **Pulses on every scope completion** — module, lesson, unit, and course. Visual treatment is left to the implementer. The pulse is the primary milestone notification and fires independently of the ReviewPrompt.

### 3.3 Breadcrumb
A compact "Unit 1 › Lesson 2 › Module 3" label showing current location in the hierarchy.

- Three levels deep: Unit › Lesson › Module
- **Mobile fallback** for SumNavigation — deferred until prototype testing determines whether SumNavigation is too intrusive on small screens
- Also pulses on scope completion, consistent with SumNavigation

### 3.4 Progress Context
A slide counter or progress bar within the current scope showing the learner's position (e.g. "Slide 3 of 8"). Implementation form left to the implementer.

### 3.5 ReviewPrompt
The existing ReviewPrompt (fires at lesson, unit, and course boundaries when reviewable exercises exist) is retained but must be updated as part of the Quasar conversion:

- Rebuilt using Quasar components — it currently uses plain HTML buttons with ad-hoc scoped CSS
- Styled consistently with the app's active skin — it currently presents a white modal box that clashes with the dark starfield and bears no visual relationship to the rest of the UI
- Operates independently of the pulse and SumNavigation update

---

## 4. Milestone & Feedback

### 4.1 Scope Completions as Level-Ups
Completing a module, lesson, unit, or course should feel like a meaningful achievement, not a silent slide transition. The SumNavigation pulse is the primary signal. Skin intensity governs how dramatic the moment is — the game skin produces a full celebration; the professional skin produces a restrained acknowledgment.

### 4.2 Stars (Game Skin)
- 1-3 stars per scope, displayed in SumNavigation in place of percentages
- Stars reflect **mastery**, not completion — tied to review score, not just finishing a scope
- Stars are a signal of skill built, not a collectible — design must avoid the mechanic becoming a chase

### 4.3 Differentiated Feedback
- Learners who are struggling receive encouragement-focused feedback ("Keep going — you're building on it")
- Strong performers receive achievement-focused feedback ("Perfect — you've mastered this")
- The threshold between these modes is configurable or derived from recent answer history

### 4.4 Variable Rewards
Not every correct answer receives the same response. Occasional surprise Spoony reactions and rare Easter eggs for perfect module scores sustain engagement beyond what consistent rewards can. Unpredictability is a recognised motivational driver (Chou's Octalysis, drive #7).

### 4.5 Easter Eggs
Hidden content or reactions triggered by specific behaviours: perfect module score, completing a streak, or undocumented tap targets. Fully local, no server required.

### 4.6 End-of-Course Summary
The current summary screen is a plain table. It should feel earned — a high score screen, not a report card. Implementation details left to the designer.

---

## 5. Game Feel

### 5.1 Visual Target
The game skin should be visually indistinguishable from mobile games designed for children. This is the quality bar, not a metaphor.

### 5.2 Quest Framing
The course is presented as a mission; each module is a quest step. This replaces the role of transitional slides as structural markers and provides the narrative scaffold for Spoony's story arc. Quest framing is a skin toggle — on for the game skin, off for the professional skin.

### 5.3 Spoony
Spoony is the primary social/relational layer in the experience. It is online-only (see Constraints); when offline, the icon is hidden entirely. Its presence should therefore be designed as enrichment rather than a core dependency of the learning flow.

- **Central expressive mascot** in the game skin — visible on-screen, reacting to performance, celebrating milestones
- **Narrative thread** — a thin story arc across the course; Spoony is not just reactive, it is a character with continuity
- **Lifejacket** — when a learner answers the same question incorrectly multiple times, Spoony offers a content-authored hint (from YAML) without giving the answer away. Spoony does not generate hints dynamically — it surfaces authored content.
- **Prominence is skin-controlled** — central mascot in game skin, optional utility assistant in professional skin

### 5.4 Streaks & Personal Bests
- Tracked locally in localStorage
- Designed to motivate without creating anxiety — the "don't break the streak" failure mode (well-documented in Duolingo criticism) must be avoided by design
- Personal bests are always framed positively: "your best score on this lesson was X"

### 5.5 Power-Ups
Earned tokens spendable on hints or review skips. Gives learners a sense of resource ownership (Chou's drive #4) without requiring a server. Accumulation and spending are local.

### 5.6 Earned Vanity Items
Some user customisation options (backgrounds, Spoony expressions or outfits) are locked at start and unlocked through achievement. This turns the customisation layer into a progression mechanic. All unlocks persist in localStorage.

### 5.7 Autonomy
Small meaningful choices within the learning path beyond cosmetic customisation. At minimum: "review now or later?" (already implemented via ReviewPrompt). Additional choice points to be identified during design.

---

## 6. Design Phase Guidance

Game mechanics should be introduced progressively. Overwhelming learners with mechanics during onboarding defeats the purpose.

| Phase | Description | Appropriate mechanics |
|-------|-------------|----------------------|
| Onboarding | First module | Tutorial, Spoony introduction, basic progress HUD |
| Late Onboarding | Early lessons | Streaks begin, stars introduced, quest framing established |
| Midgame | Middle units | Power-ups available, variable rewards active, Easter eggs possible |
| Late Midgame | Later units | Personal bests tracked, earned vanity items unlocking |
| Endgame | Final units | Full mechanic set active, challenge content if available |
| Everlasting | Post-completion | Review system is the primary re-engagement loop |

The review system is the Everlasting phase. It is the most important long-term retention mechanic in the product and should be designed with that weight.

---

## 7. Skinning

### 7.1 Architecture
- Each skin is defined in a **separate skin file** referenced by `course.yml`
- **Quasar Material Design components are the structural foundation across all skins** — skins theme the components, they do not replace them
- The skin file controls the Quasar theme tokens: palette, typography, spacing, border radius, elevation, animation duration and intensity

### 7.2 Minimum Skins

**`game` (children)**
- Quasar MD tokens overridden aggressively: saturated palette, large rounded corners, playful typography, high animation intensity
- Score display: 1-3 stars
- Spoony: central expressive mascot, prominent
- Quest framing: on
- Celebration intensity: high

**`professional` (adult test prep)**
- Quasar MD defaults with minimal overrides — clean, readable, polished app feel
- Score display: percentages in SumNavigation
- Spoony: optional utility assistant, unobtrusive
- Quest framing: off
- Celebration intensity: low

**Intermediate skins (e.g. teens)** can be added by combining elements of the above — for example, stars alongside a numeric score, moderate animation intensity.

### 7.3 User Customisation
A layer of personal preference on top of the skin, persisted in localStorage:
- Background
- Font
- Font size
- Some options are unlocked through achievement rather than freely available (see Section 5.6)

---

## 8. Learning Enhancements

### 8.1 Diagnostic Pre-Test
A short assessment offered before a module, lesson, or unit begins. Learners who demonstrate sufficient knowledge can skip the corresponding content.

- Pre-test scope (module / lesson / unit) is defined in `course.yml` by the course author
- Content tested out of is **excluded from the review pool** — if the learner demonstrated mastery, they are not re-tested on it
- Skipping content does not affect the integrity of downstream content; course authors are responsible for ensuring skippable scopes are genuinely self-contained

### 8.2 Distractor Explanations
A `distractor` field per MC/MA option in YAML provides a targeted explanation when that wrong answer is chosen:

```yaml
- type: mc
  txt: Which planet is closest to the Sun?
  o:
    - ans: Mercury
    - ans: Venus
      distractor: Venus is the second planet — closer than Earth but not the closest.
    - ans: Earth
      distractor: Earth is the third planet from the Sun.
```

This turns incorrect feedback into a teaching moment. Content is authored, not AI-generated, because Spoony cannot reason reliably about misconceptions.

### 8.3 Mistake Journal
A local view of all questions answered incorrectly across sessions.

- Surfaced as a "weak spots" section accessible from the menu
- Data already exists in save data — this is a presentation feature, not new storage
- Can seed a targeted review session

### 8.4 Vocabulary — Spaced Repetition
The vocab exercise type currently presents word/definition pairs without any retention mechanism. It should be extended into a full spaced repetition flashcard system:

- Learner is shown a word and recalls the definition
- Learner rates their confidence (knew it / unsure / didn't know)
- Algorithm schedules next presentation based on confidence rating
- Integrates with the existing review system rather than implementing a parallel mechanism
- Model: Anki-style SM-2 or equivalent, implemented locally

---

## 9. Accessibility

Accessibility is a first-class requirement throughout this PRD, not a post-hoc addition.

- **Legal context:** screen reader support and keyboard navigation are increasingly required by law for children's educational software and are commonly contractual requirements in professional test prep markets
- **Quasar's built-in accessibility** (ARIA roles, focus management, keyboard events) must be used intentionally throughout the Quasar conversion — it is not automatic
- **Requirements:**
  - Screen reader support (ARIA labels on all interactive elements)
  - Full keyboard navigation (Tab, Enter, Arrow keys throughout all exercise types)
  - Motor accessibility (touch targets meet minimum size requirements — 44×44px)
  - Dyslexia-friendly typography available as a user customisation option
- Accessibility must be verified against all skins — a skin must not introduce contrast or interaction regressions

---

## 10. Content Creation Tooling

### 10.1 YAML Authoring Tool
Course YAML is currently written blind with no validation or preview. This is a significant barrier for non-developer course authors.

- A local tool (CLI or GUI) that validates `course.yml` against the schema and renders a live preview
- Schema validation catches structural errors before the course is loaded in the app
- A powerful external LLM (separate from Spoony — e.g. Claude, GPT-4) could draft YAML from pasted text, a PDF extract, or a URL, accessed via the companion tooling rather than in-app

### 10.2 Shared Content Libraries
Vocabulary sets and concept modules defined once, reusable across related courses.

```yaml
# course.yml
shared:
  - library: infrastructure.vocabulary
```

Relevant when related courses share terminology (e.g. Docker and Kubernetes sharing infrastructure vocabulary). Eliminates duplication and allows a correction in one place to propagate across courses.

---

## 11. Professional Test Prep

### 11.1 Practice Exam Mode
- Timed session, no mid-exercise feedback
- Score report presented at completion
- Uses existing exercise infrastructure — no new exercise types required
- Makes SpoonFeeder directly competitive with dedicated test prep tools in the professional skin

### 11.2 Printable Study Sheet
- A formatted print view of course content and the learner's mistake journal
- Valuable for learners in low-connectivity environments who study on paper
- Accessible from the end-of-course summary or the mistake journal

---

## 12. Data Portability

Save data is stored in localStorage, which is device- and browser-scoped. Learners who share devices or switch devices lose continuity.

- Export localStorage save data as a **downloadable file or QR code**
- Import save data on a new device to restore progress
- This is also the foundation for the companion website's social features (see Out of Scope below)
- No server required — the file is the transport mechanism

---

## Out of Scope — Future PRDs

The following features were considered during this PRD's development and are intentionally deferred. They are recorded here to prevent them from being forgotten.

### Companion Website & Social Features
A separate website where learners upload their save file to access community features: leaderboards, course completion badges, score comparisons, community streaks.

The app would include an optional thin client — a community section visible only when online, simply absent (not hidden or greyed-out) when offline. Social features are never referenced during the core learning flow; offline learners must never feel they are missing out on core functionality.

Design principle: the community section is a destination the learner chooses to visit, not woven into the feedback loop.

Deferred because: requires a separate infrastructure project. Save data portability (Section 12) is the prerequisite.

### Branching Narratives
Course YAML supports branching: learners who struggle are routed to remedial content; strong learners unlock challenge content. Adaptive in the spirit of the Healey article's finding that adaptive gamification outperforms linear approaches.

Deferred because: YAML authoring complexity makes this impractical without the companion authoring tool (Section 10.1). The two features are co-dependent. Both should be scoped together in a dedicated PRD.

### SpoonFeeder as an SDK
The TS business logic layer (`quiz/`, `slide/`, `slidetype/`) is already well-separated from the Vue/Quasar presentation layer. It could be published as a standalone package, allowing other developers to build alternative front-ends (terminal, voice, classroom tools) on top of SpoonFeeder's course engine. The YAML course format would become an open standard.

Deferred because: premature. Complete the Quasar conversion and stabilise the architecture first.

---

## References

- Healey, D. (2019). Gamification. *TESOL Press.*
- Deci, E. L., & Ryan, R. M. (1985). Intrinsic motivation and self-determination in human behavior. Plenum.
- Deterding, S., Khaled, R., Nacke, L., & Dixon, D. (2011). Gamification: A definition.
- Chou, Y.-K. (2014). Actionable gamification: Beyond points, badges, and leaderboards. Octalysis Media.
- Hunicke, R., LeBlanc, M., & Zubek, R. (2004). MDA: A formal approach to game design and game research.
- Epic Win Blog. (2013). The 35 Gamification Mechanics Toolkit v2.0. epicwinblog.net.
