// Use the dotenv package, to create environment variables
// Create a constant variable, PORT, based on what's in process.env.PORT or fallback to 3000
require("dotenv").config();
const { PORT = 3000 } = process.env

// Import express, and create a server
const express = require('express');
const server = express();

// Require morgan and body-parser middleware
// Have the server use morgan with setting 'dev'
const morgan = require('morgan');
server.use(morgan('dev'));
server.use(express.json());

// Import cors 
// Have the server use cors()
const cors = require("cors");
server.use(cors());

// Have the server use your api router with prefix '/api'
const apiRouter = require('./api');
server.use('/api', apiRouter);

// Import the client from your db/index.js
const { client } = require('./db/client');
client.connect();

// Create custom 404 handler that sets the status code to 404.
server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
});

// Create custom error handling that sets the status code to 500
// and returns the error as an object
server.listen(PORT, () => {
  console.log('The server is up on port', PORT);
});