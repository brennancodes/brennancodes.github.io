const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

function createManager(){
    console.log("Let's create your team, starting with the manager.");
    inquirer.prompt([
        {
            type: "input",
            name: "officeNum",
            message: "What is the manager's office number?"
        }
    ]).then(function(){
        beginEmployee();
    })
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
        console.log(answers.name + answers.id + answers.email);
        selectEmployee();
    });
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

//Manager
//Office Number
// getRole()
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

// Engineer
// github username
// getGithub()
// getRole()
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

// Intern
// school name
// getSchool()
// getRole()
class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, "Intern", email)
        this.email = email;
        this.school = school;
    }
}