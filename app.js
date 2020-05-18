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
  console.log(connection.threadId);
  connection.query("SELECT * FROM employee;", function(err, res) {
    if (err) throw err;
    console.table(res);
    })
//   start();
});

// function