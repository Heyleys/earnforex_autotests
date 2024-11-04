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
            cy.isSortedData(dates, false);
        });
    });

    it('sorts brokers by name from 0 to Z on first click', () => {
        cy.get('td:nth-child(2) > button.sort_btn').click();
        cy.get('.brokers__table-broker a').then(($elements) => {
            const brokerNames = [...$elements].map((el) => {
              let name = el.innerText.trim();
              
              if (name.includes('partial')) {
                name = name.replace('partial', '').trim();
              }
              if (name.includes('locked')) {
                name = name.replace('locked', '').trim();
              }
              return name;
            });
            let brokerNamesnew = brokerNames.slice(1,670);
            console.log(brokerNamesnew);
            cy.isBrokerNameSorted(brokerNamesnew, true);
        });
    });

    it('sorts brokers by name from Z to 0 on second click', () => {
        cy.get('td:nth-child(2) > button.sort_btn').dblclick();
        cy.get('.brokers__table-broker a').then(($elements) => {
            const brokerNames = [...$elements].map((el) => {
              let name = el.innerText.trim();
              
              if (name.includes('partial')) {
                name = name.replace('partial', '').trim();
              }
              if (name.includes('locked')) {
                name = name.replace('locked', '').trim();
              }
              return name;
            });
            let brokerNamesnew = brokerNames.slice(1,670);
            console.log(brokerNamesnew);
            cy.isBrokerNameSorted(brokerNamesnew, false);
        });
    });

    it.only('sorts brocker by anchor from 0 to Z', () => {
        cy.get('td:nth-child(4) > button.sort_btn').click();
        cy.get('.brokers__table-anchor a').then(($elements) => {
            const brokerAnchors = [...$elements].map((el) => {
              let name = el.innerText.trim();
              return name;
            });
            let brokerAnchorsTrim = brokerAnchors.slice(1,10);
            console.log(brokerAnchorsTrim);
            // cy.isBrokerNameSorted(brokerNamesnew, false);
        });
    });

});