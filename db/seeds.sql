 /* This code inserts 10 records to the department table  */
INSERT INTO department (name) VALUES
('Finance'),
('Human Resources'),
('Marketing'),
('Sales'),
('IT'),
('Operations'),
('Research and Development'),
('Customer Service'),
('Legal'),
('Administration');

select * from department;

 /* This code inserts 10 records to the role table  */
INSERT INTO role (department_id, title, salary) VALUES
(1, 'Finance Manager', 80000),
(1, 'Accountant', 50000),
(2, 'HR Manager', 70000),
(2, 'Recruiter', 45000),
(3, 'Marketing Manager', 90000),
(3, 'Marketing Specialist', 55000),
(4, 'Sales Manager', 85000),
(4, 'Sales Representative', 60000),
(5, 'IT Manager', 95000),
(5, 'Software Developer', 70000);

select * from role;

 /* This code inserts 10 records to the employee table  */
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Michael', 'Johnson', 3, 1),
('Emily', 'Williams', 4, 2),
('David', 'Brown', 5, 2),
('Jessica', 'Jones', 6, 3),
('Andrew', 'Taylor', 7, 3),
('Olivia', 'Davis', 8, 4),
('Daniel', 'Miller', 9, 4),
('Sophia', 'Wilson', 10, 5);

select * from employee;
