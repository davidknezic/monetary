(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['monetary'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('monetary'));
  } else {
    factory(root.monetary);
  }
}(this, function (monetary) {
  return monetary.locale('en', {
    separators: {
      decimal: '.',
      grouping: ','
    },
    currencies: {
      'BTC': 'Bitcoin',
      'CHF': 'Swiss franc',
      'HRK': 'Croatian kuna',
      'USD': 'United States dollar'
    }
  });
}));
