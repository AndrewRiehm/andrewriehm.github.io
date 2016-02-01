
(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('Characters', charactersServiceFunc);

    var $webStorage = null;
    var CHARACTERS_KEY = 'characters';
    var characters = [];

    function charactersServiceFunc(webStorage) {
        $webStorage = webStorage;
        return {
            all: characterAll,
            add: characterAdd,
            remove: characterRemove,
            get: characterGet,
            compileActiveBuffs: compileActiveBuffs,
            getWeapon: getWeapon,
            save: save
        };
    }

    function save() {
        var res = $webStorage.local.set(CHARACTERS_KEY, characters);
        if (!res) {
            var msg = 'ERROR: could not save characters to webStorage.local!';
            console.error(msg);
            throw msg;
        }
        return true;
    }

    function load(overwrite) {
        // If we're overwriting, or ...
        // if we're not supposed to overwrite, but there's nothing there...
        var condition = (overwrite === true) || (!overwrite && characters.length === 0);
        if (condition && $webStorage.local.has(CHARACTERS_KEY)) {
            characters = $webStorage.local.get(CHARACTERS_KEY);
        }
    }

    function getWeapon(character, weaponName) {
        for(var i in character.weapons) {
            if (character.weapons[i].name === weaponName) {
                return character.weapons[i];
            }
        }
        return null;
    }


    function compileActiveBuffs(character, buffs) {
        var activeBuffs = [], msg;

        if (!character.activeBuffs) {
            return activeBuffs;
        }

        // If the size of list of active != size of list of buffs, THAT's
        // a problem.  They have to match for this to work.
        if (character.activeBuffs.length !== buffs.length) {
            msg = 'ERROR: active buffs length does not match length of buffs array!';
            console.error(msg);
            throw msg;
        }

        // Compile the list of active buffs
        for(var i in character.activeBuffs) {
            if (character.activeBuffs[i]) {
                activeBuffs.push(buffs[i]);
            }
        }
        return activeBuffs;
    }

    function characterGet(characterName) {
        load();

        for (var i = 0; i < characters.length; i++) {
            if (characters[i].name === characterName) {
                return characters[i];
            }
        }
        return null;
    }

    function characterRemove(character) {
        load();

        characters.splice(characters.indexOf(character), 1);
        save();
    }

    function characterAdd(character, cb) {
        load();

        for(var index in characters) {
            var b = characters[index];
            if (b.name === character.name) {
                ifcb(cb, { message: 'Error: ' + character.name + ' already exists!' }, null);
                return;
            }
        }
        characters.push(character);
        save();

        ifcb(cb, null, character);
    }

    function ifcb(cb, res, err) {
        if (cb) {
            cb(res, err);
        }
    }

    function characterAll(campaignName) {
        load();

        if (campaignName) {
            var filterFunc = function(arg) {
                return (arg.campaignName === campaignName);
            };
            return characters.filter(filterFunc);
        }
        return characters;
    }
})();
