/**
 * E2E tests for the Review System.
 *
 * Uses the "test" course which has two lessons:
 *   Lesson 1 — the original exercises (bool, ma, vocab, sort, imap, mc, gap, select, mc)
 *   Lesson 2 — two simple MC exercises (closest planet, water symbol)
 *
 * The lesson 1 boundary prompt fires after completing lesson 1's last exercise.
 * The lesson 2 / unit / course boundary prompts fire after lesson 2's last exercise.
 */
import {
  skipReviewPrompt,
  testButton,
  dragDrop,
  chooseOption,
  doneCy,
  continueCy,
} from './functions';

const KNOWN_UNCAUGHT_PATTERNS: RegExp[] = [
  /ResizeObserver loop/i,
  /Non-Error promise rejection/i,
];
Cypress.on('uncaught:exception', (err) => {
  console.log('Uncaught exception:', err.message);
  return !KNOWN_UNCAUGHT_PATTERNS.some((p) => p.test(err.message));
});

function muteAudio() {
  sessionStorage.setItem('mute', 'true');
}

function navigateToLesson1Boundary() {
  cy.visit('/');
  cy.title().should('eq', 'SpoonFeeder');
  muteAudio();

  // Info/title slides are InfoExercise (Vue) — continue via data-cy
  cy.get('[data-cy="continue"]', { timeout: 20000 }).should('be.visible');

  // Course title
  continueCy();
  // Unit 1
  continueCy();
  // Lesson 1
  continueCy();
  // Module 1
  continueCy();
  // 3 info inst slides
  continueCy();
  continueCy();
  continueCy();
  // bool yes/no/no1 — ChoiceExercise (Vue)
  chooseOption(0);
  continueCy();
  chooseOption(0);
  continueCy();
  chooseOption(0);
  continueCy();
  // ma — done then continue (Vue)
  doneCy();
  continueCy();
  // vocab slides (5 MC slides) — ChoiceExercise (Vue)
  chooseOption(0);
  continueCy();
  chooseOption(0);
  continueCy();
  chooseOption(0);
  continueCy();
  chooseOption(2);
  continueCy();
  chooseOption(3);
  continueCy();
  // sort — legacy renderer
  testButton('#btn');
  testButton('#continueBtn');
  // imap — legacy renderer
  testButton('#blue');
  testButton('#continueBtn');
  // mc bus (click wrong) — ChoiceExercise (Vue)
  chooseOption(1);
  continueCy();
  // gap 1 (all correct)
  dragDrop('#fill0', '#gap0');
  dragDrop('#fill1', '#gap1');
  dragDrop('#fill2', '#gap2');
  testButton('#continueBtn');
  // gap 2 (some wrong)
  dragDrop('#fill2', '#gap1');
  dragDrop('#fill0', '#gap0');
  dragDrop('#fill1', '#gap2');
  testButton('#continueBtn');
  // select
  testButton('#w4');
  testButton('#w6');
  testButton('#btn');
  testButton('#continueBtn');
  // mc periodic table — ChoiceExercise (Vue); answers first option
  cy.contains('learn the periodic table');
  chooseOption(0);
  // Continue triggers the lesson 1 boundary prompt
  continueCy();
}

describe('Review System — boundary prompts', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('shows lesson 1 boundary prompt after completing lesson 1', () => {
    navigateToLesson1Boundary();

    cy.get('[data-cy="review-prompt"]', { timeout: 8000 }).should('be.visible');
    cy.get('[data-cy="review-prompt"]').should('contain.text', 'Lesson 1');
    cy.get('[data-cy="review-prompt"]').should('contain.text', 'lesson 1 complete');
    cy.get('[data-cy="review-focused"]').should('be.visible');
    cy.get('[data-cy="review-cumulative"]').should('be.visible');
    cy.get('[data-cy="review-skip"]').should('be.visible');
  });

  it('skipping lesson 1 prompt continues to lesson 2', () => {
    navigateToLesson1Boundary();

    skipReviewPrompt();

    // Lesson 2 title slide should now appear (info, Vue)
    cy.get('[data-cy="continue"]', { timeout: 8000 }).should('be.visible');
    cy.contains('lesson 2');
  });

  it('completing lesson 2 shows lesson, unit, and course boundary prompts', () => {
    navigateToLesson1Boundary();
    skipReviewPrompt();

    // Navigate through lesson 2 (titles are info, Vue)
    continueCy(); // Lesson 2 title
    continueCy(); // Module 2 title
    cy.contains('closest to the Sun');
    chooseOption(0); // Mercury (Vue)
    continueCy();
    cy.contains('chemical symbol for water');
    chooseOption(0); // H2O (Vue)
    continueCy(); // triggers boundary

    // Lesson 2 boundary prompt
    cy.get('[data-cy="review-prompt"]', { timeout: 8000 }).should('be.visible');
    cy.get('[data-cy="review-prompt"]').should('contain.text', 'Lesson 2');
    skipReviewPrompt();

    // Unit 1 boundary prompt
    cy.get('[data-cy="review-prompt"]', { timeout: 8000 }).should('be.visible');
    cy.get('[data-cy="review-prompt"]').should('contain.text', 'Unit 1');
    skipReviewPrompt();

    // Course boundary prompt
    cy.get('[data-cy="review-prompt"]', { timeout: 8000 }).should('be.visible');
    cy.get('[data-cy="review-prompt"]').should('contain.text', 'Course complete');
    skipReviewPrompt();

    // Summary screen
    cy.contains('a,b,c,d');
  });
});

describe('Review System — focused review session', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('starts a focused lesson review, allows answering, shows score', () => {
    // Use the lesson 2 boundary: lesson 2 has exactly 2 mc exercises, so the
    // focused review pool is fully predictable (no gap/select surprises).
    navigateToLesson1Boundary();
    skipReviewPrompt(); // skip lesson 1 boundary

    // Navigate through lesson 2 (titles are info, Vue)
    continueCy(); // lesson 2 title
    continueCy(); // module 2 title
    cy.contains('closest to the Sun');
    chooseOption(0); // Mercury (Vue)
    continueCy();
    cy.contains('chemical symbol for water');
    chooseOption(0); // H2O (Vue)
    continueCy(); // triggers lesson 2 / unit / course boundary prompts

    // Lesson 2 boundary prompt — choose focused review
    cy.get('[data-cy="review-prompt"]', { timeout: 8000 }).should('be.visible');
    cy.get('[data-cy="review-focused"]').click();

    // Review session starts — quit bar visible
    cy.get('[data-cy="review-session"]', { timeout: 8000 }).should('exist');
    cy.get('[data-cy="review-quit"]').should('be.visible');

    // Lesson 2 focused pool = 2 mc slides (Mercury + H2O), sample capped at 5 → 2 slides
    for (let i = 0; i < 4; i++) {
      cy.get('body').then(($body) => {
        if ($body.find('[data-cy="review-summary"]').length > 0) return;
        if ($body.find('#btn0').length > 0) {
          cy.get('#btn0').click();
          cy.get('#continueBtn').should('be.visible').click();
        }
      });
    }

    cy.get('[data-cy="review-summary"]', { timeout: 12000 }).should('be.visible');
    cy.get('[data-cy="review-summary"]').should('contain.text', '/');
    cy.get('[data-cy="review-summary"]').should('contain.text', '%');

    // Return to course
    cy.get('[data-cy="review-done"]').click();
    cy.get('[data-cy="review-session"]').should('not.exist');
  });

  it('quit button exits the review session mid-way', () => {
    navigateToLesson1Boundary();

    cy.get('[data-cy="review-prompt"]', { timeout: 8000 }).should('be.visible');
    cy.get('[data-cy="review-focused"]').click();

    cy.get('[data-cy="review-session"]', { timeout: 8000 }).should('exist');

    // Quit immediately
    cy.get('[data-cy="review-quit"]').click();

    cy.get('[data-cy="review-session"]').should('not.exist');

    // Course navigation resumes — lesson 2 title (info, Vue)
    cy.get('[data-cy="continue"]', { timeout: 8000 }).should('be.visible');
    cy.contains('lesson 2');
  });
});

export {};
