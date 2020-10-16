Cypress.Commands.add("logOut", () => {
  cy.get('a[href="#settings"]').click();
  cy.get(".btn-outline-danger").click();
});

Cypress.Commands.add("enterLoginData", (email, password) => {
  if (cy.get("h1").contains("Sign in").should("not.be.visible")) {
    cy.get(".nav-link").contains("Sign in").click();
  }
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
});

Cypress.Commands.add("enterSignUpData", (username, email, password) => {
  if (cy.get("h1").contains("Sign up").should("not.be.visible")) {
    cy.get(".nav-link").contains("Sign up").click();
  }
  cy.get('input[placeholder="Username"]').type(username);
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
});

Cypress.Commands.add("clearInputFields", () => {
  cy.get("input").each(($input) => {
    cy.wrap($input).clear();
  });
});

Cypress.Commands.add("checkErrorMsg", (text, index = 0) => {
  cy.get(".error-messages li")
    .eq(index)
    .should("be.visible")
    .should("have.text", text);
});

Cypress.Commands.add("submitForm", () => {
  cy.get("form").submit();
});

Cypress.Commands.add("checkIfloadingFinished", () => {
  cy.contains("Loading...").should("not.be.visible");
});

Cypress.Commands.add("getNavLinks", () => {
  cy.get(".nav-pills .nav-link");
});

Cypress.Commands.add("getArticlePreviews", () => {
  cy.get(".article-preview");
});

Cypress.Commands.add("getCommentForm", () => {
  cy.get(".comment-form");
});

Cypress.Commands.add("addComment", (text) => {
  cy.get(".comment-form").within(() => {
    cy.get("textarea").type(text);
    cy.root().submit();
  });
})
