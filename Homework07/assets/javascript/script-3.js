var now = moment();
var nowRead = moment().format("MM/DD/YYYY");
var localSoberDate = localStorage.getItem("soberDate")
var soberDate = moment(localSoberDate,"MM/DD/YYYY");
var soberNumber = $(".soberNumber");
var streakNumber = $(".streakNumber");
var checkIns = JSON.parse(localStorage.getItem("checkIns"));
var counter = 0;


if (!checkIns) {
    streakNumber.text("Please check in at least twice to see your daily streak.");
}
else if (checkIns.length < 2) {
    streakNumber.text("Please check in at least twice to see your daily streak.");
}
else {
    function printStreak(){
        var streakContainer = $("<h2>");
        var localCounter = localStorage.getItem("counter");
        if (localCounter == 1) {
            streakContainer.append(localCounter + " day");
        }
        else {
        streakContainer.append(localCounter + " days");
        }
        streakNumber.append(streakContainer);
    }
    printStreak();
}

function calcSober(){
    var soberContainer = $("<h2>");
    if (!localSoberDate) {
        soberNumber.text("Please click the settings button to establish the start of your clean streak.")
    }
    else {
        var years = now.diff(soberDate, 'years');
        if (years != 0) {
            soberDate.add(years, 'years');
        }

        var months = now.diff(soberDate, 'months');
        soberDate.add(months, 'months');
        

        var days = now.diff(soberDate, 'days');
        if (years != 0) {
            var soberLength = (years + ' years ' + months + ' months ' + days + ' days');
        }
        else if (years == 0 && months == 0) {
            var soberLength = (days + ' days');
        }
        else if (years == 0) {
            var soberLength = (months + ' months ' + days + ' days');
        }
        soberContainer.append(soberLength);
        soberNumber.append(soberContainer);
    }
}

calcSober();
