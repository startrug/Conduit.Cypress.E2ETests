class Article {

  index;
  title;
  partialUrl;
  author;
  likesNumber;
  likesNumberLocator = ".btn-sm";
  titleLocator = "h1";
  authorLocator = ".author";
  preview = ".article-preview";
  likesNumberOfSelected = this.preview.concat(" ", this.likesNumberLocator);

  constructor(index) {
    this.index = index;
    cy.get(this.preview)
      .eq(this.index)
      .within(() => {
        cy.get(this.titleLocator).then(($h) => {
          this.title = $h.text();
          this.partialUrl = generatePartialUrlBaseOnTitle(this.title);
        });
        cy.get(this.authorLocator).then(($a) => {
          this.author = $a.text();
        });
        cy.get(this.likesNumberLocator).then(($btn) => {
          this.likesNumber = parseInt($btn.text());
        });
      });
  }

  clickOnProperty(locator) {
    cy.get(this.preview)
      .eq(this.index)
      .within(() => {
        cy.get(locator).click();
      });
  }
}

function generatePartialUrlBaseOnTitle(title) {
  return title
    .toLowerCase()
    .replace(/(\s|\.|\')/g, "-")
    .replace(/(\(|\)|\:|\,|\#)/g, "");
}

export default Article;
