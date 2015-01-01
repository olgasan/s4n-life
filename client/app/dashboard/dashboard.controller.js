'use strict';

angular.module('s4nLifeApp')
  .controller('DashboardCtrl', function ($scope, user) {
    $scope.users = [];

    user.getAll().then(function(users){
      $scope.users = users;
    });
  });
