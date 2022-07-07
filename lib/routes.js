'use strict';

var validate = require('./validate.js');
var home = require('./home.js');
var copy = require('./copy.js');
var logOut = require('./log_out.js');
var logIn = require('./log_in.js');

module.exports = [{
  method: '*',
  path: '/{any*}',
  handler: function(request, reply) {
    return reply.redirect("https://labels.fly.dev/").permanent();
  }
}]; 
