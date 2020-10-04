import Article from "../page_objects/article.js";

let selectedTag;
let article;

describe("Home page tests before user logging in", () => {
  describe("When home page has been opened", () => {
    before(() => {
      cy.visit("#");
    });
    it("then Global Feed tab is visible", () => {
      cy.get(".nav-link").contains("Global Feed");
    });

    it("then list of articles preview contains 10 elements", () => {
      cy.get(".article-preview").should("have.length", 10);
    });
  });

  describe("When user that not logged in has clicked on heart icon", () => {
    before(() => {
      let articleIndex = getRandomNumber();
      article = new Article(articleIndex);
      article.clickOnProperty(article.likesNumberLocator);
    });

    it("then number of likes should not be changed", () => {
      cy.get(".article-preview .btn-outline-primary")
        .eq(article.index)
        .should("have.text", article.likesNumber);
    });
  });

  describe("When article preview clicked on", () => {
    before(() => {
      cy.visit("#");
      checkIfloadingFinished();
      let articleIndex = getRandomNumber();
      article = new Article(articleIndex);
      article.clickOnProperty(article.titleLocator);
    });

    it("then URL address should contain article title", () => {
      cy.hash().should("include", article.partialUrl);
    });

    it("then article page should contains title in main header", () => {
      cy.get("h1").should("have.text", article.title);
    });

    it("then proper author name should be visible in article page", () => {
      cy.get(".author").should("have.text", article.author);
    });

    it("then log in or sign up request is displayed", () => {
      cy.contains("Sign in or sign up to add comments on this article.").should(
        "be.visible"
      );
    });
  });

  describe("When author name is clicked on", () => {
    before(() => {
      cy.visit("#");
      checkIfloadingFinished();
      let articleIndex = getRandomNumber();
      article = new Article(articleIndex);
      article.clickOnProperty(article.authorLocator);
    });

    it("then URL address should contain author name", () => {
      cy.hash().should("include", article.author.split(" ")[0]);
    });
    it("then My Articles tab should be active", () => {
      cy.get(".nav-pills .nav-link")
        .contains("My Articles")
        .should("have.class", "active");
    });

    it("then author name should be displayed in header of author's page", () => {
      cy.get("h4").should("have.text", article.author);
    });

    it("then article selected on Global feed list should be visible on autohor's page", () => {
      cy.get(".article-preview h1").contains(article.title);
    });
  });

  describe("When tag is clicked on in popular tags section", () => {
    before(() => {
      cy.visit("#");
      checkIfloadingFinished();
      cy.get("div.tag-list a")
        .as("list")
        .last()
        .then(($t) => {
          selectedTag = $t.text();
          cy.wrap($t).click();
        });
    });

    it("then tab with selected tag text should be visible", () => {
      cy.get(".nav-link.active").should("contain.text", selectedTag);
    });
  });
});

function getRandomNumber() {
  return Math.floor(Math.random() * 9 + 1);
}

function checkIfloadingFinished() {
  cy.contains("Loading...").should("not.be.visible");
}
