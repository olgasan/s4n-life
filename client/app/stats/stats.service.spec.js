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

  it("labels for radar chart are questions", function () {
    expect (stats.chart.getLabels).toBeDefined();
    expect(stats.chart.getLabels(response[1]).length).toBe (3)
  });

  it("datasets for radar chart are stats values per reviewer", function () {
    expect (stats.chart.getValues).toBeDefined();
    var datasets = stats.chart.getValues(response[1]);
    expect(datasets.length).toBe (2);
    expect(datasets[0].label).toBe (response[1].data[0].reviewer);
    expect(datasets[0].data).toBe (response[1].data[0].stats);
  });
});
