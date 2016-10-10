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
    path: labelsPath(repoData.sourceOwner, repoData.sourceRepo)
  }, function (err, labels) {
    hoek.assert(!err, err);
    if (labels.message) {
      return reply.view('sync-fail', { error: 'Repo not found' })
        .state('last', repoData)
      ;
    }

    return labels.forEach(function (label) {
      gh({
        method: 'POST',
        path: labelsPath(repoData.targetOwner, repoData.targetRepo),
        body: { name: label.name, color: label.color }
      }, function (error) {
        hoek.assert(!error, error);
        labelsSet += 1;
        if (labelsSet === labels.length) {
          reply.view('sync-success', {
            targetOwner: repoData.targetOwner,
            targetRepo: repoData.targetRepo
          }).state('last', repoData);
        }
      });
    });
  });
};
