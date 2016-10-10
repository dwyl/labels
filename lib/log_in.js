'use strict';

var hapiAuth = require('hapi-auth-github');

var check = require('./jwt.js');

function logInView (_, reply) {
  reply.view('login', { url: hapiAuth.login_url() });
}

function goHome (_, reply) {
  return reply.redirect('./');
}

module.exports = check(logInView, goHome);
