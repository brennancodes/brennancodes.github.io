var rankings = [];
var userScore = {
    name: "",
    pts: "",
}

init();

function renderScores() {
    highscoreList.innerHTML = "";

    for (var i = 0; i < rankings.length; i++) {
        var inits = userScore.name;
        var pts = userScore.pts;

        if(userScore.score > rankings[i].score){
            rankings.splice(index);
        }

        var li = document.createElement("li");
        li.textContent = (inits + " -- " + pts);
        li.setAttribute("data-index", i);

        var deleteButton = document.createElement("button");
        deleteButton.setAttribute("id", "delete");
        deleteButton.textContent = "x";
    }
}

function init() {
    var savedScores = JSON.parse(localStorage.getItem("rankings"));

    if (savedScores !== null) {
        rankings = savedScores;
    }
    renderScores();
}

highscoreForm.addEventListener("submit", function(event){
    event.preventDefault();

    var name = highscoreText.value;
    var pts = points;

    if (name === "") {
        return;
    }
    else if (points === 0) {
        return;
    }
    rankings.push(userScore);
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
        saveScores();
        renderScores();
    }
})