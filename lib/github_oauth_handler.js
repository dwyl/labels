'use strict';

var JWT = require('jsonwebtoken'); // session stored as a JWT cookie

module.exports = function oauthHandler (req, reply, tokens, profile) {
  var session, token;

  if (profile) {
    session = {
      fistname: profile.name,
      agent: req.headers['user-agent'],
      tokens: tokens
    };
    token = JWT.sign(session, process.env.JWT_SECRET);

    return reply('<p>Hello ' + profile.name + ', You Logged in Using GitHub!</p><a href="/">start labeling</a>')
      .state('token', token);
  }

  return reply('Sorry, something went wrong, please try again.').code(401);
};
