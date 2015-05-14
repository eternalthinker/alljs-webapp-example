angular.module('testApp.contact', [])

.config(['$stateProvider', function config($stateProvider) {
  $stateProvider.state('test.app.contact', {
    url: 'faq',
    views: {
      "content@test.app": {
        controller: 'testContactCtrl',
        templateUrl: 'app/contact/contact.html'
      }
    }
  });
}])

.controller('testContactCtrl', [
  '$scope',
  '$state',
  function($scope, $state) {
    
  }
]);
