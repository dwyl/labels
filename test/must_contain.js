'use strict';

module.exports = function mustContain (response, texts) {
  var squashedRes = response.result
    .replace(/ /g, '')
  ;

  return texts.reduce(function (success, text) {
    return success && squashedRes.indexOf(text) > -1;
  }, true);
};
