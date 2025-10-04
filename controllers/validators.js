const { body } = require("express-validator");

const ERRORS = {
  INT: "must be integer",
  LENGTH: (maxLength) =>
    `must be at least 1 character and at most ${maxLength} characters`,
  MAX: (max) => `must be over or equal to 0 and less than ${max}`,
  DECIMAL: (digits) => `must have ${digits} digits or none`,
};

function toCapitalized(string) {
  return `${string.slice(0, 1).toUpperCase()}${string.slice(1).toLowerCase()}`;
}

function createIntChain(field, max = Number.MAX_SAFE_INTEGER) {
  const casedField = toCapitalized(field);
  return body(field)
    .isInt()
    .withMessage(`${casedField} ${ERRORS.INT}`)
    .isInt({ min: 0, max: max })
    .withMessage(`${casedField} ${ERRORS.MAX(max)}`);
}

function createTextChain(field, maxLength = Number.MAX_SAFE_INTEGER) {
  const casedField = toCapitalized(field);
  return body(field)
    .trim()
    .isLength({ min: 1, max: maxLength })
    .withMessage(`${casedField} ${ERRORS.LENGTH(maxLength)}`);
}

function createDecimalChain(field, max, digits) {
  const casedField = toCapitalized(field);
  return body(field)
    .isFloat({ lt: max })
    .withMessage(`${casedField} ${ERRORS.MAX(max)}`)
    .isDecimal({ force_decimal: false, decimal_digits: digits })
    .withMessage(`${casedField} ${ERRORS.DECIMAL(digits)}`);
}

module.exports = {
  createIntChain,
  createDecimalChain,
  createTextChain,
};
