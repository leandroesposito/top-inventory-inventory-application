const { Pool } = require("pg");
const connection_config = require("./connection_config");

module.exports = new Pool(connection_config);
