/* For name button */
var textInput = document.getElementById('textInput');
var readName = document.getElementById('readName');
var nameDisplay = document.getElementById('nameDisplay');

/* For budget button */
var numberInput = document.getElementById('numberInput');
var readBudget = document.getElementById('readBudget');
var numberDisplay = document.getElementById('numberDisplay');

var budget;
var username;

/* Default hint */

alert(`Welcome to PTO Travel!\n\
where we will take you on a captivating journey through the terrestrial planets of the solar system and several of their enchanting satellites.\n\
Each of these celestial bodies possesses its own unique allure, and while you may not yet be certain which destinations to explore in-depth, this game will introduce you to their distinctive features.\n\
Moreover, it will calculate the associated costs and determine the feasibility of such journeys based on your budget.\n\
Let us embark on a mysterious and exhilarating space voyage together!\n`);

window.addEventListener("load", start);

/* Button click instructions */

function showalert(){
    alert("Please enter your name and budget, then press the “GO” button.\n");
}

function start() {

    readName.addEventListener('click', name_updated);
    readBudget.addEventListener('click', budget_updated);
  
}
  
function name_updated(){
    username = textInput.value;
    nameDisplay.textContent = username;

}
  
function budget_updated(){
    budget = numberInput.value;
    numberDisplay.textContent = budget;
}


function goToPage() {
    const textValue = document.getElementById('textInput').value;
    const numberValue = document.getElementById('numberInput').value;
    
    const url = `index.html?textInput=${textValue}&numberInput=${numberValue}`;
    
    window.location.href = url;
}