'use strict';

angular.module('s4nLifeApp')
  .service('stats', function ($http) {
    var request;

    return {
      getByProject: getByProject
    };

    function filterByProject(allStats, projectToSearch) {
      var stats = [];
      angular.forEach(allStats.data, function (value) {
        if (value.project == projectToSearch) {
          stats.push(value);
        }
      });
      return stats;
    }

    function getByProject(name) {
      if (angular.isUndefined(request)) {
        request = $http({
          method: "get",
          url: "/api/stats"
        });

      }
      return (request.then(function handleSuccess(response) {
        return filterByProject(response, name);
      }));
    }
  });
