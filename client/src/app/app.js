angular.module('testApp', [
    'ui.router',
    'testApp.templates',
    'testApp.about',
    'testApp.faq',
    'testApp.contact',
    'testApp.home'
    ])

.config(['$stateProvider',
         '$locationProvider',
         '$urlRouterProvider',
         function config($stateProvider, $locationProvider, $urlRouterProvider) {
           $urlRouterProvider.when('', '/');
           $urlRouterProvider.otherwise('/');
           $locationProvider.html5Mode(true).hashPrefix('!');

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

