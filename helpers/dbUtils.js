// Import and require mysql2
const mysql = require('mysql2');
// Connect to database
function connectToDB() {
    const db = mysql.createConnection(
        {
            host: 'localhost',
            // MySQL username,
            user: 'root',
            //  MySQL password here
            password: '280480',
            database: 'company_db'
        },
        console.log(`Connected to the company_db database.`)
    );
    // Query database
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
    });
}
module.exports = {
    connectToDB
};