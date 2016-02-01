
(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('Buffs', buffsServiceFunc);

    var BUFFS_KEY = 'buffs';
    var _webStorage;
    var buffs = [];

    function buffsServiceFunc(webStorage) {
        _webStorage = webStorage;
        return {
            all: buffAll,
            add: buffAdd,
            remove: buffRemove,
            get: buffGet,
            save: save
        };
    }

    function save() {
        _webStorage.local.set(BUFFS_KEY, buffs);
    }

    function load() {
        if (buffs.length === 0 && _webStorage.local.has(BUFFS_KEY)) {
            buffs = _webStorage.local.get(BUFFS_KEY);
        }
    }

    function buffGet(buffName) {
        load();

        for (var i = 0; i < buffs.length; i++) {
            if (buffs[i].name === buffName) {
                return buffs[i];
            }
        }
        return null;
    }

    function buffRemove(buff) {
        load();

        buffs.splice(buffs.indexOf(buff), 1);

        save();
    }

    function buffAdd(buff, cb) {
        load();

        for(var index in buffs) {
            var b = buffs[index];
            if (b.name === buff.name) {
                if (cb) {
                    cb({ message: 'Error: ' + buff.name + ' already exists!' }, null);
                }
                return;
            }
        }
        buffs.push(buff);
        save();

        if (cb) {
            cb(null, buff);
        }
    }

    function buffAll() {
        load();
        return buffs;
    }
})();
