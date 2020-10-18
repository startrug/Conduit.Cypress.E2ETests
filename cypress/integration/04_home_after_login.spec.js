import * as user from "../data/valid_user.json";
import Article from "../page_objects/article.js";
import { getRandomNumber } from "../support/util.js";

let article;
let favoritedArticle;

let testComment = "This article is awesome! ;)";

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
      article.markAsFavorite();
    });

    it("then number of likes should be increased by one after first click", () => {
      cy.get(article.likesNumberOfSelected)
        .eq(article.index)
        .then(($likes) => {
          expect(parseInt($likes.text())).to.equal(article.likesNumber);
        });
    });

    it("then number of likes should be equal previous count", () => {
      article.setAsUnFavorite();
      cy.get(article.likesNumberOfSelected)
        .eq(article.index)
        .then(($likes) => {
          expect(parseInt($likes.text())).to.equal(article.likesNumber);
        });
    });
  });

  describe("When user that logged in has clicked on heart icon of another random article", () => {
    before(() => {
      article = new Article(getRandomNumber());
      article.markAsFavorite();
    });

    it("then favorite article should be visible in \"Favorited Articles\" list", () => {
      cy.selectOptionFromNavbar(user.name);
      cy.getNavLinks().contains("Favorited Articles").click();
      cy.getArticlePreviews().should("contain", article.title);
    });
  })

  describe("When user that logged in has clicked on heart icon of favorite article", () => {
    before(() => {
      favoritedArticle = new Article(0);
      favoritedArticle.unmarkAsFavorite();
    });

    it("then favorite article should not be visible in \"Favorited Articles\" list after reload it", () => {
      cy.getNavLinks().contains("My Articles").click();
      cy.getNavLinks().contains("Favorited Articles").click();
      cy.getArticlePreviews().should("have.length", 1);
      cy.getArticlePreviews().should("not.contain", favoritedArticle.title);
    });

    it("then no articles message should be displayed on \"Favorited Articles\" list", () => {
      if (cy.getArticlePreviews().should("have.length", 1)) {
        cy.contains("No articles are here... yet.").should("be.visible");
      } else {
        cy.log("There is still another favorited article in the list!")
      }
    });
  })
});
