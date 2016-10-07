'use strict';

var https = require('https');

function getLabels (githubToken, userAgent, sourceRepo, callback) {
  var request;
  var owner = sourceRepo.split(':')[0];
  var repo = sourceRepo.split(':')[1];
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

function setLabel (githubToken, userAgent, targetRepo, labelAttributes, callback) {
  var request, labelNameAndColour, requestBody;
  var owner = targetRepo.split(':')[0];
  var repo = targetRepo.split(':')[1];
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
      console.log('label added');
      callback(null, string);
    });
  });
  labelNameAndColour = {
    name: labelAttributes.name,
    color: labelAttributes.colour
  };
  requestBody = JSON.stringify(labelNameAndColour);
  request.write(requestBody);
  request.end();
}

function setLabels (githubToken, userAgent, labels, targetRepo, callback) {
  labels.forEach(function (label) {
    var labelAttributes = {
      colour: label.color,
      name: label.name
    };

    setLabel(githubToken, userAgent, targetRepo, labelAttributes, callback);
  });
}

module.exports = {
  getLabels: getLabels,
  setLabels: setLabels
};
