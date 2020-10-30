import * as user from "../data/valid_user.json";
import Article from "../page_objects/article.js";
import { getRandomNumber } from "../support/util.js";

let article;

let testComment = "This article is awesome! ;)";

describe("Adding and removing comments test", () => {
  before(() => {
    cy.visit("#");
    cy.enterLoginData(user.email, user.password);
    cy.submitForm();
  });

  describe("When random article card is opened", () => {
    before(() => {
      cy.getArticlePreviews().should("have.length", 10);
      article = new Article(getRandomNumber());
      article.clickOnProperty(article.titleLocator);
    });

    it("then comment form should be visible", () => {
      cy.getCommentForm().should("be.visible");
    });
  });

  describe("When comment is added to random article", () => {
    before(() => {
      cy.addComment(testComment);
    });

    it("then new comment should be visible and contain expected text", () => {
      cy.get(".card-text").contains(testComment).should("be.visible");
    });

    it("then logged in user name should be displayed in comment footer", () => {
      cy.get(".card-footer .comment-author")
        .eq(1)
        .should("have.text", user.name);
    });

    it("then correct date should be displayed in comment footer", () => {
      let date = new Date();
      cy.get(".card-footer .date-posted").eq(0).should(
        "have.text",
        date.toDateString()
      );
    });
  });

  describe("When delete icon is clicked on and article page is reloaded", () => {
    before(() => {
      cy.deleteComment();
      cy.reload();
      cy.get(".article-page").should("be.visible");
    });
    it("then comment should not be visible", () => {
      cy.contains(testComment).should("not.be.visible");
    });
  });
});
