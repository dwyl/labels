'use strict';

var https = require('https');

module.exports = function ghReq (githubToken, userAgent) {
  return function (config, cb) {
    var options = {
      host: 'api.github.com',
      path: config.path,
      method: config.method,
      headers: {
        'User-Agent': userAgent,
        'Authorization': 'token ' + githubToken,
        'Accept': 'application/vnd.github.v3+json'
      }
    };
    var request = https.request(options, function (response) {
      var str = '';

      response.on('data', function (chunk) {
        str += chunk;
      });
      response.on('end', cb.bind(null, null, str));
    });

    request.on('error', cb);
    request.write(JSON.stringify(config.body));
    request.end();
  };
};
