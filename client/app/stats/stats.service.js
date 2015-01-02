'use strict';

angular.module('s4nLifeApp')
  .service('stats', function ($http) {
    var request;

    return {
      getByProject: getByProject,
      chart: {
        getLabels: getLabels
      }
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

    function getLabels(stats) {
      var labels = [];
      var added = [];
      angular.forEach(stats.data, function (data) {
        var i = 1;
        angular.forEach(data.stats, function (v) {
          if (added.indexOf(i) < 0) {
            labels.push("q" + i);
            added.push(i);
            i++;
          }
        });
      });
      return labels;
    }
  });
