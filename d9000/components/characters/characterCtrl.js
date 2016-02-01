
(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('CharacterCtrl', ctrlFunc);

    function ctrlFunc($scope,$stateParams, NewWidget, Buffs, Characters, $ionicPopup) {
        $scope.campaignName = $stateParams.campaignName;
        $scope.characterName = $stateParams.characterName;
        $scope.character = Characters.get($scope.characterName);
        if (!$scope.character.weapons) {
            $scope.character.weapons = [];
        }

        $scope.buffs = Buffs.all();

        // If this char doesn't have a list of active buffs, OR
        // the list of active buffs isn't the same size as the actual list,
        // create the new array and initialize everything to false
        $scope.activeBuffs = $scope.character.activeBuffs;

        // Make sure to keep character list in sync
        $scope.$watchCollection('activeBuffs', function(newVal) {
            $scope.character.activeBuffs = newVal;
        });

        if ($scope.activeBuffs === undefined ||
            $scope.activeBuffs.length !== $scope.buffs.length) {

            $scope.activeBuffs = [];
            for (var i in $scope.buffs) {
                $scope.activeBuffs[i] = false;
            }
        }

        $scope.removeWeapon = removeWeapon;

        $scope.addWeapon = addWeapon;

        $scope.showNewWeaponForm = function () {
            NewWidget.show('New Weapon', function(name) {
                var obj = {
                    name: name,
                    attacks: []
                };
                var res = $scope.addWeapon($scope.character, obj);
                if (res !== null) {
                    $ionicPopup.alert({
                        title: 'Oops!',
                        template: res.message
                    });
                }
            });
        };
    }

    function removeWeapon(character, weapon) {
        var weapons = character.weapons;
        weapons.splice(weapons.indexOf(weapon), 1);
    }

    function addWeapon(character, weapon) {
        var weapons = character.weapons;
        for (var i in weapons) {
            if (weapons[i].name === weapon.name) {
                return { message: weapon.name + ' is already taken' };
            }
        }
        weapons.push(weapon);
        return null;
    }
})();
