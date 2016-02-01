
(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('BuffsCtrl', buffsCtrlFunc);

    function buffsCtrlFunc($scope, NewWidget, Buffs, $ionicPopup) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

        $scope.buffs = Buffs.all();
        $scope.remove = function(buff) {
            Buffs.remove(buff);
        };

        $scope.showNewBuffForm = function() {
            NewWidget.show('New Buff', function(name) {

                var obj = {
                    name: name,
                    attack: 0,
                    damage: 0,
                    extraHit: false
                };

                Buffs.add(obj, function(err) {
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
