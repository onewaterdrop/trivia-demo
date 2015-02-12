describe("Unit: Test ErrorsCtrl", function() {

    beforeEach(
        module('triviaApp')
    );

    var ErrorsCtrl, scope, rootScope;

    var error = {
        message: 'Test Error'
    };

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        ErrorsCtrl = $controller('ErrorsCtrl', {
            $scope: scope,
            $rootScope: rootScope
        });
    }));


    it("should be initialized with 'errors' array empty", function() {

        expect(scope.errors.length).toEqual(0)
    });


    it("should add error to the 'errors' array", function() {

        rootScope.$broadcast('app:error', error);
        expect(scope.errors.length).toEqual(1);
    });


    it("should set the 'errors' array to empty", function() {

        rootScope.$broadcast('app:error:clear');
        expect(scope.errors.length).toEqual(0)
    });
});