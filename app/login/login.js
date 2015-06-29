'use strict';

angular.module('yarnyardFrontend.login', [])
.controller('LoginCtrl', ['$scope', 'authService',

  function( $scope, authService ){

    $scope.credentials = {
      username: '',
      password: ''
    };

    $scope.login = function (credentials) {
      authService.login(credentials);
    };

    $scope.loggedIn = function() {
      return authService.loggedIn();
    };

  }
]);
