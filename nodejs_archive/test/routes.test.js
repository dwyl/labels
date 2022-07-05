'use strict';

var test = require('tape');
var JWT = require('jsonwebtoken');
var nock = require('nock');

var mustContain = require('./must_contain.js');
var findSetCookies = require('./find_set_cookies.js');
var fakeReply = require('./fake_reply.js');

var server = require('../lib/');
var home = require('../lib/home.js');

var testSessionToken = JWT.sign({
  name: 'testy mctestyface',
  image: 'test',
  agent: 'testAgent',
  token: 'testToken'
}, process.env.JWT_SECRET);

var testFormData = {
  sourceOwner: 'source',
  sourceRepo: 'repo',
  targetOwner: 'target',
  targetRepo: 'repo'
};

test('/ : not logged in : no session', function (t) {
  server.inject(
    { method: 'GET', url: '/', headers: { cookie: 'token=gibberish' } },
    function (response) {
      t.equal(response.statusCode, 302, 'redirect to home with session');
      t.equal(response.headers.location, './login', 'redirects to home');
      t.end();
    }
  );
});

test('/ : not logged in : weird session', function (t) {
  server.inject({ method: 'GET', url: '/' }, function (response) {
    t.equal(response.statusCode, 302, 'redirect to home with session');
    t.equal(response.headers.location, './login', 'redirects to home');
    t.end();
  });
});

test('/login : not logged in', function (t) {
  server.inject({ method: 'GET', url: '/login' }, function (response) {
    t.equal(response.statusCode, 200, 'make it to login');
    t.end();
  });
});


test('/login : logged in', function (t) {
  server.inject(
    {
      method: 'GET',
      url: '/login',
      headers: { cookie: 'token=' + testSessionToken }
    },
    function (response) {
      t.equal(response.statusCode, 302, 'redirect to home with session');
      t.equal(response.headers.location, './', 'redirects to home');
      t.end();
    }
  );
});

test('/ : logged in : no previous use', function (t) {
  process.env.SOURCE_REPO = 'TEST_SOURCE_REPO';
  process.env.SOURCE_OWNER = 'TEST_SOURCE_OWNER';

  server.inject(
    {
      method: 'GET',
      url: '/',
      headers: { cookie: 'token=' + testSessionToken }
    },
    function (response) {
      t.equal(response.statusCode, 200, 'make it to home ok!');
      t.ok(mustContain(response, [
        'value=TEST_SOURCE_REPO\n/>',
        'value=TEST_SOURCE_OWNER\n/>',
        'name="targetOwner"\nplaceholder="RepositoryOwner"\n/>',
        'name="targetRepo"\nplaceholder="RepositoryName"\n/>'
      ]), 'process defaults given used but no values given for other fields');

      t.end();
    }
  );
});

// not testing the handler directly as having trouble setting mutliple cookies
test('home handler : with last cookie', function (t) {
  var reply = fakeReply();

  home({ state: { last: testFormData } }, reply);

  t.deepEqual(
    reply.getCalls(),
    [{ method: 'view', args: ['label-sync', testFormData] }],
    'correct view and args given'
  );

  t.end();
});

test('/ : post : logged in: invalid source repo', function (t) {
  nock('https://api.github.com')
    .matchHeader('User-Agent', 'testAgent')
    .matchHeader('Authorization', 'token testToken')
    .matchHeader('Accept', 'application/vnd.github.v3+json')
    .get('/repos/invalid/repo/labels')
    .reply(200, { message: 'Not found' })
  ;
  server.inject(
    {
      method: 'POST',
      url: '/',
      headers: { cookie: 'token=' + testSessionToken },
      payload: {
        sourceOwner: 'invalid',
        sourceRepo: 'repo'
      }
    },
    function (response) {
      t.equal(response.statusCode, 200, 'correct headers given to gh');
      t.ok(mustContain(response, [
        'reponotfound'
      ]), 'invalid source repo gives error page');
      t.equal(findSetCookies(response)[0].name, 'last', 'last cookie set');

      t.end();
    }
  );
});

test('/ : post : logged in: valid source repo with 2 labels', function (t) {
  nock('https://api.github.com')
    .get('/repos/source/repo/labels')
    .reply(200, [
      { name: 'label1', color: '#234243', something: 'else' },
      { name: 'label2', color: '#123456', something: 'else' }
    ])
    .post('/repos/target/repo/labels', function (body) {
      return body.name && body.color && Object.keys(body).length === 2;
    })
    .times(2)
    .reply(200, { all: 'cool', whatever: 'i am', for: 'now!' })
  ;
  server.inject(
    {
      method: 'POST',
      url: '/',
      headers: { cookie: 'token=' + testSessionToken },
      payload: testFormData
    },
    function (response) {
      t.equal(response.statusCode, 200, 'correct headers given to gh post');
      t.ok(mustContain(response, [
        'SyncSuccessful!',
        'https://github.com/target/repo/labels'
      ]), 'sync successful message, link to target repo given');
      t.equal(findSetCookies(response)[0].name, 'last', 'last cookie set');

      t.end();
    }
  );
});

test('/ : post : logged in: Invalid Permissions', function (t) {
  nock('https://api.github.com')
    .get('/repos/source/repo/labels')
    .reply(200, [
      { name: 'label1', color: '#234243', something: 'else' },
      { name: 'label2', color: '#123456', something: 'else' }
    ])
    .post('/repos/target/repo/labels', function (body) {
      return body.name && body.color && Object.keys(body).length === 2;
    })
    .times(2)
    .reply(200, { message: 'Not Found' })
  ;
  server.inject(
    {
      method: 'POST',
      url: '/',
      headers: { cookie: 'token=' + testSessionToken },
      payload: testFormData
    },
    function (response) {
      t.equal(response.statusCode, 200, 'correct headers given to gh post');
      t.ok(mustContain(response, [
        'SyncFail'
      ]), 'sync fail message');
      t.equal(findSetCookies(response)[0].name, 'last', 'last cookie set');

      t.end();
    }
  );
});

test('/ : post : logged in: validation failed', function (t) {
  nock('https://api.github.com')
    .get('/repos/source/repo/labels')
    .reply(200, [
      { name: 'label1', color: '#234243', something: 'else' },
      { name: 'label2', color: '#123456', something: 'else' }
    ])
    .post('/repos/target/repo/labels', function (body) {
      return body.name && body.color && Object.keys(body).length === 2;
    })
    .times(2)
    .reply(200, { message: 'Validation Failed' })
  ;
  server.inject(
    {
      method: 'POST',
      url: '/',
      headers: { cookie: 'token=' + testSessionToken },
      payload: testFormData
    },
    function (response) {
      t.equal(response.statusCode, 200, 'correct headers given to gh post');
      t.ok(mustContain(response, [
        'SyncFail'
      ]), 'sync fail message');
      t.equal(findSetCookies(response)[0].name, 'last', 'last cookie set');

      t.end();
    }
  );
});


test('/logout', function (t) {
  server.inject(
    {
      method: 'GET',
      url: '/logout',
      headers: { cookie: 'token=' + testSessionToken }
    },
    function (response) {
      t.equal(response.statusCode, 302, 'redirect');
      t.deepEqual(findSetCookies(response), [
        { name: 'token', value: '' },
        { name: 'last', value: '' }
      ], 'cookies unset');
      t.equal(response.headers.location, '/', 'redirects home');

      t.end();
    }
  );
});

test('stop server', function (t) {
  server.stop(t.end);
});
