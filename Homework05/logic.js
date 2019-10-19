//Sets text into the necessary boxes
renderText();

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

//Function built to save the input text to localstorage when 
function saveText() {
    for (var i = 0; i < 9; i++) {
    localStorage.setItem("userInput"+i, $(".text"+i).val());
    }
}

function renderText() {
    for (var i = 0; i < 9; i++) {
        $(".text"+i).text(localStorage.getItem("userInput"+i));
    }
}

var save0 = $(".save0");
var save1 = $(".save1");
var save2 = $(".save2");
var save3 = $(".save3");
var save4 = $(".save4");
var save5 = $(".save5");
var save6 = $(".save6");
var save7 = $(".save7");
var save8 = $(".save8");

save0.on("click",function(){
    localStorage.setItem("userInput0",$(".text0").val());
});
save1.on("click",function(){
    localStorage.setItem("userInput1",$(".text1").val());
});
save2.on("click",function(){
    localStorage.setItem("userInput2",$(".text2").val());
});
save3.on("click",function(){
    localStorage.setItem("userInput3",$(".text3").val());
});
save4.on("click",function(){
    localStorage.setItem("userInput4",$(".text4").val());
});
save5.on("click",function(){
    localStorage.setItem("userInput5",$(".text5").val());
});
save6.on("click",function(){
    localStorage.setItem("userInput6",$(".text6").val());
});
save7.on("click",function(){
    localStorage.setItem("userInput7",$(".text7").val());
});
save8.on("click",function(){
    localStorage.setItem("userInput8",$(".text8").val());
});

var saveAll = $(".saveAll");
saveAll.on("click",function(){
    saveText();
    renderText();
});

var deleteAll = $(".deleteAll");
deleteAll.on("click",function(){
    localStorage.clear();
    renderText();
})
