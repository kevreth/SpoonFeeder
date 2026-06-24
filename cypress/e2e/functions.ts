export function click(e1: string) {
  cy.get(e1).click();
}
export function dragDrop(e1: string, e2: string) {
  const dataTransfer = new DataTransfer();
  cy.get(e1).trigger('dragstart', { dataTransfer });
  cy.get(e2).trigger('drop', { dataTransfer });
}
export function existAndVisible(e1: string) {
  cy.get(e1).should('exist').should('be.visible');
}
export function testButton(e1: string) {
  existAndVisible(e1);
  click(e1);
}
export function elementContains(e1: string, txt: string) {
  existAndVisible(e1);
  cy.get(e1).should('contain.text', txt);
}
export function existVisibleNotEmpty(e1: string) {
  existAndVisible(e1);
  cy.get(e1).should('not.be.empty');
}
export function continueButton(ctr: number) {
  cy.get('#continueBtn')
    .should('exist')
    .should('be.visible')
    .should('not.be.empty')
    .click()
    .should(() => {
      const arr = getLocalStorageArray();
      const length = arr.length;
      expect(length).to.eq(ctr);
    });
}
export function getLocalStorageArray() {
  const data = localStorage.getItem('test') as string;
  const parsed = JSON.parse(data);
  // WebStorageAdapter wraps values in { version, data } — unwrap if present
  return parsed?.data ?? parsed;
}

// ── Vue exercise (data-cy) helpers — converted types: mc, bool, ma (PRD-001) ──
export function chooseOption(i: number) {
  cy.get(`[data-cy="option-${i}"]`).should('be.visible').click();
}
export function optionState(i: number, state: 'correct' | 'incorrect' | 'dimmed') {
  cy.get(`[data-cy="option-${i}"]`).should('have.class', `sf-option--${state}`);
}
export function doneCy() {
  cy.get('[data-cy="done"]').should('be.visible').click();
}
// GapExercise click-to-place: pick a pool token, then drop it in a gap slot.
export function placeToken(token: number, slot: number) {
  cy.get(`[data-cy="token-${token}"]`).click();
  cy.get(`[data-cy="slot-${slot}"]`).click();
}
export function continueCy() {
  cy.get('[data-cy="continue"]').should('be.visible').click();
}
export function continueCyCount(ctr: number) {
  cy.get('[data-cy="continue"]')
    .should('be.visible')
    .click()
    .should(() => {
      expect(getLocalStorageArray().length).to.eq(ctr);
    });
}
export function runFullJourney() {
  cy.visit('/');
  cy.title().should('eq', 'SpoonFeeder');
  sessionStorage.setItem('mute', 'true');

  // Info/title slides are InfoExercise (Vue) — continue via data-cy
  cy.get('[data-cy="continue"]', { timeout: 20000 }).should('be.visible');

  existVisibleNotEmpty('body');
  elementContains('body', 'course 1');
  continueCy();

  existVisibleNotEmpty('body');
  elementContains('body', 'unit 1');
  continueCy();

  existVisibleNotEmpty('body');
  elementContains('body', 'lesson 1');
  continueCy();

  existVisibleNotEmpty('body');
  elementContains('body', 'module 1');
  continueCy();

  continueCy(); //Mathjax (info)
  continueCy(); //code (info)
  continueCy(); //table (info)

  // bool 'yes' (ans yes) — ChoiceExercise (Vue)
  existVisibleNotEmpty('body');
  elementContains('body', 'yes');
  chooseOption(0);
  optionState(0, 'correct');
  continueCy();

  // bool 'no' (ans no) — option 0 is 'yes' → incorrect
  existVisibleNotEmpty('body');
  elementContains('body', 'no');
  chooseOption(0);
  optionState(0, 'incorrect');
  continueCy();

  // bool 'no1' (ans no) — option 0 is 'yes' → incorrect
  existVisibleNotEmpty('body');
  elementContains('body', 'no1');
  chooseOption(0);
  optionState(0, 'incorrect');
  continueCy();

  // ma 'Choose A and C' — submit with nothing selected (Vue Done button)
  existVisibleNotEmpty('body');
  doneCy();
  continueCy();

  // vocab → 5 mc children (ChoiceExercise)
  chooseOption(0);
  existVisibleNotEmpty('body');
  continueCy();
  chooseOption(0);
  optionState(0, 'incorrect');
  continueCy();
  chooseOption(2);
  continueCy();
  chooseOption(3);
  continueCy();
  chooseOption(0);
  continueCyCount(16);

  // sort 'sort' — SortExercise (Vue); submit current order
  existVisibleNotEmpty('body');
  doneCy();
  continueCy();

  // imap 'choose blue' — ImapExercise (Vue); SVG shape ids come from imap.svg
  existVisibleNotEmpty('body');
  cy.get('#blue').click();
  continueCy();

  // mc 'Choose the bus' — ChoiceExercise (Vue); click car (option 1)
  existVisibleNotEmpty('body');
  cy.contains('bus');
  chooseOption(1);
  continueCy();

  // gap 1 (all correct) — GapExercise (Vue), click-to-place
  existVisibleNotEmpty('body');
  existAndVisible('[data-cy="token-0"]');
  existAndVisible('[data-cy="token-1"]');
  existAndVisible('[data-cy="token-2"]');
  existAndVisible('[data-cy="slot-0"]');
  existAndVisible('[data-cy="slot-1"]');
  existAndVisible('[data-cy="slot-2"]');
  elementContains('[data-cy="remaining"]', '3');
  placeToken(0, 0);
  elementContains('[data-cy="remaining"]', '2');
  placeToken(1, 1);
  elementContains('[data-cy="remaining"]', '1');
  placeToken(2, 2);
  elementContains('[data-cy="remaining"]', '0');
  cy.get('[data-cy="slot-0"]').should('have.class', 'sf-gap-slot--correct');
  cy.get('[data-cy="slot-1"]').should('have.class', 'sf-gap-slot--correct');
  cy.get('[data-cy="slot-2"]').should('have.class', 'sf-gap-slot--correct');
  cy.contains('Number correct: 3');
  cy.contains('Number questions: 3');
  cy.contains('100%');
  continueCy();

  // gap 2 (some wrong) — token-2→slot-1, token-1→slot-2 are misplaced
  existVisibleNotEmpty('body');
  elementContains('[data-cy="remaining"]', '3');
  placeToken(0, 0);
  placeToken(2, 1);
  placeToken(1, 2);
  elementContains('[data-cy="remaining"]', '0');
  cy.get('[data-cy="slot-0"]').should('have.class', 'sf-gap-slot--correct');
  cy.get('[data-cy="slot-1"]').should('have.class', 'sf-gap-slot--incorrect');
  cy.get('[data-cy="slot-2"]').should('have.class', 'sf-gap-slot--incorrect');
  cy.contains('Number correct: 1');
  cy.contains('Number questions: 3');
  cy.contains('33%');
  continueCy();

  // select — SelectExercise (Vue); ans=[5,6], choose 4 and 6
  existVisibleNotEmpty('body');
  cy.get('[data-cy="word-4"]').click();
  cy.get('[data-cy="word-6"]').click();
  doneCy();
  cy.get('[data-cy="word-4"]').should('have.class', 'sf-word--incorrect');
  cy.get('[data-cy="word-5"]').should('have.class', 'sf-word--missed');
  cy.get('[data-cy="word-6"]').should('have.class', 'sf-word--correct');
  continueCy();

  // mc 'periodic table' — ChoiceExercise (Vue)
  existVisibleNotEmpty('body');
  cy.contains('learn the periodic table');
  chooseOption(0);
  continueCyCount(23);

  // Lesson 1 boundary prompt — skip
  skipReviewPrompt();

  // Lesson 2 navigation (info, Vue)
  existVisibleNotEmpty('body');
  elementContains('body', 'lesson 2');
  continueCy();

  existVisibleNotEmpty('body');
  elementContains('body', 'module 2');
  continueCy();

  // mc Mercury — ChoiceExercise (Vue)
  existVisibleNotEmpty('body');
  cy.contains('closest to the Sun');
  chooseOption(0); // Mercury — correct
  continueCy();

  // mc water — ChoiceExercise (Vue)
  existVisibleNotEmpty('body');
  cy.contains('chemical symbol for water');
  chooseOption(0); // H2O — correct
  continueCy();

  // Lesson 2 + unit + course boundary prompts — skip all
  skipReviewPrompt();
  skipReviewPrompt();
  skipReviewPrompt();

  existVisibleNotEmpty('body');
  cy.contains('a,b,c,d');
  cy.contains('blue');
  cy.contains('ans');
  cy.contains('Mercury');
  cy.contains('H2O');
  cy.contains('.stat-value', '19');
  cy.contains('.stat-value', '13');
  cy.contains('.stat-value', '68%');
  cy.get('[data-cy="start-over"]').should('be.visible').click();

  // After restart, the first slide is the course title (info, Vue)
  cy.get('[data-cy="continue"]', { timeout: 10000 }).should('be.visible');
  cy.contains('course 1');
}

export function skipReviewPrompt() {
  cy.get('[data-cy="review-prompt"]', { timeout: 8000 }).should('be.visible');
  cy.get('[data-cy="review-skip"]').click();
  // No not.exist check — when multiple boundaries fire, the next prompt
  // appears immediately after Vue flushes, so the element is never absent.
}

export function printWebStorage() {
  Cypress.Commands.add('printWebStorage' as any, () => {
    cy.window().then((win: Window) => {
      const storageTypes: Record<string, Storage> = {
        local: win.localStorage,
        session: win.sessionStorage,
      };

      Object.keys(storageTypes).forEach((type: string) => {
        const storage = storageTypes[type];
        console.log(`${type} storage:`);
        for (let i = 0; i < storage.length; i++) {
          const key = storage.key(i) as string;
          const value = storage.getItem(key);
          console.log(`  ${key}: ${value}`);
        }
      });
    });
  });
}
