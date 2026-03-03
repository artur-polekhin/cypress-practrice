class SignInForm {

    get emailField() {
        return cy.get('#signinEmail');
    }

    get passwordField() {
        return cy.get('#signinPassword');
    }

    get loginButton() {
        return cy.get('.modal-content .btn-primary');
    }

    get wrongDataErrorMessage() {
        return cy.get('.alert-danger');
    }

    enterEmail(email) {
        this.emailField.type(email);
    }

    enterPassword(password) {
        this.passwordField.type(password);
    }

    loginWithCredentials(email, password) {
        this.enterEmail(email);
        this.enterPassword(password);
        this.loginButton.click();
    }
}

export default new SignInForm();