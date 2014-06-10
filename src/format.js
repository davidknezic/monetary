/**
 * Format monetary to standard format with ISO 4217 code.
 */
function format(m) {
  if (m.isInvalid()) {
    return "Invalid monetary!";
  }

  return m.currency() + " " + m.amount().toFixed(2);
}
