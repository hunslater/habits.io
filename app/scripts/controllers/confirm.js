'use strict';

angular.module('habitsApp')
  .controller('ConfirmCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

    $scope.confirmDisplay = false;

    $rootScope.confirm = function (question, acceptFn, cancelFn) {

      if (!angular.isString(question) || question.trim() === '') { return; }
      if (!angular.isFunction(acceptFn)) { return; }

      $scope.message = question;

      $scope.accept = function () {
        acceptFn();
        $scope.confirmDisplay = false;
      };

      $scope.close = function () {
        if (angular.isFunction(cancelFn)) {
          cancelFn();
        }
        $scope.confirmDisplay = false;
      };

      $scope.confirmDisplay = true;

    };

  }]);
