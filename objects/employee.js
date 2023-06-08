// Connect Shape module with the parent constructor
const Table = require('./table');
// Constructor for employee
class Employee extends Table {
    constructor(fields) {
      super('employee', fields);
      const {id, first_name, last_name, role_id, manager_id} = this.fields
    }
  }

    // Export Department module
    module.exports = Employee;