const { table } = require('table');
const inquirer = require('inquirer');


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
  async function showTable (data){
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

module.exports = {
    showTable
};