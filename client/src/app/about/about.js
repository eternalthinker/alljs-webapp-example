angular.module('testApp.about', [])

.config(['$stateProvider', function config($stateProvider) {
  $stateProvider.state('test.app.about', {
    url: 'about',
    views: {
      "content@test.app": {
        controller: 'testAboutCtrl',
        templateUrl: 'app/about/about.html'
      }
    }
  });
}])

.controller('testAboutCtrl', [
  '$scope',
  '$state',
  function($scope, $state) {
    console.log("[state: about]");
    
  }
]);
