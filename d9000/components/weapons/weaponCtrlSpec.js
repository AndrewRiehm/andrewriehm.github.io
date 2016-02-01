
(function () {
    'use strict';

    var CHARNAME = 'Bilbo Baggins';
    var WEAPONNAME = 'Sting';
    var testChar = {
        name: CHARNAME,
        weapons: [
            { name: WEAPONNAME, attacks: [] }
        ]
    };
    describe('WeaponCtrl', function () {
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
        var testAttack = {
            toHit: 15,
            damage: 6,
            crit: 19,
            critMult: 2
        };
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('WeaponCtrl', {
                $scope: scope,
                $stateParams: {
                    characterName: CHARNAME,
                    weaponName: WEAPONNAME
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

        it('should be able to add an attack', function() {
            var len = scope.weapon.attacks.length;
            var res = scope.add(scope.weapon, testAttack);
            expect(res).toBeNull();
            expect(scope.weapon.attacks.length).toBe(len + 1);
        });

        it('should be able to remove an attack', function() {
            var len = scope.weapon.attacks.length;
            scope.remove(scope.weapon, testAttack);
            expect(scope.weapon.attacks.length).toBe(len - 1);
        });

        it('should be able to roll one attack', function() {
            expect(scope.rollOne).toBeDefined();
            expect(typeof scope.rollOne).toBe('function');
        });

        it('should be able to roll all attacks', function() {
            expect(scope.rollOne).toBeDefined();
            expect(typeof scope.rollOne).toBe('function');
        });
    });
})();
