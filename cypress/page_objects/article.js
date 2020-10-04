class Article {
  constructor(index) {
    this.index = index;
    cy.get(".article-preview")
      .eq(this.index)
      .within(() => {
        cy.get("h1").then(($h) => {
          this.title = $h.text();
          this.partialUrl = generatePartialUrlBaseOnTitle(this.title);
        });
        cy.get(".author").then(($a) => {
          this.author = $a.text();
        });
        cy.get(".btn-outline-primary").then(($btn) => {
          this.likesNumber = $btn.text();
        });
      });
  }

  clickOnProperty(locator) {
    cy.get(".article-preview")
      .eq(this.index)
      .within(() => {
        cy.get(locator).click();
      });
  }

  titleLocator = "h1";
  authorLocator = ".author";
  likesNumberLocator = ".btn-outline-primary";
}

function generatePartialUrlBaseOnTitle(title) {
  return title
    .toLowerCase()
    .replace(/(\s|\.|\')/g, "-")
    .replace(/(\(|\)|\:|\,)/g, "");
}

export default Article;
