//Import and require express
const express = require('express');

function connectToServer (){
// gets port number from heroku (env.PORT)
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); //extended false for not-encode user's input


// ToDo

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = {
    connectToServer
};