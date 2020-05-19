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
          type: "rawlist",
          message: "What would you like to do?",
          name: "startWhat",
          choices: [
              "View All Departments",
              "View All Roles",
              "View All Employees",
              "Add A Department",
              "Add A Role",
              "Add An Employee",
              "Exit"
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
      
            case "Exit":
              connection.end();
              break;
            }
          });
      // console.log(questions);
    //   const userInfo = await api.getUser(questions.username);
    //   questions.email = userInfo.email;
    //   questions.profilePic = userInfo.avatar_url;
    //   const answers = generateMarkdown(questions);
    //   fs.writeFile(filename, answers, function () {
    //     console.log("Successfully generated README.md file!");
    //   });
    } catch (err) {
      console.log(err);
    }
  }

  function allDepartments() {
    connection.query("SELECT * FROM department;", function(err, res) {
          if (err) throw err;
          console.table(res);
          })
  };

  function allRoles() {
    connection.query("SELECT * FROM role;", function(err, res) {
      if (err) throw err;
      console.table(res);
      })
};

function allEmployees() {
  connection.query("SELECT * FROM employee;", function(err, res) {
    if (err) throw err;
    console.table(res);
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

function allEmployees() {
  connection.query("SELECT * FROM employee;", function(err, res) {
    if (err) throw err;
    console.table(res);
    })
};

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

