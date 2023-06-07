/*  File with queries */

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
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
