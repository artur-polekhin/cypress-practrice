/// <reference types="cypress" />

import AddCarForm from "../../pom/forms/AddCarForm";
import AddExpenseForm from "../../pom/forms/AddExpenseForm";
import EditCarForm from "../../pom/forms/EditCarForm";
import SignInForm from "../../pom/forms/SignInForm";
import FuelExpensesPage from "../../pom/pages/FuelExpensesPage";
import GaragePage from "../../pom/pages/GaragePage";
import HomePage from "../../pom/pages/HomePage";
import users from "../../fixtures/users.json"

describe('Garage page', () => {
    beforeEach(() => {
        HomePage.visit();
        HomePage.signInButton.click();
        cy.fixture('users.json').then((users) => {
            SignInForm.loginWithCredentials(users.correctUser.email, users.correctUser.correctPassword);
        });
    });

    context('Open/close "Add a Car" form', () => {
        it('Open "Add a Car" form', () => {
            GaragePage.openAddCarForm();
            AddCarForm.addCarForm.should('exist');
            cy.contains('h4', 'Add a car');
            AddCarForm.closeButton.click();
            AddCarForm.addCarForm.should('not.exist');
        });

        it('Close "Add a Car" form by pressing "x" button', () => {
            GaragePage.openAddCarForm();
            AddCarForm.closeButton.click();
            AddCarForm.addCarForm.should('not.exist');
        });

        it('Close "Add a Car" form by pressing "Cancel" button', () => {
            GaragePage.openAddCarForm();
            AddCarForm.cancelButton.click();
            AddCarForm.addCarForm.should('not.exist');
        });
    });

    context.only('Add cars', () => {
        // let sid;
        // before(() => {
        //     cy.request('POST', 'api/auth/signin', {
        //         email: users.correctUser.email,
        //         password: users.correctUser.correctPassword
        //     }).then((response) => {
        //         cy.log(JSON.stringify(response.body));
        //         const headers = response.headers;
        //         sid = headers['set-cookie'][0].split(';')[0];
        //         cy.log(sid);
        //         // cy.log(JSON.stringify(sid['set-cookie'][0].split(';')[0]));
        //     })
        // })
        it('Add "Audi TT"', () => {
            GaragePage.openAddCarForm();
            AddCarForm.addNewCar('Audi', 'TT');
            AddCarForm.addButton.click();
            AddCarForm.firstCarName.should('contain.text', 'Audi TT');
        });

        it('Add "Audi R8"', () => {
            GaragePage.openAddCarForm();
            AddCarForm.addNewCar('Audi', 'R8');
            AddCarForm.addButton.click();
            AddCarForm.firstCarName.should('contain.text', 'Audi R8');
        });

        // it('Add "Audi Q7"', () => {
        //     GaragePage.openAddCarForm();
        //     AddCarForm.addNewCar('Audi', 'Q7');
        //     AddCarForm.addButton.click();
        //     AddCarForm.firstCarName.should('contain.text', 'Audi Q7');
        // });

        // it('Add "Audi A6"', () => {
        //     GaragePage.openAddCarForm();
        //     AddCarForm.addNewCar('Audi', 'A6');
        //     AddCarForm.addButton.click();
        //     AddCarForm.firstCarName.should('contain.text', 'Audi A6');
        // });

        // it('Add "Audi A8"', () => {
        //     GaragePage.openAddCarForm();
        //     AddCarForm.addNewCar('Audi', 'A8');
        //     AddCarForm.addButton.click();
        //     AddCarForm.firstCarName.should('contain.text', 'Audi A8');
        // });

        // it('Add "BMW 3"', () => {
        //     GaragePage.openAddCarForm();
        //     AddCarForm.addNewCar('BMW', '3');
        //     AddCarForm.addButton.click();
        //     AddCarForm.firstCarName.should('contain.text', 'BMW 3');
        // });

        // it('Add "BMW 5"', () => {
        //     GaragePage.openAddCarForm();
        //     AddCarForm.addNewCar('BMW', '5');
        //     AddCarForm.addButton.click();
        //     AddCarForm.firstCarName.should('contain.text', 'BMW 5');
        // });

        // it('Add "BMW X6"', () => {
        //     GaragePage.openAddCarForm();
        //     AddCarForm.addNewCar('BMW', 'X6');
        //     AddCarForm.addButton.click();
        //     AddCarForm.firstCarName.should('contain.text', 'BMW X6');
        // });

        // it('Add "BMW Z3"', () => {
        //     GaragePage.openAddCarForm();
        //     AddCarForm.addNewCar('BMW', 'Z3');
        //     AddCarForm.addButton.click();
        //     AddCarForm.firstCarName.should('contain.text', 'BMW Z3');
        // });

        // it('Add "Ford Fiesta"', () => {
        //     GaragePage.openAddCarForm();
        //     AddCarForm.addNewCar('Ford', 'Fiesta');
        //     AddCarForm.addButton.click();
        //     AddCarForm.firstCarName.should('contain.text', 'Ford Fiesta');
        // });

        // it('Add "Ford Focus"', () => {
        //     GaragePage.openAddCarForm();
        //     AddCarForm.addNewCar('Ford', 'Focus');
        //     AddCarForm.addButton.click();
        //     AddCarForm.firstCarName.should('contain.text', 'Ford Focus');
        // });

        // it('Add "Ford Fusion"', () => {
        //     GaragePage.openAddCarForm();
        //     AddCarForm.addNewCar('Ford', 'Fusion');
        //     AddCarForm.addButton.click();
        //     AddCarForm.firstCarName.should('contain.text', 'Ford Fusion');
        // });

        // it('Add "Ford Mondeo"', () => {
        //     GaragePage.openAddCarForm();
        //     AddCarForm.addNewCar('Ford', 'Mondeo');
        //     AddCarForm.addButton.click();
        //     AddCarForm.firstCarName.should('contain.text', 'Ford Mondeo');
        // });

        // it('Add "Ford Sierra"', () => {
        //     GaragePage.openAddCarForm();
        //     AddCarForm.addNewCar('Ford', 'Sierra');
        //     AddCarForm.addButton.click();
        //     AddCarForm.firstCarName.should('contain.text', 'Ford Sierra');
        // });

        // it('Add "Porsche 911"', () => {
        //     GaragePage.openAddCarForm();
        //     AddCarForm.addNewCar('Porsche', '911');
        //     AddCarForm.addButton.click();
        //     AddCarForm.firstCarName.should('contain.text', 'Porsche 911');
        // });

        // it('Add "Porsche Cayenne"', () => {
        //     GaragePage.openAddCarForm();
        //     AddCarForm.addNewCar('Porsche', 'Cayenne');
        //     AddCarForm.addButton.click();
        //     AddCarForm.firstCarName.should('contain.text', 'Porsche Cayenne');
        // });

        // it('Add "Porsche Panamera"', () => {
        //     GaragePage.openAddCarForm();
        //     AddCarForm.addNewCar('Porsche', 'Panamera');
        //     AddCarForm.addButton.click();
        //     AddCarForm.firstCarName.should('contain.text', 'Porsche Panamera');
        // });
    });

    context('Validation of "Mileage" field', () => {
        it('Empty Mileage field', () => {
            GaragePage.openAddCarForm();
            AddCarForm.mileageField.focus();
            AddCarForm.mileageField.blur();
            cy.fixture('add-car-form-error-messages.json').then((errMessage) => {
                AddCarForm.validationErrorMessage.should('have.text', errMessage.message.mileageRequired);
                AddCarForm.mileageField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
            })
        });

        it('Mileage with "-" symbol', () => {
            GaragePage.openAddCarForm();
            AddCarForm.enterMileage('-');
            AddCarForm.mileageField.blur();
            cy.fixture('add-car-form-error-messages.json').then((errMessage) => {
                AddCarForm.validationErrorMessage.should('have.text', errMessage.message.mileageRequired);
                AddCarForm.mileageField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
            })
        });

        it('Mileage < 0', () => {
            GaragePage.openAddCarForm();
            AddCarForm.enterMileage('-1');
            AddCarForm.mileageField.blur();
            cy.fixture('add-car-form-error-messages.json').then((errMessage) => {
                AddCarForm.validationErrorMessage.should('have.text', errMessage.message.validationError);
                AddCarForm.mileageField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
            })
        });

        it('Mileage > 999999', () => {
            GaragePage.openAddCarForm();
            AddCarForm.enterMileage('1000000');
            AddCarForm.mileageField.blur();
            cy.fixture('add-car-form-error-messages.json').then((errMessage) => {
                AddCarForm.validationErrorMessage.should('have.text', errMessage.message.validationError);
                AddCarForm.mileageField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
            })
        });

        it('Mileage 999999', () => {
            GaragePage.openAddCarForm();
            AddCarForm.enterMileage('999999');
            AddCarForm.mileageField.blur();
            AddCarForm.validationErrorMessage.should('not.exist');
        });

        it('Mileage 0.0', () => {
            GaragePage.openAddCarForm();
            AddCarForm.enterMileage('0.0');
            AddCarForm.mileageField.blur();
            AddCarForm.validationErrorMessage.should('not.exist');
        });

        it('User can not enter alphabetic symbols', () => {
            GaragePage.openAddCarForm();
            AddCarForm.enterMileage('asdf');
            AddCarForm.mileageField.blur();
            cy.fixture('add-car-form-error-messages.json').then((errMessage) => {
                AddCarForm.mileageField.should('not.have.text', 'asdf');
                AddCarForm.validationErrorMessage.should('have.text', errMessage.message.mileageRequired);
                AddCarForm.mileageField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
            });
        });

    });

    context('Validation of the "Add" button', () => {
        it('The "Add" button is active if user inputted valid data', () => {
            GaragePage.openAddCarForm();
            AddCarForm.addNewCar('Audi', 'TT');
            AddCarForm.addButton.should('be.enabled');
        });

        it('The "Add" button is active if user inputted valid data', () => {
            GaragePage.openAddCarForm();
            AddCarForm.mileageField.focus();
            AddCarForm.mileageField.blur();
            AddCarForm.addButton.should('be.disabled');
        });

        it('The "Add" button is active if user inputted valid data', () => {
            GaragePage.openAddCarForm();
            AddCarForm.enterMileage('-1');
            AddCarForm.mileageField.blur();
            AddCarForm.addButton.should('be.disabled');
        });
    });

    context('Car edit validation', () => {
        beforeEach(() => {
            GaragePage.editButton.click();
        });
        context('Open/Close the "Edit a car" form', () => {
            it('Open the "Edit a car" form', () => {
                EditCarForm.editCarForm.should('be.visible');
            });

            it('Close the "Edit a car" form by pressing on "x" button', () => {
                EditCarForm.closeButton.click();
                EditCarForm.editCarForm.should('not.be.visible');
            });

            it('Close the "Edit a car" form by pressing on "Cancel" button', () => {
                EditCarForm.cancelButton.click();
                EditCarForm.editCarForm.should('not.be.visible');
            });

        });
    });

    context('Add fuel expense', () => {
        beforeEach(() => {
            GaragePage.addCarButton.click();
        });
        context('Open/close the "Add an expense" form', () => {
            it('Open the "Add an expense" form', () => {
                AddExpenseForm.addExpenseForm.should('be.visible');
            });

            it('Close the "Add an expense" form by pressing on the "x" button', () => {
                AddExpenseForm.closeButton.click();
                AddExpenseForm.addExpenseForm.should('not.be.visible');
            })

            it('Close the "Add an expense" form by pressing on the "Cancel" button', () => {
                AddExpenseForm.cancelButton.click();
                AddExpenseForm.addExpenseForm.should('not.be.visible');
            })
        })
    });
});