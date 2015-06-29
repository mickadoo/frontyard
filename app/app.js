'use strict';

// Declare app level module which depends on views, and components

angular.module('yarnyardFrontend',
  [
    'ngRoute',
    'yarnyardServices',
    'yarnyardFrontend.dashboard',
    'yarnyardFrontend.login',
    'yarnyardFrontend.users'
  ]
)
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/dashboard'});
}]);
