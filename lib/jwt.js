'use strict';

var hapiAuth = require('hapi-auth-github');
var JWT = require('jsonwebtoken');

module.exports = function verify (callback) {
  return function (request, reply) {
    var token = request.state.token;

    JWT.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return reply.view('login', { url: hapiAuth.login_url() });
      }

      return callback(request, reply, decoded);
    });
  };
};
