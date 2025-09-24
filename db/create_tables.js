const { Client } = require("pg");
const config = require("./connection_config");

const SQL_CREATE_TABLES = `
CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 100 ) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS brands (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 100 ) NOT NULL,
  country VARCHAR ( 40 ),
  founded_year INT,
  description TEXT
);

CREATE TABLE IF NOT EXISTS cars (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_id INT REFERENCES categories ( id ) ON DELETE CASCADE,
  brand_id INT REFERENCES brands ( id ) ON DELETE CASCADE,
  name VARCHAR ( 100 ) NOT NULL,
  model_year INT,
  price DECIMAL ( 10, 2 ),
  horsepower INT,
  torque INT,
  top_speed INT,
  acceleration_0_60 DECIMAL ( 4, 2 ),
  transmission VARCHAR ( 50 ),
  drivetrain VARCHAR ( 50 ),
  fuel_type VARCHAR ( 50 ),
  engine_size VARCHAR ( 50 ),
  seats INT,
  color VARCHAR ( 50 ),
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS car_specifications (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  car_id INT REFERENCES cars ( id ) ON DELETE CASCADE,
  weight_kg INT,
  length_mm INT,
  width_mm INT,
  height_mm INT,
  fuel_capacity_l INT,
  cargo_space_l INT,
  warranty_years INT,
  maintenance_interval_km INT,
  features JSON
);
`;

async function main() {
  console.log("Initializing the database creation process");
  const client = new Client(config);
  console.log("Connecting to database...");
  await client.connect();
  console.log("Creating tables...");
  await client.query(SQL_CREATE_TABLES);
  await client.end();
  console.log("Done!");
}

if (require.main === module) {
  main();
}

module.exports = { SQL_CREATE_TABLES };
