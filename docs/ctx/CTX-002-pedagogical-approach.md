---
title: "CTX-002: SpoonFeeder's Pedagogical Approach"
updated: "2026-08-09"
relevant_to: "PRD-004, PRD-005, PRD-006"
---

## Scope

This document is the academic and theoretical justification for how SpoonFeeder teaches — the *why*, grounded in instructional-design and cognitive-psychology research, and the *evidence* that the shipping course content already follows it. It is not a how-to. A separate course-creator's guide (possibly itself delivered as a SpoonFeeder course) will cover the practical mechanics of authoring `course.yml` content — field-by-field conventions, tooling, examples to copy. This document exists so that guide, and every future course epic, has a single place to point to for *why the platform is shaped the way it is*, instead of re-deriving it from tribal knowledge or reverse-engineering it from existing course files.

## The name is the thesis

"SpoonFeeder" is a deliberate, adversarial name. Traditional education frequently withholds — "figure it out yourself, I'm not going to spoonfeed you" — on the premise that struggle produces understanding. SpoonFeeder rejects that premise as the default mode of instruction. The goal is to load a learner's brain as quickly and as painlessly as possible: don't make them discover what can simply be told.

This produces two distinct design axes. They are complementary, not redundant, and a course that only does one of them is not doing SpoonFeeder's pedagogy.

## Axis 1 — Acquisition is explicit

New knowledge, heuristics, and procedures are always given directly. SpoonFeeder never withholds a rule, a formula, or a strategy in the hope that a learner will induce it from enough examples. Where traditional instruction might present a variety of worked problems and trust the learner to notice the underlying pattern, SpoonFeeder states the pattern outright.

**Grounding:** Kirschner, Sweller & Clark, 2006, "Why Minimal Guidance During Instruction Does Not Work: An Analysis of the Failure of Constructivist, Discovery, Problem-Based, Experiential, and Inquiry-Based Teaching." Their argument, built on cognitive load theory, is that novices lack the schema required to productively self-discover; withholding guidance does not deepen understanding, it spends working memory on search instead of on learning. Fully guided, explicit instruction outperforms minimal-guidance and discovery-based approaches, especially during early skill acquisition — exactly the audience SpoonFeeder's courses are written for.

**A necessary reconciliation.** Some content in shipping courses briefly asks a learner to guess before telling them the answer (see "Predict-then-confirm" below). This is *not* an exception to explicit acquisition, and should never be described as a small dose of discovery learning. The distinguishing feature is duration and resolution: a bounded guess that gets resolved on the very next slide is a memory-encoding technique (the pretesting/generation effect — Kornell, Hays & Bjork, 2009), not open-ended exploration. Guidance is never actually withheld; a retrieval attempt is simply sequenced a moment before the fact lands, because that sequencing itself strengthens encoding. If a future course design ever leaves something genuinely unresolved for the learner to work out unaided, that would break this axis — the platform does not currently do this anywhere.

## Axis 2 — Consolidation is retrieval-driven

Once a fact, procedure, or heuristic has been explicitly given, it is retained through active retrieval, not passive re-reading. This is SpoonFeeder's "extreme retrieval practice" vision: an atomic unit of learning — a sentence, a diagram, a single step — is presented, then immediately and repeatedly tested.

**Grounding:**

- **Testing effect / retrieval practice** — Roediger & Karpicke, 2006, "Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention" (*Psychological Science*). Retrieving information from memory produces far better long-term retention than restudying it, even though restudying *feels* more productive in the moment (the fluency illusion). Popularized for a general audience by Benedict Carey's 2010 *New York Times* piece, "Forget What You Know About Good Study Habits."
- **Successive relearning** — Rawson & Dunlosky, 2011; Rawson, Dunlosky & Sciartelli, 2013. The specific mechanism closest to SpoonFeeder's vision: retesting the *same* atomic fact repeatedly, to a mastery criterion (e.g., two correct responses in a row), rather than testing it once. Retest-to-criterion produces retention durable well beyond a single retrieval attempt.

**Known boundary conditions, addressed by existing design:**

| Critique | SpoonFeeder's existing mitigation |
|---|---|
| Retrieval without corrective feedback can entrench errors (Kang, McDermott & Roediger, 2007) | Every exercise type requires authored `exp` explanation content, shown after the answer |
| Benefits are strongest for rote recall, weaker for transfer/higher-order reasoning (though later work — Rowland, 2014 — softens this) | Worked-example fading and narrated reasoning (see below) target transfer directly, not just fact recall |
| Most founding evidence is lab-based (word lists); classroom effect sizes are smaller and noisier | Not yet directly addressed — worth tracking as content matures |
| Affective cost / test anxiety from repeated retrieval | `docs/prd.gamification.md` requires incorrect feedback to be "encouraging, not discouraging — never punitive in tone" |
| Conflation with high-stakes standardized testing | All SpoonFeeder testing is low-stakes and formative — no scores are used for gatekeeping within a course; this should be stated explicitly if the document is ever read outside engineering |

## The atomic unit: the module

The concrete mechanism implementing both axes is the `module` (`course.yml`: a `name`, an `inst` list, and an `exercises` list). A module is SpoonFeeder's atomic unit of instruction: one small piece of content, immediately and repeatedly retrieval-tested, bound together by nothing more than YAML nesting.

That last point is load-bearing. Course YAML has a hard, deliberately-chosen constraint: **no ID field, and no reference field of any kind** (see `docs/adr/026-no-course-content-cross-referencing.md`). Manually-maintained YAML with manually-synced IDs was a recurring source of real bugs before this constraint existed. A module satisfies "bind this content to its questions" entirely through structural proximity — nesting inside the same module — never through a lookup key. This is why the module shape looks the way it does, and it's a constraint every course, and every future exercise type, has to keep satisfying.

Evidence this mechanism is real and consistently used, not aspirational:

- **`src/courses/history/course.yml`** — small `info` content bites interleaved with immediate `bool` checks *within* `inst`, followed by an `exercises` battery retesting the same facts via varied item types (`sort`/`gap`/`mc`/`vocab`) rather than repeating one question format — this prevents learners from pattern-matching a question's surface format instead of recalling the underlying fact.
- **`src/courses/bash/course.yml`** authors a `ccq` array nested directly inside each `info` item — literally *Concept Check Question*, the established TESOL/CELTA term (ties to Deborah Healey's TESOL background, already cited in `docs/healy.gamification.md`) for verifying a learner grasped a concept immediately after it was presented. This field is **not wired into the course loader** (`src/ts/`, `src/vue/` have zero references) — it's either orphaned from an earlier design or aspirational — but it hands us the correct term for what the sibling-`bool` mechanism in `history`/`docker` actually implements.
- **Atomicity is enforced by splitting modules, not by cramming.** `history`'s "Overview of the Cosmological Era" appears as two consecutive modules with the identical name rather than one module with a longer `inst` list. When there's more to say than fits one atomic unit, a new module starts. Not every module needs its own `exercises` battery either — one of the two has `exercises: []`, existing purely to set up the next module.
- **Atomic-unit size adapts to the domain's natural grain.** Reference/API-style courses plan one module per real-world atomic unit rather than an arbitrary chunk of content — `vue`'s Global/Composition API sections are one module per API function; `android`'s course.yml (31,017 lines, almost entirely an exhaustive *empty* skeleton with only 16 real content items) plans the complete curriculum scope hierarchically, unit → lesson → module, one module per concept/API surface, before any content authoring begins — in the same nested structure that will eventually hold the finished content.

## Orientation: the big picture always comes first

Every course, unit, and lesson should open with an overview of the structure ahead — often a knowledge graph — and that overview is itself presented *and quizzed on*, not just shown once as a diagram.

**Grounding:** advance-organizer theory (Ausubel, 1960) — present the overarching structure before details, so new content has a scaffold to attach to. SpoonFeeder's variant retrieval-practices the organizer itself rather than treating it as a passively-viewed diagram.

**Evidence:** `history`'s four-epoch table is introduced early ("The largest eras of big history" module) and retrieval-tested three separate ways (`vocab`, `gap`, `sort`) in that module's own `exercises` battery. The same table is then explicitly *recalled* in prose ("Recall in the last unit we divided all of history into four eras...") at the start of the next unit, before drilling into detail — the big picture re-anchors each new zoom-in. Note this recall is prose restatement, not a structural reference — consistent with the no-cross-referencing constraint above.

Related, and independently confirmed across three courses (`javascript`, `vue`, `docker`): courses explicitly declare their own prerequisites at the start ("This course assumes X — if you feel weak in this area, gain it first"), and in the more mature courses this declaration is itself quizzed (`docker`'s intro `bool`-checks its own prerequisite claim). `docker` additionally states outright, as a platform-wide policy directed at the learner: *"Like all Spoonfeeder courses, this course is self-contained... No installation of Docker is required."* No SpoonFeeder course should ever require external tooling or environment setup to complete.

## Techniques observed in explicit-instruction content

These are concrete, empirically-observed techniques implementing Axis 1 (explicit acquisition), drawn primarily from `src/courses/word.problems/course.yml`, which teaches a general problem-solving *procedure* rather than a set of facts:

- **Explicit strategy instruction with a mnemonic.** The "Word Problem Procedure" (Read → Decorate → Identify → Diagram → Tabulate → Translate → Solve → Check → State) is taught by name as a memorizable algorithm, with a mnemonic sentence for the acronym RDIDTTSCS. Sub-procedures get the same treatment — "Identify" decomposes into six sub-steps with its own mnemonic, PFEVSE.
- **A persistent breadcrumb, not just a boundary-level big picture.** Every worked-example slide carries an `sdbr` field showing the full procedure with the current step bolded — the advance-organizer principle applied continuously, at the finest possible grain, via a dedicated existing field.
- **Conditional steps are stated explicitly, not left implicit.** "Not all of steps will be used with every word problem" is followed by concrete demonstration — later examples skip Tabulate/Translate/Check, or state "No diagram possible," each time with a one-line reason.
- **Artifacts are built incrementally, in view.** A multi-step table gets redrawn across consecutive slides with more cells revealed each time, rather than presented finished and explained after the fact.
- **Deliberate complexity ramp and domain variability across sequential worked examples** (worked-example fading and variability — Renkl & Atkinson; Paas & van Merriënboer). Five examples reuse the identical named procedure while progressively increasing difficulty and varying the surface domain (area, coins, motion, mixture, pure algebra) — this targets transfer of the deep structure, not memorization of one context.
- **Reasoning is narrated, including the road not taken.** The hardest step is flagged explicitly ("This variable substitution step is the most difficult part... think about it carefully"), and alternative approaches are named along with why they were rejected ("we could have selected p instead, but that entails division — more complicated than multiplication"). This is an explicit heuristic, handed to the learner, not induced by them.
- **Judgment-based steps are explicitly distinguished from deterministic ones.** "You may not make the same decisions about underlining and crossing out as another student" calibrates expectations and reduces anxiety about a step that has no single right answer, versus steps (Solve, Check) that do.
- **"Spotlight decomposition" of a compound sentence.** Confirmed independently in two courses (`javascript`'s "What is Javascript?", `vue`'s "What Vue Is"): one dense definitional sentence is repeated across consecutive slides, each time highlighting a different clause and elaborating only that part, before the whole is expected to be understood as composed of its parts.
- **Misconceptions are named and confronted directly.** Where a new fact runs against a previously-taught pattern, the content says so ("this works in the *opposite direction* of the trend in human history") rather than trusting the learner to notice the contrast unaided.
- **Concept boundaries are taught via near-miss non-examples**, not just positive instances — e.g. history's check on whether a narrow, over-specific topic belongs in "big history" (concept attainment via positive and negative instances, Bruner).
- **Predict-then-confirm** — some modules open with a bounded question requiring the learner to read data and infer a pattern themselves, immediately followed by the direct explanation. See the Axis 1 reconciliation note above for why this is not discovery learning.
- **Progressive elaboration of one recurring visual**, rather than a new diagram each time, reduces the extraneous cognitive load of decoding unfamiliar art (dual-coding theory, Paivio) — `history` reuses and elaborates a single timeline artifact across a whole unit.

## Retrieval-battery design (Axis 2 in practice)

- **Escalating difficulty within a module** — easy recognition-level checks (`bool`, options shown) open a module; harder free-production checks (`gap`, no options) close it. A "desirable difficulty" ramp (Bjork), not incidental ordering.
- **Reversed-framing retest** — the same fact is retested with its polarity flipped ("the time periods get shorter" → "as we go further back, the eras become...") to prevent matching a prior answer's surface wording instead of the underlying concept.
- **Format variety across a battery** — the same fact set is retested via multiple different item types (`sort`, `gap`, `mc`, `vocab`) rather than one repeated shape, for the same reason.
- **Full-distractor explanation and source citation in high-stakes reference content.** `src/courses/aws-review/course.yml`'s `exp` fields explain why *every* option is right or wrong, not just the correct one, and every item carries a `ref` linking authoritative external documentation — the strongest existing implementation of "feedback must close the error-entrenchment gap," appropriate for certification-style content.

## What this document is not

This is not the source of truth for exercise-type mechanics, YAML field syntax, or authoring workflow — that belongs to the forthcoming course-creator's guide. It is also not the place for NCLEX-RN-specific decisions (content sourcing, curriculum phasing) — those remain in `docs/adr/024-nclex-content-sourcing-policy.md`, `docs/adr/025-nclex-curriculum-phasing.md`, and `docs/adr/026-no-course-content-cross-referencing.md`. Where those ADRs make a project-wide-sounding claim, check first whether it's actually scoped to the NCLEX epic — `ADR-024`'s no-copyrighted-adaptation rule, for instance, exists because of an in-session refusal to adapt copyrighted test-prep material, not because it reflects a general SpoonFeeder content-sourcing policy; other existing courses (`aws-review`) predate it and are not in violation of anything.

## References

- Ausubel, D. P. (1960). The use of advance organizers in the learning and retention of meaningful verbal material. *Journal of Educational Psychology*.
- Bjork, R. A. Desirable difficulties (concept across multiple works).
- Bruner, J. S. Concept attainment via positive and negative instances (concept across multiple works).
- Carey, B. (2010). Forget What You Know About Good Study Habits. *The New York Times*.
- Kang, S. H. K., McDermott, K. B., & Roediger, H. L. (2007). Test format and corrective feedback modify the effect of testing on long-term retention. *European Journal of Cognitive Psychology*.
- Kirschner, P. A., Sweller, J., & Clark, R. E. (2006). Why Minimal Guidance During Instruction Does Not Work. *Educational Psychologist*.
- Kornell, N., Hays, M. J., & Bjork, R. A. (2009). Unsuccessful retrieval attempts enhance subsequent learning. *Journal of Experimental Psychology: Learning, Memory, and Cognition*.
- Paas, F., & van Merriënboer, J. J. G. Variability and cognitive load in worked examples (concept across multiple works).
- Paivio, A. Dual-coding theory (concept across multiple works).
- Rawson, K. A., & Dunlosky, J. (2011). Optimizing schedules of retrieval practice for durable and efficient learning. *Journal of Experimental Psychology: General*.
- Rawson, K. A., Dunlosky, J., & Sciartelli, S. M. (2013). The power of successive relearning. *Educational Psychology Review*.
- Renkl, A., & Atkinson, R. K. Worked-example fading (concept across multiple works).
- Roediger, H. L., & Karpicke, J. D. (2006). Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention. *Psychological Science*.
- Rowland, C. A. (2014). The effect of testing versus restudy on retention: A meta-analytic review of the testing effect. *Psychological Bulletin*.
