'use strict';

angular.module('yarnyardFrontend.confirmation', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/confirm-email', {
    templateUrl: 'confirmMail/confirmation.html',
    controller: 'emailConfirmationCtrl'
  });
}])

.controller('emailConfirmationCtrl', [ '$routeParams', 'authService',  function($routeParams, authService) {

  var tokenConfirmationData = {
    token: $routeParams.token,
    userId: $routeParams.userId
  };

  authService.confirmMail(tokenConfirmationData);

}]);
