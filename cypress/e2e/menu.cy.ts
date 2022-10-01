beforeEach(() => {
  cy.visit('/')
  cy.get('.q-icon').click();
  // cy.wait(2000)
})

describe('Menu Button Tests', () => {
  it('Close button', () => {
    cy.get('.closeBtn').click();
  })
  it('Trash button', () => {
    cy.get('.trash').click();
  })
})
