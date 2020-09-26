let author;
let title;
let likesNumber;
let partialUrl;
let articleIndex;
let selectedTag;

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
      articleIndex = getRandomNumber();
      cy.get(".article-preview")
        .eq(articleIndex)
        .within(() => {
          cy.get(".btn-outline-primary")
            .as("like")
            .then(($btn) => {
              likesNumber = $btn.text();
            });
          cy.get("@like").click();
        });
    });

    it("then number of likes should not be changed", () => {
      cy.get(".article-preview .btn-outline-primary")
        .eq(articleIndex)
        .should("have.text", likesNumber);
    });
  });

  describe("When article preview clicked on", () => {
    before(() => {
      cy.visit("#");
      checkIfloadingFinished();
      cy.get(".article-preview")
        .eq(getRandomNumber())
        .within(() => {
          cy.get("h1").then(($h) => {
            title = $h.text();
            partialUrl = generatePartialUrlBaseOnTitle(title);
          });
          cy.get(".author").then(($a) => {
            author = $a.text();
          });
          cy.get("h1").click();
        });
    });

    it("then URL address should contain article title", () => {
      cy.hash().should("include", partialUrl);
    });

    it("then article page should contains title in main header", () => {
      cy.get("h1").should("have.text", title);
    });

    it("then proper author name should be visible in article page", () => {
      cy.get(".author").should("have.text", author);
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
      cy.get(".article-preview")
        .eq(getRandomNumber())
        .within(() => {
          cy.get("h1").then(($h) => {
            title = $h.text();
          });
          cy.get(".author").then(($a) => {
            author = $a.text();
          });
          cy.get(".author").click();
        });
    });

    it("then URL address should contain author name", () => {
      cy.hash().should("include", author.split(" ")[0]);
    });
    it("then My Articles tab should be active", () => {
      cy.get(".nav-pills .nav-link")
        .contains("My Articles")
        .should("have.class", "active");
    });

    it("then author name should be displayed in header of author's page", () => {
      cy.get("h4").should("have.text", author);
    });

    it("then article selected on Global feed list should be visible on autohor's page", () => {
      cy.get(".article-preview h1").contains(title);
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

function generatePartialUrlBaseOnTitle(title) {
  return title
    .toLowerCase()
    .replace(/(\s|\.|\')/g, "-")
    .replace(/(\(|\)|\:|\,)/g, "");
}

function getRandomNumber() {
  return Math.floor(Math.random() * 9 + 1);
}

function checkIfloadingFinished() {
  cy.contains("Loading...").should("not.be.visible");
}
