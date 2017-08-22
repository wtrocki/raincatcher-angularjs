var config = require('../config.json');
var _ = require('lodash');


/**
 *
 * Service to manage initialise all of the sync data sets.
 *
 * @param $q
 * @param mediator
 * @param syncService
 * @returns {{}}
 * @constructor
 */
function SyncPoolService($q, mediator, syncService) {
  var syncPool = {};
  var syncManagers;

  //Initialising the sync service - This is the global initialisation
  syncService.init(window.$fh, config.syncOptions);

  syncPool.removeManagers = function() {
    var promises = _.map(syncManagers, function(syncManager) {
      return syncManager.stop();
    });

    return $q.all(promises).then(function() {
      syncManagers = null;
    });
  };

  syncPool.syncManagerMap = function(profileData) {
    if (! profileData) {
      return $q.when({});
    }

    if (syncManagers) {
      return $q.when(syncManagers);
    }

    syncManagers = {};

    var filter = {
      key: 'assignee',
      value: profileData.id,
      sessionToken: profileData.sessionToken
    };

    //Initialisation of sync data sets to manage.
    return $q.all([
      syncService.manage(config.datasetIds.workorders, config.syncOptions.workorders, {filter: filter}, {}),
      syncService.manage(config.datasetIds.workflows, config.syncOptions.workflows, {}, {}),
      syncService.manage(config.datasetIds.results, config.syncOptions.results, {}, {})
    ]).then(function(managers) {
      managers.forEach(function(managerWrapper) {
        syncManagers[managerWrapper.manager.datasetId] = managerWrapper;
        managerWrapper.start(); //start sync
      });
      syncManagers.workorders.manager.publishRecordDeltaReceived(mediator);
      return syncManagers;
    });
  };

  syncPool.forceSync = function(managers) {
    var promises = [];
    _.forOwn(managers, function(manager) {
      promises.push(
        manager.forceSync()
          .then(manager.waitForSync)
          .then(function() {
            return manager;
          })
      );
    });
    return $q.all(promises);
  };

  return syncPool;
}

angular.module('wfm-mobile').service('syncPool', ['$q', 'mediator', 'syncService', SyncPoolService]);
