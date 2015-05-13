
angular.module('testApp', [
    'ui.router',
    'testApp.templates',
    'testApp.home'
    ])

.config(['$stateProvider',
         '$urlRouterProvider',
         function config($stateProvider, $urlRouterProvider) {
           $urlRouterProvider.when('', '/');
           $urlRouterProvider.otherwise('/');

           $stateProvider
            .state('test', {
              url: '/',
              views: {
                'test': { 
                  //template: 'Message: {{message}}', 
                  template: '<ui-view/>',
                  controller: 'testCtrl'
                }
              }
            });
}])

.controller('testCtrl', [
    '$scope',
    '$state',

    function($scope, $state) {
      //$scope.message = "Hello there!";
      $state.go('test.app');
    }
])
;

