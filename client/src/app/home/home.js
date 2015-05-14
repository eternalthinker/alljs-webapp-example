angular.module('testApp.home', [])

  .config(['$stateProvider', function config($stateProvider) {
    $stateProvider.state('test.app', {
      url: '',
      views: {
        "": {
          controller: 'testAppCtrl',
          templateUrl: 'app/home/home.html'
        }
      }
    });
  }])

  .controller('testAppCtrl', [
      '$scope', 
      '$state',
      function ($scope, $state) {

        console.log("[home.js] [state:test.app]" );
        
        $scope.username = "testuser";

        $scope.tabs = [
          {
            label: "About",
            active: false,
            state: "test.app.about"
          },
          {
            label: "FAQ",
            active: false,
            state: "test.app.faq"
          },
          {
            label: "Contact",
            active: false,
            state: "test.app.contact"
          }
        ];

        $scope.activeStateName = null;

        $scope.changeState = function(index) {
          for (var i = 0; i < $scope.tabs.length; ++i) {
            if (i == index) {
              $scope.tabs[i].active = true;
            } else {
              $scope.tabs[i].active = false;
            }
          }

          //$state.go($scope.tabs[index].state);
          $scope.activeStateName = $scope.tabs[index].label;
        }

        $scope.goHome = function() {
          for (var i = 0; i < $scope.tabs.length; ++i) {
            $scope.tabs[i].active = false;
          }

          $scope.activeStateName = null;
          $state.go('test.app');
        }

      }
   ]);

