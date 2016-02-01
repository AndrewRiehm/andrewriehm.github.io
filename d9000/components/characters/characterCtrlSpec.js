
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
    var testWeapon = {
        name: 'Not Sting',
        attacks: [ ]
    };

    describe('CharacterCtrl', function () {
        beforeEach(module('starter.services'));
        beforeEach(
            module('starter.controllers',
                function($provide) {
                    var charactersServiceMock = { 
                        get: function() { return testChar; },
                        getWeapon: function() { return testChar.weapons[0]; },
                        compileActiveBuffs: function() { return []; }
                    };
                    $provide.value('Characters', charactersServiceMock);
                }
            )
        );

        var controller, scope;
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('CharacterCtrl', {
                $scope: scope,
                $stateParams: {
                    campaignName: 'Underhill Adventures',
                    characterName: CHARNAME
                },
            });
        }));

        it('should exist', function () {
            expect(controller).not.toBeNull();
            expect(controller).toBeDefined();
        });

        it('should have a character', function() {
            expect(scope.character).not.toBeNull();
            expect(scope.character).toBeDefined();
        });

        it('should have a list of weapons', function() {
            expect(scope.character.weapons).not.toBeNull();
            expect(scope.character.weapons).toBeDefined();
        });

        it('should have a list of active buffs', function() {
            expect(scope.activeBuffs).not.toBeNull();
            expect(scope.activeBuffs).toBeDefined();
            expect(Array.isArray(scope.activeBuffs)).toBeTruthy();
        });

        it('should have a list of buffs', function() {
            expect(scope.buffs).not.toBeNull();
            expect(scope.buffs).toBeDefined();
            expect(Array.isArray(scope.buffs)).toBeTruthy();
        });

        it('should make sure activeBuffs.len == buffs.len', function() {
            expect(scope.buffs.length).toBe(scope.activeBuffs.length);
        });

        it('should keep character list of active buffs in sync', function() {
            var active = scope.activeBuffs;

            // Make sure to process the $watch call
            scope.$digest();

            // Make sure they match initially
            expect(scope.character.activeBuffs[0] === scope.activeBuffs[0]).toBeTruthy();

            // Make a change, reprocess
            active[0] = !active[0];
            scope.$digest();

            // Make sure they still match
            expect(scope.character.activeBuffs[0] === scope.activeBuffs[0]).toBeTruthy();
        });

        it('should have an addWeapon function', function() {
            expect(scope.addWeapon).not.toBeNull();
            expect(scope.addWeapon).toBeDefined();
            expect(typeof scope.addWeapon).toBe('function');
        });

        it('should have a removeWeapon function', function() {
            expect(scope.removeWeapon).not.toBeNull();
            expect(scope.removeWeapon).toBeDefined();
            expect(typeof scope.removeWeapon).toBe('function');
        });

        it('should be able to add a weapon', function() {
            var res = scope.addWeapon(scope.character, testWeapon);
            expect(res).toBeNull();
        });

        it('should not let you add a duplicate weapon', function() {
            var res = scope.addWeapon(scope.character, testChar.weapons[0]);
            expect(res).not.toBeNull();
            expect(res.message).toBe(testChar.weapons[0].name + ' is already taken');
        });

        it('should be able to remove a weapon', function() {
            var len = scope.character.weapons.length;
            scope.removeWeapon(scope.character, testChar.weapons[0]);
            var newLen = scope.character.weapons.length;
            expect(newLen).toBe(len - 1);
        });
    });
})();
