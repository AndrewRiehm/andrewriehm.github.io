
(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('NewWidget', serviceFunc);

    function serviceFunc($ionicPopup) {
        return {
            show: function (title, callback) {
                showPopup($ionicPopup, title, callback);
            }
        };
    }

    function showPopup($ionicPopup, title, callback) {
        $ionicPopup.prompt(
        {
            title: title,
            inputType: 'text',
            inputPlaceholder: 'Name'
        })
        .then(function(res) {
            // Make sure we got a name
            var haveNameAndCallback =
                res !== '' &&
                res !== undefined &&
                res !== null &&
                callback;
            if (haveNameAndCallback) {
                callback(res);
            }
        });
    }
})();
