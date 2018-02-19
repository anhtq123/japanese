  var shareModule = angular.module("shareModule", []);
  shareModule.factory("shareService", function($rootScope) {
      var shareService = {};
      shareService.message = "";
      shareService.broadcastMessage = function(message) {
          shareService.message = message;
          $rootScope.message = message;
          $rootScope.$broadcast("notifyMessageChange");
          
      }
      return shareService;
  });

  var myApp = angular.module("myapp", ["shareModule"]);
  //service style, probably the simplest one 
  myApp.controller("ACtrl", function($rootScope, $scope, shareService) {
      $scope.message = "Broadcast Message";
      $rootScope.message = "Broadcast Message";
      $scope.notify = function() {
          shareService.broadcastMessage($scope.message);
      };
      // $scope.$on("notifyMessageChange", function() {
      //     $scope.message = shareService.message;
      // });
  });

  myApp.controller("BCtrl", function($rootScope, $scope, shareService) {
      //$scope.messageb = "Broadcast Message B";
      $scope.$on("notifyMessageChange", function() {
          //$scope.messageb = shareService.message;
          $scope.messageb = $rootScope.message;
      });
  });

  myApp.controller("CCtrl", function($scope, shareService) {
      //$scope.messagec = "Broadcast Message C";
      $scope.$on("notifyMessageChange", function() {
          $scope.messagec = shareService.message;
      });
  });