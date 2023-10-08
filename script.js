var dice_button = document.getElementById("dice_button");
var dice_number = document.getElementById("dice_number");
var player_name = document.getElementById("player_name");
var alerts = document.getElementById("alerts");

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

/* Flag to control hidden button */ 
var complete_flag = true;

const snakePositions = [
  { start: 14, end: 3 },
  { start: 19, end: 5 },
  { start: 29, end: 13 },
  { start: 35, end: 1 },
];

const ladderPositions = [
  { start: 2, end: 17 },
  { start: 8, end: 22 },
  { start: 21, end: 32 },
  { start: 25, end: 31 },
];

var player_coin = document.createElement("div");
player_coin.setAttribute("id", "player_coin");


// Counter for current moves
var global_counter = 0;

// Counter for all moves
var total_counter = 0;


window.addEventListener("load", start);

alert(`Welcome to PTO Travel!\n\
where we will take you on a captivating journey through the terrestrial planets of the solar system and several of their enchanting satellites.\n\
Each of these celestial bodies possesses its own unique allure, and while you may not yet be certain which destinations to explore in-depth, this game will introduce you to their distinctive features.\n\
Moreover, it will calculate the associated costs and determine the feasibility of such journeys based on your budget.\n\
Let us embark on a mysterious and exhilarating space voyage together!\n`);

function start() {

  readName.addEventListener('click', name_updated);
  readBudget.addEventListener('click', budget_updated);
  dice_button.addEventListener("click", dice_rolled);

}

function name_updated(){
  username = textInput.value;
  nameDisplay.textContent = username;
  player_coin.innerText = username;
}

function budget_updated(){
  budget = numberInput.value;
  numberDisplay.textContent = budget;
}

function dice_rolled() {
  
  dice_number.innerText = random();
  //player_name.innerHTML = "Player";
  player_name.innerHTML = username;
  append_element();
}

// Random function
function random() {
  var random_number = Math.ceil(Math.random() * 10);
  if (random_number > 6) {
    random_number = 11 - random_number;
  }
  return random_number;
}

// Decide BOX number
function id_creator(num) {
  return "box_" + num;
}

/* Game rules */ 
function showalert(){
  alert("1. Please enter your name and budget, then press the “Confirm” button.\n\
  2. Once your name and budget are confirmed, click on “Roll the Dice” to begin your journey.\n\
  The rolled number will be a random integer between 1 and 6, representing the number of steps you advance.\n\
  Each step consumes 1 budget point until you either reach the destination with the remaining budget or just use up your budget, signifying a successful completion of the trip back to Earth.\n\
  3. Various events will occur on the map:\n\
  \n\
  Regular Sightseeing Event: Visit specific landmarks on different planets, each with intriguing stories to discover.\n\
  In-Transit Event: Continue your journey through space with no special occurrences.\n\
  Wormhole Event: Enter a wormhole to travel to a more distant location.\n\
  Asteroid Impact Event: Impacted by asteroid, causing you to move back a few steps in your journey.\n\
  \n\
  4. If your budget is depleted before reaching the destination, the trip will be deemed a failure.\n\
  5. Upon completing the journey, click “Check Result” to view the visited landmarks and their descriptions, serving as a reference for your travels.\n");
}

// Do moves calculation
function counter() {

  if (global_counter + Number(dice_number.innerText) > 36) {
    global_counter = 36;
  } else {
    global_counter = global_counter + Number(dice_number.innerText);
  }

  total_counter = total_counter + Number(dice_number.innerText);

}

// New
function append_element() {
 
 /* Call calculator function */
 counter();
 /* Call pop-up function */
 popFunction();

 console.log(global_counter);
 var player_next_position = document.getElementById(
   id_creator(global_counter)
 );

 player_next_position.append(player_coin);

 snake_or_ladder(global_counter);

}


function snake_or_ladder(counter) {

  if (total_counter > budget) {

    /* For debug */
    console.log(getObject_Act);
    console.log(getObject_Num);

    /* Show message */
    alert(`Tourists can not go HOME!!!`);
  }

  /* Also consider the untype budget */
  if ((counter >= 36)&&((budget > 0)||(budget == null))){
    
    /* For debug */
    console.log(getObject_Act);
    console.log(getObject_Num);

    /* Show message */
    alert(`Tourists back to EARTH!`);
  }

  for (i = 0; i < snakePositions.length; i++) {
    const { start, end } = snakePositions[i];
    if (counter == start) {
      global_counter = end;
      after_snake_or_ladder();
      alerts.innerText = `Asteroid hit! Go to ${end}`;
    }
  }

  for (j = 0; j < ladderPositions.length; j++) {
    const { start, end } = ladderPositions[j];
    if (counter == start) {
      global_counter = end;
      after_snake_or_ladder();
      alerts.innerText = `Go to ${end} by wormhole`;
    }
  }

  //alerts.innerText = `Moves so far: ${total_counter}`;
  show_budget_text.innerText = `Total mileage: ${total_counter}/${budget}`;

}

function after_snake_or_ladder() {

  var player_next_position = document.getElementById(
    id_creator(global_counter)
  );

  player_next_position.append(player_coin);

}


/* Pop up main function */ 

function popFunction() {

  //if (global_counter >= 1) {

    checkTable(global_counter);

    var popup = document.getElementById("myPopup");
    popup.innerText = "Depart from: " + JSON.stringify(getObject_Num[getObject_Num.length-2]) + ". " + JSON.stringify(getObject_Act[getObject_Act.length-1]); 
    console.log(global_counter);
    console.log(popup.innerText);

    //popup.classList.toggle("show");
    popup.style.visibility = "visible" ;
    popup.style['-webkit-animation']= 'fadeIn 1s';
    popup.style['animation']= 'fadeIn 1s';

    document.getElementById("myImg").src="https://www.nasa.gov/wp-content/uploads/2017/03/psychelongshot0718b_1041x805.jpg";
    getModal();

  //}
}

function getModal() {

   // Get the modal
   var modal = document.getElementById("myModal");

   // Get the image and insert it inside the modal - use its "alt" text as a caption
   var img = document.getElementById("myImg");
   var modalImg = document.getElementById("img01");
   var captionText = document.getElementById("caption");
   img.onclick = function(){
     modal.style.display = "block";
     modalImg.src = this.src;
     captionText.innerHTML = this.alt;
   }

   // Get the <span> element that closes the modal
   var span = document.getElementsByClassName("close")[0];

   // When the user clicks on <span> (x), close the modal
   span.onclick = function() { 
     modal.style.display = "none";
   }

}


var getObject_Act = [];
var getObject_Num = [];
let change = false;

function checkTable(gl_num){

  getObject_Num.push(gl_num);

  //Read csv
  d3.csv("test.csv").then(test_rawData =>{

      change = false;

      let test = test_rawData.map(d=>{

          return {
          
            "Num":Number(d['num']),
            "Act":String(d['Activity']),
            "Loc":String(d['Location']),
            "Desc":String(d['Description']),
            "URL":String(d['Sources Link'])

          };

      });

      for (var i = 0; i < test.length; i++){
        if (gl_num == test[i]["Num"]){
          getObject_Act.push(test[i]["Act"]);
          change = true;
        }
      }

      if(!change){
        getObject_Act.push("Upcoming");
      }

      console.log(test["Num"]);
    }).catch(function(error){
    console.log(error);
  });

}