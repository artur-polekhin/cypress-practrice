/// <reference types="cypress" />

let email = `mapema6818+${Date.now()}@alibto.com`
const correctPassword = 'R7mQ2xLp9A'

describe('Sign Up Form', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('.btn-primary').click();
    })

    context('Sign Up Process', () => {

        it('Successful Sign Up', () => {
            cy.get('#signupName').type('First');
            cy.get('#signupLastName').type('Last');
            cy.get('#signupEmail').type(email);
            cy.get('#signupPassword').type(correctPassword);
            cy.get('#signupRepeatPassword').type(correctPassword);
            cy.get('.modal-content .btn-primary').click();
            cy.url().should('eq', 'https://qauto.forstudy.space/panel/garage');
        });

        it('Sign Up with existing user', () => {
            cy.get('#signupName').type('First');
            cy.get('#signupLastName').type('Last');
            cy.get('#signupEmail').type(email);
            cy.get('#signupPassword').type(correctPassword);
            cy.get('#signupRepeatPassword').type(correctPassword);
            cy.get('.modal-content .btn-primary').click();
            cy.get('.alert-danger').should('have.text', 'User already exists');
        });
    });

    context('First name validation', () => {

        it('First Name with 2 letters', () => {
            cy.get('#signupName').type('aa');
            cy.get('#signupName').blur();
            cy.get('.invalid-feedback').should('not.exist');
        })

        it('First Name with 20 letters', () => {
            cy.get('#signupName').type('qwertyuiolkjhgfdsazx');
            cy.get('#signupName').blur();
            cy.get('.invalid-feedback').should('not.exist');
        })

        it('First Name field is empty', () => {
            // Test fails because the error text is different from requirements
            cy.get('#signupName').focus();
            cy.get('#signupName').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Name is required');
        })

        it('First Name field with one symbol', () => {
            cy.get('#signupName').type('a');
            cy.get('#signupName').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Name has to be from 2 to 20 characters long');
        })

        it('First Name with 21 letters', () => {
            cy.get('#signupName').type('qwertyuiolkjhgfdsazxa');
            cy.get('#signupName').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Name has to be from 2 to 20 characters long');
            cy.get('#signupName').should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('First Name with a space', () => {
            cy.get('#signupName').type('qw ea');
            cy.get('#signupName').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Name is invalid');
            cy.get('#signupName').should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('First Name with special symbols', () => {
            cy.get('#signupName').type('awe$');
            cy.get('#signupName').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Name is invalid');
            cy.get('#signupName').should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('First Name with spaces', () => {
            // Test should fail because the app isn't allow trim the spaces
            cy.get('#signupName').type(' aa ');
            cy.get('#signupName').blur();
            cy.get('.invalid-feedback').should('not.exist');
        })
    });

    context('Last name validation', () => {

        it('Last Name with 2 letters', () => {
            cy.get('#signupLastName').type('aa');
            cy.get('#signupLastName').blur();
            cy.get('.invalid-feedback').should('not.exist');
        })

        it('Last Name with 20 letters', () => {
            cy.get('#signupLastName').type('qwertyuiolkjhgfdsazx');
            cy.get('#signupLastName').blur();
            cy.get('.invalid-feedback').should('not.exist');
        })

        it('Last Name field is empty', () => {
            // Test fails because the error text is different from requirements
            cy.get('#signupLastName').focus();
            cy.get('#signupLastName').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Last name is required');
        })

        it('Last Name field with one symbol', () => {
            cy.get('#signupLastName').type('a');
            cy.get('#signupLastName').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Last name has to be from 2 to 20 characters long');
        })

        it('Last Name with 21 letters', () => {
            cy.get('#signupLastName').type('qwertyuiolkjhgfdsazxa');
            cy.get('#signupLastName').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Last name has to be from 2 to 20 characters long');
            cy.get('#signupLastName').should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('Last Name with a space', () => {
            cy.get('#signupLastName').type('qw ea');
            cy.get('#signupLastName').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Last name is invalid');
            cy.get('#signupLastName').should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('Last Name with special symbols', () => {
            cy.get('#signupLastName').type('awe$');
            cy.get('#signupLastName').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Last name is invalid');
            cy.get('#signupLastName').should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('First Name with spaces', () => {
            // Test should fail because the app isn't allow trim the spaces
            cy.get('#signupLastName').type(' aa ');
            cy.get('#signupLastName').blur();
            cy.get('.invalid-feedback').should('not.exist');
        })
    })

    context('Email validation', () => {

        it('Email field is empty', () => {
            cy.get('#signupEmail').focus();
            cy.get('#signupEmail').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Email required');
            cy.get('#signupEmail').should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('Email without "@" symbol', () => {
            cy.get('#signupEmail').type('asdf.gmail.com');
            cy.get('#signupEmail').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Email is incorrect');
            cy.get('#signupEmail').should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('Email with 2 "@" symbols', () => {
            cy.get('#signupEmail').type('as@d@f.gmail.com');
            cy.get('#signupEmail').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Email is incorrect');
            cy.get('#signupEmail').should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('Email without "." symbol in domain', () => {
            cy.get('#signupEmail').type('asdf@gmailcom');
            cy.get('#signupEmail').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Email is incorrect');
            cy.get('#signupEmail').should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('Email without text before "@" symbol', () => {
            cy.get('#signupEmail').type('@gmail.com');
            cy.get('#signupEmail').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Email is incorrect');
            cy.get('#signupEmail').should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('Email without letters between "@" and "." symbols', () => {
            // Test fails because it allows to enter email with cyrillic symbols
            cy.get('#signupEmail').type('asdf@.com');
            cy.get('#signupEmail').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Email is incorrect');
            cy.get('#signupEmail').should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('Email with cyrillic symbols', () => {
            // Test fails because it allows to enter email with cyrillic symbols
            cy.get('#signupEmail').type('ййййй@gmail.com');
            cy.get('#signupEmail').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Email is incorrect');
            cy.get('#signupEmail').should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })
    })

    context('Password field validation', () => {
        it('Valid password with a length of 8 symbols', () => {
            cy.get('#signupPassword').type('aA123456');
            cy.get('#signupPassword').blur();
            cy.get('.invalid-feedback').should('not.exist');
        });

        it('Valid password with a length of 15 symbols', () => {
            cy.get('#signupPassword').type('aA123456aA12345');
            cy.get('#signupPassword').blur();
            cy.get('.invalid-feedback').should('not.exist');
        });

        it('Password with 7 letters', () => {
            cy.get('#signupPassword').type('aaaaaaa');
            cy.get('#signupPassword').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            cy.get('#signupPassword').should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Password with 16 letters', () => {
            cy.get('#signupPassword').type('aaaaaaaaaaaaaaaa');
            cy.get('#signupPassword').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            cy.get('#signupPassword').should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Password with 8 letters without a capital letter and without a digit', () => {
            cy.get('#signupPassword').type('aaaaaaaa');
            cy.get('#signupPassword').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            cy.get('#signupPassword').should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Password with 8 letters with a capital letter, but without a digit', () => {
            cy.get('#signupPassword').type('aaaaaaaA');
            cy.get('#signupPassword').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            cy.get('#signupPassword').should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Password with 8 letters with a digit, but without a capital letter', () => {
            cy.get('#signupPassword').type('aaaaaaa1');
            cy.get('#signupPassword').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            cy.get('#signupPassword').should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Password with 8 letters with all capital letters', () => {
            cy.get('#signupPassword').type('AAAAAAAA');
            cy.get('#signupPassword').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            cy.get('#signupPassword').should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Password with 8 letters with all digits', () => {
            cy.get('#signupPassword').type('12345678');
            cy.get('#signupPassword').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            cy.get('#signupPassword').should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    context('Repeat Password validation', () => {
        it('Empty re-enter password field', () => {
            cy.get('#signupRepeatPassword').focus();
            cy.get('#signupRepeatPassword').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Re-enter password required');
            cy.get('#signupRepeatPassword').should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Mismatch Repeat Password', () => {
            cy.get('#signupPassword').type(correctPassword);
            cy.get('#signupRepeatPassword').type('R7mQ2xLp9a');
            cy.get('#signupRepeatPassword').blur();
            cy.get('.invalid-feedback > p').should('have.text', 'Passwords do not match');
        });

    });

    context('Registration button', () => {
        it('The register button is not disabled with correct data', () => {
            cy.get('#signupName').type('First');
            cy.get('#signupLastName').type('Last');
            cy.get('#signupEmail').type(email);
            cy.get('#signupPassword').type(correctPassword);
            cy.get('#signupRepeatPassword').type(correctPassword);
            cy.get('.modal-content .btn-primary').should('not.be.disabled');
        });

        it('The register button is disabled when incorrect data in the Name field', () => {
            cy.get('#signupName').type('Fir st');
            cy.get('#signupLastName').type('Last');
            cy.get('#signupEmail').type(email);
            cy.get('#signupPassword').type(correctPassword);
            cy.get('#signupRepeatPassword').type(correctPassword);
            cy.get('.modal-content .btn-primary').should('be.disabled');
        });

        it('The register button is disabled when incorrect data in the Last Name field', () => {
            cy.get('#signupName').type('First');
            cy.get('#signupLastName').type('La st');
            cy.get('#signupEmail').type(email);
            cy.get('#signupPassword').type(correctPassword);
            cy.get('#signupRepeatPassword').type(correctPassword);
            cy.get('.modal-content .btn-primary').should('be.disabled');
        });

        it('The register button is disabled when incorrect data in the Email field', () => {
            cy.get('#signupName').type('First');
            cy.get('#signupLastName').type('Last');
            cy.get('#signupEmail').type('a@@f.com');
            cy.get('#signupPassword').type(correctPassword);
            cy.get('#signupRepeatPassword').type(correctPassword);
            cy.get('.modal-content .btn-primary').should('be.disabled');
        });

        it('The register button is disabled when incorrect data in the Password field', () => {
            cy.get('#signupName').type('First');
            cy.get('#signupLastName').type('Last');
            cy.get('#signupEmail').type(email);
            cy.get('#signupPassword').type(' ');
            cy.get('#signupRepeatPassword').type(correctPassword);
            cy.get('.modal-content .btn-primary').should('be.disabled');
        });

        it('The register button is disabled when mismatch data in the Re-enter Password field', () => {
            cy.get('#signupName').type('First');
            cy.get('#signupLastName').type('Last');
            cy.get('#signupEmail').type(email);
            cy.get('#signupPassword').type(correctPassword);
            cy.get('#signupRepeatPassword').type('correctPassword');
            cy.get('.modal-content .btn-primary').should('be.disabled');
        });
    });

});


