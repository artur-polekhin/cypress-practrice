class FuelExpensesPage {

    get fuelExpensesLink() {
        return cy.get('a[routerlink="expenses"]');
    }

    get addExpenseButton() {
        return cy.get('.panel-page .btn-primary');
    }

    get carSelectButton() {
        return cy.get('#carSelectDropdown');
    }
}

export default new FuelExpensesPage();