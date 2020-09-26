let fakeUser;
let user;
let errorMessages;

describe("Sign up tests", function () {
  before(() => {
    cy.visit("#/register");
  });
  beforeEach(() => {
    cy.fixture("invalid_user_data").then((fakeUserData) => {
      fakeUser = fakeUserData;
    });
    cy.fixture("valid_user_data").then((userData) => {
      user = userData;
    });
    cy.fixture("error_messages").then((errorMsgs) => {
      errorMessages = errorMsgs;
    });
  });

  describe("When no sign up data has been entered and form has been submitted", function () {
    before(() => {
      cy.submitForm();
    });

    it("then expected blank email error message has been displayed", () => {
      cy.checkErrorMsg(errorMessages.blankEmail, 0);
    });

    it("then expected blank password error message has been displayed", () => {
      cy.checkErrorMsg(errorMessages.blankPassword, 1);
    });

    it("then expected blank username error message has been displayed", () => {
      cy.checkErrorMsg(errorMessages.blankUserName, 2);
    });
  });

  describe("When existing user name has been entered and form has been submitted", function () {
    before(() => {
      cy.reload();
      cy.enterSignUpData(user.name, fakeUser.email, fakeUser.password);
      cy.submitForm();
    });

    it("then user being already taken error message has been displayed", () => {
      cy.checkErrorMsg(errorMessages.usernameIsTaken);
    });
  });

  describe("When existing email has been entered and form has been submitted", function () {
    before(() => {
      cy.reload();
      cy.enterSignUpData(fakeUser.name, user.email, fakeUser.password);
      cy.submitForm();
    });

    it("then user being already taken error message has been displayed", () => {
      cy.checkErrorMsg(errorMessages.emailIsTaken);
    });
  });

  describe("When too short password has been entered and form has been submitted", function () {
    before(() => {
      cy.reload();
      cy.enterSignUpData(fakeUser.name, fakeUser.email, fakeUser.shortPassword);
      cy.submitForm();
    });

    it("then user being already taken error message has been displayed", () => {
      cy.checkErrorMsg(errorMessages.toShortPassword);
    });
  });

  describe("When invalid email has been entered and form has been submitted", function () {
    before(() => {
      cy.reload();
      cy.enterSignUpData(
        fakeUser.name,
        fakeUser.invalidEmail,
        fakeUser.password
      );
      cy.submitForm();
    });

    it("then user being already taken error message has been displayed", () => {
      cy.checkErrorMsg(errorMessages.invalidEmail);
    });
  });
});
