var checkLow = document.getElementById("checkLow");
var checkUp = document.getElementById("checkUp");
var checkNum = document.getElementById("checkNum");
var checkSpec = document.getElementById("checkSpec");
var charNum = document.getElementById("charNum");

var generatePassword = document.getElementById("generatePassword");
var copyPassword = document.getElementById("copyPassword");

//These strings hold our potential password characters.
var abc = "abcdefghijklmnopqrstuvwxyz"; //26 chars
var ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //26 chars
var oneTwoThree = "0123456789"; //10 chars
var specialOnes = " !#$%&'()*+,-.\/:;=?@][\\\"_`{|}~<>"; //32 chars
//tried using <> in specialOnes and it breaks the HTML.

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

//This function merely checks and logs whether boxes are checked
function checkBoo(checkBox) {
    // console.log(checkBox.checked);
}

//This function merely checks and logs values
function checkVal(checkVal) {
    // console.log(checkVal.value)
}

generatePassword.addEventListener("click",function(event){
    event.preventDefault();
    checkBoo(checkLow); //Checks the T/F value of lowercase (checkLow)
    checkBoo(checkUp); //Checks the T/F value of uppercase (checkUp)
    checkBoo(checkNum); //Checks the T/F value of numbers (checkNum)
    checkBoo(checkSpec); //Checks the T/F value of special chars (specChar)
    checkVal(charNum); //Checks the value of the input box

    //setting the values of these variables within the function effectively clears them with each button click.
    var fillMe = ""; //this string holds only the characters we select.

    var password = "";//this string takes the output from our function using characters from fillMe

    if (charNum.value < 8 || charNum.value > 128) {
        document.getElementById("warnNum").innerHTML = "Please select a value between 8 and 128.";
        document.getElementById("warnTxt").innerHTML = "";
    } //this says if user enters < 8 or > 128, print a warning.
    else if (!checkLow.checked && !checkUp.checked && !checkNum.checked && !checkSpec.checked) {
        document.getElementById("warnTxt").innerHTML = "Please select at least one type of character.";
        document.getElementById("warnNum").innerHTML = "";
    } //this says if user checks NONE of the boxes, print a warning.
    else {
        document.getElementById("warnNum").innerHTML = ""; 
        document.getElementById("warnTxt").innerHTML = ""; //this says if user follows instructions correctly, display no warning.
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
        // console.log(fillMe)
        while (password.length < charNum.value) {
            password += fillMe[Math.floor(Math.random() * fillMe.length)];
        } 
        document.getElementById("sneaky").style.display = "block";
        document.getElementById("pwdbox").style.height = "100%";
        document.getElementById("password").style.visibility = "visible";
        document.getElementById("password").value = password;
        document.getElementById("copyPassword").style.visibility = "visible";
        document.getElementById("copyPassword").style.display = "block";
        // console.log(fillMe.length);
        console.log(password);
        // console.log(password.length);
        copyPassword.addEventListener("click",function(){
            console.log(password);
            document.getElementById("password").select();
            document.execCommand("copy");
        });
    }
})





//Original Ideas...

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

//What we ACTUALLY ended up doing...

//Defined four strings relating to the four user options
//Painstakingly created new strings by assigning new variables to every possible combination (this absolutely CANNOT be the most efficient method)
//Pulled random characters from new strings until the user input length was met

//What we STILL have to do...

//Create a copy function for the printed code (probably using a button)
//Make significant stylistic improvements, particularly to password appearance
//Add my signature slide up animation to the container
//Detected issue with "<>" in innerHTML breaking code (basically nothing within those brackets shows up). They have temporarily been removed from the character pool.
//Talk to Chris/TA's about how to solve that issue.
//Change "your secure password" so it has the original font family.
//Add more backgrounds because holy fuck that shit is addicting.