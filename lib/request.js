'use strict';

var https = require('https');

function getLabels (githubToken, userAgent, sourceRepo, callback) {
  var request;
  var owner = sourceRepo.sourceRepoOwner;
  var repo = sourceRepo.sourceRepoName;
  var options = {
    host: 'api.github.com',
    path: '/repos/' + owner + '/' + repo + '/labels',
    method: 'GET',
    headers: {
      'User-Agent': userAgent,
      'Authorization': 'token ' + githubToken,
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  request = https.request(options, function (response) {
    var str = '';

    response.on('data', function (chunk) {
      str += chunk;
    });
    response.on('end', function () {
      callback(null, str);
    });
  });

  request.end();
}

function setLabel (githubToken, userAgent, targetRepo, label, callback) {
  var request, labelNameAndColour, requestBody;
  var owner = targetRepo.targetRepoOwner;
  var repo = targetRepo.targetRepoName;
  var options = {
    host: 'api.github.com',
    path: '/repos/' + owner + '/' + repo + '/labels',
    method: 'POST',
    headers: {
      'User-Agent': userAgent,
      'Authorization': 'token ' + githubToken,
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  request = https.request(options, function (res) {
    var string = '';

    res.on('data', function (chunk) {
      string += chunk;
    });
    res.on('end', function () {
      console.log(null, string);
    });
  });
  labelNameAndColour = {
    name: label.name,
    color: label.color
  };
  requestBody = JSON.stringify(labelNameAndColour);
  request.write(requestBody);
  request.end();
}

function setLabels (githubToken, userAgent, labels, targetRepo, callback) {
  var labelsAdded = 0;

  labels.forEach(function (label) {
    setLabel(githubToken, userAgent, targetRepo, label);
    labelsAdded++;
    if (labelsAdded === labels.length) {
      return callback(null, 'labels added');
    }
  });
}

module.exports = {
  getLabels: getLabels,
  setLabels: setLabels
};
