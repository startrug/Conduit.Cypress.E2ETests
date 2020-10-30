import * as messages from "../data/error_messages.json";
import * as fakeUser from "../data/invalid_user.json";
import * as user from "../data/valid_user.json";

describe("Sign up tests", function () {
  before(() => {
    cy.visit("#/register");
  });

  describe("When no sign up data has been entered and form has been submitted", function () {
    before(() => {
      cy.submitForm();
    });

    it("then expected blank email error message has been displayed", () => {
      cy.checkErrorMsg(messages.blankEmail, 0);
    });

    it("then expected blank password error message has been displayed", () => {
      cy.checkErrorMsg(messages.blankPassword, 1);
    });

    it("then expected blank username error message has been displayed", () => {
      cy.checkErrorMsg(messages.blankUserName, 2);
    });
  });

  describe("When existing user name has been entered and form has been submitted", function () {
    before(() => {
      cy.reload();
      cy.enterSignUpData(user.name, fakeUser.email, fakeUser.password);
      cy.submitForm();
    });

    it("then user being already taken error message has been displayed", () => {
      cy.checkErrorMsg(messages.usernameIsTaken);
    });
  });

  describe("When existing email has been entered and form has been submitted", function () {
    before(() => {
      cy.reload();
      cy.enterSignUpData(fakeUser.name, user.email, fakeUser.password);
      cy.submitForm();
    });

    it("then user being already taken error message has been displayed", () => {
      cy.checkErrorMsg(messages.emailIsTaken);
    });
  });

  describe("When too short password has been entered and form has been submitted", function () {
    before(() => {
      cy.reload();
      cy.enterSignUpData(fakeUser.name, fakeUser.email, fakeUser.shortPassword);
      cy.submitForm();
    });

    it("then user being already taken error message has been displayed", () => {
      cy.checkErrorMsg(messages.toShortPassword);
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
      cy.checkErrorMsg(messages.invalidEmail);
    });
  });
});
