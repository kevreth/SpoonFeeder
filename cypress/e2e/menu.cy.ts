beforeEach(() => {
  cy.visit('/')
  cy.get('.q-icon').click()
  // cy.wait(2000)
})

describe('Menu Button Tests', () => {
  it('CloseBtn Overlay', () => {
    cy.get('.closeBtn').click()
  })
  it('Trash startOver', () => {
    cy.get('.trash').click()
  })
})
