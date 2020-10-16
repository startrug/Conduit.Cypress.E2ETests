import * as user from "../data/valid_user.json";
import Article from "../page_objects/article.js";
import { getRandomNumber } from "../support/util.js";

let article;

describe("Home page tests after user logging in", () => {
  before(() => {
    cy.visit("#");
    cy.enterLoginData(user.email, user.password);
    cy.submitForm();
  });

  describe("When user is logged in and home page is opened", () => {
    it("then Your feed tab is visible", () => {
      cy.getNavLinks().contains("Your Feed").should("be.visible");
    });
    it("then Your Feed tab is active", () => {
      cy.getNavLinks()
        .contains("Your Feed")
        .should("have.class", "active");
    });
    it("then Global feed tab is visible", () => {
      cy.getNavLinks()
        .contains("Global Feed")
        .should("be.visible");
    });

    it("then Global Feed tab is not active", () => {
      cy.getNavLinks()
        .contains("Your feed")
        .should("not.have.class", "active");
    });
  });

  describe("When Global Feed tab is opened", () => {
    before(() => {
      cy.getNavLinks().contains("Global Feed").click();
    });

    it("then list of articles preview contains 10 elements", () => {
      cy.getArticlePreviews().should("have.length", 10);
    });
  });

  describe("When user that logged in has clicked on heart icon", () => {
    before(() => {
      let articleIndex = getRandomNumber();
      article = new Article(articleIndex);
      cy.server();
      cy.route("POST", "**/favorite").as("fav");
      article.clickOnProperty(article.likesNumberLocator);
      cy.wait("@fav").then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it("then number of likes should be increased by one after first click", () => {
      cy.get(article.likesNumberOfSelected)
        .eq(article.index)
        .then(($likes) => {
          expect(parseInt($likes.text())).to.equal(article.likesNumber + 1);
        });
    });

    // TODO
    it('then article should be visible in Favorites Articles list', () => {

    });

    it("then number of likes should be equal previous count", () => {
      cy.server();
      cy.route("DELETE", "**/favorite").as("fav");
      article.clickOnProperty(article.likesNumberLocator);
      cy.wait("@fav").then((response) => {
        expect(response.status).to.eq(200);
      });
      cy.get(article.likesNumberOfSelected)
        .eq(article.index)
        .then(($likes) => {
          expect(parseInt($likes.text())).to.equal(article.likesNumber);
        });
    });
  });

  describe("When random article card is opened", () => {
    before(() => {
      article = new Article(getRandomNumber());
      article.clickOnProperty(article.titleLocator);
    });

    it("then comment form should be visible", () => {
      cy.getCommentForm().should("be.visible");
    });
  });

  describe("When comment is added to random article", () => {
    let testComment = "This article is awesome! ;)";

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
      cy.get(".ion-trash-a").click();
      cy.reload();
    });
    it("then comment should not be visible", () => {
      cy.getCommentForm().should("not.be.visible");
    });
  });
});
