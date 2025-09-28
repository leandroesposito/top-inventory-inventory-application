const pool = require("./pool");

async function runQuery(query, params = []) {
  try {
    return await pool.query(query, params);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function runGetQuery(query, params = []) {
  try {
    const { rows } = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  runQuery,
  runGetQuery,
};
