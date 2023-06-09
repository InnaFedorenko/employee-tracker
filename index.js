// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
// Bonus
// Application allows users to view the total utilized budget of a department—in other words, the combined salaries of all employees in that department (8 points).
// Application allows users to delete departments, roles, and employees (2 points for each).
// Application allows users to view employees by department (2 points).
// Application allows users to view employees by manager (2 points).

// Application allows users to update employee managers (2 points).



// Connect Menu module
const {mainMenu} = require('./helpers/menuUtils');
const dbUtils = require('./helpers/dbUtils');



// Function to initialize app
function init() {
    console.log('\x1b[33m%s\x1b[0m', `Welcome to the Employee Manager!`);
    mainMenu();

}

// Start of the application
init();
