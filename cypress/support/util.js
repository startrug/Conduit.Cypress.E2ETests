export const enterLoginData = (email, password) => {
  if (cy.get("h1").contains("Sign in").should("not.be.visible")) {
    cy.get(".nav-link").contains("Sign in").click();
  }
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
};
