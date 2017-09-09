var config = require("../../config.json").sync;

var SyncApiDataService = require("../sync/syncDataRepository");

var workordersService = new SyncApiDataService();

// WFM based service for workorders
angular.module('wfm.common.apiservices').service("workorderService", ['syncGlobalManager', function(syncGlobalManager) {
  return workordersService;
}]);

/**
 * Contains list of active sync services
 * This services can have injected sync managers.
 **/
module.exports = {
  workordersService: workordersService
}
