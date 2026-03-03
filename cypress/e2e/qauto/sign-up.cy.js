/// <reference types="cypress" />

import SignUpForm from '../../pom/forms/SignUpForm';
import HomePage from '../../pom/pages/HomePage';

let newEmail;

before(() => {
    cy.fixture('users.json').then((users) => {
        newEmail = `${users.correctUser.email.split('@')[0]}+${Date.now()}@alibto.com`
    })
})

describe('Sign Up Form', () => {
    beforeEach(() => {
        HomePage.visit();
        HomePage.signUpButton.click();
    })

    context('Sign Up Process', () => {

        it('Successful Sign Up', () => {
            cy.fixture('users.json').then((users) => {
                SignUpForm.fillSignUpFormWithCredentials(users.correctUser.correctName, users.correctUser.correctLastName, newEmail, users.correctUser.correctPassword, users.correctUser.correctPassword);
                SignUpForm.registerButton.click();
                cy.url().should('eq', 'https://qauto.forstudy.space/panel/garage');
            })

        });

        it('Sign Up with existing user', () => {
            cy.fixture('users.json').then((users) => {
                SignUpForm.fillSignUpFormWithCredentials(users.correctUser.correctName, users.correctUser.correctLastName, users.correctUser.email, users.correctUser.correctPassword, users.correctUser.correctPassword);
                SignUpForm.registerButton.click();
                cy.fixture('sign-up-error-mess.json').then((errMessage) => {
                    SignUpForm.alertErrorMessage.should('have.text', errMessage.message.userExist);
                })
            })
        });
    });

    context('First name validation', () => {

        it('First Name with 2 letters', () => {
            SignUpForm.enterName('aa');
            SignUpForm.validationErrorMessage.should('not.exist');
        })

        it('First Name with 20 letters', () => {
            SignUpForm.enterName('qwertyuiolkjhgfdsazx');
            SignUpForm.validationErrorMessage.should('not.exist');
        })

        it('First Name field is empty', () => {
            // Test fails because the error text is different from requirements
            SignUpForm.nameField.focus();
            SignUpForm.nameField.blur();
            cy.fixture('sign-up-error-mess.json').then((errMessage) => {
                SignUpForm.emptyFieldErrorMessage.should('have.text', errMessage.message.nameRequired);
            });
            SignUpForm.emptyFieldErrorMessage.should('have.text', 'Name is required');
        })

        it('First Name field with one symbol', () => {
            SignUpForm.enterName('a');
            cy.fixture('sign-up-error-mess.json').then((errMessage) => {
                SignUpForm.emptyFieldErrorMessage.should('have.text', errMessage.message.invalidNameLength);
            });
        })

        it('First Name with 21 letters', () => {
            SignUpForm.enterName('qwertyuiolkjhgfdsazxa');
            cy.fixture('sign-up-error-mess.json').then((errMessage) => {
                SignUpForm.emptyFieldErrorMessage.should('have.text', errMessage.message.invalidNameLength);
            });
            SignUpForm.nameField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('First Name with a space', () => {
            SignUpForm.enterName('qw ea');
            SignUpForm.nameField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
            cy.fixture('sign-up-error-mess.json').then((errMessage) => {
                SignUpForm.emptyFieldErrorMessage.should('have.text', errMessage.message.invalidName);
            });
        })

        it('First Name with special symbols', () => {
            SignUpForm.enterName('awe$');
            SignUpForm.nameField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
            cy.fixture('sign-up-error-mess.json').then((errMessage) => {
                SignUpForm.emptyFieldErrorMessage.should('have.text', errMessage.message.invalidName);
            });
        })

        it('First Name with spaces', () => {
            // Test should fail because the app isn't allow trim the spaces
            SignUpForm.enterName(' aa $');
            SignUpForm.validationErrorMessage.should('not.exist');
        })
    });

    context('Last name validation', () => {

        it('Last Name with 2 letters', () => {
            SignUpForm.enterLastName('aa');
            SignUpForm.validationErrorMessage.should('not.exist');
        })

        it('Last Name with 20 letters', () => {
            SignUpForm.enterLastName('qwertyuiolkjhgfdsazx');
            SignUpForm.validationErrorMessage.should('not.exist');
        })

        it('Last Name field is empty', () => {
            // Test fails because the error text is different from requirements
            SignUpForm.lastNameField.focus();
            SignUpForm.lastNameField.blur();
            SignUpForm.emptyFieldErrorMessage.should('have.text', 'Last name is required');
        })

        it('Last Name field with one symbol', () => {
            SignUpForm.enterLastName('a');
            SignUpForm.validationErrorMessage.should('have.text', 'Last name has to be from 2 to 20 characters long');
        })

        it('Last Name with 21 letters', () => {
            SignUpForm.enterLastName('qwertyuiolkjhgfdsazxa');
            SignUpForm.validationErrorMessage.should('have.text', 'Last name has to be from 2 to 20 characters long');
            SignUpForm.lastNameField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('Last Name with a space', () => {
            SignUpForm.enterLastName('qw ea');
            SignUpForm.validationErrorMessage.should('have.text', 'Last name is invalid');
            SignUpForm.lastNameField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('Last Name with special symbols', () => {
            SignUpForm.enterLastName('awe$');
            SignUpForm.validationErrorMessage.should('have.text', 'Last name is invalid');
            SignUpForm.lastNameField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('First Name with spaces', () => {
            // Test should fail because the app isn't allow trim the spaces
            SignUpForm.enterLastName(' aa ');
            SignUpForm.emptyFieldErrorMessage.should('not.exist');
        })
    })

    context('Email validation', () => {

        it('Email field is empty', () => {
            SignUpForm.emailField.focus();
            SignUpForm.emailField.blur();
            SignUpForm.emptyFieldErrorMessage.should('have.text', 'Email required');
            SignUpForm.emailField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('Email without "@" symbol', () => {
            SignUpForm.enterEmail('asdf.gmail.com');
            SignUpForm.validationErrorMessage.should('have.text', 'Email is incorrect');
            SignUpForm.emailField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('Email with 2 "@" symbols', () => {
            SignUpForm.enterEmail('as@d@f.gmail.com');
            SignUpForm.validationErrorMessage.should('have.text', 'Email is incorrect');
            SignUpForm.emailField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('Email without "." symbol in domain', () => {
            SignUpForm.enterEmail('asdf@gmailcom');
            SignUpForm.validationErrorMessage.should('have.text', 'Email is incorrect');
            SignUpForm.emailField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('Email without text before "@" symbol', () => {
            SignUpForm.enterEmail('@gmail.com');
            SignUpForm.validationErrorMessage.should('have.text', 'Email is incorrect');
            SignUpForm.emailField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('Email without letters between "@" and "." symbols', () => {
            SignUpForm.enterEmail('asdf@.com');
            SignUpForm.validationErrorMessage.should('have.text', 'Email is incorrect');
            SignUpForm.emailField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('Email with cyrillic symbols', () => {
            // Test fails because it allows to enter email with cyrillic symbols
            SignUpForm.enterEmail('ййййй@gmail.com');
            // cy.get('#signupEmail').type('ййййй@gmail.com');
            // cy.get('#signupEmail').blur();
            SignUpForm.validationErrorMessage.should('have.text', 'Email is incorrect');
            SignUpForm.emailField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })
    })

    context('Password field validation', () => {
        it('Valid password with a length of 8 symbols', () => {
            SignUpForm.enterPassword('aA123456');
            SignUpForm.emptyFieldErrorMessage.should('not.exist');
        });

        it('Valid password with a length of 15 symbols', () => {
            SignUpForm.enterPassword('aA123456aA12345');
            SignUpForm.emptyFieldErrorMessage.should('not.exist');
        });

        it('Password with 7 letters', () => {
            SignUpForm.enterPassword('aaaaaaa');
            SignUpForm.validationErrorMessage.should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            SignUpForm.passwordField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Password with 16 letters', () => {
            SignUpForm.enterPassword('aaaaaaaaaaaaaaaa');
            SignUpForm.validationErrorMessage.should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            SignUpForm.passwordField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Password with 8 letters without a capital letter and without a digit', () => {
            SignUpForm.enterPassword('aaaaaaaa');
            SignUpForm.validationErrorMessage.should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            SignUpForm.passwordField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Password with 8 letters with a capital letter, but without a digit', () => {
            SignUpForm.enterPassword('aaaaaaaA');
            SignUpForm.validationErrorMessage.should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            SignUpForm.passwordField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Password with 8 letters with a digit, but without a capital letter', () => {
            SignUpForm.enterPassword('aaaaaaa1');
            SignUpForm.validationErrorMessage.should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            SignUpForm.passwordField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Password with 8 letters with all capital letters', () => {
            SignUpForm.enterPassword('AAAAAAAA');
            SignUpForm.validationErrorMessage.should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            SignUpForm.passwordField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Password with 8 letters with all digits', () => {
            SignUpForm.enterPassword('12345678');
            SignUpForm.validationErrorMessage.should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            SignUpForm.passwordField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    context('Repeat Password validation', () => {
        it('Empty re-enter password field', () => {
            SignUpForm.repeatPasswordField.focus();
            SignUpForm.repeatPasswordField.blur();
            SignUpForm.emptyFieldErrorMessage.should('have.text', 'Re-enter password required');
            SignUpForm.repeatPasswordField.should('have.class', 'is-invalid').and('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('Mismatch Repeat Password', () => {
            cy.fixture('users.json').then((users) => {
                SignUpForm.enterPassword(users.correctUser.correctPassword);
                SignUpForm.repeatPasswordField('R7mQ2xLp9a');
                SignUpForm.validationErrorMessage('.invalid-feedback > p').should('have.text', 'Passwords do not match');
            })

        });

    });

    context('Registration button', () => {
        it('The register button is not disabled with correct data', () => {
            cy.fixture('users.json').then((users) => {
                SignUpForm.fillSignUpFormWithCredentials(users.correctUser.correctName, users.correctUser.correctLastName, newEmail, users.correctUser.correctPassword, users.correctUser.correctPassword);
                SignUpForm.registerButton.should('not.be.disabled');
            })
        });

        it('The register button is disabled when incorrect data in the Name field', () => {
            cy.fixture('users.json').then((users) => {
                SignUpForm.fillSignUpFormWithCredentials('Fir st', users.correctUser.correctLastName, newEmail, users.correctUser.correctPassword, users.correctUser.correctPassword);
                SignUpForm.registerButton.should('be.disabled');
            })
        });

        it('The register button is disabled when incorrect data in the Last Name field', () => {

            cy.fixture('users.json').then((users) => {
                SignUpForm.fillSignUpFormWithCredentials(users.correctUser.correctName, 'La st', newEmail, users.correctUser.correctPassword, users.correctUser.correctPassword);
                SignUpForm.registerButton.should('be.disabled');
            })
        });

        it('The register button is disabled when incorrect data in the Email field', () => {

            cy.fixture('users.json').then((users) => {
                SignUpForm.fillSignUpFormWithCredentials(users.correctUser.correctName, users.correctUser.correctLastName, 'a@@f.com', users.correctUser.correctPassword, users.correctUser.correctPassword);
                SignUpForm.registerButton.should('be.disabled');
            })
        });

        it('The register button is disabled when incorrect data in the Password field', () => {
            cy.fixture('users.json').then((users) => {
                SignUpForm.fillSignUpFormWithCredentials(users.correctUser.correctName, users.correctUser.correctLastName, newEmail, ' ', users.correctUser.correctPassword);
                SignUpForm.registerButton.should('be.disabled');
            })
        });

        it('The register button is disabled when mismatch data in the Re-enter Password field', () => {

            cy.fixture('users.json').then((users) => {
                SignUpForm.fillSignUpFormWithCredentials(users.correctUser.correctName, users.correctUser.correctLastName, newEmail, users.correctUser.correctPassword, 'correctPassword');
                SignUpForm.registerButton.should('be.disabled');
            })
        });
    });

});


