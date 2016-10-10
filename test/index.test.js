'use strict';

var test = require('tape');
var JWT = require('jsonwebtoken');

var server = require('../lib/');


// var inspect = function (r) { require('repl').start('>>>>').context.r = r; };

var testSessionToken = JWT.sign({
  name: 'testy mctestyface',
  image: 'test',
  agent: 'test',
  token: 'lalalala'
}, process.env.JWT_SECRET);

function mustContain (response, texts) {
  var squashedRes = response.result
    .replace(/ /g, '')
  ;

  return texts.reduce(function (success, text) {
    return success && squashedRes.indexOf(text) > -1;
  }, true);
}

test('home not logged in : no session', function (t) {
  server.inject(
    { method: 'GET', url: '/', headers: { cookie: 'token=gibberish' } },
    function (response) {
      t.equal(response.statusCode, 302, 'redirect to home with session');
      t.equal(response.headers.location, './login', 'redirects to home');
      t.end();
    }
  );
});

test('home : not logged in : weird session', function (t) {
  server.inject({ method: 'GET', url: '/' }, function (response) {
    t.equal(response.statusCode, 302, 'redirect to home with session');
    t.equal(response.headers.location, './login', 'redirects to home');
    t.end();
  });
});

test('login : not logged in', function (t) {
  server.inject({ method: 'GET', url: '/login' }, function (response) {
    t.equal(response.statusCode, 200, 'make it to login');
    t.end();
  });
});


test('login : logged in', function (t) {
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

test('home : logged in : no previous use', function (t) {
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


test('logout', function (t) {
  server.inject(
    {
      method: 'GET',
      url: '/logout',
      headers: { cookie: 'token=' + testSessionToken }
    },
    function (response) {
      t.equal(response.statusCode, 302, 'redirect');
      t.deepEqual(response.headers['set-cookie']
        .map(function (cookies) {
          return cookies.split('=;')[0];
        }), ['token', 'last'], 'cookies unset'
      );
      t.equal(response.headers.location, '/', 'redirects home');

      t.end();
    }
  );
});

test('stop server', function (t) {
  server.stop(t.end);
});
