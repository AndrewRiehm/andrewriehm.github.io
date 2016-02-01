
(function () {
    'use strict';

    describe('CampaignsService', function () {

        var campaignsService;
        var testCampaign = {
            name: 'Test Campaign'
        };

        beforeEach(function() {
            module('starter.services');
            inject(
                function (Campaigns) {
                    campaignsService = Campaigns;
                }
            );
        });

        it('should exist', function () {
            expect(campaignsService).not.toBeNull();
            expect(campaignsService).toBeDefined();
        });

        it('should have an "all" method', function() {
            expect(angular.isFunction(campaignsService.all)).toBe(true);
        });

        it('should have a "remove" method', function() {
            expect(angular.isFunction(campaignsService.remove)).toBe(true);
        });

        it('should have a "get" method', function() {
            expect(angular.isFunction(campaignsService.get)).toBe(true);
        });

        it('should have an "add" method', function() {
            expect(angular.isFunction(campaignsService.add)).toBe(true);
        });

        it('should be able to add a campaign', function() {
            var howMany = campaignsService.all().length;
            campaignsService.add(testCampaign);
            expect(campaignsService.all().length).toBe(howMany + 1);
        });

        it('should be able to get a campaign', function() {
            var test = campaignsService.get(testCampaign.name);
            expect(test).toBe(testCampaign);
        });

        it('should not let you add a duplicate', function(done) {
            campaignsService.add(testCampaign, function(err) {
                expect(err).toBeDefined();
                expect(err).not.toBeNull();
                done();
            });
        });

        it('should be able to remove a campaign', function() {
            var howMany = campaignsService.all().length;
            campaignsService.remove(testCampaign);
            expect(campaignsService.all().length).toBe(howMany - 1);
        });

    });
})();
