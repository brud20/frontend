/*
* Test focused on DisplayCardItem and the modal component nested inside
* Edit Mode only
* TODO: Submission of details
*/ 

describe('Card item in edit mode', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        .wait(400)
        .get('.horse-item')
        .first()
        .click()
        .get('.chakra-switch')
        .last()
        .get('input')
        .check({force: true})
    })

    it('when Edit Mode is switched to true, input fields should be visible', () => {
        cy.get('.chakra-modal__body')
        .get('.chakra-form-control')
        .first()
        .get('input')
        .parent()
        .get('label')
        .first()
        .children()
        .should('have.text', '*')
    })

    it('Save button is disabled by default when Edit is toggles', () => {
        cy.get('.chakra-modal__footer')
          .children()
          .first()
          .should('be.disabled')
    })

    it('Save button enabled when a change is made', () => {
        cy.get('input')
          .first()
          .type('Hello')
          .get('.chakra-modal__footer')
          .children()
          .first()
          .should('not.be.disabled')
    })

    it('Error thrown when Name field is cleared', () => {
        cy.get('input')
        .first()
        .clear()
        .blur()
        .get('.chakra-form__error-message')
        .get('.chakra-modal__footer')
        .children()
        .first()
        .click()
        .get('.chakra-alert')
    })

})