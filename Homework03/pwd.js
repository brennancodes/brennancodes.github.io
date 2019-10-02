var checkLow = document.getElementById("checkLow");
var checkUp = document.getElementById("checkUp");
var checkNum = document.getElementById("checkNum");
var checkSpec = document.getElementById("checkSpec");
var charNum = document.getElementById("charNum");

var generatePassword = document.getElementById("generatePassword");

//These strings hold our potential password characters.
var abc = "abcdefghijklmnopqrstuvwxyz"; //26 chars
var ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //26 chars
var oneTwoThree = "0123456789"; //10 chars
var specialOnes = " !#$%&'()*+,-./:;<=>?@][\\\"_`{|}~"; //32 chars

//This is the least efficient way to organize all the strings.
var aAos = abc + ABC + oneTwoThree + specialOnes;
var aAo = abc + ABC + oneTwoThree;
var aAs = abc + ABC + specialOnes;
var aos = abc + oneTwoThree + specialOnes;
var Aos = ABC + oneTwoThree + specialOnes;
var aA = abc + ABC;
var ao = abc + oneTwoThree;
var as = abc + specialOnes;
var Ao = ABC + oneTwoThree;
var As = ABC + specialOnes;
var os = oneTwoThree + specialOnes;

//this string holds only the characters we select.
var fillMe = "";

//This function merely checks and logs whether boxes are checked
function checkBoo(checkBox) {
    console.log(checkBox.checked);
}

//This function merely checks and logs values
function checkVal(checkVal) {
    console.log(checkVal.value)
}

generatePassword.addEventListener("click",function(){
    checkBoo(checkLow); //Checks the T/F value of lowercase (checkLow)
    checkBoo(checkUp); //Checks the T/F value of uppercase (checkUp)
    checkBoo(checkNum); //Checks the T/F value of numbers (checkNum)
    checkBoo(checkSpec); //Checks the T/F value of special chars (specChar)
    checkVal(charNum); //Checks the value of the input box
    if (charNum.value < 8 || charNum.value > 128) {
        document.getElementById("warn").innerHTML = "Please select a value between 8 and 128.";
    } //this says if user enters < 8 or > 128, print a warning.
    else if (!checkLow.checked && !checkUp.checked && !checkNum.checked && !checkSpec.checked) {
        document.getElementById("warn").innerHTML = "Please select at least one type of character.";
    } //this says if user checks NONE of the boxes, print a warning.
    else {
        document.getElementById("warn").innerHTML = "";
        if (checkLow.checked && checkUp.checked && checkNum.checked && checkSpec.checked) {
            fillMe = aAos;
        }
        else if (checkLow.checked && checkUp.checked && checkNum.checked) {
            fillMe = aAo;
        }
        else if (checkLow.checked && checkUp.checked && checkSpec.checked) {
            fillMe = aAs;
        }
        else if (checkLow.checked && checkNum.checked && checkSpec.checked) {
            fillMe = aos;
        }
        else if (checkUp.checked && checkNum.checked && checkSpec.checked) {
            fillMe = Aos;
        }
        else if (checkLow.checked && checkUp.checked) {
            fillMe = aA;
        }
        else if (checkLow.checked && checkNum.checked) {
            fillMe = ao;
        }
        else if (checkLow.checked && checkSpec.checked) {
            fillMe = as;
        }
        else if (checkUp.checked && checkNum.checked) {
            fillMe = Ao;
        }
        else if (checkUp.checked && checkSpec.checked) {
            fillMe = As;
        }
        else if (checkNum.checked && checkSpec.checked) {
            fillMe = os;
        }
        else if (checkLow.checked) {
            fillMe = abc;
        }
        else if (checkUp.checked) {
            fillMe = ABC;
        }
        else if (checkNum.checked) {
            fillMe = oneTwoThree;
        }
        else if (checkSpec.checked) {
            fillMe = specialOnes;
        }
        else {
            document.getElementById("warn").innerHTML = "There was an issue running the program. Please refresh your page and try again.";
        }
        console.log(fillMe)
        for (var i = 0; i < charNum.value; i++) {
            var password = Math.floor(Math.random() * fillMe.length);
        }
        document.getElementById("password").innerHTML = password;
    } //this says if user follows instructions correctly, display no warning.
})





//CHECK. Allow user to select number of characters by capturing value of textbox. (min 8 max 128)
//CHECK. Allow user to select from options for which characters to use.
//Pull characters randomly from TRUE booleans (checkboxes).

//Steps:
//Define arrays or strings for the four options.
//Create a function that checks the checkboxes.
//Based off of truth or falsehood, add arrays or strings to a larger array, then use the new array length.
//I can use my checkBoo function to create a variable with that array.
//Empty string or array at top... if statements to fill the array.
//Then, feed that array to the generatePass function with math.random stuffs.