let fakeUser
let user

describe('Login tests', function () {
    beforeEach(() => {
        cy.fixture('invalid_user_data').then((fakeUserData) => {
            fakeUser = fakeUserData
        })
        cy.fixture('valid_user_data').then((userData) => {
            user = userData
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
            cy.submitLoginForm()
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
            cy.submitLoginForm()
        })
        after(() => {
            cy.clearLoginInputs()
        })
        it('then expected error message has been displayed', () => {
            cy.checkLogInErrorMsg()
        });
    })

    describe('When valid email and invalid password has been entered and login form has been submitted', function () {
        before(() => {
            cy.enterLoginData(user.email, fakeUser.password)
            cy.submitLoginForm()
        })
        after(() => {
            cy.clearLoginInputs()
        })

        it('then expected error message has been displayed', () => {
            cy.checkLogInErrorMsg()
        });
    })

    describe('When valid email and no password has been entered and login form has been submitted', function () {
        before(() => {
            cy.enterLoginData(user.email, ' ')
            cy.submitLoginForm()
        })
        after(() => {
            cy.clearLoginInputs()
        })

        it('then expected error message has been displayed', () => {
            cy.checkLogInErrorMsg()
        });
    })

    describe('When no email and valid password has been entered and login form has been submitted', function () {
        before(() => {
            cy.enterLoginData(' ', user.password)
            cy.submitLoginForm()
        })
        after(() => {
            cy.clearLoginInputs()
        })

        it('then expected error message has been displayed', () => {
            cy.checkLogInErrorMsg()
        });
    })

    describe('When invalid email and valid password has been entered and login form has been submitted', function () {
        before(() => {
            cy.enterLoginData(fakeUser.email, user.password)
            cy.submitLoginForm()
        })
        after(() => {
            cy.clearLoginInputs()
        })

        it('then expected error message has been displayed', () => {
            cy.checkLogInErrorMsg()
        });
    })

    describe('When no email and no password has been entered and login form has been submitted', function () {
        before(() => {
            cy.enterLoginData(' ', ' ')
            cy.submitLoginForm()
        })
        after(() => {
            cy.clearLoginInputs()
        })

        it('then expected error message has been displayed', () => {
            cy.checkLogInErrorMsg()
        });
    })
})


