
(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('WeaponCtrl', ctrlFunc);

    var _Characters;
    function ctrlFunc($scope, $stateParams, NewWidget, Characters, Roller, Buffs, $ionicPopup) {

        _Characters = Characters;

        checkCharacter($scope, $stateParams, Characters, Buffs);
        checkWeapon($scope, $stateParams, Characters, Buffs);

        $scope.Roller = Roller;
        $scope.remove = remove;
        $scope.add = add;
        $scope.doneAttacking = function() {
            $scope.attackRolls = [];
            $scope.actualHits = [];
            $scope.crits = [];
            $scope.showCard = 'main';
        };

        $scope.rollOne = function() {
            $scope.attackRolls = [ Roller.rollSingleAttack($scope.weapon.attacks[0], $scope.activeBuffs) ];
            $scope.actualHits = [];
            $scope.crits = [];
            $scope.preCheck();
            $scope.showCard = 'oneAttack';
        };

        $scope.rollAll = function() {
            $scope.attackRolls = Roller.rollAttacks($scope.weapon.attacks, $scope.activeBuffs);
            $scope.actualHits = [];
            $scope.crits = [];
            $scope.preCheck();
            $scope.showCard = 'allAttacks';
        };

        $scope.preCheck = function() {
            for (var i in $scope.attackRolls) {
                if (!$scope.attackRolls[i].whif) {
                    $scope.actualHits[i] = true;
                }
                $scope.crits[i] = $scope.attackRolls[i].crit;
            }
        };

        $scope.calculateDamage = function() {
            var total = 0;
            for (var i in $scope.attackRolls) {
                if ($scope.crits[i]) {
                    total += $scope.attackRolls[i].critDmg;
                }
                else if ($scope.actualHits[i]) {
                    total += $scope.attackRolls[i].damage;
                }
            }
            $scope.totalDamage = total;
        };

        $scope.showNewForm = function () {
            NewWidget.show('New Attack', function(name) {
                var obj = {
                    name: name,
                    toHit: 0,
                    damage: 0,
                    crit: 20,
                    critMult: 2
                };
                var res = $scope.add($scope.weapon, obj);
                if (res !== null) {
                    $ionicPopup.alert({
                        title: 'Oops!',
                        template: res.message
                    });
                }
            });
        };

        $scope.doneAttacking();
        $scope.$watchCollection('crits', $scope.calculateDamage);
        $scope.$watchCollection('actualHits', $scope.calculateDamage);
    }

    function checkCharacter($scope, $stateParams, Characters) {
        var msg;
        $scope.characterName = $stateParams.characterName;
        if (!$scope.characterName) {
            msg = 'ERROR: could not get character name from $stateParams';
            console.error(msg);
            throw(msg);
        }

        $scope.character = Characters.get($scope.characterName);
        if (!$scope.character) {
            msg = 'ERROR: could not get character from CharactersService';
            console.error(msg);
            throw(msg);
        }
    }

    function checkWeapon($scope, $stateParams, Characters, Buffs) {
        var msg;
        $scope.weaponName = $stateParams.weaponName;
        if (!$scope.weaponName) {
            msg = 'ERROR: could not get weaponName from $stateParams';
            console.error(msg);
            throw(msg);
        }

        $scope.weapon = Characters.getWeapon($scope.character, $scope.weaponName);
        if ($scope.weapon === null) {
            msg = 'ERROR: could not get weapon with name "' + $scope.weaponName + '"';
            console.error(msg);
            throw(msg);
        }

        if (!$scope.weapon.attacks) {
            $scope.weapon.attacks = [];
        }

        $scope.activeBuffs = Characters.compileActiveBuffs($scope.character, Buffs.all());
    }

    function remove(weapon, attack) {
        var attacks = weapon.attacks;
        var indx = attacks.indexOf(attack);
        if (indx < 0) {
            var msg = 'ERROR: cannot remove, attack not found';
            console.error(msg);
            throw msg;
        }
        attacks.splice(indx, 1);
        _Characters.save();
    }

    function add(weapon, attack) {
        var attacks = weapon.attacks;
        for (var i in attacks) {
            if (attacks[i].name === attack.name) {
                return { message: attack.name + ' is already taken' };
            }
        }
        weapon.attacks.push(attack);
        _Characters.save();
        return null;
    }
})();
