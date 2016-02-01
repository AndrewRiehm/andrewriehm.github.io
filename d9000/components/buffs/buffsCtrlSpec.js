
(function() {
    'use strict';

    var testBuffs = [
        {
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
        },
        {
            name: 'Inspire Courage',
            toHit: 3,
            damage: 3,
            type: 'competence'
        },
        {
            name: 'Haste',
            toHit: 1,
            saves: {
                refl: 2,
            },
            extraHit: true
        },
        {
            name: 'Flanking',
            toHit: 2
        }
    ];

    describe('BuffsCtrl', function() {
        beforeEach(module('starter.services'));
        beforeEach(
            module('starter.controllers',
                function($provide) {
                    var buffsServiceMock = {
                        all: function() { return testBuffs; },
                    };
                    $provide.value('Buffs', buffsServiceMock);
                }
            )
        );

        var controller, scope;
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('BuffsCtrl', {
                $scope: scope
            });
        }));

        it('should exist', function () {
            expect(controller).toBeDefined();
        });

        it('should have buffs', function() {
            expect(scope.buffs).toBeDefined();
        });

        it('should have a remove method', function() {
            expect(scope.remove).toBeDefined();
        });
    });
})();
