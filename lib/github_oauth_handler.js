'use strict';

var JWT = require('jsonwebtoken'); // session stored as a JWT cookie

module.exports = function oauthHandler (req, reply, tokens, profile) {
  var session, token;

  if (profile) {
    session = {
      name: profile.name,
      agent: req.headers['user-agent'],
      token: tokens.access_token
    };
    token = JWT.sign(session, process.env.JWT_SECRET);

    return reply.view('label-sync')
      .state('token', token)
    ;
  }

  return reply('Sorry, something went wrong, please try again.').code(401);
};
