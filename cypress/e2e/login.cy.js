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
        cy.visit(Cypress.env('loginPageUrl'));
        loginInput().should('be.visible').clear();
        passwordInput().should('be.visible').clear();
        signupButton().should('be.visible');
    });

    it("Login positive", () => {
        cy.loginBreditor();
        cy.url().should('eq', Cypress.env('dashboardPageUrl'));
        cy.checkBrokerCount();
    })

    it("Login with empty fields", () => {
        signupButton().click();
        loginInput().then(($el) => {
            const validity = $el[0].checkValidity();
            expect(validity).to.be.false;

            const validationMessage = $el[0].validationMessage;
            expect(validationMessage).to.contain("Please fill in this field");
        })
    })

    it("Login by email without domain", () => {
        loginInput().type('test@');
        signupButton().click();
        loginInput().then(($el) => {
            const validity = $el[0].checkValidity();
            expect(validity).to.be.false;

            const validationMessage = $el[0].validationMessage;
            expect(validationMessage).to.contain("Please enter a part following '@'");
        })
    })

    it("Login with Enter-button", () => {
        loginInput().type(Cypress.env('LOGIN1'));
        passwordInput().type(Cypress.env('PASS1')).type('{enter}');
        cy.url().should('eq', Cypress.env('dashboardPageUrl'));
        cy.checkBrokerCount();
    })

    it('login with remember checkbox', () => {
        loginInput().type(Cypress.env('LOGIN1'));
        passwordInput().type(Cypress.env('PASS1'));
        rememberMeCheckbox().check();
        signupButton().click();
        cy.url().should('eq', Cypress.env('dashboardPageUrl'));
        cy.checkBrokerCount();
    });

    it('login with wrong password', () => {
        loginInput().type(Cypress.env('LOGIN3'));
        passwordInput().type(Cypress.env('WRONG_PASS1'));
        signupButton().click();
        cy.get('.notification').should('be.visible')
        .and('contain.text', 'Sorry, wrong email or password. Try again');
    });

    it('login with wrong email', () => {
        loginInput().type(Cypress.env('WRONG_LOGIN1'));
        passwordInput().type(Cypress.env('PASS2'));
        signupButton().click();
        cy.get('.notification').should('be.visible')
        .and('contain.text', 'Sorry, wrong email or password. Try again');
    });

    it('xss attack', () => {
        loginInput().type('<script>alert(1)</script>');
        passwordInput().type('<b>bold</b>');
        signupButton().click();
        loginInput().then(($el) => {
            const validity = $el[0].checkValidity();
            expect(validity).to.be.false;  

            const validationMessage = $el[0].validationMessage;
            expect(validationMessage).to.contain("Please include an '@' in the email address");
        });
    });

    it('sql attack', () => {
        loginInput().type("' OR 1=1 --");
        passwordInput().type('LOGIN1');
        signupButton().click();
        loginInput().then(($el) => {
            const validity = $el[0].checkValidity();
            expect(validity).to.be.false;  

            const validationMessage = $el[0].validationMessage;
            expect(validationMessage).to.contain("Please include an '@' in the email address");
        });
    });

    after(() => {
        cy.log('tests completed');
    });
});

