
(function () {
    'use strict';

    describe('BuffsService', function () {

        var buffService;
        var testBuff = {
            name: 'Divine Power',
            toHit: 4,
            damage: 4,
            type: 'luck'
        };

        beforeEach(function() {
            module('starter.services');
            inject(
                function (Buffs) {
                    buffService = Buffs;
                }
            );
        });

        it('should exist', function () {
            expect(buffService).not.toBeNull();
            expect(buffService).toBeDefined();
        });

        it('should have a "save" method', function() {
            expect(angular.isFunction(buffService.save)).toBe(true);
        });

        it('should have an "all" method', function() {
            expect(angular.isFunction(buffService.all)).toBe(true);
        });

        it('should have a "remove" method', function() {
            expect(angular.isFunction(buffService.remove)).toBe(true);
        });

        it('should have a "get" method', function() {
            expect(angular.isFunction(buffService.get)).toBe(true);
        });

        it('should have an "add" method', function() {
            expect(angular.isFunction(buffService.add)).toBe(true);
        });

        it('should be able to add a buff', function() {
            var howMany = buffService.all().length;
            buffService.add(testBuff);
            expect(buffService.all().length).toBe(howMany + 1);
        });

        it('should be able to get a buff', function() {
            var test = buffService.get(testBuff.name);
            expect(test).toBe(testBuff);
        });

        it('should not let you add a duplicate', function(done) {
            buffService.add(testBuff, function(err) {
                expect(err).toBeDefined();
                expect(err).not.toBeNull();
                done();
            });
        });

        it('should be able to remove a buff', function() {
            var howMany = buffService.all().length;
            buffService.remove(testBuff);
            expect(buffService.all().length).toBe(howMany - 1);
        });

    });
})();
