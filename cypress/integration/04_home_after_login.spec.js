/// <reference path="../support/customCommands.d.ts" />

import * as user from '../data/valid_user.json';

describe('Home page tests after user logging in', () => {
	before(() => {
		cy.visit('#');
		cy.enterLoginData(user.email, user.password);
		cy.submitForm();
	});

	describe('When user is logged in and home page is opened', () => {
		it('then Your feed tab is visible', () => {
			cy.getNavLinks().contains('Your Feed').should('be.visible');
		});
		it('then Your Feed tab is active', () => {
			cy.getNavLinks().contains('Your Feed').should('have.class', 'active');
		});
		it('then Global feed tab is visible', () => {
			cy.getNavLinks().contains('Global Feed').should('be.visible');
		});

		it('then Global Feed tab is not active', () => {
			cy.getNavLinks()
				.contains('Global Feed')
				.should('not.have.class', 'active');
		});
	});

	describe('When Global Feed tab is opened', () => {
		before(() => {
			cy.getNavLinks().contains('Global Feed').click();
		});

		it('then list of articles preview contains 10 elements', () => {
			cy.getArticlePreviews().should('have.length', 10);
		});
	});
});
