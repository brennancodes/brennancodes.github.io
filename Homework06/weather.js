// http://api.openweathermap.org/data/2.5/forecast?q=eagan,us&apikey=f24bd690f06d29af834e992daa589ebe
// Above is an example of how to call the five day forecast for Eagan, MN. We can use variables to replace Eagan and US. 
// For loop -> response.list[i].dt_txt returns the date for each one.

var city = "eagan";
var country = "us";
var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city +","+ country + "&units=imperial&apikey=f24bd690f06d29af834e992daa589ebe";
var forecastFive = $("#forecastFive");

$.ajax({
    url: queryURL,
    method: "GET"
})
.then(function(response){
    for (var i = 0; i < 5; i++) { //Loops through API object
    var ff = $("<div>"); //Creates a div each time
        ff.attr("class","ffDiv"+[i])
    var date = response.list[((8*[i])+3)].dt_txt.slice(5,10);
    var iconVar = response.list[((8*[i])+3)].weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + iconVar + "@2x.png";
    var temp = response.list[((8*[i])+3)].main.temp.toFixed(0);
    var humid = response.list[((8*[i])+3)].main.humidity;
    var wind = response.list[((8*[i])+3)].wind.speed.toFixed(0);
    var dateEl = $("<h3>").text(date);
        dateEl.attr("class","ffDate");
    var iconEl = $("<img>");
        iconEl.attr("src",iconURL);
        iconEl.attr("class","ffIcon");
    var tempEl = $("<h4>").text("Temp: " + temp + "° F");
    var hrEl = $("<hr>");
    var humidEl = $("<h5>").text("Humidity: " + humid + "%");
    var windEl = $("<h5>").text("Wind: " + wind + " MPH");
    ff.append(dateEl);
    ff.append(iconEl);
    ff.append(tempEl);
    ff.append(hrEl);
    ff.append(humidEl);
    ff.append(windEl);
    forecastFive.append(ff);
        }
    });





// var city = $("#searchBar".val());
// $("#submitButton").on("click",function())
    // Everything above on here