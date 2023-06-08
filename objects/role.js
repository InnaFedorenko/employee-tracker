// Connect Shape module with the parent constructor
const Table = require('./table');
// Constructor for role
class Role extends Table {
  constructor(fields) {
    //const fields = ['id','department_id','title','salary'];
    super('role', fields);
    const {id, title, salary, department_id} = this.fields
  }
}
    // Export Role module
    module.exports = Role;