'use strict';

var check = require('./jwt.js');

function goLogin (_, reply) {
  return reply.redirect('./login');
}

module.exports = function (callback) {
  return check(goLogin, callback);
};
