'use strict';

var validate = require('./validate.js');
var home = require('./home.js');
var copy = require('./copy.js');
var logOut = require('./log_out.js');
var logIn = require('./log_in.js');

module.exports = [{
  method: 'GET',
  path: '/',
  handler: validate(home)
}, {
  method: 'POST',
  path: '/',
  handler: validate(copy)
}, {
  method: 'GET',
  path: '/logout',
  handler: logOut
}, {
  method: 'GET',
  path: '/login',
  handler: logIn
}];
