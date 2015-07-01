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

  // todo move to service?
  function parseLinkHeader(header) {

    if (header.length === 0) {
        throw new Error("input must not be of zero length");
    }

    // Split parts by comma
    var parts = header.split(',');
    var links = {};
    // Parse each part into a named link
    for(var i=0; i<parts.length; i++) {
        var section = parts[i].split(';');
        if (section.length !== 2) {
            throw new Error("section could not be split on ';'");
        }
        var url = section[0].replace(/<(.*)>/, '$1').trim();
        var name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
    }
    return links;
  }

  $scope.allUsers = restService.getAllUsers({}, function(data, headers) {
    var linkHeaders = parseLinkHeader(headers('Link'));
    
    $scope.lastPageLink = linkHeaders.last;
    $scope.currentPageLink = linkHeaders.last;

  });

}])
.controller('userProfileCtrl', ['$scope', '$routeParams', 'restService', function( $scope, $routeParams, restService ){

  restService.getUser({userId: $routeParams.userId}, function(user) {
      $scope.user = user;
  });

}]);
