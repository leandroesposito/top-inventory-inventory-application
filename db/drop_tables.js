const { Client } = require("pg");
const config = require("./connection_config");

const SQL_DROP_TABLES = `
DROP TABLE IF EXISTS car_specifications;

DROP TABLE IF EXISTS cars;

DROP TABLE IF EXISTS categories;

DROP TABLE IF EXISTS brands;
`;

async function main() {
  console.log("Initializing the tables drop process");
  const client = new Client(config);
  console.log("Connecting to database...");
  await client.connect();
  console.log("Dropping tables...");
  await client.query(SQL_DROP_TABLES);
  await client.end();
  console.log("Done!");
}

if (require.main === module) {
  main();
}

module.exports = { SQL_DROP_TABLES };
