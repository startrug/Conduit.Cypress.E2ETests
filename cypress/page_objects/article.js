class Article {
	index;
	title;
	partialUrl;
	author;
	favoritesCount;
	likesNumber;
	likesNumberLocator = '.btn-sm';
	titleLocator = 'h1';
	authorLocator = '.author';
	preview = '.article-preview';
	likesNumberOfSelected = this.preview.concat(' ', this.likesNumberLocator);

	constructor(index) {
		this.index = index;
		cy.get(this.preview)
			.eq(this.index)
			.within(() => {
				cy.get(this.titleLocator).then(($h) => {
					this.title = $h.text();
					this.partialUrl = this.generatePartialUrlBaseOnTitle(this.title);
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

	markAsFavorite() {
		cy.server();
		cy.route('POST', '**/favorite').as('getFav');
		this.clickOnProperty(this.likesNumberLocator);
		cy.wait('@getFav').then((response) => {
			let favoritesCount = JSON.stringify(
				response.responseBody.article.favoritesCount,
			);
			expect(parseInt(favoritesCount)).to.be.greaterThan(0);
		});
	}

	unmarkAsFavorite() {
		cy.server();
		cy.route('DELETE', '**/favorite').as('deleteFav');
		this.clickOnProperty(this.likesNumberLocator);
		cy.wait('@deleteFav').then((response) => {
			let favoritesCount = JSON.stringify(
				response.responseBody.article.favoritesCount,
			);
			expect(parseInt(favoritesCount)).to.be.not.lessThan(0);
		});
	}

	generatePartialUrlBaseOnTitle(title) {
		return title
			.toLowerCase()
			.replace(/(\(|\)|\:|\,|\#|\-)/g, '')
			.replace(/(\s|\.|\')/g, '-');
	}
}

export default Article;
