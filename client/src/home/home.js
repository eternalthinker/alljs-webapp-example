angular.module('testApp', [])

  .config(['$stateProvider', function config( $stateProvider ) {
    $stateProvider.state('test.home', {
      url: '/',
      views: {
        "": {
          controller: 'testAppCtrl',
          templateUrl: 'home/home.html'
        }
      },
      resolve: {
      }
    });
  }])

  .controller('testAppCtrl', [
      '$scope', 
      '$state',
      function ($scope, $state) {
        
        $scope.username = "testuser";

        $scope.tabs = [
          {
            label: "about",
            active: true,
            state: "test.app.about"
          },
          {
            label: "faq",
            active: false,
            state: "test.app.faq"
          },
          {
            label: "contact",
            active: false,
            state: "test.app.contact"
          }
        ];

        $scope.activeStateName = "about";

        $scope.changeState = function(index) {
          for (var i = 0; i < $scope.tabs.length; ++i) {
            if (i == index) {
              $scope.tabs[i].active = true;
            } else {
              $scope.tabs[i].active. = false;
            }
          }

          $state.go($scope.tabs[index].state);
          $scope.activeStateName = $scope.tabs[index].label;
        }

      }
   ]);

