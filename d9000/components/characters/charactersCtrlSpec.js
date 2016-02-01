
(function () {
    'use strict';

    describe('CharactersCtrl', function () {
        beforeEach(module('starter.services'));
        beforeEach(module('starter.controllers'));

        var controller, scope;
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('CharactersCtrl', {
                $scope: scope
            });
        }));

        it('should exist', function () {
            expect(controller).not.toBeNull();
            expect(controller).toBeDefined();
        });
    });

})();
