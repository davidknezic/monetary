(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return factory();
    });
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    factory();
  }

}(this, function () {
  "use strict";

  var oldGlobalMonetary = monetary;

  // @include utils.js
  // @include parse.js
  // @include format.js
  // @include currency.js
  // @include monetary.js
  // @include monetary.fn.js

  monetary.noConflict = function () {
    var thisMonetary = monetary;
    monetary = oldGlobalMonetary;

    return thisMonetary;
  };

  return monetary;
}));
