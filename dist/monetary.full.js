//! monetary.js
//! version : 0.0.1
//! author : David Knezic
//! license : MIT

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    root.monetary = factory();
  }
}(this, function () {
  var monetary,
      VERSION = "0.0.1",

      globalScope = typeof global !== 'undefined' ? global : this,
      oldGlobalMonetary = globalScope.monetary,

      currencies = [],

      parseIso4217 = /^([A-Z]{3})\s([\s\.\,\'0-9]+)$/;

  //
  // # UTILS
  //

  function extend(to, from) {
    for (var i in from) {
      if (from.hasOwnProperty(i)) {
        to[i] = from[i];
      }
    }

    if (from.hasOwnProperty("toString")) {
      to.toString = from.toString;
    }

    if (from.hasOwnProperty("valueOf")) {
      to.valueOf = from.valueOf;
    }

    return to;
  }

  function isArray(input) {
    return Object.prototype.toString.call(input) === '[object Array]';
  }

  //
  // # PARSE
  //

  function parse(config) {
    var value = config._i,
        match = parseIso4217.exec(value),
        iso4217Code,
        amount;

    if (match) {
      iso4217Code = match[1];
      amount = match[2];

      // TODO: Do better parsing, which respects localization rules
      amount = parseFloat(amount);

      config._currency = iso4217Code;
      config._amount = amount;
      config._isValid = true;
    } else {
      config._isValid = false;
    }
  }

  //
  // # FORMAT
  //

  function format(m) {
    if (m.isInvalid()) {
      return "Invalid monetary!";
    }

    return m.currency() + " " + m.amount().toFixed(2);
  }

  //
  // # CURRENCY
  //

  function Currency() {
  }

  extend(Currency.prototype, {
    // TODO: Add currency methods here
  });

  //
  // # MONETARY
  //

  function Monetary(config) {
    extend(this, config);
  };

  extend(Monetary.prototype, {

    currency: function () {
      return this._currency;
    },

    amount: function () {
      return this._amount;
    },

    multiply: function (factor) {
      // TODO: Create a new monetary?
      this._amount *= factor;

      return this;
    },

    divide: function (divisor) {
      // TODO: Create a new monetary?
      this._amount /= divisor;

      return this;
    },

    add: function (addend) {
      // TODO: Create a new monetary?
      // TODO: Type checking
      // TODO: Allow another monetary as argument

      this._amount += addend;

      return this;
    },

    sub: function (minuend) {
      // TODO: Create a new monetary?
      // TODO: Type checking
      // TODO: Allow another monetary as argument

      this._amount -= minuend;

      return this;
    },

    inverseRate: function (secondCurrency) {
      // TODO: Implement

      // 1. find the second currency
      // 2. get base amount of second currency
      // 3. divide base amount by this amount
      // 4. create new monetary with second currency and divided amount
      // 5. return new monetary

      // Temporary! This doesn't make sense.
      return this;
    },

    convert: function (rate) {
      // Temporary! This doesn't make sense.
      return new Monetary({
        _amount: 1000.40,
        _currency: rate.currency()
      });
    },

    isNegative: function () {
      return this._amount < 0;
    },

    isZero: function () {
      return this._amount == 0;
    },

    isValid: function () {
      return this._isValid;
    },

    isInvalid: function () {
      return !this._isValid;
    },

    format: function () {
      return format(this);
    },

    // TODO: Implement
    locale: function () {
      throw new Error('Not implemented yet!');
    }
  });

  //
  // # HIGH LEVEL FUNCTION
  //

  function monetary(input, locale) {
    var config;

    config = {};
    config._isAMonetaryObject = true;
    config._i = input;

    // TODO: Use global locale if empty
    config._l = locale;

    // Parse monetary from input
    parse(config);

    return new Monetary(config);
  };

  monetary.isMonetary = function (obj) {
    return obj instanceof Monetary ||
        (obj != null && obj.hasOwnProperty('_isAMonetaryObject'));
  };

  monetary.invalid = function () {
    return monetary('i gonna invalidate ya');
  };

  monetary.currency = function (key, values) {
    if (values === undefined) {
      // retrieve
      return currencies[key];
    }

    if (values === null) {
      // remove
      return delete currencies[key];
    }

    return currencies[key] = new Currency(values);
  };

  monetary.locale = function (key, values) {
  };

  monetary.version = VERSION;

  monetary.noConflict = function () {
    globalScope.monetary = oldGlobalMonetary;
    return monetary;
  };

(function (root, factory) {
    factory(monetary);
}(this, function (monetary) {
  return monetary.currency('BTC', {
    symbol: '฿',
    precision: 8
  });
}));

(function (root, factory) {
    factory(monetary);
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

(function (root, factory) {
    factory(monetary);
}(this, function (monetary) {
  return monetary.currency('HRK', {
    symbol: 'HRK',
    precision: 2
  });
}));

(function (root, factory) {
    factory(monetary);
}(this, function (monetary) {
  return monetary.currency('USD', {
    symbol: '$',
    precision: 2
  });
}));


(function (root, factory) {
    factory(monetary);
}(this, function (monetary) {
  return monetary.locale('de-ch', {
    separators: {
      decimal: '.',
      grouping: '\''
    },
    currencies: {
      'BTC': 'Bitcoin',
      'CHF': 'Schweizer Franken',
      'HRK': 'Kroatischer Kuna',
      'USD': 'US-Dollar'
    }
  });
}));

(function (root, factory) {
    factory(monetary);
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

(function (root, factory) {
    factory(monetary);
}(this, function (monetary) {
  return monetary.locale('fr-ch', {
    separators: {
      decimal: '.',
      grouping: '\''
    },
    currencies: {
      'BTC': 'Bitcoin',
      'CHF': 'Franc suisse',
      'HRK': 'Kuna croate',
      'USD': 'Dollar américain'
    }
  });
}));


    monetary.locale('en');


  return monetary;
}));
