angular.module('testApp', [
    'ui.router',
    'testApp.templates',
    'testApp.about',
    'testApp.faq',
    'testApp.contact',
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
      $state.go('test.app');
    }
])
;

