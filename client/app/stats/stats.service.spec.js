'use strict';

describe('Service: stats', function () {

  // load the service's module
  beforeEach(module('s4nLifeApp'));

  // instantiate service
  var stats, $httpBackend, response;

  beforeEach(inject(function (_stats_, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    stats = _stats_;
    response = [
      {
        project: 'p1',
        data: [
          {
            reviewed: 'fulanito',
            reviewer: 'sutanito',
            stats: [2, 4, 4]
          }
        ]
      },
      {
        project: 'p4',
        data: [
          {
            reviewed: 'fulanito',
            reviewer: 'sutanito',
            stats: [3, 2, 5]
          },
          {
            reviewed: 'fulanito',
            reviewer: 'menganito',
            stats: [4, 3, 4]
          }
        ]
      }
    ];

    $httpBackend.expectGET('/api/stats').respond(response);
  }));

  it('should return stats for given project', function () {
    expect(stats.getByProject).toBeDefined();

    var projectStats = undefined;
    stats.getByProject('p4').then(function (pData) {
      projectStats = pData;
    });

    $httpBackend.flush();
    expect(angular.isArray(projectStats)).toBeTruthy();
    expect(projectStats.length).toBe(1);
  });
/*
* // Chart.js Data
 $scope.data = {
 labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
 datasets: [
 {
 label: 'My First dataset',
 fillColor: 'rgba(220,220,220,0.2)',
 strokeColor: 'rgba(220,220,220,1)',
 pointColor: 'rgba(220,220,220,1)',
 pointStrokeColor: '#fff',
 pointHighlightFill: '#fff',
 pointHighlightStroke: 'rgba(220,220,220,1)',
 data: [65, 59, 90, 81, 56, 55, 40]
 },
 {
 label: 'My Second dataset',
 fillColor: 'rgba(151,187,205,0.2)',
 strokeColor: 'rgba(151,187,205,1)',
 pointColor: 'rgba(151,187,205,1)',
 pointStrokeColor: '#fff',
 pointHighlightFill: '#fff',
 pointHighlightStroke: 'rgba(151,187,205,1)',
 data: [28, 48, 40, 19, 96, 27, 100]
 }
 ]
 };*/
  it("labels for radar chart are questions", function () {
    expect (stats.chart.getLabels).toBeDefined();
    expect(stats.chart.getLabels(response[0]).length).toBe (3)
  });

});
