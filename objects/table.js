
class Table {
    constructor(name, fields) {
      this.name = name;
      this.fields = fields;
    }
  
    // Method to select records from the table
    select() {
      console.log(`SELECT * FROM ${this.name}`);
    }
    // Method to delete records from the table
    delete() {
      console.log(`DELETE FROM ${this.name}`);
    }
    // Method to update records in the table
    update() {
      console.log(`UPDATE ${this.name} SET ...`);
    }
    // Method to insert records into the table
    insert() {
      console.log(`INSERT INTO ${this.name} VALUES (...)`);
    }
  }

  // Export Department module
  module.exports = Table;
  