'use strict';

module.exports = [{
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    return reply('<h1>DWYL LABELS</h1>');
  }
}];
