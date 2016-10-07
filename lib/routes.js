'use strict';

var hapiAuth = require('hapi-auth-github');
var JWT = require('jsonwebtoken');
var path = require('path');
var hoek = require('hoek');
var getLabels = require('./request.js').getLabels;
var setLabels = require('./request.js').setLabels;

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
  handler: function (request, reply) {
    var token = request.state.token;

    JWT.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return reply(githubLogin());
      }

      return reply.file(path.resolve(__dirname, '../public/index.html'));
    });
  }
},
{
  method: 'POST',
  path: '/copy',
  handler: function (request, reply) {
    var userAgent, githubToken, labels;
    var token = request.state.token;
    var githubData = request.payload;
    var sourceRepo = githubData.sourceRepo;
    var targetRepo = githubData.targetRepo;

    console.log('GITHUB DATA', githubData);
    JWT.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      userAgent = decoded.agent;
      githubToken = decoded.tokens.access_token;
      console.log('GITHUB TOKEN', decoded.tokens);
      hoek.assert(!err, err);
      getLabels(githubToken, userAgent, sourceRepo, function (error, data) {
        hoek.assert(!error, error);
        labels = JSON.parse(data);
        console.log(labels);
        setLabels(githubToken, userAgent, labels, targetRepo, function (er, dat) {
          hoek.assert(!er, er);
          console.log(dat);
        });
      });
    });
  }
}];
