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

});
