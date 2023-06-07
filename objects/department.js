// Connect Shape module with the parent constructor
const Table = require('./table');

class Department extends Table {
  constructor(name) {
    const fields = ['id INT NOT NULL AUTO_INCREMENT', 'name VARCHAR(30) NOT NULL', 'PRIMARY KEY (id)'];
    super('department', fields);
    this.name = name;
  }
}
  // Export Department module
  module.exports = Department;