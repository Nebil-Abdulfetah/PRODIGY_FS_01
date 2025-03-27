const mysql = require("mysql2/promise");
require("dotenv").config();
const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
};
const pool = mysql.createPool(dbConfig);

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully");
    connection.release();
  } catch (error) {
    console.error("Database connction failed", error.message);
  }
}

testConnection();

async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

module.exports = {
  query,
};
