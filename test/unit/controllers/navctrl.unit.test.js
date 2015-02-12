
// Tests for NavCtrl

describe("Unit: Test NavCtrl", function() {

    beforeEach(
        module('triviaApp')
    );

    var NavCtrl, scope, rootScope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        NavCtrl = $controller('NavCtrl', {
            $scope: scope,
            $rootScope: rootScope
        });
    }));


    it("should be initalized with 'loggedIn' to false.", function() {
        expect(scope.loggedIn).toBe(false);
    });


    it("should set 'loggedIn to true on event 'user:loggedIn'", function() {
        rootScope.$broadcast('user:loggedIn');
        expect(scope.loggedIn).toBe(true);
    });


    it("should set 'loggedOut to false on event 'user:loggedOut'" , function() {
        rootScope.$broadcast('user:loggedOut');
        expect(scope.loggedIn).toBe(false);
    });
});


