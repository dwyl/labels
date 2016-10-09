'use strict';

module.exports = function logOut (request, reply) {
  reply.redirect('/').unstate('token');
};
