
(function () {
    'use strict';

    describe('NewWidgetService', function () {

        var service;
        beforeEach(function() {
            module('starter.services');
            inject(
                function (NewWidget) {
                    service = NewWidget;
                }
            );
        });

        it('should exist', function () {
            expect(service).not.toBeNull();
            expect(service).toBeDefined();
        });

        it('should have a show method', function() {
            expect(service.show).not.toBeNull();
            expect(service.show).toBeDefined();
            expect(typeof service.show).toBe('function');
        });

    /*
        TODO: In order for this to work, I need to mock the $ionicPopup service
        it('should get a name from the user and call the callback', function(done) {
            var title = 'New Buff';
            var cb = function(buffName) {
                expect(buffName).toBeDefined();
                expect(typeof buffName).toBe('string');
                done();
            };
            service.show(title, cb);
        });
    */
    });
})();
