
(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('Roller', rollerServiceFunc);

    function rollerServiceFunc() {
        return {
            compileBuffs: compileBuffs,
            rollAttacks: rollAttacks,
            rollSingleAttack: rollSingleAttack,
            roll: roll
        };
    }

    function rollSingleAttack(attack, buffs) {
        var toHit, dmg, critConf, critDmg, whif = false;

        // compile buffs
        var totalBuff = compileBuffs(buffs);

        // Roll to-hit
        toHit = roll(1, 20, attack.toHit);

        // TODO: roll for damage?
        dmg = attack.damage + totalBuff.damage;

        // Check for critical miss
        if (toHit - attack.toHit === 1) {
            whif = true;
        }

        // Check for crit threat
        if (toHit - attack.toHit >= attack.crit) {
            // Need another toHit roll
            critConf = roll(1, 20, attack.toHit);
            critDmg = (attack.damage + totalBuff.damage) * attack.critMult;
        }

        // TODO: buffs!
        return {
            toHit: toHit + totalBuff.toHit,
            damage: dmg,
            crit: critConf !== undefined,
            critConf: critConf + totalBuff.toHit,
            critDmg: critDmg,
            whif: whif
        };
    }

    function rollAttacks(attacks, buffs) {
        var i, rolls = [];
        for (i in attacks) {
            rolls.push(rollSingleAttack(attacks[i], buffs));
        }

        // Buffs might add an extra attack
        // ... but extra attacks don't stack, so bail after the first one
        var buff;
        for (i in buffs) {
            buff = buffs[i];
            if (buff.extraHit) {
                rolls.push(rollSingleAttack(attacks[0], buffs));
                break;
            }
        }
        return rolls;
    }

    // Rolls XdY + Z
    function roll(x, y, z) {
        var val = 0;
        for (var i = 0; i < x; ++i) {
            val += getRandomInt(y);
        }
        val += z;
        return val;
    }

    // Returns a random integer between min (included) and max (excluded)
    // Using Math.round() will give you a non-uniform distribution!
    function getRandomInt(max) {
      return Math.ceil(Math.random() * (max));
    }

    // Compiles all buffs into a single buff structure
    // TODO: Take into account buff types (morale, competence, etc)
    function compileBuffs(buffs) {
        var totalBuff = {
            toHit: 0,
            damage: 0,
            extraHit: false
        };
        var buff;
        for (var i in buffs) {
            buff = buffs[i];
            if (typeof buff.toHit === 'number') {
                totalBuff.toHit += buff.toHit;
            }
            if (typeof buff.damage === 'number') {
                totalBuff.damage += buff.damage;
            }
            if (buff.extraHit) {
                totalBuff.extraHit = true;
            }
        }
        return totalBuff;
    }
})();
