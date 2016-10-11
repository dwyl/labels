'use strict';

module.exports = function () {
  var results = [];
  var fakeReply = {
    getCalls: function () {
      return results;
    }
  };

  ['state', 'view', 'redirect'].forEach(function (method) {
    fakeReply[method] = function () {
      results.push({ method: method, args: [].slice.call(arguments) });

      return fakeReply;
    };
  });

  return fakeReply;
};
