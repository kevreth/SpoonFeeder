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
const GREEN = 'rgb(0, 128, 0)';
const RED = 'rgb(255, 0, 0)';

export function runFullJourney() {
  cy.visit('/');
  cy.title().should('eq', 'SpoonFeeder');
  sessionStorage.setItem('mute', 'true');

  cy.get('#continueBtn', { timeout: 20000 }).should('be.visible');

  existVisibleNotEmpty('body');
  elementContains('body', 'course 1');
  testButton('#continueBtn');

  existVisibleNotEmpty('body');
  elementContains('body', 'unit 1');
  testButton('#continueBtn');

  existVisibleNotEmpty('body');
  elementContains('body', 'lesson 1');
  testButton('#continueBtn');

  existVisibleNotEmpty('body');
  elementContains('body', 'module 1');
  testButton('#continueBtn');

  testButton('#continueBtn'); //Mathjax
  testButton('#continueBtn'); //code
  testButton('#continueBtn'); //table

  existVisibleNotEmpty('body');
  elementContains('body', 'yes');
  testButton('#btn0');
  cy.get('#btn0').should('have.css', 'background-color', GREEN);
  testButton('#continueBtn');

  existVisibleNotEmpty('body');
  elementContains('body', 'no');
  testButton('#btn0');
  cy.get('#btn0').should('have.css', 'background-color', RED);
  testButton('#continueBtn');

  existVisibleNotEmpty('body');
  elementContains('body', 'no1');
  testButton('#btn0');
  cy.get('#btn0').should('have.css', 'background-color', RED);
  testButton('#continueBtn');

  existVisibleNotEmpty('body');
  testButton('#btn'); //done
  testButton('#continueBtn');

  testButton('#btn0');
  existVisibleNotEmpty('body');
  testButton('#continueBtn');
  testButton('#btn0');
  cy.get('#btn0').should('have.css', 'background-color', RED);
  testButton('#continueBtn');
  testButton('#btn2');
  testButton('#continueBtn');
  testButton('#btn3');
  testButton('#continueBtn');
  testButton('#btn0');
  continueButton(16);

  existVisibleNotEmpty('body');
  testButton('#btn'); //done
  testButton('#continueBtn');

  existVisibleNotEmpty('body');
  testButton('#blue');
  testButton('#continueBtn');

  existVisibleNotEmpty('body');
  cy.contains('bus');
  testButton('#btn1');
  testButton('#continueBtn');

  existVisibleNotEmpty('body');
  existAndVisible('#fill0');
  existAndVisible('#fill1');
  existAndVisible('#fill2');
  existAndVisible('#gap0');
  existAndVisible('#gap1');
  existAndVisible('#gap2');
  elementContains('#remaining', '3');
  dragDrop('#fill0', '#gap0');
  elementContains('#remaining', '2');
  dragDrop('#fill1', '#gap1');
  elementContains('#remaining', '1');
  dragDrop('#fill2', '#gap2');
  elementContains('#remaining', '0');
  cy.get('#ans0').parent().should('have.css', 'background-color', GREEN);
  cy.get('#ans1').parent().should('have.css', 'background-color', GREEN);
  cy.get('#ans2').parent().should('have.css', 'background-color', GREEN);
  cy.contains('Number correct: 3');
  cy.contains('Number questions: 3');
  cy.contains('100%');
  testButton('#continueBtn');

  existVisibleNotEmpty('body');
  existAndVisible('#fill0');
  existAndVisible('#fill1');
  existAndVisible('#fill2');
  existAndVisible('#gap0');
  existAndVisible('#gap1');
  existAndVisible('#gap2');
  elementContains('#remaining', '3');
  dragDrop('#fill2', '#gap1');
  elementContains('#remaining', '2');
  dragDrop('#fill0', '#gap0');
  elementContains('#remaining', '1');
  dragDrop('#fill1', '#gap2');
  elementContains('#remaining', '0');
  cy.get('#ans0').parent().should('have.css', 'background-color', GREEN);
  cy.get('#ans1').parent().should('have.css', 'background-color', RED);
  cy.get('#ans2').parent().should('have.css', 'background-color', RED);
  cy.contains('Number correct: 1');
  cy.contains('Number questions: 3');
  cy.contains('33%');
  testButton('#continueBtn');

  existVisibleNotEmpty('body');
  testButton('#w4');
  testButton('#w6');
  testButton('#btn'); //done
  cy.get('#w4').should('have.css', 'text-decoration-color', RED);
  cy.get('#w5').should('have.css', 'text-decoration-color', RED);
  cy.get('#w6').should('have.css', 'text-decoration-color', GREEN);
  testButton('#continueBtn');

  existVisibleNotEmpty('body');
  cy.contains('learn the periodic table');
  testButton('#btn0');
  continueButton(23);

  // Lesson 1 boundary prompt — skip
  skipReviewPrompt();

  // Lesson 2 navigation
  existVisibleNotEmpty('body');
  elementContains('body', 'lesson 2');
  testButton('#continueBtn');

  existVisibleNotEmpty('body');
  elementContains('body', 'module 2');
  testButton('#continueBtn');

  existVisibleNotEmpty('body');
  cy.contains('closest to the Sun');
  testButton('#btn0'); // Mercury — correct
  testButton('#continueBtn');

  existVisibleNotEmpty('body');
  cy.contains('chemical symbol for water');
  testButton('#btn0'); // H2O — correct
  testButton('#continueBtn');

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
  testButton('#startOver');

  cy.get('#continueBtn', { timeout: 10000 }).should('be.visible');
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
