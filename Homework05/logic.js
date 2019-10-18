//Sets h3 to display date&time
var now = moment().format("LLLL");
$("h3").text(now); 

//Sets time to variables
var hour9 = moment(9, "LT").format("LT");
var hour10 = moment(10, "LT").format("LT");
var hour11 = moment(11, "LT").format("LT");
var hour12 = moment(12, "LT").format("LT");
var hour13 = moment(13, "LT").format("LT");
var hour14 = moment(14, "LT").format("LT");
var hour15 = moment(15, "LT").format("LT");
var hour16 = moment(16, "LT").format("LT");
var hour17 = moment(17, "LT").format("LT");

//Sets text of hourOfDay columns
$(".hour9").text(hour9);
$(".hour10").text(hour10);
$(".hour11").text(hour11);
$(".hour12").text(hour12);
$(".hour13").text(hour13);
$(".hour14").text(hour14);
$(".hour15").text(hour15);
$(".hour16").text(hour16);
$(".hour17").text(hour17);

//Checks time difference, then sets background of appropriate slot.
for (var i = 0; i < 9; i++) {
    var a = moment();
    var b = moment((i+9),"LT");
    console.log(moment((i+9),"LT"));
    // console.log(a.diff(b, "minutes"));
        if ((a.diff(b,"minutes")) > 0 && (a.diff(b, "minutes")) < 60) {
            $(".event"+i).css("background","lightyellow");
            $(".event"+i).css("border","1px dotted black");
        }
        if ((a.diff(b, "minutes") > 60)) {
            $(".event"+i).css("background","lightgray");
        }
        if (a.diff(b, "minutes") < 0) {
            $(".event"+i).css("background","lightgreen");
        }
}

for (var i = 0; i < 9; i++) {
    var userText = $(".text"+i);
    var saveBtn = $(".save"+i);
    var storedValue = localStorage.getItem(JSON.parse("savedText"+i, $(".text"=i).val()));

    saveBtn.on("click", function(){
        localStorage.setItem(JSON.stringify("savedText"+i, $(".text"+i).val()));
    })

    $(".text"+i).text(storedValue);
}