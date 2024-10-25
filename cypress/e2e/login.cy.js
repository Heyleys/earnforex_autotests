///<reference types="cypress" />

import { loginInput, passwordInput, signupButton, rememberMeCheckbox } from '../support/locators';

describe('Login breditor', () => {

Cypress.Commands.add('checkBrokerCount', () => {
    cy.get('td.brokers__table-broker')
    .should('have.length.greaterThan', 600)
    .then((brokers) => {
      cy.log(`Общее количество брокеров: ${brokers.length}`);
    });
})

    beforeEach(() => {
        cy.visit("https://ef-breditor.solardigital.com.ua/manager-login")
        loginInput().should('be.visible').clear();
        passwordInput().should('be.visible').clear();
        signupButton().should('be.visible');
    });

    it("Login first credits", () => {
        // loginInput().click().type(Cypress.env('LOGIN1'))
        // passwordInput().click().type(Cypress.env('PASS1'))
        // signupButton().click();
        // cy.url().should('include', 'https://ef-breditor.solardigital.com.ua/brokers');
        // cy.checkBrokerCount();
        cy.log('')
        cy.login
    })

    it("Login second credits", () => {
        loginInput().click().type(Cypress.env('LOGIN2'))
        passwordInput().click().type(Cypress.env('PASS2'))
        signupButton().click()
        cy.url().should('include', 'https://ef-breditor.solardigital.com.ua/brokers');
        cy.checkBrokerCount();
    })

    it("Login third credits", () => {
        loginInput().click().type(Cypress.env('LOGIN3'))
        passwordInput().click().type(Cypress.env('PASS2'))
        signupButton().click()
        cy.url().should('include', 'https://ef-breditor.solardigital.com.ua/brokers');
        cy.checkBrokerCount();
    })

    it.only('login with remember checkbox', () => {
        loginInput().click().type(Cypress.env('LOGIN1'));
        passwordInput().click().type(Cypress.env('PASS1'));
        rememberMeCheckbox().check();
        signupButton().click();
        cy.url().should('include', 'https://ef-breditor.solardigital.com.ua/brokers');
        cy.checkBrokerCount();
    });

    it('check error with wrong password', () => {
        loginInput().click().type(Cypress.env('LOGIN3'))
        passwordInput().click().type(Cypress.env('WRONG_PASS1'))
        signupButton().click()
        cy.get('.notification').should('be.visible')
        .and('contain.text', 'Sorry, wrong email or password. Try again');
    });

    it('check error with wrong email', () => {
        loginInput().click().type(Cypress.env('WRONG_LOGIN1'))
        passwordInput().click().type(Cypress.env('PASS2'))
        signupButton().click()
        cy.get('.notification').should('be.visible')
        .and('contain.text', 'Sorry, wrong email or password. Try again');
    });

    after(() => {
        cy.log('tests completed');
    });
});

