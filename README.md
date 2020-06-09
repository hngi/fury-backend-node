#microservice for managing employee data

Developed by Team-fury

Folder structure:
models:
----Employee.js:
---------Contains the class schema for referencing how employee data will be stored in databse
routes:
api.js: Contains the various routes specified in the project and they include:
----/employees : GET route to get all employee data
----/employees : POST route to create new employee data
----/employee/:id : GET route to get infromation about a specific employee (will be protected)
----/employee/:id : DELETE route to delete employee from database
----/employee/:id : PATCH route to update employee data
----/department/ : GET route to get all departments
----/department/:dept : GET route to get all employees in a single department
----/position : GET route to get all heads of department

utilities:
----validors.js: will handle data validation

app.js: This is the configuration and initialization point of this API.

server.js: This is the entry point of the application

#This doc will be removed soon and it only serves as a guide line to understanding this project folder.
