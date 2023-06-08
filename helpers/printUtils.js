// Connect table module to draft tables in the terminal
const { table } = require('table');
// Connect inquirer package
const inquirer = require('inquirer');

// config for table
const config = {
    border: {
        topBody: `─`,
        topJoin: `┬`,
        topLeft: `┌`,
        topRight: `┐`,

        bottomBody: `─`,
        bottomJoin: `┴`,
        bottomLeft: `└`,
        bottomRight: `┘`,

        bodyLeft: `│`,
        bodyRight: `│`,
        bodyJoin: `│`,

        joinBody: `─`,
        joinLeft: `├`,
        joinRight: `┤`,
        joinJoin: `┼`
    }
};

// This function drafts table in the terminal to represent values from array parameter data
async function showTable(data) {
    let tableData = [];
    // option 1 fancy one line table data format
    tableData = [
        //column
        Object.keys(data[0]),
        //values
        ...data.map(val => Object.values(val))];

    // prompt is a promise based function
    const answers = await inquirer.prompt([
        {
            message: "\n" + table(tableData, config),
            type: 'input',
            name: 'name'
        }
    ]);
}
// ToDO - Call the drawBanner function
// drawBanner();

//Export for all module functions
module.exports = {
    showTable
};