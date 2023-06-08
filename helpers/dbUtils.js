// Import and require mysql2
const mysql = require('mysql2');

//Connect object modules
const Database = require('../objects/database');
// const Department = require('../objects/department');
// const Role = require('../objects/role');
// const Employee = require('../objects/employee');

const config = {
  host: 'localhost',
  user: 'root',
  password: '280480',
  database: 'company_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Connect to database
async function fetchDataFromDB(query, args, message) {
  const database = new Database(config);
  try {
    const data = await database.query(query, args);
    if (message) { console.log('\x1b[32m%s\x1b[0m', message) };
    return data;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    database.pool.end();
  }
}
async function getAllDepartments() {
  const departmentData = await fetchDataFromDB('SELECT * FROM department');
  return departmentData
}
async function getAllRoles() {
  const roleData = await fetchDataFromDB(`SELECT CONCAT(role.title, ' - ' , department.name) AS role, role.id AS id, department.name AS department, role.salary AS Salary FROM role JOIN department ON department.id = role.department_id;`);
  return roleData;
}
async function getAllEmployee() {
  const managersData = await fetchDataFromDB(`SELECT employee.id AS id, CONCAT(IFNULL(employee.first_name, '--'), ' ', IFNULL(employee.last_name, '--')) AS name FROM employee;`);
  return managersData;
}
async function deleteRole(id, message) {
  const connection = new Database(config);
  // Execute the transaction
try {
  await connection.query('START TRANSACTION;');

  await connection.query('UPDATE employee SET role_id = NULL WHERE role_id = ?', [id]);
  await connection.query('DELETE FROM role WHERE id = ?', [id]);

  await connection.query('COMMIT;');
  console.log('\x1b[32m%s\x1b[0m',`SQL transaction executed successfully. ${message}`);
} catch (error) {
  await connection.query('ROLLBACK;');
  console.error('Error executing SQL transaction:', error);
} finally {
  await connection.pool.end();
}
}

module.exports = {
  fetchDataFromDB,
  getAllDepartments,
  getAllRoles,
  getAllEmployee,
  deleteRole
};