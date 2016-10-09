'use strict';

var hapiAuth = require('hapi-auth-github');

module.exports = function logIn (request, reply) {
  reply.view('login', { url: hapiAuth.login_url() });
};
