//const { describe } = require("mocha");

describe('When Conduit page has been opened', function() {
    before(() => {
        cy.visit('https://react-redux.realworld.io/#/login')
    });

    it('then page title is correct', () => {
        cy.title().should('eq', 'Conduit')
    });
})

describe('When valid credentials has been entered', function() {
    before(() => {
        cy.get('input[type="email"]').type('as@ultramail.com')
        cy.get('input[type="password"]').type('qwer123!')
        cy.get('button[type="submit"]').click()
    });

    it('then correct user name should be displayed', () => {
        cy.get('a[href="#@arthurs"]').should('be.visible')
    });
})