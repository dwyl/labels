'use strict';

var hapiAuth = require('hapi-auth-github');
var JWT = require('jsonwebtoken');
var path = require('path');

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

module.exports = [{
  method: 'GET',
  path: '/',
  handler: function (req, reply) {
    var token = req.state.token;

    JWT.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return reply(githubLogin());
      }

      return reply.file(path.resolve(__dirname, '../public/index.html'));
    });
  }
}];
