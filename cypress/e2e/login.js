///<reference types="cypress" />
describe('Login breditor', () => {
    
const login_input = () => cy.get(':nth-child(1) > .input__container > .input__field');
const pass_input = () => cy.get(':nth-child(2) > .input__container > .input__field');
const signup_btn = () => cy.get('.btn > span');

    beforeEach(() => {
        cy.visit("https://ef-breditor.solardigital.com.ua/manager-login")
        login_input().should('be.visible').clear();
        pass_input().should('be.visible').clear();
        signup_btn().should('be.visible');
    });

    it("Login first credits", () => {
        login_input().click().type(Cypress.env('LOGIN1'))
        pass_input().click().type(Cypress.env('PASS1'))
        signup_btn().click();

        cy.url().should('include', 'https://ef-breditor.solardigital.com.ua/brokers');
    })

    it("Login second credits", () => {
        login_input().click().type(Cypress.env('LOGIN2'))
        pass_input().click().type(Cypress.env('PASS2'))
        signup_btn().click()
        
        cy.url().should('include', 'https://ef-breditor.solardigital.com.ua/brokers');
    })

    it("Login third credits", () => {
        login_input().click().type(Cypress.env('LOGIN3'))
        pass_input().click().type(Cypress.env('PASS2'))
        signup_btn().click()

        cy.url().should('include', 'https://ef-breditor.solardigital.com.ua/brokers');
    })

    it('check error with wrong password', () => {
        login_input().click().type(Cypress.env('LOGIN3'))
        pass_input().click().type(Cypress.env('WRONG_PASS1'))
        signup_btn().click()
        cy.get('.notification').should('be.visible')
        .and('contain.text', 'Sorry, wrong email or password. Try again');
    });

    it('check error with wrong email', () => {
        login_input().click().type(Cypress.env('WRONG_LOGIN1'))
        pass_input().click().type(Cypress.env('PASS2'))
        signup_btn().click()
        cy.get('.notification').should('be.visible')
        .and('contain.text', 'Sorry, wrong email or password. Try again');
    });

    after(() => {
        cy.log('tests completed');
    });
});

