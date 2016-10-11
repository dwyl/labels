'use strict';

var test = require('tape');
var JWT = require('jsonwebtoken');

var fakeReply = require('./fake_reply.js');

var handler = require('../lib/github_oauth_handler.js');

require('env2')('.env');

test('github_oauth_handler : no profile', function (t) {
  var reply = fakeReply();

  handler(null, reply);

  t.deepEqual(
    reply.getCalls(),
    [{ method: 'redirect', args: ['/login'] }],
    'get redirected to login if no profile given back'
  );

  t.end();
});

test('github_oauth_handler : profile', function (t) {
  var reply = fakeReply();

  handler(
    { headers: { 'user-agent': 'testAgent' } },
    reply,
    { access_token: 'testToken' }, // eslint-disable-line
    { name: 'Mr. T', avatar_url: 'picTure' } // eslint-disable-line
  );

  t.deepEqual(
    reply.getCalls()[0],
    {
      method: 'view',
      args: ['login-success', { name: 'Mr. T', image: 'picTure' }]
    },
    'get redirected to login if no profile given back'
  );

  JWT.verify(
    reply.getCalls()[1].args[1],
    process.env.JWT_SECRET,
    function (_, session) {
      session.iat = 'stubbed';
      t.deepEqual(
        session,
        {
          name: 'Mr. T',
          image: 'picTure',
          agent: 'testAgent',
          token: 'testToken',
          iat: 'stubbed'
        },
        'session signed ok'
      );

      t.end();
    }
  );
});
