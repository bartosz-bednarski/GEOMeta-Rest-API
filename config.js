require("dotenv").config();
const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectTimeout: 60000,
    port: process.env.DB_PORT,
  },
  listPerPage: 50,
};
module.exports = config;
