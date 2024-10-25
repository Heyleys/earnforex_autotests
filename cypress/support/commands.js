import { loginInput, passwordInput, signupButton } from './locators';


Cypress.Commands.add('loginBreditor', () => {
    const username = Cypress.env('LOGIN1');
    const password = Cypress.env('PASS1');

    loginInput().click().type(username);
    passwordInput().click().type(password);
    signupButton().click();
});


Cypress.Commands.add('checkBrokerCount', () => {
    cy.get('td.brokers__table-broker', { timeout: 10000 })
    .should('have.length.greaterThan', 600).should('be.visible')
    .then((brokers) => {
      cy.log(`Общее количество брокеров: ${brokers.length}`);
    });
})
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })