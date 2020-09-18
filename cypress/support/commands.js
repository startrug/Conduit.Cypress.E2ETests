Cypress.Commands.add('logOut', () => {
    cy.get('a[href="#settings"]').click()
    cy.get('.btn-outline-danger').click()
})

Cypress.Commands.add('enterLoginData', (email, password) => {
    if (cy.get('h1').contains('Sign in').should('not.be.visible')) {
        cy.get('.nav-link').contains('Sign in').click()
    }
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type(password)
})

Cypress.Commands.add('submitLoginForm', () => {
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('clearLoginInputs', () => {
    cy.get('input[type="email"]').clear()
    cy.get('input[type="password"]').clear()
})

Cypress.Commands.add('checkLogInErrorMsg', () => {
    cy.get('.error-messages')
        .should('be.visible')
        .should('have.text', 'email or password is invalid')
})
