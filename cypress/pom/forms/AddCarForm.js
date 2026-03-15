class AddCarForm {

    get addCarForm() {
        return cy.get('.modal-content');
    }

    get brandDropdown() {
        return cy.get('#addCarBrand');
    }

    get modelDropdown() {
        return cy.get('#addCarModel');
    }

    get mileageField() {
        return cy.get('#addCarMileage');
    }

    get closeButton() {
        return cy.get('.close > span');
    }

    get cancelButton() {
        return cy.get('.modal-footer .btn-secondary');
    }

    get addButton() {
        return cy.get('.modal-footer .btn-primary');
    }

    get firstCarName() {
        return cy.get('li:first-child p');
    }

    get validationErrorMessage() {
        return cy.get('.invalid-feedback');
    }

    selectBrand(brand) {
        this.brandDropdown.select(brand);
    }

    selectModel(model) {
        this.modelDropdown.select(model);
    }

    enterMileage(mileage) {
        this.mileageField.type(mileage);
    }

    addNewCar(brand, model, mileage) {
        this.selectBrand(brand);
        this.selectModel(model);
        this.enterMileage(mileage = Math.floor(Math.random() * 1000000));
    }


}

export default new AddCarForm();