'use strict';

var repl = require('repl');

module.exports = function insepct (r) {
  repl.start('>>>>').context.r = r;
};
