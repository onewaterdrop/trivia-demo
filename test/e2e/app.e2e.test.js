// Login E-2-E Tests


describe("E2E: Application", function () {


    describe("Test Navigation", function() {


        beforeEach(function () {

            browser().navigateTo('/');
        });

        it("should be at the root", function() {
            expect(browser().location().url()).toBe('/');
        });

        it("should navigate to login route", function() {

            element('#login').click();
            expect(browser().location().url()).toBe('/login');

        });

        it("should navigate to register route", function() {

            element('#register').click();
            expect(browser().location().url()).toBe('/register');

        });
    });




    describe("Test Login and Logout", function() {

        beforeEach(function() {
            browser().navigateTo('#/login');
        });


        it("should fail to login", function() {
            input('creds.email').enter('badUser@test.com');
            input('creds.password').enter('badPassword');
            element('#submit-login').click();

            expect(browser().location().url()).toBe('/login');
        });

        it("should login successfully", function() {
            input('creds.email').enter('valid@valid.com');
            input('creds.password').enter('valid');
            element('#submit-login').click();

            expect(browser().location().url()).toBe('/');
            expect(element('#user-name-display').text()).toEqual('Valid User');
        });

        it("should logout successfully", function() {
            input('creds.email').enter('valid@calid.com');
            input('creds.password').enter('valid');
            element('#submit-login').click();
            element('#logout').click();

            expect(browser().location().url()).toBe('/');
            expect(element('#user-name-display').text()).toEqual('Guest');
        });
    });



    describe("Test Register", function() {

        beforeEach(function() {

            browser().navigateTo('#/register');
        });


        it("should register the new user and then login to the game", function() {
            input('creds.email').enter('test@test.com');
            input('creds.password').enter('test');
            input('creds.confirm').enter('test');
            element('#submit-register').click();

            expect(browser().location().url()).toBe('/');
            expect(element('#user-name-display').text()).toEqual('Test');

        })
    });


    describe("Test Trivia Guest User", function() {

        beforeEach(function() {

            browser().navigateTo('/');
        });



        it("should ask a question", function() {

            expect(element('#question').text()).not().toBe('');
        });

        it("should subtract points for a wrong answer", function() {

            input('userAnswer').enter('This is a wrong answer');
            element('#submit-answer').click();

            expect(element('#score').text()).toBe('-10');
        });

        it("should display a cheat answer", function() {

            expect(element('#cheat-answer').text()).not().toBe('');
        });

    });
});