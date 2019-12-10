const mysql = require("mysql");
const inquirer = require("inquirer");
var employeeArray = ["No Manager"];
var roleArray = [];
var query;
var mID;
var rID;

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

function runEDBM(){
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Add a department, role, or employee",
            "View a department, role, or employee",
            "Update an employee's role",
            "Exit"
        ]
    }).then(function(answer){
        switch (answer.action){
            case "Add a department, role, or employee":
                runAddAction();
                break;
            case "View a department, role, or employee":
                runViewAction();
                break;
            case "Update an employee's role":
                runUpdateAction();
                break;
            case "Exit":
                console.log("Thank you for using the employee database manager. Your session has ended.");
                connection.end();
        }
    });
}

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
                query = "SELECT * FROM department";
                connection.query(query, function(err, res){
                    if (err) throw err;
                    console.log("\n===========Department List===========");
                    for (var i = 0; i < res.length; i++) {
                        console.log(res[i].name)
                    }
                    console.log("\n");
                    runEDBM();
                });
                break;
            case "Employees":
                query = "SELECT * FROM employee INNER JOIN employeeDB.role ON employee.role_id = role.rID;";
                connection.query(query, function(err, res){
                    if (err) throw err;
                    console.log("\n===========Employee List===========");
                    for (var i = 1; i < res.length; i++) {
                        console.log(`Name: ${res[i].first_name} ${res[i].last_name} | Role: ${res[i].title} | Manager: ${res[res[i].manager_id-1].first_name} ${res[res[i].manager_id-1].last_name}`);
                    }
                    console.log("\n");
                    runEDBM();
                });
                break;
            case "Roles":
                query = "SELECT title, salary, name FROM department INNER JOIN employeeDB.role ON role.dept_id = department.id;";
                connection.query(query, function(err, res){
                    if (err) throw err;
                    console.log("\n===========Role List===========");
                    for (var i = 0; i < res.length; i++) {
                        console.log(`Title: ${res[i].title} | Salary: ${res[i].salary} | Department: ${res[i].name}`)
                    }
                    console.log("\n");
                    runEDBM();
                });
                break;
            case "Cancel":
                console.log("\n");
                runEDBM();
                break;
        }
    });
}

function runUpdateAction(){
    console.log("Update Action Goes Here");
    runEDBM();
}

function addDepartment(){
    inquirer.prompt({
        name: "newDepartment",
        type: "input",
        message: "What is the name of the department to be added?"
    }).then(function(answer){
        query = "INSERT INTO department (name) VALUES (?)"
        connection.query(query,answer.newDepartment,function(err, res){
            if (err) throw err;
            console.log("\n===========Department List===========");
            connection.query("SELECT * FROM department", function(err, res){
                if (err)  throw err;
                for (var i = 0; i < res.length; i++){
                    console.log(`${res[i].name}`)
                }
                console.log("\n");
                runEDBM();
            })
        })
    })
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
            choices: roleArray
        },
        {
            name: "newEmployeeManager",
            type: "list",
            choices: employeeArray
        }
    ]).then(function(answer){
        query = "select * from employee INNER JOIN employeeDB.role ON employee.role_id = role.rID";
        connection.query(query,function(err, res){
            if (err) throw err;
            for (var i = 0; i<res.length; i++){
                if (res[i].first_name + " " + res[i].last_name == answer.newEmployeeManager){
                    mID = res[i].id;
                }
                if (res[i].title == answer.newEmployeeRole){
                    rID = res[i].role_id;
                }
            }
            query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
            sql = [`${answer.newEmployeeFirst}`,`${answer.newEmployeeLast}`,`${rID}`,`${mID}`];
            connection.query(query, sql, function(err, res){
                if (err) throw err;
                console.log(`Employee Added.`)
            })        
            runEDBM();
        })
    })
}

// `"${answer.newEmployeeFirst}", "${answer.newEmployeeLast}", ${rID}, ${mID}`

// function insertEmployee(){
//     query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)";
//     sql = `"${first_name}", "${last_name}", ${rID}, ${mID}`;
//     connection.query(query, sql, function(err, res){
//         if (err) throw err;
//         console.log(`Employee Added.`)
//         console.log("\n===========Employee List===========");
//                     for (var i = 1; i < res.length; i++) {
//                         console.log(`Name: ${res[i].first_name} ${res[i].last_name} | Role: ${res[i].title} | Manager: ${res[res[i].manager_id-1].first_name} ${res[res[i].manager_id-1].last_name}`);
//                     }
//                     console.log("\n");
//     })
// }

function renderEmployees(){
    employeeArray = ["No Manager"];
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