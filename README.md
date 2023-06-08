# Employee Tracker
## Table of Contents
- [Description](#description)
- [Installation]( #installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions) 
##  Description
- The Employee Tracker Tool was developed by [Inna Fedorenko](https://github.com/InnaFedorenko).
- [GiHub Link](https://github.com/InnaFedorenko/employee-tracker)
- [Video recording]( )
- Date: 06-08-2023

### Command-line application to manage a company's employee databasecommand-line application from scratch to manage a company's employee databasecommand-line application from scratch to manage a company's employee database.

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employeeâ€™s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```
## Bonus
```md
Additional functionality, such as the ability to do the following:
* Update employee managers.
* View employees by manager.
* View employees by department.
* Delete departments, roles, and employees.
* View the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department.
```

##  Installation
1. Install and use Inquirer version 8.2.4. To do so, use the following command in your project folder: `npm i inquirer@8.2.4`.
2. Install mysql2 package using `nmp i mysql` command
3. Install `npm i table`
4. Login to mysql terminal using `mysql -u root -p ` command, follow the instruction and enter your root user password
5. Execute schema.sql file to create database and tables by using `source schema.sql` command
6. Execute seeds.sql file to pre-populate data in the tables by using `source seeds.sql` command
7. Optional: Review and execute query.sql file to better understand sql queries used in the application
8. Exit sql mode using `Exit` command


##  Usage
1. Exit sql mode and open integrated terminal in the main project folder
2. Start program by executing `node index`
3. Choose items from the menu.
4. To exit application select `Quit` from the menu

For more details please review the video.

## License
![License](https://img.shields.io/badge/License-MIT-yellow.svg)  
  This application is covered under the [MIT License](https://opensource.org/licenses/MIT).

##  Contributing
Contributions are welcome!

##  Tests
Test were not implemented for this project.

##  Questions
If you have any questions, you can reach out to [me](https://github.com/InnaFedorenko) at 
[ivf.fedorenko@gmail.com](mailto:ivf.fedorenko@gmail.com).