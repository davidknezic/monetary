(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['monetary'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('monetary'));
  } else {
    factory(root.monetary);
  }
}(this, function (monetary) {
  function roundTo5rappen(amount) {
    return Math.round(amount * 20) / 20;;
  };

  return monetary.currency('CHF', {
    symbol: 'Fr.',
    precision: 2,
    rounding: {
      default: roundTo5rappen
    }
  });
}));
