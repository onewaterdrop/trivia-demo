'use strict';

describe('Controller: TriviaCtrl', function () {

    // load the controller's module
    beforeEach(module('triviaApp'));

    var TriviaCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        TriviaCtrl = $controller('TriviaCtrl', {
            $scope: scope
        });
    }));

    it('should exist', function () {
        expect(TriviaCtrl).not.toBe(null);
    });

    describe('Dependencies', function() {

        var deps;
        var hasModule = function(m) {
            return deps.indexOf(m) >= 0;
        };

        beforeEach(function() {

            deps = module.value('triviaApp').requires
        });

        it("should have 'ngRoute' as a dependency", function() {

            expect(hasModule('ngRoute')).to.equal(true);
        });

        it("should have 'DreamFactory' as a dependency", function() {

            expect(hasModule('DreamFactory')).to.equal(true);
        });


    })
});
