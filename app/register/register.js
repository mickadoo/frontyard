'use strict';

angular.module('yarnyardFrontend.register', [])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/registration-form.html',
    controller: 'registrationCtrl'
  });
}])
.controller('registrationCtrl', ['$scope', 'authService',

  function( $scope, authService ){

    $scope.credentials = {
      username: '',
      email: '',
      password: ''
    };

    $scope.register = function (credentials) {
      authService.register(credentials);
    };

  }
]);
