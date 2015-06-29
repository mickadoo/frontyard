'use strict';

angular.module('yarnyardServices', ['ngResource'])
.factory('restService', ['$resource','$rootScope',
  function($resource, $rootScope){

    var apiUrl = 'http://api.yarnyard.dev';
    var token = '';

    if ($rootScope.oauth_token) {
      token = $rootScope.oauth_token
    }

    return $resource(apiUrl+'/user', {}, {
      getAllUsers:
        {
          method:'GET',
          isArray:true,
          headers: {
            'Authorization': 'Bearer '+ token
          }
        }
    });
  }
]);
