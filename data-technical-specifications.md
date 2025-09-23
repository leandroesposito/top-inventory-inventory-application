# Sports Car Inventory Management System - Technical Specifications

## Database Schema

### Categories Table

| Field       | Type                           | Description          |
| ----------- | ------------------------------ | -------------------- |
| id          | INT PRIMARY KEY AUTO_INCREMENT | Unique identifier    |
| name        | VARCHAR(100) NOT NULL          | Category name        |
| description | TEXT                           | Category description |

### Brands Table

| Field        | Type                           | Description            |
| ------------ | ------------------------------ | ---------------------- |
| id           | INT PRIMARY KEY AUTO_INCREMENT | Unique identifier      |
| name         | VARCHAR(100) NOT NULL          | Brand name             |
| country      | VARCHAR(50)                    | Country of origin      |
| founded_year | INT                            | Year brand was founded |
| description  | TEXT                           | Brand description      |

### Cars Table

| Field             | Type                           | Description               |
| ----------------- | ------------------------------ | ------------------------- |
| id                | INT PRIMARY KEY AUTO_INCREMENT | Unique identifier         |
| name              | VARCHAR(100) NOT NULL          | Car model name            |
| category_id       | INT                            | Foreign key to categories |
| brand_id          | INT                            | Foreign key to brands     |
| model_year        | INT                            | Manufacturing year        |
| price             | DECIMAL(10,2)                  | Retail price              |
| horsepower        | INT                            | Engine power output       |
| torque            | INT                            | Engine torque (lb-ft)     |
| top_speed         | INT                            | Maximum speed (mph)       |
| acceleration_0_60 | DECIMAL(4,2)                   | 0-60 mph time (seconds)   |
| transmission      | VARCHAR(50)                    | Transmission type         |
| drivetrain        | VARCHAR(50)                    | Drivetrain configuration  |
| fuel_type         | VARCHAR(50)                    | Fuel requirement          |
| engine_size       | VARCHAR(50)                    | Engine displacement       |
| seats             | INT                            | Passenger capacity        |
| color             | VARCHAR(50)                    | Exterior color            |
| in_stock          | BOOLEAN DEFAULT true           | Availability status       |
| stock_quantity    | INT DEFAULT 0                  | Current inventory count   |

### Car Specifications Table

| Field                   | Type                           | Description           |
| ----------------------- | ------------------------------ | --------------------- |
| id                      | INT PRIMARY KEY AUTO_INCREMENT | Unique identifier     |
| car_id                  | INT                            | Foreign key to cars   |
| weight_kg               | INT                            | Vehicle weight        |
| length_mm               | INT                            | Vehicle length        |
| width_mm                | INT                            | Vehicle width         |
| height_mm               | INT                            | Vehicle height        |
| fuel_capacity_l         | INT                            | Fuel tank capacity    |
| cargo_space_l           | INT                            | Trunk space           |
| warranty_years          | INT                            | Manufacturer warranty |
| maintenance_interval_km | INT                            | Service interval      |
| features                | JSON                           | Array of features     |

---

## Sample Data Files

### cars.json (20 Sports Cars)

```json
[
  {
    "id": 1,
    "name": "Porsche 911 Turbo S",
    "category_id": 1,
    "brand_id": 1,
    "model_year": 2024,
    "price": 215000.0,
    "horsepower": 640,
    "torque": 590,
    "top_speed": 205,
    "acceleration_0_60": 2.6,
    "transmission": "PDK",
    "drivetrain": "AWD",
    "fuel_type": "Premium",
    "engine_size": "3.8L Twin-Turbo Flat-6",
    "seats": 4,
    "color": "Guards Red",
    "in_stock": true,
    "stock_quantity": 2
  },
  {
    "id": 2,
    "name": "Chevrolet Camaro ZL1",
    "category_id": 3,
    "brand_id": 2,
    "model_year": 2024,
    "price": 75000.0,
    "horsepower": 650,
    "torque": 650,
    "top_speed": 198,
    "acceleration_0_60": 3.5,
    "transmission": "10-Speed Automatic",
    "drivetrain": "RWD",
    "fuel_type": "Premium",
    "engine_size": "6.2L Supercharged V8",
    "seats": 4,
    "color": "Shock Yellow",
    "in_stock": true,
    "stock_quantity": 3
  },
  {
    "id": 3,
    "name": "Nissan GT-R Nismo",
    "category_id": 4,
    "brand_id": 3,
    "model_year": 2024,
    "price": 215000.0,
    "horsepower": 600,
    "torque": 481,
    "top_speed": 196,
    "acceleration_0_60": 2.5,
    "transmission": "6-Speed Dual-Clutch",
    "drivetrain": "AWD",
    "fuel_type": "Premium",
    "engine_size": "3.8L Twin-Turbo V6",
    "seats": 4,
    "color": "Super Silver",
    "in_stock": true,
    "stock_quantity": 1
  },
  {
    "id": 4,
    "name": "Chevrolet Corvette C8 Stingray",
    "category_id": 2,
    "brand_id": 2,
    "model_year": 2024,
    "price": 68000.0,
    "horsepower": 495,
    "torque": 470,
    "top_speed": 194,
    "acceleration_0_60": 2.9,
    "transmission": "8-Speed Dual-Clutch",
    "drivetrain": "RWD",
    "fuel_type": "Premium",
    "engine_size": "6.2L V8",
    "seats": 2,
    "color": "Arctic White",
    "in_stock": true,
    "stock_quantity": 4
  },
  {
    "id": 5,
    "name": "Ford Mustang Shelby GT500",
    "category_id": 3,
    "brand_id": 4,
    "model_year": 2024,
    "price": 82000.0,
    "horsepower": 760,
    "torque": 625,
    "top_speed": 180,
    "acceleration_0_60": 3.3,
    "transmission": "7-Speed Dual-Clutch",
    "drivetrain": "RWD",
    "fuel_type": "Premium",
    "engine_size": "5.2L Supercharged V8",
    "seats": 4,
    "color": "Grabber Blue",
    "in_stock": false,
    "stock_quantity": 0
  },
  {
    "id": 6,
    "name": "BMW M8 Competition",
    "category_id": 5,
    "brand_id": 5,
    "model_year": 2024,
    "price": 140000.0,
    "horsepower": 617,
    "torque": 553,
    "top_speed": 190,
    "acceleration_0_60": 3.0,
    "transmission": "8-Speed Automatic",
    "drivetrain": "AWD",
    "fuel_type": "Premium",
    "engine_size": "4.4L Twin-Turbo V8",
    "seats": 4,
    "color": "Sao Paulo Yellow",
    "in_stock": true,
    "stock_quantity": 2
  },
  {
    "id": 7,
    "name": "Audi R8 Performance",
    "category_id": 1,
    "brand_id": 6,
    "model_year": 2024,
    "price": 195000.0,
    "horsepower": 602,
    "torque": 413,
    "top_speed": 205,
    "acceleration_0_60": 3.1,
    "transmission": "7-Speed Dual-Clutch",
    "drivetrain": "AWD",
    "fuel_type": "Premium",
    "engine_size": "5.2L V10",
    "seats": 2,
    "color": "Daytona Gray",
    "in_stock": true,
    "stock_quantity": 1
  },
  {
    "id": 8,
    "name": "Dodge Challenger SRT Hellcat",
    "category_id": 3,
    "brand_id": 7,
    "model_year": 2024,
    "price": 72000.0,
    "horsepower": 717,
    "torque": 656,
    "top_speed": 196,
    "acceleration_0_60": 3.6,
    "transmission": "8-Speed Automatic",
    "drivetrain": "RWD",
    "fuel_type": "Premium",
    "engine_size": "6.2L Supercharged V8",
    "seats": 5,
    "color": "Hellraisin",
    "in_stock": true,
    "stock_quantity": 3
  },
  {
    "id": 9,
    "name": "Porsche 718 Cayman GT4",
    "category_id": 2,
    "brand_id": 1,
    "model_year": 2024,
    "price": 105000.0,
    "horsepower": 414,
    "torque": 317,
    "top_speed": 188,
    "acceleration_0_60": 4.2,
    "transmission": "6-Speed Manual",
    "drivetrain": "RWD",
    "fuel_type": "Premium",
    "engine_size": "4.0L Flat-6",
    "seats": 2,
    "color": "Racing Yellow",
    "in_stock": true,
    "stock_quantity": 2
  },
  {
    "id": 10,
    "name": "Nissan 370Z Nismo",
    "category_id": 4,
    "brand_id": 3,
    "model_year": 2024,
    "price": 45000.0,
    "horsepower": 350,
    "torque": 276,
    "top_speed": 155,
    "acceleration_0_60": 5.2,
    "transmission": "6-Speed Manual",
    "drivetrain": "RWD",
    "fuel_type": "Premium",
    "engine_size": "3.7L V6",
    "seats": 2,
    "color": "Pearl White",
    "in_stock": true,
    "stock_quantity": 5
  },
  {
    "id": 11,
    "name": "BMW M4 Competition",
    "category_id": 2,
    "brand_id": 5,
    "model_year": 2024,
    "price": 85000.0,
    "horsepower": 503,
    "torque": 479,
    "top_speed": 180,
    "acceleration_0_60": 3.8,
    "transmission": "8-Speed Automatic",
    "drivetrain": "RWD",
    "fuel_type": "Premium",
    "engine_size": "3.0L Twin-Turbo I6",
    "seats": 4,
    "color": "Toronto Red",
    "in_stock": true,
    "stock_quantity": 3
  },
  {
    "id": 12,
    "name": "Audi TT RS",
    "category_id": 2,
    "brand_id": 6,
    "model_year": 2024,
    "price": 72000.0,
    "horsepower": 394,
    "torque": 354,
    "top_speed": 155,
    "acceleration_0_60": 3.6,
    "transmission": "7-Speed Dual-Clutch",
    "drivetrain": "AWD",
    "fuel_type": "Premium",
    "engine_size": "2.5L Turbo I5",
    "seats": 4,
    "color": "Turbo Blue",
    "in_stock": false,
    "stock_quantity": 0
  },
  {
    "id": 13,
    "name": "Ford Mustang GT",
    "category_id": 3,
    "brand_id": 4,
    "model_year": 2024,
    "price": 42000.0,
    "horsepower": 450,
    "torque": 410,
    "top_speed": 155,
    "acceleration_0_60": 4.2,
    "transmission": "10-Speed Automatic",
    "drivetrain": "RWD",
    "fuel_type": "Premium",
    "engine_size": "5.0L V8",
    "seats": 4,
    "color": "Velocity Blue",
    "in_stock": true,
    "stock_quantity": 6
  },
  {
    "id": 14,
    "name": "Chevrolet Corvette Z06",
    "category_id": 1,
    "brand_id": 2,
    "model_year": 2024,
    "price": 125000.0,
    "horsepower": 670,
    "torque": 460,
    "top_speed": 195,
    "acceleration_0_60": 2.6,
    "transmission": "8-Speed Dual-Clutch",
    "drivetrain": "RWD",
    "fuel_type": "Premium",
    "engine_size": "5.5L Flat-Plane V8",
    "seats": 2,
    "color": "Accelerate Yellow",
    "in_stock": true,
    "stock_quantity": 1
  },
  {
    "id": 15,
    "name": "Porsche Taycan Turbo S",
    "category_id": 5,
    "brand_id": 1,
    "model_year": 2024,
    "price": 195000.0,
    "horsepower": 750,
    "torque": 774,
    "top_speed": 161,
    "acceleration_0_60": 2.6,
    "transmission": "2-Speed Automatic",
    "drivetrain": "AWD",
    "fuel_type": "Electric",
    "engine_size": "Dual Electric Motors",
    "seats": 4,
    "color": "Mamba Green",
    "in_stock": true,
    "stock_quantity": 2
  },
  {
    "id": 16,
    "name": "Dodge Charger SRT Hellcat",
    "category_id": 3,
    "brand_id": 7,
    "model_year": 2024,
    "price": 78000.0,
    "horsepower": 717,
    "torque": 656,
    "top_speed": 196,
    "acceleration_0_60": 3.6,
    "transmission": "8-Speed Automatic",
    "drivetrain": "RWD",
    "fuel_type": "Premium",
    "engine_size": "6.2L Supercharged V8",
    "seats": 5,
    "color": "Frostbite Blue",
    "in_stock": true,
    "stock_quantity": 4
  },
  {
    "id": 17,
    "name": "BMW M2 Competition",
    "category_id": 2,
    "brand_id": 5,
    "model_year": 2024,
    "price": 63000.0,
    "horsepower": 405,
    "torque": 406,
    "top_speed": 155,
    "acceleration_0_60": 4.0,
    "transmission": "6-Speed Manual",
    "drivetrain": "RWD",
    "fuel_type": "Premium",
    "engine_size": "3.0L Twin-Turbo I6",
    "seats": 4,
    "color": "Long Beach Blue",
    "in_stock": true,
    "stock_quantity": 3
  },
  {
    "id": 18,
    "name": "Audi RS5 Sportback",
    "category_id": 5,
    "brand_id": 6,
    "model_year": 2024,
    "price": 79000.0,
    "horsepower": 444,
    "torque": 443,
    "top_speed": 155,
    "acceleration_0_60": 3.8,
    "transmission": "8-Speed Automatic",
    "drivetrain": "AWD",
    "fuel_type": "Premium",
    "engine_size": "2.9L Twin-Turbo V6",
    "seats": 5,
    "color": "Navarra Blue",
    "in_stock": true,
    "stock_quantity": 2
  },
  {
    "id": 19,
    "name": "Nissan Z Performance",
    "category_id": 4,
    "brand_id": 3,
    "model_year": 2024,
    "price": 52000.0,
    "horsepower": 400,
    "torque": 350,
    "top_speed": 155,
    "acceleration_0_60": 4.5,
    "transmission": "9-Speed Automatic",
    "drivetrain": "RWD",
    "fuel_type": "Premium",
    "engine_size": "3.0L Twin-Turbo V6",
    "seats": 2,
    "color": "Ikazuchi Yellow",
    "in_stock": true,
    "stock_quantity": 4
  },
  {
    "id": 20,
    "name": "Porsche 911 Carrera S",
    "category_id": 2,
    "brand_id": 1,
    "model_year": 2024,
    "price": 125000.0,
    "horsepower": 443,
    "torque": 390,
    "top_speed": 191,
    "acceleration_0_60": 3.3,
    "transmission": "8-Speed Dual-Clutch",
    "drivetrain": "RWD",
    "fuel_type": "Premium",
    "engine_size": "3.0L Twin-Turbo Flat-6",
    "seats": 4,
    "color": "Gentian Blue",
    "in_stock": true,
    "stock_quantity": 3
  }
]
```

### categories.json

```json
[
  {
    "id": 1,
    "name": "Supercars",
    "description": "High-performance luxury sports cars with extreme performance capabilities"
  },
  {
    "id": 2,
    "name": "Sports Coupes",
    "description": "Two-door sports cars focused on performance and style"
  },
  {
    "id": 3,
    "name": "Muscle Cars",
    "description": "American high-performance vehicles with powerful V8 engines"
  },
  {
    "id": 4,
    "name": "JDM Sports",
    "description": "Japanese Domestic Market performance vehicles"
  },
  {
    "id": 5,
    "name": "GT Cars",
    "description": "Grand Tourers combining performance with luxury and comfort"
  }
]
```

### brands.json

```json
[
  {
    "id": 1,
    "name": "Porsche",
    "country": "Germany",
    "founded_year": 1931,
    "description": "German automobile manufacturer specializing in high-performance sports cars"
  },
  {
    "id": 2,
    "name": "Chevrolet",
    "country": "USA",
    "founded_year": 1911,
    "description": "American automotive division of General Motors"
  },
  {
    "id": 3,
    "name": "Nissan",
    "country": "Japan",
    "founded_year": 1933,
    "description": "Japanese multinational automobile manufacturer"
  },
  {
    "id": 4,
    "name": "Ford",
    "country": "USA",
    "founded_year": 1903,
    "description": "American multinational automobile manufacturer"
  },
  {
    "id": 5,
    "name": "BMW",
    "country": "Germany",
    "founded_year": 1916,
    "description": "German multinational manufacturer of luxury vehicles"
  },
  {
    "id": 6,
    "name": "Audi",
    "country": "Germany",
    "founded_year": 1909,
    "description": "German automobile manufacturer that designs, engineers, produces markets and distributes luxury vehicles"
  },
  {
    "id": 7,
    "name": "Dodge",
    "country": "USA",
    "founded_year": 1900,
    "description": "American brand of automobiles and a division of Stellantis"
  }
]
```

---

## API Endpoints Structure

### Categories Endpoints

- `GET /categories` - List all categories
- `GET /categories/:id` - Get specific category
- `POST /categories` - Create new category
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

### Cars Endpoints

- `GET /cars` - List all cars (with filtering)
- `GET /cars/:id` - Get specific car details
- `POST /cars` - Add new car
- `PUT /cars/:id` - Update car
- `DELETE /cars/:id` - Delete car
- `GET /cars/category/:categoryId` - Get cars by category
- `GET /cars/brand/:brandId` - Get cars by brand

### Brands Endpoints

- `GET /brands` - List all brands
- `GET /brands/:id` - Get specific brand
- `POST /brands` - Add new brand

### Specifications Endpoints

- `GET /specifications/car/:carId` - Get specs for car
- `POST /specifications` - Add car specifications
- `PUT /specifications/:id` - Update specifications

---

## Project Features Checklist

- ✅ Complete CRUD operations for all entities
- ✅ Category-based car filtering
- ✅ Brand management system
- ✅ Detailed car specifications
- ✅ Inventory tracking (stock quantity, availability)
- ✅ Search and filter capabilities
- ✅ Responsive web interface

This provides a solid foundation for your sports car inventory management application with 20 diverse vehicles across different categories and brands.
