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
    var url;
    var token = request.state.token;

    JWT.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        url = hapiAuth.login_url();

        return reply.view('login', { url: url });
        // return reply(githubLogin());
      }

      return reply.view('label-sync');
    });
  }
},
{
  method: 'POST',
  path: '/',
  handler: function (request, reply) {
    var userAgent, githubToken, labels;
    var token = request.state.token;
    var githubData = request.payload;
    var sourceRepo = {
      sourceRepoName: githubData.sourceRepoName,
      sourceRepoOwner: githubData.sourceRepoOwner
    };
    var targetRepo = {
      targetRepoName: githubData.targetRepoName,
      targetRepoOwner: githubData.targetRepoOwner
    };
    var sourceRepoOwner = githubData.sourceRepoOwner;
    var targetRepoName = githubData.targetRepoName;
    var targetRepoOwner = githubData.targetRepoOwner;
    JWT.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      userAgent = decoded.agent;
      githubToken = decoded.tokens.access_token;
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
