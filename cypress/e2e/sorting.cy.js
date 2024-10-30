///<reference types="cypress" />

describe('Sorting brokers', () => {

    beforeEach(() => {
        cy.visit(Cypress.env('loginPageUrl'));
        cy.loginBreditor();
    });
    
    it('sorts brokers by date from newest to oldest on first click', () => {
        cy.get('tr td.brokers__table-when')
        .then((cells) => {
            const dates = cells.map((i, el) => Cypress.$(el).text()).get();
            cy.isSorted(dates, false); // Проверка, что отсортировано от новых к старым
  });

    });

});