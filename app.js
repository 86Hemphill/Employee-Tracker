const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "86Brewer",
  database: "employee_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});
