
(function () {
    'use strict';

    describe('CampaignsCtrl', function () {
        beforeEach(module('starter.services'));
        beforeEach(module('starter.controllers'));

        var controller, scope;
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('CampaignsCtrl', {
                $scope: scope
            });
        }));

        it('should exist', function () {
            expect(controller).toBeDefined();
        });
    });
 })();
