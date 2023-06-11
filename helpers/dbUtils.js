// Import and require mysql2
const mysql = require('mysql2');

//Connect object modules
const Database = require('../objects/database');

//Database config with parameters
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
    //if (message) { console.log('\x1b[32m%s\x1b[0m', message) };
    return data;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    database.pool.end();
  }
}
// This function returns all departments from db
async function getAllDepartments() {
  const departmentData = await fetchDataFromDB('SELECT * FROM department');
  return departmentData
}
// This function returns all roles from db
async function getAllRoles() {
  const roleData = await fetchDataFromDB(`SELECT CONCAT(role.title, ' - ' , department.name) AS role, role.id AS id, department.name AS department, role.salary AS Salary FROM role JOIN department ON department.id = role.department_id;`);
  return roleData;
}
// This function returns all employees from db
async function getAllEmployee() {
  const managersData = await fetchDataFromDB(`SELECT employee.id AS id, CONCAT(IFNULL(employee.first_name, '--'), ' ', IFNULL(employee.last_name, '--')) AS name FROM employee;`);
  return managersData;
}
// This function delete roles from db that has id equal to id parameter value, message parameter contains deletion notification for user
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

// export for all module's functions
module.exports = {
  fetchDataFromDB,
  getAllDepartments,
  getAllRoles,
  getAllEmployee,
  deleteRole
};