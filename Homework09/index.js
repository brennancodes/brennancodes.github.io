const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
var gs = require('github-scraper');
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        // {
        //     type: "input",
        //     name: "name",
        //     message: "What is your full name?"
        // },
        {
            type: "input",
            name: "github",
            message: "What is your github username?"
        },
        // {
        //     type: "input",
        //     name: "linkedin",
        //     message: "What is your linkedin username?"
        // },
        // {
        //     type: "input",
        //     name: "color",
        //     message: "What is your favorite color?"
        // }
    ])
};

function generateHTML(data) {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
            <title>Developer Profile</title>
        </head>
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-sm-6">
                        <img class="face" src=${data.avatar}>
                    </div>
                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-sm-12"><h2>Hello!</h2></div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12"><h3>My name is</h3></div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12"><h1>${data.name}</h1></div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4"><a class="location">${data.location}</a></div>
                            <div class="col-sm-4"><a class="github" href="https://www.github.com/${data.username}">${data.username}</a></div>
                            <div class="col-sm-4"><a class="website" href=${data.website}></a></div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12"><h3>${data.bio}</h3></div>
                </div>
                <div class="row">
                    <div class="col-sm-6"><h2>Public Repositories: ${data.repos}</h2></div>
                    <div class="col-sm-6"><h2>Followers: ${data.followers}</h2></div>
                </div>
                <div class="row">
                    <div class="col-sm-6"><h2>GitHub Stars: ${data.stars}</h2></div>
                    <div class="col-sm-6"><h2>Following: ${data.following}</h2></div>
                </div>
            </div>
        </body>`;
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
    const html = generateHTML(data);
    return writeFileAsync("index.html", html);
    })

  })
  .then(function() {
    console.log("Successfully wrote to index.html");
  })
  .catch(function(err) {
    console.log(err);
  });