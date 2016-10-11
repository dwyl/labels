'use strict';

module.exports = function findSetCookies (response) {
  return response.headers['set-cookie']
    .map(function (fullCookie) {
      var cookie = fullCookie.split(';')[0].split('=');

      return { name: cookie[0], value: cookie[1] };
    })
  ;
};
