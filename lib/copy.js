'use strict';

var hoek = require('hoek');

var ghReq = require('gh_request.js');

function labelsPath (owner, repo) {
  return '/repos/' + owner + '/' + repo + '/labels';
}

module.exports = function copy (request, reply, decoded) {
  var githubData = request.payload;
  var sourceRepo = githubData.sourceRepo;
  var targetRepo = githubData.targetRepo;
  var userAgent = decoded.agent;
  var githubToken = decoded.tokens.access_token;
  var gh = ghReq(githubToken, userAgent);
  var labelsSet = 0;

  gh({ method: 'GET', path: labelsPath(sourceRepo) }, function (err, labels) {
    hoek.assert(!err, err);
    labels.forEach(function (label) {
      ghReq({
        method: 'POST',
        path: labelsPath(targetRepo),
        body: { name: label.name, color: label.color }
      }, function (error) {
        hoek.assert(!error, error);
        labelsSet += 1;
        if (labelsSet === labels.length) {
          reply();
        }
      });
    });
  });
};
