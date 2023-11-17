require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json()); 

app.use('/api', routes);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}, Try the API in Postman!`);
});

module.exports = {server,app};
