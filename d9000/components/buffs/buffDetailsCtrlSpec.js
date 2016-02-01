
(function() {
    'use strict';

    var testBuff = {
        name: 'Good Hope',
        saves: {
            fort: 2,
            refl: 2,
            will: 2
        },
        toHit: 2,
        damage: 2,
        skills: 2,
        type: 'morale'
    };

    describe('BuffDetailCtrl', function() {
        beforeEach(module('starter.services'));
        beforeEach(
            module('starter.controllers',
                function($provide) {
                    var buffsServiceMock = {
                        get: function() { return testBuff; },
                    };
                    $provide.value('Buffs', buffsServiceMock);
                }
            )
        );


        var controller, scope;
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('BuffDetailCtrl', {
                $scope: scope
            });
        }));

        it('should exist', function () {
            expect(controller).toBeDefined();
        });

        it('should have a buff', function() {
            expect(scope.buff).toBeDefined();
        });
    });

})();
