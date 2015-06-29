'use strict';

angular.module('yarnyardServices', ['ngResource'])
.factory('restService', ['$resource','authService',
  function($resource, authService){

    var apiUrl = 'http://api.yarnyard.dev';

    return $resource(apiUrl+'/user/:userId', {}, {
      getAllUsers: {
          method:'GET',
          isArray:true,
          interceptor: {
            'responseError': function(rejection) {
              if (rejection.status == 401) {
                // simple log out for expired tokens
                authService.logout();
              }
            }
          }
      },
      getUser: {
        method:'GET',
        isArray:false
      }
    });
  }
])
.factory('authService',['$http', '$rootScope', function($http, $rootScope) {

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
            $rootScope.token = token;
          }).
          error(function(data, status, headers, config) {
            token = '';
          });
        },
        logout: function() {
          token = null;
          $rootScope.token = null;
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
}])
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('tokenInterceptor')
}])
.factory('tokenInterceptor', ['$rootScope', function ($rootScope) {
    return {
      'request': function(config) {
          if (!config.headers.Authorization && $rootScope.token) {
            config.headers.Authorization = 'Bearer ' + $rootScope.token
          }

          return config;
      },
    };
}]);
