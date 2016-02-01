
(function () {
    'use strict';

    var CHARNAME = 'Bilbo Baggins';
    var WEAPONNAME = 'Sting';
    var testChar = {
        name: CHARNAME,
        weapons: [
            {
                name: WEAPONNAME,
                attacks: [
                    {
                        name: 'Main',
                        toHit: 6,
                        damage: 6,
                        crit: 19,
                        critMult: 2
                    },
                    {
                        name: 'Second',
                        toHit: 1,
                        damage: 6,
                        crit: 19,
                        critMult: 2
                    }
                ]
            }
        ]
    };

    describe('AttackCtrl', function () {
        beforeEach(module('starter.services'));
        beforeEach(
            module('starter.controllers',
                function($provide) {
                    var charactersServiceMock = {
                        get: function() { return testChar; },
                        getWeapon: function() { return testChar.weapons[0]; },
                        compileActiveBuffs: function() { return []; },
                        save: function() { }
                    };
                    $provide.value('Characters', charactersServiceMock);
                }
            )
        );

        var controller, scope;
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('AttackCtrl', {
                $scope: scope,
                $stateParams: {
                    characterName: CHARNAME,
                    weaponName: WEAPONNAME,
                    attackName: 'Main'
                },
            });
        }));

        it('should exist', function () {
            expect(controller).not.toBeNull();
            expect(controller).toBeDefined();
        });

        it('should have a weapon', function() {
            expect(scope.weapon).not.toBeNull();
            expect(scope.weapon).toBeDefined();
        });

        it('should have an attack', function() {
            expect(scope.attack).not.toBeNull();
            expect(scope.attack).toBeDefined();
        });
    });
})();
