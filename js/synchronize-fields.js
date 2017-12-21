'use strict';

(function () {
  window.synchronizeFields = function (source, target, mapper, callback) {
    callback(target, mapper[source.value]);
  };
})();
