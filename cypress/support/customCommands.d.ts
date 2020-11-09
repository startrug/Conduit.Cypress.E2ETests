declare namespace Cypress {
    interface Chainable<Subject> {
        logOut(): Chainable<any>
        enterLoginData(email: any, password: any): Chainable<any>
        enterSignUpData(username: any, email: any, password: any): Chainable<any>
        clearInputFields(): Chainable<any>
        checkErrorMsg(text: any, index?: number): Chainable<any>
        submitForm(): Chainable<any>
        checkIfLoadingFinished(): Chainable<any>
        getNavLinks(): Chainable<any>
        getArticlePreviews(): Chainable<any>
        getCommentForm(): Chainable<any>
        addComment(text: any): Chainable<any>
        selectOptionFromNavbar(name: any): Chainable<any>
        deleteComment(): Chainable<any>
  }
}