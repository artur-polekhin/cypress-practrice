class SignUpForm {

    get nameField() {
        return cy.get('#signupName');
    }

    get lastNameField() {
        return cy.get('#signupLastName');
    }

    get emailField() {
        return cy.get('#signupEmail');
    }

    get passwordField() {
        return cy.get('#signupPassword');
    }

    get repeatPasswordField() {
        return cy.get('#signupRepeatPassword');
    }

    get registerButton() {
        return cy.get('.modal-content .btn-primary');
    }

    get validationErrorMessage() {
        return cy.get('.invalid-feedback');
    }

    get emptyFieldErrorMessage() {
        return cy.get('.invalid-feedback > p');
    }

    get alertErrorMessage() {
        return cy.get('.alert-danger');
    }

    enterName(name) {
        this.nameField.type(name);
        this.nameField.blur();
    }

    enterLastName(lastName) {
        this.lastNameField.type(lastName);
        this.lastNameField.blur();
    }

    enterEmail(email) {
        this.emailField.type(email);
        this.emailField.blur()
    }

    enterPassword(password) {
        this.passwordField.type(password);
        this.passwordField.blur();
    }

    enterRepeatPassword(repeatPassword) {
        this.repeatPasswordField.type(repeatPassword);
        this.repeatPasswordField.blur();
    }

    fillSignUpFormWithCredentials(name, lastName, email, password, repeatPassword) {
        this.enterName(name);
        this.enterLastName(lastName);
        this.enterEmail(email);
        this.enterPassword(password);
        this.enterRepeatPassword(repeatPassword);
        // this.registerButton.click();
    }

}

export default new SignUpForm();