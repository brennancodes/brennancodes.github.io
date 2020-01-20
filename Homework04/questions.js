var playButton = document.getElementById("playButton");
var highScoresButton = document.getElementById("highScoresButton");
var sneaky = document.getElementById("sneaky");
var highscoreText = document.querySelector("#highscore-text");
var highscoreList = document.querySelector("#highscore-list");
var highscoreForm = document.querySelector("#highscore-form");

var questions = [
    {
        title: "What is Dwight Schrute's middle name?",
        choices: ["Danger","Kurt","Fart","Kay"],
        answer: "Kurt"
    },
    {
        title: "Which of the following women did Jim NOT date?",
        choices: ["Karen","Pam","Katy","Cathy"],
        answer: "Cathy"      
    },
    {
        title: "What kind of facial hair does Stanley sport?",
        choices: ["Mustache", "Goatee", "Full Beard", "None"],
        answer: "Mustache"      
    },
    {
        title: "Who is the regional manager of Dunder Mifflin at the beginning of the show?",
        choices: ["Michael Scarn", "Dwight Schrute","Michael Scott","Ed Truck"],
        answer: "Michael Scott"      
    },
    {
        title: "Who plays Pam Beesly?",
        choices: ["Amy Adams","Rashida Jones", "Jenna Fischer","Melora Hardin"],
        answer: "Jenna Fischer"      
    },
];

var correctGuess = 0;
var incorrectGuess = 0;
var timeFormula = ((questions.length * 10) - (incorrectGuess * 10));
var timeLeft = timeFormula; //Gives 12 seconds for each question. 60 total seconds with 5 questions.
var clockEl = document.getElementById("clock");
var scoreEl = document.getElementById("score");
var points = (timeLeft * correctGuess);
clockEl.innerHTML = timeLeft; //Allows us to display the timeLeft on the clock.
scoreEl.innerHTML = points;
var q = 0;

var intervalId; //Global variable

function stopClock(){ //This function clears the interval of the decrement function (so the timer doesn't tick below 0.)
    clearInterval(intervalId);
}

function restart(){
    correctGuess = 0;
    incorrectGuess = 0;
    q = 0;
    timeLeft = timeFormula;
    points = (timeLeft * correctGuess);
    clockEl.innerHTML = timeLeft;
    scoreEl.innerHTML = points;
    clearInterval(intervalId);
    newQuestion();
    decrement();
}

function runClock(){ //This function ticks the clock down one second at a time, stopping at 0 seconds
    timeLeft--;
    clockEl.innerHTML = timeLeft;
    points = (correctGuess * timeLeft);
    scoreEl.innerHTML = points;
    if (timeLeft === 0) {
        console.log("TIME'S UP!");
        endGame();
    }
}


function endGame(){
    stopClock();
    timeLeft = timeLeft;
    clockEl.innerHTML = timeLeft;
    points = points;
    scoreEl.innerHTML = points;
    qText.innerHTML = ("You finished with a final score of " + points + " points. <br> You got " + correctGuess + "/" + questions.length + " answers correct. <br>");
    btn1.style.display = "none";
    btn2.style.display = "none";
    btn3.style.display = "none";
    btn4.style.display = "none";
    $("#sneaky").show();
}

$("#sneaky").hide();

highScoresButton.addEventListener("click", function(){
    $("#sneaky").toggle();
    $("#questionText").toggle();
});

function decrement(){ //This function runs the runClock function on a 1s interval
    intervalId = setInterval(function(){
        runClock();
      }, 1000);

};


playButton.addEventListener("click", function(){ //Clicking play clears the interval, starts the decrement function.
    $("#sneaky").hide();
    $("#questionText").show();
    if (timeLeft === 0) {
        restart();
    }
    else if (q = 4) {
        restart();
    }
    else {
        clearInterval(intervalId); //This prevents the clock from speeding up
        newQuestion();
        decrement();
    }
});

var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var btn4 = document.getElementById("btn4");
btn1.style.display = "none";
btn2.style.display = "none";
btn3.style.display = "none";
btn4.style.display = "none";
var qText = document.getElementById("questionText");
qText.textContent = "Press the 'Play!' button to begin.";


function newQuestion(){
    qText.textContent = questions[q].title;
    btn1.textContent = questions[q].choices[0];
    btn2.textContent = questions[q].choices[1];
    btn3.textContent = questions[q].choices[2];
    btn4.textContent = questions[q].choices[3];
    btn1.style.display = "block";
    btn2.style.display = "block";
    btn3.style.display = "block";
    btn4.style.display = "block";
}

function questionUp(){
    q++;
}

function correctClick(){
    correctGuess++;
    points = (timeLeft * correctGuess);
    scoreEl.innerHTML = points;
    questionUp();
    newQuestion();
}
function correctClickLast(){
    correctGuess++;
    points = (timeLeft * correctGuess);
    scoreEl.innerHTML = points;
    endGame();
}
function incorrectClick(){
    incorrectGuess++;
    timeLeft = ((questions.length * 10) - (incorrectGuess * 10));
    clockEl.innerHTML = timeLeft
    points = (timeLeft * correctGuess);
    scoreEl.innerHTML = points;
    questionUp();
    newQuestion();
}
function incorrectClickLast(){
    incorrectGuess++;
    timeLeft = ((questions.length * 10) - (incorrectGuess * 10));
    clockEl.innerHTML = timeLeft
    points = (timeLeft * correctGuess);
    scoreEl.innerHTML = points;
    endGame();
}
// var answerButton = document.getElementsByClassName("answerButton");
btn1.addEventListener("click", function(){
    if (q == (questions.length - 1) && btn1.textContent == questions[q].answer) {
        correctClickLast();
    }
    else if (q == (questions.length - 1) && btn1.textContent != questions[q].answer) {
        incorrectClickLast();
    }
    else if (btn1.textContent == questions[q].answer) {
        correctClick();
    }
    else {
        incorrectClick();
    }
});
btn2.addEventListener("click", function(){
    if (q == (questions.length - 1) && btn2.textContent == questions[q].answer) {
        correctClickLast();
    }
    else if (q == (questions.length - 1) && btn2.textContent != questions[q].answer) {
        incorrectClickLast();
    }
    else if (btn2.textContent == questions[q].answer) {
        correctClick();
    }
    else {
        incorrectClick();
    }
});
btn3.addEventListener("click", function(){
    if (q == (questions.length - 1) && btn3.textContent == questions[q].answer) {
        correctClickLast();
    }
    else if (q == (questions.length - 1) && btn3.textContent != questions[q].answer) {
        incorrectClickLast();
    }
    else if (btn3.textContent == questions[q].answer) {
        correctClick();
    }
    else {
        incorrectClick();
    }
});
btn4.addEventListener("click", function(){
    if (q == (questions.length - 1) && btn4.textContent == questions[q].answer) {
        correctClickLast();
    }
    else if (q == (questions.length - 1) && btn4.textContent != questions[q].answer) {
        incorrectClickLast();
    }
    else if (btn4.textContent == questions[q].answer) {
        correctClick();
    }
    else {
        incorrectClick();
    }
});


var userScore = {
    name: "",
    pts: "",
}
var rankings = [userScore];

init();

// function renderScores() {
//     highscoreList.innerHTML = "";

//     for (var i = 0; i < rankings.length; i++) {
//         // userScore.name = highscoreText.value;
//         // userScore.pts = points;
//         // var name = userScore.name;
//         // var pts = userScore.pts;
//         var name = rankings[i].name;
//         var pts = rankings[i].pts;

//         // if(userScore.pts > rankings[i].pts){
//         //     var index = element.parentElement.getAttribute("data-index");
//         //     rankings.push(userScore);   
//         // }

//         var li = document.createElement("li");
//         li.textContent = (name + " -- " + pts);
//         li.setAttribute("data-index", i);

//         var deleteButton = document.createElement("button");
//         deleteButton.setAttribute("id", "delete");
//         deleteButton.textContent = "x";

//         li.appendChild(button);
//         highscoreList.appendChild(li);
//     }
// }

init();

function init() {
    var savedScores = JSON.parse(localStorage.getItem("rankings"));

    if (savedScores !== null) {
        rankings = savedScores;
    }
    renderScores();
}

function saveScores() {
    localStorage.setItem("rankings", JSON.stringify(userScore));
}

highscoreForm.addEventListener("submit", function(event){
    event.preventDefault();

    userScore.name = highscoreText.value;
    userScore.pts = points;

    if (userScore.name === "") {
        return;
    }
    else if (userScore.pts === 0) {
        return;
    }
    highscoreText.value = "";
    name.value = "";
    points = 0;
    saveScores();
    renderScores();
});

highscoreList.addEventListener("click", function(event){
    var element = event.target;
    if (element.matches("button") === true) {
        var index = element.parentElement.getAttribute("data-index");
        rankings.splice(index, 1);
        renderScores();
        saveScores();
    }
})

function renderScores(){
    highscoreList.innerHTML = "";
    var savedScores = JSON.parse(localStorage.getItem("rankings"));
    name = savedScores.name;
    pts = savedScores.pts;
    
    var li = document.createElement("li");
    li.textContent = (name + " -- " + pts);
    // li.setAttribute("data-index", i);

    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("id","delete");
    deleteButton.textContent = "x";

    li.appendChild(deleteButton);
    highscoreList.appendChild(li);
    }