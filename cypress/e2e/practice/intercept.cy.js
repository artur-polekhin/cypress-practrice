/// <reference types="cypress" />

import SignInForm from "../../pom/forms/SignInForm";
import HomePage from "../../pom/pages/HomePage";
import users from "../../fixtures/users.json"
import GaragePage from "../../pom/pages/GaragePage";

describe('Sign In Form', () => {
    beforeEach(() => {
        let response = {
            "status": "ok",
            "data": [
                {
                    "id": 487298,
                    "carBrandId": 4,
                    "carModelId": 18,
                    "initialMileage": 966501,
                    "updatedMileageAt": "2026-03-03T18:59:10.000Z",
                    "carCreatedAt": "2026-03-03T18:59:10.000Z",
                    "mileage": 966501,
                    "brand": "Porsche",
                    "model": "Panamera",
                    "logo": "porsche.png"
                }
            ]
        }

        // cy.intercept('GET', '/api/cars', response)
        cy.intercept('GET', '/api/cars').as('carsResp');
        HomePage.visit();
        HomePage.signInButton.click();
    })

    context('Sign with valid credentials', () => {

        it.only('Sing with valid credentials', () => {
            cy.fixture('users.json').then((users) => {
                SignInForm.loginWithCredentials(users.correctUser.email, users.correctUser.correctPassword);
                cy.wait('@carsResp').then((resp) => {
                    cy.log(resp);
                })
            });
            GaragePage.pageTitle.should('have.text', 'Garage');
        })

        it('Sing with invalid password', () => {
            SignInForm.loginWithCredentials('asdf@asdf.com', 'R1asdlfkj');
            SignInForm.wrongDataErrorMessage.should('have.text', 'Wrong email or password');;
        })
    })
})