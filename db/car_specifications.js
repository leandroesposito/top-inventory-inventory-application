const { runQuery, runGetQuery } = require("./queries");

async function createCarSpecs(carSpecsData) {
  const {
    car_id,
    weight_kg,
    length_mm,
    width_mm,
    height_mm,
    fuel_capacity_l,
    cargo_space_l,
    warranty_years,
    maintenance_interval_km,
    features,
  } = carSpecsData;
  const query = `
    INSERT INTO car_specifications (
      car_id, weight_kg, length_mm, width_mm, height_mm, fuel_capacity_l,
      cargo_space_l, warranty_years, maintenance_interval_km, features)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
  const params = [
    car_id,
    weight_kg,
    length_mm,
    width_mm,
    height_mm,
    fuel_capacity_l,
    cargo_space_l,
    warranty_years,
    maintenance_interval_km,
    features,
  ];

  await runQuery(query, params);
}

async function getAllCarsSpecs() {
  const query = `SELECT * FROM car_specifications;`;

  return await runGetQuery(query);
}

async function getCarSpecsById(id) {
  const query = "SELECT * FROM car_specifications WHERE id = $1;";
  const params = [id];

  const carSpecs = await runGetQuery(query, params);

  return carSpecs[0];
}

async function getCarSpecsByCarId(carId) {
  const query = "SELECT * FROM car_specifications WHERE car_id = $1";
  const params = [carId];

  const carSpecs = await runGetQuery(query, params);
  return carSpecs[0];
}

async function updateCarSpecs(id, carSpecsData) {
  const {
    weight_kg,
    length_mm,
    width_mm,
    height_mm,
    fuel_capacity_l,
    cargo_space_l,
    warranty_years,
    maintenance_interval_km,
    features,
  } = carSpecsData;
  const query = `
    UPDATE car_specifications SET
      weight_kg = $1, length_mm = $2, width_mm = $3, height_mm = $4,
      fuel_capacity_l = $5, cargo_space_l = $6, warranty_years = $7,
      maintenance_interval_km = $8, features = $9
    WHERE id = $10;`;
  const params = [
    weight_kg,
    length_mm,
    width_mm,
    height_mm,
    fuel_capacity_l,
    cargo_space_l,
    warranty_years,
    maintenance_interval_km,
    features,
    id,
  ];

  await runQuery(query, params);
}

async function deleteCarSpecs(id) {
  const query = "DELETE FROM car_specifications WHERE id = $1;";
  const params = [id];

  await runQuery(query, params);
}

module.exports = {
  createCarSpecs,
  getAllCarsSpecs,
  getCarSpecsById,
  getCarSpecsByCarId,
  updateCarSpecs,
  deleteCarSpecs,
};
