const { Pool } = require("pg");

const itemsPool = new Pool({
  connectionString: process.env.DB_CONFIGLINK,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = itemsPool;

// const { Pool } = require("pg");
// const pool = new Pool({
//   user: "mikey",
//   host: "localhost",
//   database: "jobio",
//   password: "ntpassword",
//   port: 5433,
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };
