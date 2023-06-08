// Connect inquirer package
const inquirer = require('inquirer');
const Department = require('../objects/department');
const Employee = require('../objects/employee');
const Role = require('../objects/role');
const { showTable } = require('./printUtils');

// Connect Database module
const dbUtils = require('./dbUtils');
// Prompt for employee details

async function promptDepartment() {
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
    const departmentData = await dbUtils.fetchDataFromDB('SELECT * FROM department');
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
    console.log (`answers: ${JSON.stringify(answers)}`);
    const departmentId = departmentData.find(departmentData => departmentData.name === answers.departmentName)?.id;   
    console.log(`departmentId - ${departmentId}`) 
    const role = new Role ({title:answers.title, salary: answers.salary, department_id:departmentId});
   return role.fields;
}
async function mainMenu() {
    const menuItems = [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        // 'Add an employee',
        // 'Update employee role',
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
        'View all employees': `SELECT employee.id AS EmployeeID, employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS JobTitle, department.name AS Department, IFNULL(role.salary, '--') AS Salary, CONCAT(IFNULL(manager.first_name, '--'), ' ', IFNULL(manager.last_name, '--')) AS Manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id;`,
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
                sqlArgs = await promptDepartment();
                message = `<${sqlArgs}> department was added. Select View all departments option to see it.`;
                const department = await dbUtils.fetchDataFromDB(sqlQuery, sqlArgs,message);
                //console.log('\x1b[32m%s\x1b[0m',`<${sqlArgs}> department was added. Select View all departments option to see it.`);            
                await mainMenu();
                break;
                case 'Add a role':
                    //to enter the name, salary, and department for the role and that role is added to the database
                    sqlArgs = Object.values(await promptRoles());
                    message = `<${sqlArgs}> role was added. Select View all roles option to see it.`;
                    const role = await dbUtils.fetchDataFromDB(sqlQuery, sqlArgs,message);          
                    await mainMenu();
                    break;                
            // Handle other menu options
            case 'Quit':
                console.log('\x1b[33m%s\x1b[0m', 'Goodbye!');
                break;
            default:
                // Run the SQL query based on the selected menu item
                console.log('Running query:', sqlQuery);
                const dbData = await dbUtils.fetchDataFromDB(sqlQuery, sqlArgs);
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