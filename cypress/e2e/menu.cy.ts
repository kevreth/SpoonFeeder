import {click} from './functions';

beforeEach(() => {
  cy.visit('/')
  click('.q-icon');
  // cy.wait(2000)
})

describe('Menu Button', () => {
  it('Close button', () => {
    click('.closeBtn');
  })
  it('Trash button', () => {
    click('.trash');
  })
})
