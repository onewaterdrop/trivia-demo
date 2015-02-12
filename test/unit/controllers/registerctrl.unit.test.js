// Test LoginCtrl


describe("Unit: Test RegisterCtrl", function () {


    beforeEach(
        module('triviaApp')
    );
    beforeEach(function() {
        module('triviaApp.services');
        module('triviaApp.mocks');
    });


    var registerCtrl, scope, rootScope, DreamFactory, UserService, aStringService;

    var testCreds = {
        email: '',
        password: '',
        confirm: ''
    }


    beforeEach(inject(function ($rootScope, $controller, DreamFactoryMock, UserServiceMock, StringService) {

        scope = $rootScope.$new();
        rootScope = $rootScope;
        DreamFactory = DreamFactoryMock;
        UserService = UserServiceMock;
        aStringService = StringService;
        registerCtrl = $controller('RegisterCtrl', {
            $scope: scope,
            $rootScope: rootScope,
            DreamFactory: DreamFactory,
            UserService: UserService,
            StringService: aStringService
        });

    }));


    it("should be initialized with a 'creds' user obj", function () {
        expect(scope.creds).toEqual(testCreds);
    });


    it("should broadcast and respond to an event with 'creds' when scope.register(creds)", function () {

        spyOn(scope, "$broadcast").andCallThrough();
        spyOn(DreamFactory.api.user, 'register');


        scope.register(testCreds);

        expect(scope.$broadcast).toHaveBeenCalledWith('user:register', testCreds);
        expect(DreamFactory.api.user.register).toHaveBeenCalled();
    });


    it("should broadcast and respond to an event with 'creds' when scope.verifyUserPassword(creds)", function() {

        spyOn(scope, "$broadcast").andCallThrough();
        spyOn(scope, '_verifyPassword');


        scope.verifyUserPassword(testCreds);

        expect(scope.$broadcast).toHaveBeenCalledWith('verify:password', testCreds);
        expect(scope._verifyPassword).toHaveBeenCalledWith(testCreds);
    });



    describe("Test: Verify Password Func", function() {

        beforeEach(function() {

            testCreds = {
                email: 'valid',
                password: 'a',
                confirm: 'b'
            }
        });

        afterEach(function() {

            testCreds = {
                email: '',
                password: '',
                confirm: ''
            }
        });


        it("should verify password field against confirm field", function() {

            spyOn(aStringService, 'areIdentical').andCallThrough();

            var identical = scope._verifyPassword(testCreds);

            expect(aStringService.areIdentical).toHaveBeenCalledWith(testCreds.password, testCreds.confirm);
            expect(identical).not.toBe(true);
        });

    });

});