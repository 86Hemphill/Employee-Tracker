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
              break;
      
            case "View All Roles":
              break;
      
            case "View All Employees":
              break;
      
            case "Add A Department":
              break;

            case "Add A Role":
              break;

            case "Add An Employee":
              break;
      
            case "Exit":
              connection.end();
              break;
            }
          });
      console.log(questions);
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