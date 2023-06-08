const mysql = require('../node_modules/mysql2/promise');

class Database {
  constructor(config) {
    this.pool = mysql.createPool(config);
    // console.log(`Connected to the ${config.database} database.`);
  }

  async query(sql, args) {
    try {
      const connection = await this.pool.getConnection();
      const [rows] = await connection.query(sql, args);
      connection.release();
      return rows;
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
  // Export Database module
  module.exports = Database;