
(function () {
    'use strict';

    describe('CharactersService', function () {

        var charactersService;

        var testBuffs = [
            {
                name: 'Good Hope',
                saves: {
                    fort: 2,
                    refl: 2,
                    will: 2
                },
                attack: 2,
                damage: 2,
                skills: 2,
                type: 'morale'
            },
            {
                name: 'Inspire Courage',
                attack: 3,
                damage: 3,
                type: 'competence'
            },
            {
                name: 'Haste',
                attack: 1,
                saves: {
                    refl: 2,
                },
                extraHit: true
            },
            {
                name: 'Flanking',
                attack: 2
            }
        ];

        var testChars = [
            {
                name: 'Billy Connoly',
                campaignName: 'Wrath of the Righteous',
                activeBuffs: [ true, true, false, false],
                weapons: [ { name: 'Shilelagh', attacks: [] } ]
            },
            {
                name: 'Bilbo Baggins',
                campaignName: 'Underhill Adventures',
                activeBuffs: [ true, true, false, false],
                weapons: [
                    {
                        name: 'Sting',
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
            }
        ];

        beforeEach(function() {
            module('starter.services');
            inject(
                function (Characters) {
                    charactersService = Characters;
                }
            );
        });

        it('should exist', function () {
            expect(charactersService).not.toBeNull();
            expect(charactersService).toBeDefined();
        });

        it('should have an "all" method', function() {
            expect(angular.isFunction(charactersService.all)).toBe(true);
        });

        it('should be able to get just the characters for a campaign', function() {
            charactersService.add(testChars[0]);
            charactersService.add(testChars[1]);
            var smallerList = charactersService.all(testChars[1].campaignName);
            var all = charactersService.all();
            expect(all.length).toBeGreaterThan(smallerList.length);
            expect(smallerList[0]).toBeDefined();
            expect(smallerList[0].name).toBe(testChars[1].name);
            charactersService.remove(testChars[1]);
            charactersService.remove(testChars[0]);
        });

        it('should have a "remove" method', function() {
            expect(angular.isFunction(charactersService.remove)).toBe(true);
        });

        it('should have a "get" method', function() {
            expect(angular.isFunction(charactersService.get)).toBe(true);
        });

        it('should have an "add" method', function() {
            expect(angular.isFunction(charactersService.add)).toBe(true);
        });

        it('should be able to add a character', function() {
            var howMany = charactersService.all().length;
            charactersService.add(testChars[0]);
            expect(charactersService.all().length).toBe(howMany + 1);
        });

        it('should be able to get a character', function() {
            var test = charactersService.get(testChars[0].name);
            expect(test).toBe(testChars[0]);
        });

        it('should not let you add a duplicate', function(done) {
            charactersService.add(testChars[0], function(err) {
                expect(err).toBeDefined();
                expect(err).not.toBeNull();
                done();
            });
        });

        it('should be able to remove a character', function() {
            var howMany = charactersService.all().length;
            charactersService.remove(testChars[0]);
            expect(charactersService.all().length).toBe(howMany - 1);
        });

        it('should be able to compile active buffs', function() {
            expect(charactersService.compileActiveBuffs).toBeDefined();
            expect(typeof charactersService.compileActiveBuffs).toBe('function');

            var active = charactersService.compileActiveBuffs(testChars[0], testBuffs);
            expect(active).toBeDefined();
            expect(Array.isArray(active)).toBeTruthy();
            expect(active.length).toBe(2);
        });

        it('should be able to get a weapon by name', function() {
            var testChar = testChars[0];
            var weapon = charactersService.getWeapon(testChar, testChar.weapons[0].name);
            expect(weapon).not.toBeNull();
            expect(weapon).toBeDefined();
        });

        it('should have a save method', function() {
            expect(charactersService.save).toBeDefined();
            expect(charactersService.save).not.toBeNull();
        });

        it('should be able to save to persistent storage', function() {
            expect(charactersService.save()).toBeTruthy();
        });
    });
})();
