'use strict';

var angular = require('angular');
var logger = require('@raincatcher/logger');

var accidentStep = require('@raincatcher-examples/step-accident');
var vehicleInspectionStep = require('@raincatcher-examples/step-vehicle-inspection');
var signatureStep = require('@raincatcher/step-signature');
var feedbackStep = require('./steps/feedbackStep');

// Create INFO logger
logger.setLogger(new logger.ClientLogger(2));

angular.module('app', [
  require('angular-ui-router'),
  require('angular-material'),
  require('@raincatcher/angularjs-auth-passport')('app'),
  require('./services'),
  require('@raincatcher/angularjs-http'),
  require('ng-sortable'),
  // Commented until this modules will be migrated
  require('@raincatcher/angularjs-workorder')({
    mode: "admin",
    listColumnViewId: "column2",
    mainColumnViewId: "content@app"
  }),
  require('@raincatcher/angularjs-workflow')({
    mode: "admin",
    listColumnViewId: "column2",
    mainColumnViewId: "content@app",
    stepDefinitions: [
      vehicleInspectionStep.definition,
      accidentStep.definition,
      signatureStep.definition,
      feedbackStep.definition
    ]
  }),
  // Load steps for preview
  vehicleInspectionStep.ngModule(),
  accidentStep.ngModule(),
  signatureStep.ngModule(),
  feedbackStep.ngModule
]);

// require('./keycloak');
require('./config');
