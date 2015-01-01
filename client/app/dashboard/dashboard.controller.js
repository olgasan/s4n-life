'use strict';

angular.module('s4nLifeApp')
  .controller('DashboardCtrl', function ($scope, user, project) {
    $scope.users = [];
    $scope.selectedUser = {};

    $scope.update = function () {
      project.getByUser($scope.selectedUser.name).then(function (data) {
        $scope.selectedUser.projects = data;
      })
    };

    user.getAll().then(function (users) {
      $scope.users = users;
    });

  });
