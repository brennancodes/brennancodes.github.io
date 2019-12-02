const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const appendFile = util.promisify(fs.appendFile);
const managers = [];
const engineers = [];
const interns = [];

function beginBuild() {
    console.log("Let's create your team, starting with the manager.");
    inquirer. prompt([
        {
            type: "input",
            name: "name",
            message: "What is the manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the manager's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the manager's e-mail address?"
        },
        {
            type: "input",
            name: "officeNum",
            message: "What is the manager's office number?"
        }
    ]).then(function(manager){
        console.log(`The manager's name is ${manager.name}. \nTheir employee ID is ${manager.id}. \nTheir email address is ${manager.email}. \nTheir office number is ${manager.officeNum}.`)
        const newManager = new Manager(manager.name, manager.id, manager.email, manager.officeNum)
        managers.push(newManager);
        console.log(managers);
        selectEmployee();
    })
}

function selectEmployee(){
    inquirer.prompt([
        {
            type: "list",
            name: "employeeType",
            message: "What is the next employee's designation?",
            choices: ["Engineer", "Intern", "I'm done adding team members."]
        }
    ]).then(function(answer){
        switch (answer.employeeType){
            case "Engineer":
                buildEngineer();
                break;
            case "Intern":
                buildIntern();
                break;
            default: 
                writePage();
                console.log("Done!"); 
            //We may need to use previous cases to write and append the HTML for each one, then use this one to actually build the file. Idk.
        }
    })
}

function buildEngineer(){
    inquirer. prompt([
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the engineer's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's e-mail address?"
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's github username?"
        }
    ]).then(function(engineer){
        console.log(`The engineer's name is ${engineer.name}. \nTheir employee ID is ${engineer.id}. \nTheir email address is ${engineer.email}. \nTheir github username is ${engineer.github}.`)
        const newEngineer = new Engineer(engineer.name, engineer.id, engineer.email, engineer.github)
        engineers.push(newEngineer);
        console.log(engineers);
        selectEmployee();
    })
}

function buildIntern(){
    inquirer. prompt([
        {
            type: "input",
            name: "name",
            message: "What is the intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's e-mail address?"
        },
        {
            type: "input",
            name: "school",
            message: "What school is the intern attending?"
        }
    ]).then(function(intern){
        console.log(`The manager's name is ${intern.name}. \nTheir employee ID is ${intern.id}. \nTheir email address is ${intern.email}. \nThey are currently attending ${intern.school}.`)
        const newIntern = new Intern(intern.name, intern.id, intern.email, intern.school)
        interns.push(newIntern);
        console.log(interns);
        selectEmployee();
    })
}

//Employee Super Class
class Employee {
    constructor(name, id, title, email) {
    this.name = name;
    this.id = id;
    this.title = title;
    this.email = email;
    }
    getName(){
        console.log(`Name: ${this.name}`)
    }
    getId(){
        console.log(`Employee ID: ${this.id}`)
    }
    getEmail(){
        console.log(`E-mail: ${this.email}`);
    }
    getRole(){
        console.log(`Title: ${this.title}`);
    }
}

//Manager Subclass
class Manager extends Employee {
    constructor(name, id, email, officeNum) {
        super(name, id, "Manager", email)
        this.email = email;
        this.officeNum = officeNum;
    }
    getRole(){
        console.log(`Title: ${this.title}`);
    }
}

// Engineer Subclass
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, "Engineer", email)
        this.email = email;
        this.github = github;
    }
    getGithub(){
        console.log(`Github: ${this.github}`);
    }
    getRole(){
        console.log(`Title: ${this.title}`);
    }
}

// Intern Subclass
class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, "Intern", email)
        this.email = email;
        this.school = school;
    }
}

async function writePage(){
    writeFile("test.html", `<!DOCTYPE html>
    <html lang="en-us">
        <head>
            <title>Dev Team</title>
            <meta name="viewport" content="width=device-width, initial-scale=.5, maximum-scale=1">
            <script src="https://kit.fontawesome.com/308ac35dbf.js" crossorigin="anonymous"></script>
            <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
            <link rel="stylesheet" type="text/css" href="style.css">.
        </head>
        <body>
            <div class="jumbotron jumbotron-fluid bg-primary text-center" style="color: white; font-weight: bold;">
                <div>
                    <h1 class="display-4">My Team</h1>
                </div>
            </div>
            <div class="container"><div class="row"><div class="col-md-12">`)
    await appendManagers();
}
    function appendManagers(){managers.forEach(manager => {
        appendFile("test.html", `<div class="card float-left" style="width: 18rem;">
        <div class="card-header bg-secondary">
          <h1>${manager.name}</h1>
          <br>
          <h2><i class="fas fa-mug-hot"></i> Manager</h2>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: ${manager.id}</li>
          <li class="list-group-item">E-Mail: ${manager.email}</li>
          <li class="list-group-item">Office Number: ${manager.officeNum}</li>
        </ul>
        </div>`)
    })
        appendEngineers();
    }
    function appendEngineers(){
        engineers.forEach(engineer => {
            appendFile("test.html", `<div class="card float-left" style="width: 18rem;">
            <div class="card-header bg-primary">
            <h1>${engineer.name}</h1>
            <br>
            <h2><i class="fas fa-code-branch"></i> Engineer</h2>
            </div>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${engineer.id}</li>
            <li class="list-group-item">E-Mail: ${engineer.email}</li>
            <li class="list-group-item">Github: ${engineer.github}</li>
            </ul>
            </div>`)
        }).then(
        appendInterns()
        )
    }
    function appendInterns(){
    interns.forEach(intern => {
        appendFile("test.html", `<div class="card float-left" style="width: 18rem;">
        <div class="card-header bg-success">
          <h1>${intern.name}</h1>
          <br>
          <h2><i class="fas fa-graduation-cap"></i> Intern</h2>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: ${intern.id}</li>
          <li class="list-group-item">E-Mail: ${intern.email}</li>
          <li class="list-group-item">School: ${intern.school}</li>
        </ul>
        </div>`)
        })
        finishHTML();
    }
    function finishHTML(){(appendFile("test.html", `</div></div></div></body>
    </html>`));
}

beginBuild();