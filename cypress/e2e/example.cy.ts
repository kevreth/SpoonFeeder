const GREEN = 'rgb(0, 128, 0)';
const RED = 'rgb(255, 0, 0)';
describe('Cypress Testing', () => {
  it('visits the app root url', () => {
    cy.visit('/');
    cy.title().should('eq', 'CyberLearning');

    //course title
    existVisibleNotEmpty('body');
    elementContains('body', 'course 1');
    testButton('#btn');

    //unit title
    existVisibleNotEmpty('body');
    elementContains('body', 'unit 1');
    testButton('#btn');

    //lesson title
    existVisibleNotEmpty('body');
    elementContains('body', 'lesson 1');
    testButton('#btn');

    //module title
    existVisibleNotEmpty('body');
    elementContains('body', 'module 1');
    testButton('#btn');

    //info slides
    testButton('#btn'); //Mathjax
    testButton('#btn'); //code
    testButton('#btn'); //table

    //info slides
    existVisibleNotEmpty('body');
    elementContains('body', 'yes');
    testButton('#btn0'); //continue
    cy.get('#btn0').should('have.css', 'background-color', GREEN);
    testButton('#btn'); //continue

    existVisibleNotEmpty('body');
    elementContains('body', 'no');
    testButton('#btn0');
    cy.get('#btn0').should('have.css', 'background-color', RED);
    testButton('#btn'); //continue

    existVisibleNotEmpty('body');
    elementContains('body', 'no1');
    testButton('#btn0');
    cy.get('#btn0').should('have.css', 'background-color', RED);
    testButton('#btn'); //continue

    //vocab
    testButton('#btn0');
    existVisibleNotEmpty('body');
    testButton('#btn');
    testButton('#btn0');
    cy.get('#btn0').should('have.css', 'background-color', RED);
    testButton('#btn'); //continue
    testButton('#btn2');
    testButton('#btn'); //continue
    testButton('#btn3');
    testButton('#btn'); //continue
    testButton('#btn0');
    continueButton(11); //continue

    //sort
    existVisibleNotEmpty('body');
    testButton('#btn'); //continue
    testButton('#btn'); //continue

    //imap
    existVisibleNotEmpty('body');
    testButton('#blue');
    testButton('#btn'); //continue

    //mc 1
    existVisibleNotEmpty('body');
    cy.contains('bus');
    testButton('#btn1');
    testButton('#btn'); //continue

    //gap 1
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
    //TODO: #ans0 green, #ans1 red, #ans2 red
    cy.get('#ans0').should('have.css', 'background-color', GREEN);
    cy.get('#ans1').should('have.css', 'background-color', GREEN);
    cy.get('#ans2').should('have.css', 'background-color', GREEN);
    cy.contains('Number correct: 3');
    cy.contains('Number questions: 3');
    cy.contains('100%');
    testButton('#btn'); //continue

    //gap 2
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
    //TODO: #ans0 green, #ans1 red, #ans2 red
    cy.get('#ans0').should('have.css', 'background-color', GREEN);
    cy.get('#ans1').should('have.css', 'background-color', RED);
    cy.get('#ans2').should('have.css', 'background-color', RED);
    cy.contains('Number correct: 1');
    cy.contains('Number questions: 3');
    cy.contains('33%');
    testButton('#btn'); //continue

    //select
    existVisibleNotEmpty('body');
    testButton('#w4');
    testButton('#w6');
    testButton('#btn'); //done

    cy.get('#w4').should('have.css', 'text-decoration-color', RED);
    cy.get('#w5').should('have.css', 'text-decoration-color', RED);
    cy.get('#w6').should('have.css', 'text-decoration-color', GREEN);

    testButton('#btn'); //continue

    //mc2
    existVisibleNotEmpty('body');
    cy.contains('learn the periodic table');
    testButton('#btn0');
    continueButton(18); //continue

    //results
    existVisibleNotEmpty('body');
    cy.contains('b,a,c,d');
    cy.contains('blue');
    cy.contains('NUMBER OF QUESTIONS: 16');
    cy.contains('NUMBER CORRECT: 10');
    cy.contains('PERCENT CORRECT: 63%');

    cy.contains('15.');
    cy.contains('ans');
    // cy.wait(20000);
    testButton('#startOver');
    cy.contains('course 1');
  });
});
function click(e1: string) {
  cy.get(e1).click();
}
function dragDrop(e1: string, e2: string) {
  const dataTransfer = new DataTransfer();
  cy.get(e1).trigger('dragstart', { dataTransfer });
  cy.get(e2).trigger('drop', { dataTransfer });
}
function existAndVisible(e1: string) {
  cy.get(e1).should('exist').should('be.visible');
}
function testButton(e1: string) {
  existAndVisible(e1);
  click(e1);
}
function elementContains(e1: string, txt: string) {
  existAndVisible(e1);
  cy.get(e1).should('contain.text', txt);
}
function existVisibleNotEmpty(e1: string) {
  existAndVisible(e1);
  cy.get(e1).should('not.be.empty');
}
function continueButton(ctr: number) {
  cy.get('#btn')
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
function getLocalStorageArray() {
  const data = localStorage.getItem('savedata') as string;
  const arr = JSON.parse(data);
  return arr;
}
export {}; //stops lint warning



