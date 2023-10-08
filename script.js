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

alert(`Welcome`);

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

 counter();
 console.log(global_counter);
 var player_next_position = document.getElementById(
   id_creator(global_counter)
 );

 player_next_position.append(player_coin);

 snake_or_ladder(global_counter);

}


function snake_or_ladder(counter) {

  if (total_counter > budget) {
    alert(`Tourists can not go HOME!!!`);
  }

  /* Also consider the untype budget */
  if ((counter >= 36)&&((budget > 0)||(budget == null))){
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
      alerts.innerText = `Go to ${end} by wormwhole`;
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


function showalert(){
  alert("1. Each player starts at 0.\n2. Pawns move on the basis of the dice rolled.\n3. If you reach a 'wormhole' box you go up to the number mentioned.\n4. If you reach a '' you go down to the number mentioned.\n5. The first person to reach finish wins the game\n");
}