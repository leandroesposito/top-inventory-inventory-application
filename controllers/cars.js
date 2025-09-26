const { body, validationResults } = require("express-validator");
const {
  getCarSpecsById,
  getCarSpecsByCarId,
} = require("../db/car_specifications");
const { getAllCars, getCarById } = require("../db/cars");

const ERRORS = {
  INT: "must be integer",
  LENGTH: (maxLength) =>
    `must be at least 1 character and at most ${maxLength} characters`,
  MAX: (max) => `must ve less tha ${max}`,
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

function createTextChain(field, maxLength) {
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

const carValidations = [
  createIntChain("category_id"),
  createIntChain("brand_id"),
  createTextChain("name", 100),
  createIntChain("model_year"),
  createDecimalChain("price", 1e10, 2),
  createIntChain("horsepower"),
  createIntChain("torque"),
  createIntChain("top_speed"),
  createDecimalChain("acceleration_0_60", 1e4, 2),
  createTextChain("transmission", 50),
  createTextChain("drivetrain", 50),
  createTextChain("fuel_type", 50),
  createTextChain("engine_size", 50),
  createIntChain("seats"),
  createTextChain("color", 50),
];

async function carsGet(req, res) {
  const cars = await getAllCars();

  res.status(200).render("cars", { title: "cars", cars });
}

async function carGet(req, res) {
  const { id } = req.params;

  const car = await getCarById(id);
  const specs = await getCarSpecsByCarId(id);

  res.status(200).render("car", { title: car.name, car, specs });
}

async function carPost(req, res) {
  throw error(;);
}
