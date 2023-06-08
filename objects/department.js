// Connect Shape module with the parent constructor
const Table = require('./table');

class Department extends Table {
  constructor(fields) {
    super('department', fields);
    const {id, name} = this.fields
  }
}
  // Export Department module
  module.exports = Department;