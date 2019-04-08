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
    $("#playeronename").html(playerOneName);
    $("#waitingforplayerone").hide();
  }
  //if it doesn't exits, we show our waiting for.... text
  if (snap.exists() === false) {
    $("#playeronename").html("");
    $("#waitingforplayerone").show();
    $(".playeronechoicesrow").hide();
  }
});

//event handler for player two...
playerListTwoName.on("value", function (snap) {
  
  //if it exists, we get the value and output to html in player two spot
  if (snap.exists()) {
    playerTwoName = snap.val();
    $("#playertwoname").html(playerTwoName);
    $("#waitingforplayertwo").hide();
  }
  //if it doesn't exist, we show waiting for.... text
  if (snap.exists() === false) {
    $("#playertwoname").html("");
    $("#waitingforplayertwo").show();
    $(".playeronechoicesrow").hide();
  }

});

//event handler for player one wins
playerListOneWins.on("value", function (snap) {
  
  //if there is a win, get the value and output to html in player one position
  if (snap.exists()) {
    playerOneWinCount = snap.val();
    $("#playeronewincount").html(playerOneWinCount);
    $(".playeronescore").show();
  }
  //hide player one score if there is nothing
  else {
    $(".playeronescore").hide();
  }

});

//event handler for player two wins....
playerListTwoWins.on("value", function (snap) {
  
  //if there is a win, get the value and output to html in player two position
  if (snap.exists()) {
    playerTwoWinCount = snap.val();
    $("#playertwowincount").html(playerTwoWinCount);
    $(".playertwoscore").show();
  }
  //hide player two score if there is nothing
  else {
    $(".playertwoscore").hide();
  }

});

//event handler for player one losses.....
playerListOneLosses.on("value", function (snap) {

  //if there is a loss, get the value and output to html in the player one position
  if (snap.exists()) {
    playerOneLossCount = snap.val();
    $("#playeronelosscount").html(playerOneLossCount);
    $(".playeronescore").show();
  }
  //hide player one score if there is nothing
  else {
    $(".playeronescore").hide();
  }

});

//event handler for player two losses...
playerListTwoLosses.on("value", function (snap) {

  //if there is a loss, get the value and output to html in the player two position
  if (snap.exists()) {
    playerTwoLossCount = snap.val();
    $("#playertwolosscount").html(playerTwoLossCount);
    $(".playertwoscore").show();
  }
  //hide player two score if there is nothing
  else {
    $(".playertwoscore").hide();
  }

});

//our function to get our player one info....
function startPlayerOne() {

  //get the value from our text form
  playerOneName = $("#playernameinput").val().trim();
  //output to html in the player one position
  $("#playeronename").html(playerOneName);
  //output to html in our greetings class container
  $("#playername").html(playerOneName);
  $("#playernumber").html(" 1");
  $(".greetings").show();
  //set our values for player one in the database
  database.ref("/players/1").set({
    Name: playerOneName,
    Wins: playerOneWinCount,
    Losses: playerOneLossCount
  });
  //clear the text form
  $("#playernameinput").val("");
  //hide the submit button from player one
  $(".namesubmission").hide();
  //hide the waiting for player one text
  $("#waitingforplayerone").hide();
  //output player one win and loss to html
  $("#playeronewincount").html(playerOneWinCount);
  $("#playeronelosscount").html(playerOneLossCount);
  $(".playeronescore").show();

}

//our function to get our player two info....
function startPlayerTwo() {
  
  //get the value from our text form
  playerTwoName = $("#playernameinput").val().trim();
  //outout to our html in player two position
  $("#playertwoname").html(playerTwoName);
  //output to our html in our greeting class container
  $("#playername").html(playerTwoName);
  $("#playernumber").html(" 2");
  $(".greetings").show();
  //set our values for player two in the database
  database.ref("/players/2").set({
    Name: playerTwoName,
    Wins: playerTwoWinCount,
    Losses: playerTwoLossCount
  });
  //clear the text form
  $("#playernameinput").val("");
  $(".namesubmission").hide();
  $("#waitingforplayertwo").hide();
  //output player two win and loss to html
  $("#playertwowincount").html(playerTwoWinCount);
  $("#playertwolosscount").html(playerTwoLossCount);
  $(".playertwoscore").show();

}

//add user click event handler....
$(document).on("click", "#adduser", function () {

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
    $(".waitingmessage").show();
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
    $(".playeronechoicesrow").show();
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
  $("#middlemessage").html(playerOneName + " Wins!");
  $("#middlemessage").show();
  //hide win message after 3 seconds
  setTimeout(function hideMiddleMessage() {
    $("#middlemessage").hide();
  }, 3000);
  //show player one choice
  $("#playeronechoice").show();
  //show player two choice
  $("#playertwochoice").show();
  //hide player one choice after 3 seconds
  setTimeout(function hidePlayerOneChoice() {
    $("#playeronechoice").hide();
  }, 3000);
  //hide player two choice after 3 seconds
  setTimeout(function hidePlayerTwoChoice() {
    $("#playertwochoice").hide();
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
  $("#middlemessage").html(playerTwoName + " Wins!");
  $("#middlemessage").show();
  //hide our win message after 3 seconds
  setTimeout(function hideMiddleMessage() {
    $("#middlemessage").hide();
  }, 3000);
  //show player one choice
  $("#playeronechoice").show();
  //show player two choice
  $("#playertwochoice").show();
  //hide player one choice after 3 seconds
  setTimeout(function hidePlayerOneChoice() {
    $("#playeronechoice").hide();
  }, 3000);
  //hide player two choice after 3 seconds
  setTimeout(function hidePlayerTwoChoice() {
    $("#playertwochoice").hide();
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
  $("#playeronechoice").show();
  //show player two choice
  $("#playertwochoice").show();
  //timer to hide player one choice
  setTimeout(function hidePlayerOneChoice() {
    $("#playeronechoice").hide();
  }, 3000);
  //timer to hide player two choice
  setTimeout(function hidePlayerTwoChoice() {
    $("#playertwochoice").hide();
  }, 3000);
  //output our message
  $("#middlemessage").html("Tie Game!");
  $("#middlemessage").show();
  //hide our message
  setTimeout(function hideMiddleMessage() {
    $("#middlemessage").hide();
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
    $(".playertwochoicesrow").show();
    //output your turn to player two
    $(".yourturn").show();
    //hide waiting message
    $(".waitingmessage").hide();
    //grab player one choice
    playerOneChoice = snap.val();
    $("#playeronechoice").hide();
    $("#playeronechoice").html(playerOneChoice);
  }

});

//listen for value on playerlisttwochoice directory
playerListTwoChoice.on("value", function (snap) {
  //if player two exists...
  if (snap.exists()) {
    //get player two choice
    playerTwoChoice = snap.val();
    $("#playertwochoice").html(playerTwoChoice);
    $(".waitingmessage").hide();
    //call our rps logic
    evaluateChoices();
  }

});

//listen for value on playerlist
playerList.on("value", function (snap) {

  //if there are two players and player one turn
  if (snap.numChildren() === 2 && playerOneTurn === true) {                   //show player one choices
    $(".playeronechoicesrow").show();
    $(".yourturn").show();
    playerTwoTurn = true;
  }

});


$(document).on("click", "#playeronerock", function () {
  playerOneChoice = "Rock";
  database.ref("/players/1").set({
    Name: playerOneName,
    Wins: playerOneWinCount,
    Losses: playerOneLossCount,
    Choice: playerOneChoice
  });
  $("#playeronechoice").html(playerOneChoice);
  $("#playeronechoice").show();
  $(".playeronechoicesrow").hide();
  $(".yourturn").hide();
  $(".waitingmessage").show();

});

$(document).on("click", "#playeronepaper", function () {
  playerOneChoice = "Paper";
  database.ref("/players/1").set({
    Name: playerOneName,
    Wins: playerOneWinCount,
    Losses: playerOneLossCount,
    Choice: playerOneChoice
  });
  $("#playeronechoice").html(playerOneChoice);
  $("#playeronechoice").show();
  $(".playeronechoicesrow").hide();
  $(".yourturn").hide();
  $(".waitingmessage").show();

});

$(document).on("click", "#playeronescissors", function () {
  playerOneChoice = "Scissors"
  database.ref("/players/1").set({
    Name: playerOneName,
    Wins: playerOneWinCount,
    Losses: playerOneLossCount,
    Choice: playerOneChoice
  });
  $("#playeronechoice").html(playerOneChoice);
  $("#playeronechoice").show();
  $(".playeronechoicesrow").hide();
  $(".yourturn").hide();
  $(".waitingmessage").show();

});

$(document).on("click", "#playertworock", function () {
  playerTwoChoice = "Rock";
  database.ref("/players/2").set({
    Name: playerTwoName,
    Wins: playerTwoWinCount,
    Losses: playerTwoLossCount,
    Choice: playerTwoChoice
  });
  $("#playertwochoice").html(playerTwoChoice);
  $("#playertwochoice").show();
  $(".playertwochoicesrow").hide();
  $(".yourturn").hide();

});

$(document).on("click", "#playertwopaper", function () {
  playerTwoChoice = "Paper";
  database.ref("/players/2").set({
    Name: playerTwoName,
    Wins: playerTwoWinCount,
    Losses: playerTwoLossCount,
    Choice: playerTwoChoice
  });
  $("#playertwochoice").html(playerTwoChoice);
  $("#playertwochoice").show();
  $(".playertwochoicesrow").hide();
  $(".yourturn").hide();

});

$(document).on("click", "#playertwoscissors", function () {
  playerTwoChoice = "Scissors"
  database.ref("/players/2").set({
    Name: playerTwoName,
    Wins: playerTwoWinCount,
    Losses: playerTwoLossCount,
    Choice: playerTwoChoice
  });
  $("#playertwochoice").html(playerTwoChoice);
  $("#playertwochoice").show();
  $(".playertwochoicesrow").hide();
  $(".yourturn").hide();

});

//our rock paper scissor logic...
function evaluateChoices() {

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
    $(".toomanyplayers").show();
    $(".namesubmission").hide();
    return;
  }

});

//Hide the necessary pieces on loading the page
$(document).ready(function () {
  $(".greetings").hide();
  $(".yourturn").hide();
  $(".waitingmessage").hide();
  $(".toomanyplayers").hide();
  $(".playeronescore").hide();
  $(".playertwoscore").hide();
  $(".playeronechoicesrow").hide();
  $(".playertwochoicesrow").hide();
});


