'use strict';

angular.module('yarnyardServices', ['ngResource'])
.factory('restService', ['$resource','authService',
  function($resource, authService){

    var apiUrl = 'http://api.yarnyard.dev';

    return $resource(apiUrl+'/user', {}, {
      getAllUsers:
        {
          method:'GET',
          isArray:true,
          headers: {
            'Authorization': authService.getAuthorizationHeader
          },
          interceptor: {
            'responseError': function(rejection) {
              if (rejection.status == 401) {
                // simple log out for expired tokens
                authService.logout();
              }
            }
          }
        }
    });
  }
])
.factory('authService',['$rootScope','$http', function($rootScope, $http) {

    var token = '';

    return {
        login: function (credentials) {
          // do login
          var login_url = 'http://api.yarnyard.dev/oauth/v2/token?'
            + 'grant_type=password'
            + '&client_id=1_58yrapmmgqo0kkogs0owks8gcokw0gkc4wc04kwg44c0sgksw0'
            + '&client_secret=<secret>'
            + '&username=' + credentials.username
            + '&password=' + credentials.password

          $http.get(login_url).
          success(function(data, status, headers, config) {
            token = data.access_token;
          }).
          error(function(data, status, headers, config) {
            token = '';
          });
        },
        logout: function() {
          token = null;
        },
        loggedIn: function () {
          if (token) {
            return true;
          }

          return false;
        },
        getAuthorizationHeader: function() {
          return 'Bearer ' + token;
        }
    }
}]);
