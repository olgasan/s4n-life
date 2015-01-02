'use strict';

angular.module('s4nLifeApp')
  .service('stats', function ($http) {
    var request;

    return {
      getByProject: getByProject,
      getChartData: getChartData
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

    function getChartData(originalData) {
      return {
        cols: getTitles(originalData),
        rows: getData(originalData)
      };
    }

    function getData(stats) {
      var result = [];

      angular.forEach(stats, function (value) {
        angular.forEach(value.data, function (stat) {
          var c = [];
          var i = 1;
          c.push({
            v: stat.reviewer
          });
          angular.forEach(stat.stats, function (v) {
            c.push({
              v: v,
              f: v+""
            });
            i++;
          });
          result.push({
            c: c
          });
        });
      });

      return result;
    }

    function getTitles(stats) {
      var result = [];
      var qs = [];

      result.push({
        id: "reviewer",
        label: "reviewer",
        type: "string",
        p: {}
      });

      angular.forEach(stats, function (value) {
        angular.forEach(value.data, function (stat) {
          var i = 1;
          angular.forEach(stat.stats, function () {
            if (qs.indexOf(i) < 0) {
              qs.push(i);
              result.push({
                id: "q" + i,
                label: "q" + i,
                type: "number",
                p: {}
              });
            }
            i++;
          });
        });
      });

      return result;
    }
  });
