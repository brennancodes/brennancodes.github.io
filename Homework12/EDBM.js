//==========================================================================================================================================
//==Variables and required packages=========================================================================================================
//==========================================================================================================================================

const mysql = require("mysql");
const inquirer = require("inquirer");
const {table} = require("table");
var employeeArray = [];
var managerArray = ["No Manager"];
var roleArray = [];
var departmentArray = [];
var query;
var mID;
var rID;

//==========================================================================================================================================
//==Establishing Connection=================================================================================================================
//==========================================================================================================================================

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employeeDB"
});

connection.connect(function(err){
    if (err) throw err;
    runEDBM();
});

//==========================================================================================================================================
//==Program START function==================================================================================================================
//==========================================================================================================================================

function runEDBM(){
    renderEmployees();
    renderEmployeesNoMan();
    renderRoles();
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View a department, role, or employee",
            "Add a department, role, or employee",
            "Update an employee's role",
            "Exit"
        ]
    }).then(function(answer){
        switch (answer.action){
            case "View a department, role, or employee":
                runViewAction();
                break;
            case "Add a department, role, or employee":
                runAddAction();
                break;
            case "Update an employee's role":
                runUpdateAction();
                break;
            case "Exit":
                console.log("\nThank you for using the employee database manager. Your session has ended.\n");
                connection.end();
        }
    });
}

//==========================================================================================================================================
//==Primary ADD function (departments, employees, roles)====================================================================================
//==========================================================================================================================================

function runAddAction(){
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to add to the database?",
        choices: [
            "Department",
            "Employee",
            "Role",
            "Cancel"
        ]
    }).then(function(answer){
        switch (answer.action){
            case "Department":
                addDepartment();
                break;
            case "Employee":
                addEmployee();
                break;
            case "Role":
                addRole();
                break;
            case "Cancel":
                runEDBM();
                break;
        }
    });
}

//==========================================================================================================================================
//==Primary VIEW function (departments, employees, roles)===================================================================================
//==========================================================================================================================================

function runViewAction(){
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to view from the database?",
        choices: [
            "Departments",
            "Employees",
            "Roles",
            "Cancel"
        ]
    }).then(function(answer){
        switch (answer.action){
            case "Departments":
                viewDepartments();
                break;
            case "Employees":
                viewEmployees();
                break;
            case "Roles":
                viewRoles();
                break;
            case "Cancel":
                console.log("\n");
                runEDBM();
                break;
        }
    });
}

//==========================================================================================================================================
//==Primary UPDATE function (employee role)=================================================================================================
//==========================================================================================================================================

function runUpdateAction(){
    inquirer.prompt([
        {
            name: "empUpdate",
            type: "list",
            message: "Which employee would you like to update?",
            choices: employeeArray
        },
        {
            name: "roleUpdate",
            type: "list",
            message: "What is their updated role?",
            choices: roleArray
        }
    ]).then(function(answer){
        var empSplit = answer.empUpdate.split(" ");
        query = "SELECT * FROM role WHERE title = ?";
        sql = answer.roleUpdate;
        connection.query(query, sql, function(err, res){
            if (err) throw err;
            var newID = res[0].rID;
            query = "UPDATE employee SET role_id = ? WHERE first_name = ? and last_name = ?"
            sql = [newID, empSplit[0],empSplit[1]];
            connection.query(query, sql, function(err,res){
                if (err) throw err;
                viewEmployees();
            })
        })
    })
}

//==========================================================================================================================================
//==Secondary VIEW functions================================================================================================================
//==========================================================================================================================================

function viewDepartments(){
    query = "SELECT * FROM department";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.log("\n======= Department List =======");
        let departmentTable = [['id','Department']],
        output,
        options;
        for (var i = 0; i < res.length; i++) {
            
            departmentTable.push([`${res[i].id}`, `${res[i].name}`])
            
        };
        options = {
            columns: {
                0: {
                    width: 4
                },
                1: {
                    width: 20
                }
            }
        }
            
        output = table(departmentTable, options);

        console.log(output);
        console.log("\n");
        runEDBM();
    });
}



function viewEmployees(){
    query = "SELECT * FROM employee INNER JOIN employeeDB.role ON employee.role_id = role.rID;";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.log("\n==================================== Employee List ====================================");
        let employeeTable = [['Name','Role','Salary','Manager']],
        output,
        options;
        for (var i = 0; i < res.length; i++) {
            if (!res[i].manager_id) {
                managerName = "None";
            }
            else if (res[i].manager_id) {
                targetID = res[i].manager_id;
                for (var x = 0; x < res.length; x++){
                    if (res[x].id == targetID){ 
                        managerName = `${res[x].first_name} ${res[x].last_name}`
                    }
                }
            }
            employeeTable.push([`${res[i].first_name} ${res[i].last_name}`, `${res[i].title}`, `$${res[i].salary}`, managerName])
            
            
        };
        options = {
            columns: {
                0: {
                    width: 20
                },
                1: {
                    width: 24
                },
                2: {
                    width: 10
                },
                3: {
                    width: 20
                }
            }
        }
            
        output = table(employeeTable, options);

        console.log(output);
        console.log("\n");
        runEDBM();
        })
}

function viewRoles(){
    query = "SELECT title, salary, name FROM department INNER JOIN employeeDB.role ON role.dept_id = department.id ORDER BY salary DESC;";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.log("\n============================ Role List ============================");
        let roleTable = [['Title','Salary','Department']],
        output,
        options;
        for (var i = 0; i < res.length; i++) {
            
            roleTable.push([`${res[i].title}`, `$${res[i].salary}`, `${res[i].name}`])
            
        };
        options = {
            columns: {
                0: {
                    width: 24
                },
                1: {
                    width: 10
                },
                2: {
                    width: 23
                }
            }
        }
            
        output = table(roleTable, options);
        console.log(output);
        console.log("\n");
        runEDBM();
    });
}

//==========================================================================================================================================
//==Secondary ADD functions=================================================================================================================
//==========================================================================================================================================

function addDepartment(){
    inquirer.prompt({
        name: "newDepartment",
        type: "input",
        message: "What is the name of the department to be added?"
    }).then(function(answer){
        query = "INSERT INTO department (name) VALUES (?)"
        connection.query(query,answer.newDepartment,function(err, res){
            if (err) throw err;
            viewDepartments();
            });
        });
}

function addEmployee(){
    renderEmployees();
    renderRoles();
    inquirer.prompt([
        {
            name: "newEmployeeFirst",
            type: "input",
            message: "What is the new employee's first name?"
        },
        {
            name: "newEmployeeLast",
            type: "input",
            message: "What is the new employee's last name?"
        },
        {
            name: "newEmployeeRole",
            type: "list",
            message: "What is their role?",
            choices: roleArray
        },
        {
            name: "newEmployeeManager",
            type: "list",
            message: "Who is their manager?",
            choices: managerArray
        }
    ]).then(function(answer){
        query = "select * from role LEFT JOIN employeeDB.employee ON employee.role_id = role.rID";
        connection.query(query,function(err, res){
            if (err) throw err;
            for (var i = 0; i<res.length; i++){
                if (answer.newEmployeeManager == "No Manager"){
                    mID = null;
                }
                else if (res[i].first_name + " " + res[i].last_name == answer.newEmployeeManager){
                    mID = res[i].id;
                }
                if (res[i].title == answer.newEmployeeRole){
                    rID = res[i].rID;
                }
            }
            query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
            sql = [`${answer.newEmployeeFirst}`,`${answer.newEmployeeLast}`,`${rID}`,mID];
            connection.query(query, sql, function(err, res){
                if (err) throw err;
                console.log(`Employee Added.`);
                query = "SELECT * FROM employee INNER JOIN employeeDB.role ON employee.role_id = role.rID;";
                connection.query(query, function(err, res){
                    if (err) throw err;
                    viewEmployees();
                });
            });
        })
    })
}

function addRole(){
    renderDepts();
    inquirer.prompt([
        {
            name: "newRoleTitle",
            type: "input",
            message: "What new role should be added to the database?"
        },
        {
            name: "newRoleSalary",
            type: "number",
            message: "What is the salary of the new role?"
        },
        {
            name: "newRoleDept",
            type: "list",
            message: "What department does the new role belong to?",
            choices: departmentArray
        }
    ]).then(function(answer){
        query = "select * from department LEFT JOIN employeeDB.role ON role.dept_id = department.id WHERE name = ?";
        sql = answer.newRoleDept;
        connection.query(query, sql, function(err, res){
            if (err) throw err;
            var dID = res[0].id;
            query = "INSERT INTO role (title, salary, dept_id) VALUES (?, ?, ?)"
            connection.query(query,[answer.newRoleTitle, answer.newRoleSalary, dID], function(err, res){
                if (err) throw err;
                console.log("\nThe new role has been added to the database.\n")
                viewRoles();
            })
        })
    })
}

//==========================================================================================================================================
//==Array filling functions=================================================================================================================
//==========================================================================================================================================

function renderEmployees(){
    managerArray = ["No Manager"];
    query = "select * from employee";
    connection.query(query,function(err, res){
        if (err) throw err;
        for (var i = 0; i < res.length; i++){
            managerArray.push(`${res[i].first_name} ${res[i].last_name}`);
        }
    })
}

function renderEmployeesNoMan(){
    employeeArray = [];
    query = "select * from employee";
    connection.query(query,function(err, res){
        if (err) throw err;
        for (var i = 0; i < res.length; i++){
            employeeArray.push(`${res[i].first_name} ${res[i].last_name}`);
        }
    })
}

function renderRoles(){
    query = "select * from role";
    connection.query(query,function(err, res){
        if (err) throw err;
        for (var i = 0; i < res.length; i++){
            roleArray.push(`${res[i].title}`);
        }
    })
}

function renderDepts(){
    query = "select * from department";
    connection.query(query,function(err, res){
        if (err) throw err;
        for (var i = 0; i < res.length; i++){
            departmentArray.push(`${res[i].name}`);
        }
    })
}

//Get rekt Ashley