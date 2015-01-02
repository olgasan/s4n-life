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
        if (angular.isDefined($scope.selectedProject.name)) {
          setChartData ();
          console.log($scope.chartObject);
        }
      })
    };

    function setChartData () {

      $scope.chartObject = {
        type: "BarChart",
        displayed: true,
        data: stats.getChartData($scope.selectedProject.stats),
        options: {
          title: "Values per project",
          isStacked: "true",
          fill: 20,
          displayExactValues: true,
          vAxis: {
            title: "Reviewers",
            gridlines: {
              count: 5
            }
          },
          hAxis: {
            title: "Reviews"
          }
        },
        formatters: {}
      };
    }

    $scope.cssStyle = "height:200px; width:300px;";
  });
