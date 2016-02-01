
(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('Campaigns', campaignsServiceFunc);

    var _webStorage;
    var CAMPAIGNS_KEY = 'campaigns';
    var campaigns = [];

    function campaignsServiceFunc(webStorage) {
        _webStorage = webStorage;
        return {
            all: campaignAll,
            add: campaignAdd,
            remove: campaignRemove,
            get: campaignGet
        };
    }

    function load() {
        if (campaigns.length === 0 && _webStorage.local.has(CAMPAIGNS_KEY)) {
            campaigns = _webStorage.local.get(CAMPAIGNS_KEY);
        }
    }

    function save() {
        _webStorage.local.set(CAMPAIGNS_KEY, campaigns);
    }

    function campaignGet(campaignName) {
        load();
        for (var i = 0; i < campaigns.length; i++) {
            if (campaigns[i].name === campaignName) {
                return campaigns[i];
            }
        }
        return null;
    }

    function campaignRemove(campaign) {
        load();
        campaigns.splice(campaigns.indexOf(campaign), 1);
        save();
    }

    function campaignAdd(campaign, cb) {
        load();

        for(var index in campaigns) {
            var b = campaigns[index];
            if (b.name === campaign.name) {
                if (cb) {
                    cb({ message: 'Error: ' + campaign.name + ' already exists!' }, null);
                }
                return;
            }
        }
        campaigns.push(campaign);
        save();

        if (cb) {
            cb(null, campaign);
        }
    }

    function campaignAll() {
        load();
        return campaigns;
    }
})();
