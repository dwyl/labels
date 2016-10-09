'use strict';

var hoek = require('hoek');

var ghReq = require('./gh_request.js');

function labelsPath (owner, repo) {
  return '/repos/' + owner + '/' + repo + '/labels';
}

module.exports = function copy (request, reply, decoded) {
  var repoData = request.payload;
  var userAgent = decoded.agent;
  var githubToken = decoded.token;
  var gh = ghReq(githubToken, userAgent);
  var labelsSet = 0;

  gh({
    method: 'GET',
    path: labelsPath(repoData.sourceRepoOwner, repoData.sourceRepoName)
  }, function (err, labels) {
    hoek.assert(!err, err);

    labels.forEach(function (label) {
      gh({
        method: 'POST',
        path: labelsPath(repoData.targetRepoOwner, repoData.targetRepoName),
        body: { name: label.name, color: label.color }
      }, function (error) {
        hoek.assert(!error, error);
        labelsSet += 1;
        if (labelsSet === labels.length) {
          reply.view('sync-success', {
            targetRepoOwner: repoData.targetRepoOwner,
            targetRepoName: repoData.targetRepoName
          });
        }
      });
    });
  });
};