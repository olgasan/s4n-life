'use strict';

angular.module('s4nLifeApp')
  .controller('DashboardCtrl', function ($scope, $http) {
    $scope.users = [];

    $http.get('/api/users').success(function(users) {
      $scope.users = users;
    });
  });
