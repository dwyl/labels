'use strict';

module.exports = function home (request, reply, decoded) {
  var last = request.state.last;

  reply.view('label-sync', {
    name: decoded.name,
    sourceOwner: last && last.sourceOwner || process.env.SOURCE_OWNER,
    sourceRepo: last && last.sourceRepo || process.env.SOURCE_REPO,
    targetOwner: last && last.targetOwner,
    targetRepo: last && last.targetRepo
  });
};
