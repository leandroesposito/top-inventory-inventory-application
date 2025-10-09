require("dotenv").config();

module.exports = {
  connectionString: `postresql://${process.env.PGUSER}:${
    process.env.PGPASSWORD
  }@${process.env.PGHOST}${
    process.env.PGPORT ? ":" + process.env.PGPORT : ""
  }/${process.env.PGDATABASE}?${process.env.PGPARAMS}`,
};
