// const mysql = require('mysql2');

class Role {
    constructor(id, department_id, title, salary) {
      this.id = id;
      this.department_id = department_id;
      this.title = title;
      this.salary = salary;
    }
  }
    // Export Role module
    module.exports = Role;