// Connect inquirer package
const inquirer = require('inquirer');
const Department = require('../objects/department');
const Employee = require('../objects/employee');
const Role = require('../objects/role');
const { showTable } = require('./printUtils');

// Connect Database module
const { fetchDataFromDB, getAllDepartments, getAllRoles, getAllEmployee } = require('./dbUtils');
// Prompt for employee details

async function promptDepartments() {
    const answer = await inquirer.prompt(
        {
            type: 'input',
            name: 'name',
            message: 'Enter a department name?',
        }
    );
    return answer.name;
}
async function promptRoles() {
    const departmentData = await getAllDepartments();
    const departmentNames = departmentData.map(obj => obj.name);
    const answers = await inquirer.prompt(
        [{
            type: 'input',
            name: 'title',
            message: 'Enter a role name?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter salary?',
        },
        {
            type: 'list',
            name: 'departmentName',
            message: 'Choose a department',
            choices: departmentNames,
        }]
    );
    const departmentId = departmentData.find(departmentData => departmentData.name === answers.departmentName)?.id;
    const role = new Role({ title: answers.title, salary: answers.salary, department_id: departmentId });
    return role.fields;
}
async function promptEmployees() {
    const roleData = await getAllRoles();
    const roleNames = roleData.map(row => row.role);
    const managerData = await getAllEmployee();
    const managerNames = managerData.map(obj => obj.name);
    //Adding 'No Manager' as the first option in the managers list
    managerNames.unshift("No Manager");
    const answers = await inquirer.prompt(
        [{
            type: 'input',
            name: 'firstName',
            message: 'Enter First name?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter Last Name?',
        },
        {
            type: 'list',
            name: 'roleName',
            message: 'Choose a role',
            choices: roleNames,
        },
        {
            type: 'list',
            name: 'managerName',
            message: 'Choose a manager',
            choices: managerNames
        }]
    );
    // //  console.log(`answers: ${JSON.stringify(answers)}`);
    // console.log(`managerData: ${JSON.stringify(managerData)}`);
    const roleId = roleData.find(roleData => roleData.role === answers.roleName)?.id;
    //const managerId = managerData.find(managerData => managerData.ManagerName === answers.managerName)?.id;
    const managerId = answers.managerName === "No Manager" ? null: managerData.find(managerData => managerData.name === answers.managerName)?.id;

    //first_name, last_name, role_id, manager_id
    const employee = new Employee({ first_name: answers.firstName, last_name: answers.firstName, role_id: roleId, manager_id: managerId });
    return employee.fields;
}
async function promptEmployeeRole() {
    const roleData = await getAllRoles();
    const roleNames = roleData.map(row => row.role);
    const employeeData = await getAllEmployee();
    const employeeNames = employeeData.map(obj => obj.name);
    const answers = await inquirer.prompt(
        [{
            type: 'list',
            name: 'employeeName',
            message: 'Choose an employee',
            choices: employeeNames
        },
        {
            type: 'list',
            name: 'roleName',
            message: 'Choose a role',
            choices: roleNames,
        }]
    );
    const roleId = roleData.find(roleData => roleData.role === answers.roleName)?.id;
    const employeeId = employeeData.find(employeeData => employeeData.name === answers.employeeName)?.id;
    const newRole = {roleId: roleId, id:employeeId};
    return newRole;
}
async function mainMenu() {
    const menuItems = [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update employee role',
        // 'Update employee managers',
        // 'View employees by manager',
        // 'View employees by department',
        // 'Delete departments',
        // 'Delete Roles',
        // 'Delete employees',
        // 'View the total utilized budget of a department',
        'Quit',
    ];
    const sqlQueries = {
        'View all departments': 'SELECT * FROM department;',
        'View all roles': 'SELECT role.title AS Role, role.id AS ID, department.name AS Department, role.salary AS Salary FROM role JOIN department ON department.id = role.department_id;',
        'View all employees': `SELECT employee.id AS EmployeeID, employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS JobTitle, department.name AS Department, IFNULL(role.salary, '--') AS Salary, CONCAT(IFNULL(manager.first_name, '--'), ' ', IFNULL(manager.last_name, '--')) AS Manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id ORDER BY employee.id;`,
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
        let answer = await inquirer.prompt({
            type: 'list',
            name: 'menuItem',
            message: 'What would you like to do?',
            choices: [...menuItems, new inquirer.Separator()],
        });
        const selectedMenuItem = answer.menuItem;
        const sqlQuery = sqlQueries[selectedMenuItem];
        let sqlArgs = '';
        let message = '';
        ///////////////////////////////////// switch //////////////////////////////////
        switch (selectedMenuItem) {
            case 'Add a department':
                sqlArgs = await promptDepartments();
                message = `<${sqlArgs}> department was added. Select View all departments option to see it.`;
                const department = await fetchDataFromDB(sqlQuery, sqlArgs, message);
                await mainMenu();
                break;
            case 'Add a role':
                //to enter the name, salary, and department for the role and that role is added to the database
                sqlArgs = Object.values(await promptRoles());
                message = `<${sqlArgs}> role was added. Select View all roles option to see it.`;
                const role = await fetchDataFromDB(sqlQuery, sqlArgs, message);
                await mainMenu();
                break;
            case 'Add an employee':
                //to enter the name, salary, and department for the role and that role is added to the database
                sqlArgs = Object.values(await promptEmployees());
                console.log(sqlQuery + sqlArgs);
                message = `<${sqlArgs}> employee was added. Select View all employee option to see it.`;
                const employee = await fetchDataFromDB(sqlQuery, sqlArgs, message);
                await mainMenu();
                break;
            case 'Update employee role':
                 sqlArgs = Object.values(await promptEmployeeRole());
                 console.log(sqlQuery + sqlArgs);
                 message = `<${sqlArgs}> employee's role was updated. Select View all employee option to see it.`;
                const employeeUpdate = await fetchDataFromDB(sqlQuery, sqlArgs, message);
                await mainMenu();
                break;
            // Handle other menu options
            case 'Quit':
                console.log('\x1b[33m%s\x1b[0m', 'Goodbye!');
                break;
            default:
                // Run the SQL query based on the selected menu item
                console.log('Running query:', sqlQuery);
                const dbData = await fetchDataFromDB(sqlQuery, sqlArgs);
                showTable(dbData);
                // After running the query, return to the main menu
                await mainMenu();
                break;
        }


        ///////////////////////////////////// switch //////////////////////////////////
    } catch (error) {
        console.log('An error occurred:', error);
    }

}

module.exports = {
    mainMenu,
};