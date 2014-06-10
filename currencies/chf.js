(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['monetary'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('monetary'));
  } else {
    factory(root.monetary);
  }
}(this, function (monetary) {
  function rounding(amount) {
    return 0.05;
  };

  return monetary.currency('CHF', {
    symbol: 'Fr.',
    precision: 2,
    rounding: rounding,
    base: 1
  });
}));
