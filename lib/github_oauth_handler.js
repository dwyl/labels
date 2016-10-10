'use strict';

var JWT = require('jsonwebtoken'); // session stored as a JWT cookie

module.exports = function oauthHandler (req, reply, tokens, profile) {
  var session, token, profilePic, name;

  if (profile) {
    session = {
      name: profile.name,
      image: profile.avatar_url,
      agent: req.headers['user-agent'],
      token: tokens.access_token
    };
    token = JWT.sign(session, process.env.JWT_SECRET);
    name = profile.name;
    profilePic = profile.avatar_url;

    return reply.view('login-success', { name: name, image: profilePic })
      .state('token', token)
    ;
  }

  return reply('Sorry, something went wrong, please try again.').code(401);
};
