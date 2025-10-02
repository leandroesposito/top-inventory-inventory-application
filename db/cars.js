const { runQuery, runGetQuery } = require("./queries");

async function createCar(carData) {
  const {
    category_id,
    brand_id,
    name,
    model_year,
    price,
    horsepower,
    torque,
    top_speed,
    acceleration_0_60,
    transmission,
    drivetrain,
    fuel_type,
    engine_size,
    seats,
    color,
    in_stock = true,
    stock_quantity = 0,
  } = carData;
  const query = `
    INSERT INTO cars (
      category_id, brand_id, name, model_year, price, horsepower, torque,
      top_speed, acceleration_0_60, transmission, drivetrain, fuel_type,
      engine_size, seats, color, in_stock, stock_quantity)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
      $16, $17) RETURNING id;`;
  const params = [
    category_id,
    brand_id,
    name,
    model_year,
    price,
    horsepower,
    torque,
    top_speed,
    acceleration_0_60,
    transmission,
    drivetrain,
    fuel_type,
    engine_size,
    seats,
    color,
    in_stock,
    stock_quantity,
  ];

  const { rows } = await runQuery(query, params);
  return rows[0].id;
}

async function getAllCars() {
  const query = `SELECT * FROM cars ORDER BY id;`;

  return await runGetQuery(query);
}

async function getCarById(id) {
  const query = "SELECT * FROM cars WHERE id = $1;";
  const params = [id];

  const cars = await runGetQuery(query, params);

  return cars[0];
}

async function getCarWithSpecsByCarId(id) {
  const query = `
    SELECT
      jsonb_build_object(
        'car', cars,
        'specs', specs
      ) AS details
    FROM
      cars
    LEFT JOIN
      car_specifications AS specs ON cars.id = specs.car_id
    WHERE
      cars.id = $1;
  `;
  const params = [id];

  const cars = await runGetQuery(query, params);
  return cars[0];
}

async function getCarDetailsById(id) {
  const query = `
    SELECT
      jsonb_build_object(
        'car', cars,
        'specs', specs,
        'category', categories,
        'brand', brands
      ) AS details
    FROM
      cars
    LEFT JOIN
      car_specifications AS specs ON cars.id = specs.car_id
    JOIN
      categories ON cars.category_id = categories.id
    JOIN
      brands ON cars.brand_id = brands.id
    WHERE
      cars.id = $1;
  `;
  const params = [id];

  const cars = await runGetQuery(query, params);
  return cars[0];
}

async function getCarsByBrandId(brandId) {
  const query = "SELECT * FROM cars WHERE brand_id = $1";
  const params = [brandId];

  const cars = await runGetQuery(query, params);
  return cars;
}

async function getCarsByCategoryId(categoryId) {
  const query = "SELECT * FROM cars WHERE category_id = $1";
  const params = [categoryId];

  const cars = await runGetQuery(query, params);
  return cars;
}

async function updateCar(id, carData) {
  const {
    category_id,
    brand_id,
    name,
    model_year,
    price,
    horsepower,
    torque,
    top_speed,
    acceleration_0_60,
    transmission,
    drivetrain,
    fuel_type,
    engine_size,
    seats,
    color,
    in_stock,
    stock_quantity,
  } = carData;
  const query = `
    UPDATE cars SET category_id = $1, brand_id = $2, name = $3, model_year = $4,
      price = $5, horsepower = $6, torque = $7, top_speed = $8,
      acceleration_0_60 = $9, transmission = $10, drivetrain = $11,
      fuel_type = $12, engine_size = $13, seats = $14, color = $15,
      in_stock = $16, stock_quantity = $17
    WHERE id = $18;`;
  const params = [
    category_id,
    brand_id,
    name,
    model_year,
    price,
    horsepower,
    torque,
    top_speed,
    acceleration_0_60,
    transmission,
    drivetrain,
    fuel_type,
    engine_size,
    seats,
    color,
    in_stock,
    stock_quantity,
    id,
  ];

  await runQuery(query, params);
}

async function deleteCar(id) {
  const query = "DELETE FROM cars WHERE id = $1;";
  const params = [id];

  await runQuery(query, params);
}

module.exports = {
  createCar,
  getAllCars,
  getCarById,
  getCarByBrandId,
  updateCar,
  deleteCar,
};
