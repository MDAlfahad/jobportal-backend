const mysql = require("mysql2/promise");
require("dotenv").config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const conn = await connection.getConnection();
    console.log(" Database connected successfully");
    conn.release();
  } catch (err) {
    console.error(" Database connection failed:", err.message);
  }
})();


module.exports = connection;