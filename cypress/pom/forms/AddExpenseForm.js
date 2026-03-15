class AddExpenseForm {
    get addExpenseForm() {
        return cy.get('.modal-content');
    }

    get closeButton() {
        return cy.get('.close');
    }

    get cancelButton() {
        return cy.get('.modal-footer .btn-secondary');
    }

    get mileageField() {
        return cy.get('#addExpenseMileage');
    }

    get numberOfLiersField() {
        return cy.get('#addExpenseLiters');
    }

    get totalCostField() {
        return cy.get('#addExpenseTotalCost');
    }

    get addButton() {
        return cy.get('.modal-footer .btn-primary');
    }

    get validationErrorMessage() {
        return cy.get('.invalid-feedback');
    }

    get addButton() {
        return cy.get('.modal-footer .btn-primary');
    }

    enterNumberOfLiters(liters) {
        this.numberOfLiersField.type(liters);
    }

    enterTotalCost(cost) {
        this.totalCostField.type(cost);
        this.totalCostField.blur();
    }

    addMileage(mileage) {
        this.mileageField
            .invoke('val')
            .then(val => {
                const newValue = Number(val) + mileage
                this.mileageField
                    .clear()
                    .type(newValue)
            })
    }

    getCurrentMileageValue() {
        this.mileageField.then(value => {
            const mileage = value
            return mileage;
        })
    }

    getCurrentMileageInExpense() {
        cy.get('tbody tr:nth-child(1) td:nth-child(2)').then(value => {
            return value;
        })
    }


}

export default new AddExpenseForm();