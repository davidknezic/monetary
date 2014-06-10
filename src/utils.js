/**
 * Extend first argument by properties of the second one.
 * @param {object} a - Object to extend.
 * @param {object} b - Object which is extended from.
 * @returns {object}
 */
function extend(a, b) {
  for (var i in b) {
    if (b.hasOwnProperty(i)) {
      a[i] = b[i];
    }
  }

  if (b.hasOwnProperty("toString")) {
    a.toString = b.toString;
  }

  if (b.hasOwnProperty("valueOf")) {
    a.valueOf = b.valueOf;
  }

  return a;
}

/**
 * Check if the provided value is an array.
 * @param {object} input - Object to check.
 * @returns {boolean}
 */
function isArray(input) {
  return Object.prototype.toString.call(input) === '[object Array]';
}
