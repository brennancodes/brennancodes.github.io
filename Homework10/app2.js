const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

async function createManager(){
    try {
        const beginEmp = await beginEmployee(req)
        console.log("Let's create your team, starting with the manager.");
        console.log(req.name + req.id + req.email);
        inquirer.prompt([
            {
                type: "input",
                name: "officeNum",
                message: "What is the manager's office number?"
            }
        ]).then(function(){
            console.log(beginEmp);
        })

    } catch (err) {
        console.log(err);
    }
}

async function selectEmployee(){
    await inquirer.prompt([
        {
            type: "list",
            name: "employeeType",
            message: "What is the next employee's designation?",
            choices: ["Engineer", "Intern", "I'm done adding team members."]
        }
    ]).then(function(answer){
        switch (answer.employeeType){
            case "Engineer":
                generateEngineer();
                break;
            case "Intern":
                generateIntern();
                break;
            default: console.log("Done!"); 
            //We may need to use previous cases to write and append the HTML for each one, then use this one to actually build the file. Idk.
        }
    })
}

function beginEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the employee's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the employee's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the employee's e-mail address?"
        }
    ]).then(function(answers){
        let name = answers.name;
        let id = answers.id;
        let email = answers.email;
        console.log(name + id + email);
    })
    // .then(function(){
    //     selectEmployee();
    // });
}

function generateEngineer(){
    inquirer.prompt([
        {
            type: "input",
            name: "github",
            message: "What is the engineer's github username?"
        }   
    ]).then(function(){
        beginEmployee();
    })
}

function generateIntern(){
    inquirer.prompt([
        {
            type: "input",
            name: "school",
            message: "What school is the intern attending?"
        }
    ]).then(function(){
        beginEmployee();
    })
}

// Where the magic actually happens

createManager();

// Where the magic ends :(

class Employee {
    constructor(name, id, title) {
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

class Manager extends Employee {
    constructor(name, officeNum) {
        super(name, id)
        this.title = "Manager";
        this.officeNum = officeNum;
    }
    getRole(){
        console.log(`Title: ${this.title}`);
    }
}

//Manager
//Office Number
// getRole()

// Engineer
// github username
// getGithub()
// getRole()

// Intern
// school name
// getSchool()
// getRole()