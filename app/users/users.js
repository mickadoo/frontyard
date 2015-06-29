'use strict';

angular.module('yarnyardFrontend.users', ['ngRoute','yarnyardServices'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/user-list', {
    templateUrl:'users/user-list.html',
    controller:'userCtrl'
  });
}])
.controller('userCtrl', ['$scope', 'restService', function( $scope, restService ){
  $scope.allUsers = restService.getAllUsers();
}]);
