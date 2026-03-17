/// <reference types="cypress" />
import users from "../../fixtures/users.json"
import HomePage from "../../pom/pages/HomePage";
import SignInForm from "../../pom/forms/SignInForm";


let sid;
let carId;
let userId;
const userName = 'Name';
const userLastName = 'Last';
let interceptUser = {
    "status": "ok",
    "data": {
        "userId": userId,
        "photoFilename": "default-user.png",
        "name": "John",
        "lastName": "Snow"
    }
}

describe('Private API requests', () => {


    before(() => {
        cy.intercept('GET', '/api/users/profile/', interceptUser)
        cy.request('POST', 'api/auth/signin', {
            email: users.correctUser.email,
            password: users.correctUser.correctPassword
        }).then((response) => {
            cy.log(JSON.stringify(response.body));
            const headers = response.headers;
            sid = headers['set-cookie'][0].split(';')[0];
            userId = JSON.stringify(response.body.data.userId);
            cy.log(userId);
            cy.log(sid);
        })
    })

    it('Get user data', () => {
        cy.request({
            url: 'api/users/current/',
            method: 'GET',
            body: {},
            headers: {
                'Cookie': sid
            },
            failOnStatusCode: false
        })
            .then((response) => {
                cy.log(JSON.stringify(response.body.data));
                expect(response.status).to.eq(200);
                expect(JSON.stringify(response.body.data.userId)).to.eq(userId);
            })
    })

    it('Get authenticated user data', () => {
        cy.request({
            url: 'api/users/profile/',
            method: 'GET',
            body: {},
            headers: {
                'Cookie': sid
            },
            failOnStatusCode: false
        })
            .then((response) => {
                cy.log(JSON.stringify(response.body.data));
                expect(response.status).to.eq(200);
                expect(JSON.stringify(response.body.data.userId)).to.eq(userId);
                expect(response.body.data.name).to.eq(userName);
                expect(response.body.data.lastName).to.eq(userLastName);
            })
    })

    it('Get car brands', () => {
        cy.request({
            url: 'api/cars/brands/',
            method: 'GET',
            body: {},
            headers: {
                'Cookie': sid
            },
            failOnStatusCode: false
        })
            .then((response) => {
                cy.log(JSON.stringify(response.body.data));
                expect(response.status).to.eq(200);
                const cars = response.body.data;
                expect(cars.length).to.eq(5);
                expect(cars[0].title).to.eq('Audi');
            })
    })

    it('Add a car', () => {
        cy.request({
            url: 'api/cars/',
            method: 'POST',
            body: {
                carBrandId: 1,
                carModelId: 1,
                mileage: 99999
            },
            headers: {
                'Cookie': sid
            },
            failOnStatusCode: false
        }).then((response) => {
            cy.log(JSON.stringify(response));
            carId = response.body.data.id;
            cy.log(carId)
            expect(response.status).to.eq(201);
            expect(response.body.data.carBrandId).to.eq(1);
            expect(response.body.data.carModelId).to.eq(1);
        })
    })

    it('Delete car', () => {
        cy.request({
            url: `api/cars/${carId}`,
            method: 'DELETE',
            body: {
            },
            headers: {
                'Cookie': sid
            },
            failOnStatusCode: false
        }).then((response) => {
            cy.log(JSON.stringify(response));
            expect(response.status).to.eq(200);
        })
    })
})

context('Intercept', () => {

    it('Intercept user profile', () => {
        HomePage.visit();
        HomePage.signInButton.click();
        cy.intercept('GET', 'api/users/profile', interceptUser)
        cy.fixture('users.json').then((users) => {
            SignInForm.loginWithCredentials(users.correctUser.email, users.correctUser.correctPassword);
            cy.get('a.-profile').click();
            cy.get('p.profile_name').should('have.text', 'John Snow');
        });

    })
})

