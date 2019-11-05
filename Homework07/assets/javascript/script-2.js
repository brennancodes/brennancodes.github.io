var gifURL = "https://api.giphy.com/v1/gifs/random?tag=cats&api_key=dc6zaTOxFJmzC";
var quoteURL = "https://quote-garden.herokuapp.com/quotes/random";
var jokeURL = "https://icanhazdadjoke.com/";
var proxy = "https://chriscastle.com/proxy/post.php?:proxy:";

//pressing gif button to create a random cat gif
$(".gif-button").on("click", function () {
    $(".content-container").empty();
    $(".content-container").show();
    $.ajax({
        url: gifURL,
        method: "GET",
    }).then(function (response) {
        var newGif = $("<img>");
        newGif.attr("src", response.data.images.original.url);
        $(".content-container").append(newGif);
    })
})

//pressing quote button to create a random quote
$(".quote-button").on("click", function () {
    $(".content-container").empty();
    $(".content-container").show();
    $.ajax({
        method: "GET",
        url: quoteURL,
    }).then(function (response) {
        var newQuote = $("<div>");
        newQuote.text(response.quoteText);
        $(".content-container").append(newQuote);
    })
})

//pressing joke button to create a random dad joke
$(".joke-button").on("click", function () {
    $(".content-container").empty();
    $(".content-container").show();
    $.ajax({
        accepts: {
            text: "application/json"
        },
        dataType: "json",
        url: jokeURL,
        method: "GET",
    }).then(function (response) {
        var newJoke = $("<div>");
        newJoke.text(response.joke);
        $(".content-container").append(newJoke);
    })
})

//pressing music button to start music
$(".music-button").on("click", function () {
    $('audio#relaxing')[0].play();
    $(".music-button").hide();
    $(".stop-button").show();
    $(".joke-button").hide();
    $(".gif-button").hide();
    $(".quote-button").hide();
    $(".content-container").empty();
    $(".content-container").show();
})

//pressing button to stop music
$(".stop-button").on("click", function () {
    $('audio#relaxing')[0].pause();
    $('audio#relaxing')[0].currentTime = 0;
    $(".music-button").show();
    $(".stop-button").hide();
    $(".joke-button").show();
    $(".gif-button").show();
    $(".quote-button").show();
    $(".content-container").hide();
})
