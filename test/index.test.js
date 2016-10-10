'use strict';

var test = require('tape');

var server = require('../lib/');

test('basic server test', function (t) {
  server.inject({ method: 'GET', url: '/' }, function (response) {
    t.equal(response.statusCode, 302, 'redirect to login when no session');

    t.end();
  });
});

test('stop server', function (t) {
  server.stop(t.end);
});
