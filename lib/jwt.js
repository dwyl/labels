'use strict';

var JWT = require('jsonwebtoken');

module.exports = function check (onFail, onSuccess) {
  return function (request, reply) {
    var token = request.state.token;

    if (typeof token === 'undefined') {
      return onFail(request, reply);
    }

    return JWT.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return onFail(request, reply);
      }

      return onSuccess(request, reply, decoded);
    });
  };
};
