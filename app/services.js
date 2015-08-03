'use strict';

angular.module('yarnyardServices', ['ngResource'])
.factory('restService', ['$resource','authService', '$rootScope',
  function($resource, authService, $rootScope){

    return $resource($rootScope.apiUrl+'/users/:userId', {}, {
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
            var login_url = $rootScope.apiUrl + '/oauth/v2/token';
            $http.post(login_url,
                {
                    'grant_type': 'password',
                    'client_id': '1_37feg9kqp2skwck48kksgkg0sc48s8o4soo4k80cc0ok880c4g',
                    'client_secret': '4z0zkw1g54gswosg4kkc8scs0wss8w0cwwc4sskco08gcwc404',
                    'username': credentials.username,
                    'password': credentials.password
                }
            ).
            success(function(data, status, headers, config) {
                token = data.access_token;
                $rootScope.token = token;
            }).
            error(function(data, status, headers, config) {
                alert('login failed');
                token = '';
            });
        },
        register: function (credentials) {
            var registrationUrl = $rootScope.apiUrl + '/users';
            $http.post(registrationUrl,
                {
                    username: credentials.username,
                    email: credentials.email,
                    password: credentials.password
                }
            ).then(function(data){
                console.log(data);
            });
        },
        logout: function() {
          token = null;
          $rootScope.token = null;
        },
        loggedIn: function () {
          return token;
        },
        getAuthorizationHeader: function() {
          return 'Bearer ' + token;
        },
        confirmMail: function(data) {
          var confirmationUrl = $rootScope.apiUrl + '/confirm-email'
          + '?userId=' + data.userId
          + '&token=' + data.token;

          $http.post(confirmationUrl)
          .success(function(data, status, headers, config) {
            alert('address confirmed');
          })
          .error(function(data, status, headers, config) {
            alert('error confirming email');
          });
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
      }
    };
}]);
