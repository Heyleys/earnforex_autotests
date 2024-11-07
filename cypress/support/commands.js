import { loginInput, passwordInput, signupButton, logoutButton, lastBrockerFromList } from './locators';


Cypress.Commands.add('loginBreditor', () => {
    const username = Cypress.env('LOGIN1');
    const password = Cypress.env('PASS1');

    loginInput().click().type(username);
    passwordInput().click().type(password);
    signupButton().click();
    lastBrockerFromList().should('be.visible');
});

Cypress.Commands.add('logoutBreditor', () => {
  logoutButton().should('be.visible')
  .click();
});


Cypress.Commands.add('checkBrokerCount', () => {
    cy.get('td.brokers__table-broker', { timeout: 10000 })
    .should('have.length.greaterThan', 600).should('be.visible')
    .then((brokers) => {
      cy.log(`Общее количество брокеров: ${brokers.length}`);
    });
})

Cypress.Commands.add('isSortedData', (array, ascending = true) => {
    const sortedArray = ascending ? [...array].sort() : [...array].sort().reverse();
    expect(array).to.deep.equal(sortedArray);
});

Cypress.Commands.add('isBrokerNameSorted', (array, ascending = false) => {
    // const sortedArray = ascending ? [...array].sort() : [...array].sort().reverse();

    const sortedArray = [...array].sort((a, b) => {
        const nameA = a.toLowerCase();
        const nameB = b.toLowerCase();
        return nameA.localeCompare(nameB); // сортировка в алфавитном порядке
    });

    // Переворачиваем массив, если сортировка должна быть в обратном порядке
    if (!ascending) {
        sortedArray.reverse();
    }
    console.log(sortedArray);
    expect(array).to.deep.equal(sortedArray);
    
});

Cypress.Commands.add('isCompaniesSorted', (array, ascending = false) => {
    const sortedArray = [...array].sort((a, b) => {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base', ignorePunctuation: false });
    });

    // Если требуется обратный порядок, переворачиваем массив
    if (!ascending) {
      sortedArray.reverse();
    }

    console.log(sortedArray);
    expect(array).to.deep.equal(sortedArray);
})


//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })