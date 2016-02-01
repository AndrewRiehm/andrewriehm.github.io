
(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('CharactersCtrl', charactersCtrlFunc);

    function charactersCtrlFunc($scope, NewWidget, $stateParams, Characters, $ionicPopup) {
        $scope.campaignName = $stateParams.campaignName;
        $scope.characters = Characters.all($scope.campaignName);
        $scope.remove = function(character) {
            Characters.remove(character);
            $scope.characters = Characters.all($scope.campaignName);
        };

        $scope.showNewForm = function () {
            NewWidget.show('New Character', function(name) {
                var obj = {
                    name: name,
                    campaignName: $scope.campaignName
                };
                Characters.add(obj, function(err) {
                    if (err) {
                        $ionicPopup.alert({
                            title: 'Oops!',
                            template: '"' + name + '" is already taken!',
                        });
                    }
                    else {
                        $scope.characters = Characters.all($scope.campaignName);
                    }
                });
            });
        };
    }
})();
