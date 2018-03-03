'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeOut = 0;

  var setDebounce = function (fun) {
    if (lastTimeOut) {
      window.clearTimeout(lastTimeOut);
    }
    lastTimeOut = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  window.debounce = {setdebounce: setDebounce};

})();
