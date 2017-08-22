var ngModule;
try {
  ngModule = angular.module('wfm.workflow.directives');
} catch (e) {
  ngModule = angular.module('wfm.workflow.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workflow-detail.tpl.html',
    '<md-toolbar class="content-toolbar">\n' +
    '  <div class="md-toolbar-tools">\n' +
    '    <h3>\n' +
    '      {{wfdCtrl.workflow.title}}\n' +
    '    </h3>\n' +
    '    <span flex></span>\n' +
    '    <md-button class="md-icon-button" aria-label="Edit" ui-sref="app.workflow.edit({workflowId: wfdCtrl.workflow.id || wfdCtrl.workflow._localuid})">\n' +
    '      <md-icon md-font-set="material-icons">edit</md-icon>\n' +
    '    </md-button>\n' +
    '    <md-button class="md-icon-button" aria-label="Delete" ng-click="wfdCtrl.delete($event, wfdCtrl.workflow)">\n' +
    '      <md-icon md-font-set="material-icons">delete</md-icon>\n' +
    '    </md-button>\n' +
    '  </div>\n' +
    '</md-toolbar>\n' +
    '\n' +
    '<div class="wfm-maincol-scroll" ng-if="wfdCtrl.workflow">\n' +
    '  <div id="stepList" ng-model="wfdCtrl.workflow.steps" as-sortable="wfdCtrl.dragControlListeners">\n' +
    '    <md-card ng-repeat="step in wfdCtrl.workflow.steps track by $index"  as-sortable-item>\n' +
    '      <md-card-content as-sortable-item-handle>\n' +
    '        <workflow-step-detail step="step"></workflow-step-detail>\n' +
    '      </md-card-content>\n' +
    '\n' +
    '\n' +
    '      <md-card-actions layout="row" layout-align="end center">\n' +
    '\n' +
    '        <md-button class="md-icon-button" aria-label="Edit Step"\n' +
    '                   ui-sref="app.workflow.step({workflowId: wfdCtrl.workflow.id, code:step.code})">\n' +
    '          <md-icon md-font-set="material-icons">create</md-icon>\n' +
    '        </md-button>\n' +
    '        <md-button class="md-icon-button" aria-label="Delete Step"\n' +
    '                   ng-click="wfdCtrl.deleteStep($event, step, $index, wfdCtrl.workflow)">\n' +
    '          <md-icon md-font-set="material-icons">delete sweep</md-icon>\n' +
    '        </md-button>\n' +
    '\n' +
    '      </md-card-actions>\n' +
    '\n' +
    '\n' +
    '    </md-card>\n' +
    '    <md-card>\n' +
    '      <md-card-content>\n' +
    '        <h2 class="md-title">Add new step</h2>\n' +
    '        <workflow-step-form></worflow-step-form>\n' +
    '      </md-card-content>\n' +
    '    </md-card>\n' +
    '    <md-button class="md-fab" aria-label="Add Workflow" ui-sref="app.workflow.add">\n' +
    '      <md-icon md-font-set="material-icons">add</md-icon>\n' +
    '    </md-button>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
