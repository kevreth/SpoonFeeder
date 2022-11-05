import { parseQuery } from 'vue-router';
import {existVisibleNotEmpty,elementContains,testButton,existAndVisible,continueButton,dragDrop} from './functions';
const GREEN = 'rgb(0, 128, 0)';
const RED = 'rgb(255, 0, 0)';
describe('Cypress Testing', () => {
  it('visits the app root url', () => {
    cy.visit('/');
    cy.title().should('eq', 'CyberLearning');
    //mute audio during testss
    localStorage.setItem('mute','true'); 

    //course title
    existVisibleNotEmpty('body');
    elementContains('body', 'course 1');
    testButton('#continueBtn');

    //unit title
    existVisibleNotEmpty('body');
    elementContains('body', 'unit 1');
    testButton('#continueBtn');

    //lesson title
    existVisibleNotEmpty('body');
    elementContains('body', 'lesson 1');
    testButton('#continueBtn');

    //module title
    existVisibleNotEmpty('body');
    elementContains('body', 'module 1');
    testButton('#continueBtn');

    //info slides
    testButton('#continueBtn'); //Mathjax
    testButton('#continueBtn'); //code
    testButton('#continueBtn'); //table

    //info slides
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

    //vocab
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
    continueButton(15);

    //sort
    existVisibleNotEmpty('body');
    testButton('#btn'); //done
    testButton('#continueBtn');

    //imap
    existVisibleNotEmpty('body');
    testButton('#blue');
    testButton('#continueBtn');

    //mc 1
    existVisibleNotEmpty('body');
    cy.contains('bus');
    testButton('#btn1');
    testButton('#continueBtn');

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
    cy.get('#ans0').should('have.css', 'background-color', GREEN);
    cy.get('#ans1').should('have.css', 'background-color', GREEN);
    cy.get('#ans2').should('have.css', 'background-color', GREEN);
    cy.contains('Number correct: 3');
    cy.contains('Number questions: 3');
    cy.contains('100%');
    testButton('#continueBtn');

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
    cy.get('#ans0').should('have.css', 'background-color', GREEN);
    cy.get('#ans1').should('have.css', 'background-color', RED);
    cy.get('#ans2').should('have.css', 'background-color', RED);
    cy.contains('Number correct: 1');
    cy.contains('Number questions: 3');
    cy.contains('33%');
    testButton('#continueBtn');

    //select
    existVisibleNotEmpty('body');
    testButton('#w4');
    testButton('#w6');
    testButton('#btn'); //done

    cy.get('#w4').should('have.css', 'text-decoration-color', RED);
    cy.get('#w5').should('have.css', 'text-decoration-color', RED);
    cy.get('#w6').should('have.css', 'text-decoration-color', GREEN);

    //test to make sure the correct text decoration is applied,
    //either underscore or strikethrough

    testButton('#continueBtn');

    //mc2
    existVisibleNotEmpty('body');
    cy.contains('learn the periodic table');
    testButton('#btn0');
    continueButton(22);

    //results
    existVisibleNotEmpty('body');
    cy.contains('b,a,c,d');
    cy.contains('blue');
    cy.contains('NUMBER OF QUESTIONS: 16');
    cy.contains('NUMBER CORRECT: 10');
    cy.contains('PERCENT CORRECT: 63%');
    // cy.wait(20000);
    cy.contains('15.');
    cy.contains('ans');
    testButton('#startOver');
    cy.contains('course 1');
  });
});
export {}; //stops lint warning
