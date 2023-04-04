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
  const arr = JSON.parse(data);
  return arr;
}
