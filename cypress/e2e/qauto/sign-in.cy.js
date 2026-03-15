/// <reference types="cypress" />

import SignInForm from "../../pom/forms/SignInForm";
import HomePage from "../../pom/pages/HomePage";
import users from "../../fixtures/users.json"
import GaragePage from "../../pom/pages/GaragePage";

describe('Sign In Form', () => {
    beforeEach(() => {
        HomePage.visit();
        HomePage.signInButton.click();
    })

    context('Sign with valid credentials', () => {

        it.only('Sing with valid credentials', () => {
            cy.fixture('users.json').then((users) => {
                SignInForm.loginWithCredentials(users.correctUser.email, users.correctUser.correctPassword);
            });
            GaragePage.pageTitle.should('have.text', 'Garage');
        })

        it('Sing with invalid password', () => {
            SignInForm.loginWithCredentials('asdf@asdf.com', 'R1asdlfkj');
            SignInForm.wrongDataErrorMessage.should('have.text', 'Wrong email or password');;
        })
    })
})