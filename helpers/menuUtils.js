// Connect inquirer package
const inquirer = require('inquirer');
const Department = require('../objects/department');
const Employee = require('../objects/employee');
const Role = require('../objects/role');
const { showTable } = require('./printUtils');

// Connect Database module
const { fetchDataFromDB, getAllDepartments, getAllRoles, getAllEmployee, deleteRole } = require('./dbUtils');
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
    const managerId = answers.managerName === "No Manager" ? null : managerData.find(managerData => managerData.name === answers.managerName)?.id;

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
    const newRole = { roleId: roleId, id: employeeId };
    return newRole;
}
async function promptDepartmentId() {
    const departmentData = await getAllDepartments();
    const departmentNames = departmentData.map(obj => obj.name);
    const answers = await inquirer.prompt(
        [{
            type: 'list',
            name: 'departmentName',
            message: 'Choose a department',
            choices: departmentNames,
        }]
    );
    const id = departmentData.find(departmentData => departmentData.name === answers.departmentName)?.id;
    const depObj = { name: answers.departmentName, id: id }
    return depObj;
}
async function promptRoleId() {
    const roleData = await getAllRoles();
    const roleNames = roleData.map(row => row.role);
    const answers = await inquirer.prompt(
        [{
            type: 'list',
            name: 'roleName',
            message: 'Choose a role',
            choices: roleNames,
        }]
    );
    const roleId = roleData.find(roleData => roleData.role === answers.roleName)?.id;
    const RoleObj = { name: answers.roleName, id: roleId }
    return RoleObj;
}
async function promptEmployeeId() {
    const employeeData = await getAllEmployee();
    const employeeNames = employeeData.map(obj => obj.name);
    const answers = await inquirer.prompt(
        [{
            type: 'list',
            name: 'employeeName',
            message: 'Choose employee to delete',
            choices: employeeNames,
        }]
    );
    const employeeId = employeeData.find(employeeData => employeeData.name === answers.employeeName)?.id;
    const employeeObj = { name: answers.employeeName, id: employeeId }
    return employeeObj;
}
async function promptManagerId() {
    const managerData = await getAllEmployee();
    const managerNames = managerData.map(obj => obj.name);
    const answers = await inquirer.prompt(
        [{
            type: 'list',
            name: 'managerName',
            message: 'Choose manager',
            choices: managerNames,
        }]
    );
    const managerId = managerData.find(managerData => managerData.name === answers.managerName)?.id;
    const managerObj = { name: answers.managerName, id: managerId }
    return managerObj;
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
        'View employees by manager',
        'View employees by department',
        'Delete department',
        'Delete role',
        'Delete employee',
        'View the total utilized budget of a department',
        'Quit',
    ];
    const sqlQueries = {
        'View all departments': 'SELECT * FROM department;',
        'View all roles': `SELECT role.title AS Role, role.id AS ID, IFNULL(department.name, '--') AS Department, role.salary AS Salary FROM role Left JOIN department ON department.id = role.department_id;`,
        'View all employees': `SELECT employee.id AS EmployeeID, employee.first_name AS FirstName, employee.last_name AS LastName, IFNULL(role.title, '--') AS JobTitle, IFNULL(department.name, '--') AS Department, IFNULL(role.salary, '--') AS Salary, CONCAT(IFNULL(manager.first_name, '--'), ' ', IFNULL(manager.last_name, '--')) AS Manager FROM employee Left JOIN role ON employee.role_id = role.id Left JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id ORDER BY employee.id;`,
        'Add a department': 'INSERT INTO department (name) VALUES (?);',
        'Add a role': 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);',
        'Add an employee': 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);',
        'Update employee role': 'UPDATE employee SET role_id = ? WHERE id = ?;',
        'Update employee managers': 'UPDATE employee SET manager_id = ? WHERE id = ?;',
        'View employees by manager': `SELECT employee.id AS EmployeeID, employee.first_name AS FirstName, employee.last_name AS LastName, IFNULL(role.title, '--') AS JobTitle, IFNULL(department.name, '--') AS Department, IFNULL(role.salary, '--') AS Salary, CONCAT(IFNULL(manager.first_name, '--'), ' ', IFNULL(manager.last_name, '--')) AS Manager FROM employee Left JOIN role ON employee.role_id = role.id Left JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id  where employee.manager_id = ? ORDER BY employee.id`,
        'View employees by department': `SELECT employee.first_name AS FirstName, employee.last_name AS LastName, IFNULL(role.title, '--') AS JobTitle, IFNULL(department.name, '--') AS Department FROM employee left join role on role.id = role_id left join department on department.id = role.department_id where department.id = ?;`,
        'Delete department': 'DELETE FROM department WHERE id = ?;',
        'Delete Role': `BEGIN; UPDATE employee SET role_id = NULL WHERE role_id = ?; DELETE FROM role WHERE id = ?; COMMIT;`,
        'Delete employee': 'DELETE FROM employee WHERE id = ?;',
        'View the total utilized budget of a department': `SELECT IFNULL(SUM(role.salary),'0') AS total_budget FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.id = ?;`,
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
            // 'Update employee managers',
            case 'View employees by manager':
                sqlArgs = await promptManagerId();
                const viewEmployeesByManager = await fetchDataFromDB(sqlQuery, sqlArgs.id);
                showTable(viewEmployeesByManager);
                await mainMenu();
                break;               
            case 'View employees by department':
                sqlArgs = await promptDepartmentId();
                const viewEmployeesByDepartment = await fetchDataFromDB(sqlQuery, sqlArgs.id);
                showTable(viewEmployeesByDepartment);
                await mainMenu();
                break;            
            case 'Delete department':
                sqlArgs = await promptDepartmentId();
                message = `<${sqlArgs.name}> department was deleted. Select View all departments option to see it.`;
                const deleteDepartment = await fetchDataFromDB(sqlQuery, sqlArgs.id, message);
                await mainMenu();
                break;
            case 'Delete role':
                sqlArgs = await promptRoleId();
                message = `<${sqlArgs.name}> role was deleted. Select View all roles option to see it.`;
                const roleDeleted = await deleteRole(sqlArgs.id, message);
                await mainMenu();
                break;    
                case 'Delete employee':
                    sqlArgs = await promptEmployeeId();
                    message = `<${sqlArgs.name}> employee was deleted. Select View all employees option to see it.`;
                    const deleteEmployee = await fetchDataFromDB(sqlQuery, sqlArgs.id, message);
                    await mainMenu();
                    break;       
            case 'View the total utilized budget of a department':
                sqlArgs = await promptDepartmentId();
                message = ''; //`<${sqlArgs.name}> department's budget is below:`;
                const budgetArray = await fetchDataFromDB(sqlQuery, sqlArgs.id, message);
                const budgetValue = [{ Department: sqlArgs.name, Budget: budgetArray[0].total_budget }]
                showTable(budgetValue);
                await mainMenu();
                break;                       
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