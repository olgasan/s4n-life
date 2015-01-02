'use strict';

angular.module('s4nLifeApp')
  .controller('DashboardCtrl', function ($scope, user, project, stats) {
    $scope.users = [];
    $scope.selectedUser = {};
    $scope.selectedProject = {};

    $scope.updateUser = function () {
      project.getByUser($scope.selectedUser.name).then(function (data) {
        $scope.selectedUser.projects = data;
      });
    };

    user.getAll().then(function (users) {
      $scope.users = users;
    });

    $scope.updateStats = function () {
      stats.getByProject($scope.selectedProject.name).then(function (data) {
        $scope.selectedProject.stats = data;
      })
    };

  });
