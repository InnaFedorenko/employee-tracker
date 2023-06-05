//Import and require express
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');


// const routes = require('./routes');

// gets port number from heroku (env.PORT)
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); //extended false?

// app.use(express.static('public'));
// app.use(routes);

// app.listen(PORT, ()=>{
//   console.log("listening at http://localhost:" + PORT);
// });

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '280480',
    database: 'company_db'
  },
  console.log(`Connected to the movies_db database.`)
);







// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});