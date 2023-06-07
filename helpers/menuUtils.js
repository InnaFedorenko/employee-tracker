// Connect inquirer package
const inquirer = require('inquirer');
const Department = require('../objects/department');
const Employee = require('../objects/employee');
const Role = require('../objects/role');
const {showTable} = require ('./printUtils');

// Connect Database module
const dbUtils = require ('./dbUtils');

async function mainMenu(){
    console.log("connected to menu.lib")
        // view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
    const menuItems = [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update employee role',
        'Update employee managers',
        'View employees by manager',
        'View employees by department',
        'Delete departments',
        'Delete Roles',
        'Delete employees',
        'View the total utilized budget of a department',
        'Quit',
      ];
    const sqlQueries = {
        'View all departments': 'SELECT * FROM department;',
        'View all roles': 'SELECT * FROM role;',
        'View all employees': 'SELECT * FROM employee;',
        'Add a department': 'INSERT INTO department (name) VALUES (?);',
        'Add a role': 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);',
        'Add an employee': 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);',
        'Update employee role': 'UPDATE employee SET role_id = ? WHERE id = ?;',
        'Update employee managers': 'UPDATE employee SET manager_id = ? WHERE id = ?;',
        'View employees by manager': 'SELECT * FROM employee WHERE manager_id = ?;',
        'View employees by department': 'SELECT employee.* FROM employee join role on role.id = role_id join department on department.id = role.department_id where department.id = ?;',
        'Delete departments': 'DELETE FROM department WHERE id = ?;',
        'Delete Roles': 'DELETE FROM role WHERE id = ?;',
        'Delete employees': 'DELETE FROM employee WHERE id = ?;',
        'View the total utilized budget of a department': 'SELECT SUM(role.salary) AS total_budget FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.id = ?;',
      };

    try {
        const answer = await inquirer.prompt({
          type: 'list',
          name: 'menuItem',
          message: 'What would you like to do?',
          choices: [...menuItems, new inquirer.Separator()],
        });
        const selectedMenuItem = answer.menuItem;
        const sqlQuery = sqlQueries[selectedMenuItem];
    
        if (selectedMenuItem === 'Quit') {
          console.log('Goodbye!');
          return;
        }
    
        if (!sqlQuery) {
          console.log('Invalid menu option');
          await mainMenu();
          return;
        }
    
        // Run the SQL query based on the selected menu item
        console.log('Running query:', sqlQuery);
         const dbData = await dbUtils.fetchDataFromDB(sqlQuery);
        showTable (dbData);
        // After running the query, return to the main menu
        await mainMenu();
      } catch (error) {
        console.log('An error occurred:', error);
      }

}
function selectMenuItem (data) {
    const tables={
        department: Department,
        role: Role,
        employee: Employee
    }
    const menuItem =data.menuItem;
    console.log(menuItem);
    process.exit();
}
module.exports = {
    mainMenu,
    selectMenuItem
};