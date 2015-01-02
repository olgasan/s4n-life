'use strict';

angular.module('s4nLifeApp')
  .controller('DashboardCtrl', function ($scope, user, project, stats) {
    $scope.users = [];
    $scope.selectedUser = {};
    $scope.selectedProject = {};
    $scope.chart = {};

    $scope.selectUser = function (user){
      $scope.selectedUser = user;
      $scope.updateUser();
    };

    $scope.selectProject = function (project){
      $scope.selectedProject = project;
      $scope.updateStats();
    };

    $scope.updateUser = function () {
      project.getByUser($scope.selectedUser.name).then(function (data) {
        $scope.selectedUser.projects = data;
      });
    };

    user.getAll().then(function (users) {
      $scope.users = users;
    });

    $scope.updateStats = function () {
      if (angular.isDefined($scope.selectedProject)) {
        stats.getByProject($scope.selectedProject.name).then(function (data) {
          $scope.selectedProject.stats = filterByReviewed(data);
          if ($scope.selectedProject.stats.length > 0) {
            $scope.chart.data = {
              labels: stats.chart.getLabels($scope.selectedProject.stats[0]),
              datasets: addValues()
            };
            return {};
          }
        });
      }
      $scope.chart.data = cleanChartData();
    };

    function filterByReviewed(data) {
      if ((data.length > 0) && (data[0].data[0].reviewed == $scope.selectedUser.name)) {
        return data;
      }
      else {
        return [];
      }
    }

    function addValues() {
      var datasets = stats.chart.getValues($scope.selectedProject.stats[0]);
      angular.forEach(datasets, function (dataset) {
        dataset.fillColor = 'rgba(220,220,220,0.2)';
        dataset.strokeColor = 'rgba(220,220,220,1)';
        dataset.pointColor = 'rgba(220,220,220,1)';
        dataset.pointStrokeColor = '#fff';
        dataset.pointHighlightFill = '#fff';
        dataset.pointHighlightStroke = 'rgba(220,220,220,1)';
      });
      return datasets;
    }

    function cleanChartData() {
      return {datasets: [{data: []}], labels: []};
    }

    $scope.chart.data = cleanChartData();
    $scope.chart.config = {
      responsive: true,
      scaleShowLine: true,
      angleShowLineOut: true,
      scaleShowLabels: false,
      scaleBeginAtZero: false,
      angleLineColor: 'rgba(0,0,0,.1)',
      angleLineWidth: 1,
      pointLabelFontFamily: '"Arial"',
      pointLabelFontStyle: 'normal',
      pointLabelFontSize: 10,
      pointLabelFontColor: '#666',
      pointDot: true,
      pointDotRadius: 3,
      pointDotStrokeWidth: 1,
      pointHitDetectionRadius: 20,
      datasetStroke: true,
      datasetStrokeWidth: 2,
      datasetFill: true,
      legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };
  });
