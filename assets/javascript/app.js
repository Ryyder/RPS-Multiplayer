// Initialize Firebase
var config = {
  apiKey: "AIzaSyCiQW1qUly3N10rwvyOIg9Bh6SEQinZeZo",
  authDomain: "rps-online-1ad52.firebaseapp.com",
  databaseURL: "https://rps-online-1ad52.firebaseio.com",
  projectId: "rps-online-1ad52",
  storageBucket: "rps-online-1ad52.appspot.com",
  messagingSenderId: "903360965756"
};

firebase.initializeApp(config);

//firebase database variable
var database = firebase.database();
//holds boolean value for connected players
var playerConnection = database.ref("/playerConnection");
var isConnected = database.ref(".info/connected");
//directory hold player structure
var playerList = database.ref("/players");
//directory for player one
var playerListOne = database.ref("/players/1");
//directory for player two
var playerListTwo = database.ref("/players/2");
//directory that holds player one name
var playerListOneName = database.ref("/players/1/Name");
//directory that holds player two name
var playerListTwoName = database.ref("/players/2/Name");
//directory that holds player one wins
var playerListOneWins = database.ref("/players/1/Wins");
//directory that holds player two wins
var playerListTwoWins = database.ref("/players/2/Wins");
//directory that holds player one losses
var playerListOneLosses = database.ref("/players/1/Losses");
//directory that holds player two losses
var playerListTwoLosses = database.ref("/players/2/Losses");
//directory that holds player one choice
var playerListOneChoice = database.ref("/players/1/Choice");
//directory that holds player two choice
var playerListTwoChoice = database.ref("/players/2/Choice");
//variable to hold player one wins
var playerOneWinCount = 0;
//variable to hold player one losses
var playerOneLossCount = 0;
//variable to hold player two wins
var playerTwoWinCount = 0;
//variable to hold player two losses
var playerTwoLossCount = 0;
//initialize player one name null
var playerOneName = null;
//initialize player two name null
var playerTwoName = null;
//initialize player one turn false
var playerOneTurn = false;
//initialize player two turn false
var playerTwoTurn = false;
//initialize player one choice null
var playerOneChoice = null;
//initialize player two choice null
var playerTwoChoice = null;


//event handler for player one....
playerListOneName.on("value", function (snap) {

  //if it exists, we get the value and output to html in player one spot
  if (snap.exists()) {
    playerOneName = snap.val();
    $("#player-one-name").html(playerOneName);
    $("#player-one-wait").hide();
  }
  //if it doesn't exits, we show our waiting for.... text
  if (snap.exists() === false) {
    $("#player-one-name").html("");
    $("#player-one-wait").show();
    $(".player-one-buttons").hide();
  }
  
});

//event handler for player two...
playerListTwoName.on("value", function (snap) {
  
  //if it exists, we get the value and output to html in player two spot
  if (snap.exists()) {
    playerTwoName = snap.val();
    $("#player-two-name").html(playerTwoName);
    $("#player-two-wait").hide();
  }
  //if it doesn't exist, we show waiting for.... text
  if (snap.exists() === false) {
    $("#player-two-name").html("");
    $("#player-two-wait").show();
    $(".player-one-buttons").hide();
  }

});

//event handler for player one wins
playerListOneWins.on("value", function (snap) {
  
  //if there is a win, get the value and output to html in player one position
  if (snap.exists()) {
    playerOneWinCount = snap.val();
    $("#player-one-win").html(playerOneWinCount);
    $(".score-player-one").show();
  }
  //hide player one score if there is nothing
  else {
    $(".score-player-one").hide();
  }

});

//event handler for player two wins....
playerListTwoWins.on("value", function (snap) {
  
  //if there is a win, get the value and output to html in player two position
  if (snap.exists()) {
    playerTwoWinCount = snap.val();
    $("#player-two-win").html(playerTwoWinCount);
    $(".score-player-two").show();
  }
  //hide player two score if there is nothing
  else {
    $(".score-player-two").hide();
  }

});

//event handler for player one losses.....
playerListOneLosses.on("value", function (snap) {

  //if there is a loss, get the value and output to html in the player one position
  if (snap.exists()) {
    playerOneLossCount = snap.val();
    $("#player-one-loss").html(playerOneLossCount);
    $(".score-player-one").show();
  }
  //hide player one score if there is nothing
  else {
    $(".score-player-one").hide();
  }

});

//event handler for player two losses...
playerListTwoLosses.on("value", function (snap) {

  //if there is a loss, get the value and output to html in the player two position
  if (snap.exists()) {
    playerTwoLossCount = snap.val();
    $("#player-two-loss").html(playerTwoLossCount);
    $(".score-player-two").show();
  }
  //hide player two score if there is nothing
  else {
    $(".score-player-two").hide();
  }

});

//our function to get our player one info....
function startPlayerOne() {

  //get the value from our text form
  playerOneName = $("#name-input").val().trim();

  //if player one input is not an emptry string...
  if (playerOneName != "") {
  //output to html in the player one position
  $("#player-one-name").html(playerOneName);
  //output to html in our greetings class container
  $("#user-name").html(playerOneName);
  $("#user-number").html(" 1");
  $(".greetings").show();
  //set our values for player one in the database
  database.ref("/players/1").set({
    Name: playerOneName,
    Wins: playerOneWinCount,
    Losses: playerOneLossCount
  });
  //clear the text form
  $("#name-input").val("");
  //hide the submit button from player one
  $(".name-submit").hide();
  //hide the waiting for player one text
  $("#player-one-wait").hide();
  //output player one win and loss to html
  $("#player-one-win").html(playerOneWinCount);
  $("#player-one-loss").html(playerOneLossCount);
  $(".score-player-one").show();
  }

}

//our function to get our player two info....
function startPlayerTwo() {
  
  //get the value from our text form
  playerTwoName = $("#name-input").val().trim();

  //if player two input is not the empty string...
  if (playerTwoName != "") {
  //outout to our html in player two position
  $("#player-two-name").html(playerTwoName);
  //output to our html in our greeting class container
  $("#user-name").html(playerTwoName);
  $("#user-number").html(" 2");
  $(".greetings").show();
  //set our values for player two in the database
  database.ref("/players/2").set({
    Name: playerTwoName,
    Wins: playerTwoWinCount,
    Losses: playerTwoLossCount
  });
  //clear the text form
  $("#name-input").val("");
  $(".name-submit").hide();
  $("#player-two-wait").hide();
  //output player two win and loss to html
  $("#player-two-win").html(playerTwoWinCount);
  $("#player-two-loss").html(playerTwoLossCount);
  $(".score-player-two").show();
  }

}

//add user click event handler....
$("#name-submit").on("click", function (event) {

  // Preventing the submit button from trying to submit the form
  // We're optionally using a form so the user may hit Enter to search instead of clicking the button
  event.preventDefault();

  //if player one and player two are null
  if (playerOneName === null && playerTwoName === null) {
    //start our player one
    startPlayerOne();
    playerOneTurn = true;
    //remove player one on disconnect
    database.ref("/players/1").onDisconnect().remove();
    return;
  }

  //if there is player one and no player two
  if (playerOneName != null && playerTwoName === null) {
    //start our player two
    startPlayerTwo();
    //show our waiting message
    $(".wait-message").show();
    //remove player two on disconnect
    database.ref("/players/2").onDisconnect().remove();
    return;
  }

  //if there is player two and no player one
  if (playerOneName === null && playerTwoName != null) {
    //start our player one
    startPlayerOne()
    playerOneTurn = true;
    //show rock, paper, scissors
    $(".player-one-buttons").show();
    //remove player one on disconnect
    database.ref("/players/1").onDisconnect().remove();
    return;
  }

});

//on player one win...
function playerOneWin() {

  //increment player one wins
  playerOneWinCount++;
  //write into db the player two values
  database.ref("/players/2").set({
    Name: playerTwoName,
    Wins: playerTwoWinCount,
    Losses: playerTwoLossCount,
    Choice: null
  });
  //write into db the player one values
  database.ref("/players/1").set({
    Name: playerOneName,
    Wins: playerOneWinCount,
    Losses: playerOneLossCount,
    Choice: null
  });
  //output our win message
  $("#event-msg").html(playerOneName + " Wins!");
  $("#event-msg").show();
  //hide win message after 3 seconds
  setTimeout(function hideMiddleMessage() {
    $("#event-msg").hide();
  }, 3000);
  //show player one choice
  $("#choice-player-one").show();
  //show player two choice
  $("#choice-player-two").show();
  //hide player one choice after 3 seconds
  setTimeout(function hidePlayerOneChoice() {
    $("#choice-player-one").hide();
  }, 3000);
  //hide player two choice after 3 seconds
  setTimeout(function hidePlayerTwoChoice() {
    $("#choice-player-two").hide();
  }, 3000);

}

//on player two win...
function playerTwoWin() {

  //increment player two win
  playerTwoWinCount++;
  //write into db player two values
  database.ref("/players/2").set({
    Name: playerTwoName,
    Wins: playerTwoWinCount,
    Losses: playerTwoLossCount,
    Choice: null
  });
  //write into db player one values
  database.ref("/players/1").set({
    Name: playerOneName,
    Wins: playerOneWinCount,
    Losses: playerOneLossCount,
    Choice: null
  });
  //output our win message
  $("#event-msg").html(playerTwoName + " Wins!");
  $("#event-msg").show();
  //hide our win message after 3 seconds
  setTimeout(function hideMiddleMessage() {
    $("#event-msg").hide();
  }, 3000);
  //show player one choice
  $("#choice-player-one").show();
  //show player two choice
  $("#choice-player-two").show();
  //hide player one choice after 3 seconds
  setTimeout(function hidePlayerOneChoice() {
    $("#choice-player-one").hide();
  }, 3000);
  //hide player two choice after 3 seconds
  setTimeout(function hidePlayerTwoChoice() {
    $("#choice-player-two").hide();
  }, 3000);

  playerTwoTurn = false;

}

//on player one loss...
function playerOneLoss() {

  //increment our player one loss counter
  playerOneLossCount++;
  //set db values for player two
  database.ref("/players/2").set({
    Name: playerTwoName,
    Wins: playerTwoWinCount,
    Losses: playerTwoLossCount,
    Choice: null
  });
  //set db values for player one
  database.ref("/players/1").set({
    Name: playerOneName,
    Wins: playerOneWinCount,
    Losses: playerOneLossCount,
    Choice: null
  });

}

//on player two loss....
function playerTwoLoss() {

  //increment ouru player two loss counter
  playerTwoLossCount++;
  //set db values for player two
  database.ref("/players/2").set({
    Name: playerTwoName,
    Wins: playerTwoWinCount,
    Losses: playerTwoLossCount,
    Choice: null
  });
  //set db values for player one
  database.ref("/players/1").set({
    Name: playerOneName,
    Wins: playerOneWinCount,
    Losses: playerOneLossCount,
    Choice: null
  });
  playerTwoTurn = false;

}

//on tie game...
function tieGame() {
  //show player one choice
  $("#choice-player-one").show();
  //show player two choice
  $("#choice-player-two").show();
  //timer to hide player one choice
  setTimeout(function hidePlayerOneChoice() {
    $("#choice-player-one").hide();
  }, 3000);
  //timer to hide player two choice
  setTimeout(function hidePlayerTwoChoice() {
    $("#choice-player-two").hide();
  }, 3000);
  //output our message
  $("#event-msg").html("Tie Game!");
  $("#event-msg").show();
  //hide our message
  setTimeout(function hideMiddleMessage() {
    $("#event-msg").hide();
  }, 3000);
  playerTwoTurn = false;
  //set our db values for player two
  database.ref("/players/2").set({
    Name: playerTwoName,
    Wins: playerTwoWinCount,
    Losses: playerTwoLossCount,
    Choice: null
  });
  //set our db values for player one
  database.ref("/players/1").set({
    Name: playerOneName,
    Wins: playerOneWinCount,
    Losses: playerOneLossCount,
    Choice: null
  });

}

//listen for value on playerlistonechoice directory
playerListOneChoice.on("value", function (snap) {

  //if player one exists and has made a choice...
  if (snap.exists() && playerOneTurn === false) {   
    //show player two choices       
    $(".player-two-buttons").show();
    //output your turn to player two
    $(".player-turn").show();
    //hide waiting message
    $(".wait-message").hide();
    //grab player one choice
    playerOneChoice = snap.val();
    $("#choice-player-one").hide();
    $("#choice-player-one").html(playerOneChoice);
  }

});

//listen for value on playerlisttwochoice directory
playerListTwoChoice.on("value", function (snap) {
  //if player two exists...
  if (snap.exists()) {
    //get player two choice
    playerTwoChoice = snap.val();
    $("#choice-player-two").html(playerTwoChoice);
    $(".wait-message").hide();
    //call our rps logic
    rpsLogic();
  }

});

//listen for value on playerlist
playerList.on("value", function (snap) {

  //if there are two players and player one turn
  if (snap.numChildren() === 2 && playerOneTurn === true) {                   //show player one choices
    $(".player-one-buttons").show();
    $(".player-turn").show();
    playerTwoTurn = true;
  }

});


$(".player-one").on("click", function(){

  playerOneChoice = $(this).attr("data-value");

  database.ref("/players/1").set({
    Name: playerOneName,
    Wins: playerOneWinCount,
    Losses: playerOneLossCount,
    Choice: playerOneChoice
  });
  $("#choice-player-one").html(playerOneChoice);
  $("#choice-player-one").show();
  $(".player-one-buttons").hide();
  $(".player-turn").hide();
  $(".wait-message").show();

});

$(".player-two").on("click", function(){

  playerTwoChoice = $(this).attr("data-value");

  console.log(playerTwoChoice);

  database.ref("/players/2").set({
    Name: playerTwoName,
    Wins: playerTwoWinCount,
    Losses: playerTwoLossCount,
    Choice: playerTwoChoice
  });
  $("#choice-player-two").html(playerTwoChoice);
  $("#choice-player-two").show();
  $(".player-two-buttons").hide();
  $(".player-turn").hide();

});

//our rock paper scissor logic...
function rpsLogic() {

  if (playerOneChoice === "Rock" && playerTwoChoice === "Rock") {
    tieGame();
  }

  else if (playerOneChoice === "Rock" && playerTwoChoice === "Paper") {
    playerOneLoss();
    playerTwoWin();
  }

  else if (playerOneChoice === "Rock" && playerTwoChoice === "Scissors") {
    playerOneWin();
    playerTwoLoss();
  }

  else if (playerOneChoice === "Paper" && playerTwoChoice === "Rock") {
    playerOneWin();
    playerTwoLoss();
  }

  else if (playerOneChoice === "Paper" && playerTwoChoice === "Paper") {
    tieGame();
  }

  else if (playerOneChoice === "Paper" && playerTwoChoice === "Scissors") {
    playerOneLoss();
    playerTwoWin();
  }

  else if (playerOneChoice === "Scissors" && playerTwoChoice === "Rock") {
    playerOneLoss();
    playerTwoWin();
  }

  else if (playerOneChoice === "Scissors" && playerTwoChoice === "Paper") {
    playerOneWin();
    playerTwoLoss();
  }

  else if (playerOneChoice === "Scissors" && playerTwoChoice === "Scissors") {
    tieGame();
  }

}

//when the client connection state changes
isConnected.on("value", function (snap) {

  //if connected...
  if (snap.val()) {
    //add user to connection list
    var playerConnect = playerConnection.push(true);
    //remove user from connection list when they disconnect
    playerConnect.onDisconnect().remove();
  }

});


//check for more than 2 people
database.ref().once("value", function (snap) {

  //if player 1 and player 2 exist
  if (snap.child("players/2").exists() === true && snap.child("players/1").exists() === true) {
    $(".player-limit").show();
    $(".name-submit").hide();
    return;
  }

});

//Hide the necessary pieces on loading the page
$(document).ready(function () {
  $(".greetings").hide();
  $(".player-turn").hide();
  $(".wait-message").hide();
  $(".player-limit").hide();
  $(".score-player-one").hide();
  $(".score-player-two").hide();
  $(".player-one-buttons").hide();
  $(".player-two-buttons").hide();
});


