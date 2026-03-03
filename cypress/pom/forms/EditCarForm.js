class EditCarForm {

    get editCarForm() {
        return cy.get('.modal-content');
    }

    get closeButton() {
        return cy.get('.close');
    }

    get cancelButton() {
        return cy.get('.modal-footer .btn-secondary');
    }
}

export default new EditCarForm();