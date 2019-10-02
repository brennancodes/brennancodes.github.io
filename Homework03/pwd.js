// checkL()
// checkU()
// checkN()
// uncheckS()

var lowerCase = document.getElementById("checkLow");
var upperCase = document.getElementById("checkUp");
var numBers = document.getElementById("checkNum");
var specChar = document.getElementById("checkSpec");
var charNum = document.getElementById("charNum");

var generatePassword = document.getElementById("generatePassword");

function checkBoo(checkBox) {
    //console.log(checkBox.checked);
    console.log(checkBox.value)
}

generatePassword.addEventListener("click",function(){
    checkBoo(lowerCase);
    checkBoo(upperCase);
    checkBoo(numBers);
    checkBoo(specChar);
    checkBoo(charNum);
})

//Allow user to select number of characters by capturing value of textbox. (min 8 max 128)
//Allow user to select from options for which characters to use.
//Pull characters randomly from TRUE booleans (checkboxes).

//Steps:
//Define arrays or strings for the four options.
//Create a function that checks the checkboxes.
//Based off of truth or falsehood, add arrays or strings to a larger array, then use the new array length.
//I can use my checkBoo function to create a variable with that array.
//Empty string or array at top... if statements to fill the array.
//Then, feed that array to the generatePass function with math.random stuffs.