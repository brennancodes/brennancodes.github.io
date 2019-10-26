// http://api.openweathermap.org/data/2.5/forecast?q=eagan,us&apikey=f24bd690f06d29af834e992daa589ebe
// Above is an example of how to call the five day forecast for Eagan, MN. We can use variables to replace Eagan and US. 
// For loop -> response.list[i].dt_txt returns the date for each one.

var searchBar = $("#searchBar");
var city = "";
var forecastURL = "";
var currentURL = "";
var submitButton = $("#submitButton");
var country = "us";
var forecastFive = $("#forecastFive");
var savedCities;
var functionCalled = false;

submitButton.on("click",function(event){
    event.preventDefault();
    city = searchBar.val();
    forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city +","+ country + "&units=imperial&apikey=f24bd690f06d29af834e992daa589ebe";
    currentURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city +","+ country + "&units=imperial&apikey=f24bd690f06d29af834e992daa589ebe";

    function callWeather(){
        $.ajax({
            url: currentURL,
            method: "GET"
        })
        .then(function(response){
            console.log(currentURL);
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            console.log(lon);
            console.log(lat);
            var uvURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&apikey=f24bd690f06d29af834e992daa589ebe";
            console.log(uvURL);
            var tempContainer = $("#tempContainer");
            tempContainer.empty();
            var humidContainer = $("#humidContainer");
            humidContainer.empty();
            var windContainer = $("#windContainer");
            windContainer.empty();
            var weatherTodayTitle = $("#weatherTodayTitle");
            weatherTodayTitle.empty();
            var iconVar = response.weather[0].icon; //Isolates the icon image code for the chosen time slot
            var iconURL = "http://openweathermap.org/img/wn/" + iconVar + "@2x.png";
            var date = moment().format("l").slice(0,5);
            console.log(date)
            var temp = response.main.temp.toFixed(0);
            var humid = response.main.humidity;
            var wind = response.wind.speed.toFixed(0);
            var iconEl = $("<img>");
            iconEl.attr("src",iconURL);
            iconEl.attr("class","todayIcon");
            var todayEl = $("<h2>").text(city.charAt(0).toUpperCase() + city.slice(1) + " " + date);
            todayEl.attr("class","todayDate");
            todayEl.css("margin-left","10px")
            var tempEl = $("<h3>").text("Temp: " + temp + "° F");
            var humidEl = $("<h3>").text("Humidity: " + humid + "%");
            var windEl = $("<h3>").text("Wind: " + wind + " MPH");
            weatherTodayTitle.prepend(todayEl);
            weatherTodayTitle.prepend(iconEl);
            tempContainer.append(tempEl);
            humidContainer.append(humidEl);
            windContainer.append(windEl);
            console.log (iconURL);
            $.ajax({
                url: uvURL,
                method: "GET"
            })
            .then(function(response){
                var uvContainer = $("#uvContainer");
                uvContainer.empty();
                var uvVal = response[0].value;
                var uvEl = $("<h3>").text("UV Index:");
                uvEl.attr("id", "uvText");
                var uvEle = $("<h3>").text(" " + uvVal);
                uvEle.attr("id", "uvVal");
                uvContainer.append(uvEl);
                uvContainer.append(uvEle);
                uvEle.css("padding","5px")
                uvEle.css("border","1px solid #ccc")
                uvEle.css("border-radius","10px");
                if (uvVal <= 2.5) {
                    uvEle.css("background","green");
                }
                else if (uvVal > 2.5 && uvVal <= 5) {
                    uvEle.css("background","yellow");
                }
                else if (uvVal > 5 && uvVal <= 7.5) {
                    uvEle.css("background","orange");
                }
                else if (uvVal > 7.5) {
                    uvEle.css("background","red");
                }
            })
        });
    }
    
    function callForecast(){
        $.ajax({
            url: forecastURL,
            method: "GET"
        })
        .then(function(response){
            console.log(forecastURL);
            forecastFive.empty();
            for (var i = 0; i < 5; i++) { //Loops through API object
                var ff = $("<div>"); //Creates a div each time
                ff.attr("class","ffDiv"+[i]) //Adds class "ffDiv0" at index 0, "ffDiv1" at index 1, etc.
                var date = response.list[((8*[i])+6)].dt_txt.slice(5,10); //Prints only month and day of date
                var iconVar = response.list[((8*[i])+6)].weather[0].icon; //Isolates the icon image code for the chosen time slot
                var iconURL = "http://openweathermap.org/img/wn/" + iconVar + "@2x.png"; //plugs the image code in to find the URL to reference it
                var temp = response.list[((8*[i])+6)].main.temp.toFixed(0); //Prints temp for selected time
                var humid = response.list[((8*[i])+6)].main.humidity; //Prints humidity ""
                var wind = response.list[((8*[i])+6)].wind.speed.toFixed(0); //Prints wind speed ""
                var dateEl = $("<h3>").text(date); //Creates a h3 element called "dateEl" to display the date
                dateEl.attr("class","ffDate"); //Sets the date's class to "ffDate"
                var iconEl = $("<img>"); //Creates an img element called "iconEl" to display the icon
                iconEl.attr("src",iconURL); //Adds the image source
                iconEl.attr("class","ffIcon"); //Adds a class to the image called "ffIcon"
                var tempEl = $("<h4>").text("Temp: " + temp + "° F"); //Creates a h4 that displays the temp
                var hrEl = $("<hr>"); //Straight line
                var humidEl = $("<h5>").text("Humidity: " + humid + "%"); //Creates a h5 that displays humidity
                var windEl = $("<h5>").text("Wind: " + wind + " MPH"); //Creates a h5 that displays wind speed 
                ff.append(dateEl); //Appends the elements we created
                ff.append(iconEl); //""
                ff.append(tempEl); //""
                ff.append(hrEl); //""
                ff.append(humidEl); //""
                ff.append(windEl); //""
                forecastFive.append(ff); //Appends those new elements to the forecastFive container div
                functionCalled = true;
            }
        });
    }

    callWeather();
    callForecast();
});








//in the emptyWeather function, we need to empty all text content and remove all appended/prepended elements, then place the function at the start of the callweather/forecast functions