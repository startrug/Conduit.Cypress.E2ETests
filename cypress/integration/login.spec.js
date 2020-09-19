let fakeUser
let user
let errorMessages

describe('Log in tests', function () {
    beforeEach(() => {
        cy.fixture('invalid_user_data').then((fakeUserData) => {
            fakeUser = fakeUserData
        })
        cy.fixture('valid_user_data').then((userData) => {
            user = userData
        })
        cy.fixture('error_messages').then((errorMsgs) => {
            errorMessages = errorMsgs
        })
    })

    describe('When Conduit page has been opened', function () {
        before(() => {
            cy.visit("login")
        });

        it('then page title is correct', () => {
            cy.title().should('eq', 'Conduit')
        });
    })

    describe('When valid credentials has been entered', function () {
        before(() => {
            cy.enterLoginData(user.email, user.password)
            cy.submitForm()
        });

        it('then correct user name should be displayed', () => {
            cy.get('a[href="#@arthurs"]').should('be.visible')
        });

        after(() => {
            cy.logOut();
        })
    })

    describe('When invalid credentials has been entered and login form has been submitted', function () {
        before(() => {
            cy.enterLoginData(fakeUser.email, fakeUser.password)
            cy.submitForm()
        })
        after(() => {
            cy.clearInputFields()
        })
        it('then expected error message has been displayed', () => {
            cy.checkErrorMsg(errorMessages.invalidLoginData)
        });
    })

    describe('When valid email and invalid password has been entered and login form has been submitted', function () {
        before(() => {
            cy.enterLoginData(user.email, fakeUser.password)
            cy.submitForm()
        })
        after(() => {
            cy.clearInputFields()
        })

        it('then expected error message has been displayed', () => {
            cy.checkErrorMsg(errorMessages.invalidLoginData)
        });
    })

    describe('When valid email and no password has been entered and login form has been submitted', function () {
        before(() => {
            cy.enterLoginData(user.email, ' ')
            cy.submitForm()
        })
        after(() => {
            cy.clearInputFields()
        })

        it('then expected error message has been displayed', () => {
            cy.checkErrorMsg(errorMessages.invalidLoginData)
        });
    })

    describe('When no email and valid password has been entered and login form has been submitted', function () {
        before(() => {
            cy.enterLoginData(' ', user.password)
            cy.submitForm()
        })
        after(() => {
            cy.clearInputFields()
        })

        it('then expected error message has been displayed', () => {
            cy.checkErrorMsg(errorMessages.invalidLoginData)
        });
    })

    describe('When invalid email and valid password has been entered and login form has been submitted', function () {
        before(() => {
            cy.enterLoginData(fakeUser.email, user.password)
            cy.submitForm()
        })
        after(() => {
            cy.clearInputFields()
        })

        it('then expected error message has been displayed', () => {
            cy.checkErrorMsg(errorMessages.invalidLoginData)
        });
    })

    describe('When no email and no password has been entered and login form has been submitted', function () {
        before(() => {
            cy.enterLoginData(' ', ' ')
            cy.submitForm()
        })
        after(() => {
            cy.clearInputFields()
        })

        it('then expected error message has been displayed', () => {
            cy.checkErrorMsg(errorMessages.invalidLoginData)
        });
    })
})


