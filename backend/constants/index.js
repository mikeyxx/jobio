require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
  CLIENT_URL: process.env.CLIENT_URL,
  DB_CONFIGLINK: process.env.DB_CONFIGLINK,
};
