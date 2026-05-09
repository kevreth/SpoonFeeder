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
import { skipReviewPrompt, testButton, elementContains, existVisibleNotEmpty } from './functions';

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

  cy.get('#continueBtn', { timeout: 20000 }).should('be.visible');

  // Course title
  testButton('#continueBtn');
  // Unit 1
  testButton('#continueBtn');
  // Lesson 1
  testButton('#continueBtn');
  // Module 1
  testButton('#continueBtn');
  // 3 info inst slides
  testButton('#continueBtn');
  testButton('#continueBtn');
  testButton('#continueBtn');
  // bool yes (correct)
  testButton('#btn0');
  testButton('#continueBtn');
  // bool no (incorrect)
  testButton('#btn0');
  testButton('#continueBtn');
  // bool no1 (incorrect)
  testButton('#btn0');
  testButton('#continueBtn');
  // ma — done then continue
  testButton('#btn');
  testButton('#continueBtn');
  // vocab slides (5 MC slides)
  testButton('#btn0');
  testButton('#continueBtn');
  testButton('#btn0');
  testButton('#continueBtn');
  testButton('#btn0');
  testButton('#continueBtn');
  testButton('#btn2');
  testButton('#continueBtn');
  testButton('#btn3');
  testButton('#continueBtn');
  // sort
  testButton('#btn');
  testButton('#continueBtn');
  // imap
  testButton('#blue');
  testButton('#continueBtn');
  // mc bus (click wrong)
  testButton('#btn1');
  testButton('#continueBtn');
  // gap 1 (all correct)
  cy.get('#fill0').trigger('dragstart', { dataTransfer: new DataTransfer() });
  cy.get('#gap0').trigger('drop', { dataTransfer: new DataTransfer() });
  cy.get('#fill1').trigger('dragstart', { dataTransfer: new DataTransfer() });
  cy.get('#gap1').trigger('drop', { dataTransfer: new DataTransfer() });
  cy.get('#fill2').trigger('dragstart', { dataTransfer: new DataTransfer() });
  cy.get('#gap2').trigger('drop', { dataTransfer: new DataTransfer() });
  testButton('#continueBtn');
  // gap 2 (some wrong)
  cy.get('#fill2').trigger('dragstart', { dataTransfer: new DataTransfer() });
  cy.get('#gap1').trigger('drop', { dataTransfer: new DataTransfer() });
  cy.get('#fill0').trigger('dragstart', { dataTransfer: new DataTransfer() });
  cy.get('#gap0').trigger('drop', { dataTransfer: new DataTransfer() });
  cy.get('#fill1').trigger('dragstart', { dataTransfer: new DataTransfer() });
  cy.get('#gap2').trigger('drop', { dataTransfer: new DataTransfer() });
  testButton('#continueBtn');
  // select
  testButton('#w4');
  testButton('#w6');
  testButton('#btn');
  testButton('#continueBtn');
  // mc periodic table — answers first option
  cy.contains('learn the periodic table');
  testButton('#btn0');
  // Click continue — this triggers the lesson 1 boundary prompt
  testButton('#continueBtn');
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

    // Lesson 2 title slide should now appear
    cy.get('#continueBtn', { timeout: 8000 }).should('be.visible');
    cy.contains('lesson 2');
  });

  it('completing lesson 2 shows lesson, unit, and course boundary prompts', () => {
    navigateToLesson1Boundary();
    skipReviewPrompt();

    // Navigate through lesson 2
    testButton('#continueBtn'); // Lesson 2 title
    testButton('#continueBtn'); // Module 2 title
    cy.contains('closest to the Sun');
    testButton('#btn0'); // Mercury
    testButton('#continueBtn');
    cy.contains('chemical symbol for water');
    testButton('#btn0'); // H2O
    testButton('#continueBtn'); // triggers boundary

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
    navigateToLesson1Boundary();

    // Lesson 1 boundary prompt — choose focused review
    cy.get('[data-cy="review-prompt"]', { timeout: 8000 }).should('be.visible');
    cy.get('[data-cy="review-focused"]').click();

    // Review session starts — quit bar visible
    cy.get('[data-cy="review-session"]', { timeout: 8000 }).should('exist');
    cy.get('[data-cy="review-quit"]').should('be.visible');

    // Answer slides until summary appears (sample size = 5 for lesson scope)
    for (let i = 0; i < 10; i++) {
      cy.get('body').then(($body) => {
        if ($body.find('[data-cy="review-summary"]').length > 0) return;
        // Try to click first answer option if visible
        if ($body.find('#btn0').length > 0) {
          cy.get('#btn0').click();
        } else if ($body.find('#btn').length > 0) {
          cy.get('#btn').click();
        }
        cy.get('#continueBtn').should('be.visible').click();
      });
    }

    cy.get('[data-cy="review-summary"]', { timeout: 12000 }).should('be.visible');
    cy.get('[data-cy="review-summary"]').should('contain.text', '/');
    cy.get('[data-cy="review-summary"]').should('contain.text', '%');

    // Return to course
    cy.get('[data-cy="review-done"]').click();
    cy.get('[data-cy="review-session"]').should('not.exist');

    // Course navigation resumes — lesson 2 title should appear
    cy.get('#continueBtn', { timeout: 8000 }).should('be.visible');
    cy.contains('lesson 2');
  });

  it('quit button exits the review session mid-way', () => {
    navigateToLesson1Boundary();

    cy.get('[data-cy="review-prompt"]', { timeout: 8000 }).should('be.visible');
    cy.get('[data-cy="review-focused"]').click();

    cy.get('[data-cy="review-session"]', { timeout: 8000 }).should('exist');

    // Quit immediately
    cy.get('[data-cy="review-quit"]').click();

    cy.get('[data-cy="review-session"]').should('not.exist');

    // Course navigation resumes
    cy.get('#continueBtn', { timeout: 8000 }).should('be.visible');
    cy.contains('lesson 2');
  });
});

export {};
