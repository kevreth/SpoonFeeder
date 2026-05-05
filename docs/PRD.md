# Spoony AI RAG Context Feature PRD

## 1. Overview
SpoonFeeder is a client-side programmed instruction system for embedded devices. It includes Spoony, an AI tutor that helps users with course content. Currently, Spoony only has access to the current slide's text, so it cannot answer questions about prior course concepts.

This feature adds **Retrieval-Augmented Generation (RAG)** context to Spoony using precomputed embeddings from the Qwen3-Embedding-8B model. No machine learning models run on the client device — all embeddings are generated at build time on developer machines.

## 2. Background & Constraints
### Problem
Spoony's existing `buildSystemPrompt()` (in `src/ts/main/spoony/spoonyApi.ts`) only includes the current slide text. It cannot reference prior course content to answer user questions accurately.

### Prior Options Considered
1. Include all course info slides: Too large for college-level courses (100+ slides exceed token limits)
2. Static AI-generated summaries: Manual maintenance burden, misses cross-unit references
3. **Selected approach: Precomputed RAG**: Balances context accuracy, client size, and maintenance effort

### Key Constraints
- Client runs on embedded devices with limited resources
- No ML models on client (only precomputed numeric embeddings)
- Spoony uses a remote third-party AI API (Pollinations) — no local LLM
- User input is restricted to **predefined prompt options** (no free-form text) to eliminate client-side embedding needs
- Embeddings are generated at build time using Qwen3-Embedding-8B

## 3. Goals
- Give Spoony enough relevant context to answer user questions about the current slide
- Keep client bundle size small (no embedding models on client)
- Reuse existing course structure and progress tracking
- Make implementation understandable for developers with superficial AI exposure

## 4. Non-Goals
- Support free-form user text input (requires client-side embedding)
- Run any ML models on client devices
- Modify the remote Pollinations AI API integration
- Support courses not using the standard `course.yml` structure

## 5. Key Technical Definitions (Junior Dev Friendly)
All AI terms are explained in plain language:
- **Embedding**: A list of numbers that represents the meaning of a text string. Texts with similar meanings have embeddings (number lists) that are numerically close to each other.
- **Qwen3-Embedding-8B**: The AI model used at build time to generate embeddings. It has 8 billion parameters, so it accurately captures text meaning, but is too large (~16GB) to run on embedded devices. We only use it when building the app, not on user devices.
- **Cosine Similarity**: A math formula that measures how similar two embeddings are. Returns a value between -1 and 1: `1` = identical meaning, `0` = no relation, `-1` = opposite meaning.
- **RAG (Retrieval-Augmented Generation)**: A process where we first retrieve relevant context from course materials before sending a question to the AI, so the AI has enough information to answer correctly.
- **Predefined Prompts**: Fixed text options users select from (no typing their own questions). Examples: "I don't understand this concept", "Give me a hint for this exercise".

## 6. User Experience Flow
1. User views a course slide (exercise or info)
2. User taps an existing or new "Help" button
3. A modal appears with 4-5 predefined prompt options
4. User selects one prompt (e.g., "Explain this concept")
5. App loads relevant past slides, then calls Spoony AI
6. Spoony's response appears in the modal

## 7. System Architecture
Split into **Build Time** (runs on developer machines) and **Runtime** (runs on user embedded devices):

### 7.1 Build Time Components
| Component | Description |
|-----------|-------------|
| Qwen3-Embedding-8B Model | Runs on developer machine to generate embeddings |
| Embedding Build Script | Parses all course YAML files, generates embeddings for every slide and every predefined prompt |
| Output Files | Two JSON files per course: `slide-embeddings.json` (slide embeddings) and `prompt-embeddings.json` (predefined prompt embeddings) |

### 7.2 Runtime Components (Client-Side)
| Component | Description |
|-----------|-------------|
| Embedding Store | Loads precomputed JSON embedding files from the app bundle |
| Progress Tracker | Existing localStorage logic (in `src/ts/main/dataaccess/`) that knows which slides the user has completed |
| Similarity Calculator | No ML: brute-force cosine similarity between query vector and past slide embeddings |
| Spoony API Client | Existing code in `src/ts/main/spoony/spoonyApi.ts`, modified to include retrieved context |

## 8. Detailed Workflow

### 8.1 Build Time Workflow
Run via new `yarn build-embeddings` command:
1. For each course in `src/courses/`:
   a. Parse `course.yml` to extract every slide (all types: info, mc, ma, gap, etc.)
   b. Assign each slide a unique ID (format: `course:unit:lesson:module:slideIndex`, e.g., `history:intro-to-big-history:lesson-1:what-is-big-history:0`)
   c. Extract the slide's `txt` field (or `inst` if no `txt`) as the text to embed
   d. Pass slide text to Qwen3-Embedding-8B to generate a 4096-dimensional embedding (list of 4096 numbers)
   e. Save slide ID, embedding, and full slide text to `src/courses/<course>/slide-embeddings.json`
2. For each predefined prompt (e.g., "I don't understand this slide"):
   a. Pass prompt text to Qwen3-Embedding-8B to generate a 4096-dimensional embedding
   b. Save prompt ID, embedding, and prompt text to `src/courses/<course>/prompt-embeddings.json`
3. Bundle these JSON files with the course content during Quasar build

### 8.2 Runtime Workflow (When User Requests Help)
1. User selects a predefined prompt (e.g., "I don't understand this slide")
2. App retrieves:
   - Current slide's precomputed embedding from `slide-embeddings.json`
   - Selected prompt's precomputed embedding from `prompt-embeddings.json`
3. **Build Query Vector**: Average the two embeddings (add corresponding numbers in both arrays, divide by 2) — basic array math, no ML
4. **Filter Candidate Slides**:
   - Exclude the current slide
   - Exclude all future slides (using existing progress tracking to identify slides the user hasn't reached)
   - Only keep slides from the current course
5. **Calculate Similarity**: For each candidate slide, compute cosine similarity between the query vector and the candidate's embedding
6. **Retrieve Top N Slides**: Sort candidates by similarity score descending, take top 3-5 slides
7. **Build Augmented Prompt**: Modify `buildSystemPrompt()` in `spoonyApi.ts` to include:
   - Existing course context (course name, unit, lesson)
   - Current slide text (existing)
   - Text of retrieved top N relevant slides (new)
   - Selected predefined prompt text (new)
8. Send to Spoony AI API as before, return response to user

## 9. Data Structures

### 9.1 Slide Embedding JSON (`slide-embeddings.json`)
```json
[
  {
    "id": "history:intro-to-big-history:lesson-1:what-is-big-history:0",
    "course": "history",
    "embedding": [0.123, -0.456, ...], // 4096 numbers
    "slideText": "Big History is the study of history from the beginning of the universe..."
  }
]
```

### 9.2 Prompt Embedding JSON (`prompt-embeddings.json`)
```json
[
  {
    "id": "dont-understand",
    "embedding": [0.789, 0.012, ...], // 4096 numbers
    "text": "I don't understand the concept on this slide."
  },
  {
    "id": "hint-exercise",
    "embedding": [0.345, -0.678, ...],
    "text": "Give me a hint for this exercise without giving the answer."
  }
]
```

### 9.3 Updated SpoonyContext (`src/ts/main/spoony/spoonyApi.ts`)
```typescript
export interface SpoonyContext {
  courseName: string
  unitName: string
  lessonName: string
  slideText: string
  relevantSlides: { id: string; text: string }[] // New: retrieved past slides
  selectedPrompt: string // New: user's selected predefined prompt
}
```

## 10. Implementation Tasks (Junior Dev Friendly)
Tasks are small, testable, and ordered by dependency:

1. **Task 1: Define predefined prompts**
   - Create `src/ts/main/spoony/spoonyPrompts.ts` with 5-6 fixed prompt options and their text
   - Export as `PREDEFINED_PROMPTS` array

2. **Task 2: Create embedding build script**
   - Add `scripts/build-embeddings.py` using Python `transformers` library to load Qwen3-Embedding-8B
   - Script parses all `course.yml` files, generates embeddings, outputs JSON files
   - Add `yarn build-embeddings` command to `package.json`

3. **Task 3: Bundle embeddings with app**
   - Update `quasar.config.cjs` to include embedding JSON files in the build output
   - Update `build.sh` to run `yarn build-embeddings` before the main build

4. **Task 4: Load embeddings on client**
   - Add code to load `slide-embeddings.json` and `prompt-embeddings.json` at app startup (only for the current course to save memory)

5. **Task 5: Implement math utilities**
   - Write `cosineSimilarity(a: number[], b: number[]): number` (dot product of normalized vectors)
   - Write `averageVectors(a: number[], b: number[]): number[]` (element-wise average)

6. **Task 6: Modify Spoony API for context**
   - Update `buildSystemPrompt()` in `spoonyApi.ts` to include `relevantSlides` and `selectedPrompt`
   - Update `SendMessageParams` to accept `selectedPrompt`

7. **Task 7: Add help UI**
   - Create `src/vue/components/SpoonyHelpModal.vue` to show predefined prompt options
   - Add help button to existing slide components

8. **Task 8: Filter future slides**
   - Reuse existing progress tracking from `src/ts/main/dataaccess/` to exclude unread slides from similarity calculations

## 11. Testing Plan
### Unit Tests
- Test `cosineSimilarity` with known vectors (identical vectors return 1, opposite vectors return -1)
- Test `averageVectors` with sample arrays
- Test future slide filtering logic

### Integration Tests
- Run build script, verify `slide-embeddings.json` is generated correctly for the test course
- Verify query vector is built correctly from current slide + prompt embedding
- Verify top 3 relevant slides are retrieved for a sample query

### Manual Tests
- Load history course, navigate to a slide about cosmological eras
- Select "I don't understand" prompt
- Verify Spoony's response references past slides about big history eras
- Confirm future slides are never included in retrieved context

## 12. Risks & Mitigations
| Risk | Mitigation |
|------|------------|
| Qwen3-Embedding-8B is too large (16GB+) for build machine | Use quantized 4-bit version (~4GB) or run on a machine with 32GB+ RAM |
| Brute-force similarity is slow on embedded devices | 1000 slides × 4096-dim vectors = ~4M operations, instant even on low-power devices. Test on target hardware |
| Similarity returns irrelevant slides | Set minimum similarity threshold (0.7) to exclude low-relevance slides, fall back to course name only if no slides qualify |
| Predefined prompts are too limited | Start with 5 well-defined prompts, add more based on user feedback later |

## 13. References
- Existing Spoony code: `src/ts/main/spoony/spoonyApi.ts`
- Course structure example: `src/courses/history/course.yml`
- Qwen3-Embedding-8B model: https://huggingface.co/Qwen/Qwen3-Embedding-8B
- Cosine similarity explainer: https://en.wikipedia.org/wiki/Cosine_similarity
- Project architecture: `CLAUDE.md` (root of repo)
