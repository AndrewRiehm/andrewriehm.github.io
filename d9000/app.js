// Ionic Starter App

(function() {
    'use strict';

    // Forward declaration of controllers module
    angular
        .module('starter.controllers', ['ionic', 'angular-clipboard']);

    // Forward declaration of services module
    angular
        .module('starter.services', ['ionic', 'webStorageModule']);

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.campaigns', {
    url: '/campaigns',
    views: {
      'tab-campaigns': {
        templateUrl: 'components/campaigns/tab-campaigns.html',
        controller: 'CampaignsCtrl'
      }
    }
  })

  .state('tab.campaigns-characters', {
    url: '/campaigns/:campaignName',
    views: {
      'tab-campaigns': {
        templateUrl: 'components/characters/list-characters.html',
        controller: 'CharactersCtrl'
      }
    }
  })

  .state('tab.campaigns-character-detail', {
    url: '/campaigns/:campaignName/:characterName',
    views: {
      'tab-campaigns': {
        templateUrl: 'components/characters/character-details.html',
        controller: 'CharacterCtrl'
      }
    }
  })

  .state('tab.campaigns-character-weapon-detail', {
    url: '/campaigns/:campaignName/:characterName/:weaponName',
    views: {
      'tab-campaigns': {
        templateUrl: 'components/weapons/weapon-details.html',
        controller: 'WeaponCtrl'
      }
    }
  })

  .state('tab.characters-weapon-attack-detail', {
    url: '/characters/:characterName/:weaponName/:attackName',
    views: {
      'tab-campaigns': {
        templateUrl: 'components/attacks/attack-details.html',
        controller: 'AttackCtrl'
      }
    }
  })

  .state('tab.buffs', {
      url: '/buffs',
      views: {
        'tab-buffs': {
          templateUrl: 'components/buffs/tab-buffs.html',
          controller: 'BuffsCtrl'
        }
      }
    })

  .state('tab.buff-detail', {
      url: '/buffs/:buffName',
      views: {
        'tab-buffs': {
          templateUrl: 'components/buffs/buff-detail.html',
          controller: 'BuffDetailCtrl'
        }
      }
    })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'components/settings/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/campaigns');

});

})();
