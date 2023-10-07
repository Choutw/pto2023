var dice_button = document.getElementById("dice_button");
var dice_number = document.getElementById("dice_number");
var player_name = document.getElementById("player_name");
var alerts = document.getElementById("alerts");

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
player_coin.innerText = "TEST";

//var player1_coin = document.createElement("div");
//player1_coin.setAttribute("id", "player_coin1");
//player1_coin.innerText = "P1";

//var player2_coin = document.createElement("div");
//player2_coin.setAttribute("id", "player_coin2");
//player2_coin.innerText = "P2";

//var current_player = true;
//var player_counter = [0, 0, 0];

// Old
var player_counter = [0, 0];

// New
var global_counter = 0;

window.addEventListener("load", start);

function start() {
  dice_button.addEventListener("click", dice_rolled);
}

function dice_rolled() {
  dice_number.innerText = random();
  //append_element(player_picker());
  player_name.innerHTML = "Player";
  append_element();
}

function random() {
  var random_number = Math.ceil(Math.random() * 10);
  if (random_number > 6) {
    random_number = 11 - random_number;
  }
  return random_number;
}

/*
function player_picker() {
  if (current_player) {
    current_player = false;
    player_name.innerHTML = "Player 2";
    return 1;
  } else {
    current_player = true;
    player_name.innerText = "Player 1";
    return 2;
  }
}*/


// Old
/*function id_creator(num) {
  return "box_" + num;
}*/

// New
function id_creator(num) {
  return "box_" + num;
}

/*function coin_id_creator(num) {
  var string = "player_coin";
  string = string + num;
  return string;
}*/

/*
function counter(player) {
  if (player_counter[player] + Number(dice_number.innerText) > 36) {
    // do nothing 
  } else {
    player_counter[player] =
      player_counter[player] + Number(dice_number.innerText);
  }
}*/

// Do calculation
function counter() {
  if (global_counter + Number(dice_number.innerText) > 36) {
    global_counter = 36;
  } else {
    global_counter = global_counter + Number(dice_number.innerText);
  }
}

/*
function append_element(player) {
   (player);
  console.log(player_counter[player]);
  var player_next_position = document.getElementById(
    id_creator(player_counter[player])
  );
  if (player == 1) {
    player_next_position.append(player1_coin);
  } else {
    player_next_position.append(player2_coin);
  }
  snake_or_ladder(player_counter[player], player);
}*/

// New
function append_element() {
 //(player);
 counter();
 popFunction();
 console.log(global_counter);
 var player_next_position = document.getElementById(
   id_creator(global_counter)
 );

 player_next_position.append(player_coin);
 snake_or_ladder(global_counter);
}

/*
function snake_or_ladder(counter, player) {
  for (i = 0; i < snakePositions.length; i++) {
    const { start, end } = snakePositions[i];
    if (counter == start) {
      player_counter[player] = end;
      after_snake_or_ladder(player);
      alerts.innerText = `Player ${player} got snake to: ${end}`;
    }
  }

  for (j = 0; j < ladderPositions.length; j++) {
    const { start, end } = ladderPositions[j];
    if (counter == start) {
      player_counter[player] = end;
      after_snake_or_ladder(player);
      alerts.innerText = `Player ${player} got ladder to: ${end}`;
    }
  }

  if (counter == 36) {
    alert(`Player ${player} won the game`);
  }
}*/


// New
function snake_or_ladder(counter) {
  for (i = 0; i < snakePositions.length; i++) {
    const { start, end } = snakePositions[i];
    if (counter == start) {
      global_counter = end;
      after_snake_or_ladder();
      alerts.innerText = `Player got snake to: ${end}`;
    }
  }

  for (j = 0; j < ladderPositions.length; j++) {
    const { start, end } = ladderPositions[j];
    if (counter == start) {
      global_counter = end;
      after_snake_or_ladder();
      alerts.innerText = `Player got ladder to: ${end}`;
    }
  }

  if (counter >= 36) {
    alert(`Player won the game`);
  }
}

function after_snake_or_ladder() {

  var player_next_position = document.getElementById(
    id_creator(global_counter)
  );
  
  player_next_position.append(player_coin);
  
}

function popFunction() {

  if (global_counter >= 1) {

    checkTable(global_counter);
    console.log(planet_Dt);

    var popup = document.getElementById("myPopup");
    popup.innerText=JSON.stringify(planet_Dt[planet_Dt.length-1]["Act"]); 
    //popup.classList.toggle("show");
    popup.style.visibility = "visible" ;
    popup.style['-webkit-animation']= 'fadeIn 1s';
    popup.style['animation']= 'fadeIn 1s';

    document.getElementById("myImg").src="https://www.nasa.gov/wp-content/uploads/2017/03/psychelongshot0718b_1041x805.jpg";
    getModal();

  }
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


var planet_Dt = [];
var change = 0;

function checkTable(gl_num){

  d3.csv("test.csv").then(rawData =>{

      rawData.forEach(function(d){

        //data for map
        d.num = Number(d.num);
        d.Activity = String(d.Activity);
        d.Location=String(d.Location);
        d.Description=Number(d.Description);

        if(gl_num == d.num){
          planet_Dt.push({Act: d.Activity, Loc: d.Location, Desc: d.Description});
          change = 1;
        }
      });

    }//end of csv load.

  ).catch(function(error){
        console.log(error);
  });

  if(!change){
    planet_Dt.push({Act: "Upcoming", Loc: NaN, Desc: NaN});
    change = 0;
  }

}