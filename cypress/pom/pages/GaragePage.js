class GaragePage {

    get pageTitle() {
        return cy.contains('h1', 'Garage');
    }

    get addCarButton() {
        return cy.get('.panel-page .btn-primary');
    }

    get editButton() {
        return cy.get('li:first-child .btn-edit');
    }

    get addFuelExpenseButton() {
        return cy.get('li:first-child .btn-success');
    }

    openAddCarForm() {
        this.addCarButton.click();
    }
}

export default new GaragePage();