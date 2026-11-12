---
title: "REVIEW-005: NCLEX-RN Content — Accuracy Review Tracking"
epic: "005-nclex-rn-course-content"
created: "2026-08-10"
status: "Open"
---

## Purpose

Neither the primary author (Claude) nor the project owner (Kevin) has nursing-domain
expertise. This document exists because TSK-005's T-930 ("Human content-accuracy
review sign-off") cannot currently be satisfied internally — there is no qualified
nursing reviewer on this project. Content in `src/courses/nclex-rn/course.yml` was
authored using general knowledge and should be treated as **unverified** until an
item on this list has been checked against a current authoritative source and
resolved.

**How to review:** For each item, verify against a current, authoritative source —
the current NCSBN NCLEX-RN Test Plan / Candidate Bulletin for exam-structure facts,
current CDC guidance for infection-control facts, and a current nursing
pharmacology/medical-surgical reference for clinical facts. Note the module name
(matches `course.yml`'s module `name` field, so it's easy to locate) and either
confirm correct, or note the correction needed and its source. This document is
meant to be handed to reviewers (human or AI) without requiring them to read the
whole course first — each entry should be independently checkable.

**Risk tiers:**
- 🔴 **High** — clinical/safety-relevant; an error here could plausibly mislead
  real clinical practice. Verify before this content is used by anyone.
- 🟡 **Medium** — a specific, checkable clinical or regulatory fact, lower
  immediate safety risk if imprecise, but still a real claim of fact.
- 🟢 **Low** — exam-structure, process, or widely-stable general-knowledge facts.
  Lowest risk, but exam-structure facts in particular can go stale over time.

Known limitation, stated explicitly rather than left implicit: several items below
were deliberately written at a general level (avoiding a specific numeric threshold,
a specific named regulatory standard, or a specific drug) precisely because a
general claim is safer to leave unverified than a specific wrong one. Reviewers
should flag both incorrect claims *and* places where more specificity is expected
by the real exam and should be added once verified.

---

## Introduction to the NCLEX-RN

- 🟢 NCLEX-RN is reported pass/fail only, no numeric score.
- 🟢 Minimum 85 / maximum 150 items under Computer Adaptive Testing.
- 🟢 Maximum 5-hour testing time, inclusive of tutorial and breaks.
- 🟢 A scheduled break is offered after the first two hours of testing, with further optional breaks after that — exact break schedule/timing not verified.
- 🟢 The four Client Needs categories and their listed subcategories match the current official NCSBN test plan structure (verify subcategory groupings specifically — this is foundational since the whole course structure follows it).

**Update (2026-08-13, round 19):** six new modules added (Eligibility and
Registration, Overview of NCLEX Item Types, Test-Taking Strategies, Exam Day
Logistics, Understanding Your Results and Retesting, Managing Test Anxiety),
completing the depth-expansion of the Introduction unit itself:

- 🟡 Registration/licensure process (Board of Nursing application, separate exam registration, Authorization to Test required before scheduling) and the claim that the ATT has a limited, jurisdiction-set validity window — verify precisely; specific windows/processes vary by jurisdiction and this presents a general process only.
- 🟢 Overview of exam item types (extended multiple response, fill-in-the-blank, ordered response, plus NGN formats covered in their own unit) and the "read each item's specific instructions" strategy — low risk, general exam-structure facts.
- 🟢 General test-taking strategies (prioritization frameworks, eliminate-clearly-wrong-first, matching the exact question asked) — general strategy advice, not a specific factual claim, low risk.
- 🟡 Exam-day logistics: ID must match ATT exactly, personal belongings generally prohibited in the testing room, and the claim that "the exam clock generally continues to run during optional breaks taken after the first scheduled break" — verify the break-timing claim specifically, since this is a specific procedural detail that could be stated more precisely or could have changed.
- 🟡 Results reporting: pass/fail only, Candidate Performance Report (CPR) given on failure, and the "commonly cited around 45 days" minimum retake wait — verify the CPR description and flag the 45-day figure explicitly as a commonly-cited approximation, not a claim of a universal fixed number (module text itself notes it varies by jurisdiction).
- 🟢 Test-anxiety management framing (mild anxiety can sharpen focus, goal is preventing escalation not elimination, practical strategies like confirming logistics and retrieval practice) — general psychoeducational framing, low risk.

## Management of Care

**Update (2026-08-11):** six new modules added (ethics, advance directives, legal
concepts, restraints/seclusion, incident reports/sentinel events, scope of
practice) as part of a broad depth-expansion pass covering every remaining unit,
not just the two previously flagged as thin:

- 🟢 The six ethical principles (autonomy, beneficence, nonmaleficence, justice, fidelity, veracity) and their definitions — standard nursing-ethics framework, verify definitions precisely.
- 🟡 "Autonomy generally wins" framing for a competent adult's informed refusal — verify this is not overstated; real practice involves more nuance (e.g., capacity determination, emergency exceptions) than a short module can capture.
- 🟡 Living will / health care proxy / DNR definitions, and specifically that a DNR does not limit non-resuscitative care (pain management, antibiotics, feeding) — verify the DNR scope claim precisely, since conflating DNR with "comfort care only" is a common and consequential misconception.
- 🔴 The four legal elements of malpractice (duty, breach, causation, damages) and the negligence/malpractice distinction — verify precisely; a legal-concept error here could mislead a learner about real accountability.
- 🟡 Good Samaritan law scope (applies outside employment, in good faith, within scope, not for gross negligence) — verify; Good Samaritan statutes vary by state and this presents a general rule only.
- 🟡 Restraint/seclusion principles (least restrictive alternative first, provider order, ongoing reassessment of circulation/skin/ROM/need, periodic order renewal) — overlaps with the existing Safety and Infection Control restraints module; verify no contradiction between the two and that both are individually accurate.
- 🟡 Incident report vs. medical record distinction, and that incident reports are quality-improvement rather than punitive — verify.
- 🔴 Sentinel event definition and root-cause-analysis-not-individual-blame framing — verify; this term has a specific regulatory meaning (e.g., Joint Commission) that should be matched precisely, not paraphrased loosely.
- 🟢 Nurse Practice Act / scope of practice — that scope varies by state and role, and that a nurse is accountable for staying within it regardless of who ordered an out-of-scope action — general, low risk, verify accountability framing is not overstated.

**Update (2026-08-11, round 8):** two more Management of Care modules added (HIPAA, EMTALA):

- 🔴 HIPAA PHI concept, treatment/payment/operations exception, and the "unauthorized internal access alone is a violation, sharing not required" claim — verify precisely; a legal-concept error here (e.g., overstating what requires client authorization) could meaningfully mislead a learner about real compliance obligations.
- 🔴 EMTALA obligations (medical screening exam + stabilization regardless of ability to pay/insurance) — verify precisely; this is a specific federal law with real, checkable requirements.

**Update (2026-08-12, round 17):** three more modules added (staffing/floating/assignment principles, nursing informatics, change-of-shift report):

- 🟡 Floating scope-of-practice principle (decline a specific unsafe task vs. cannot blanket-refuse to float) and acuity-based client-assignment framing — verify; abandonment-risk framing in particular should be checked for accuracy against current professional/legal guidance.
- 🟡 Nursing informatics support-not-replace-judgment framing and BCMA as an added electronic safety layer — standard patient-safety-technology concept, verify framing.
- 🟢 Bedside shift report benefits and focused-not-exhaustive handoff content — standard communication-safety concept, low risk, builds on the existing SBAR module.

**Update (2026-08-13, round 27):** three more modules added (documentation
principles, chain of command, discharge planning/case management):

- 🔴 "Never alter/erase an existing entry; use a clearly labeled, dated/timed late entry instead" documentation rule — verify precisely; this is a foundational legal-charting rule where an error could seriously mislead a learner about acceptable documentation-correction practice.
- 🟡 Chain-of-command escalation sequence (charge nurse → nurse manager → higher administration) and the not-insubordination framing — verify; deliberately general, no facility-specific structure asserted as universal.
- 🟢 Discharge-planning-begins-at-admission framing and teach-back-for-discharge-teaching content — builds on the existing teach-back module from Health Promotion, low risk, standard care-coordination concept.

**Update (2026-08-13, round 36):** three more modules added (guardianship/
surrogate decision-making, client grievance process, telehealth/telenursing):

- 🔴 Substituted-judgment surrogate-decision-making standard (client's own known wishes, not surrogate's personal preference) — verify precisely; this legal/ethical standard is a classic, precisely-tested topic where an error could mislead a learner about whose preferences should actually guide a surrogate's decisions.
- 🟡 Grievance-process-is-client-facing-and-distinct-from-incident-reports framing, and the don't-discourage-a-client-from-filing framing — verify; deliberately general, no specific regulatory grievance-process requirement (e.g., CMS Conditions of Participation) asserted as universal.
- 🟡 Telehealth-does-not-change-scope-of-practice-or-confidentiality-standards claim, and recognize-when-in-person-evaluation-is-needed framing — verify; general professional-practice principle, no specific telehealth regulation or state licensure-compact detail asserted.

**Update (2026-08-14, round 44):** three more modules added (leadership
styles, false imprisonment/assault/battery, delegating to UAP):

- 🟢 Autocratic/democratic/laissez-faire leadership style definitions and situational-adaptation framing — standard, low risk, verify definitions match current nursing-leadership curriculum wording.
- 🔴 Assault-vs-battery distinction (fear-of-contact vs. actual-contact) and restraint-without-proper-justification-can-constitute-false-imprisonment claim — verify precisely; these are specific legal terms of art where a reversed or imprecise definition could meaningfully mislead a learner about the underlying legal concepts.
- 🟡 UAP-delegable-task criteria (routine, standardized, no nursing judgment required) and delegation-does-not-transfer-RN-accountability framing — verify; builds on and should be checked for consistency with the existing Five Rights of Delegation and RN-scope modules.

**Update (2026-08-14, round 51):** three more modules added (PDSA quality
improvement cycle, conflict resolution among the healthcare team,
POLST/MOLST portable medical orders):

- 🟢 Plan-Do-Study-Act cycle steps and small-scale-testing-before-rollout framing — standard, low risk, verify step names/order match current QI curriculum wording.
- 🟡 Direct-and-private conflict-resolution framing and chain-of-command-escalation-is-legitimate-not-inappropriate claim — verify; connects to and should be consistent with the existing chain-of-command module.
- 🔴 POLST/MOLST-as-actionable-provider-signed-order-distinct-from-living-will framing and travels-across-care-settings claim — verify precisely; conflating a POLST/MOLST with a living will, or misstating its actionable/portable nature, could meaningfully mislead a learner about how these documents function differently in real emergency situations.

**Update (2026-08-14, round 58):** three more modules added (root cause
analysis, whistleblower protections, standard of care):

- 🟡 RCA-moves-past-surface-level-cause-to-system-factors and focused-on-system-improvement-not-blame framing — verify; connects to and should be consistent with the existing sentinel-events and just-culture modules.
- 🟡 Whistleblower-protections-guard-against-retaliation-for-good-faith-reports claim — verify against current whistleblower-protection law framing; deliberately general, no specific statute (e.g., a specific federal or state whistleblower act) named.
- 🔴 Standard-of-care-as-reasonably-prudent-nurse-benchmark-not-individual-belief framing and standard-of-care-as-breach-benchmark claim — verify precisely; this is a foundational legal concept underlying the existing negligence/malpractice module, and an imprecise definition could mislead a learner about how malpractice is actually assessed.

**Update (2026-08-14, round 65):** three more modules added (never events,
ethics committee consultation, nurse fatigue/mandatory overtime):

- 🟡 Never-events-as-formally-recognized-category-distinct-from-general-adverse-event claim and mandatory-reporting/RCA-trigger framing — verify against current recognized never-events lists; deliberately general, no specific jurisdiction's exact list asserted as universal.
- 🟡 Ethics-committee-offers-guidance-not-binding-order framing and available-to-support-not-only-last-resort claim — verify; connects to and should be consistent with the existing ethical-principles and advance-directive modules.
- 🟡 Nurse-fatigue-as-recognized-safety-risk-comparable-to-other-impairment framing and communicate-fatigue-rather-than-silently-continue guidance — verify; general workplace-safety concept, deliberately no specific hour-limit or regulatory mandatory-overtime restriction named.

**Update (2026-08-14, round 72):** three more modules added (client
abandonment, interpreter services/language access, mandatory reporting
beyond abuse):

- 🔴 Abandonment-requires-prior-acceptance-of-care-distinct-from-declining-an-assignment claim — verify precisely; this is a specific, precisely-tested legal distinction where a learner conflating "declining before accepting" with "abandonment after accepting" could be seriously misled about their legal exposure in a real scenario.
- 🔴 Untrained-family-member-not-appropriate-interpreter-substitute claim and language-access-as-client-rights-not-convenience framing — verify precisely; this is a genuine patient-safety/legal-rights issue where a learner underestimating the risk of family-member interpretation could compromise real informed consent.
- 🟡 Mandatory-reporting-extends-beyond-abuse-to-communicable-disease and not-subject-to-individual-discretion claims — verify; connects to and should be consistent with the existing abuse-duty-to-report and confidentiality-exceptions content.

**Update (2026-08-16, round 79):** three more modules added (nursing
licensure renewal/continuing education, case management/utilization
review, shared governance/professional practice models):

- 🟡 Expired-license-means-practicing-without-legal-authorization claim and CE-supports-ongoing-competency framing — verify; connects to and should be consistent with the existing Nurse Practice Act module, deliberately no specific renewal cycle length or CE-hour requirement given.
- 🟡 Utilization-review-based-on-documentation-incomplete-documentation-produces-inaccurate-outcome claim — verify; connects to and should be consistent with the existing discharge-planning and documentation-principles modules.
- 🟢 Shared-governance-gives-formal-structured-staff-voice-distinct-from-top-down framing and paper-only-structure-does-not-achieve-purpose claim — standard, low risk, connects to the existing leadership-styles module.

**Update (2026-08-16, round 86):** three more modules added (health
literacy assessment, client-centered care planning, professional
boundaries/social media):

- 🟡 Health-literacy-not-predicted-by-education/occupation/articulateness claim and plain-language-benefits-every-client framing — verify; connects to and should be consistent with the existing teach-back-method module.
- 🟢 Technically-correct-plan-can-still-be-incomplete-without-client-goals and collaborative-not-team-decided-then-presented framing — standard, low risk, connects to the existing nursing-process/ADPIE module.
- 🔴 Removing-name-alone-does-not-guarantee-de-identification claim and professional-boundaries-extend-to-online-interactions framing — verify precisely; social-media confidentiality is a genuinely important, easy-to-underestimate modern risk where a learner assuming name-removal alone is sufficient could commit a real HIPAA violation.

**Update (2026-08-19, round 93):** three more modules added (verbal/
telephone order read-back, incident command system, second victim
syndrome):

- 🟡 Read-back-catches-mishearing-errors claim and reserved-for-genuinely-necessary-situations-not-routine-convenience framing — verify; connects to and should be consistent with the existing documentation-principles module.
- 🟢 ICS-provides-standardized-structure-not-independent-action framing — standard, low risk, connects to the existing emergency-preparedness/triage content.
- 🟡 Second-victim-syndrome-real-phenomenon-even-with-system-failure-cause claim and support-not-blame-consistent-with-just-culture framing — verify this is accurately and sensitively framed; connects to and should be consistent with the existing just-culture module.

**Update (2026-08-19, round 102):** three more modules added (SBAR
structured handoff, advance directive types, nurse practice act violations):

- 🟢 SBAR-components(Situation/Background/Assessment/Recommendation) framing and recommendation-component-is-not-optional claim — standard, low risk, connects to and should be consistent with the existing SBAR-component list already flagged elsewhere in this document and the change-of-shift-report module.
- 🟡 Living-will-vs-durable-power-of-attorney-for-healthcare distinction and living-will-cannot-anticipate-every-scenario claim — verify; connects to and should be consistent with the existing general advance-directives module; note state-specific legal terminology and requirements for these documents can vary.
- 🟡 Board-of-nursing-discipline-distinct-from-employer-discipline claim and license-suspension/revocation-as-possible-consequence framing — verify; connects to and should be consistent with the existing scope-of-practice and licensure-renewal modules.

**Update (2026-08-19, round 111):** three more modules added
(evidence-based practice, nurse-sensitive quality indicators, organ
donation):

- 🟢 Evidence-integrated-with-clinical-expertise-and-client-preferences framing and always-done-this-way-is-not-sufficient-justification claim — standard, low risk, connects to and should be consistent with the existing quality-improvement/PDSA content.
- 🟢 Aggregate-outcome-measures(fall-rate/pressure-injury-rate/CLABSI-rate)-tracked-at-unit-facility-level framing — standard, low risk, connects to and should be consistent with the existing root-cause-analysis and quality-improvement content.
- 🔴 Care-team-separate-from-procurement-team-to-avoid-conflict-of-interest claim and documented-wishes-generally-honored-over-family-objection framing — verify precisely; this is a legally and ethically significant, precisely-tested end-of-life topic connecting to the existing advance-directives and ethics-committee modules.

**Update (2026-08-24, round 120 — milestone):** three more modules added
(chain of custody, sentinel event external reporting, safe staffing
legislation):

- 🔴 Documented-unbroken-handling-record-required-alongside-careful-collection-not-substitute framing — verify precisely; chain-of-custody precision is a high-consequence, precisely-tested forensic-nursing/legal topic connecting to the existing mandatory-reporting content.
- 🟡 External-reporting-obligations-exist-alongside-internal-review/depend-on-event-type-and-jurisdiction claim — verify; connects to and should be consistent with the existing incident-reports-and-sentinel-events module; deliberately no specific jurisdiction or accrediting-body requirement asserted as universal.
- 🟡 Legislative-ratio-requirements-vary-significantly-by-jurisdiction-not-universal claim — verify; connects to and should be consistent with the existing staffing/floating/assignment-principles module; deliberately no specific ratio or jurisdiction named.

**Update (2026-08-24, round 129):** three more modules added (informed
refusal, competency vs. capacity, FMEA):

- 🟡 Same-risk/benefit/alternative-information-required-as-consent claim and document-refusal-not-repeatedly-pressure-client framing — verify; connects to and should be consistent with the existing informed-consent module.
- 🔴 Competency-legal-court-determination-vs-capacity-clinical-provider-determination distinction and capacity-can-fluctuate-requires-reassessment framing — verify precisely; this connects to and should be consistent with the existing informed-consent and guardianship modules, and the legal/clinical distinction is a frequently-confused, precisely-tested topic.
- 🟢 FMEA-proactive-before-error-vs-root-cause-analysis-reactive-after-error distinction — standard, low risk, connects to and should be consistent with the existing root-cause-analysis module.

**Update (2026-08-24, round 138):** three more modules added (systems-level
advocacy, nursing peer review, professional certification):

- 🟢 Advocacy-extends-beyond-individual-to-policy/systems-level-committee-participation claim and systemic-issue-should-be-raised-as-policy-concern-not-only-handled-individually framing — standard, low risk, connects to and should be consistent with the existing client-rights-and-advocacy module.
- 🟢 Peer-review-conducted-by-colleagues-examining-practice-distinct-from-supervisor-performance-evaluation claim and learning-oriented-not-purely-punitive-purpose framing — standard, low risk, connects to and should be consistent with the existing shared-governance module.
- 🟡 Certification-voluntary-distinct-from-mandatory-licensure claim and certification-does-not-eliminate-separate-licensure-maintenance-requirement framing — verify; connects to and should be consistent with the existing nursing-licensure-renewal module.

**Update (2026-08-25, round 147):** three more modules added (voluntary vs.
involuntary psychiatric admission, documentation error correction/late
entry, Nurse Licensure Compact):

- 🔴 Voluntary-client-agrees/retains-discharge-request-right-vs-involuntary-without-agreement-based-on-legal-criteria distinction and jurisdiction-specific-criteria-not-universal framing — verify precisely; this connects to and should be consistent with the existing least-restrictive-environment module, and involuntary-admission legal-criteria precision is a high-consequence, precisely-tested legal topic.
- 🔴 Single-line-through-error-legible-initial-date-not-obliterate/erase claim and late-entry-labeled-with-actual-current-date-not-backdated framing — verify precisely; this connects to and should be consistent with the existing documentation-principles module, and correct error-correction technique is a foundational, precisely-tested documentation-safety topic.
- 🟡 Multistate-license-allows-practice-in-participating-states-without-separate-license claim and not-every-state-participates-non-participating-states-still-require-separate-license framing — verify; connects to and should be consistent with the existing nursing-licensure-renewal module.

**Update (2026-08-26, round 154 — milestone, crossed 5,000 slides):** three
more modules added (DNR orders scope/implementation, impaired nurse
recognition/peer intervention, preceptor role):

- 🔴 DNR-does-not-mean-withholding-all-other-treatment/must-be-written-order-not-verbal-assumption claim — verify precisely; this connects to and should be consistent with the existing advance-directive-types module, and DNR scope/validity precision is a high-consequence, precisely-tested legal/clinical topic.
- 🔴 Report-not-cover-for-colleague-out-of-loyalty claim and alternative-to-discipline-programs-exist-not-automatically-career-ending framing for impaired-nurse recognition — verify this is accurately and sensitively framed; connects to and should be consistent with the existing nurse-fatigue-and-mandatory-overtime module.
- 🟡 Gradually-increasing-independence-not-indefinite-supervision-or-abrupt-transition claim and honest-feedback-not-withheld-to-avoid-discomfort framing for the preceptor role — verify; connects to and should be consistent with the existing shared-governance module.

**Update (2026-08-27, round 163):** three more modules added (research
participation/IRB oversight, defamation/slander and libel, EHR downtime
procedures):

- 🔴 Research-consent-distinct-process-from-treatment-consent/IRB-reviews-before-study-begins claim and right-to-withdraw-without-affecting-standard-care framing for research participation — verify precisely; this connects to and should be consistent with the existing informed-consent-what-it-requires module, and research-participant-rights precision is a high-consequence, precisely-tested legal/ethical topic.
- 🟡 Slander-spoken-vs-libel-written-distinction claim and unverified-accusation-documented-as-fact-could-constitute-libel framing for defamation — verify; connects to and should be consistent with the existing false-imprisonment-assault-and-battery module.
- 🟢 Downtime-procedure-exists-so-care-continues-not-stops claim and paper-documentation-must-be-reconciled-into-EHR-once-restored framing — standard, low risk, connects to and should be consistent with the existing nursing-informatics-general-concepts module.

- 🟡 The three required elements of valid informed consent (competency, voluntariness, being informed of risks/benefits/alternatives).
- 🟡 Explaining a procedure's risks/benefits/alternatives is the provider's responsibility, not the witnessing nurse's — verify this is stated without state-by-state or facility-policy exceptions that should be noted.
- 🟡 The "minimum necessary standard" and the three listed exceptions to confidentiality (public health reporting, credible threat of serious harm, valid court order) — verify this list of exceptions is accurate and complete; there may be additional recognized exceptions not listed here.
- 🟡 The Five Rights of Delegation (task, circumstance, person, direction/communication, supervision) — this is presented as NCSBN's own published framework; verify the exact current wording matches.
- 🟡 What can/cannot be delegated to unlicensed assistive personnel (routine tasks vs. assessment/evaluation/teaching/clinical judgment) — verify against current NCSBN delegation guidance; note real scope-of-practice rules vary by state/jurisdiction and this content presents a general rule only.
- 🟢 ABC (Airway/Breathing/Circulation) and Maslow's Hierarchy as prioritization frameworks.
- 🟢 SBAR components (Situation, Background, Assessment, Recommendation).

## Safety and Infection Control

- 🔴 The three Transmission-Based Precautions categories (Contact, Droplet, Airborne) and their example organisms/conditions (Contact: resistant bacteria; Droplet: influenza; Airborne: tuberculosis) — verify each example against current CDC isolation precaution guidance; example-to-category mapping is exactly the kind of detail that must be precise.
- 🔴 PPE donning order (gown, mask/respirator, goggles/face shield, gloves) and doffing order (gloves, goggles/face shield, gown, mask/respirator) — verify against current CDC PPE sequence guidance.
- 🟡 Restraint rules — least restrictive option first, provider order required, order must be time-limited (not open-ended/PRN), regular reassessment and documentation required — verify against current regulatory standard (e.g., CMS Conditions of Participation / Joint Commission); the specific limits (renewal intervals, required reassessment frequency) were deliberately left unstated and should be added once verified.
- 🟡 Mass casualty triage color system (Red/immediate, Yellow/delayed, Green/minor, Black/expectant) — verify this matches a specific named triage system (e.g., START); the content does not currently name which system it describes and should, once confirmed.
- 🟢 Hand hygiene as the single most effective infection-prevention practice.
- 🟢 Fall-prevention interventions (bed in lowest position, call light within reach, non-slip footwear, bed/chair alarms).

**Update (2026-08-11, round 8):** two more modules added (workplace violence awareness, hazardous materials/chemical safety):

- 🟡 De-escalation principles (calm tone, safe distance, clear exit path, get help rather than manage alone) and the reporting-prevents-normalization framing — verify against current workplace-violence-prevention guidance.
- 🟡 Safety Data Sheet concept and immediate-prolonged-irrigation as the general first response to a chemical eye splash — verify the eye-irrigation response precisely; a delay-vs-immediate error here has real safety consequences.

**Update (2026-08-12, round 15):** three more modules added (latex allergy precautions, radiation safety, decontamination basics):

- 🟡 Latex-free-environment scope (removing products, not just avoiding contact) and food-cross-reactivity risk factors (banana, avocado, kiwi) — verify the specific cross-reactive foods list for accuracy and completeness.
- 🟢 Time/distance/shielding radiation-safety principles and pregnant-staff additional-precaution framing — standard occupational radiation safety, low risk, verify framing doesn't overstate or understate the precaution level.
- 🟡 Decontaminate-before-entering-treatment-area sequencing and contaminant-specific PPE selection — verify; deliberately kept general/conceptual, no specific CBRN agent or decontamination protocol named.

**Update (2026-08-13, round 20):** three more modules added (National Patient
Safety Goals overview, wrong-site surgery prevention/Universal Protocol,
safety culture/just culture and near-miss reporting):

- 🟡 National Patient Safety Goals framing (accrediting-body-published, evidence-based, expected to be implemented) and the two-client-identifiers rule (name + date of birth, never room number) — verify against the current published NPSG list; the specific example goals cited (identification, communication, HAI reduction, wrong-site surgery) should be checked for currency, since this list is revised periodically.
- 🔴 Universal Protocol steps (pre-procedure verification, site marking, time-out) and time-out characteristics (active, full-team, immediately pre-procedure) — verify precisely; wrong-site-surgery-prevention procedure is a classic, precisely-tested NCLEX safety topic where an imprecise description could mislead a learner about what the time-out actually requires.
- 🟡 Just culture framing (distinguishes human error / at-risk behavior / reckless behavior, respond differently to each) and near-miss reporting rationale (reveals system weaknesses before real harm) — verify the three-category distinction against current patient-safety-culture literature; this is a widely-cited framework but the exact category boundaries/examples were deliberately kept general.

**Update (2026-08-13, round 29):** three more modules added (elopement/
wandering precautions, CAUTI prevention, environmental/equipment safety):

- 🟡 Elopement definition and environmental-strategies/reorientation-before-restraints sequencing — verify against current dementia-care and least-restrictive-alternative guidance; complements but should not contradict the existing restraints module.
- 🔴 CAUTI daily-necessity-assessment-as-single-most-important-measure claim and closed-drainage-system/below-bladder-level principle — verify precisely; catheter care is a classic, precisely-tested infection-prevention topic, and the "most important measure" ranking claim in particular should be checked against current CDC/CAUTI-prevention guidance.
- 🟢 General equipment/environmental safety (report malfunctioning equipment, keep walkways clear, keep emergency equipment accessible) — standard, low risk, general safety practice.

**Update (2026-08-13, round 38):** three more modules added (MDRO contact
precautions nuances, healthcare worker immunization/occupational health,
poison prevention/pediatric safety):

- 🔴 C. diff-requires-soap-and-water-not-alcohol-sanitizer-alone claim — verify precisely; this is a classic, precisely-tested, easy-to-get-backward NCLEX infection-control fact (a learner might otherwise assume alcohol sanitizer is always sufficient) where an error could meaningfully mislead practice.
- 🟡 Healthcare-worker-immunization-protects-worker-and-clients framing and prompt-exposure-reporting-narrow-treatment-window claim — verify; deliberately no specific immunization schedule or specific post-exposure treatment window given.
- 🔴 Safe-storage-as-primary-poisoning-prevention claim and inducing-vomiting-not-automatically-safe/contact-poison-control-first guidance — verify precisely; the inducing-vomiting caution is a genuinely important, easy-to-get-wrong safety fact where outdated home-remedy advice could cause real harm if a learner internalized the old assumption instead.

**Update (2026-08-14, round 46):** three more modules added (AIIR/negative
pressure basics, home safety assessment for discharge, seclusion monitoring
requirements):

- 🟡 Negative-pressure-airflow-direction claim (air flows into the room, containing pathogens) and report-suspected-malfunction-rather-than-assume-safety framing — verify the airflow direction precisely, since a reversed direction claim would be a meaningful factual error; deliberately no specific air-changes-per-hour number given.
- 🟢 Home-hazards-can-exist-despite-medical-readiness-for-discharge framing and findings-should-lead-to-concrete-recommendations guidance — standard, low risk, general discharge-planning/safety concept.
- 🟡 Seclusion-requires-same-monitoring-seriousness-as-restraints and discontinue-as-soon-as-not-needed-via-reassessment claims — verify against current regulatory seclusion-monitoring standards (e.g., CMS Conditions of Participation); complements but should not contradict the existing restraints/seclusion module.

**Update (2026-08-14, round 53):** three more modules added (environmental
safety for suicide precautions, alarm fatigue/clinical alarm safety,
firearm safety counseling):

- 🔴 Environmental-modification-follows-directly-from-risk-assessment claim and applies-in-any-care-setting-not-only-psychiatric-units framing — verify precisely; this connects to and should be consistent with the existing suicide risk assessment module in Psychosocial Integrity, and understating that risk applies outside psychiatric units could be a meaningful safety gap.
- 🟡 Alarm-fatigue-as-systemic-not-individual-attentiveness-problem framing and muting-without-addressing-cause-does-not-reduce-risk claim — verify; a modern, increasingly emphasized patient-safety topic, deliberately no specific alarm-management technology or protocol named.
- 🟡 Firearm-storage-unloaded/locked/separate-from-ammunition guidance and approach-as-factual-not-avoided-topic framing — verify this is accurately and appropriately framed as a non-partisan safety-counseling topic; sensitive content where framing matters alongside factual accuracy.

**Update (2026-08-14, round 60 — milestone):** three more modules added
(sterilization vs. disinfection, LASA medications/Tall Man lettering,
active shooter/lockdown procedures):

- 🔴 Sterilization-eliminates-all-microorganisms-including-spores vs. disinfection-does-not-reliably-eliminate-spores distinction — verify precisely; conflating these two terms, or reversing which one addresses spores, is a foundational, high-consequence infection-control error.
- 🟡 Tall-Man-lettering-purpose and multiple-safeguards-used-together-not-single-safeguard-alone framing — verify; standard, well-documented medication-safety-systems concept, deliberately no specific LASA drug pair beyond the illustrative hydrOXYzine/hydrALAZINE example named.
- 🟡 Run-Hide-Fight-as-sequenced-options-not-single-fixed-response framing and client-safety-still-matters-during-lockdown claim — verify against current active-threat response training standards; sensitive content where framing matters alongside factual accuracy, similar to prior emergency-preparedness content.

**Update (2026-08-14, round 67):** three more modules added (regulated
medical waste segregation, infant abduction prevention, safe patient
handling/mechanical lifts):

- 🟡 Segregate-into-labeled-containers-not-general-trash and protects-downstream-waste-handling-personnel claims — verify against current regulated-medical-waste guidance; deliberately general, no specific waste-category numbering scheme named.
- 🔴 Infant-security-measures-distinct-from-general-elopement-precautions claim and verify-identification-before-release-appearance-alone-insufficient guidance — verify precisely; infant abduction prevention is a high-consequence, precisely-followed hospital-security protocol where an imprecise verification standard could mislead a learner.
- 🟡 Mechanical-lift-protects-both-client-and-staff-not-preference-based framing and training/sling-selection/weight-capacity-required-for-safe-use claim — verify; connects to and should be consistent with the existing safe-client-handling/body-mechanics module.

**Update (2026-08-16, round 74):** three more modules added (electrical
safety/grounding, bariatric client safe handling, oxygen cylinder
storage/transport):

- 🟡 Never-bypass-grounding-with-adapter claim and increased-risk-for-clients-with-low-resistance-cardiac-pathway-lines framing — verify precisely; the low-resistance-pathway (microshock) concept is a specific, checkable electrical-safety fact where imprecision could understate real risk for clients with certain invasive lines.
- 🟡 Bariatric-rated-equipment-required-standard-equipment-is-a-real-hazard claim and multi-person/equipment-assisted-transfer-required-not-single-staff framing — verify; connects to and should be consistent with the existing mechanical-lift module.
- 🟡 Secure-upright-projectile-hazard-if-valve-breaks claim and confirm-adequate-supply-before-transport guidance — verify; connects to and should be consistent with the existing oxygen therapy delivery/safety module.

**Update (2026-08-16, round 81):** three more modules added (fire
extinguisher classes, bed rail entrapment risk, autoclave/sterilizer
safety):

- 🟡 Wrong-extinguisher-type-can-be-dangerous-not-just-ineffective claim and know-extinguisher-locations-in-advance framing — verify; deliberately no specific extinguisher class-to-fire-type mapping (e.g., Class A/B/C) named, kept general pending review.
- 🔴 Bed-rails-carry-entrapment-risk-not-automatically-risk-free claim and individualized-not-uniform-assessment framing — verify precisely; bed rail entrapment is a genuine, somewhat counterintuitive safety fact (rails as a protective device that can itself cause harm) where understating the risk could lead to inappropriate uniform rail use.
- 🟡 Autoclave-burn-risk-if-opened-before-pressure-releases claim and overpacking-prevents-effective-sterilization framing — verify; connects to and should be consistent with the existing sterilization-vs-disinfection module.

**Update (2026-08-16, round 88):** three more modules added (emergency
equipment readiness, safe medication storage/security, transport
safety/handoff):

- 🟢 Proactive-not-discovered-during-emergency and routine-scheduled-check-more-reliable-than-memory framing — standard, low risk, connects to the existing tracheostomy-emergency-equipment content.
- 🟡 Unlocked-unattended-cart-real-diversion-risk claim and temperature-sensitive-storage-affects-effectiveness framing — verify; connects to and should be consistent with the existing controlled-substance-handling module.
- 🟢 Equipment/handoff-preparation-required-for-safe-transport and rushed-incomplete-handoff-leaves-receiving-staff-unprepared framing — standard, low risk, connects to the existing SBAR/change-of-shift-report content.

**Update (2026-08-19, round 95):** three more modules added (client
belongings/valuables documentation, workplace ergonomics/repetitive strain
prevention, isolation signage/visitor screening):

- 🟡 Inaccurate-documentation-creates-liability-risk claim and follow-facility-procedure-not-informal-storage framing — verify; general, low-to-moderate-risk facility-practice concept, deliberately no specific documentation form or process named.
- 🟢 Gradual-development-vs-single-lift-injury and proactive-habits-before-symptoms-become-significant framing — standard, low risk, general occupational-health concept.
- 🟢 Signage-communicates-precaution-type/prevents-exposure and visitor-screening-supports-same-protective-purpose-as-staff-precautions framing — standard, low risk, connects to the existing transmission-based-precautions module.

**Update (2026-08-19, round 104):** three more modules added (hand hygiene
five moments, chain of infection, N95 fit testing):

- 🟢 Five-Moments-framework-list(before touching client/before aseptic task/after body fluid exposure/after touching client/after touching surroundings) and protects-both-client-and-worker-not-just-one-party framing — standard, low risk, foundational WHO-published framework; verify exact wording of the five moments matches.
- 🟢 Chain-of-infection-six-links(agent/reservoir/portal of exit/mode of transmission/portal of entry/host) and breaking-any-single-link-can-prevent-transmission framing — standard, low risk, foundational infection-control theory; verify the six links are named correctly and in the standard order.
- 🔴 Fit-test-required-per-mask-model/size-and-invalidated-by-facial-hair-along-seal-line claim — verify precisely; this is a specific, checkable occupational-safety-standard fact where getting the facial-hair-invalidates-fit-test detail wrong could lead to a false sense of protection.

**Update (2026-08-24, round 113):** three more modules added (postoperative
orthostatic-hypotension fall risk, medication reconciliation, bed/chair
alarms):

- 🟡 Orthostatic-hypotension-from-anesthesia/blood-loss/bedrest-elevates-postop-fall-risk claim and sit-before-standing-catches-early-symptoms framing — verify; connects to and should be consistent with the existing general fall-prevention module.
- 🔴 Reconciliation-performed-at-every-transition-not-just-discharge claim — verify precisely; this connects to and should be checked for consistency with the existing National Patient Safety Goals module, and medication reconciliation is a high-consequence, precisely-tested patient-safety-goal topic.
- 🟢 Alarm-alerts-without-restricting-movement/restraint-alternative framing and alarm-alone-does-not-replace-proactive-measures claim — standard, low risk, connects to and should be consistent with the existing fall-prevention and restraints modules.

**Update (2026-08-24, round 122):** three more modules added (universal
fall precautions, do-not-use abbreviations, ongoing suicide risk
reassessment):

- 🟢 Baseline-measures-for-every-client-regardless-of-risk-score-vs-added-risk-based-interventions distinction — standard, low risk, connects to and should be consistent with the existing general fall-prevention module.
- 🔴 U-for-units-misread-as-zero-tenfold-error claim and trailing-zero-after-decimal-avoided-for-same-reason framing — verify precisely; this connects to and should be consistent with the existing LASA-medications/tall-man-lettering module, and do-not-use abbreviations are a foundational, precisely-tested medication-safety topic.
- 🟡 Risk-reassessed-throughout-stay-not-only-at-admission claim and reassess-after-noticing-mood/behavior-change-rather-than-relying-on-admission-assessment framing — verify; connects to and should be consistent with the existing suicide-risk-assessment (Psychosocial Integrity) and environmental-safety-for-suicide-precautions modules.

**Update (2026-08-24, round 131):** three more modules added (two-identifier
client verification, purposeful hourly rounding, safe medication disposal):

- 🔴 Room/bed-number-not-acceptable-identifier-clients-can-be-moved claim and required-every-time-not-only-when-unfamiliar-with-client framing — verify precisely; this connects to and should be consistent with the existing National Patient Safety Goals module, and client-identification precision is a foundational, high-consequence, precisely-tested safety topic.
- 🟡 Four-Ps(pain/position/potty/possessions) framework and proactive-toileting-reduces-unassisted-ambulation-trigger claim — verify; connects to and should be consistent with the existing fall-prevention and universal-fall-precautions modules.
- 🟡 Take-back-program-preferred-over-flushing/trash claim and leftover-opioids-carry-diversion/accidental-ingestion-risk-not-low-priority framing — verify; connects to and should be consistent with the existing regulated-medical-waste module.

**Update (2026-08-24, round 140 — milestone):** three more modules added
(bloodborne pathogen post-exposure protocol, terminal cleaning after
isolation discharge, workplace bullying/lateral violence):

- 🔴 Wash-with-soap-and-water-immediately/prompt-reporting-not-delayed-to-end-of-shift claim and delayed-reporting-reduces-prophylaxis-effectiveness framing — verify precisely; this connects to and should be consistent with the existing sharps-safety-and-bloodborne-pathogen-exposure module, and post-exposure timing precision is a high-consequence, precisely-tested occupational-safety topic.
- 🟡 More-extensive-than-routine-daily-cleaning/pathogens-can-persist-even-if-not-visibly-dirty claim — verify; connects to and should be consistent with the existing sterilization-vs-disinfection module.
- 🟡 Distinct-from-client/visitor-violence-occurs-between-coworkers claim and should-be-reported-not-dismissed-as-normal-culture framing — verify this is accurately and sensitively framed; connects to and should be consistent with the existing workplace-violence-awareness module.

**Update (2026-08-26, round 149):** three more modules added (CLABSI
prevention bundle, surgical site infection prevention, VAP prevention
bundle):

- 🔴 Bundle-elements-used-together-not-substitutable/daily-necessity-review-reduces-catheter-days claims for CLABSI prevention — verify precisely; connects to and should be consistent with the existing sharps-safety and CAUTI-prevention modules, and central-line bundle adherence is a high-consequence, precisely-tested infection-prevention topic.
- 🟡 Prevention-spans-preoperative/intraoperative/postoperative-periods claim and risk-continues-after-discharge/education-supports-early-recognition framing — verify; connects to and should be consistent with the existing sterilization-vs-disinfection and medical-vs-surgical-asepsis modules.
- 🟡 Bundle-elements-used-together-not-substitutable claim and oral-care-reduces-aspirated-bacterial-burden-not-purely-comfort framing for VAP prevention — verify; connects to and should be consistent with the existing chain-of-infection and airborne-isolation modules.

**Update (2026-08-27, round 156):** three more modules added (C. diff
precautions beyond standard hand hygiene, START mass casualty triage tag
colors, home oxygen safety):

- 🔴 Soap-and-water-required-alcohol-rub-not-reliably-sporicidal claim and bleach-based-disinfectant-required-for-terminal-cleaning-not-standard-disinfectant framing for C. diff — verify precisely; this connects to and should be consistent with the existing standard-precautions and hand-hygiene-five-moments modules, and C. diff-specific hand-hygiene/disinfection is a high-consequence, precisely-tested infection-control exception to general practice.
- 🟡 Red/yellow/green/black-color-meaning claim and initial-pass-should-not-linger-on-unsurvivable-client-resources-directed-to-do-most-good framing for START triage — verify; connects to and should be consistent with the existing emergency-preparedness-and-triage module.
- 🟡 Oxygen-supports-combustion-not-minor-concern claim and petroleum-based-products-flammable-not-equally-safe-near-oxygen framing for home oxygen safety — verify; connects to and should be consistent with the existing oxygen-cylinder-safety-storage-and-transport module.

## Safety and Infection Control (continued)

**Update (2026-08-11):** four new modules added (asepsis, sharps safety, fire
safety, body mechanics):

- 🔴 Medical vs. surgical asepsis distinction, and sterile-field rules (1-inch border contaminated, strike-through/wet field contamination, never turn back on a sterile field) — verify each rule precisely; sterile-technique errors are a classic, precisely-tested NCLEX category.
- 🔴 Sharps safety (never recap by hand, engage safety devices, dispose at point of use) and needlestick post-exposure steps (wash, report immediately, prompt evaluation for PEP) — verify the post-exposure sequence and its rationale (PEP time-sensitivity) precisely.
- 🟢 RACE (Rescue, Alarm, Contain, Extinguish/Evacuate) and PASS (Pull, Aim, Squeeze, Sweep) fire-response mnemonics — standard, low risk, verify wording and step order.
- 🟢 Body mechanics principles (bend knees not waist, keep load close, use mechanical lift for fully dependent clients) — standard, low risk.

## Health Promotion and Maintenance

**Update (2026-08-11):** six new modules added (immunizations, Erikson's stages,
postpartum assessment, nutrition across the lifespan, cancer screening):

- 🔴 Live attenuated vs. inactivated vaccine distinction and the pregnancy/immunocompromise precaution for live vaccines specifically — verify precisely; a vaccine-safety error is high-consequence if used to inform real practice.
- 🟢 Herd immunity concept — general public-health concept, low risk.
- 🟡 Erikson's eight psychosocial stages, their names and order — verify stage names/conflict-pairs and ordering precisely; a commonly tested but easy-to-mis-sequence fact.
- 🔴 BUBBLE-HE postpartum assessment mnemonic, boggy-fundus-as-atony-risk framing, and "massage first" as the initial response to a boggy fundus — verify the mnemonic's exact letters/meanings and confirm fundal massage is correctly presented as the first action (vs. other possible first actions like voiding the bladder, which can also cause a boggy fundus and was not mentioned here as an alternative cause).
- 🟡 REEDA perineal-healing assessment mnemonic — verify letters/meanings.
- 🟡 Folic acid/neural-tube-defect-prevention timing claim (most protective before conception) — verify; a commonly tested but consequential prenatal fact.
- 🟡 General nutrition-across-lifespan claims (older-adult calorie/protein/calcium/vitamin D shifts, infant iron introduction around 6 months) — verify; deliberately no specific numeric targets given.
- 🟢 Cancer screening test-to-cancer-type mapping (mammography/breast, colonoscopy/colorectal, Pap/cervical, low-dose CT/lung with smoking history) — deliberately no ages or intervals given, since these change with guideline updates; verify the test-to-cancer-type mapping itself.

**Update (2026-08-12, round 12):** three more modules added (preeclampsia, gestational diabetes, contraception/family planning):

- 🔴 Preeclampsia definition (new-onset HTN + organ involvement after 20 weeks), warning symptoms (headache, visual changes, RUQ/epigastric pain), and eclampsia/hyperreflexia/clonus progression signs — verify precisely; this is high-acuity obstetric content where an error could delay recognition of a genuine emergency.
- 🟡 Gestational diabetes screening/management progression (diet/exercise first, medication if needed) and newborn hypoglycemia risk after birth — verify.
- 🟢 Contraceptive method category overview (hormonal/barrier/IUD/permanent) and condoms' unique STI-protection role — standard, low risk, verify category groupings; deliberately no specific effectiveness percentages given.

**Update (2026-08-13, round 21):** three more modules added (newborn assessment
and care, sexually transmitted infections prevention/screening, healthy aging
and older adult health promotion):

- 🔴 Newborn thermoregulation content (rapid heat loss from surface-area-to-body-mass ratio and limited fat stores, cannot shiver effectively, drying/skin-to-skin/delayed bath as standard measures) and the newborn-vital-signs-faster-than-adult framing — verify precisely; newborn cold-stress risk and vital-sign norms are high-consequence, precisely-tested content, and no specific numeric vital-sign ranges were given deliberately.
- 🟡 STI screening rationale (asymptomatic infections mean risk-based/routine screening matters, not only symptom-triggered testing) and barrier-method-reduces-but-does-not-eliminate-risk framing — verify; deliberately no specific STI named or specific screening interval given.
- 🟡 Older-adult health promotion framing (normal aging vs. pathology distinction, polypharmacy/medication reconciliation risk framing) — verify; deliberately general, no specific medication class or numeric polypharmacy threshold given.

**Update (2026-08-13, round 30):** three more modules added (stages of labor,
breastfeeding/infant feeding, obesity/weight management):

- 🔴 Three-stage labor framework (first/second/third stage boundaries) and the true-labor-vs-false-labor cervical-change distinction — verify precisely; labor staging and true/false labor differentiation are classic, precisely-tested obstetric NCLEX topics where an imprecise boundary description could mislead a learner.
- 🟡 Breastfeeding latch quality (areola vs. nipple-only) and early-feeding-cues-more-reliable-than-crying framing — verify; standard lactation-support concepts, deliberately no specific frequency/duration numbers given.
- 🟢 Obesity/chronic-disease-risk association and non-stigmatizing-teaching-approach framing — general, low risk, verify the chronic-condition list is accurate and the teaching-approach framing reads appropriately sensitive.

**Update (2026-08-13, round 39):** three more modules added (safe sleep
practices/SIDS risk reduction, fetal heart rate monitoring, newborn
screening/metabolic testing):

- 🔴 Back-to-sleep-every-sleep-not-only-nighttime claim and no-soft-bedding/bumpers/pillows-in-sleep-area guidance — verify precisely; safe sleep/SIDS-prevention guidance is a high-consequence, frequently-tested, and periodically-updated topic where precision matters directly for infant safety.
- 🔴 Reassuring-pattern (acceleration, not dropping, with movement) vs. concerning-pattern (heart rate drops after contraction) framing, and repositioning-as-first-line-not-last-resort response — verify precisely; fetal heart rate pattern interpretation is a classic, precisely-tested obstetric safety topic where a reversed reassuring/concerning framing could seriously mislead a learner.
- 🟡 Newborn-screening-detects-conditions-before-symptoms-appear and healthy-appearing-newborn-should-still-be-screened claims — verify; deliberately no specific condition (e.g., PKU) or specific screening panel composition named.

**Update (2026-08-14, round 47):** three more modules added (Piaget's stages,
postpartum depression screening, tobacco cessation support):

- 🟡 Piaget's four cognitive stages (sensorimotor/preoperational/concrete operational/formal operational) and the cognitive-vs-Erikson's-psychosocial distinction — verify stage names/characteristics/ordering precisely against current developmental-psychology curriculum; a commonly tested but easy-to-mis-sequence framework, similar to the existing Erikson's-stages caution.
- 🔴 PPD-distinguished-from-baby-blues-by-persistence/severity/non-self-limited-course claim, and routine-screening-matters-because-disclosure-is-difficult framing — verify precisely; conflating PPD with typical baby blues, or understating PPD's seriousness, is a clinically and emotionally significant error.
- 🟢 Combined-behavioral-plus-pharmacologic-approach and relapse-as-learning-opportunity-not-failure framing — standard, low risk, general cessation-support concept; verify framing is appropriately non-judgmental.

**Update (2026-08-14, round 54):** three more modules added (CAGE alcohol
screening, sun safety/skin cancer prevention, adolescent health screening):

- 🟡 CAGE questionnaire four-question content (Cutting down, Annoyance, Guilt, Eye-opener) and screening-not-diagnostic framing — verify the exact wording/meaning of each letter against the current published CAGE tool; a well-known but precisely-worded mnemonic where an error would be easily checkable and embarrassing if wrong.
- 🟢 Cumulative-exposure framing for sun safety and self-exam-complements-not-replaces-professional-screening claim — standard, low risk, general health-promotion concept.
- 🟡 Private-adolescent-screening-conversations-support-honest-disclosure framing and nonjudgmental-approach-supports-honesty claim — verify this is framed appropriately, respecting both adolescent autonomy and any relevant parental-involvement considerations; deliberately general, no specific legal consent-age threshold asserted.

**Update (2026-08-14, round 61):** three more modules added (preconception
counseling, pediatric vision/hearing screening, exercise recommendations
across the lifespan):

- 🟡 Preconception-folic-acid-most-protective-before-conception claim and address-chronic-conditions/immunizations-before-pregnancy framing — verify; builds on and should be consistent with the existing antepartum/folic-acid-timing content, deliberately no specific numeric dosing given.
- 🟢 Routine-not-only-concern-triggered pediatric vision/hearing screening framing and children-cannot-reliably-self-report-gradual-changes claim — standard, low risk, general health-promotion concept.
- 🟢 Balance/strength-activities-support-fall-reduction-beyond-aerobic-alone framing and individualize-by-health-status guidance — standard, low risk, connects to existing fall-prevention content without asserting a specific exercise prescription.

**Update (2026-08-14, round 68):** three more modules added (menopause,
prenatal genetic screening, oral health across the lifespan):

- 🟡 Declining-estrogen-increases-bone-loss-risk claim and ongoing-relevance-not-just-a-symptom-period-to-get-through framing — verify; connects to and should be consistent with the existing osteoporosis/calcium-supplementation content, deliberately no specific hormone-therapy detail given.
- 🔴 Screening-estimates-risk-vs-diagnostic-confirms and elevated-result-leads-to-offer-not-automatic-diagnosis claims, plus nondirective-counseling framing — verify precisely; conflating screening with diagnosis, or framing counseling as directive, are both meaningful errors in this sensitive content area.
- 🟢 Oral-health-connected-to-overall-health and routine-not-only-pain-triggered-screening framing — standard, low risk, general health-promotion concept.

**Update (2026-08-16, round 75):** three more modules added (concussion
recognition/return-to-play, immunization contraindications/precautions,
anticipatory guidance for well-child visits):

- 🔴 No-loss-of-consciousness-required-for-significant-concussion claim and no-same-day-return/clearance-required framing — verify precisely; concussion return-to-play guidance is a high-consequence, precisely-tested safety topic, and understating the injury-without-LOC point could lead a learner to miss a genuine concussion.
- 🟡 Contraindication-vs-precaution distinction (inappropriate vs. defer-until-improved) and mild-illness-not-a-reason-to-delay claims — verify precisely against current immunization guidance; conflating these two terms is a common, checkable error.
- 🟢 Anticipatory-guidance-is-proactive-delivered-before-not-after-milestone framing — standard, low risk, general pediatric health-promotion concept.

**Update (2026-08-16, round 82):** three more modules added (lead exposure
awareness, newborn circumcision care, nutrition label literacy/dietary
guidelines):

- 🟡 Lead-exposure-can-be-asymptomatic-in-early-stages claim and home-age/condition-as-relevant-risk-factor-question framing — verify precisely; asymptomatic early lead toxicity is a genuinely important, checkable public-health fact where a learner assuming symptoms would appear could delay appropriate screening.
- 🔴 Yellowish-exudate-expected-vs-active-bleeding/spreading-infection/no-urination-warrants-reporting distinction — verify precisely; conflating expected healing findings with reportable complications is a common, checkable newborn-care error.
- 🟢 Serving-size-checked-first and individualize-to-client-condition framing — standard, low risk, general health-literacy concept.

**Update (2026-08-16, round 89):** three more modules added (postpartum
hemorrhage warning signs, pregnancy loss support, fertility
awareness-based family planning):

- 🔴 Boggy-fundus-not-firming-with-massage/rapid-pad-saturation-warning-signs claim and escalate-to-provider-if-massage-does-not-resolve guidance — verify precisely; postpartum hemorrhage is a high-consequence, precisely-tested obstetric emergency, and this connects directly to the existing postpartum-assessment/fundal-massage content.
- 🟡 Minimizing-language-not-supportive-even-well-intentioned framing and acknowledge-loss/offer-resources guidance — verify this is accurately and sensitively framed; emotionally sensitive content where framing matters as much as factual accuracy, similar to prior grief-related modules.
- 🟢 Fertility-awareness-requires-consistent-tracking-less-effective-if-inconsistent and no-STI-protection framing — standard, low risk, connects to the existing contraceptive-method-categories module.

**Update (2026-08-19, round 96):** three more modules added (men's health
screening, breastfeeding contraindications, introducing solid foods):

- 🟢 Testicular-self-exam/prostate-discussion-part-of-mens-health-promotion and proactive-not-only-client-initiated framing — standard, low risk, general health-promotion concept, deliberately no specific screening age/interval given.
- 🟡 Breastfeeding-contraindications-are-specific-not-universal claim and individualized-assessment-not-blanket-assumption framing — verify precisely; connects to and should be consistent with the existing breastfeeding module, deliberately no specific infection or medication named.
- 🟢 One-at-a-time-with-spacing-identifies-reaction-source and readiness-signs-alongside-general-timing framing — standard, low risk, connects to the existing growth/development-milestones module, deliberately no specific age given.

**Update (2026-08-19, round 105):** three more modules added (Rh
sensitization/RhoGAM, newborn jaundice, failure to thrive):

- 🔴 Rh-sensitization-mechanism(fetal-blood-crosses-into-maternal-circulation) claim and RhoGAM-prevents-does-not-reverse-sensitization framing — verify precisely; this is a high-consequence, precisely-tested obstetric-safety topic connecting to the existing antepartum-care content.
- 🔴 First-24-hours-timing-distinguishes-pathologic-from-physiologic-jaundice claim — verify precisely; this timing threshold is a specific, checkable, classic newborn-assessment fact where getting the timing backward could delay urgent evaluation.
- 🟡 Growth-chart-trend-over-multiple-visits-not-single-measurement claim — verify; connects to and should be consistent with the existing growth-and-development-milestones module.

**Correction note (2026-08-19, round 105):** while authoring this round, I
found that round 104's new "Chain of Infection — Breaking the Cycle" module
(Safety and Infection Control) substantially duplicates the chain-of-infection
framework (reservoir/exit/transmission/entry/susceptible host) already taught
in the pre-existing "Communicable Disease and Isolation Basics" module (round
4, Health Promotion and Maintenance) — round 104's DEC-005 entry incorrectly
described this topic as "entirely absent" from the course. Both modules remain
in place (different unit context and question wording provide some
reinforcement value, consistent with this course's general pattern of
revisiting concepts across units), but reviewers should treat round 104's
chain-of-infection claims as a duplicate of already-reviewed content rather
than a new claim requiring independent verification.

**Update (2026-08-24, round 114):** three more modules added (IPV screening
during pregnancy, car seat safety, postpartum blues vs. postpartum
depression):

- 🔴 Pregnancy-as-increased-risk-period-for-IPV-onset/escalation claim and screen-privately-partner-out-of-room framing — verify precisely; this connects directly to the existing general intimate-partner-violence module in Psychosocial Integrity, and IPV screening protocol precision is a high-consequence, sensitively-framed safety topic.
- 🟡 Car-seat-progression-determined-by-size-guidance-not-age-alone claim and premature-stage-transition-reduces-protection framing — verify; standard, well-established injury-prevention concept, deliberately no specific height/weight numeric thresholds given.
- 🟡 Two-week-resolution-distinguishes-blues-from-depression claim and persistent/worsening-symptoms-warrant-evaluation-not-dismissal framing — verify this is accurately and sensitively framed; connects to and should be consistent with the existing postpartum-depression-screening module.

**Update (2026-08-24, round 123):** three more modules added (folic acid/
neural tube defect prevention, kangaroo care, scoliosis screening):

- 🔴 Neural-tube-closes-within-first-few-weeks-often-before-pregnancy-confirmed claim and folic-acid-recommended-before-conception-not-only-after-confirmation framing — verify precisely; this connects to and should be consistent with the existing preconception-counseling module, and folic acid timing precision is a high-consequence, precisely-tested prenatal-health topic.
- 🟡 Skin-to-skin-improves-temperature-regulation/vital-sign-stability/bonding claim and appropriate-for-clinically-stable-preterm-not-only-term-infants framing — verify; connects to and should be consistent with the existing newborn-assessment-and-care module.
- 🟡 Bend-forward-screening-technique-checks-for-back-asymmetry claim and identified-finding-warrants-referral-not-dismissal framing — verify; connects to and should be consistent with the existing adolescent-health module.

**Update (2026-08-24, round 132):** three more modules added (universal
newborn hearing screening, postpartum contraception timing, vaping/
e-cigarette health risks):

- 🟡 Separate-program-from-metabolic-testing/before-discharge claim and prompt-referral-not-vague-recheck-later-without-scheduled-plan framing — verify; connects to and should be consistent with the existing newborn-screening-and-metabolic-testing module.
- 🔴 Fertility-can-return-before-first-postpartum-period claim and contraceptive-method-can-affect-milk-supply-for-breastfeeding-client framing — verify precisely; this connects to and should be consistent with the existing general contraception-and-family-planning module, and postpartum-fertility timing precision is a high-consequence, precisely-tested topic (a learner assuming fertility waits for the first period could give a client inaccurate guidance).
- 🟡 Vaping-not-risk-free-despite-differing-from-combustion-smoke claim and screening-should-specifically-ask-about-vaping-not-only-traditional-cigarettes framing — verify; connects to and should be consistent with the existing tobacco-use-and-cessation-support module.

**Update (2026-08-24, round 141):** three more modules added (prediabetes
screening/lifestyle modification, preconception genetic carrier screening,
skin self-exam ABCDE rule):

- 🟡 Prediabetes-higher-than-normal-not-yet-diabetic-range claim and lifestyle-modification-window-matters-before-progression-not-only-after framing — verify; connects to and should be consistent with the existing health-screening-across-the-lifespan module.
- 🟡 Preconception-screening-before-pregnancy-distinct-from-prenatal-screening-during-pregnancy claim and earlier-timing-offers-planning-flexibility framing — verify; connects to and should be consistent with the existing prenatal-genetic-screening module.
- 🔴 ABCDE-framework(asymmetry/border/color/diameter/evolving) claim and evolving-alone-warrants-evaluation-even-without-other-criteria framing — verify precisely; this connects to and should be consistent with the existing sun-safety-and-skin-cancer-prevention module, and the ABCDE rule is a foundational, precisely-tested skin-cancer-screening framework.

**Update (2026-08-26, round 150 — milestone):** three more modules added
(osteoporosis screening/bone health promotion, travel health counseling,
pre-participation sports physical):

- 🟡 Screening-and-modifiable-risk-factor-counseling-work-together claim and progresses-without-symptoms-until-fracture/proactive-counseling-not-symptom-triggered framing for osteoporosis — verify; connects to and should be consistent with the existing healthy-aging and exercise-recommendations modules.
- 🟢 Counseling-tailored-to-destination-not-standardized claim and seek-counseling-well-before-departure-for-multi-dose-immunization-effectiveness framing for travel health — standard, low risk, connects to and should be consistent with the existing immunizations/herd-immunity module.
- 🔴 Cardiovascular-screening-included-to-identify-exertion-risk claim and family-history-of-sudden-cardiac-death-warrants-further-evaluation-not-routine framing for pre-participation sports physicals — verify precisely; this connects to and should be consistent with the existing growth-and-development-milestones and concussion-recognition modules, and missed cardiovascular red flags in youth sports clearance are a high-consequence, precisely-tested topic.

**Update (2026-08-27, round 157):** three more modules added (autism
spectrum screening, bicycle/recreational helmet safety, puberty/pubertal
development anticipatory guidance):

- 🟡 Screening-tool-identifies-need-for-further-evaluation-not-diagnosis-itself claim and early-sign-should-prompt-further-screening-not-dismissed-as-outgrowable framing for autism spectrum screening — verify this is accurately and sensitively framed; connects to and should be consistent with the existing growth-and-development-milestones module.
- 🟡 Level-low-on-forehead-fit-vs-too-far-back-exposing-forehead claim and replace-after-significant-impact-even-without-visible-damage framing for helmet safety — verify; connects to and should be consistent with the existing car-seat-safety module.
- 🟢 Guidance-offered-before-changes-begin-not-delayed-until-concern-reported claim and wide-typical-age-range-not-automatically-concerning framing for puberty anticipatory guidance — standard, low risk, connects to and should be consistent with the existing growth-and-development-milestones module.

**Update (2026-08-11, round 4):** two more modules added (growth/development milestones, communicable disease/isolation basics):

- 🟡 General early-childhood milestone ages (sitting ~6mo, walking/single words ~12mo, two-word combinations ~24mo) — verify these approximate ages against a current developmental reference; deliberately kept as broad approximations, not precise per-month norms.
- 🟢 Object permanence and separation anxiety as normal developmental concepts — standard developmental psychology, low risk.
- 🟢 Chain of infection framework (reservoir/exit/transmission/entry/susceptible host) and contact tracing's purpose — standard public health concepts, low risk.

- 🟡 Primary/Secondary/Tertiary prevention definitions and the specific examples used for each (vaccination = primary; screening test = secondary; cardiac rehab = tertiary) — verify each example is correctly categorized.
- 🔴 Physical assessment order (Inspection, Palpation, Percussion, Auscultation) and the abdominal exception (Inspection, Auscultation, Percussion, Palpation) — verify precisely; this is a commonly tested but precisely-worded fact.
- 🔴 The APGAR score — five components (Appearance, Pulse, Grimace, Activity, Respiration), each scored 0–2, assessed at 1 and 5 minutes after birth — verify component names/scoring/timing precisely.
- 🟡 Antepartum "report immediately" symptom list (vaginal bleeding, severe headache, sudden decrease in fetal movement) — verify this list is accurate and reasonably complete; deliberately kept short and general, avoiding specific numeric thresholds (e.g., exact weight-gain ranges, specific fetal movement counts) that were not included and may need to be added once verified.
- 🟢 Modifiable vs. non-modifiable risk factor examples (smoking/diet/activity vs. family history/age).
- 🟢 The teach-back method as a more reliable understanding-check than asking "Do you understand?"

## Psychosocial Integrity

- 🟡 Classification of specific communication examples as therapeutic (open-ended questions, reflecting, restating, silence) vs. non-therapeutic (false reassurance, giving advice, "why" questions, changing the subject) — verify each labeled example, including the specific scripted client/nurse exchanges used in exercises.
- 🟡 The five-stage grief model (denial, anger, bargaining, depression, acceptance) — presented as "one widely used model"; verify this framing is appropriately hedged and the stage order/definitions are accurate.
- 🟢 Crisis intervention goal (restore prior level of functioning, short-term, here-and-now focus, not long-term psychotherapy).
- 🟢 Adaptive vs. maladaptive coping mechanism examples.
- 🔴 Mandated reporter duty — that a nurse must report suspected abuse even if the client asks them not to — verify this is accurately stated without jurisdiction-specific caveats that should be noted; mandated-reporting specifics (who must report, to whom, under what triggering conditions) can vary by state/jurisdiction and this content presents a general rule only.
- 🟢 Abuse-disclosure documentation guidance (quote the client's own words, describe observations objectively).
- 🟢 Cultural competence guidance (ask the individual client rather than assume based on background).

## Psychosocial Integrity (continued)

**Update (2026-08-11):** five new modules added (anxiety levels, defense
mechanisms, suicide risk assessment, substance use/withdrawal, mood/psychotic
disorders overview):

- 🟡 Four anxiety levels (mild/moderate/severe/panic) and their effect on perception/learning — verify the level definitions and the "teaching works best at mild-to-moderate" framing.
- 🟡 Defense mechanism definitions and worked examples (displacement, regression, denial, sublimation, projection, rationalization) — verify each labeled example is correctly matched to its mechanism; this is a classic area for subtly-wrong example-to-term mapping.
- 🔴 Suicide risk assessment content — that asking directly does not increase risk, that plan/means/timeline indicate higher risk, and that sudden calm after severe depression can be a warning sign rather than reassuring — verify all three claims precisely; this is among the highest-stakes content in the entire course given real-world consequences of getting it wrong.
- 🔴 Alcohol/benzodiazepine withdrawal as potentially life-threatening (seizures, delirium tremens) vs. opioid withdrawal as uncomfortable-but-rarely-life-threatening — verify this comparison precisely; a reversed claim here could be dangerous if it informed real triage judgment.
- 🟡 Major depressive disorder / bipolar / schizophrenia conceptual overview (symptom categories only, no diagnostic criteria specifics) and acute-mania priority framing (safety/nutrition/hydration/rest over confronting grandiosity) — verify the acute-mania priority framing especially.

**Update (2026-08-11, round 3):** three more modules added (PTSD, eating disorders, personality disorder clusters):

- 🟡 PTSD symptom categories (re-experiencing, avoidance, negative mood/cognition changes, hyperarousal), the >1 month duration criterion, and flashback response (calm orienting, not dismissal) — verify each category and the duration criterion precisely.
- 🔴 Anorexia vs. bulimia distinction, specifically that bulimia often occurs at normal/near-normal weight (so weight cannot rule it out), and refeeding syndrome as a life-threatening risk of reintroducing nutrition too quickly after starvation — verify the refeeding syndrome claim precisely; this is a genuinely dangerous, easy-to-underestimate clinical risk.
- 🟡 Three personality disorder clusters (A/B/C) and their example disorders, plus the consistent-team-wide-boundaries approach for borderline personality disorder — verify cluster groupings and example-disorder assignments precisely, since misassigning a disorder to the wrong cluster is a specific, checkable error.

**Update (2026-08-12, round 13):** three more modules added (ADHD/autism spectrum, crisis theory phases, complicated grief):

- 🟡 ADHD teaching strategies (clear/concise/one-step instructions, low-distraction setting) and autism spectrum considerations (sensory sensitivity, routine preference, communication variation, individualized-care framing) — verify; deliberately framed around individual variation rather than universal rules, should be checked that this framing itself reads appropriately and is not inadvertently reductive.
- 🟡 Crisis theory phases (anxiety rise → trial-and-error coping → resolution or disequilibrium) and the time-limited-nature-of-crisis claim — verify; builds on the existing crisis intervention module from the original content.
- 🟡 Complicated/prolonged grief distinction from typical grief (degree/persistence of impairment, not presence of sadness) — verify this distinction is accurately and sensitively framed.

**Update (2026-08-13, round 24):** three more modules added (mania/bipolar
disorder recognition, intimate partner violence assessment/safety planning,
de-escalation techniques):

- 🔴 Manic episode symptom framing (elevated/irritable mood, decreased need for sleep, impulsivity, grandiosity), impaired-judgment-as-safety-risk framing, and decreased-insight/self-report-not-sufficient claim — verify precisely; mania recognition and the insight/self-report limitation are clinically significant, precisely-tested content where an error could affect how a learner weighs client self-report during a real safety assessment.
- 🔴 IPV screening-privately-without-partner-present principle and the nurse's-role-is-to-support-not-pressure safety-planning framing — verify precisely; this is sensitive, safety-critical content and both the screening-privacy rationale and the non-directive safety-planning stance should be checked against current IPV-response best practice.
- 🟡 De-escalation sequencing (verbal/environmental first, physical intervention last resort) and the "calm down" language flagged as potentially escalating — verify against current de-escalation/crisis-communication guidance; framing is deliberately general with no specific named de-escalation model (e.g., no specific proprietary program referenced).

**Update (2026-08-13, round 33):** three more modules added (therapeutic
relationship boundaries/phases, hallucinations/delusions nursing
interventions, alcohol withdrawal/delirium tremens):

- 🟡 Therapeutic relationship phases (orientation/working/termination) and boundary-crossing/consult-a-colleague framing — verify the phase model against current psychiatric-nursing curriculum standards; the boundary-crossing framing is deliberately general with no specific scenario asserted as a universal rule.
- 🔴 Don't-argue-with-delusions/focus-on-feelings intervention framing, and command-hallucination direct-safety-assessment-required claim — verify precisely; the command-hallucination assessment guidance is safety-critical, since a learner who avoids asking directly out of concern about "giving ideas" could miss a genuine risk.
- 🔴 Delirium tremens as a life-threatening emergency (not intensified ordinary withdrawal) and the no-safe-abrupt-cessation-without-monitoring claim — verify precisely; DTs recognition is a classic, high-consequence NCLEX safety topic where understating severity could mislead a learner about urgency.

**Update (2026-08-14, round 41):** three more modules added (milieu therapy,
somatic symptom disorders, grief in children):

- 🟢 Milieu-therapy-as-treatment-itself framing and staff-consistency-supports-milieu claim — standard psychiatric-nursing concept, low risk, verify framing.
- 🟡 Somatic-symptoms-are-genuinely-experienced-not-fabricated framing and the avoid-dismissing-vs-avoid-reinforcing balanced-approach guidance — verify this is accurately and sensitively framed; a learner who conflates somatic symptom disorder with "faking" would hold a clinically and ethically significant misconception.
- 🟡 Children's-developmental-understanding-of-death-varies-by-stage claim and grief-expressed-through-behavior/play-not-only-verbally framing — verify; deliberately general, no specific age-stage boundaries or specific behavioral indicators asserted as universal.

**Update (2026-08-19, round 99):** three more modules added (obsessive-
compulsive disorder, least restrictive environment/restraint use,
anticipatory grief):

- 🟡 Ego-dystonic-recognition-distinguishes-OCD-from-delusion claim and interrupting-a-compulsion-mid-ritual-increases-distress framing — verify; connects to and should be consistent with the existing levels-of-anxiety and major-mood-and-psychotic-disorders modules.
- 🔴 Restraints-and-seclusion-as-last-resort-only-after-less-restrictive-attempts and time-limited-order-with-frequent-reassessment-required claim — verify precisely; this connects directly to the existing seclusion-monitoring module, and restraint/seclusion legal requirements are a high-consequence, precisely-tested patient-rights topic.
- 🟢 Anticipatory-grief-as-normal-response-before-an-actual-loss and not-a-sign-of-having-given-up claim — standard, low risk, connects to and should be consistent with the existing stages-of-grief and end-of-life-comfort-care content.

**Update (2026-08-19, round 108):** three more modules added (borderline
personality disorder/splitting, schizophrenia positive/negative symptoms,
codependency/enabling in substance use disorder):

- 🟡 Splitting-idealize-vs-devalue-defense-mechanism claim and unified-consistent-staff-communication-prevents-splitting-from-undermining-care framing — verify; connects to and should be consistent with the existing personality-disorder-clusters module.
- 🟡 Positive-vs-negative-symptom-framework(addition-to-experience-vs-reduction-of-function) claim and negative-symptoms-still-warrant-engagement-not-overlooked framing — verify; connects to and should be consistent with the existing hallucinations/delusions-interventions module.
- 🟡 Enabling-removes-natural-motivation-to-change-even-when-well-intentioned claim and codependency/family-support-as-part-of-holistic-treatment framing — verify this is accurately and sensitively framed; connects to and should be consistent with the existing substance-use-disorder-and-withdrawal module.

**Update (2026-08-24, round 117):** three more modules added
(trauma-informed care, motivational interviewing, group therapy therapeutic
factors):

- 🟡 Avoid-assumptions-about-trauma-history-while-still-avoiding-re-traumatization framing and offer-choice/control-explain-before-touching principle — verify this is accurately and sensitively framed; connects to and should be consistent with the existing PTSD and crisis-intervention modules.
- 🟡 Client-voices-own-reasons-for-change-rather-than-being-told framing and confrontation-increases-resistance-nonjudgmental-exploration-preferred claim — verify; connects to and should be consistent with the existing therapeutic-communication-techniques module.
- 🟢 Universality/instillation-of-hope-as-group-specific-therapeutic-factors and value-comes-from-member-interaction-not-only-facilitator-guidance framing — standard, low risk, connects to and should be consistent with the existing milieu-therapy module.

**Update (2026-08-24, round 126):** three more modules added (somatic
symptom disorder vs. factitious disorder vs. malingering, body image
disturbance, adjustment disorder):

- 🟡 Motivation/awareness-distinguishes-genuine-unconscious(somatic)-vs-conscious-internal-need(factitious)-vs-conscious-external-gain(malingering) claim — verify this is accurately and sensitively framed; connects to and should be consistent with the existing somatic-symptom-disorders module.
- 🟡 Body-image-disturbance-not-limited-to-eating-disorders(amputation/burn/mastectomy) claim and address-alongside-not-lower-priority-than-physical-recovery framing — verify this is accurately and sensitively framed; connects to and should be consistent with the existing eating-disorders module.
- 🟡 Stressor-tied-symptoms-out-of-proportion/generally-resolve-within-defined-period-after-stressor-ends claim and distinct-from-PTSD-different-pattern-and-trigger-type framing — verify; connects to and should be consistent with the existing coping-mechanisms, crisis-intervention, and PTSD modules.

**Update (2026-08-24, round 135):** three more modules added (specific
phobia vs. GAD, postpartum psychosis, therapeutic use of self):

- 🟡 Trigger-specific-fear(phobia)-vs-trigger-independent-persistent-worry(GAD)-across-multiple-life-areas distinction — verify; connects to and should be consistent with the existing levels-of-anxiety module.
- 🔴 Rare-but-high-acuity-emergency-distinct-from-blues-and-depression/delusions-hallucinations-risk-to-infant claim and urgent-psychiatric-evaluation-not-managed-like-blues framing — verify precisely and sensitively; this connects directly to the existing postpartum-blues-vs-postpartum-depression module (Health Promotion), and postpartum psychosis is a high-consequence, precisely-tested obstetric-psychiatric emergency.
- 🟡 Self-awareness-of-own-reactions/biases/triggers-part-of-therapeutic-relationship claim and unexamined-personal-reactions-can-unintentionally-affect-care framing — verify; connects to and should be consistent with the existing therapeutic-communication-techniques module.

**Update (2026-08-25, round 144):** three more modules added (panic
disorder, dual diagnosis, elder abuse):

- 🟡 Recurrent-attacks-plus-persistent-worry-not-single-isolated-episode distinction and avoidance-behavior-is-part-of-clinical-picture-not-unrelated framing — verify; connects to and should be consistent with the existing levels-of-anxiety and specific-phobia-vs-GAD (round 135) modules.
- 🟡 Both-conditions-co-occurring/integrated-approach-not-one-must-resolve-before-other claim — verify; connects to and should be consistent with the existing substance-use-disorder-and-withdrawal module.
- 🟡 Caregiver-burden-as-risk-factor/forms-include-financial-exploitation-without-physical-sign claim and absence-of-physical-injury-does-not-rule-out-abuse framing — verify this is accurately and sensitively framed; connects to and should be consistent with the existing recognizing-abuse module.

**Update (2026-08-27, round 158):** three more modules added (dissociative
disorders, gambling/behavioral addictions, compassion fatigue/burnout in
nursing practice):

- 🟡 Genuine-psychological-response-not-intentional-fabrication claim and calm-grounding-response-not-confrontational-demand framing for dissociative disorders — verify this is accurately and sensitively framed; connects to and should be consistent with the existing PTSD module.
- 🟡 Shares-features-with-substance-use-disorder-without-involving-a-substance claim and screen-for-behavioral-addiction-rather-than-assuming-unrelated-cause framing for gambling/behavioral addictions — verify; connects to and should be consistent with the existing substance-use-disorder-and-withdrawal module.
- 🟢 Recognized-occupational-risk-not-personal-weakness claim and recognize-early-signs-seek-support-not-push-through framing for compassion fatigue/burnout — standard, low risk, connects to and should be consistent with the existing therapeutic-use-of-self module and the Second Victim Syndrome module (Management of Care).

## Basic Care and Comfort

**Update (2026-08-11):** three new modules added (enteral nutrition, urinary
catheters/ostomies, heat and cold therapy):

- 🔴 Tube-feeding aspiration-precaution claims (HOB elevated ≥30 degrees during/after feeding, checking gastric residual volume before feeding) — verify precisely, including whether "30 degrees" is the correct commonly-cited threshold or whether current guidance differs.
- 🟡 Urinary catheter drainage bag positioning (below bladder level to prevent backflow/infection) — verify.
- 🟡 Healthy stoma appearance (pink-red, moist) vs. dusky/pale/dark as a reportable finding of compromised blood flow — verify; a stoma-color misjudgment could delay recognition of a real complication.
- 🟡 Cold-first (24-48hr) vs. heat-later general injury-care framing, and diabetic-neuropathy as an increased thermal-injury risk factor — verify the timeframe and the neuropathy-risk claim.

- 🟡 List of immobility complications (pressure injury, DVT, pneumonia, constipation, contractures) — verify completeness.
- 🟡 "Reposition at least every two hours" guideline — verify against current standard of care; some current guidance uses individualized, risk-based repositioning schedules rather than a flat interval, and this content presents the flat two-hour rule as a general guideline only.
- 🟢 Pressure injury risk sites (sacrum, heels, hips).
- 🟢 Intake and output (I&O) — what counts as intake (oral, IV, tube feeding) vs. output (urine, emesis, drainage).
- 🟢 Sleep hygiene principles (consistent routine, quiet/dark/comfortable environment, minimizing interruptions).
- 🟡 Cane-on-stronger-side rule, and that the cane and weaker leg move forward together — verify the biomechanical reasoning and phrasing precisely; this is a commonly tested but precisely-worded fact.

**Update (2026-08-11, round 7):** three more modules added (spiritual/religious care, complementary/integrative health, sensory changes in older adults):

- 🟢 Spiritual assessment (ask, don't assume, based on stated religion) and respecting an informed religious treatment refusal — general client-centered-care principle, low risk, verify framing does not overstate limits on care team advocacy.
- 🟡 Herbal supplement disclosure/interaction-risk claim, and mind-body techniques as adjuncts rather than replacements for indicated treatment — verify; no specific supplement or interaction named.
- 🟡 Presbyopia/presbycusis as expected age-related changes, sudden-change-warrants-evaluation distinction, and communication strategies for hearing loss (face client, normal volume, not shouting) — verify each claim.

**Update (2026-08-12, round 18):** three more modules added (oral care/aspiration precautions, wound dressing types, positioning for respiratory comfort):

- 🔴 Dysphagia aspiration precautions (fully upright during meals, remain upright after, thickened liquids) and oral-care-reduces-aspiration-pneumonia-risk framing — verify precisely; aspiration precautions are a high-consequence, frequently-tested safety topic.
- 🟡 Moist-wound-healing-environment concept and wet-to-dry dressing inappropriateness for clean granulating wounds — verify; deliberately kept general, no specific commercial dressing product named.
- 🟡 High Fowler's-maximizes-lung-expansion claim and "good lung down" positioning principle for unilateral lung disease — verify both precisely, especially the "good lung down" claim since the intuitive-sounding alternative (bad lung down) is a common point of confusion.

**Update (2026-08-13, round 28):** three more modules added (end-of-life
comfort care, range of motion exercises, bowel/bladder retraining):

- 🟡 End-of-life comfort care framing (deliberate shift in care goals, not withdrawal of care; expected physical changes near death) — verify this is accurately and sensitively framed against current palliative/hospice care principles; this is emotionally sensitive content where framing matters as much as factual accuracy.
- 🟢 Active/active-assisted/passive ROM distinctions and the gentle-only-to-resistance technique principle — standard, low risk, verify terminology.
- 🟡 Bowel/bladder retraining consistency-of-schedule principle and the do-not-restrict-fluids-during-retraining claim — verify the fluid-restriction point precisely, since a learner might otherwise intuitively (and incorrectly) think restricting fluids helps incontinence.

**Update (2026-08-13, round 37):** three more modules added (bathing/skin
hygiene, assistive devices for sensory impairment, positioning to prevent
contractures):

- 🟢 Individualized-bathing-frequency framing and drying-of-skin-folds-prevents-breakdown/fungal-infection claim — standard, low risk, verify the older-adult-skin framing doesn't overstate or understate the individualization needed.
- 🟡 Stored-not-worn-devices-provide-no-benefit framing and confirm-device-function-before-raising-volume guidance — verify; general assistive-device care principle, no specific hearing aid type or brand referenced.
- 🟡 Contractures-often-irreversible-once-established claim and prevention-not-replacement-of-ROM framing — verify precisely; the difficult-to-reverse claim is the kind of urgency-establishing fact that should be checked against current rehabilitation/positioning guidance.

**Update (2026-08-14, round 45):** three more modules added (therapeutic
diets, post-mortem care, sleep hygiene):

- 🟡 Diet progression should follow tolerance not a fixed schedule, and cardiac/renal diet-to-condition matching (low-sodium for heart failure/HTN, sodium/potassium/phosphorus restriction for renal disease) — verify; deliberately no specific numeric restriction values given for any diet category.
- 🟡 Post-mortem-care-with-same-dignity-as-life-care framing and accommodate-family/cultural-preferences guidance — verify this is accurately and sensitively framed; emotionally sensitive content where framing matters alongside factual accuracy, similar to the existing end-of-life comfort care module.
- 🟢 Care-clustering-reduces-nighttime-interruptions and proactive-not-only-reactive sleep hygiene framing — standard, low risk, general hospital-care concept.

**Update (2026-08-14, round 52):** three more modules added (oral hygiene
for unconscious/intubated clients, dysphagia diet consistency levels,
prosthetic/orthotic device care):

- 🔴 Regular-oral-care-reduces-VAP-risk claim and positioning/suction-technique-prevents-aspiration guidance — verify precisely; VAP prevention is a high-consequence, precisely-tested infection-prevention topic, and framing oral care as purely a comfort measure would understate its actual clinical significance.
- 🔴 Thicker-consistency-gives-more-airway-protection-time claim and consistency-level-individualized-not-uniform framing — verify precisely; substituting an incorrect liquid consistency is a genuine, high-consequence aspiration risk this module aims to prevent.
- 🟡 Ongoing-not-just-initial skin assessment at device contact points and gradual-wear-time-increase/persistent-redness-needs-adjustment framing — verify; general prosthetic/orthotic care principle, no specific device type or product named.

**Update (2026-08-14, round 59):** three more modules added (enteral
feeding residual volume/safety checks, skin tear prevention in older
adults, nonpharmacological constipation management):

- 🔴 Check-residual-volume-and-confirm-placement-before-each-feeding claim and elevated-residual-suggests-delayed-emptying/aspiration-risk framing — verify precisely; skipping these checks is a genuine, high-consequence tube-feeding safety error this module aims to prevent.
- 🟡 Skin-tear-prevention-via-gentle-broad-contact-technique-not-tight-grip claim — verify; standard older-adult skin-safety principle, deliberately general.
- 🟢 Ignoring-urge-worsens-constipation and forward-leaning-positioning-aids-elimination framing — standard, low risk, general nonpharmacological bowel-management concept.

**Update (2026-08-14, round 66):** three more modules added (ostomy
pouching/skin barrier care, nonpharmacological dyspnea relief,
repositioning schedule/pressure redistribution):

- 🟡 Well-fitted-barrier-prevents-peristomal-breakdown and frequent-leakage-indicates-reassessment-needed claims — verify; connects to and should be consistent with the existing urinary catheters and ostomies module.
- 🟡 Fan-to-face-reduces-breathlessness-sensation and teach-pursed-lip-breathing-before-not-during-acute-distress claims — verify; deliberately general nonpharmacological comfort strategy, no specific device or product named.
- 🟢 Individualized-not-fixed-interval repositioning and consistent-execution-not-just-documentation-reduces-risk framing — standard, low risk, connects to existing pressure injury prevention module without asserting a specific numeric repositioning interval.

**Update (2026-08-16, round 73):** three more modules added (diabetic foot
care, perineal care for incontinent clients, bathing method selection):

- 🔴 Daily-foot-inspection-genuine-safety-practice claim and never-self-trim-see-podiatrist-instead guidance — verify precisely; diabetic foot care is a classic, high-consequence, frequently-tested NCLEX safety topic where a learner underestimating impaired-healing risk could give inappropriate self-care advice.
- 🟡 Prompt-perineal-care-prevents-incontinence-associated-dermatitis and gentle-not-vigorous-cleansing-technique claims — verify; connects to and should be consistent with the existing bathing/skin-hygiene and skin-tear-prevention modules.
- 🟢 Bathing-method-selection-based-on-mobility/stability-not-uniform and fall-precautions-still-apply-during-bathing framing — standard, low risk, general safety concept.

**Update (2026-08-16, round 80 — milestone):** three more modules added
(distraction/relaxation for procedural comfort, massage therapy
contraindications, environmental modification for sensory-impaired
clients):

- 🟢 Distraction-complements-not-replaces-pharmacologic-pain-management and introduce-before-not-during-procedure framing — standard, low risk, general comfort-technique concept.
- 🔴 Avoid-massage-over-suspected/confirmed-DVT-risk-of-embolization claim and additional-contraindications-(open-wound/infection/unstable-fracture) framing — verify precisely; the DVT-embolization risk is a genuine, checkable safety fact where a learner unaware of this contraindication could recommend a harmful comfort measure.
- 🟢 Consistent-environment-organization-supports-visually-impaired-navigation and face-client/adequate-lighting-supports-hearing-impaired-communication framing — standard, low risk, connects to existing assistive-device content.

**Update (2026-08-16, round 87):** three more modules added (cast care,
bowel sounds assessment technique, feeding assistance for dysphagia):

- 🟡 Wet-cast-weakens-structurally/causes-skin-irritation claim and never-insert-object-under-cast guidance — verify; connects to and should be consistent with the existing neurovascular-check and compartment-syndrome content.
- 🟡 Auscultate-before-palpate/palpation-can-alter-motility claim and absent-and-hyperactive-both-significant framing — verify precisely; the auscultation-before-palpation sequencing connects to and should be checked for consistency with the existing abdominal-assessment-order module.
- 🟡 Check-for-pocketing-before-next-bite and rushing-increases-aspiration-risk-not-just-convenience claims — verify; connects to and should be consistent with the existing dysphagia-diet-levels and aspiration-precautions modules.

**Update (2026-08-19, round 94):** three more modules added (Braden Scale,
hydration status assessment, adaptive equipment for eating/self-care):

- 🔴 Lower-score-indicates-higher-risk claim — verify precisely; this is a specific, checkable, easy-to-state-backward fact where a learner reversing the score direction could seriously miscommunicate a client's actual risk level.
- 🟡 Skin-turgor-alone-insufficient/other-indicators-add-information claim and dark-concentrated-urine-suggests-inadequate-hydration framing — verify; connects to and should be consistent with the existing skin-turgor and intake/output content.
- 🟢 Adaptive-equipment-considered-before-assuming-full-assistance-needed framing — standard, low risk, connects to the existing restorative-care and assistive-devices modules.

**Update (2026-08-19, round 103):** three more modules added (pain
assessment in nonverbal/cognitively impaired clients, skin assessment in
darkly pigmented skin, safe client transfer techniques):

- 🟡 Behavioral-indicators-used-when-self-report-unreliable claim and behavior-change-can-have-non-pain-causes-but-should-never-be-dismissed framing — verify; connects to and should be consistent with the existing pain-assessment (self-report) module in Reduction of Risk Potential.
- 🔴 Non-blanchable-redness-harder-to-detect-on-darker-skin-tones claim and check-temperature/consistency/reported-pain-instead framing — verify precisely; this is an equity-significant, clinically important assessment-technique nuance connecting to and should be checked for consistency with the existing pressure-injury-prevention and Braden Scale modules.
- 🟡 Body-mechanics-principles(load-close/bend-knees/avoid-twisting) and weight-bearing-ability-determines-transfer-method(full-lift-vs-gait-belt) claims — verify; standard fundamentals-of-nursing safe-handling content, connects to the existing assistive-devices-for-mobility module.

**Update (2026-08-24, round 112 — milestone, crossed 4,000 slides):** three
more modules added (urinary incontinence types, fecal impaction, hospice vs.
palliative care):

- 🟡 Four-incontinence-types(stress/urge/overflow/functional)-distinguished-by-trigger claim and type-determines-appropriate-intervention framing — verify; connects to and should be consistent with the existing elimination and bowel/bladder-retraining modules.
- 🔴 Paradoxical-diarrhea-can-mask-impaction-as-ordinary-diarrhea claim — verify precisely; this is a classic, checkable, easy-to-miss clinical pattern where a learner failing to consider impaction in a client with new diarrhea could delay appropriate treatment.
- 🔴 Hospice-is-a-subset-of-palliative-care/palliative-care-can-accompany-curative-treatment-at-any-stage distinction — verify precisely; this is a frequently-confused, precisely-tested end-of-life-care topic connecting to the existing end-of-life-comfort-care module.

**Update (2026-08-24, round 121):** three more modules added (denture care,
incontinence-associated dermatitis, terminal restlessness):

- 🟢 Remove-dentures-before-oral-care/store-in-water-or-solution-not-dry/label-to-prevent-mixups framing — standard, low risk, connects to and should be consistent with the existing oral-care-and-aspiration-precautions module.
- 🟡 Moisture-mechanism-distinct-from-pressure-related-injury claim and prompt-cleansing/barrier-product-not-delayed-until-scheduled-care framing — verify; connects to and should be consistent with the existing urinary-incontinence-types (round 112) and perineal-care modules.
- 🔴 Assess-for-reversible-causes(pain/full-bladder/positioning)-before-assuming-untreatable claim and environmental/comfort-measures-tried-before-strongest-medication framing — verify precisely; this connects to and should be consistent with the existing end-of-life-comfort-care and hospice-vs-palliative-care modules, and undertreating a reversible cause of terminal agitation is a real, checkable end-of-life-care risk.

**Update (2026-08-24, round 130 — milestone):** three more modules added
(hearing-impaired communication techniques, nonpharmacological nausea
comfort measures, fall recovery/assisting a client who has fallen):

- 🟢 Facing-client/normal-pace/reduce-background-noise-support-communication-regardless-of-hearing-aid-use framing and shouting-distorts-speech/exaggerates-lip-movements-not-more-effective claim — standard, low risk, connects to and should be consistent with the existing assistive-devices-for-sensory-impairment module.
- 🟢 Avoid-strong-odors/small-frequent-bland-meals/complement-not-replace-antiemetics framing — standard, low risk, connects to and should be consistent with the existing nonpharmacological-comfort-interventions module.
- 🟡 Assess-for-injury-before-moving-client-after-fall claim and fall-prompts-documentation/fall-prevention-plan-review-not-just-recovery framing — verify; connects to and should be consistent with the existing general fall-prevention module.

**Update (2026-08-24, round 139):** three more modules added
(nonpharmacological pruritus comfort measures, dementia environmental
comfort/reducing overstimulation, toileting assistive devices):

- 🟢 Cool-water/pat-dry-not-rub/moisturize-and-trimmed-nails-reduce-scratching-injury framing — standard, low risk, connects to and should be consistent with the existing nonpharmacological-comfort-interventions module.
- 🟡 Reduce-stimulation/consistent-familiar-routine-supports-comfort claim and frequent-rearranging-even-well-intentioned-increases-confusion-not-comfort framing — verify this is accurately and sensitively framed; connects to and should be consistent with the existing sensory-changes-in-older-adults module.
- 🟢 Raised-toilet-seat-reduces-lowering-distance-for-limited-hip/knee-flexibility claim and device-selection-individualized-not-same-device-for-every-client framing — standard, low risk, connects to and should be consistent with the existing assistive-devices-for-mobility module.

**Update (2026-08-25, round 148):** three more modules added (delirium
comfort care, labor comfort measures, chemotherapy oral care/mucositis
prevention):

- 🟡 Calm-well-lit-environment/orientation-cues/familiar-people-support-comfort claim and measures-do-not-replace-identifying-treating-underlying-cause framing — verify; connects to and should be consistent with the existing delirium-vs-dementia module.
- 🟢 Position-changes/back-massage/continuous-support-complement-not-replace-pharmacological-management claim and reassess-throughout-labor-not-single-early-preference framing — standard, low risk, connects to and should be consistent with the existing stages-of-labor module.
- 🟡 Consistent-gentle-oral-care-reduces-mucositis-severity/infection-risk claim and soft-bristled-toothbrush-preferred-over-standard-firm-bristled framing — verify; connects to and should be consistent with the existing chemotherapy-and-neutropenic-precautions and oral-care-and-aspiration-precautions modules.

**Update (2026-08-27, round 155):** three more modules added (ambulation
assistance/gait belt use, nutrition assistance for the visually impaired
client, hair and nail care):

- 🟡 Stable-grip-for-steadying-and-guiding-controlled-descent-if-falling-not-only-useful-while-walking-normally claim and baseline-strength/balance/orthostatic-assessment-before-ambulation-not-skippable framing for gait belt use — verify; connects to and should be consistent with the existing safe-client-transfer-techniques module.
- 🟢 Clock-face-method-supports-independent-self-feeding-not-default-feeding-by-nurse claim and consistent-orientation-every-meal-reinforces-independence framing — standard, low risk, connects to and should be consistent with the existing adaptive-equipment-for-eating-and-self-care module.
- 🟡 Heightened-caution-for-diabetic/PVD-client-nail-trimming-minor-injury-can-become-serious-complication claim and follow-facility-policy-on-who-may-trim-nails framing — verify; connects to and should be consistent with the existing diabetic-foot-care module.

## Pharmacological and Parenteral Therapies

This unit was deliberately written to avoid asserting specific real-world drug
doses as fact — see the module's own opening note. Even so, the following general
claims should be verified:

- 🟡 The "Rights" of medication administration (patient, drug, dose, route, time, documentation) — verify this core list; some sources teach additional rights (e.g., right reason, right response) that are not included here and may need to be added.
- 🟡 Two-identifier patient confirmation before medication administration.
- 🟢 Documentation occurs after administration, not before.
- 🟢 Route of administration affects onset speed, IV generally fastest, oral generally slowest — kept general, no specific pharmacokinetic timing given.
- 🟢 Example drug classifications used (antihypertensive/analgesic/antipyretic) and their general purposes — low risk, standard, verify examples.
- 🟡 Therapeutic range / narrow therapeutic range concept — general pharmacology concept, verify framing; no specific drug named as having a narrow range, which real content eventually should.
- 🔴 IV fluid tonicity concept (isotonic/hypotonic/hypertonic, direction of fluid shift relative to cells) — verify precisely; no specific fluid (e.g., normal saline, D5W) is named or classified yet, which real content eventually should, and each such classification would need independent verification.
- 🟡 Free-flowing/uncontrolled IV rate as a safety hazard (fluid overload, rapid toxicity) — general concept, verify.
- 🟢 General adverse-reaction response priority (stop medication, notify provider) — process-level, not drug-specific.
- 🟢 Near-miss medication errors should be reported through formal process, treated as quality improvement not purely punitive — consistent with the error-reporting principle already flagged under Safety and Infection Control.

**Update (2026-08-11):** the unit was expanded with 8 drug-class modules following the coverage-gap discussion. These name real drug classes (not specific drugs/doses) and their key nursing safety considerations — a step up in specificity from the original conceptual-only content, and correspondingly higher risk. Each below:

- 🔴 Antihypertensive classes and their hallmark considerations (ACE inhibitor dry cough + potassium/renal monitoring; beta blocker heart-rate check + no abrupt stop; calcium channel blocker edema/hypotension; diuretic fluid/electrolyte monitoring) — verify each class-to-consideration mapping.
- 🔴 Anticoagulants vs. antiplatelets (mechanism distinction, bleeding risk) and heparin (IV, fast onset) vs. warfarin (oral, slower onset) — verify onset comparison and mechanism framing.
- 🔴 Opioid analgesics — respiratory rate/sedation monitoring, naloxone as the reversal agent — verify naloxone's role is stated correctly and completely.
- 🟡 Antibiotics — bacterial-not-viral scope, allergy check before administration, complete the full course — standard, verify.
- 🔴 Antidiabetic medications/insulin — hypoglycemia as the key monitoring concern, four general insulin categories (rapid/short/intermediate/long-acting) named without specific onset/peak/duration timing (deliberately, pending verification) — verify the four-category framing itself is accurate and current.
- 🟡 Psychiatric medications — antidepressants take weeks for full effect, monitor for worsening mood/suicidal ideation especially early in treatment, benzodiazepine dependence risk — verify each claim; the suicidal-ideation monitoring point in particular should be checked against current guidance for how it's framed to a learner.
- 🟢 Respiratory medications — bronchodilator (rescue/acute) vs. inhaled corticosteroid (controller/scheduled) distinction — standard, verify.
- 🔴 Cardiac glycosides (digoxin-class) — narrow therapeutic range, apical pulse check before administration, withhold/notify if heart rate too low — verify precisely; this is a classic but precisely-worded safety fact.

**Not yet covered:** any specific real drug name (e.g., a named ACE inhibitor), specific dose, specific IV fluid product. None of that exists in the course yet.

**Update (2026-08-11, round 2):** four more drug-class modules added (anticonvulsants, corticosteroids, immunosuppressants, chemotherapy/neutropenic precautions):

- 🔴 Anticonvulsants — consistent (not PRN) dosing, missed-dose/lowered-seizure-threshold risk, abrupt-discontinuation seizure risk — verify precisely.
- 🔴 Corticosteroids — infection risk with blunted fever response, hyperglycemia, gradual taper vs. abrupt-stop adrenal-insufficiency risk — verify each claim, especially the blunted-fever-response point since it directly affects how a learner would interpret a client assessment.
- 🟡 Immunosuppressants — increased infection risk, prompt reporting of even mild infection signs — verify.
- 🔴 Chemotherapy/neutropenic precautions — low-grade fever in a neutropenic client treated as a potential emergency — verify precisely; this is a high-consequence, easy-to-underweight safety point (a "low-grade" fever sounding minor to a learner unfamiliar with neutropenia).

**Update (2026-08-11, round 6):** five more drug-class/medication-safety modules added (antiemetics, laxatives/bowel regimens, controlled substance handling, high-alert medications, vaccine administration):

- 🟡 Antiemetic sedation/fall-risk and QT-prolongation considerations — verify.
- 🟡 Laxative mechanism distinctions (bulk-forming/osmotic/stimulant) and prophylactic bowel regimen for scheduled opioid therapy — verify.
- 🟡 Controlled substance handling (witnessed wastage, two-nurse shift-change counts, locked storage) — verify against current regulatory/facility-policy norms; presented as general practice, may vary somewhat by facility.
- 🟢 High-alert medication concept (severity-of-harm-not-frequency framing) and example categories (insulin, anticoagulants, opioids, concentrated electrolytes) — standard patient-safety concept, verify example list.
- 🟡 Vaccine administration screening/observation-period claims (contraindication screening, post-administration observation period) — verify; deliberately did not commit to a specific observation-time number as a strict rule (mentioned only as "commonly cited"), should be confirmed and made precise once verified.

**Update (2026-08-11, round 11):** four more modules added (anticoagulant reversal agents, IV fluid types, TPN, pediatric medication safety):

- 🟡 "Not every anticoagulant has a specific reversal agent" claim and the medication-reconciliation-matters-in-emergency framing — verify precisely; deliberately did not name any specific anticoagulant or reversal agent, so the claim stays at the conceptual level pending review.
- 🔴 Isotonic/hypotonic/hypertonic fluid-shift direction claims (hypotonic shifts into cells, hypertonic pulls out of cells) — verify precisely; this directionality is easy to reverse and was flagged as such in the module's own exercise explanation, so a reviewer should specifically confirm the direction is correct as written.
- 🔴 TPN central-line requirement, glucose-monitoring need, and abrupt-discontinuation rebound-hypoglycemia risk — verify all three precisely.
- 🟡 Pediatric weight-based dosing and independent-double-check-standard-practice claims — verify; builds on the existing weight-based dosing module from round 1's dosage-calculation additions, no new numeric claims introduced.

**Update (2026-08-13, round 22):** three more drug-class modules added
(diuretics, NSAIDs/nonopioid analgesics, GI acid-reducing medications):

- 🔴 Diuretic category-to-potassium-effect mapping (loop/thiazide waste potassium, potassium-sparing does not and can raise it) and loop-more-potent-than-thiazide framing — verify precisely; confusing which category spares vs. wastes potassium is exactly the kind of classic, high-consequence error this content aims to prevent, so the mapping must be verified correct.
- 🔴 NSAID risk profile (GI bleeding, renal risk) vs. acetaminophen risk profile (hepatotoxicity, risk of exceeding max dose via multiple acetaminophen-containing products) — verify each risk-to-drug-category mapping precisely; a swapped risk profile here could meaningfully mislead a learner about which drug carries which danger.
- 🟡 Antacid/H2 blocker/PPI mechanism and onset/duration comparison, and long-term-PPI-use association with reduced calcium absorption and infection susceptibility — verify; deliberately no specific drug named within each category and no specific duration threshold given for "long-term."

**Update (2026-08-13, round 31):** three more drug-class modules added
(antilipemics/statins, thyroid replacement/antithyroid medications, herbal
supplement/OTC safety):

- 🔴 Statin muscle-pain-reportable and ongoing-liver-monitoring-not-one-time-check claims — verify precisely; muscle-breakdown and liver-monitoring points are classic, precisely-tested statin safety facts where imprecision could mislead a learner about symptom significance.
- 🔴 Thyroid replacement empty-stomach/consistent-timing absorption claim, and antithyroid-medication agranulocytosis/report-infection-signs claim — verify precisely; agranulocytosis is a serious, low-frequency but high-consequence adverse effect where the reporting instruction must be accurate.
- 🟡 Herbal/OTC-not-automatically-safe framing and include-in-medication-reconciliation/ask-directly guidance — verify; deliberately no specific herbal supplement or interaction named, kept at the conceptual/safety-practice level pending review.

**Update (2026-08-13, round 40):** three more modules added (beta-blocker
nursing considerations, antipsychotic EPS/tardive dyskinesia, eye/ear
medication administration technique):

- 🔴 Beta-blocker heart-rate-check-before-administration/hold-per-parameter claim and mask-hypoglycemia-symptoms-especially-fast-heart-rate claim — verify precisely; the hypoglycemia-masking effect is a classic, high-consequence, frequently-tested beta-blocker safety fact.
- 🔴 EPS-as-distinct-movement-side-effect-not-symptom-worsening framing, and tardive dyskinesia as a serious/potentially-irreversible longer-term complication — verify precisely; a learner who mistakes EPS for psychiatric symptom worsening could respond incorrectly (e.g., by not reporting it as a medication effect).
- 🟡 Eye-drop lower-eyelid-pocket technique and age-based ear-pulling-direction distinction (up-and-back adult vs. down-and-back child) — verify both technique claims precisely; the age-based ear-canal-direction distinction is a specific, checkable procedural fact.

**Update (2026-08-14, round 48):** three more modules added (antifungal/
antiviral medications, bronchodilator mechanism distinction, antihistamine
generation distinction):

- 🟡 Antibiotic-not-effective-for-fungal/viral-infections claim and complete-full-course framing — verify; deliberately no specific antifungal/antiviral drug named, kept at the conceptual/organism-class level.
- 🟡 Beta-agonist-vs-anticholinergic bronchodilator mechanism distinction and beta-agonist tachycardia/tremor side-effect framing — verify precisely; a reversed mechanism-to-drug-category mapping would be a meaningful factual error.
- 🔴 First-vs-second-generation antihistamine sedation distinction and older-adult fall/confusion-risk framing — verify precisely; this connects to and should be consistent with the existing older-adult medication-safety/polypharmacy content, and the sedation-risk claim is a classic, frequently-tested safety fact.

**Update (2026-08-14, round 55):** three more modules added (potassium
supplementation administration safety, iron supplementation, antiarrhythmic
medications):

- 🔴 IV-potassium-never-rapid-push/fatal-dysrhythmia-risk claim and no-self-adjusted-make-up-doses guidance — verify precisely; the never-IV-push rule is one of the most consistently emphasized, highest-consequence medication-safety facts in nursing and must be stated correctly with no ambiguity.
- 🟡 Dark/black-stools-expected-and-harmless-from-iron claim and absorption-enhanced/reduced-by-specific-substances framing — verify precisely; a learner mistaking expected iron-related stool color change for GI bleeding (or vice versa) could respond incorrectly in either direction.
- 🟡 ECG-monitoring-standard-not-only-if-symptomatic claim and proarrhythmic-risk-not-risk-free framing — verify; deliberately no specific antiarrhythmic drug or class (e.g., Vaughan Williams classification) named, kept at the conceptual level pending review.

**Update (2026-08-14, round 62):** three more modules added (calcium
supplementation, muscle relaxants, topical/local anesthetics):

- 🟡 Divided-dose-absorption and space-apart-from-iron/other-substances claims — verify precisely; connects to and should be consistent with the existing iron-supplementation module's absorption-interaction framing.
- 🟡 Sedation/dizziness-fall-risk and combined-CNS-effect-with-other-depressants claims — verify; general muscle-relaxant safety principle, no specific drug named.
- 🔴 Excessive-application-or-broken-skin-causes-systemic-absorption/toxicity claim — verify precisely; this is a genuine, checkable medication-safety fact where a learner underestimating topical-anesthetic systemic-toxicity risk could apply an unsafe amount.

**Update (2026-08-14, round 69):** three more modules added (magnesium
sulfate obstetric/general considerations, sedative-hypnotics for sleep,
antitussives/expectorants):

- 🔴 Diminished/absent-reflexes-as-early-magnesium-toxicity-warning-sign claim and calcium-gluconate-as-standard-readily-available-antidote framing — verify precisely; this connects directly to the existing preeclampsia module, and magnesium toxicity monitoring is a classic, high-consequence, precisely-tested obstetric safety topic.
- 🟡 Fall-risk/residual-sedation and prepare-environment-before-not-after-taking-medication claims — verify; general sedative-hypnotic safety principle, no specific drug named, connects to existing older-adult fall-prevention content.
- 🟢 Antitussive-suppresses-vs-expectorant-loosens opposite-purpose distinction and productive-cough-serves-protective-function-not-always-suppress framing — standard, low risk, general respiratory-medication concept.

**Update (2026-08-16, round 76):** three more modules added (nitroglycerin/
nitrates, oxytocin labor induction/augmentation, insulin onset/peak/
duration concept):

- 🔴 Headache-as-expected-vasodilation-side-effect claim and PDE5-inhibitor-interaction-causes-severe-hypotension warning — verify precisely; the nitrate/PDE5-inhibitor interaction is a classic, high-consequence, frequently-tested drug-interaction fact.
- 🔴 Uterine-tachysystole-risk-requires-continuous-monitoring claim and reduce/stop-infusion-not-continue-unchanged guidance — verify precisely; this connects directly to the existing fetal-heart-rate-monitoring module, and oxytocin safety is a high-consequence, precisely-tested obstetric medication topic.
- 🟡 Rapid-acting-timed-with-meals-vs-long-acting-background-coverage distinction and peak-time-determines-highest-hypoglycemia-risk framing — verify; deliberately no specific numeric onset/peak/duration timing given for any insulin type, kept conceptual pending review, consistent with the existing antidiabetic module's stated scope-limiting rationale.

**Update (2026-08-16, round 83):** three more modules added
(bisphosphonate administration, thrombolytic therapy, calcium channel
blocker considerations):

- 🔴 Remain-upright-after-taking-prevents-esophageal-irritation claim and administration-technique-as-essential-not-secondary-to-medication-name framing — verify precisely; bisphosphonate administration technique is a classic, precisely-tested topic where an error could lead a learner to teach unsafe administration.
- 🔴 Time-sensitive-window-and-accurate-onset-time-critical-for-eligibility claim and bleeding-as-major-risk-requiring-pre/post-monitoring framing — verify precisely; thrombolytic therapy is a high-consequence, precisely-tested topic connecting directly to the existing stroke and MI modules.
- 🟡 Grapefruit-interaction-increases-blood-levels claim and peripheral-edema-as-recognized-side-effect-worth-reporting framing — verify precisely; the grapefruit interaction is a specific, checkable drug-interaction fact.

**Update (2026-08-16, round 90 — milestone):** three more modules added
(anticholinergic effects/older-adult risk, antipyretic medications, live
vaccine precautions in immunosuppressed clients):

- 🟡 Cumulative-anticholinergic-effect-across-multiple-medications claim and confusion-mistaken-for-dementia-in-older-adults framing — verify; connects to and should be consistent with the existing polypharmacy and antihistamine content.
- 🟡 Fever-as-diagnostic-clue-not-always-treat-aggressively claim and antipyretic-can-mask-fever-warning-sign-especially-in-neutropenia framing — verify; connects to and should be consistent with the existing neutropenic-fever content.
- 🔴 Live-vaccine-actual-infection-risk-in-significantly-immunosuppressed vs. inactivated-vaccine-distinction — verify precisely; this connects to and should be checked for consistency with the existing immunosuppressant and vaccine-administration modules, and is a high-consequence, precisely-tested vaccine-safety topic.

**Update (2026-08-19, round 97):** three more modules added (acetaminophen
overdose/N-acetylcysteine, opioid/benzodiazepine reversal agents,
warfarin/vitamin K reversal pairing):

- 🔴 N-acetylcysteine-effectiveness-time-sensitive claim and total-amount-across-products-matters-not-just-single-product framing — verify precisely; this connects directly to the existing acetaminophen-hepatotoxicity content, and treatment-timing precision is a high-consequence, checkable fact.
- 🔴 Re-sedation-risk-because-reversal-agent-shorter-duration-than-original-drug claim and continued-monitoring-required-not-single-dose-and-done framing — verify precisely; the re-sedation concept is a classic, high-consequence, precisely-tested pharmacology-safety topic connecting to the existing opioid-analgesic module.
- 🟡 Vitamin-K-restores-clotting-factor-pathway-mechanism claim and vitamin-K-alone-may-not-be-rapid-enough-for-active-bleeding framing — verify; connects to and should be consistent with the existing general anticoagulant-reversal-agent module.

**Update (2026-08-19, round 106):** three more modules added (ACE inhibitors,
epidural anesthesia, antitubercular medications):

- 🔴 Angioedema-as-emergency-requiring-immediate-stop-and-evaluation claim and persistent-dry-cough-as-distinctive-side-effect framing — verify precisely; this connects to and should be consistent with the existing antihypertensive-medication-classes module, and ACE-inhibitor angioedema is a classic, high-consequence, precisely-tested medication-safety topic.
- 🔴 Epidural-related-maternal-hypotension-can-reduce-fetal-blood-flow claim and assess-maternal-BP-before-assuming-FHR-change-unrelated framing — verify precisely; this connects directly to the existing fetal-heart-rate-monitoring module, and this is a high-consequence, precisely-tested obstetric medication-safety topic.
- 🟡 Directly-observed-therapy-supports-completion/incomplete-treatment-risks-drug-resistance claim and hepatotoxicity-monitoring-report-jaundice/dark-urine framing — verify; connects to and should be consistent with the existing antibiotics module, deliberately no specific antitubercular drug named.

**Update (2026-08-24, round 115):** three more modules added (SSRI black box
warning/discontinuation syndrome, local anesthetics with epinephrine/
end-arterial contraindication, antiemetic serotonin antagonists/QT
prolongation):

- 🔴 Black-box-warning-increased-suicidal-thinking-in-children/adolescents/young-adults-especially-first-weeks-or-after-dose-change claim and gradual-taper-not-abrupt-discontinuation-reduces-discontinuation-syndrome framing — verify precisely; this connects to and should be consistent with the existing psychiatric-medication-classes module, and the black box warning is a high-consequence, precisely-tested medication-safety fact.
- 🔴 Epinephrine-vasoconstriction-contraindicated-in-end-arterial-areas(fingers/toes/nose/ears)-risking-ischemia/necrosis claim — verify precisely; this is a classic, high-consequence, precisely-tested medication-safety topic connecting to the existing topical/local-anesthetics module.
- 🟡 QT-prolongation-risk-compounded-by-other-QT-prolonging-meds-or-electrolyte-imbalance claim and review-medication-list/electrolytes-before-administering-is-not-optional framing — verify; connects to and should be consistent with the existing antiemetics module.

**Update (2026-08-24, round 124):** three more modules added (lithium
narrow therapeutic index, neuroleptic malignant syndrome, metformin lactic
acidosis/contrast hold):

- 🔴 Narrow-therapeutic-index-early-vs-serious-toxicity-progression claim and dehydration/NSAIDs-can-raise-levels-without-dose-change framing — verify precisely; this connects to and should be consistent with the existing psychiatric-medication-classes and therapeutic-drug-monitoring modules, and lithium toxicity is a classic, high-consequence, precisely-tested medication-safety topic.
- 🔴 NMS-fever/rigidity/autonomic-instability/altered-mental-status-distinct-from-EPS-movement-disorder-only-presentation claim and stop-medication/emergency-treatment-not-wait-for-next-assessment framing — verify precisely; this connects directly to the existing antipsychotic-EPS/tardive-dyskinesia module, and NMS is a rare but life-threatening, precisely-tested emergency.
- 🔴 Contrast-media-temporary-renal-effect/increased-risk-with-significant-renal-impairment claim and hold-before-and-after-per-protocol/reassess-renal-function-before-restarting framing — verify precisely; this connects to and should be consistent with the existing antidiabetic-medications-and-insulin module, and this hold protocol is a specific, high-consequence, precisely-tested medication-safety practice.

**Content-quality correction (2026-08-24, round 124):** while authoring this
round, I noticed a runtime warning ("Duplicate slide text detected") for the
pre-existing "Antidiabetic Medications and Insulin" module's vocab exercise
(round 76 or earlier) — all four insulin-category vocab definitions
("Rapid-acting insulin," "Short-acting insulin," etc.) shared the identical
placeholder definition text "one of several general insulin categories,"
which the app's duplicate-slide-text detection flagged as a potential
navigation/saving issue. I rewrote the four definitions to be distinct while
keeping them conceptual (no specific numeric onset/peak/duration given,
consistent with the module's own stated scope-limiting rationale). This is a
content-quality fix, not a clinical-accuracy claim requiring review — noted
here for completeness since it touched pre-existing content outside this
round's three new modules.

**Update (2026-08-24, round 133):** three more modules added (vancomycin
red man syndrome/trough monitoring, clozapine agranulocytosis monitoring,
aminoglycosides nephrotoxicity/ototoxicity):

- 🔴 Red-man-syndrome-infusion-rate-related/slow-infusion-standard-response claim and true-trough-drawn-right-before-next-dose-not-immediately-after-infusion framing — verify precisely; this connects to and should be consistent with the existing antibiotics and therapeutic-drug-monitoring modules, and vancomycin trough-timing precision is a high-consequence, precisely-tested medication-safety topic.
- 🔴 Mandatory-not-optional-blood-count-monitoring/report-fever-sore-throat-promptly-given-known-risk claim — verify precisely; this connects to and should be consistent with the existing antipsychotic-medications module, and clozapine agranulocytosis monitoring is a classic, high-consequence, precisely-tested medication-safety requirement.
- 🔴 Nephrotoxicity-and-ototoxicity-dual-monitoring-concern claim and ototoxicity-can-be-permanent-if-not-caught-early-report-promptly framing — verify precisely; this connects to and should be consistent with the existing antibiotics module, and aminoglycoside toxicity monitoring is a high-consequence, precisely-tested topic.

**Update (2026-08-25, round 142):** three more modules added (phenytoin
narrow therapeutic index/gingival hyperplasia, heparin aPTT/protamine
sulfate reversal, fentanyl patch transdermal safety):

- 🔴 Narrow-therapeutic-index-monitoring/gingival-hyperplasia-distinctive-side-effect claim and toxicity-signs(nystagmus/ataxia/slurred-speech)-reported-promptly framing — verify precisely; this connects to and should be consistent with the existing anticonvulsants module, and phenytoin toxicity recognition is a classic, high-consequence, precisely-tested topic.
- 🔴 aPTT-for-heparin-distinct-from-INR/PT-for-warfarin claim and protamine-sulfate-specific-to-heparin-not-effective-for-warfarin framing — verify precisely; this connects to and should be consistent with the existing anticoagulants and warfarin/vitamin-K-reversal modules, and heparin-vs-warfarin monitoring/reversal-agent precision is a high-consequence, precisely-tested topic (using the wrong reversal agent could fail to address a bleeding emergency).
- 🔴 Heat-source-increases-absorption/overdose-risk claim and not-appropriate-for-opioid-naive-client framing — verify precisely; this connects to and should be consistent with the existing opioid-analgesics module, and fentanyl patch safety is a high-consequence, precisely-tested medication-safety topic.

**Update (2026-08-26, round 151):** three more modules added (digoxin
narrow therapeutic index/toxicity signs, MAOI tyramine interaction,
corticosteroids/abrupt discontinuation risk):

- 🔴 Hypokalemia-increases-toxicity-risk-even-at-therapeutic-level claim and apical-pulse-check-before-administration-not-skippable-based-on-how-client-feels framing for digoxin — verify precisely; this connects to and should be consistent with the existing lithium and phenytoin narrow-therapeutic-index modules, and digoxin toxicity recognition is a classic, high-consequence, precisely-tested topic.
- 🔴 Tyramine-buildup-precipitates-hypertensive-crisis claim and verify-full-medication-list-before-starting-due-to-dangerous-combination-risk framing for MAOIs — verify precisely; this connects to and should be consistent with the existing SSRI discontinuation-syndrome module, and MAOI dietary/medication interaction safety is a high-consequence, precisely-tested topic.
- 🟡 Abrupt-discontinuation-precipitates-adrenal-insufficiency-not-symptom-dependent claim and masks-infection-signs-monitor-closely framing for corticosteroids — verify; connects to and should be consistent with the existing anticholinergic-effects-and-older-adult-risk module.

**Update (2026-08-27, round 160 — milestone):** three more modules added
(levodopa-carbidopa antiparkinson considerations, erythropoiesis-
stimulating agents, antiretroviral therapy adherence):

- 🟡 Carbidopa-reduces-peripheral-breakdown-allowing-more-levodopa-to-brain claim and high-protein-meal-timing-interferes-with-absorption framing for levodopa-carbidopa — verify; connects to and should be consistent with the existing Parkinson's disease module (Physiological Adaptation).
- 🟡 Adequate-iron-stores-needed-for-effectiveness-not-independent-of-iron-status claim and increases-blood-viscosity-BP-monitoring-relevant framing for erythropoiesis-stimulating agents — verify; connects to and should be consistent with the existing iron-supplementation module and the newly-added iron-studies module (Reference Material, round 159).
- 🔴 Near-perfect-adherence-required-inconsistent-adherence-allows-resistance-not-low-consequence-shortcut claim and significant-interactions-verify-full-medication-list framing for antiretroviral therapy — verify precisely; this connects to and should be consistent with the existing HIV-and-AIDS-nursing-concepts module (Physiological Adaptation), and antiretroviral adherence is a high-consequence, precisely-tested topic.

---

## Reduction of Risk Potential

- 🔴 General adult vital sign reference ranges (heart rate ~60–100 bpm, respiratory rate ~12–20/min, temperature ~97–99°F, blood pressure referenced around 120/80 mmHg) — explicitly flagged in the content itself as requiring verification; blood pressure category thresholds in particular have been revised by guideline bodies over time and the content does not commit to a specific current classification.
- 🟢 Vital sign trend over time is at least as informative as a single reading.
- 🟢 Baseline vital signs before a procedure enable recognizing a real change afterward.
- 🟢 Diagnostic test category definitions (lab/imaging/invasive/noninvasive) — general, low risk.
- 🟡 Local infection signs (redness, warmth, swelling, drainage, pain, possible fever) and bleeding signs (visible blood, dropping BP, rising HR, dizziness) — verify completeness of each list.
- 🟢 The nursing process / ADPIE (Assess, Diagnose, Plan, Implement, Evaluate) — extremely standard, low risk, verify step names/order.

**Update (2026-08-11):** three new modules added (postop complications, blood
transfusion safety, specimen collection):

- 🔴 Postoperative complication timing/prevention (atelectasis via early ambulation/incentive spirometry, DVT/PE via ambulation/SCDs/prophylactic anticoagulation, paralytic ileus requiring bowel sounds before diet advancement) and evisceration first-response (sterile saline-soaked dressing, never push tissue back in, notify provider immediately) — verify the evisceration first-response precisely; this is a classic, precisely-tested surgical emergency.
- 🔴 Blood transfusion safety (two-nurse independent identity/product verification, remain with client first 15 minutes, stop-immediately-not-slow-down as the first response to a suspected reaction) — verify each claim precisely, especially the "stop immediately" framing versus any scenario where slowing might be taught instead.
- 🟡 Specimen collection principles (label at bedside immediately after collection, collect cultures before starting antibiotics) — verify.

**Update (2026-08-11, round 4):** three more modules added (pain assessment, 12-lead ECG basics, imaging safety):

- 🟡 Self-report as the most reliable pain indicator, and behavioral pain scales for clients who cannot self-report — standard pain-management principle, verify framing.
- 🟢 P wave / QRS complex / T wave basic ECG concept mapping (atrial depolarization / ventricular depolarization / ventricular repolarization) — standard, low risk, verify definitions precisely since they are easy to swap.
- 🟡 Pre-contrast screening (kidney function, contrast allergy history) and pre-MRI metal/implant screening — verify both screening checklists for completeness; these are safety-critical but were kept at a conceptual level (no specific implant types or contrast agents named).

**Update (2026-08-11, round 10):** three more modules added (pressure injury staging, fall risk assessment, compartment syndrome):

- 🔴 Pressure injury staging definitions (Stage 1-4, unstageable) and the never-re-stage-backward-while-healing rule — verify each stage definition and the re-staging rule precisely; staging errors are a classic, precisely-tested wound-care topic.
- 🟡 Structured fall-risk scoring concept and the reassess-after-condition-change requirement — verify against a named tool (e.g., Morse Fall Scale) if reviewers want more specificity; deliberately kept generic/unnamed here.
- 🔴 Compartment syndrome "6 P's" (with pain-out-of-proportion as early, pulselessness/paralysis as late/ominous) and the loosen-dressing-plus-notify-immediately response — verify precisely; this is a genuinely dangerous, time-sensitive surgical emergency where the early-vs-late distinction is the whole clinical point.

**Update (2026-08-12, round 14):** three more modules added (chest tube basics, wound drains, tracheostomy care):

- 🔴 Chest tube positioning (below chest level), tidaling-as-normal vs. continuous-bubbling-as-air-leak distinction, and dislodged-tube emergency response (occlusive dressing taped on three sides) — verify all three precisely; a reversed tidaling/air-leak interpretation or wrong dislodgement response would be a serious, checkable error.
- 🟡 Closed wound drain (JP-style) maintenance and the sudden-increase/color-change reporting criteria — verify.
- 🟡 Tracheostomy bedside-emergency-equipment requirement and as-needed (not scheduled) suctioning principle — verify.

**Update (2026-08-13, round 23):** three more modules added (CLABSI
prevention, IV site complications, oxygen therapy delivery/safety):

- 🔴 CLABSI prevention (daily-necessity-assessment/prompt-removal principle, systemic-signs-without-visible-site-changes framing) — verify precisely; central-line infection prevention is a high-consequence, precisely-tested patient-safety topic.
- 🔴 Infiltration vs. extravasation vs. phlebitis distinctions (vesicant vs. non-vesicant, fluid-leaking-into-tissue vs. vein-inflammation-only) and the stop-infusion-immediately-for-either response — verify each presentation-to-term mapping precisely; conflating these three is a common learner error this module aims to prevent, so accuracy here matters.
- 🟡 Oxygen delivery device flow comparison (nasal cannula lower-flow vs. face mask/non-rebreather higher-flow) and oxygen-supports-combustion fire-safety framing — verify; deliberately no specific liter-flow or percentage-FiO2 numbers given per device, which real content eventually should have added once verified.

**Update (2026-08-13, round 32):** three more modules added (preoperative
teaching/checklist, surgical site infection prevention, rapid response
criteria):

- 🟡 Preoperative checklist elements (NPO status, allergies, site/procedure verification) and preop-teaching-before-surgery-eases-postop-participation framing — verify; deliberately general, no facility-specific checklist asserted as universal.
- 🔴 Perioperative normothermia as an SSI risk factor, and SSI-can-develop-days-later (not only in immediate postop hours) framing — verify precisely; underestimating SSI's delayed-onset window could lead a learner to stop monitoring too early.
- 🔴 Rapid-response-criteria-trigger-before-arrest framing and any-team-member-can-activate (not only most senior nurse) claim — verify precisely; the who-can-activate claim in particular is safety-critical, since a learner who believes only a senior nurse can activate could hesitate during a genuine emergency.

**Update (2026-08-14, round 42):** three more modules added (NG tube
placement verification, PICC line care, code status verification before
emergency response):

- 🔴 X-ray-as-most-reliable-verification-method-especially-at-initial-placement claim, and verify-before-each-use-not-assumed-correct framing — verify precisely; NG tube misplacement (e.g., into the respiratory tract) is a classic, high-consequence, precisely-tested safety topic.
- 🟡 PICC-line-same-central-line-principles-despite-peripheral-insertion claim and avoid-BP-measurement-on-PICC-arm guidance — verify; deliberately general, no specific PICC-arm restriction list (e.g., blood draws specifically) beyond BP measurement given.
- 🔴 When-uncertain-default-to-initiating-resuscitation claim — verify precisely; this is a genuinely high-stakes, ethically and legally significant claim where an error could meaningfully mislead a learner about the correct default action during a real emergency with unclear code status.

**Update (2026-08-14, round 49):** three more modules added (moderate
sedation monitoring, peripheral pulse assessment technique, wound culture
collection technique):

- 🔴 Continuous-monitoring-standard-not-optional claim and unresponsive-to-verbal-commands-indicates-beyond-intended-level framing — verify precisely; moderate sedation monitoring is a high-consequence, precisely-tested safety topic where the responsiveness-as-depth-indicator claim must be accurate.
- 🟡 Bilateral-pulse-comparison-identifies-asymmetry and report-promptly-not-wait-for-next-scheduled-assessment claims — verify; connects to and should be consistent with the existing compartment syndrome module's urgency framing.
- 🟡 Culture-from-viable-tissue-not-surface-debris and clean-before-culturing claims — verify; standard wound-culture technique principle, deliberately no specific culture-collection device or transport-medium detail given.

**Update (2026-08-14, round 56):** three more modules added (point-of-care
glucose testing accuracy, allergy documentation/identification, fall
prevention bundles):

- 🟡 Inadequately-cleaned-fingertip-causes-falsely-elevated-reading claim and reassess-technique-before-treating-mismatched-result guidance — verify precisely; a learner treating a spurious point-of-care result as accurate could lead to an incorrect clinical action.
- 🟡 Document-specific-reaction-type-not-just-substance-name and visible-identifier-reduces-missed-allergy-risk claims — verify; standard medication-safety documentation principle, deliberately general.
- 🟢 Fall-prevention-bundle-follows-risk-identification and reassess/adjust-over-time framing — standard, low risk, complements the existing fall risk assessment module without asserting a specific bundle-component list as universal.

**Update (2026-08-14, round 63):** three more modules added (negative
pressure wound therapy, central venous pressure monitoring, peripheral IV
insertion site selection):

- 🟡 Broken-seal-means-therapy-not-functioning-even-if-dressing-in-place claim — verify precisely; a learner assuming a physically-present dressing is automatically effective could miss a genuine therapy-failure scenario.
- 🟡 Low-CVP-suggests-inadequate-volume/high-CVP-suggests-overload-or-impaired-cardiac-function direction claims — verify precisely; a reversed low/high interpretation would be a meaningful factual error, and this connects to the existing shock module's volume-status framing.
- 🟢 Distal-first-site-selection-preserves-proximal-sites and avoid-compromised-circulation/lymphatic-flow-limb framing — standard, low risk, general IV-therapy practice principle.

**Update (2026-08-14, round 70 — course crosses 3,000 slides):** three more
modules added (pulse oximetry accuracy considerations, bladder
scanning/post-void residual, chest physiotherapy/postural drainage):

- 🟡 Nail-polish/poor-perfusion/motion-cause-inaccurate-readings and reassess-rather-than-treat-mismatched-number claims — verify precisely; this mirrors the existing point-of-care-glucose-accuracy module's pattern and pulse oximetry accuracy is a genuinely important, frequently-tested clinical-reasoning topic.
- 🟡 Bladder-scan-noninvasive-PVR-assessment and subjective-report-not-reliable-confirmation-of-complete-emptying claims — verify; connects to and should be consistent with the existing urinary catheter content.
- 🟢 Chest-PT/postural-drainage-complements-not-replaces-incentive-spirometry-and-ambulation framing and avoid-immediately-after-full-meal-timing guidance — standard, low risk, general pulmonary risk-reduction concept.

**Update (2026-08-16, round 77):** three more modules added (arterial line
monitoring, capillary refill/skin turgor assessment, pain scale
selection):

- 🔴 Accidental-disconnection-is-hemorrhage-emergency-not-minor-issue claim and transducer-leveling-required-for-accurate-readings framing — verify precisely; arterial line disconnection is a high-consequence, precisely-tested emergency where understating urgency could delay a life-threatening bleeding response.
- 🟡 Delayed-return-warrants-evaluation and older-adult-skin-elasticity-affects-turgor-interpretation claims — verify; connects to and should be consistent with the existing peripheral pulse assessment and older-adult skin content.
- 🟢 Scale-selection-matched-to-communication-ability and behavioral-assessment-for-clients-who-cannot-self-report framing — standard, low risk, connects to the existing pain assessment module without asserting a specific named scale as universal.

**Update (2026-08-16, round 84):** three more modules added (continuous
bladder irrigation, traction principles, skin graft care):

- 🔴 Subtract-irrigant-to-calculate-true-urine-output claim and obstructed-outflow-with-continued-inflow-causes-bladder-distension framing — verify precisely; the true-output-calculation method is a specific, checkable, frequently-tested clinical-math/safety fact.
- 🟡 Weights-must-hang-freely-not-rest-on-bed/floor claim and impaired-neurovascular-status-should-be-reported-not-attributed-to-device framing — verify; standard orthopedic-safety concept, deliberately no specific traction type named.
- 🟡 Immobilization-protects-delicate-new-blood-supply and ongoing-assessment-for-graft-failure-signs framing — verify; connects to and should be consistent with the existing burn injuries module.

**Update (2026-08-19, round 91):** three more modules added (hemodialysis/
peritoneal dialysis safety, seizure precautions bedside setup, restorative
care/rehabilitation principles):

- 🔴 No-BP/blood-draws/IV-on-AV-fistula-arm claim and absent-thrill/bruit-warrants-reporting framing, plus cloudy-peritoneal-dialysate-suggests-peritonitis claim — verify precisely; AV fistula precautions are a classic, high-consequence, precisely-tested renal-safety topic, and this connects directly to the existing AKI/CKD and peritonitis modules.
- 🟢 Proactive-not-reactive-equipment-setup and goal-is-injury-reduction-not-seizure-prevention framing — standard, low risk, connects to the existing seizure-safety and emergency-equipment-readiness content.
- 🟢 Encourage-self-completion-not-caregiver-does-everything and extra-time-supports-functional-recovery framing — standard, low risk, general rehabilitation concept.

**Update (2026-08-19, round 98):** three more modules added (telemetry
monitoring, wound irrigation technique, safe injection practices):

- 🟡 Artifact-can-mimic-a-dysrhythmia and assess-the-client-directly-before-treating-tracing-as-real framing — verify; connects to and should be consistent with the existing dysrhythmia-recognition content, and is a common source of alarm-fatigue-related nursing error.
- 🟡 Least-to-most-contaminated-irrigation-flow-direction claim and excessive-pressure-damages-granulation-tissue framing — verify; connects to and should be consistent with the existing wound-culture-collection module.
- 🔴 Never-reinsert-used-needle-into-vial claim and never-share-needle-between-clients-even-with-vial-change framing — verify precisely; safe injection practice is a high-consequence, precisely-tested infection-control topic with well-documented real-world outbreak history.

**Update (2026-08-19, round 107):** three more modules added (suctioning
technique, PCA pump safety, chest tube drainage system assessment):

- 🔴 Hyperoxygenate-before-suctioning/limit-pass-duration claim and suction-only-on-withdrawal-not-insertion technique — verify precisely; connects to and should be consistent with the existing tracheostomy-care module, and suctioning-induced-hypoxia prevention is a high-consequence, precisely-tested skill-based safety topic.
- 🔴 PCA-relies-on-client-sedation-as-built-in-safety-mechanism claim and PCA-by-proxy-defeats-this-mechanism-risking-overdose framing — verify precisely; this connects to and should be consistent with the existing opioid-analgesic module, and PCA-by-proxy is a classic, high-consequence, precisely-tested medication-safety topic.
- 🟡 Tidaling-expected-vs-continuous-bubbling-suggests-air-leak distinction — verify; connects to and should be consistent with the existing chest-tube-basics module.

**Update (2026-08-24, round 116):** three more modules added (12-lead ECG
lead placement, incentive spirometry, central venous access device types):

- 🟡 Precise-anatomical-landmarks-required-for-precordial-leads/approximate-placement-not-acceptable claim — verify; connects to and should be consistent with the existing general 12-lead-ECG-concept module.
- 🟡 Slow-deep-sustained-breath-with-brief-hold-vs-quick-shallow-breaths technique distinction and reaching-target-number-without-true-technique-does-not-provide-same-benefit framing — verify; connects to and should be consistent with the existing common-postoperative-complications module's atelectasis-prevention content.
- 🟡 PICC-vs-tunneled-vs-implanted-port distinction(placement/duration/infection-risk/maintenance) — verify; connects to and should be consistent with the existing PICC-line-care module.

**Update (2026-08-24, round 125):** three more modules added (wound
debridement, CGM vs. point-of-care testing, neurovascular six Ps):

- 🟡 Debridement-methods(mechanical/sharp-surgical/enzymatic/autolytic)-vary-in-speed-and-selectivity/no-single-method-fits-every-wound claim — verify; connects to and should be consistent with the existing wound-dressing-types module.
- 🟡 CGM-measures-interstitial-fluid-at-intervals-vs-point-of-care-single-blood-value claim and brief-lag-can-occur-especially-with-rapid-glucose-change framing — verify; connects to and should be consistent with the existing point-of-care-blood-glucose-testing module.
- 🔴 Six-Ps(pain/pallor/pulselessness/paresthesia/paralysis/poikilothermia) framework and paralysis/pulselessness-as-later-more-concerning-findings-not-wait-for-them-before-reporting claim — verify precisely; this connects to and should be consistent with the existing peripheral-pulse-assessment and compartment-syndrome modules, and neurovascular-finding-urgency precision is a high-consequence, precisely-tested topic.

**Update (2026-08-24, round 134):** three more modules added (post-anesthesia
recovery monitoring, mean arterial pressure, smart pump technology):

- 🔴 Airway-patency-and-respiratory-status-immediate-priority/track-LOC-as-ongoing-not-single-check claim — verify precisely; this connects to and should be consistent with the existing preoperative-teaching and common-postoperative-complications modules, and post-anesthesia airway monitoring is a high-consequence, precisely-tested safety topic.
- 🟡 MAP-more-useful-than-systolic-alone-for-perfusion/accounts-for-diastolic-phase claim — verify; connects to and should be consistent with the existing vital-signs and arterial-line-monitoring modules.
- 🟡 Alert-signals-safety-check-not-obstacle/pause-and-verify-not-routinely-override claim — verify; connects to and should be consistent with the existing high-alert-medications module.

**Update (2026-08-25, round 143):** three more modules added (chest tube
removal, multimodal analgesia, peripheral IV catheter gauge selection):

- 🟡 Valsalva-maneuver-reduces-air-entry-during-removal claim and occlusive-dressing-applied-promptly-not-left-uncovered framing — verify; connects to and should be consistent with the existing chest-tube-basics and chest-tube-drainage-system modules.
- 🟡 Different-mechanisms-combined-not-same-class-repeated claim and potentially-lower-opioid-dose-with-improved-control framing — verify; connects to and should be consistent with the existing pain-assessment and pain-scales modules.
- 🟡 Larger-diameter-smaller-gauge-number-for-rapid-infusion/blood-products claim and gauge-mismatch-can-limit-flow-or-damage-RBCs framing — verify; connects to and should be consistent with the existing peripheral-IV-insertion-site-selection module.

**Update (2026-08-26, round 152):** three more modules added (blood
transfusion administration safety, pressure injury staging, sequential
compression devices/mechanical VTE prophylaxis):

- 🔴 Two-nurse-independent-verification-before-starting claim and remain-with-client-first-several-minutes-most-reactions-occur-early framing for blood transfusion — verify precisely; this connects to and should be consistent with the existing peripheral-IV-catheter-gauge-selection module, and transfusion administration safety is a high-consequence, precisely-tested topic (wrong-product administration can cause a fatal hemolytic reaction).
- 🔴 Stage-1-intact-non-blanchable-redness-vs-stage-3-full-thickness-skin-loss-distinction claim and deep-tissue-injury-can-present-as-intact-discolored-skin-without-open-wound framing — verify precisely; this connects to and should be consistent with the existing wound-debridement module, and pressure injury staging is a foundational, precisely-tested wound-care topic.
- 🟡 Mechanical-not-pharmacological-mechanism claim and contraindicated-on-limb-with-suspected/confirmed-DVT framing for sequential compression devices — verify; connects to and should be consistent with the existing traction and restorative-care modules.

**Update (2026-08-27, round 161):** three more modules added (pacemaker
safety/monitoring, indwelling urinary catheter insertion, extubation
readiness assessment):

- 🔴 EMI-can-interfere-not-entirely-unaffected claim and failure-to-capture-assess-actual-pulse-not-pacing-spikes-alone framing for pacemaker safety — verify precisely; this connects to and should be consistent with the existing 12-lead-ECG-lead-placement module, and failure-to-capture recognition is a high-consequence, precisely-tested cardiac-monitoring topic.
- 🔴 Sterile-contact-contamination-requires-restart claim and confirm-urine-return-before-balloon-inflation-not-immediate-inflation framing for indwelling catheter insertion — verify precisely; this connects to and should be consistent with the existing CAUTI-prevention module (Safety and Infection Control), and balloon-inflation-before-confirmed-placement is a high-consequence, precisely-tested procedural-safety topic.
- 🟡 Gag-reflex/follow-commands-relevant-not-ventilator-duration-alone claim and reintubation-equipment-readily-available-not-assumed-unnecessary framing for extubation readiness — verify; connects to and should be consistent with the existing post-anesthesia-recovery module.

---

## Physiological Adaptation

This unit was deliberately written to avoid specific numeric clinical thresholds —
see the module's own opening note. General claims to verify:

- 🟡 Homeostasis/compensation/decompensation framing — general physiology concept, verify.
- 🟡 General signs of fluid volume excess (edema, crackles) vs. deficit (dry mucous membranes, reduced skin turgor, rising heart rate) — verify each list; no specific lab or vital-sign threshold given.
- 🟢 Electrolyte imbalance — general "narrow range, both directions cause problems" framing, no specific electrolyte or numeric range named yet.
- 🟡 General emergency-escalation findings (sudden LOC change, sudden severe pain, new/worsening difficulty breathing) — verify this is a reasonable, non-exhaustive general list.
- 🟢 "Reassess and notify provider" as the general response to an unexpected therapy response — process-level, not diagnosis-specific.
- 🟢 Compensatory mechanism example (rising heart rate in response to blood volume loss) — standard, general physiology.

**Update (2026-08-11):** the unit was expanded with 10 named-condition modules following the coverage-gap discussion. Each names a real condition and its hallmark signs/priorities:

- 🔴 Heart failure — left-sided (pulmonary: dyspnea/crackles) vs. right-sided (peripheral edema) symptom mapping; daily weight as an early fluid-retention indicator — verify the left/right symptom mapping precisely.
- 🔴 Myocardial infarction — symptom list (chest pain/pressure possibly radiating to arm/jaw/back, diaphoresis, shortness of breath), immediate-escalation priority, 12-lead ECG as a diagnostic tool — verify symptom list completeness; deliberately did not include a specific medication protocol/mnemonic (e.g. "MONA") since current guidance on that has shifted and a wrong specific protocol is worse than none.
- 🔴 COPD — pursed-lip breathing technique, and oxygen requiring careful individualized titration (deliberately no specific target SpO2 range given, flagged in-content as needing verification) — verify.
- 🟡 Pneumonia — signs (fever, productive cough, crackles) and supportive care (fluids, deep breathing/coughing) — standard, verify.
- 🟢 Stroke/FAST — Face, Arm, Speech, Time; public awareness mnemonic — low risk, verify wording matches the standard FAST acronym.
- 🟡 Seizure safety — never restrain, never place anything in the mouth, recovery position after — verify; these are commonly taught safety rules but should be confirmed as current standard guidance.
- 🟡 AKI vs. CKD — sudden/potentially-reversible vs. gradual/generally-not-reversible framing — verify.
- 🔴 DKA — fruity breath odor, rapid breathing, dehydration as general warning signs, immediate-escalation framing — verify signs list; no specific glucose/ketone thresholds given (deliberately).
- 🔴 Sepsis — warning signs (fever or low temp, rapid HR, rapid RR, new confusion), early-recognition-improves-outcomes framing — verify; deliberately did not cite a specific bundle protocol or "golden hour" timeframe since those specifics vary/change and are easy to get wrong.
- 🟡 GI bleed — melena vs. coffee-ground emesis vs. bright red blood (upper vs. lower GI source framing), shock signs — verify the upper/lower source associations precisely.

**Not yet covered:** specific numeric lab/vital-sign thresholds tied to any of these conditions, and specific medication/treatment protocols for any of them (e.g., what's actually given for an MI, DKA, or sepsis beyond "escalate immediately"). None of that exists in the course yet.

**Update (2026-08-11, round 2):** eight more named-condition modules added (asthma, anaphylaxis, appendicitis/peritonitis, bowel obstruction, thyroid disorders, Alzheimer's/dementia, burns):

- 🔴 Asthma "quiet chest" as a worsening/dangerous sign rather than improvement — verify precisely; this is a subtle, easy-to-misremember safety point that inverts the intuitive reading of "less wheezing."
- 🔴 Anaphylaxis signs (hives, angioedema, respiratory distress, rapid BP drop) and epinephrine-first-line-not-delayed-for-antihistamines framing — verify precisely; this is among the highest-acuity content in the course.
- 🔴 Appendicitis (RLQ/McBurney's point pain, avoid heat/laxatives) and the sudden-pain-relief-as-rupture-warning-sign claim — verify the rupture/peritonitis warning-sign framing precisely, since it inverts the intuitive reading of "pain went away = better."
- 🟡 Bowel obstruction bowel-sound progression (hyperactive early → absent late) and fecal vomiting as a late/urgent sign — verify.
- 🟡 Hyper- vs. hypothyroidism symptom mapping and thyroid storm as a medical emergency — verify the symptom-to-condition mapping precisely; this is a classic paired-contrast NCLEX topic.
- 🟡 Dementia communication strategies (redirect not argue, simple/short sentences) and sundowning definition — verify.
- 🔴 Burn-injury priorities (ABC/airway first even without visible airway burns, inhalation-injury warning signs, fluid-shift/hypovolemic-shock risk, urine output as a fluid-resuscitation indicator) — verify precisely.

**Update (2026-08-11, round 5):** eight more named-condition modules added (DVT/PE, hypertensive crisis, cirrhosis/hepatic encephalopathy, pancreatitis, HIV/AIDS, lupus/RA, osteoporosis, UTI/pyelonephritis):

- 🔴 DVT never-massage rule and PE as a sudden-onset medical emergency (dyspnea, pleuritic chest pain, tachycardia) — verify the never-massage rule and PE symptom cluster precisely; classic high-yield content.
- 🟡 Hypertensive urgency vs. emergency distinction (organ damage as the differentiator) — verify.
- 🔴 Cirrhosis complications (ascites, esophageal varices, hepatic encephalopathy) and the confusion-suspect-hepatic-encephalopathy framing — verify precisely.
- 🟡 Acute pancreatitis presentation (epigastric pain radiating to back, worse with fatty food) and NPO-initial-management framing — verify.
- 🔴 HIV/CD4/AIDS relationship, and ART adherence's role in viral suppression/transmission reduction — verify precisely; a stigmatized, high-consequence topic where imprecision is especially costly.
- 🟡 Lupus flare/remission pattern and RA symmetric-joint/morning-stiffness-improves-with-movement pattern — verify both symptom patterns, since they are classic paired-contrast content.
- 🟡 Osteoporosis fall-prevention/fracture-risk framing and hip-fracture mortality/independence-loss risk in older adults — verify.
- 🟡 UTI vs. pyelonephritis symptom escalation, and atypical (confusion-first) UTI presentation in older adults — verify the atypical-presentation claim precisely, since it is a genuinely easy-to-miss but well-established geriatric pattern.

**Update (2026-08-11, round 9):** six more named-condition modules added (peripheral vascular disease, cataracts/glaucoma, anemia/sickle cell crisis, Parkinson's, MS, Guillain-Barré):

- 🔴 Arterial vs. venous insufficiency symptom mapping (pain-with-elevation direction, skin temperature, pulses, edema) — verify precisely; a classic paired-contrast topic where reversing the pattern is a common and consequential error.
- 🟡 Cataract vs. glaucoma distinction and glaucoma's irreversible-vision-loss framing — verify the irreversibility claim precisely, since it directly motivates the adherence-teaching point.
- 🔴 Sickle cell vaso-occlusive crisis triggers (dehydration, hypoxia, infection, cold) and the aggressive-pain-management-not-minimized framing, plus the cold-avoidance rationale in the exercise explanation — verify all three precisely; pain-minimization in sickle cell crisis is a well-documented real-world harm this content is trying to counter, so the framing itself should be checked for accuracy and appropriate sensitivity.
- 🟡 Parkinson's TRAP features and strict medication-timing/"off periods" claim — verify the TRAP acronym and the timing-sensitivity claim precisely.
- 🟡 MS relapsing-remitting pattern and MS-fatigue-is-a-real-symptom-not-deconditioning framing — verify.
- 🔴 GBS ascending-paralysis pattern and respiratory-monitoring-as-priority framing — verify precisely; a reversed or incomplete understanding of this pattern could delay recognition of a genuine respiratory emergency.

**Update (2026-08-12, round 16):** four more modules added (osteoarthritis, potassium imbalance, hypo/hyperglycemia recognition, cellulitis/wound infection):

- 🟡 OA vs. RA symptom-pattern contrast (activity-worsens vs. movement-improves) — verify; a classic paired-contrast topic, builds on the existing RA content from round 5.
- 🔴 Potassium's cardiac-conduction role (both high and low levels cause arrhythmia risk) and the never-rapid-IV-push rule for IV potassium — verify precisely; the rapid-push prohibition is a genuinely dangerous, high-consequence safety fact.
- 🟡 Hypoglycemia (fast-developing, prompt-carbohydrate-treatment) vs. hyperglycemia (gradual-developing) contrast — verify; deliberately no specific glucose numeric thresholds given.
- 🟡 Cellulitis border-marking rationale and lymphangitis/spreading-redness as reportable findings — verify.

**Update (2026-08-13, round 26):** three more modules added (increased
intracranial pressure, shock types/early recognition, atrial
fibrillation/dysrhythmias):

- 🔴 Decreasing level of consciousness as the earliest/most sensitive ICP sign, and Cushing's triad (widening pulse pressure, bradycardia, irregular respirations) as a late finding — verify precisely; a reversed early-vs-late framing here could seriously mislead a learner about how urgently to act on early neuro changes.
- 🔴 Shock-can-precede-hypotension-due-to-compensation framing, and the hypovolemic/cardiogenic/septic type distinction with differing treatment — verify precisely; underrecognizing compensated shock is a high-consequence, classically-tested NCLEX safety gap.
- 🔴 Atrial fibrillation's irregularly-irregular-pulse characterization and its stroke-risk-driving-anticoagulant-therapy connection — verify precisely; the AFib/anticoagulation link is frequently tested and a learner who misses the connection could misunderstand why the medication is prescribed.

**Update (2026-08-13, round 35):** three more modules added (delirium vs.
dementia, meningitis, Addison's disease/adrenal insufficiency):

- 🔴 Delirium (acute, fluctuating, often reversible) vs. dementia (gradual, progressive) distinction, and the new-acute-confusion-should-prompt-investigation-not-be-attributed-to-dementia claim — verify precisely; this is a classic, high-consequence NCLEX topic where an error could lead a learner to miss a reversible cause of confusion.
- 🔴 Meningitis symptom triad (fever, severe headache, nuchal rigidity) and the initiate-droplet-precautions-promptly-not-after-confirmation claim — verify precisely; meningitis recognition and timely precaution initiation are both high-consequence, precisely-tested safety topics.
- 🔴 Addisonian crisis as a medical emergency (not worsening ordinary fatigue) and the never-abruptly-stop-corticosteroid-replacement claim — verify precisely; the abrupt-discontinuation risk is a genuine, high-consequence medication-safety fact that connects to the existing corticosteroid module's taper guidance.

**Update (2026-08-14, round 43):** three more modules added (Cushing's
syndrome, cardiac tamponade/pericarditis, peptic ulcer disease/GI
perforation):

- 🟡 Cushing's-syndrome-as-opposite-of-Addison's framing (excess vs. deficient cortisol) and long-term-corticosteroid-use-can-produce-Cushing's-like-features claim — verify precisely; the symptom-pattern contrast (weight gain/hyperglycemia vs. weight loss/hypotension) is the kind of paired-contrast content that should be checked for accuracy on both sides.
- 🔴 Beck's triad (muffled heart sounds, JVD, hypotension) as a classic-but-not-always-fully-present cardiac tamponade finding, and progressively-compromises-pumping-capacity framing — verify precisely; cardiac tamponade recognition is a high-consequence, precisely-tested emergency topic.
- 🔴 Perforation symptom triad (sudden severe pain, rigid board-like abdomen) and perforation-as-surgical-emergency-with-peritonitis-risk framing — verify precisely; this connects to and should be checked for consistency with the existing appendicitis/peritonitis module.

**Update (2026-08-14, round 50):** three more modules added (myasthenia
gravis, heat-related illness, hypothermia/frostbite):

- 🔴 Fatigable-weakness-worsens-with-activity-improves-with-rest framing and myasthenic-crisis-as-respiratory-emergency claim — verify precisely; the activity/rest relationship is the defining diagnostic feature of myasthenia gravis and must be stated correctly (not reversed), and myasthenic crisis is a high-consequence emergency requiring accurate description.
- 🔴 Altered-mental-status-as-the-key-heat-stroke-vs-heat-exhaustion-distinguishing-feature and rapid-cooling-should-begin-promptly-at-scene claims — verify precisely; heat stroke recognition and immediate-cooling urgency are classic, high-consequence, precisely-tested emergency topics.
- 🟡 Gradual-not-rapid-rewarming-for-hypothermia claim and frostbite-and-hypothermia-are-distinct-assess-independently framing — verify precisely; the rapid-rewarming-causes-complications claim is a specific, checkable safety fact that should be confirmed against current cold-injury management guidance.

**Update (2026-08-14, round 57):** three more modules added (ARDS, DIC,
diverticulitis):

- 🔴 ARDS-causes-refractory-hypoxemia-not-easily-corrected-by-oxygen-alone claim and often-develops-as-complication-of-sepsis/other-illness framing — verify precisely; ARDS is a high-consequence, precisely-tested respiratory emergency where understating the refractory nature of the hypoxemia could mislead a learner's clinical judgment.
- 🔴 DIC-simultaneous-paradoxical-clotting-and-bleeding claim and monitor-for-both-clot-and-bleeding-findings guidance — verify precisely; the dual/paradoxical presentation is DIC's defining and most commonly mis-simplified feature, so this must be stated correctly.
- 🟡 Diverticulitis left-lower-quadrant-vs-appendicitis-right-lower-quadrant contrast and perforation/peritonitis-complication-risk framing — verify precisely; this connects to and should be checked for consistency with the existing appendicitis and peptic-ulcer-perforation modules.

**Update (2026-08-14, round 64):** three more modules added (infective
endocarditis, osteomyelitis, rhabdomyolysis):

- 🔴 New/changed-murmur-classic-finding claim and embolization-can-cause-distant-organ-symptoms framing — verify precisely; endocarditis's embolic-complication presentation is a classic, precisely-tested topic where a learner missing the distant-organ connection could fail to recognize the underlying cause.
- 🟡 Osteomyelitis-requires-longer-treatment-than-soft-tissue-infection claim and risk-factor framing (open fracture, surgery, nearby unresolved infection) — verify; connects to and should be consistent with the existing cellulitis/wound infection module.
- 🔴 Rhabdomyolysis-causes-kidney-injury-via-released-muscle-breakdown-products claim and dark/tea-colored-urine-classic-symptom-pattern framing — verify precisely; this connects directly to the existing statin muscle-pain-reportable content, and an imprecise description of the kidney-injury mechanism or symptom pattern could mislead a learner about urgency.

**Update (2026-08-14, round 71):** three more modules added (viral
hepatitis types/transmission, toxic shock syndrome, bowel/mesenteric
ischemia):

- 🔴 Hepatitis-A-fecal-oral vs. hepatitis-B/C-blood/body-fluid transmission-route distinction — verify precisely; a reversed transmission-route claim is a classic, high-consequence infection-control error that could lead a learner to apply the wrong precaution type.
- 🟡 TSS-not-exclusively-menstruation-related framing and sudden-fever/rash/hypotension-triad-warrants-urgent-evaluation claim — verify; TSS is a rare condition, framing should avoid overstating incidence while still conveying genuine urgency when it occurs.
- 🔴 Pain-out-of-proportion-to-exam-findings-classic-bowel-ischemia-warning-sign claim — verify precisely; this is a specific, high-consequence clinical-reasoning pattern where a learner dismissing severe pain due to a benign-appearing exam could miss a time-sensitive emergency.

**Update (2026-08-16, round 78):** three more modules added (migraine
recognition/differentiation, vertigo/Meniere's disease, pulmonary
hypertension):

- 🔴 Sudden-worst-headache-of-life-or-fever/neck-stiffness/neuro-deficit-should-not-be-assumed-migraine claim — verify precisely; this connects to and should be checked for consistency with the existing stroke and meningitis modules, and understating this red-flag pattern could lead a learner to dismiss a genuine emergency as a routine migraine.
- 🟡 Vertigo-distinct-from-general-dizziness and significant-fall-risk/assist-with-movement-during-acute-episode claims — verify; connects to and should be consistent with the existing fall-prevention content.
- 🟡 Right-sided-heart-strain-from-elevated-pulmonary-artery-pressure claim and gradual-onset-does-not-mean-not-serious framing — verify; connects to and should be consistent with the existing heart failure module, deliberately no specific pressure numeric threshold given.

**Update (2026-08-16, round 85):** three more modules added (thyroid
storm/myxedema coma, peripheral neuropathy, osteoporotic compression
fracture):

- 🔴 Thyroid-storm-and-myxedema-coma-as-opposite-but-both-life-threatening claim and severe-tachycardia/fever/altered-mental-status-triad framing — verify precisely; these are rare but classic, high-consequence, precisely-tested emergencies where understating either could lead a learner to miss a genuine crisis.
- 🟡 Neuropathy-multiple-causes-not-exclusively-diabetes claim and reduced-sensation-allows-injury-to-go-unnoticed framing — verify; connects to and should be consistent with the existing diabetic foot care module.
- 🟡 Compression-fracture-can-occur-from-everyday-movement-not-only-major-trauma claim and new-unexplained-back-pain-warrants-evaluation framing — verify precisely; connects to and should be consistent with the existing osteoporosis module, and this minimal-trauma-mechanism fact is a genuinely important, easy-to-miss safety point.

**Update (2026-08-19, round 92):** three more modules added (cardiac
arrest recognition/response, acute arterial occlusion, superior vena cava
syndrome):

- 🔴 Immediate-action-call-for-help/begin-compressions-without-delay claim and minimize-interruptions-to-compressions framing — verify precisely; this is one of the most foundational, high-consequence, precisely-tested emergency-response topics in nursing, and any imprecision could directly affect real emergency response.
- 🔴 Acute-occlusion-time-sensitive-limb-threatening-distinct-from-chronic-PVD claim and cannot-safely-delay-even-if-otherwise-stable framing — verify precisely; this connects to and should be checked for consistency with the existing peripheral vascular disease module, and understating urgency could lead to limb loss in a real scenario.
- 🟡 Face/neck/upper-extremity-swelling-worsening-when-flat classic-sign claim and genuine-oncologic-emergency/HOB-elevated framing — verify; connects to and should be consistent with the existing chemotherapy/oncology content.

**Update (2026-08-19, round 101):** three more modules added (status
epilepticus, serotonin syndrome, pneumothorax/tension pneumothorax):

- 🔴 Prolonged-seizure-or-series-without-full-recovery-of-consciousness definition and airway/oxygenation/prompt-treatment-priority-not-wait-and-observe framing — verify precisely; this connects directly to the existing seizure-safety module, and status epilepticus is a high-consequence, precisely-tested neurological emergency.
- 🔴 Combining-serotonergic-medications-as-most-common-cause claim and stop-causative-medication-plus-supportive-care-as-priority-intervention framing — verify precisely; this connects to and should be consistent with the existing antidepressant/psychiatric-medication content, and is a classic, precisely-tested medication-safety emergency.
- 🔴 Tension-pneumothorax-cardiac-compression-distinct-from-simple-pneumothorax claim and immediate-response-not-wait-for-imaging framing — verify precisely; this connects directly to the existing chest-tube module, and tension pneumothorax is a rapid-onset, high-consequence emergency where response-timing precision matters.

**Update (2026-08-19, round 110 — milestone):** three more modules added
(hyponatremia/hypernatremia, testicular torsion, Bell's palsy vs. stroke):

- 🔴 Water-shifts-into-brain-cells-causing-cerebral-edema/confusion/seizures mechanism claim and gradual-not-rapid-correction-required framing — verify precisely; this connects to and should be consistent with the existing general electrolyte-imbalance module, and sodium-correction-rate safety is a high-consequence, precisely-tested topic.
- 🔴 Time-sensitive-surgical-emergency/prolonged-blood-supply-loss-risks-permanent-damage claim and immediate-evaluation-not-wait-and-see framing — verify precisely; testicular torsion timing precision is a high-consequence, classic surgical-emergency topic.
- 🟡 Forehead-sparing-distinguishes-central-from-peripheral-facial-drooping claim and still-warrants-urgent-stroke-rule-out-regardless-of-appearance framing — verify precisely; this connects directly to the existing stroke-FAST module, and this differential-diagnosis distinction carries real consequences if a stroke is missed.

**Update (2026-08-24, round 119):** three more modules added (hypercalcemia/
hypocalcemia, acute cholecystitis/cholelithiasis, retinal detachment):

- 🔴 Hypocalcemia-increases-excitability(tetany/Chvostek's/Trousseau's)-vs-hypercalcemia-decreases-excitability(lethargy/constipation) opposite-pattern claim — verify precisely; this connects to and should be consistent with the existing general electrolyte-imbalance module, and calcium-imbalance symptom-direction precision is a high-consequence, precisely-tested topic (a learner reversing the pattern could misinterpret a client's presentation).
- 🟡 RUQ-pain-after-fatty-meal-classic-trigger claim and jaundice-alongside-RUQ-pain-suggests-bile-duct-obstruction framing — verify; standard, well-established GI topic.
- 🔴 Curtain-like-shadow-classic-presenting-symptom claim and prompt-emergency-evaluation-not-wait-and-see framing — verify precisely; retinal detachment timing precision is a high-consequence, classic ophthalmologic-emergency topic where delayed evaluation risks permanent vision loss.

**Update (2026-08-24, round 128):** three more modules added (HHS vs. DKA,
Wernicke's encephalopathy, abruptio placentae vs. placenta previa):

- 🔴 HHS-lacks-significant-ketosis/acidosis-of-DKA/more-often-type-2 distinguishing claim and absence-of-Kussmaul/fruity-breath-does-not-rule-out-serious-emergency framing — verify precisely; this connects directly to the existing DKA module, and HHS-vs-DKA differentiation is a classic, high-consequence, precisely-tested endocrine-emergency topic.
- 🔴 Thiamine-deficiency-classic-triad(confusion/ataxia/eye-movement-abnormalities)-most-often-chronic-alcohol-use claim and consider-thiamine-deficiency-not-assume-intoxication/withdrawal-alone framing — verify precisely; this connects to and should be consistent with the existing alcohol-withdrawal/DTs module, and untreated progression to permanent damage makes this a high-consequence, precisely-tested topic.
- 🔴 Painful(abruption)-vs-painless(previa)-bleeding distinguishing claim and avoid-digital-exam-until-previa-ruled-out-by-ultrasound framing — verify precisely; this is a classic, high-consequence, precisely-tested obstetric-emergency topic where the wrong assessment action (digital exam) could trigger severe hemorrhage.

**Update (2026-08-24, round 137):** three more modules added (ovarian
torsion, malignant hyperthermia, acute angle-closure glaucoma):

- 🔴 Time-sensitive-surgical-emergency/prolonged-blood-supply-loss-risks-permanent-ovarian-damage claim and urgent-evaluation-not-routine-complaint framing — verify precisely; this connects to and should be consistent with the existing testicular-torsion module, and ovarian torsion timing precision is a classic, high-consequence surgical-emergency topic.
- 🔴 Rapid-temperature-rise/severe-rigidity/rapidly-rising-heart-rate-genetically-susceptible-client claim and treat-as-emergency-not-expected-mild-reaction framing — verify precisely; malignant hyperthermia is a rare but life-threatening, precisely-tested anesthesia-safety topic.
- 🔴 Sudden-onset-distinct-from-chronic-glaucoma/severe-eye-pain-halos-around-lights claim and urgent-evaluation-not-routine-scheduled-appointment framing — verify precisely; this connects directly to the existing cataracts-and-glaucoma module, and acute angle-closure glaucoma timing precision is a high-consequence, precisely-tested ophthalmologic-emergency topic where delay risks permanent vision loss.

**Update (2026-08-25, round 146):** three more modules added (toxic
megacolon, Addisonian crisis, air embolism):

- 🔴 Marked-colonic-distension/perforation-risk-peritonitis claim and worsening-distension/fever/systemic-illness-warrants-prompt-notification-not-assumed-expected framing — verify precisely; toxic megacolon is a life-threatening, precisely-tested GI-emergency complication of severe colitis.
- 🔴 Life-threatening-distinct-from-chronic-Addisons/severe-hypotension-weakness-altered-mental-status claim and abrupt-corticosteroid-discontinuation-triggers-crisis-gradual-taper-required framing — verify precisely; this connects directly to the existing Addison's-disease module, and Addisonian crisis is a high-consequence, precisely-tested endocrine emergency.
- 🔴 Air-entering-venous-system-via-open-disconnected-central-line claim and left-side-head-lowered-positioning-per-protocol-not-irrelevant framing — verify precisely; this connects to and should be consistent with the existing central-venous-access-device-types module, and air embolism positioning protocol is a high-consequence, precisely-tested emergency-response topic.

**Update (2026-08-26, round 153):** three more modules added (autonomic
dysreflexia, cauda equina syndrome, tumor lysis syndrome):

- 🔴 Triggered-by-noxious-stimulus-below-injury-level/sudden-severe-BP-rise claim and identify-and-remove-trigger-priority-not-medication-alone framing for autonomic dysreflexia — verify precisely; this connects to and should be consistent with the existing neurovascular-assessment module, and autonomic dysreflexia recognition/priority-response is a high-consequence, precisely-tested spinal-cord-injury-emergency topic.
- 🔴 Saddle-anesthesia-plus-new-bowel/bladder-dysfunction-red-flag claim and permanent-neurological-damage-risk-if-not-relieved-promptly framing for cauda equina syndrome — verify precisely; this connects to and should be consistent with the existing peripheral-neuropathy module, and cauda equina red-flag recognition is a high-consequence, precisely-tested surgical-emergency topic.
- 🔴 Electrolyte-disturbances-occur-together-as-related-cluster/risk-highest-after-treatment-begins claim for tumor lysis syndrome — verify precisely; this connects to and should be consistent with the existing chemotherapy-and-neutropenic-precautions module, and tumor lysis syndrome timing/monitoring is a high-consequence, precisely-tested oncologic-emergency topic.

**Update (2026-08-27, round 162):** three more modules added (necrotizing
fasciitis, aortic aneurysm/dissection, hip fracture):

- 🔴 Disproportionate-pain-classic-warning-sign-infection-spreads-before-visibly-apparent claim and disproportionate-pain-should-be-escalated-not-treated-as-overreaction framing for necrotizing fasciitis — verify precisely; this connects to and should be consistent with the existing wound-debridement module, and necrotizing fasciitis recognition is a high-consequence, precisely-tested surgical-emergency topic.
- 🔴 Sudden-severe-tearing-pain-distinct-from-gradual-onset claim and check-BP-both-arms-difference-associated-finding framing for aortic dissection — verify precisely; this connects to and should be consistent with the existing acute-arterial-occlusion module, and aortic dissection recognition is a high-consequence, precisely-tested cardiovascular-emergency topic.
- 🟡 Shortened/externally-rotated-leg-classic-presentation claim and VTE-prophylaxis-relevant-from-injury-not-only-after-surgical-repair framing for hip fracture — verify; connects to and should be consistent with the existing osteoporotic-compression-fracture module and the sequential-compression-devices module (Reduction of Risk Potential, round 152).

---

## Reference Material — Lab Values

Every specific number in this lesson is flagged — this is the highest
concentration of numeric clinical claims in the course, and the content itself
repeatedly states that the specific report's own reference range takes priority.

- 🔴 Sodium ~135–145 mEq/L, Potassium ~3.5–5.0 mEq/L, Calcium ~8.5–10.5 mg/dL, Magnesium ~1.5–2.5 mg/dL.
- 🔴 WBC ~5,000–10,000/mm³, Hemoglobin ~12–18 g/dL (sex-dependent), Platelets ~150,000–400,000/mm³.
- 🔴 BUN ~10–20 mg/dL, Creatinine ~0.6–1.2 mg/dL.
- 🔴 Fasting glucose ~70–100 mg/dL, and the hypo/hyperglycemia framing relative to that range.
- 🟡 INR/coagulation studies — deliberately left without a specific numeric range, since therapeutic anticoagulation targets vary by indication; verify this framing itself is accurate and sufficient, or whether a normal (unmedicated) INR range should be added.
- 🟢 The concept that reference ranges vary by lab and the client's own report takes priority — general, true regardless of the specific numbers above, but worth confirming reads correctly to a reviewer.
- 🟢 The concept of a "critical/panic value" requiring immediate notification.

**Update (2026-08-11):** three new modules added (ABGs, liver function tests,
cardiac biomarkers):

- 🔴 ABG interpretation rule-of-thumb (pH/PaCO2 opposite directions = respiratory primary problem; pH/HCO3- same direction = metabolic primary problem) and the respiratory-acidosis/metabolic-acidosis worked examples — verify the directional rule precisely; ABG interpretation is a high-value but easy-to-get-subtly-wrong NCLEX topic and deserves particularly careful review.
- 🟡 ALT vs. AST liver-specificity distinction, bilirubin/jaundice association, low albumin in chronic liver disease — verify.
- 🔴 Troponin as the primary MI biomarker, and the "single early normal troponin doesn't rule out MI, serial troponins used instead" claim — verify precisely; this directly touches diagnostic safety reasoning.

**Update (2026-08-13, round 25):** three new modules added (thyroid function
tests, lipid panel, urinalysis):

- 🔴 TSH-moves-inversely-to-thyroid-hormone framing (elevated TSH → hypothyroidism, not hyperthyroidism) — verify precisely; this directional relationship is easy to state backward and is a classic, precisely-tested NCLEX lab-interpretation topic.
- 🟡 LDL/HDL opposite-cardiovascular-risk-direction framing — verify; deliberately no specific numeric lipid targets given, since guideline-recommended targets vary and change over time.
- 🟡 Nitrites + leukocyte esterase as a UTI-suggestive urinalysis pattern, and glucose/ketones-as-clinically-significant-not-incidental framing — verify both claims; deliberately no specific gravity or pH numeric range given.

**Update (2026-08-13, round 34):** two new modules added (therapeutic drug
monitoring, blood type/Rh compatibility):

- 🟡 Therapeutic drug monitoring concept (narrow-range gap, draw-timing-affects-result, out-of-range-prompts-clinical-correlation-not-automatic-dose-change) — verify; deliberately conceptual, no specific drug or numeric therapeutic range given.
- 🔴 ABO/Rh compatibility-must-be-confirmed-before-transfusion claim and universal-donor(O-negative)/universal-recipient(AB-positive) framing — verify precisely; blood type compatibility is a classic, high-consequence, precisely-tested safety topic, and the universal donor/recipient labels must be assigned to the correct types.

**Update (2026-08-19, round 100 — milestone):** two new modules added
(hemoglobin A1c, inflammatory markers — ESR/CRP):

- 🟡 A1c-reflects-two-to-three-month-average-glucose-control claim and normal-A1c-does-not-rule-out-short-term-glucose-swings framing — verify; connects to and should be consistent with the existing blood-glucose module, and deliberately no specific numeric A1c reference range or diagnostic cutoff given.
- 🟡 ESR/CRP-as-nonspecific-inflammation-markers claim and elevated-result-does-not-confirm-a-specific-diagnosis framing — verify; deliberately conceptual, no specific numeric reference ranges given since these vary by lab and are not the focus of the conceptual framing.

**Update (2026-08-19, round 109):** two new modules added (cerebrospinal
fluid analysis, blood culture and sensitivity):

- 🔴 CSF-pattern(WBC/protein/glucose-together)-distinguishes-bacterial-vs-viral-meningitis claim and post-LP-headache-monitoring framing — verify precisely; connects directly to the existing meningitis module, and CSF interpretation is a high-consequence, precisely-tested diagnostic topic.
- 🟡 Sensitivity-testing-narrows-broad-spectrum-to-targeted-antibiotic claim and empiric-therapy-started-before-final-results-available framing — verify; connects to and should be consistent with the existing specimen-collection-principles module.

**Update (2026-08-24, round 118):** two new modules added (D-dimer,
amylase/lipase pancreatic markers):

- 🟡 D-dimer-nonspecific-can-be-elevated-by-unrelated-causes(surgery/pregnancy/infection) claim and more-useful-for-ruling-out-than-confirming framing — verify; connects to and should be consistent with the existing DVT/PE module.
- 🟡 Lipase-more-pancreas-specific-than-amylase claim and lipase-remains-elevated-longer-so-normal-amylase-does-not-rule-out-later-presentation framing — verify; connects to and should be consistent with the existing acute-pancreatitis module.

**Update (2026-08-24, round 127):** two new modules added (procalcitonin,
ammonia level):

- 🟡 Procalcitonin-more-specific-to-bacterial-than-viral-infection claim and one-piece-of-clinical-information-not-single-definitive-test framing — verify; connects to and should be consistent with the existing ESR/CRP module.
- 🟡 Ammonia-accumulates-with-impaired-liver-function-contributing-to-encephalopathy claim and does-not-perfectly-correlate-with-symptom-severity/prioritize-actual-mental-status framing — verify; connects to and should be consistent with the existing cirrhosis-and-hepatic-encephalopathy module.

**Update (2026-08-24, round 136):** two new modules added (BNP, PT/INR):

- 🟡 BNP-released-in-response-to-cardiac-stretch/elevated-supports-heart-failure-picture claim and elevated-BNP-alone-does-not-automatically-confirm-heart-failure(also-elevated-by-renal-impairment) framing — verify; connects to and should be consistent with the existing heart-failure module.
- 🔴 INR-standardizes-PT-reporting-across-labs claim and target-INR-range-individualized-by-indication-not-uniform-for-all-warfarin-clients framing — verify precisely; this connects to and should be consistent with the existing coagulation-studies and warfarin/vitamin-K-reversal modules, and INR-target individualization is a high-consequence, precisely-tested anticoagulation-monitoring topic.

**Update (2026-08-25, round 145):** two new modules added (uric acid,
vitamin B12/folate):

- 🟡 Elevated-uric-acid-associated-with-gout/crystal-deposits-classically-big-toe claim and elevated-level-alone-does-not-confirm-active-flare framing — verify; deliberately no specific numeric reference range given.
- 🟡 B12-and-folate-checked-separately-for-macrocytic-anemia-workup claim and B12-deficiency-can-cause-neurological-symptoms-folate-alone-does-not framing — verify; connects to and should be consistent with the existing general anemia content in Physiological Adaptation.

**Update (2026-08-27, round 159):** two new modules added (iron studies —
ferritin/TIBC, digoxin level and toxicity correlation):

- 🟡 Ferritin/TIBC-for-microcytic-anemia-distinct-from-macrocytic-B12/folate-pattern claim and ferritin-as-acute-phase-reactant-elevated-ferritin-not-always-adequate-iron-stores framing — verify; connects to and should be consistent with the newly-added vitamin-B12-and-folate module and the general anemia content in Physiological Adaptation.
- 🔴 Level-supports-but-is-not-sole-basis-for-suspecting-toxicity-considered-with-clinical-signs claim and hypokalemia-increases-toxicity-risk-even-at-therapeutic-level-check-potassium-alongside framing — verify precisely; this connects to and should be consistent with the existing digoxin-narrow-therapeutic-index module (Pharmacological, round 151), and digoxin level interpretation is a high-consequence, precisely-tested topic.

## Reference Material — Dosage Calculation

- 🟢 The dosage calculation formula itself (Desired ÷ Available × Quantity) and the IV flow rate formula (Volume ÷ Time) — these are stable arithmetic methods, not clinical facts, and the module explicitly avoids naming any real medication or real dose. Verify the formulas themselves are stated correctly (they are standard, but arithmetic errors are still possible) — all worked examples and practice problems use fictional placeholder drug names ("Medication X/Y/Z/A/B/C") specifically to avoid asserting real dosing as fact.

**Update (2026-08-11):** two new modules added (IV drip rate for gravity
infusion, weight-based dosage calculation):

- 🟢 The gravity-infusion drip-rate formula (Volume × Drop factor ÷ Time) — stable arithmetic method, verify the formula itself is stated correctly; uses illustrative numbers only, no real medication named.
- 🟡 Weight-based dosing method (dose-per-kg × weight) and the "independent double-check is standard, not optional" safety claim — the arithmetic method is low risk, but the safety-practice claim (that independent double-checking is a standard requirement rather than a best-practice suggestion) should be verified against current medication-safety standards.

**Update (2026-08-13, round 25):** two new modules added (critical care drip
titration, body surface area dosing):

- 🟡 Titratable-dose concept (rate-per-kg-per-time, adjusted incrementally based on response, distinct from fixed-rate infusion) — low arithmetic risk (no formula/numbers given, deliberately conceptual only), but verify the framing itself doesn't oversimplify actual titration practice.
- 🟡 Body surface area (BSA) concept (accounts for height + weight together, used for narrow-margin medications like chemotherapy) and the error-propagates-from-height/weight-input framing — verify; deliberately no BSA formula (e.g., Mosteller/DuBois) or specific numeric example given, kept conceptual only pending review.

**Update (2026-08-13, round 34):** one new module added (insulin dosage —
units, not milligrams):

- 🔴 Insulin-is-dosed-in-units-not-milligrams claim and unit-specific-syringe requirement — verify precisely; this is a foundational, frequently-tested medication-safety fact where confusion between units and other dosing bases is a real, high-consequence error type.

**Update (2026-08-19, round 100 — milestone):** one new module added
(dimensional analysis — an alternative calculation method):

- 🟢 Dimensional-analysis-as-an-alternative-to-the-basic-formula-method claim and mismatched-units-signal-a-setup-error self-checking framing — low risk, stable arithmetic-method concept; verify the method description itself is stated correctly. No real medication or numeric dose given, consistent with the rest of this section's approach.

**Update (2026-08-19, round 109):** one new module added (pediatric
weight-based dosage — divided daily doses):

- 🟡 mg/kg/day-then-divide-by-doses-per-day-as-distinct-additional-step claim and compare-against-known-safe-range-before-administering safety-check framing — verify; connects to and should be consistent with the existing weight-based-dosage-calculation module and the Pediatric Medication Safety module in the Pharmacological unit. No real medication or numeric dose given, consistent with the rest of this section's approach.

**Update (2026-08-24, round 118):** one new module added (enteral feeding
rate calculation):

- 🟢 mL/hr-rate-equals-total-volume-divided-by-total-hours claim and rate-too-high-increases-aspiration/GI-intolerance-risk framing — low risk, stable arithmetic-method concept connecting to and should be consistent with the existing enteral-nutrition-and-tube-feeding module in Basic Care and Comfort. No real numeric dose/order given, consistent with the rest of this section's approach.

**Update (2026-08-24, round 127):** one new module added (household to
metric conversion):

- 🟢 Fixed-conversion-factor-required-before-dosage-calculation and early-conversion-error-propagates-into-final-result framing — low risk, stable arithmetic-method concept. No real medication or numeric dose given, consistent with the rest of this section's approach.

**Update (2026-08-24, round 136):** one new module added (percentage
solutions):

- 🟢 Percentage-must-be-converted-to-usable-ratio-before-calculation and small-conversion-error-can-significantly-change-result-not-a-low-risk-shortcut framing — low risk, stable arithmetic-method concept. No real medication or numeric dose given, consistent with the rest of this section's approach.

**Update (2026-08-25, round 145):** one new module added (safe dose range
verification):

- 🟢 Arithmetically-correct-does-not-confirm-order-safe/distinct-additional-safety-step-checking-against-drug-reference framing — low risk, stable safety-practice concept. No real medication or numeric dose given, consistent with the rest of this section's approach.

**Update (2026-08-27, round 159):** one new module added (medication
reconstitution):

- 🟡 Concentration-depends-on-both-medication-amount-and-diluent-volume-wrong-volume-changes-concentration claim and manufacturer-specific-instructions-not-interchangeable-across-medications framing — verify; connects to and should be consistent with the existing percentage-solutions module. No real medication or numeric dose given, consistent with the rest of this section's approach.

---

## NGN Item Formats

All examples in this unit are deliberately non-clinical (colors, animals,
geography, shapes, houseplants, camping) per PRD-005/ADR-025 — no nursing content,
so clinical-accuracy risk is not applicable here. The only thing worth a reviewer's
attention is whether each example is internally self-consistent (e.g., the bowtie
plant scenario's actions/monitors logically match its chosen condition), which was
checked by hand during authoring but is worth a second look.

- 🟢 All nine modules (orientation + one per PRD-004 format: extended multiple response, bins, cloze-text, cloze-table, matrix-single, matrix-multi, bowtie, case-study cluster) — non-clinical content, internal-consistency check only.

---

All units authored as of 2026-08-10, with six broad depth-expansion passes
completed 2026-08-11: round 1 grew the course from 706 to 1,018 slides (298 to
450 exercises); round 2 (8 conditions, 4 drug classes) grew it to 1,114 slides
(490 exercises); round 3 (PTSD, eating disorders, personality disorder clusters)
grew it to 1,145 slides (505 exercises); round 4 (growth/development,
communicable disease, pain assessment, ECG basics, imaging safety) grew it to
1,192 slides (526 exercises); round 5 (8 more conditions: DVT/PE, hypertensive
crisis, cirrhosis, pancreatitis, HIV/AIDS, lupus/RA, osteoporosis, UTI) grew it
to 1,266 slides (559 exercises); round 6 (5 more drug-safety modules:
antiemetics, laxatives, controlled substances, high-alert meds, vaccines) grew
it to 1,304 slides (577 exercises); round 7 (spiritual care, complementary
health, sensory changes in older adults) grew it to 1,331 slides (587
exercises); round 8 (HIPAA, EMTALA, workplace violence, hazardous
materials/chemical safety) grew it to 1,366 slides (601 exercises); round 9 (6
more conditions: PVD, cataracts/glaucoma, anemia/sickle cell crisis,
Parkinson's, MS, Guillain-Barré) grew it to 1,419 slides (624 exercises); round
10 (pressure injury staging, fall risk assessment, compartment syndrome) grew
it to 1,445 slides (633 exercises); round 11 (anticoagulant reversal agents, IV
fluid types, TPN, pediatric medication safety) grew it to 1,482 slides (648
exercises); round 12 (preeclampsia, gestational diabetes, contraception) and
round 13 (ADHD/autism, crisis theory, complicated grief) together grew it to
1,537 slides (671 exercises); round 14 (chest tubes, wound drains,
tracheostomy care) and round 15 (latex allergy, radiation safety,
decontamination) together grew it to 1,588 slides (690 exercises); round 16
(osteoarthritis, potassium imbalance, hypo/hyperglycemia, cellulitis) grew it
to 1,621 slides (704 exercises); round 17 (staffing/floating, nursing
informatics, change-of-shift report) grew it to 1,648 slides (714 exercises);
round 18 (oral care/aspiration precautions, wound dressings, respiratory
positioning) grew it to 1,675 slides (725 exercises); round 19 (Eligibility
and Registration, Overview of NCLEX Item Types, Test-Taking Strategies, Exam
Day Logistics, Understanding Your Results and Retesting, Managing Test
Anxiety — completing the Introduction to the NCLEX-RN unit) grew it to 1,726
slides (745 exercises); round 20 (National Patient Safety Goals, Universal
Protocol/wrong-site surgery prevention, just culture/near-miss reporting)
grew it to 1,753 slides (757 exercises); round 21 (newborn assessment and
care, STI prevention/screening, healthy aging/older adult health promotion)
grew it to 1,777 slides (766 exercises); round 22 (diuretics, NSAIDs/nonopioid
analgesics, GI acid-reducing medications) grew it to 1,804 slides (778
exercises); round 23 (CLABSI prevention, IV site complications, oxygen
therapy delivery/safety) grew it to 1,830 slides (789 exercises); round 24
(mania/bipolar recognition, intimate partner violence assessment/safety
planning, de-escalation techniques) grew it to 1,855 slides (799 exercises);
round 25 (thyroid function tests, lipid panel, urinalysis, critical care drip
titration, body surface area dosing) grew it to 1,896 slides (815 exercises);
round 26 (increased intracranial pressure, shock types/early recognition,
atrial fibrillation/dysrhythmias) grew it to 1,921 slides (825 exercises);
round 27 (documentation principles, chain of command, discharge
planning/case management) grew it to 1,945 slides (834 exercises); round 28
(end-of-life comfort care, range of motion exercises, bowel/bladder
retraining) grew it to 1,970 slides (844 exercises); round 29 (elopement/
wandering precautions, CAUTI prevention, environmental/equipment safety)
grew it to 1,995 slides (854 exercises); round 30 (stages of labor,
breastfeeding/infant feeding, obesity/weight management) grew it to 2,020
slides (864 exercises); round 31 (antilipemics/statins, thyroid
replacement/antithyroid medications, herbal supplement/OTC safety) grew it
to 2,044 slides (873 exercises); round 32 (preoperative teaching/checklist,
surgical site infection prevention, rapid response criteria) grew it to
2,068 slides (882 exercises); round 33 (therapeutic relationship
boundaries/phases, hallucinations/delusions interventions, alcohol
withdrawal/delirium tremens) grew it to 2,093 slides (892 exercises); round
34 (therapeutic drug monitoring, blood type/Rh compatibility, insulin
unit-based dosing) grew it to 2,118 slides (902 exercises); round 35
(delirium vs. dementia, meningitis, Addison's disease/adrenal insufficiency)
grew it to 2,142 slides (911 exercises); round 36 (guardianship/surrogate
decision-making, client grievance process, telehealth/telenursing) grew it
to 2,166 slides (920 exercises); round 37 (bathing/skin hygiene, assistive
devices for sensory impairment, positioning to prevent contractures) grew
it to 2,190 slides (929 exercises); round 38 (MDRO contact precautions
nuances, healthcare worker immunization/occupational health, poison
prevention/pediatric safety) grew it to 2,214 slides (938 exercises); round
39 (safe sleep practices/SIDS risk reduction, fetal heart rate monitoring,
newborn screening/metabolic testing) grew it to 2,238 slides (947
exercises); round 40 (beta-blocker nursing considerations, antipsychotic
EPS/tardive dyskinesia, eye/ear medication administration technique) grew
it to 2,263 slides (957 exercises); round 41 (milieu therapy, somatic
symptom disorders, grief in children) grew it to 2,287 slides (966
exercises); round 42 (NG tube placement verification, PICC line care, code
status verification before emergency response) grew it to 2,311 slides (975
exercises); round 43 (Cushing's syndrome, cardiac tamponade/pericarditis,
peptic ulcer disease/GI perforation) grew it to 2,336 slides (985
exercises); round 44 (leadership styles, false imprisonment/assault/battery,
delegating to UAP) grew it to 2,364 slides (998 exercises); round 45
(therapeutic diets, post-mortem care, sleep hygiene) grew it to 2,389
slides (1,008 exercises) — the course has now crossed 1,000 exercises; round
46 (AIIR/negative pressure basics, home safety assessment for discharge,
seclusion monitoring requirements) grew it to 2,413 slides (1,017
exercises); round 47 (Piaget's stages, postpartum depression screening,
tobacco cessation support) grew it to 2,438 slides (1,027 exercises); round
48 (antifungal/antiviral medications, bronchodilator mechanism distinction,
antihistamine generation distinction) grew it to 2,464 slides (1,038
exercises); round 49 (moderate sedation monitoring, peripheral pulse
assessment technique, wound culture collection technique) grew it to 2,488
slides (1,047 exercises); round 50 (myasthenia gravis, heat-related illness,
hypothermia/frostbite) grew it to 2,514 slides (1,058 exercises); round 51
(PDSA quality improvement cycle, conflict resolution among the healthcare
team, POLST/MOLST portable medical orders) grew it to 2,538 slides (1,067
exercises); round 52 (oral hygiene for unconscious/intubated clients,
dysphagia diet consistency levels, prosthetic/orthotic device care) grew
it to 2,562 slides (1,076 exercises); round 53 (environmental safety for
suicide precautions, alarm fatigue/clinical alarm safety, firearm safety
counseling) grew it to 2,586 slides (1,085 exercises); round 54 (CAGE
alcohol screening, sun safety/skin cancer prevention, adolescent health
screening) grew it to 2,610 slides (1,094 exercises); round 55 (potassium
supplementation administration safety, iron supplementation,
antiarrhythmic medications) grew it to 2,634 slides (1,103 exercises); round
56 (point-of-care glucose testing accuracy, allergy documentation/
identification, fall prevention bundles) grew it to 2,658 slides (1,112
exercises); round 57 (ARDS, DIC, diverticulitis) grew it to 2,682 slides
(1,121 exercises); round 58 (root cause analysis, whistleblower
protections, standard of care) grew it to 2,706 slides (1,130 exercises);
round 59 (enteral feeding residual volume/safety checks, skin tear
prevention, nonpharmacological constipation management) grew it to 2,730
slides (1,139 exercises); round 60 — a milestone round — (sterilization
vs. disinfection, LASA medications/Tall Man lettering, active
shooter/lockdown procedures) grew it to 2,756 slides (1,150 exercises);
round 61 (preconception counseling, pediatric vision/hearing screening,
exercise recommendations across the lifespan) grew it to 2,780 slides
(1,159 exercises); round 62 (calcium supplementation, muscle relaxants,
topical/local anesthetics) grew it to 2,804 slides (1,168 exercises); round
63 (negative pressure wound therapy, central venous pressure monitoring,
peripheral IV insertion site selection) grew it to 2,828 slides (1,177
exercises); round 64 (infective endocarditis, osteomyelitis,
rhabdomyolysis) grew it to 2,853 slides (1,187 exercises); round 65 (never
events, ethics committee consultation, nurse fatigue/mandatory overtime)
grew it to 2,877 slides (1,196 exercises); round 66 (ostomy pouching/skin
barrier care, nonpharmacological dyspnea relief, repositioning
schedule/pressure redistribution) grew it to 2,901 slides (1,205
exercises); round 67 (regulated medical waste segregation, infant
abduction prevention, safe patient handling/mechanical lifts) grew it to
2,925 slides (1,214 exercises); round 68 (menopause, prenatal genetic
screening, oral health across the lifespan) grew it to 2,949 slides (1,223
exercises); round 69 (magnesium sulfate obstetric/general considerations,
sedative-hypnotics for sleep, antitussives/expectorants) grew it to 2,975
slides (1,234 exercises); round 70 (pulse oximetry accuracy, bladder
scanning/PVR, chest physiotherapy/postural drainage) grew it to 2,999
slides (1,243 exercises) — the course has now crossed 3,000 slides; round
71 (viral hepatitis, toxic shock syndrome, bowel/mesenteric ischemia) grew
it to 3,023 slides (1,252 exercises); round 72 (client abandonment,
interpreter services/language access, mandatory reporting beyond abuse)
grew it to 3,047 slides (1,261 exercises); round 73 (diabetic foot care,
perineal care for incontinent clients, bathing method selection) grew it
to 3,071 slides (1,270 exercises); round 74 (electrical safety/grounding,
bariatric client safe handling, oxygen cylinder storage/transport) grew it
to 3,095 slides (1,279 exercises); round 75 (concussion recognition/
return-to-play, immunization contraindications/precautions, anticipatory
guidance for well-child visits) grew it to 3,120 slides (1,289 exercises);
round 76 (nitroglycerin/nitrates, oxytocin labor induction/augmentation,
insulin onset/peak/duration concept) grew it to 3,144 slides (1,298
exercises); round 77 (arterial line monitoring, capillary refill/skin
turgor assessment, pain scale selection) grew it to 3,169 slides (1,308
exercises); round 78 (migraine recognition/differentiation, vertigo/
Meniere's disease, pulmonary hypertension) grew it to 3,194 slides (1,318
exercises); round 79 (nursing licensure renewal/CE, case
management/utilization review, shared governance) grew it to 3,219 slides
(1,328 exercises); round 80 (distraction/relaxation for procedural comfort,
massage contraindications, environmental modification for sensory-impaired
clients) grew it to 3,243 slides (1,337 exercises); round 81 (fire
extinguisher classes, bed rail entrapment risk, autoclave/sterilizer
safety) grew it to 3,267 slides (1,346 exercises); round 82 (lead exposure
awareness, newborn circumcision care, nutrition label literacy/dietary
guidelines) grew it to 3,291 slides (1,355 exercises); round 83
(bisphosphonate administration, thrombolytic therapy, calcium channel
blocker considerations) grew it to 3,315 slides (1,364 exercises); round 84
(continuous bladder irrigation, traction principles, skin graft care) grew
it to 3,339 slides (1,373 exercises); round 85 (thyroid storm/myxedema
coma, peripheral neuropathy, osteoporotic compression fracture) grew it to
3,364 slides (1,383 exercises); round 86 (health literacy assessment,
client-centered care planning, professional boundaries/social media) grew
it to 3,388 slides (1,392 exercises); round 87 (cast care, bowel sounds
assessment technique, feeding assistance for dysphagia) grew it to 3,412
slides (1,401 exercises); round 88 (emergency equipment readiness, safe
medication storage/security, transport safety/handoff) grew it to 3,436
slides (1,410 exercises); round 89 (postpartum hemorrhage warning signs,
pregnancy loss support, fertility awareness-based family planning) grew it
to 3,460 slides (1,419 exercises); round 90 (anticholinergic effects/older-
adult risk, antipyretic medications, live vaccine precautions in
immunosuppressed clients) grew it to 3,484 slides (1,428 exercises); round
91 (hemodialysis/peritoneal dialysis safety, seizure precautions bedside
setup, restorative care/rehabilitation principles) grew it to 3,510 slides
(1,437 exercises); round 92 (cardiac arrest recognition/response, acute
arterial occlusion, superior vena cava syndrome) grew it to 3,534 slides
(1,446 exercises); round 93 (verbal/telephone order read-back, incident
command system, second victim syndrome) grew it to 3,558 slides (1,455
exercises); round 94 (Braden Scale, hydration status assessment, adaptive
equipment for eating/self-care) grew it to 3,582 slides (1,464 exercises);
round 95 (client belongings/valuables documentation, workplace
ergonomics/repetitive strain prevention, isolation signage/visitor
screening) grew it to 3,606 slides (1,473 exercises); round 96 (men's
health screening, breastfeeding contraindications, introducing solid
foods) grew it to 3,630 slides (1,482 exercises); round 97 (acetaminophen
overdose/N-acetylcysteine, opioid/benzodiazepine reversal agents, warfarin/
vitamin K reversal pairing) grew it to 3,654 slides (1,491 exercises); round 98
(telemetry monitoring, wound irrigation technique, safe injection practices)
grew it to 3,678 slides (1,500 exercises); round 99 (obsessive-compulsive
disorder, least restrictive environment/restraint use, anticipatory grief)
grew it to 3,702 slides (1,509 exercises); round 100 — milestone (hemoglobin
A1c, inflammatory markers/ESR/CRP, dimensional analysis) grew it to 3,726
slides (1,518 exercises), marking 100 total depth-expansion rounds completed
since original authoring; round 101 (status epilepticus, serotonin syndrome,
pneumothorax/tension pneumothorax) grew it to 3,750 slides (1,527 exercises);
round 102 (SBAR structured handoff, advance directive types, nurse practice
act violations) grew it to 3,774 slides (1,536 exercises); round 103 (pain
assessment in nonverbal/cognitively impaired clients, skin assessment in
darkly pigmented skin, safe client transfer techniques) grew it to 3,798
slides (1,545 exercises); round 104 (hand hygiene five moments, chain of
infection, N95 fit testing) grew it to 3,822 slides (1,554 exercises); round
105 (Rh sensitization/RhoGAM, newborn jaundice, failure to thrive) grew it to
3,846 slides (1,563 exercises); round 106 (ACE inhibitors, epidural
anesthesia, antitubercular medications) grew it to 3,870 slides (1,572
exercises); round 107 (suctioning technique, PCA pump safety, chest tube
drainage system assessment) grew it to 3,894 slides (1,581 exercises); round
108 (borderline personality disorder/splitting, schizophrenia positive/
negative symptoms, codependency/enabling in substance use disorder) grew it
to 3,918 slides (1,590 exercises); round 109 (cerebrospinal fluid analysis,
blood culture and sensitivity, pediatric weight-based dosage) grew it to
3,942 slides (1,599 exercises); round 110 — milestone (hyponatremia/
hypernatremia, testicular torsion, Bell's palsy vs. stroke) grew it to 3,966
slides (1,608 exercises), marking 110 total depth-expansion rounds completed
since original authoring; round 111 (evidence-based practice, nurse-sensitive
quality indicators, organ donation) grew it to 3,990 slides (1,617
exercises); round 112 — milestone (urinary incontinence types, fecal
impaction, hospice vs. palliative care) grew it to 4,014 slides (1,626
exercises), crossing 4,000 slides; round 113 (postoperative
orthostatic-hypotension fall risk, medication reconciliation, bed/chair
alarms) grew it to 4,038 slides (1,635 exercises); round 114 (IPV screening
during pregnancy, car seat safety, postpartum blues vs. postpartum
depression) grew it to 4,062 slides (1,644 exercises); round 115 (SSRI black
box warning/discontinuation syndrome, local anesthetics with epinephrine,
antiemetic serotonin antagonists/QT prolongation) grew it to 4,086 slides
(1,653 exercises); round 116 (12-lead ECG lead placement, incentive
spirometry, central venous access device types) grew it to 4,110 slides
(1,662 exercises); round 117 (trauma-informed care, motivational
interviewing, group therapy therapeutic factors) grew it to 4,134 slides
(1,671 exercises); round 118 (D-dimer, amylase/lipase pancreatic markers,
enteral feeding rate calculation) grew it to 4,158 slides (1,680 exercises);
round 119 (hypercalcemia/hypocalcemia, acute cholecystitis/cholelithiasis,
retinal detachment) grew it to 4,182 slides (1,689 exercises); round 120 —
milestone (chain of custody, sentinel event external reporting, safe
staffing legislation) grew it to 4,206 slides (1,698 exercises), marking 120
total depth-expansion rounds completed since original authoring; round 121
(denture care, incontinence-associated dermatitis, terminal restlessness)
grew it to 4,230 slides (1,707 exercises); round 122 (universal fall
precautions, do-not-use abbreviations, ongoing suicide risk reassessment)
grew it to 4,254 slides (1,716 exercises); round 123 (folic acid/neural tube
defect prevention, kangaroo care, scoliosis screening) grew it to 4,278
slides (1,725 exercises); round 124 (lithium narrow therapeutic index,
neuroleptic malignant syndrome, metformin lactic acidosis/contrast hold —
plus a content-quality fix to a pre-existing duplicate-vocab-text warning in
the Antidiabetic Medications and Insulin module) grew it to 4,302 slides
(1,734 exercises); round 125 (wound debridement, CGM vs. point-of-care
testing, neurovascular six Ps framework) grew it to 4,326 slides (1,743
exercises); round 126 (somatic symptom disorder vs. factitious disorder vs.
malingering, body image disturbance, adjustment disorder) grew it to 4,350
slides (1,752 exercises); round 127 (procalcitonin, ammonia level, household
to metric conversion) grew it to 4,374 slides (1,761 exercises); round 128
(HHS vs. DKA, Wernicke's encephalopathy, abruptio placentae vs. placenta
previa) grew it to 4,398 slides (1,770 exercises); round 129 (informed
refusal, competency vs. capacity, FMEA) grew it to 4,422 slides (1,779
exercises); round 130 — milestone (hearing-impaired communication
techniques, nonpharmacological nausea comfort measures, fall recovery) grew
it to 4,446 slides (1,788 exercises), marking 130 total depth-expansion
rounds completed since original authoring; round 131 (two-identifier client
verification, purposeful hourly rounding, safe medication disposal) grew it
to 4,470 slides (1,797 exercises); round 132 (universal newborn hearing
screening, postpartum contraception timing, vaping/e-cigarette health risks)
grew it to 4,494 slides (1,806 exercises); round 133 (vancomycin red man
syndrome/trough monitoring, clozapine agranulocytosis monitoring,
aminoglycosides nephrotoxicity/ototoxicity) grew it to 4,518 slides (1,815
exercises); round 134 (post-anesthesia recovery monitoring, mean arterial
pressure, smart pump technology) grew it to 4,542 slides (1,824 exercises);
round 135 (specific phobia vs. GAD, postpartum psychosis, therapeutic use of
self) grew it to 4,566 slides (1,833 exercises); round 136 (BNP, PT/INR,
percentage solutions) grew it to 4,590 slides (1,842 exercises); round 137
(ovarian torsion, malignant hyperthermia, acute angle-closure glaucoma) grew
it to 4,614 slides (1,851 exercises); round 138 (systems-level advocacy,
nursing peer review, professional certification) grew it to 4,638 slides
(1,860 exercises); round 139 (nonpharmacological pruritus comfort measures,
dementia environmental comfort, toileting assistive devices) grew it to
4,662 slides (1,869 exercises); round 140 — milestone (bloodborne pathogen
post-exposure protocol, terminal cleaning, workplace bullying/lateral
violence) grew it to 4,686 slides (1,878 exercises), marking 140 total
depth-expansion rounds completed since original authoring; round 141
(prediabetes screening, preconception genetic carrier screening, skin
self-exam ABCDE rule) grew it to 4,710 slides (1,887 exercises); round 142
(phenytoin, heparin aPTT/protamine sulfate reversal, fentanyl patch safety)
grew it to 4,734 slides (1,896 exercises); round 143 (chest tube removal,
multimodal analgesia, peripheral IV catheter gauge selection) grew it to
4,758 slides (1,905 exercises); round 144 (panic disorder, dual diagnosis,
elder abuse) grew it to 4,782 slides (1,914 exercises); round 145 (uric
acid, vitamin B12/folate, safe dose range verification) grew it to 4,806
slides (1,923 exercises); round 146 (toxic megacolon, Addisonian crisis, air
embolism) grew it to 4,830 slides (1,932 exercises); round 147 (voluntary
vs. involuntary psychiatric admission, documentation error correction/late
entry, Nurse Licensure Compact) grew it to 4,854 slides (1,941 exercises);
round 148 (delirium comfort care, labor comfort measures, chemotherapy oral
care/mucositis prevention) grew it to 4,878 slides (1,950 exercises); round
149 (CLABSI prevention bundle, surgical site infection prevention, VAP
prevention bundle) grew it to 4,902 slides (1,959 exercises); round 150 —
milestone (osteoporosis screening/bone health promotion, travel health
counseling, pre-participation sports physical) grew it to 4,926 slides
(1,968 exercises), marking 150 total depth-expansion rounds completed since
original authoring; round 151 (digoxin narrow therapeutic index, MAOI
tyramine interaction, corticosteroids/abrupt discontinuation risk) grew it
to 4,950 slides (1,977 exercises); round 152 (blood transfusion
administration safety, pressure injury staging, sequential compression
devices) grew it to 4,974 slides (1,986 exercises); round 153 (autonomic
dysreflexia, cauda equina syndrome, tumor lysis syndrome) grew it to
4,998 slides (1,995 exercises); round 154 — milestone, crossed 5,000
slides (DNR orders, impaired nurse recognition, preceptor role) grew it
to 5,022 slides (2,004 exercises), marking 154 total depth-expansion
rounds completed since original authoring; round 155 (ambulation
assistance/gait belt use, nutrition assistance for the visually impaired
client, hair and nail care) grew it to 5,046 slides (2,013 exercises);
round 156 (C. diff precautions, START mass casualty triage, home oxygen
safety) grew it to 5,070 slides (2,022 exercises); round 157 (autism
spectrum screening, bicycle/recreational helmet safety, puberty
anticipatory guidance) grew it to 5,094 slides (2,031 exercises); round
158 (dissociative disorders, gambling/behavioral addictions, compassion
fatigue/burnout) grew it to 5,118 slides (2,040 exercises); round 159
(iron studies/ferritin-TIBC, digoxin level, medication reconstitution)
grew it to 5,142 slides (2,049 exercises); round 160 — milestone
(levodopa-carbidopa, erythropoiesis-stimulating agents, antiretroviral
therapy adherence) grew it to 5,166 slides (2,058 exercises), marking 160
total depth-expansion rounds completed since original authoring; round
161 (pacemaker safety, indwelling urinary catheter insertion, extubation
readiness) grew it to 5,190 slides (2,067 exercises); round 162
(necrotizing fasciitis, aortic aneurysm/dissection, hip fracture) grew it
to 5,214 slides (2,076 exercises); round 163 (research participation/IRB
oversight, defamation, EHR downtime procedures) grew it to 5,238 slides
(2,085 exercises).
Content-authoring is ongoing — Kevin has
authorized continued, open-ended depth expansion ("tens of thousands of slides,
no need to stop") — so this document will continue to grow with each round.
Every 🔴 and 🟡 item above remains open until reviewed.
