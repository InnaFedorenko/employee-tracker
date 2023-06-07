// Import and require mysql2
const mysql = require('mysql2');

//Connect object modules
const Database = require('../objects/database');
const Department = require('../objects/department');
const Role = require('../objects/role');
const Employee = require('../objects/employee');
const { showTable } = require('./printUtils');

// Connect to database
async function fetchDataFromDB(query) {
        const config = {
          host: 'localhost',
          user: 'root',
          password: '280480',
          database: 'company_db',
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0
        };
        const database = new Database(config);
        try {
          const data = await database.query(query);
          //console.log('Data:', data);
          //showTable (data);
          return data;
        } catch (error) {
          console.error('Error:', error);
        } finally {
          database.pool.end();
        }
      }

module.exports = {
    fetchDataFromDB
};