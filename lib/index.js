'use strict';

var Hapi = require('hapi');
var hoek = require('hoek');
var hapiAuth = require('hapi-auth-github');
var Inert = require('inert');
var Vision = require('vision');
var handlebars = require('handlebars');
var path = require('path');
var oauthHandler = require('./github_oauth_handler.js');

var routes = require('./routes.js');

var server = new Hapi.Server();
var opts = {
  REDIRECT_URL: '/githubauth', // must match GitHub app redirect URI from step 2.8
  handler: oauthHandler, // your handler
  SCOPE: 'repo' // ask for their public email address
};

require('env2')('.env');

server.connection({ port: process.env.PORT });

server.state('token', { isSecure: false });
server.state('last', { isSecure: false, encoding: 'base64json' });

server.route(routes);

server.register(
  [
    { register: hapiAuth, options: opts },
    { register: Inert, options: {} },
    { register: Vision, options: {} }
  ],
  function (err) {
    hoek.assert(!err, err);

    server.views({
      engines: { html: handlebars },
      relativeTo: path.resolve(__dirname),
      layout: 'default',
      layoutPath: '../templates/layout',
      path: '../templates/views'
    });

    server.start(function (error) {
      hoek.assert(!error, error);

      console.log('Visit: http://localhost:' + server.info.port + '/'); // eslint-disable-line
    });
  }
);

module.exports = server;
