'use strict';

var _ = require('lodash');

// Get list of users
exports.index = function(req, res) {
  res.json([
  {name : 'fulanito'},
  {name : 'sutanito'},
  {name : 'menganito'}
  ]);
};
