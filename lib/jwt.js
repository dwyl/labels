'use strict';

var JWT = require('jsonwebtoken');

module.exports = function verify (callback) {
  return function (request, reply) {
    var token = request.state.token;

    if (typeof token === 'undefined') {
      return reply.redirect('/login');
    }

    return JWT.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return reply.redirect('/login');
      }

      return callback(request, reply, decoded);
    });
  };
};
