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

const specsValidations = [
  createIntChain("specs['weight-kg']"),
  createIntChain("specs['length-mm']"),
  createIntChain("specs['width-mm']"),
  createIntChain("specs['height-mm']"),
  createIntChain("specs['fuel-capacity-l']"),
  createIntChain("specs['cargo-space-l']"),
  createIntChain("specs['warranty-years']"),
  createIntChain("specs['maintenance-interval-km']"),
];

async function carsGet(req, res) {
  const cars = await carDB.getAllCars();

  res.status(200).render("cars.ejs", { title: "Cars", cars });
}

const carGet = [
  param("id").isInt({ min: 0 }),
  async function carGet(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("car.ejs", { title: "Cars", errors: errors.array() });
    }

    const { id } = req.params;

    const car = await carDB.getCarById(id);
    const specs = await specsDB.getCarSpecsByCarId(id);

    res.status(200).render("car.ejs", { title: car.name, car, specs });
  },
];

async function carNewGet(req, res) {
  const categories = await categoryDB.getAllCategories();
  const brands = await brandDB.getAllBrands();

  res.status(200).render("cars_new.ejs", {
    title: "New car",
    brands,
    categories,
    errors: res.locals.errors,
    car: res.locals.car,
    specs: res.locals.specs,
  });
}

const carNewPost = [
  carValidations,
  specsValidations,
  async function carNewPost(req, res) {
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

    const bodySpecs = req.body["specs"];
    const newCarSpecs = {
      weight_kg: bodySpecs["weight-kg"],
      length_mm: bodySpecs["length-mm"],
      width_mm: bodySpecs["width-mm"],
      height_mm: bodySpecs["height-mm"],
      fuel_capacity_l: bodySpecs["fuel-capacity-l"],
      cargo_space_l: bodySpecs["cargo-space-l"],
      warranty_years: bodySpecs["warranty-years"],
      maintenance_interval_km: bodySpecs["maintenance-interval-km"],
      features: JSON.stringify(bodySpecs["features"]),
    };

    console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.locals.car = newCar;
      res.locals.specs = newCarSpecs;
      res.locals.errors = errors.array();
      return carNewGet(req, res);
    }

    const newId = await carDB.createCar(newCar);
    await specsDB.createCarSpecs({ car_id: newId, ...newCarSpecs });

    res.redirect(`/cars/view/${newId}`);
  },
];

module.exports = {
  carsGet,
  carGet,
  carNewGet,
  carNewPost,
};
