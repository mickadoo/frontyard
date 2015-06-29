'use strict';

angular.module('yarnyardFrontend.login', [])

.controller('LoginCtrl', function ($scope, $rootScope, $http) {
  $scope.credentials = {
    username: '',
    password: ''
  };

  $scope.login = function (credentials) {
    // do login
    var login_url = 'http://api.yarnyard.dev/oauth/v2/token?'
      + 'grant_type=password'
      + '&client_id=1_58yrapmmgqo0kkogs0owks8gcokw0gkc4wc04kwg44c0sgksw0'
      + '&client_secret=<secret>'
      + '&username=' + credentials.username
      + '&password=' + credentials.password

    $http.get(login_url).
    success(function(data, status, headers, config) {
      $rootScope.oauth_token = data.access_token;
    }).
    error(function(data, status, headers, config) {
      $rootScope.oauth_token = null;
      console.log('login failed');
    });
  };

  $scope.loggedIn = function() {
    if ($rootScope.oauth_token) {
      return true;
    }

    return false;
  }
})
