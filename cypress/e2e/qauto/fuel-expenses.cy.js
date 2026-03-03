/// <reference types="cypress" />

import AddExpenseForm from "../../pom/forms/AddExpenseForm";
import SignInForm from "../../pom/forms/SignInForm";
import FuelExpensesPage from "../../pom/pages/FuelExpensesPage";
import HomePage from "../../pom/pages/HomePage";

describe('Garage page', () => {
    beforeEach(() => {
        HomePage.visit();
        HomePage.signInButton.click();
        cy.fixture('users.json').then((users) => {
            SignInForm.loginWithCredentials(users.correctUser.email, users.correctUser.correctPassword);
        });
    });

    context('Fuel expenses', () => {
        beforeEach(() => {
            FuelExpensesPage.fuelExpensesLink.click();
        })
        context('Open the "Fuel expenses" page', () => {
            it('Open the "Fuel expenses" page', () => {
                cy.contains('h1', 'Fuel expenses');
            });

            it('Open the "Add an expense" form', () => {
                FuelExpensesPage.addExpenseButton.click()
                AddExpenseForm.addExpenseForm.should('be.visible');
            });
        });

        context('"Fuel expenses" form validation', () => {
            it('Open the "Fuel expenses" page', () => {
                FuelExpensesPage.addExpenseButton.click()
                AddExpenseForm.addMileage(2);
                AddExpenseForm.enterNumberOfLiters(1);
                AddExpenseForm.enterTotalCost(10);
                AddExpenseForm.addButton.click();
                AddExpenseForm.addExpenseForm.should('not.be.visible');
            });

            context('"Number of liters" field validation', () => {
                it('liter is empty', () => {
                    FuelExpensesPage.addExpenseButton.click()
                    AddExpenseForm.addMileage(1);
                    AddExpenseForm.numberOfLiersField.focus();
                    AddExpenseForm.numberOfLiersField.blur();
                    AddExpenseForm.enterTotalCost(1000000.00);
                    AddExpenseForm.validationErrorMessage.should('have.text', 'Liters required');
                    AddExpenseForm.addButton.should('be.disabled');
                });

                it('liter = 0', () => {
                    FuelExpensesPage.addExpenseButton.click()
                    AddExpenseForm.addMileage(1);
                    AddExpenseForm.enterNumberOfLiters(0);
                    AddExpenseForm.enterTotalCost(1000000.00);
                    AddExpenseForm.validationErrorMessage.should('have.text', 'Liters has to be from 0.01 to 9999');
                    AddExpenseForm.addButton.should('be.disabled');
                })

                it('liter > 9999', () => {
                    FuelExpensesPage.addExpenseButton.click()
                    AddExpenseForm.addMileage(1);
                    AddExpenseForm.enterNumberOfLiters(10000);
                    AddExpenseForm.enterTotalCost(1000000.00);
                    AddExpenseForm.validationErrorMessage.should('have.text', 'Liters has to be from 0.01 to 9999');
                    AddExpenseForm.addButton.should('be.disabled');
                })

                it('liter = 0.01', () => {
                    FuelExpensesPage.addExpenseButton.click()
                    AddExpenseForm.addMileage(1);
                    AddExpenseForm.enterNumberOfLiters(0.01);
                    AddExpenseForm.enterTotalCost(1000000.00);
                    AddExpenseForm.validationErrorMessage.should('not.exist');
                    AddExpenseForm.addButton.should('be.enabled');
                })

                it('liter = 9999', () => {
                    FuelExpensesPage.addExpenseButton.click()
                    AddExpenseForm.addMileage(1);
                    AddExpenseForm.enterNumberOfLiters(9999);
                    AddExpenseForm.enterTotalCost(1000000.00);
                    AddExpenseForm.validationErrorMessage.should('not.exist');
                    AddExpenseForm.addButton.should('be.enabled');
                })
            });

            context('Total cost field validation', () => {
                it('Total cose = 1000000.00', () => {
                    FuelExpensesPage.addExpenseButton.click()
                    AddExpenseForm.addMileage(1);
                    AddExpenseForm.enterNumberOfLiters(1);
                    AddExpenseForm.enterTotalCost(1000000.00);
                    AddExpenseForm.validationErrorMessage.should('not.exist');
                    AddExpenseForm.addButton.should('be.enabled');
                });

                it('Total cose = 0.01', () => {
                    FuelExpensesPage.addExpenseButton.click()
                    AddExpenseForm.addMileage(1);
                    AddExpenseForm.enterNumberOfLiters(1);
                    AddExpenseForm.enterTotalCost(0.01);
                    AddExpenseForm.validationErrorMessage.should('not.exist');
                    AddExpenseForm.addButton.should('be.enabled');
                });

                it('Total cose is empty', () => {
                    FuelExpensesPage.addExpenseButton.click()
                    AddExpenseForm.addMileage(1);
                    AddExpenseForm.enterNumberOfLiters(1);
                    AddExpenseForm.totalCostField.focus();
                    AddExpenseForm.totalCostField.blur();
                    AddExpenseForm.validationErrorMessage.should('have.text', 'Total cost required');
                    AddExpenseForm.addButton.should('be.disabled');
                });

                it('Total cose = 0', () => {
                    FuelExpensesPage.addExpenseButton.click()
                    AddExpenseForm.addMileage(1);
                    AddExpenseForm.enterNumberOfLiters(1);
                    AddExpenseForm.enterTotalCost(0);
                    AddExpenseForm.validationErrorMessage.should('have.text', 'Total cost has to be from 0.01 to 1000000');
                    AddExpenseForm.addButton.should('be.disabled');
                });

                it('Total cose > 1000000', () => {
                    FuelExpensesPage.addExpenseButton.click()
                    AddExpenseForm.addMileage(1);
                    AddExpenseForm.enterNumberOfLiters(1);
                    AddExpenseForm.enterTotalCost(1000000.01);
                    AddExpenseForm.validationErrorMessage.should('have.text', 'Total cost has to be from 0.01 to 1000000');
                    AddExpenseForm.addButton.should('be.disabled');
                });

                it('Total cose > 1000000', () => {
                    FuelExpensesPage.addExpenseButton.click()
                    AddExpenseForm.addMileage(1);
                    AddExpenseForm.enterNumberOfLiters(1);
                    AddExpenseForm.enterTotalCost(0);
                    AddExpenseForm.validationErrorMessage.should('have.text', 'Total cost has to be from 0.01 to 1000000');
                    AddExpenseForm.addButton.should('be.disabled');
                });
            })


        });
    });
});   