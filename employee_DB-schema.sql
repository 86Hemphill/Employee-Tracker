DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department (id),
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Engineering"), ("Finance"), ("Legal"), ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 4), ("Salesperson", 80000, 4), 
("Lead Engineer", 150000, 1), ("Software Engineer", 120000, 1), 
("Accountant", 125000, 2), ("Legal Team Lead", 250000, 3), ("Lawyer", 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 3),
("Mike", "Chan", 2, 1),
("Ashley", "Rodriguez", 3, NULL),
("Kevin", "Tupik", 4, 3),
("Malia", "Brown", 5, NULL),
("Sarah", "Lourd", 6, NULL),
("Tom", "Allen", 7, 6);

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;
