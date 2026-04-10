# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SpoonFeeder is programmatic instruction software — it breaks learning content into slides with concept-checking questions and interactive exercises (multiple choice, gap fill, sort, vocab, etc.). The same app framework serves 20+ courses, each defined as YAML content files.

## Commands

```bash
# Development
quasar dev                              # Start dev server (default "test" course)
COURSE=<name> quasar dev               # Start with a specific course

# Validation
yarn type-check                         # Vue TSC type checking
yarn lint                               # ESLint with auto-fix
yarn format                             # Prettier formatting
yarn circular                           # Check for circular dependencies in quiz.ts
yarn test:unit                          # Run all Vitest unit tests
yarn test:unit -- quiz.test.ts         # Run a single test file
yarn test:e2e                           # Run Cypress E2E (requires dev server on :9000)
yarn test:e2e:open                      # Open Cypress GUI
yarn test:all                           # Full pipeline: type-check + lint + unit + e2e
./build.sh                              # Same as test:all with timing output

# Build
quasar build                            # Web production build
quasar build -m capacitor -T android   # Android build
```

## Architecture

The codebase has a strict two-layer separation:

**TypeScript business logic** (`src/ts/main/`) — framework-agnostic:
- `quiz/` — quiz execution, answer evaluation, state dispatching
- `slide/` — slide rendering, AsciiDoc parsing, explanation logic
- `slidetype/` — exercise type implementations (vocab, sort, info, gap-fill, etc.)
- `course/` — course loading, YAML/JSON processing, scoring
- `dataaccess/` — persistence via localStorage
- `index.ts` — barrel exports (wraps lodash, marked, MathJax)

**Vue presentation layer** (`src/vue/`) — UI only:
- `mediator.ts` — the central coordinator; bridges Vue reactivity and TS business logic
- `composables/` — `courseData`, `summary`, `validation` composables
- `pages/IndexPage.vue` — single-page entry point
- `components/` — UI components (buttons, course selector, slides, etc.)
- `stores/` — Pinia (present but minimal; most state lives in mediator/composables)

**Course content** (`src/courses/<name>/`):
- `course.yml` — metadata and structure
- `slides/` — YAML slide definitions

The `COURSE` env var (default: `"test"`) determines which course is loaded at build/dev time. The Quasar config (`quasar.config.cjs`) has a custom plugin that injects course content.

## Key Data Flow

1. User selects course → `mediator.ts` calls `loadCourseListing()`
2. Course YAML parsed by `courseFileProcessor` → slide objects created
3. `Slide` class dispatches to type-specific renderers in `slidetype/`
4. AsciiDoc content processed via AsciiDoctor, math via MathJax, code via highlight.js
5. User answers → `Quiz` evaluates → `stateActionDispatcher` updates app state
6. Scores persisted to localStorage via `dataaccess/`

## Adding a New Exercise Type

Each exercise type is implemented across four files in `src/ts/main/slidetype/types/<name>/`:

1. `slideType<Name>.ts` — extends `Slide`; implements `accept`, `decorate`, `setProperties`, `makeSlides`
2. `createHtml<Name>.ts` — function that renders the exercise HTML into the DOM
3. `makeSlidesStrategy<Name>.ts` — function that produces the `SlideInterface[]` set
4. `factory<Name>.ts` — extends `SlideInitializer`; wires strategies together via `new <Name>(type, CreateHtml.X, MakeSlidesStrategy.X, Evaluate.X, Result.X)`

After adding those four files, register in three places:
- `slideFactory.ts` — add `new <Name>Factory()` to the `values` array
- `strategies/createHtmlStrategy.ts` — add the type and static entry to `CreateHtml`
- `strategies/makeSlidesStrategy.ts` — add the type and static entry to `MakeSlidesStrategy`
- `slidetype/index.ts` — barrel-export everything

**Strategy enums** (pick one per exercise type):
- `Evaluate.SIMPLE` (one answer → one boolean) or `Evaluate.GAP` (multiple answers → boolean[])
- `Result.SIMPLE` (`isEqual`), `Result.CORRELATED` (element-wise array compare), or `Result.UNSUPPORTED` (info slides)

## SlideInterface Fields

YAML slide properties map directly to `SlideInterface`:
- `txt` — question text (AsciiDoc); also used as unique identifier for save data
- `ans` — correct answer (`string | string[] | number[]`)
- `res` — user response (same type as `ans`; populated at runtime)
- `o` — options array (mc, ma)
- `exp` — explanation shown after answering
- `ref` — reference material
- `inst` — instruction text
- `img` — image path (imap)
- `numans` — number of correct answers (ma)
- `list` — key/value map (vocab)
- `cont` — whether the user has submitted an answer for this slide
- `isExercise` — distinguishes exercises from info slides
- `set` — child slides (for slide sets like vocab)

## TypeScript Configuration

- **Strict mode** enabled; `baseUrl` is `src/ts` so imports resolve relative to there
- `tsconfig.typecheck.json` extends the base but excludes `*.spec.ts` files
- Type-check runs via `vue-tsc`; standard `tsc` won't cover `.vue` files

## Testing Notes

- Unit tests live in `src/ts/test/` and use Vitest + jsdom
- E2E tests in `cypress/e2e/` require the dev server running on `http://localhost:9000`
- `vitest-mock-extended` is available for enhanced mocking
- The "test" course (`src/courses/test/`) is the default for development and unit tests
