
(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('AttackCtrl', ctrlFunc);

    function ctrlFunc($scope,$stateParams, Characters) {
        var msg;

        $scope.characterName = $stateParams.characterName;
        $scope.character = Characters.get($scope.characterName);
        $scope.weaponName = $stateParams.weaponName;
        $scope.weapon = Characters.getWeapon($scope.character, $scope.weaponName);
        $scope.attackName = $stateParams.attackName;
        $scope.attack = getAttack($scope.weapon, $scope.attackName);

        if ($scope.weapon === null) {
            msg = 'ERROR: could not get weapon with name "' + $scope.weaponName + '"';
            console.error(msg);
            throw(msg);
        }
        if ($scope.attack === null) {
            msg = 'ERROR: could not get attack with name "' + $scope.attackName + '"';
            console.error(msg);
            throw(msg);
        }
        $scope.$watch('attack.name', Characters.save);
        $scope.$watch('attack.toHit', Characters.save);
        $scope.$watch('attack.damage', Characters.save);
        $scope.$watch('attack.crit', Characters.save);
        $scope.$watch('attack.critMult', Characters.save);
    }

    function getAttack(weapon, attackName) {
        for (var i in weapon.attacks) {
            if (weapon.attacks[i].name === attackName) {
                return weapon.attacks[i];
            }
        }
        return null;
    }
})();
