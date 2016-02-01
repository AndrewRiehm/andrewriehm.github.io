

(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('CampaignsCtrl', campaignsCtrlFunc);

    function campaignsCtrlFunc($scope, NewWidget, Campaigns, $ionicPopup) {
        $scope.campaigns = Campaigns.all();
        $scope.remove = function(campaign) {
            Campaigns.remove(campaign);
        };

        $scope.showNewForm = function() {
            NewWidget.show('New Campaign', function(name) {
                var obj = { name: name };
                Campaigns.add(obj, function(err) {
                    if (err) {
                        $ionicPopup.alert({
                            title: 'Oops!',
                            template: '"' + name + '" is already taken!',
                        });
                    }
                });
            });
        };
    }
})();
