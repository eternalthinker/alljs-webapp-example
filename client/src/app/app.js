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
              abstract: true,
              url: '/',
              views: {
                'test': { 
                  template: '<ui-view />',
                  controller: 'testCtrl'
                }
              }
            });
}])

.controller('testCtrl', [
    '$scope',
    '$state',

    function($scope, $state) {
      console.log("Triggering [state: test.app]...");
      //$state.go('test.app');
    }
])

.run (function($rootScope, $state) {
  $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
  console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
});
 
$rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
  console.log('$stateChangeError - fired when an error occurs during transition.');
  console.log(arguments);
});
 
$rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
  console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
});
 
$rootScope.$on('$viewContentLoaded',function(event){
  console.log('$viewContentLoaded - fired after dom rendered',event);
});
 
$rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
  console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
  console.log(unfoundState, fromState, fromParams);
}); 
})
;


