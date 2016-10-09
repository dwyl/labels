'use strict';

var https = require('https');

function makeRequest (method, githubToken, userAgent, repo, label, callback) {
  var request, requestBody, labelNameAndColour;
  var owner = repo.split('/')[0];
  var repoName = repo.split('/')[1];
  var options = {
    host: 'api.github.com',
    path: '/repos/' + owner + '/' + repoName + '/labels',
    method: method,
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
  if (method === 'POST') {
    labelNameAndColour = {
      name: label.name,
      color: label.color
    };
    requestBody = JSON.stringify(labelNameAndColour);
    request.write(requestBody);
  }
  request.end();
}

module.exports = makeRequest;


// function getLabels (githubToken, userAgent, sourceRepo, callback) {
//   var request;
//   var owner = sourceRepo.split(':')[0];
//   var repo = sourceRepo.split(':')[1];
//   var options = {
//     host: 'api.github.com',
//     path: '/repos/' + owner + '/' + repo + '/labels',
//     method: 'GET',
//     headers: {
//       'User-Agent': userAgent,
//       'Authorization': 'token ' + githubToken,
//       'Accept': 'application/vnd.github.v3+json'
//     }
//   };
//
//   request = https.request(options, function (response) {
//     var str = '';
//
//     response.on('data', function (chunk) {
//       str += chunk;
//     });
//     response.on('end', function () {
//       callback(null, str);
//     });
//   });
//
//   request.end();
// }
//
// function setLabel (githubToken, userAgent, targetRepo, label, callback) {
//   var request, labelNameAndColour, requestBody;
//   var owner = targetRepo.split(':')[0];
//   var repo = targetRepo.split(':')[1];
//   var options = {
//     host: 'api.github.com',
//     path: '/repos/' + owner + '/' + repo + '/labels',
//     method: 'POST',
//     headers: {
//       'User-Agent': userAgent,
//       'Authorization': 'token ' + githubToken,
//       'Accept': 'application/vnd.github.v3+json'
//     }
//   };
//
//   request = https.request(options, function (res) {
//     var string = '';
//
//     res.on('data', function (chunk) {
//       string += chunk;
//     });
//     res.on('end', function () {
//       callback(null, string);
//     });
//   });
//   labelNameAndColour = {
//     name: label.name,
//     color: label.color
//   };
//   requestBody = JSON.stringify(labelNameAndColour);
//   request.write(requestBody);
//   request.end();
// }
//
// function setLabels (githubToken, userAgent, labels, targetRepo, callback) {
//   labels.forEach(function (label) {
//     setLabel(githubToken, userAgent, targetRepo, label, callback);
//   });
// }
