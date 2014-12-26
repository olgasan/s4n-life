'use strict';

angular.module('s4nLifeApp')
  .controller('DashboardCtrl', function ($scope, $http) {
    var selectedUser = undefined;
    $scope.users = [];

    $http.get('/api/users').success(function(users) {
      $scope.users = users;
      selectedUser = users[0];
    });

    $scope.getSelectedUser = function (){
      return selectedUser;
    }
  });
