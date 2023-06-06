/* 
* This file contains code to create company_db database with 3 tables: department, roles and employee
* department: table contains list of department, with the following fields
*     id  - integer, department id, auto increment
*     name - string with max 30 symbols, department name, can not be null
* role: table contains list of roles with salaries values
*     id - integer, role id, auto increment
*     department_id - int, can not be null, foreign key to connect role table with the department table
*     title - string with max 30 symbols, role title, can not be null
*     salary - decimal, role target salary
* employee: table contains the list of employee with their roles and manager info
*     id  - integer, employee id, auto increment
*     first_name - string with max 30 symbols, employee first name, can not be null
*     last_name - string with max 30 symbols, employee last name, can not be null
*     role_id - int, can not be null, foreign key to connect employee table with the role table
*     manager_id - int, can not be null, foreign key to connect employee table with the employee table to define who is employee manager (org-chart) */

DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    department_id INT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
); 

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT, 
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id)
    REFERENCES role(id),
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
); 