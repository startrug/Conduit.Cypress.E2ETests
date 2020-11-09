/// <reference path="../support/customCommands.d.ts" />

import Article from '../page_objects/article.js';
import { getRandomNumber } from '../support/util.js';

let selectedTag;
let article;

describe('Home page tests before user logging in', () => {
	describe('When home page is opened', () => {
		before(() => {
			cy.visit('#');
		});
		it('then Global Feed tab is visible', () => {
			cy.getNavLinks().should('contain', 'Global Feed');
		});

		it('then list of articles preview contains 10 elements', () => {
			cy.getArticlePreviews().should('have.length', 10);
		});
	});

	describe('When user that not logged in has clicked on heart icon', () => {
		before(() => {
			let articleIndex = getRandomNumber();
			article = new Article(articleIndex);
			article.clickOnProperty(article.likesNumberLocator);
		});

		it('then number of likes should not be changed', () => {
			cy.get('.article-preview .btn-outline-primary')
				.eq(article.index)
				.then(($likes) => {
					expect(parseInt($likes.text())).to.equal(article.likesNumber);
				});
		});
	});

	describe('When article preview clicked on', () => {
		before(() => {
			cy.visit('#');
			cy.checkIfLoadingFinished();
			let articleIndex = getRandomNumber();
			article = new Article(articleIndex);
			article.clickOnProperty(article.titleLocator);
		});

		it('then URL address should contain article title', () => {
			cy.hash().should('include', article.partialUrl);
		});

		it('then article page should contains title in main header', () => {
			cy.get(article.titleLocator).should('have.text', article.title);
		});

		it('then proper author name should be visible in article page', () => {
			cy.get(article.authorLocator).should('have.text', article.author);
		});

		it('then log in or sign up request is displayed', () => {
			cy.contains('Sign in or sign up to add comments on this article.').should(
				'be.visible',
			);
		});
	});

	describe('When author name is clicked on', () => {
		before(() => {
			cy.visit('#');
			cy.checkIfLoadingFinished();
			let articleIndex = getRandomNumber();
			article = new Article(articleIndex);
			article.clickOnProperty(article.authorLocator);
		});

		it('then URL address should contain author name', () => {
			cy.hash().should('include', article.author.split(' ')[0]);
		});
		it('then My Articles tab should be active', () => {
			cy.getNavLinks().contains('My Articles').should('have.class', 'active');
		});

		it("then author name should be displayed in header of author's page", () => {
			cy.get('h4').should('have.text', article.author);
		});

		it("then article selected on Global feed list should be visible on author's page", () => {
			cy.get('.article-preview h1').contains(article.title);
		});
	});

	describe('When tag is clicked on in popular tags section', () => {
		before(() => {
			cy.visit('#');
			cy.checkIfLoadingFinished();
			cy.get('div.tag-list a')
				.as('list')
				.last()
				.then(($t) => {
					selectedTag = $t.text();
					cy.wrap($t).click();
				});
		});

		it('then tab with selected tag text should be visible', () => {
			cy.get('.nav-link.active').should('contain.text', selectedTag);
		});
	});
});
