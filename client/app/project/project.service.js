'use strict';

angular.module('s4nLifeApp')
  .service('project', function ($http) {
    var request;

    return ({
      getByUser: getByUser
    });

    function filterByUser(allProjects, userToSearch) {
      var projects = [];
      angular.forEach(allProjects.data, function (value) {
        angular.forEach(value.developers, function (dev) {
          if (dev == userToSearch) {
            projects.push(value);
          }
        });
      });
      return projects;
    }

    function getByUser(name) {
      if (angular.isUndefined(request)) {
        request = $http({
          method: "get",
          url: "/api/projects"
        });
      }

      return (request.then(function handleSuccess(response) {
        return filterByUser(response, name);
      }));
    }
  });
