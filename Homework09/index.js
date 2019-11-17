const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
var gs = require('github-scraper');
const writeFileAsync = util.promisify(fs.writeFile);


function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "github",
            message: "What is your github username?"
        },
        {
            type: "list",
            name: "color",
            message: "Which is your preferred color?",
            choices: ["Black", "DarkOrange", "DarkRed", "DeepPink", "GoldenRod", "Gray", "Green", "Purple", "RoyalBlue", "SaddleBrown"]
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
            <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
            <style>
            body {
              background-color: #ccc;
            }
            h1 {
              font-size: 4em;
            }
            .greeting {
              margin-top: 10px;
            }
            .container {
              background-color: #eee;
              border-radius: 25px;
            }
            .topRow {
              padding-top: 30px;
              margin-top: 30px;
              background-color: ${answers.color};
              border-radius: 25px;
              padding-bottom: 30px;
            }
            .bottomRow {
              padding-bottom: 30px;
              margin-bottom: 30px;
              border-radius: 25px;
            }
            .face {
              width: 250px;
              margin: 0 auto !important;
              border: 3px solid white;
              border-radius: 150px;
            }
            .center-block {
              display: block;
              margin-left: auto;
              margin-right: auto;
           }
           .stats {
             background-color: ${answers.color};
             color: white;
             border: 3px solid white;
             border-radius: 15px;
             margin-top: 30px;
             padding-top: 10px;
             padding-bottom: 10px;
           }
           a {
             color: white;
           }
           .location, .github, .website {
             font-size: 20px;
           }
           .white {
             color: white;
           }
          .bio {
            max-width: 80%;
            margin: 0 auto;
            text-align: justify;
          }
            </style>
            <title>Developer Profile</title>
        </head>
        <body>
            <div class="container">
                <div class="row topRow">
                    <div class="col-md-4">
                        <img class="face center-block" src=${data.avatar}>
                    </div>
                    <div class="col-md-8 intro">
                        <div class="row">
                            <div class="col-md-12 text-center white greeting"><h2>Hello! My name is</h2></div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-12 text-center white"><h1>${data.name}</h1></div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-sm-4 text-center"><a class="location" href="http://maps.google.com/?q=${data.location}"><i class="fa fa-map-marker" aria-hidden="true"></i> ${data.location}</a></div>
                            <div class="col-sm-4 text-center"><a class="github" href="https://www.github.com/${data.username}"><i class="fa fa-github" aria-hidden="true"></i> GitHub</a></div>
                            <div class="col-sm-4 text-center"><a class="website"  href=${data.website}><i class="fa fa-rss" aria-hidden="true"></i> Website</a></div>
                        </div>
                    </div>
                </div>
                <br><br>
                <div class="row bio">
                    <div class="col-md-12"><h3>${data.bio}</h3></div>
                </div>
                <br><br>
                <div class="row bottomRow">
                  <div class="col-md-12">
                    <div class="row firstStats">
                        <div class="col-md-1"></div>
                        <div class="col-md-4 stats text-center"><h2>Repositories:<br>${data.repos}</h2></div>
                        <div class="col-md-2"></div>
                        <div class="col-md-4 stats text-center"><h2>Followers:<br>${data.followers}</h2></div>
                        <div class="col-md-1"></div>
                    </div>
                    <br>
                    <div class="row secondStats">
                        <div class="col-md-1"></div>
                        <div class="col-md-4 stats text-center"><h2>GitHub Stars:<br>${data.stars}</h2></div>
                        <div class="col-md-2"></div>
                        <div class="col-md-4 stats text-center"><h2>Following:<br>${data.following}</h2></div>
                        <div class="col-md-1"></div>
                    </div>
                  </div>
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