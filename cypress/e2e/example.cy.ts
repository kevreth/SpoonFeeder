// https://docs.cypress.io/api/introduction/api.html
import '@4tw/cypress-drag-drop'
describe("My First Test", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.title().should('eq', ("CyberLearning"));

    //course title
    //TODO: test for empty body then body content
    cy.get('#btn').click();

    //unit title
    //TODO: test for empty body then body content
    cy.get('#btn').click();

    //lesson title
    //TODO: test for empty body then body content
    cy.get('#btn').click();

    //module title
    //TODO: test for empty body then body content
    cy.get('#btn').click();

    //info slides
    //TODO: test for empty body then body content
    cy.get('#btn').click();
    cy.get('#btn').click();
    cy.get('#btn').click();

    cy.get('#btn0').click();

    //info slides
    //TODO: test for green
    cy.get('#btn').click();
    cy.get('#btn0').click();
    //TODO: test for red
    cy.get('#btn').click();
    cy.get('#btn0').click();

    //TODO: test for red
    cy.get('#btn').click();

    //vocab
    //TODO: test for empty body then body content
    cy.get('#btn0').click();
    //TODO: test for red
    cy.get('#btn').click();
    cy.get('#btn0').click();
    //TODO: test for green
    cy.get('#btn').click();
    cy.get('#btn2').click();
    cy.get('#btn').click();
    cy.get('#btn3').click();
    cy.get('#btn').click();
    cy.get('#btn0').click();
    cy.get('#btn').click();

    //sort
    cy.get('#btn').click();
    cy.get('#btn').click();

    //imap
    cy.get('#blue').click();
    cy.get('#btn').click();

    //mc 1
    //TODO: test for empty body then body content "lecture is so boring"
    //TODO: test for button visibilty
    cy.get('#btn1').click();
    //TODO: test for button visibilty
    cy.get('#btn').click();

    //gap 1
    //TODO: test for empty body
    //TODO: test for visibility of 3 fills and 3 gaps
    //TODO: "remaining" = 3
    cy.get('#fill0').drag('#gap0')
    //TODO: "remaining" = 2
    cy.get('#fill1').drag('#gap1')
    //TODO: "remaining" = 1
    cy.get('#fill2').drag('#gap2')
    //TODO: "remaining" = 0
    //TODO: #ans0 green, #ans1 red, #ans2 red
    //TODO: btn visibile
    /*
    .assert.textContains("body", "Number correct: 3")
    .assert.textContains("body", "Number questions: 3")
    .assert.textContains("body", "100%")
    .assert.visible('button[id=btn]')
    */
    cy.get('#btn').click()

    //gap 1
    //TODO: test for empty body
    //TODO: test for visibility of 3 fills and 3 gaps
    //TODO: "remaining" = 3
    cy.get('#fill2').drag('#gap1')
    //TODO: "remaining" = 2
    cy.get('#fill0').drag('#gap0')
    //TODO: "remaining" = 1
    cy.get('#fill1').drag('#gap2')
    //TODO: "remaining" = 0
    //TODO: #ans0 green, #ans1 red, #ans2 red
    //TODO: btn visibile
    /*
    .assert.textContains("body", "Number correct: 1")
    .assert.textContains("body", "Number questions: 3")
    .assert.textContains("body", "33%")
    .assert.visible('button[id=btn]')
    */
    cy.get('#btn').click()
  });
});
