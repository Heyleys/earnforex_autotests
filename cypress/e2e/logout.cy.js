///<reference types="cypress" />

import { loginInput, passwordInput, signupButton, logoutButton, lastBrockerFromList } from '../support/locators';

describe('Logout breditor', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('loginPageUrl'));
        loginInput().should('be.visible').clear();
        passwordInput().should('be.visible').clear();
        signupButton().should('be.visible');
        cy.loginBreditor();
    });
    
    it('Logout positive from dashbord', () => {
        cy.logoutBreditor();
        cy.url().should('eq', Cypress.env('loginPageUrl'));
    });

    it('Logout positive from brocker editor', () => {
        lastBrockerFromList().click();
        cy.get('#tabs').should('be.visible');
        cy.logoutBreditor();
        cy.url().should('eq', Cypress.env('loginPageUrl'));
    });

    it('doesnt open dashbord by link after logout', () => {
        cy.logoutBreditor();
        cy.url().should('eq', Cypress.env('loginPageUrl'));
        cy.visit(Cypress.env('dashboardPageUrl'));
        cy.url().should('eq', Cypress.env('placeholderPage'))
    });

    it('Return to the dashboard after logout using the Back button.', () => {
        cy.logoutBreditor();
        cy.url().should('eq', Cypress.env('loginPageUrl'));
        cy.go('back');
        cy.url().should('eq', Cypress.env('placeholderPage'))
    });
});