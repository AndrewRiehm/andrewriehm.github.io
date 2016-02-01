
(function() {
    'use strict';

    var _clipboardData;
    describe('SettingsCtrl', function() {
        beforeEach(module('starter.services'));
        beforeEach(
            module('starter.controllers',
                function($provide) {
                    var clipboardMock = {
                        copyText: function(text) { _clipboardData = text; }
                    };
                    $provide.value('clipboard', clipboardMock);

                    /*
                    // TODO: When PhantomJS starts supporting Promises, revisit this

                    var ionicPopupMock = {
                        prompt: function() {
                            return new Promise(
                                function(resolve, reject) {
                                    var obj = {
                                        buffs: _buffs,
                                        campaigns: [],
                                        characters: []
                                    };
                                    resolve(JSON.stringify(obj));
                                }
                            );
                        },
                        alert: function() { }
                    };
                    $provide.value('$ionicPopup', ionicPopupMock);
                    */

                    var _data = {};
                    var webStorageMock = {
                        local: {
                            get: function(key) {
                                if (!_data[key]) { return null; }
                                return _data[key];
                            },
                            set: function(key, val) { _data[key] = val; },
                            has: function(key) {
                                return (undefined !== _data[key]);
                            },
                            clear: function() { _data = {}; }
                        }
                    };
                    $provide.value('webStorage', webStorageMock);
                }
            )
        );

        var controller, scope;
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('SettingsCtrl', {
                $scope: scope
            });
        }));

        it('should exist', function () {
            expect(controller).toBeDefined();
        });

        it('should have a method for inserting test data', function() {
            expect(scope.insertTestData).toBeDefined();
            expect(typeof scope.insertTestData).toBe('function');
        });

        it('should have a method for flushing local data', function() {
            expect(scope.flushLocalData).toBeDefined();
            expect(scope.flushLocalData).not.toBeNull();
        });

        it('should have a scope reference to webStorage', function() {
            expect(scope.webStorage).toBeDefined();
            expect(scope.webStorage).not.toBeNull();
        });

        it('should have a characters key', function() {
            expect(scope.CHARACTERS_KEY).toBeDefined();
            expect(scope.CHARACTERS_KEY).not.toBeNull();
        });

        it('should be able to add test data', function() {
            scope.insertTestData();
            var characters = scope.webStorage.local.get(scope.CHARACTERS_KEY);
            expect(characters.length).toBe(scope.characters.length);
        });

        it('should be able to flush local data', function() {
            scope.webStorage.local.set('foo', 'bar');
            scope.flushLocalData();
            var foo = scope.webStorage.local.get('foo');
            expect(foo).toBeNull();
        });

        it('should have an exportToClipboard method', function() {
            expect(scope.exportToClipboard).not.toBeNull();
            expect(scope.exportToClipboard).toBeDefined();
        });

        it('should be able to export saved data to clipboard', function() {
            scope.exportToClipboard();
            expect(_clipboardData).not.toBeNull();
            expect(_clipboardData).toBeDefined();
        });

        it('should have an import method', function() {
            expect(scope.importFromString).not.toBeNull();
            expect(scope.importFromString).toBeDefined();
        });

        it('should be able to import from a string', function() {
            // TODO: can't really test this, as it relies on ionicPopup.prompt,
            // ... and that returns a Promise, but PhantomJS doesn't support
            // ... Promises yet.  So... just... call this and hope it doesn't
            // ... throw an exception?
            scope.importFromString();
        });
    });
})();
