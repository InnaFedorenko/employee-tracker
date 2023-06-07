// Connect Shape module with the parent constructor
const Table = require('./table');

class Employee extends Table {
    constructor(firstName, lastName, roleId, managerId) {
      const fields = [
        'id INT NOT NULL AUTO_INCREMENT',
        'first_name VARCHAR(30) NOT NULL',
        'last_name VARCHAR(30) NOT NULL',
        'role_id INT',
        'manager_id INT',
        'PRIMARY KEY (id)',
        'FOREIGN KEY (role_id) REFERENCES role(id)',
        'FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL'
      ];
      super('employee', fields);
      this.firstName = firstName;
      this.lastName = lastName;
      this.roleId = roleId;
      this.managerId = managerId;
    }
  }

    // Export Department module
    module.exports = Employee;