// build and export your unconnected client here
require("dotenv").config();
const { Client } = require('pg');
const client = new Client(
  process.env.DATABASE_URL || {
    user: "postgres",
    password: "@nnaCole1994",
    database: "fitness",
  }
);

console.log(client)
module.exports = client;
