// Test LoginCtrl


describe("Unit: Test LoginCtrl", function () {


    beforeEach(
        module('triviaApp')
    );
    beforeEach(function() {
        module('triviaApp.mocks');
    });


    var LoginCtrl, scope, rootScope, DreamFactory, UserService;

    var testCreds = {
        email: '',
        password: ''
    }


    beforeEach(inject(function ($rootScope, $controller, DreamFactoryMock, UserServiceMock) {

        scope = $rootScope.$new();
        rootScope = $rootScope;
        DreamFactory = DreamFactoryMock;
        UserService = UserServiceMock;
        LoginCtrl = $controller('LoginCtrl', {
            $scope: scope,
            $rootScope: rootScope,
            DreamFactory: DreamFactory,
            UserService: UserService
        });

    }));


    it("should be initialized with a 'creds' user obj", function () {
        expect(scope.creds).toEqual(testCreds);
    });


    it("should broadcast and respond to an event with 'creds' when scope.login(creds)", function () {

        spyOn(scope, "$broadcast").andCallThrough();
        spyOn(DreamFactory.api.user, 'login');

        scope.login(testCreds);
        expect(scope.$broadcast).toHaveBeenCalledWith('user:login', testCreds);
        expect(DreamFactory.api.user.login).toHaveBeenCalled();
    });
});