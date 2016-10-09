'use strict';

module.exports = function home (request, reply) {
  reply.redirect('/').unstate('token');
};
