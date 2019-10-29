var searchBar = $("#searchBar");
var city = "";
var forecastURL = "";
var currentURL = "";
var submitButton = $("#submitButton");
var country = "us";
var forecastFive = $("#forecastFive");
var cityList;
var functionCalled = false;

function getCities(){
    if (localStorage.getItem("cityList")) { //If there is anything in localStorage, do the following:
        cityList = JSON.parse(localStorage.getItem("cityList"))
        var lastCity = cityList[cityList.length-1].name; //Sets the lastCity variable to be the last index of our localstorage, then uses it to get the correct API url
        forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + lastCity +","+ country + "&units=imperial&apikey=f24bd690f06d29af834e992daa589ebe";
        currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + lastCity +","+ country + "&units=imperial&apikey=f24bd690f06d29af834e992daa589ebe";
        callWeather();
        callForecast();
    }
    else { //Default city is Eagan, my beloved hometown.
        cityList = [];
        city = "eagan";
        forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city +","+ country + "&units=imperial&apikey=f24bd690f06d29af834e992daa589ebe";
        currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city +","+ country + "&units=imperial&apikey=f24bd690f06d29af834e992daa589ebe";
        callWeather();
        callForecast();
    }
    for (var i = 0; i < cityList.length; i++) { //appends our localstorage items in the form of buttons when we reload the page.
            var citiesDiv = $("#citiesDiv");
            var cityButton = $("<button>").attr("data-value",cityList[i].name).text(cityList[i].name.charAt(0).toUpperCase() + cityList[i].name.slice(1));
            cityButton.attr("class","btn-primary cityButton").css("width","100%").css("padding","5px");
            citiesDiv.prepend(cityButton);
        }
       $(".cityButton").on("click",function(){ //When we click any cityButton, the city variable becomes the text that is on it.
            city = $(this).text();
            forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city +","+ country + "&units=imperial&apikey=f24bd690f06d29af834e992daa589ebe";
            currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city +","+ country + "&units=imperial&apikey=f24bd690f06d29af834e992daa589ebe";
            callWeather();
            callForecast();
        });
}

getCities();

function storeCity(){ //Builds the interactive city buttons
    var citiesDiv = $("#citiesDiv");
    var cityButton = $("<button>").text(city.charAt(0).toUpperCase() + city.slice(1));
    cityButton.attr("class","btn-primary cityButton").attr("data-value",city).css("width","100%").css("padding","5px");
    citiesDiv.prepend(cityButton);
    var cityButtons = { name: city };
    cityList.push(cityButtons);
    localStorage.setItem("cityList", JSON.stringify(cityList));
    cityButton.on("click",function(){
        city = $(this).data("value");
        forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city +","+ country + "&units=imperial&apikey=f24bd690f06d29af834e992daa589ebe";
        currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city +","+ country + "&units=imperial&apikey=f24bd690f06d29af834e992daa589ebe";
        callWeather();
        callForecast();
    });
}

function callWeather(){ //Fills the current weather div at the top
    $.ajax({
        url: currentURL,
        method: "GET"
    })
    .then(function(response){
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var uvURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&apikey=f24bd690f06d29af834e992daa589ebe";
        var tempContainer = $("#tempContainer");
        tempContainer.empty();
        var humidContainer = $("#humidContainer");
        humidContainer.empty();
        var windContainer = $("#windContainer");
        windContainer.empty();
        var weatherTodayTitle = $("#weatherTodayTitle");
        weatherTodayTitle.empty();
        var iconVar = response.weather[0].icon; //Isolates the icon image code for the chosen time slot
        var iconURL = "https://openweathermap.org/img/wn/" + iconVar + "@2x.png";
        var date = moment().format("l").slice(0,5);
        var temp = response.main.temp.toFixed(0);
        var humid = response.main.humidity;
        var wind = response.wind.speed.toFixed(0);
        var iconEl = $("<img>");
        iconEl.attr("src",iconURL);
        iconEl.attr("class","todayIcon");
        if (city.length < 1) { //If the city value is blank, use the last city in localStorage instead.
            var todayEl = $("<h2>").text(cityList[cityList.length-1].name.charAt(0).toUpperCase() + cityList[cityList.length-1].name.slice(1) + " " + date);
        }
        else { //Otherwise, use the intended city.
        var todayEl = $("<h2>").text(city.charAt(0).toUpperCase() + city.slice(1) + " " + date);
        }
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
        $.ajax({ //Fills the UV container using a different ajax call (from a different API).
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

function callForecast(){ //Creates the forecast elements and puts them in the forecastFive div in our HTML.
    $.ajax({
        url: forecastURL,
        method: "GET"
    })
    .then(function(response){
        forecastFive.empty();
        for (var i = 0; i < 5; i++) { //Loops through API object
            var ff = $("<div>"); //Creates a div each time
            ff.attr("class","ffDiv"+[i]) //Adds class "ffDiv0" at index 0, "ffDiv1" at index 1, etc.
            var date = response.list[((8*[i])+6)].dt_txt.slice(5,10); //Prints only month and day of date
            var iconVar = response.list[((8*[i])+6)].weather[0].icon; //Isolates the icon image code for the chosen time slot
            var iconURL = "https://openweathermap.org/img/wn/" + iconVar + "@2x.png"; //plugs the image code in to find the URL to reference it
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

submitButton.on("click",function(event){ //When we submit a city, set the proper URL then make the ajax call(s).
    event.preventDefault();
    city = searchBar.val();
    forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city +","+ country + "&units=imperial&apikey=f24bd690f06d29af834e992daa589ebe";
    currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city +","+ country + "&units=imperial&apikey=f24bd690f06d29af834e992daa589ebe";

    callWeather();
    callForecast();
    storeCity();

});
