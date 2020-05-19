const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
//   connection.query("SELECT * FROM employee;", function(err, res) {
//     if (err) throw err;
//     console.table(res);
//     })
  start();
});

async function start() {
    try {
      const questions = await inquirer.prompt([
        {
          type: "list",
          message: "What would you like to do?",
          name: "startWhat",
          choices: [
              "View All Departments",
              "View All Roles",
              "View All Employees",
              "Add A Department",
              "Add A Role",
              "Add An Employee",
              "Delete A Department",
              "Delete A Role",
              "Delete An Employee",
              "--Exit--"
          ]
        }])
        .then(function(answer) {
            switch (answer.startWhat) {
            case "View All Departments":
              allDepartments();
              break;
      
            case "View All Roles":
              allRoles();
              break;
      
            case "View All Employees":
              allEmployees();
              break;
      
            case "Add A Department":
              addDept();
              break;

            case "Add A Role":
              addRole();
              break;

            case "Add An Employee":
              addEmploy();
              break;

            case "Delete A Department":
              delDept();
              break;

            case "Delete A Role":
              delRole();
              break;

            case "Delete An Employee":
              delEmploy();
              break;
      
            case "--Exit--":
              connection.end();
              break;
            }
          });

    } catch (err) {
      console.log(err);
    }
  }

  function allDepartments() {
    connection.query("SELECT * FROM department;", function(err, res) {
          if (err) throw err;
          console.table(res);
          start();
          });
  };

  function allRoles() {
    connection.query("SELECT * FROM role;", function(err, res) {
      if (err) throw err;
      console.table(res);
      start();
      })
};

function allEmployees() {
  connection.query("SELECT * FROM employee;", function(err, res) {
    if (err) throw err;
    console.table(res);
    start();
    })
};

function addDept() {
  inquirer
  .prompt([
    {
      name: "deptName",
      type: "input",
      message: "What is the name of the department that you would like to add?"
    }
  ])
  .then(function(answer) {
    connection.query(
      "INSERT INTO department SET ?", {"name": answer.deptName}, function(err) {
        if (err) throw err;
        console.log("Department added successfully!");
        start();
      }
    );
  });
}

function addRole() {
  inquirer
  .prompt([
    {
      name: "title",
      type: "input",
      message: "What is the title of the role you would like to add?"
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary for this title?"
    },
    {
      name: "dept",
      type: "input",
      message: "Which department does this role belong to?"
    },

  ])
  .then(function(answer) {
    answer.dept = answer.dept.toLowerCase();
    if (answer.dept = "engineering") {
      answer.dept = 1;
    } else if (answer.dept = "finance") {
      answer.dept = 2;
    } else if (answer.dept = "legal") {
      answer.dept = 3;
    } else if (answer.dept = "sales") {
      answer.dept = 4;
    } else if (answer.dept = "it") {
      answer.dept = 5;
    };

    connection.query(
      "INSERT INTO role SET ?", 
      {
        "title": answer.title, 
        salary: answer.salary, 
        department_id: answer.dept
      },
      function(err) {
        if (err) throw err;
        console.log("Role added successfully!");
        start();
      }
    );
  });
};

function addEmploy() {
  console.log("Function not built yet!");
}

function delDept() {
  connection.query("SELECT * FROM department;", function(err, res) {
    if (err) throw err;
    console.table(res);
    // });
    inquirer.prompt([
      {
        name: "deptID",
        type: "input",
        message: "Input the ID of the department that you would like to delete. (Warning: This will perform the delete)"
      },
    ])
    .then(function(answer) {
      connection.query(
        `DELETE FROM department WHERE id = ${parseInt(answer.deptID)}`, 
        function(err) {
          if (err) throw err;
          console.log("Department deleted successfully!");
          start();
        }
      );
    });
  });
}

function delRole() {
  connection.query("SELECT * FROM role;", function(err, res) {
    if (err) throw err;
    console.table(res);
    // });
    inquirer.prompt([
      {
        name: "roleID",
        type: "input",
        message: "Input the ID of the role that you would like to delete. (Warning: This will perform the delete)"
      },
    ])
    .then(function(answer) {
      connection.query(
        `DELETE FROM role WHERE id = ${parseInt(answer.roleID)}`, 
        function(err) {
          if (err) throw err;
          console.log("Role deleted successfully!");
          start();
        }
      );
    });
  });
}

function delEmploy() {
  connection.query("SELECT * FROM employee;", function(err, res) {
    if (err) throw err;
    console.table(res);
    // });
    inquirer.prompt([
      {
        name: "empID",
        type: "input",
        message: "Input the ID of the employee that you would like to delete. (Warning: This will perform the delete)"
      },
    ])
    .then(function(answer) {
      connection.query(
        `DELETE FROM employee WHERE id = ${parseInt(answer.empID)}`, 
        function(err) {
          if (err) throw err;
          console.log("Employee deleted successfully!");
          start();
        }
      );
    });
  });
}
