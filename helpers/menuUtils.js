// Connect inquirer package
const inquirer = require('inquirer');

// Connect Database module
const dbUtils = require ('./dbUtils');

function showMenuItems (){
    console.log("connected to menu.lib")
        // view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
    const menuItems = [
        {
            type: 'list',
            name: 'menuItem',
            message: 'Please select the option:',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department','Add a role', 'Add an employee', 'Update an employee role', 'Exit'],
        }
    ];
    // console.log(menuItems)
        inquirer.prompt(menuItems).then(selectMenuItem);
}
function selectMenuItem (data) {
    // console.log('data' +  JSON.stringify(data));
    const menuItem =data.menuItem;
    console.log(menuItem);
    process.exit();
}
module.exports = {
    showMenuItems,
    selectMenuItem
};