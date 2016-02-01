
(function () {
    'use strict';

    describe('RollerService', function () {

        var attacks = [
            { toHit: 15, damage: 8, crit: 19, mult: 2 },
            { toHit: 10, damage: 8, crit: 19, mult: 2 },
            { toHit: 5, damage: 8, crit: 19, mult: 2 }
        ];

        var buffs = [
            { name: 'foo', toHit: 4, damage: 4, extraHit: false },
            { name: 'bar', toHit: 1, damage: 0, extraHit: true }
        ];

        var service;
        beforeEach(function() {
            module('starter.services');
            inject(
                function (Roller) {
                    service = Roller;
                }
            );
        });

        it('should exist', function() {
            expect(service).not.toBeNull();
            expect(service).toBeDefined();
        });

        it('should have a roll function', function() {
            expect(service.roll).not.toBeNull();
            expect(service.roll).toBeDefined();
        });

        it('should be able to roll a dice', function() {
            var min = 1;
            var max = 10;
            var bonus = 3;
            var val = 0;
            // Try rolling 10 values, make sure it's within bounds
            for (var i = 0; i < 10; ++i) {
                val = service.roll(min, max, bonus);
                expect(val <= max + bonus).toBeTruthy();
                expect(val >= min + bonus).toBeTruthy();
            }
        });

        it('should have a rollSingleAttack method', function() {
            expect(service.rollSingleAttack).not.toBeNull();
            expect(service.rollSingleAttack).toBeDefined();
            expect(typeof service.rollSingleAttack).toBe('function');
        });

        it('should be able to compile buffs', function() {
            expect(service.compileBuffs).toBeDefined();
            expect(service.compileBuffs).not.toBeNull();


            var totalBuff = service.compileBuffs(buffs);
            expect(totalBuff).not.toBeNull();
            expect(totalBuff).toBeDefined();
            expect(typeof totalBuff).toBe('object');

            expect(totalBuff.toHit).toBe(5);
            expect(totalBuff.damage).toBe(4);
            expect(totalBuff.extraHit).toBeTruthy();
        });

        it('should be able to roll a single attack', function() {
            var totalBuffs = service.compileBuffs(buffs);
            var attack = service.rollSingleAttack(attacks[0], buffs);
            expect(attack).toBeDefined();
            expect(attack).not.toBeNull();
            expect(attack.damage).toBe(attacks[0].damage + totalBuffs.damage);
            expect(attack.toHit > attacks[0].toHit + totalBuffs.toHit).toBeTruthy();
            expect(attack.toHit <= attacks[0].toHit + totalBuffs.toHit + 20).toBeTruthy();
        });

        it('should be able to roll multiple attacks', function() {
            var res = service.rollAttacks(attacks, buffs);
            expect(res).not.toBeNull();
            expect(res).toBeDefined();
            expect(Array.isArray(res)).toBeTruthy();
        });
    });

})();
