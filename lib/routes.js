'use strict';

var verify = require('./jwt.js');
var home = require('./home.js');
var copy = require('./copy.js');

module.exports = [{
  method: 'GET',
  path: '/',
  handler: verify(home)
}, {
  method: 'POST',
  path: '/',
  handler: verify(copy)
}];
