'use strict';

var verify = require('./jwt.js');
var home = require('./home.js');
var copy = require('./copy.js');
var logOut = require('./log_out.js');

module.exports = [{
  method: 'GET',
  path: '/',
  handler: verify(home)
}, {
  method: 'POST',
  path: '/',
  handler: verify(copy)
}, {
  method: 'GET',
  path: '/logout',
  handler: logOut
}];
