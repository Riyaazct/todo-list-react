const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

pool.on("connect", () => {
  console.log("Database connected successfully");
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
