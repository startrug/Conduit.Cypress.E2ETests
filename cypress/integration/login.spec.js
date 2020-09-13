const { describe } = require("mocha");

describe('When Conduit page has been opened', function() {
    before(() => {
        cy.visit('https://react-redux.realworld.io/#/')
    });

    it('then page title is correct', () => {
        cy.title().should('eq', 'Conduit')
    });
})

describe('When valid credentials has been entered', function() {
    before(() => {
        cy.get()
    });
})