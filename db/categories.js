const { runQuery, runGetQuery } = require("./queries");

async function createCategory(category, description) {
  const query = "INSERT INTO categories (name, description) VALUES ( $1 , $2 )";
  const params = [category, description];

  runGetQuery(query, params);
}

async function getAllCategories() {
  const query = "SELECT (id, name, description) FROM categories";

  return await runGetQuery(query);
}

async function getCategoryById(id) {
  const query = "SELECT * FROM categories WHERE id = $1";
  const params = [id];

  const categories = await runGetQuery(query, params);

  return categories[0];
}

async function updateCategory(id, { name, description }) {
  const query =
    "UPDATE categories SET name = $1 , description = $2 WHERE id = $3";
  const params = [name, description, id];

  await runQuery(query, params);
}

async function deleteCategory(id) {
  const query = "DELETE FROM categories WHERE id = $1";
  const params = [id];

  await runQuery(query, params);
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
