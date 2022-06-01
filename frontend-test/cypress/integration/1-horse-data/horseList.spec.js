/*
* Test mainly focused on DisplayCardList component, on index.js
*/ 

describe('display a list of horses', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('displays ten items on the list', () => {
        cy.get('.horse-item').should('have.length', 10)
    })

    it('displays Loading when user scrolls down', () => {
        for (let i = 0; i < 3; i++) {
         cy.scrollTo('bottom', {duration: 3000})
            .get('.infinite-scroll-component')
            .children()
            .last()
            .should('have.text', 'Loading...')
        }

    })
})