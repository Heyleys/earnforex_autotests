export const loginInput = () => cy.get(':nth-child(1) > .input__container > .input__field');
export const passwordInput = () => cy.get(':nth-child(2) > .input__container > .input__field');
export const signupButton = () => cy.get('button.btn.btn--accent');
export const rememberMeCheckbox = () => cy.get('[name="rememberMe"]');
