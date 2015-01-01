'use strict';

angular.module('s4nLifeApp')
  .service('user', function ($http) {
    return ({
      getAll: getAll
    });

    function getAll() {
      var request = $http({
        method: "get",
        url: "/api/users"
      });

      return (request.then(handleSuccess));
    }

    function handleSuccess(response) {
      return response.data;
    }
  });
