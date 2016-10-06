'use strict';

var Hapi = require('hapi');
var hoek = require('hoek');

var routes = require('./routes.js');

var server = new Hapi.Server();
var port = process.env.PORT || 8000;

server.connection({ port: port });

server.route(routes);

server.start(function (err) {
  hoek.assert(!err, err);

  console.log('Visit: http://localhost:' + server.info.port + '/'); // eslint-disable-line
});

module.exports = server;
