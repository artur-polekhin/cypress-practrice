/// <reference types="cypress" />
import users from "../../fixtures/users.json"


describe('Public API requests', () => {
    it('Get brands 1', () => {
        cy.request('GET', 'api/cars/brands').then((response) => {
            const cars = response.body.data;
            cy.log(cars);
            expect(response.status).to.eq(200);
            expect(cars).to.have.length(5);
            expect(cars[0].title).to.eq('Audi');
        })
    })

    it('Get brands 2', () => {
        cy.request('GET', 'api/cars/brands').then((response) => {
            const cars = response.body.data;
            cy.log(cars);
            cy.wrap(cars).should('have.length', 5);
            cy.wrap(response.status).should('eq', 200);
        })
    })

    it('Get brands 3', () => {
        cy.request('GET', 'api/cars/brands').its('status').should('eq', 200);
    })
})

describe.only('Private API requests', () => {
    let sid;
    before(() => {
        cy.request('POST', 'api/auth/signin', {
            email: users.correctUser.email,
            password: users.correctUser.correctPassword
        }).then((response) => {
            cy.log(JSON.stringify(response.body));
            const headers = response.headers;
            sid = headers['set-cookie'][0].split(';')[0];
            cy.log(sid);
            // cy.log(JSON.stringify(sid['set-cookie'][0].split(';')[0]));
        })
    })
    // it.only('Auth', () => {
    //     cy.request('POST', 'api/auth/signin', {
    //         email: users.correctUser.email,
    //         password: users.correctUser.correctPassword
    //     }).then((response) => {
    //         cy.log(JSON.stringify(response.body));
    //         const headers = response.headers;
    //         const sid = headers['set-cookie'][0].split(';')[0];
    //         cy.log(sid);
    //         // cy.log(JSON.stringify(sid['set-cookie'][0].split(';')[0]));
    //     })
    // })

    it.only('Add a car', () => {
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
            expect(response.status).to.eq(201);
            expect(response.body.data.carBrandId).to.eq(1);
            expect(response.body.data.carModelId).to.eq(1);
        })
    })

    it('Delete cars', () => {
        cy.request({
            url: 'api/users/',
            method: 'DELETE',
            body: {
                // carBrandId: 1,
                // carModelId: 1,
                // mileage: 99999
            },
            headers: {
                'Cookie': sid
            },
            failOnStatusCode: false
        }).then((response) => {
            cy.log(JSON.stringify(response));
            expect(response.status).to.eq(201);
            expect(response.body.data.carBrandId).to.eq(1);
            expect(response.body.data.carModelId).to.eq(1);
        })
    })
})
// 'https://qauto.forstudy.space/api/cars/brands'