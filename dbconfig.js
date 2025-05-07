/*
 * @Author: Hey Kimo here!
 * @Date: 2022-02-04 16:20:41
 * @Last Modified by: ---- KIMO a.k.a KIMOSABE ----
 * @Last Modified time: 2022-08-13 15:22:45
 */
const mysql = require("mysql2/promise");

// Database configuration
const config = {
  host: "localhost",
  user: "root",
  password: "admin",
  database: "ecommercee",
  port: 3306,
  connectionLimit: 100,
};

// Create a global pool
const pool = mysql.createPool(config);

async function getAll() {
  try {
    const [rows] = await pool.query("SELECT * FROM admin"); // Use the global pool to query
    return rows;
  } catch (err) {
    console.error("Error querying database:", err);
    throw err;
  }
}

async function execute() {
  try {
    const result = await getAll();
    console.log(result); // Nicely formatted JSON output
    return result;
  } catch (err) {
    console.error("Execution failed:", err);
  }
} 

// Run the execution
execute();

// Export the pool for use in other modules
module.exports = pool;
