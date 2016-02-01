
(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('BuffDetailCtrl', buffDetailCtrlFunc);

    function buffDetailCtrlFunc($scope, $stateParams, Buffs) {
        $scope.buff = Buffs.get($stateParams.buffName);
        $scope.$watch('buff.name', Buffs.save);
        $scope.$watch('buff.toHit', Buffs.save);
        $scope.$watch('buff.damage', Buffs.save);
        $scope.$watch('buff.skills', Buffs.save);
        $scope.$watch('buff.extraHit', Buffs.save);
        $scope.$watch('buff.type', Buffs.save);
    }

})();
