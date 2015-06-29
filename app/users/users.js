'use strict';

angular.module('yarnyardFrontend.users', ['ngRoute','yarnyardServices'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/user-list', {
      templateUrl:'users/user-list.html',
      controller:'userListCtrl'
    })
    .when('/user-profile/:userId', {
      templateUrl:'users/user-profile.html',
      controller:'userProfileCtrl'
    });
}])
.controller('userListCtrl', ['$scope', 'restService', function( $scope, restService ){

  $scope.allUsers = restService.getAllUsers();

}])
.controller('userProfileCtrl', ['$scope', '$routeParams', 'restService', function( $scope, $routeParams, restService ){

  restService.getUser({userId: $routeParams.userId}, function(user) {
      $scope.user = user;
  });

}]);
