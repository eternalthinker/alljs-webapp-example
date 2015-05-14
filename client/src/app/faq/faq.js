angular.module('testApp.faq', [])

.config(['$stateProvider', function config($stateProvider) {
  $stateProvider.state('test.app.faq', {
    url: 'faq',
    views: {
      "content@test.app": {
        controller: 'testFaqCtrl',
        templateUrl: 'app/faq/faq.html'
      }
    }
  });
}])

.controller('testFaqCtrl', [
  '$scope',
  '$state',
  function($scope, $state) {
    
  }
]);
