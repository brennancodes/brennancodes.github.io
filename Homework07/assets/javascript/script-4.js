
var m = [];
var r = [];

var checkIns = JSON.parse(localStorage.getItem("checkIns"));
if (!checkIns) {
    var checkInWarning = $("<div>");
    checkInWarning.text("Please check in before you visit this page.")
    $(".container").prepend(checkInWarning);
}
else {
    for (var i = 0; i < checkIns.length; i++) {

        if (i<7){
            m[i] = checkIns[checkIns.length-(i+1)].mood;
            r[i] = checkIns[checkIns.length-(i+1)].risk;
        }
        
    }

    if (m.length<7){
        m[m.length] = 0
        r[r.length] = 0;
    }

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [" ", " ", " ", " Last 7 Check-Ins ", " ", " ", " "],
            datasets: [{ 
                    data: m.reverse(),
                    label: "Mood",
                    borderColor: "#e8c3b9",
                    fill: true
                  }, { 
                    data: r.reverse(),
                    label: "Confidence",
                    borderColor: "#c45850",
                    fill: true
                  }
                ]
              },
        options: {
            scales: {
                yAxis: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}