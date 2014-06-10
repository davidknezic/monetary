/**
 * Rounding algorithm which rounds to 0.05 Swiss Francs.
 *
 * @param {number} amount - Amount to round.
 * @returns {number} Rounded amount.
 */
function rounding(amount) {
  return 0.05;
};

monetary.currency('CHF', {
  symbol: 'Fr.',
  precision: 2,
  rounding: rounding,
  base: 1
});
