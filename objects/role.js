// Connect Shape module with the parent constructor
const Table = require('./table');

class Role extends Table {
  constructor(departmentId, title, salary) {
    const fields = [
      'id INT NOT NULL AUTO_INCREMENT',
      'department_id INT',
      'title VARCHAR(30) NOT NULL',
      'salary DECIMAL',
      'PRIMARY KEY (id)',
      'FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL'
    ];
    super('role', fields);
    this.departmentId = departmentId;
    this.title = title;
    this.salary = salary;
  }
}
    // Export Role module
    module.exports = Role;