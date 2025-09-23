const { Client } = require("pg");
require("dotenv").config();

const SQL_CREATE_TABLES = `
CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 100 ) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS brands (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 100 ) NOT NULL,
  COUNTRY VARCHAR ( 40 ),
  founded_year INT,
  description TEXT
);

CREATE TABLE IF NOT EXISTS cars (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_id INT REFERENCES categories ( id ),
  brand_id INT REFERENCES brands ( id ),
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
  car_id INT REFERENCES cars ( id ),
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

const SQL_INSERT_DATA = `
INSERT INTO categories (name, description) VALUES
('Supercars', 'High-performance luxury sports cars with extreme performance capabilities'),
('Sports Coupes', 'Two-door sports cars focused on performance and style'),
('Muscle Cars', 'American high-performance vehicles with powerful V8 engines'),
('JDM Sports', 'Japanese Domestic Market performance vehicles'),
('GT Cars', 'Grand Tourers combining performance with luxury and comfort');

INSERT INTO brands (name, country, founded_year, description) VALUES
('Porsche', 'Germany', 1931, 'German automobile manufacturer specializing in high-performance sports cars'),
('Chevrolet', 'USA', 1911, 'American automotive division of General Motors'),
('Nissan', 'Japan', 1933, 'Japanese multinational automobile manufacturer'),
('Ford', 'USA', 1903, 'American multinational automobile manufacturer'),
('BMW', 'Germany', 1916, 'German multinational manufacturer of luxury vehicles'),
('Audi', 'Germany', 1909, 'German automobile manufacturer that designs, engineers, produces markets and distributes luxury vehicles'),
('Dodge', 'USA', 1900, 'American brand of automobiles and a division of Stellantis');

INSERT INTO cars (name, category_id, brand_id, model_year, price, horsepower, torque, top_speed, acceleration_0_60, transmission, drivetrain, fuel_type, engine_size, seats, color, in_stock, stock_quantity) VALUES
('Porsche 911 Turbo S', 1, 1, 2024, 215000.00, 640, 590, 205, 2.6, 'PDK', 'AWD', 'Premium', '3.8L Twin-Turbo Flat-6', 4, 'Guards Red', true, 2),
('Chevrolet Camaro ZL1', 3, 2, 2024, 75000.00, 650, 650, 198, 3.5, '10-Speed Automatic', 'RWD', 'Premium', '6.2L Supercharged V8', 4, 'Shock Yellow', true, 3),
('Nissan GT-R Nismo', 4, 3, 2024, 215000.00, 600, 481, 196, 2.5, '6-Speed Dual-Clutch', 'AWD', 'Premium', '3.8L Twin-Turbo V6', 4, 'Super Silver', true, 1),
('Chevrolet Corvette C8 Stingray', 2, 2, 2024, 68000.00, 495, 470, 194, 2.9, '8-Speed Dual-Clutch', 'RWD', 'Premium', '6.2L V8', 2, 'Arctic White', true, 4),
('Ford Mustang Shelby GT500', 3, 4, 2024, 82000.00, 760, 625, 180, 3.3, '7-Speed Dual-Clutch', 'RWD', 'Premium', '5.2L Supercharged V8', 4, 'Grabber Blue', false, 0),
('BMW M8 Competition', 5, 5, 2024, 140000.00, 617, 553, 190, 3.0, '8-Speed Automatic', 'AWD', 'Premium', '4.4L Twin-Turbo V8', 4, 'Sao Paulo Yellow', true, 2),
('Audi R8 Performance', 1, 6, 2024, 195000.00, 602, 413, 205, 3.1, '7-Speed Dual-Clutch', 'AWD', 'Premium', '5.2L V10', 2, 'Daytona Gray', true, 1),
('Dodge Challenger SRT Hellcat', 3, 7, 2024, 72000.00, 717, 656, 196, 3.6, '8-Speed Automatic', 'RWD', 'Premium', '6.2L Supercharged V8', 5, 'Hellraisin', true, 3),
('Porsche 718 Cayman GT4', 2, 1, 2024, 105000.00, 414, 317, 188, 4.2, '6-Speed Manual', 'RWD', 'Premium', '4.0L Flat-6', 2, 'Racing Yellow', true, 2),
('Nissan 370Z Nismo', 4, 3, 2024, 45000.00, 350, 276, 155, 5.2, '6-Speed Manual', 'RWD', 'Premium', '3.7L V6', 2, 'Pearl White', true, 5),
('BMW M4 Competition', 2, 5, 2024, 85000.00, 503, 479, 180, 3.8, '8-Speed Automatic', 'RWD', 'Premium', '3.0L Twin-Turbo I6', 4, 'Toronto Red', true, 3),
('Audi TT RS', 2, 6, 2024, 72000.00, 394, 354, 155, 3.6, '7-Speed Dual-Clutch', 'AWD', 'Premium', '2.5L Turbo I5', 4, 'Turbo Blue', false, 0),
('Ford Mustang GT', 3, 4, 2024, 42000.00, 450, 410, 155, 4.2, '10-Speed Automatic', 'RWD', 'Premium', '5.0L V8', 4, 'Velocity Blue', true, 6),
('Chevrolet Corvette Z06', 1, 2, 2024, 125000.00, 670, 460, 195, 2.6, '8-Speed Dual-Clutch', 'RWD', 'Premium', '5.5L Flat-Plane V8', 2, 'Accelerate Yellow', true, 1),
('Porsche Taycan Turbo S', 5, 1, 2024, 195000.00, 750, 774, 161, 2.6, '2-Speed Automatic', 'AWD', 'Electric', 'Dual Electric Motors', 4, 'Mamba Green', true, 2),
('Dodge Charger SRT Hellcat', 3, 7, 2024, 78000.00, 717, 656, 196, 3.6, '8-Speed Automatic', 'RWD', 'Premium', '6.2L Supercharged V8', 5, 'Frostbite Blue', true, 4),
('BMW M2 Competition', 2, 5, 2024, 63000.00, 405, 406, 155, 4.0, '6-Speed Manual', 'RWD', 'Premium', '3.0L Twin-Turbo I6', 4, 'Long Beach Blue', true, 3),
('Audi RS5 Sportback', 5, 6, 2024, 79000.00, 444, 443, 155, 3.8, '8-Speed Automatic', 'AWD', 'Premium', '2.9L Twin-Turbo V6', 5, 'Navarra Blue', true, 2),
('Nissan Z Performance', 4, 3, 2024, 52000.00, 400, 350, 155, 4.5, '9-Speed Automatic', 'RWD', 'Premium', '3.0L Twin-Turbo V6', 2, 'Ikazuchi Yellow', true, 4),
('Porsche 911 Carrera S', 2, 1, 2024, 125000.00, 443, 390, 191, 3.3, '8-Speed Dual-Clutch', 'RWD', 'Premium', '3.0L Twin-Turbo Flat-6', 4, 'Gentian Blue', true, 3);

INSERT INTO car_specifications (car_id, weight_kg, length_mm, width_mm, height_mm, fuel_capacity_l, cargo_space_l, warranty_years, maintenance_interval_km, features) VALUES
(1, 1640, 4535, 1900, 1303, 67, 132, 4, 15000, '["Sport Chrono Package", "Porsche Active Suspension", "Carbon Ceramic Brakes", "Rear-Axle Steering", "Bose Surround Sound"]'),
(2, 1900, 4784, 1897, 1348, 72, 320, 3, 12000, '["Magnetic Ride Control", "Electronic Limited-Slip Differential", "Recaro Seats", "Suede Microfiber Steering Wheel", "Dual Mode Exhaust"]'),
(3, 1740, 4710, 1895, 1370, 74, 315, 3, 10000, '["Nismo-tuned suspension", "Carbon fiber body parts", "Track-focused tires", "Enhanced cooling system", "Special interior trim"]'),
(4, 1665, 4630, 1934, 1234, 70, 357, 3, 12000, '["Mid-engine layout", "Magnetic Selective Ride Control", "Performance Traction Management", "Front lift system", "Dual-clutch transmission"]'),
(5, 1825, 4792, 1916, 1381, 61, 382, 3, 12000, '["Carbon fiber wheels", "Carbon fiber dash", "Recaro racing seats", "Track apps", "Active exhaust system"]'),
(6, 1945, 4867, 1907, 1372, 68, 420, 4, 15000, '["M Sport differential", "Adaptive M suspension", "M Sport exhaust", "Carbon roof", "Laserlight headlights"]'),
(7, 1695, 4429, 1940, 1236, 73, 112, 4, 15000, '["Audi magnetic ride", "Carbon fiber sideblades", "Bang & Olufsen sound", "Audi virtual cockpit", "Sport exhaust system"]'),
(8, 1980, 5020, 1923, 1450, 72, 440, 3, 10000, '["SRT Performance pages", "Brembo high-performance brakes", "Performance suspension", "Dual exhaust with black tips", "SRT leather seats"]'),
(9, 1420, 4400, 1801, 1265, 64, 150, 4, 15000, '["Porsche Active Suspension Management", "Sport Chrono Package", "Porsche Torque Vectoring", "Lightweight bucket seats", "Porsche Stability Management"]'),
(10, 1520, 4265, 1848, 1315, 72, 195, 3, 8000, '["Nismo-tuned suspension", "Rays forged aluminum wheels", "Nismo aerodynamic kit", "Nismo sport exhaust", "Recaro seats"]');

INSERT INTO car_specifications (car_id, weight_kg, length_mm, width_mm, height_mm, fuel_capacity_l, cargo_space_l, warranty_years, maintenance_interval_km, features) VALUES
(11, 1725, 4794, 1887, 1393, 59, 440, 4, 15000, '["M Compound brakes", "Adaptive M suspension", "M Sport differential", "Carbon fiber trim", "M Sport seats"]'),
(12, 1550, 4197, 1832, 1343, 55, 305, 4, 15000, '["Audi magnetic ride", "RS sport exhaust", "Nappa leather interior", "Audi virtual cockpit", "Bang & Olufsen sound"]'),
(13, 1700, 4789, 1916, 1382, 61, 382, 3, 10000, '["Active valve performance exhaust", "MagneRide damping system", "Brembo brakes", "SYNC 4 infotainment", "Track Apps"]'),
(14, 1580, 4630, 1934, 1230, 70, 357, 3, 12000, '["Z07 Performance Package", "Carbon ceramic brakes", "Carbon fiber aero", "Performance data recorder", "Magnetic ride control"]'),
(15, 2295, 4963, 1966, 1378, 0, 366, 8, 30000, '["Performance Battery Plus", "Porsche 4D Chassis Control", "Porsche Torque Vectoring", "Porsche Electric Sport Sound", "Adaptive air suspension"]'),
(16, 2050, 5018, 1923, 1468, 72, 470, 3, 10000, '["SRT Performance pages", "Dual-mode active exhaust", "Performance suspension", "Brembo high-performance brakes", "Heated and ventilated seats"]'),
(17, 1620, 4460, 1854, 1410, 52, 390, 4, 15000, '["Adaptive M suspension", "M Sport differential", "M Compound brakes", "M Sport seats", "Carbon fiber interior trim"]'),
(18, 1790, 4770, 1866, 1406, 58, 480, 4, 15000, '["RS sport suspension", "Quattro with sport differential", "RS sport exhaust", "Audi virtual cockpit", "Bang & Olufsen 3D sound"]'),
(19, 1570, 4380, 1845, 1315, 65, 210, 3, 10000, '["Mechanical limited-slip differential", "Sport-tuned suspension", "SynchroRev Match", "NissanConnect services", "Bose premium audio"]'),
(20, 1515, 4535, 1900, 1303, 67, 132, 4, 15000, '["Porsche Active Suspension Management", "Sport Chrono Package", "Porsche Stability Management", "Porsche Torque Vectoring", "Bose Surround Sound"]');


`;

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
};

async function main() {
  console.log("Initializing the database creation process");
  const client = new Client(config);
  console.log("Connecting to database...");
  await client.connect();
  console.log("Creating tables...");
  await client.query(SQL_CREATE_TABLES);
  await client.query(SQL_INSERT_DATA);
  await client.end();
  console.log("Done!");
}

main();
