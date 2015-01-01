'use strict';

angular.module('s4nLifeApp')
  .service('project', function ($http) {
    return ({
      getByUser: getByUser
    });

    function getByUser(name) {
      var request = $http({
        method: "get",
        url: "/api/projects"
      });

      return (request.then(function handleSuccess(response) {
        var projects = [];
        angular.forEach(response.data, function (value){
          angular.forEach(value.developers, function (dev){
            if (dev == name){
              projects.push (value);
            }
          });
        });
        return projects;
      }));
    }
  });
