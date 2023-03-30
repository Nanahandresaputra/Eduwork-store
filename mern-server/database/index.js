const mongoose = require("mongoose");
// const { dbHost, dbPass, dbName, dbPort, dbUser } = require("../app/config");
const { dbUrl } = require("../app/config");

mongoose.connect(dbUrl);
const db = mongoose.connection;

module.exports = db;
