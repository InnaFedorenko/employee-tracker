// Connect Shape module with the parent constructor
const Table = require('./table');
// Constructor for department
class Department extends Table {
  constructor(fields) {
    super('department', fields);
    const {id, name} = this.fields
  }
}
  // Export Department module
  module.exports = Department;