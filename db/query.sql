/*  File with queries */

SELECT * FROM department;
SELECT * FROM role;
 SELECT role.title AS Role, role.id AS ID, department.name AS Department, role.salary AS Salary FROM role JOIN department ON department.id = role.department_id;
SELECT * FROM employee;
SELECT employee.id AS EmployeeID, employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS JobTitle, department.name AS Department, IFNULL(role.salary, '--') AS Salary, CONCAT(IFNULL(manager.first_name, '--'), ' ', IFNULL(manager.last_name, '--')) AS Manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id ORDER BY employee.id;
INSERT INTO department (name) VALUES ('My Department');
INSERT INTO role (title, salary, department_id) VALUES ('president', 90000, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('myFirst', 'MyLast', 1, 1);
UPDATE employee SET role_id = 1 WHERE id = 2;
UPDATE employee SET manager_id = 2 WHERE id = 3;
SELECT * FROM employee WHERE manager_id = 2;
SELECT employee.* FROM employee join role on role.id = role_id join department on department.id = role.department_id where department.id = 1;
DELETE FROM department WHERE id = 3;
DELETE FROM role WHERE id = 3;
DELETE FROM employee WHERE id = 11;
SELECT SUM(role.salary) AS total_budget FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.id = 1;



SELECT employee.id AS EmployeeID, employee.first_name AS FirstName, employee.last_name AS LastName, manager.id AS ManagerID, CONCAT(IFNULL(manager.first_name, '--'), ' ', IFNULL(manager.last_name, '--')) AS Manager FROM employee LEFT JOIN employee AS manager ON employee.manager_id = manager.id;


select distinct manager.* from employee AS manager JOIN employee AS reporter ON manager.id= reporter.manager_id;

SELECT employee.id AS ManagerID, CONCAT(IFNULL(employee.first_name, '--'), ' ', IFNULL(employee.last_name, '--')) AS ManagerName FROM employee;

SELECT CONCAT(role.title, ' - ' , department.name) AS role, role.id AS id, department.name AS department, role.salary AS Salary FROM role JOIN department ON department.id = role.department_id;