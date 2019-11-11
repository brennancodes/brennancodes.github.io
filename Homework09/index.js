const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
var gs = require('github-scraper');
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "github",
            message: "What is your github username?"
        },
        {
            type: "input",
            name: "linkedin",
            message: "What is your linkedin username?"
        },
        {
            type: "input",
            name: "color",
            message: "What is your favorite color?"
        }
    ])
};

function generateHTML(answers, data) {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>Document</title>
  </head>
  <body>
    <div class="jumbotron jumbotron-fluid">
    <div class="container" style="background-color=${answers.color}">
      <img class="text-center" src=${data.avatar}>
      <h1 class="display-4">Hi! My name is ${answers.name}</h1>
      <p class="lead">I am from ${data.location}.</p>
      <h3><span class="badge badge-secondary">Contact Me</span></h3>
      <ul class="list-group">
        <li class="list-group-item">My GitHub username is ${answers.github}</li>
        <li class="list-group-item">My LinkedIn username is ${answers.linkedin}</li>
        <li class-"list-group-item">Public Repositories: ${data.repos}</li>
        <li class-"list-group-item">Followers: ${data.followers}</li>
        <li class-"list-group-item">GitHub Stars: ${data.stars}</li>
        <li class-"list-group-item">Following: ${data.following}</li>
      </ul>
    </div>
  </div>
  </body>
  </html>`;
  }

promptUser()
.then(function(answers) {
    console.log(answers);
    var url = answers.github
    gs(url, function(err, data) {
    if (err) {
        throw err;
    }
    console.log(data); // or what ever you want to do with the data
    const html = generateHTML(answers, data);
    return writeFileAsync("index.html", html);
    })

  })
  .then(function() {
    console.log("Successfully wrote to index.html");
  })
  .catch(function(err) {
    console.log(err);
  });