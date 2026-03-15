class HomePage {

    get signInButton() {
        return cy.get('.header .header_signin');
    }

    get signUpButton() {
        return cy.get('.btn-primary');
    }

    visit() {
        cy.visit('/');
    }
}

export default new HomePage();