'use strict';

module.exports = function home (request, reply, decoded) {
  reply.view('label-sync', { name: decoded.name });
};
