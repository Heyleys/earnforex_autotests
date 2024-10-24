///<reference types="cypress" />
it("send_contact_form", () => {
    const username = () => cy.get(':nth-child(1) > .app-input > input');
    const email = () => cy.get(':nth-child(2) > .app-input > input');
    const message = () => cy.get('.app-input > textarea');
    const subject = () => cy.get('.app-select__selected')
    const subject_brockerlisting = () => cy.contains('div.app-select__item', 'Broker listing');
    const subject_advertising = () => cy.get('div.app-select_items div:nth-child(3)');
    const subject_bugReport = () => cy.get('div.app-select_items div:nth-child(4)');
    const subject_other = () => cy.get('div.app-select_items div:nth-child(5)');
    const sendbutton = () => cy.get('.loading-btn__content');
    const modalclose = () => cy.get('span.info-modal__close');
    
    cy.visit("https://ef-new.solardigital.com.ua/contact/");
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.get('.cookieControl__BarButtons > :nth-child(3)').click();
    username().type("test");
    email().type("test@tes2t.com");
    message().type("test test test testtesttesttesttest testtesttesttest testtesttest test test");
    subject().click();
    subject_brockerlisting().click();
    cy.intercept('POST', 'https://www.google.com/recaptcha/api2/**', { statusCode: 200, body: { success: true } });
    sendbutton().click();
    cy.contains(/Mail sent successfully!|Mail sent error!/).should('be.visible');
    modalclose().click();

})