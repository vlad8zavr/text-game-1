
let mapTable = document.querySelector('.mapTable');

let currentRoom = "grove";
let isfound = false;
let rightCode = "192634";

// help button
$("#helpButton").click(function() {
    // show / hide div HELP block
    $("#helpContent").toggle();
    // замена названия кнопки show / hide
    if ($('#helpContent').css('display') !== 'none') {
      $("#helpButton").prop('value', 'Hide Help');
    } else if ($('#helpContent').css('display') == 'none') {
      $("#helpButton").prop('value', 'Show Help');
    }
});

// ( called in playerInput(input) )
function changeRoom(dir) {
  if (rooms[currentRoom].directions[dir] !== undefined) {
    // 1) remove class "currentLocationMap"
    mapTable.rows[rooms[currentRoom].onMap[0]].cells[rooms[currentRoom].onMap[1]].classList.remove('currentLocationMap');
    // change the currentRoom
    currentRoom = rooms[currentRoom].directions[dir];
    // 2) remove class "hideMapCell"
    // Note: Removing a class that does not exist, does NOT throw an error
    mapTable.rows[rooms[currentRoom].onMap[0]].cells[rooms[currentRoom].onMap[1]].classList.remove('hideMapCell');
    // 3) add class "currentLocationMap"
    mapTable.rows[rooms[currentRoom].onMap[0]].cells[rooms[currentRoom].onMap[1]].classList.add('currentLocationMap');
    // show the corect HTML code
    $('#game-text').prepend("<p>" + rooms[currentRoom].description + "</p>");
  } else {
    $('#game-text').prepend("<div class=\"incorrectCommand\"><p>You cannot do that!</p></div>");
  }
}

// ( called in playerInput(input) )
function searchRoom(isfound) {
  if (rooms[currentRoom].items !== undefined) {
    isfound = true;
    $('#game-text').prepend("<p>" + rooms[currentRoom].items.description + "</p>");
  } else {
    $('#game-text').prepend(nothingHere);
  }
    return isfound;
}

// ( called in playerInput(input) )
function pickupItem(isfound) {
  if (rooms[currentRoom].items !== undefined && isfound) {
    // add an item to the inventory
    inventory.push(rooms[currentRoom].items.item);
    $('#game-text').prepend("<div class=\"pickupItem\"><p>You've picked up the <strong>" + rooms[currentRoom].items.item + "</strong>.\
      </p></div>");

    // display inventory in div
    displayInventory();

    // delete an item from this location
    delete rooms[currentRoom].items;
  } else {
    $('#game-text').prepend(nothingHere);
  }
}

// ( called in pickupItem(isfound) )
function displayInventory() {
   if (inventory.length === 0) {
     return;
   }
   $('.displayInventory').append("<span class=\"inventoryItem\">" + inventory[inventory.length - 1] + "</span>" + "<br>");
 }

// check, if the <string> is a part of the inventory
// ( called in useItem(thing), sayCode(inputCode) )
function isItem(string) {
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i] === string) {
      return true;
    }
  }
  return false;
}

// open the closed rooms
// ( called in useItem(thing) )
function goToOpenRoom() {
  //rooms[currentRoom] = + OPEN
  currentRoom = currentRoom + "Open";
  // show the corect HTML code
  $('#game-text').prepend("<p>" + rooms[currentRoom].description + "</p>");
}

// ( called in playerInput(input) )
function useItem(thing) {
  // if inventory is empty
  if (inventory.length === 0) {
    $('#game-text').prepend("<p>You are not carrying anything.</p>");
    return;
  }
  // if cave
  if (rooms[currentRoom] === rooms.cave && isItem("flashlight") && thing === "flashlight") {
    goToOpenRoom();
  }
  // if house
  else if (rooms[currentRoom] === rooms.house && isItem("key") && thing === "key") {
    goToOpenRoom();
  }
  else {
    $('#game-text').prepend("<div class=\"incorrectCommand\"><p>You can't use it here.</p></div>");
  }
}

// ( called in playerInput(input) )
function sayCode(inputCode) {
  //if inventory is empty
  if (inventory.length === 0) {
    $('#game-text').prepend("<div class=\"incorrectCommand\"><p>You don't know the password.</p></div>");
    return;
  }
  // if the player has all the part of the code and he is in the right place
  if (isItem("code part: 19") &&
      isItem("code part: 26") &&
      isItem("code part: 34") &&
      rooms[currentRoom] === rooms.sailor &&
      inputCode === rightCode) {
    // DELETE INPUT (add share buttons)
    $('#user-input').css("display","none");
    $('#game-text').prepend("<p>CONGRATULATIONS! You've completed the game!</p>");
    // Show RESTART BUTTON
    $('#restartBtnDiv').show();
    // restart the game
    restartTextGame();
  }
  // if other location
  else if (isItem("code part: 19") &&
          isItem("code part: 26") &&
          isItem("code part: 34") &&
          rooms[currentRoom] !== rooms.sailor) {
    $('#game-text').prepend("<div class=\"incorrectCommand\"><p>You are not in the right place.</p></div>");
  }
  // if the code is incorrect
  else if (isItem("code part: 19") &&
          isItem("code part: 26") &&
          isItem("code part: 34") &&
          inputCode !== rightCode) {
    $('#game-text').prepend("<div class=\"incorrectCommand\"><p>The password is incorrect.</p></div>");
  }
  // if the player don't have all the parts of the code
  else if (isItem("code part: 19") ||
          isItem("code part: 26") ||
          isItem("code part: 34")) {
    $('#game-text').prepend("<div class=\"incorrectCommand\"><p>You don't have all the parts of the password.</p></div>");
  }
  else {
    $('#game-text').prepend("<div class=\"incorrectCommand\"><p>You don't know the password.</p></div>");
  }
}

// ( called in startTextGame() )
function playerInput(input) {
  // split the input string to words and return the [0] index
  let command = input.split(" ")[0];
  switch(command) {
    case "go":
      let dir = input.split(" ")[1];
      changeRoom(dir);
      break;
    case "search":
      isfound = searchRoom(isfound);
      break;
    case "pickup":
      pickupItem(isfound);
      isfound = false;
      break;
    case "use":
      let thing = input.split(" ")[1];
      useItem(thing);
      break;
    case "say":
      let inputCode = input.split(" ")[1];
      sayCode(inputCode);
      break;
    default:
      changeRoom(command);
  }
}

// ( called in $(document).ready )
function startTextGame() {
  $('#game-text').prepend("<p>" + rooms.grove.description + "</p>");
  // event listener
  $(document).keypress(function(key){
        // Enter => 13
    if (key.which === 13 && $('#user-input').is(':focus')) {
      let value = $('#user-input').val().toLowerCase();
      // очистка поля ввода
      $('#user-input').val('');
      playerInput(value);
    }
  })
}

// ( called in sayCode() )
function restartTextGame() {
  $("#restartButton").click(function() {
    // restart web page
    location.reload();
  })
}

// main function
$(document).ready(function() {
  $("#startButton").click(function() {
    // show mainField div
    $("#mainField").show();
    // hide startBtnDiv
    $("#startBtnDiv").hide();
    // start the game
    startTextGame();
  })
})
