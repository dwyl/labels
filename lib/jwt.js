'use strict';

var hapiAuth = require('hapi-auth-github');
var JWT = require('jsonwebtoken');

var githubLogin = function () {
  var url = hapiAuth.login_url();
  var src = 'https://cloud.githubusercontent.com/assets/'
    + '194400/11214293/4e309bf2-8d38-11e5-8d46-b347b2bd242e.png'
  ;
  var btn = '<a href="'
    + url
    + '"><img src="'
    + src
    + '" alt="Login With GitHub"></a>'
  ;

  return btn;
};


module.exports = function verify (callback) {
  return function (request, reply) {
    var token = request.state.token;

    JWT.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return reply(githubLogin());
      }

      return callback(request, reply, decoded);
    });
  };
};
