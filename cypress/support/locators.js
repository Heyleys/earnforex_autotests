export const loginInput = () => cy.get(':nth-child(1) > .input__container > .input__field');
export const passwordInput = () => cy.get(':nth-child(2) > .input__container > .input__field');
export const signupButton = () => cy.get('button.btn.btn--accent');
export const rememberMeCheckbox = () => cy.get('[name="rememberMe"]');
export const logoutButton = () => cy.get('.logout_btn');
export let lastBrockerFromList = () => cy.get('tr:nth-child(1) td.brokers__table-broker a', { timeout: 10000 });