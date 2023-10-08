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

// New
function id_creator(num) {
  return "box_" + num;
}

// Do calculation
function counter() {
  if (global_counter + Number(dice_number.innerText) > 36) {
    global_counter = 36;
  } else {
    global_counter = global_counter + Number(dice_number.innerText);
  }
}

// New
function append_element() {
 //(player);
 counter();
 popFunction();
 //console.log(global_counter);
 var player_next_position = document.getElementById(
   id_creator(global_counter)
 );

 player_next_position.append(player_coin);
 snake_or_ladder(global_counter);
}

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
    console.log(getObject_Act);
    console.log(getObject_Num);
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