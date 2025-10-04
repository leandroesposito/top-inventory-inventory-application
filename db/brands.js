const { runQuery, runGetQuery } = require("./queries");

async function createBrand({ name, country, founded_year, description }) {
  const query = `INSERT INTO brands (name, country, founded_year, description) VALUES ( $1 , $2 , $3 , $4 )
                  RETURNING id;`;
  const params = [name, country, founded_year, description];

  const { rows } = await runQuery(query, params);
  return rows[0].id;
}

async function getAllBrands() {
  const query = "SELECT * FROM brands;";

  return await runGetQuery(query);
}

async function getBrandById(id) {
  const query = "SELECT * FROM brands WHERE id = $1;";
  const params = [id];

  const brands = await runGetQuery(query, params);

  return brands[0];
}

async function updateBrand(id, { name, country, founded_year, description }) {
  const query =
    "UPDATE brands SET name = $1, country = $2, founded_year = $3, description = $4 WHERE id = $5;";
  const params = [name, country, founded_year, description, id];

  await runQuery(query, params);
}

async function deleteBrand(id) {
  const query = "DELETE FROM brands WHERE id = $1;";
  const params = [id];

  await runQuery(query, params);
}

module.exports = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};
