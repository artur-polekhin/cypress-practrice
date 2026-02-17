/// <reference types="cypress" />

describe('Search elements', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('cy.contains', () => {
        cy.contains('h1', 'Do more!');
        cy.contains('button', 'Guest log in');
        cy.get('header nav');
    });

    it('find', () => {
        cy.get('header').find('button');

    });

    it('children', () => {
        cy.get('.header_nav').children('button');
    });

    it('parent', () => {
        cy.get('a.btn').parent();
    });

    it('within', () => {
        cy.get('.header_signin').click();
        cy.get('.modal-body').within(() => {
            cy.get('#signinEmail');
        });
    });

    it('closest', () => {
        cy.get('.header-link').closest('div');
    });
});

describe('Multiple elements', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('fist, last, eq', () => {
        cy.get('.socials_link').first();
        cy.get('.socials_link').last();
        cy.get('.socials_link').eq(1);
    });

    it('filter', () => {
        cy.get('.socials_icon').filter('.icon-youtube');
    });
}); 