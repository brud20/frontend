/*
* Test focused on DisplayCardItem and the modal component nested inside
* Edit Mode true is in a separate spec
*/ 

describe('display modal with details, when card item is clicked', ()=> {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
          .wait(400)
          .get('.horse-item')
          .first()
          .click()
    })

    it('modal opens', () => {
        cy.get('.chakra-modal__body')
          .should('be.visible')
    })

    it('by default Edit Mode should be off on Modal load', () => {
        cy.get('.chakra-switch')
          .last()
          .get('input')
          .first()
          .should('not.be.checked')
    })
})