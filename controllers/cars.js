const { validationResult } = require("express-validator");
const specsDB = require("../db/car_specifications");
const carDB = require("../db/cars");
const categoryDB = require("../db/categories");
const brandDB = require("../db/brands");
const {
  createIntChain,
  createTextChain,
  createDecimalChain,
} = require("./validators");

const carValidations = [
  createIntChain("category-id"),
  createIntChain("brand-id"),
  createTextChain("name", 100),
  createIntChain("model-year"),
  createDecimalChain("price", 1e10, 2),
  createIntChain("horsepower"),
  createIntChain("torque"),
  createIntChain("top-speed"),
  createDecimalChain("acceleration-0-60", 1e4, 2),
  createTextChain("transmission", 50),
  createTextChain("drivetrain", 50),
  createTextChain("fuel-type", 50),
  createTextChain("engine-size", 50),
  createIntChain("seats"),
  createTextChain("color", 50),
];

async function carsGet(req, res) {
  const cars = await carDB.getAllCars();

  res.status(200).render("cars.ejs", { title: "Cars", cars });
}

const carGet = [
  createIntChain("id"),
  async function carGet(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("cars.ejs", { title: "Cars", errors: errors.array() });
    }

    const { id } = req.params;

    const car = await carDB.getCarById(id);
    const specs = await carDB.getCarSpecsByCarId(id);

    res.status(200).render("car.ejs", { title: car.name, car, specs });
  },
];

async function carNewGet(req, res) {
  const categories = await categoryDB.getAllCategories();
  const brands = await brandDB.getAllBrands();

  res
    .status(200)
    .render("cars_new.ejs", { title: "New car", brands, categories });
}

const carNewPost = [
  carValidations,
  async function carNewPost(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("cars_new.ejs", { title: "New car", errors: errors.array() });
    }

    const newCar = {
      category_id: req.body["category-id"],
      brand_id: req.body["brand-id"],
      name: req.body["name"],
      model_year: req.body["model-year"],
      price: req.body["price"],
      horsepower: req.body["horsepower"],
      torque: req.body["torque"],
      top_speed: req.body["top-speed"],
      acceleration_0_60: req.body["acceleration-0-60"],
      transmission: req.body["transmission"],
      drivetrain: req.body["drivetrain"],
      fuel_type: req.body["fuel-type"],
      engine_size: req.body["engine-size"],
      seats: req.body["seats"],
      color: req.body["color"],
      in_stock: req.body["in-stock"],
      stock_quantity: req.body["stock-quantity"],
    };

    const newId = await carDB.createCar(newCar);

    res.redirect(`/cars/view/${newId}`);
  },
];

module.exports = {
  carsGet,
  carGet,
  carNewGet,
  carNewPost,
};
