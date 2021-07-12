const config = require("./config.js");
const mysql = require('mysql');
const pool = mysql.createPool(config);

module.exports = pool;




