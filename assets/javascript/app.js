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

//variable to reference our database
var database = firebase.database();
//connections stored in this directory
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
//database directory to hold our player info
var playerList = database.ref("/players");
//database directory to hold player one
var playerListOne = database.ref("/players/1");
//database directory to hold player two
var playerListTwo = database.ref("/players/2");
//database directory to hold player one name
var playerListOneName = database.ref("/players/1/Name");
//database directory to hold player two name
var playerListTwoName = database.ref("/players/2/Name");
//database directory to hold player one wins
var playerListOneWins = database.ref("/players/1/Wins");
//database directory to hold player two wins
var playerListTwoWins = database.ref("/players/2/Wins");
//database directory to hold player one losses
var playerListOneLosses = database.ref("/players/1/Losses");
//database directory to hold player two losses
var playerListTwoLosses = database.ref("/players/2/Losses");
//database directory to hold player one choice
var playerListOneChoice = database.ref("/players/1/Choice");
//database directory to hold player two choice
var playerListTwoChoice = database.ref("/players/2/Choice");

//counter to hold player one wins
var playerOneWin = 0;
//counter to hold player one losses
var playerOneLoss = 0;
//counter to hold player two wins
var playerTwoWin = 0;
//counter to hold player two losses
var playerTwoLoss = 0;
//holds player one choice
var playerOneChoice;
//holds player two choice
var playerTwoChoice;
//initialize player one name null
var playerOneName = null;
//initialize player two name null
var playerTwoName = null;
//initialize player one turn
var playerOneTurn = false;
//initialize player two turn
var playerTwoTurn = false;
//set view of player one (player one selects, player two cannot see player one selection)
var playerOneTurnPlayerTwoView = false;
//set view of player one (player two selects, player one cannot see player twp selection)
var playerTwoTurnPlayerOneView = false;
var playerOneChoice = null;
var playerTwoChoice = null;

//choices for the player to make
var rps = ["Rock", "Paper", "Scissors"];

//when the client connection state changes
connectedRef.on("value", function(snap){

  console.log(snap.val());
  console.log(snap.numChildren());

  //if connected...
  if (snap.val()) {

    //add user to connection list
    var con = connectionsRef.push(true);

    //remove user from connection list when they disconnect
    con.onDisconnect().remove();
  }
  
});

//check for more than 2 people
database.ref().once("value", function(snap) {

  //if player 1 and player 2 exist
  if (snap.child("players/2").exists() === true && snap.child("players/1").exists() === true) {
    $(".toomanyplayers").show();
    $(".namesubmission").hide();
    return;
    
  }
});

//check for player one....
playerListOneName.on("value", function(snap) {

  //if it exists, we get the value and output to html in player one spot
  if (snap.exists()) {
    playerOneName = snap.val();
    $("playeronename").html(playerOneName);
    $("#waitingforplayerone").hide();
  }

  //if it doesn't exits, we show our waiting for.... text
  if (snap.exists() === false) {
    $("#playeronename").html("");
    $("#waitingforplayerone").show();
    $(".playeronechoicesrow").hide();
  }

});

//check for player two...
playerListTwoName.on("value", function(snap) {
  
  //if it exists, we get the value and output to html in player two spot
  if (snap.exists()){
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

//check for player one wins....
playerListOneWins.on("value", function(snap){
  
  //if there is a win, get the value and output to html in player one position
  if (snap.exists()){
      playerOneWin = snap.val();
      $("#playeronewincount").html(playerOneWin);
      $(".playeronescore").show();
  }

  //hide player one score if there is nothing
  else {
      $(".playeronescore").hide();
  }

});

//check for player two wins....
playerListTwoWins.on("value", function(snap){
  
  //if there is a win, get the value and output to html in player two position
  if (snap.exists()){
      playerTwoWin = snap.val();
      $("#playertwowincount").html(playerTwoWin);
      $(".playertwoscore").show();
  }
  
  //hide player two score if there is nothing
  else {
      $(".playertwoscore").hide();
  }

});

//check for player one losses.....
playerListOneLosses.on("value", function(snap){

  //if there is a loss, get the value and output to html in the player one position
  if (snap.exists()){
      playerOneLoss = snap.val();
      $("#playeronelosscount").html(playerOneLoss);
      $(".playeronescore").show();
  }

  //hide player one score if there is nothing
  else {
      $(".playeronescore").hide();
  }

});

//check for player two losses...
playerListTwoLosses.on("value", function(snap){

  //if there is a loss, get the value and output to html in the player two position
  if (snap.exists()){
      playerTwoLoss = snap.val();
      $("#playertwolosscount").html(playerTwoLoss);
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
      Wins: playerOneWin,
      Losses: playerOneLoss
  });

  //clear the text form
  $("#playernameinput").val("");
  //hide the submit button from player one
  $(".namesubmission").hide();
  //hide the waiting for player one text
  $("#waitingforplayerone").hide();

  //output player one win and loss to html
  $("#playeronewincount").html(playerOneWin);
  $("#playeronelosscount").html(playerOneLoss);
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
      Wins: playerTwoWin,
      Losses: playerTwoLoss
  });

  //clear the text form
  $("#playernameinput").val("");
  //hide the submit button from player two
  $(".namesubmission").hide();
  //hide the waiting for player two text
  $("#waitingforplayertwo").hide();

  //output player two win and loss to html
  $("#playertwowincount").html(playerTwoWin);
  $("#playertwolosscount").html(playerTwoLoss);
  $(".playertwoscore").show();

}

//add user click event handler....
$(document).on("click", "#adduser", function(){

  //if player one and player two are null
  if (playerOneName === null && playerTwoName === null){
      
      //start our player one
      startPlayerOne();
      playerOneTurn = true;
      //remove player one on disconnect
      database.ref("/players/1").onDisconnect().remove();
      database.ref("/chatLog").onDisconnect().remove();
      return;
  }

  //if there is player one and no player two
  if (playerOneName != null && playerTwoName === null) {

      //start our player two
      startPlayerTwo();
      //show our waiting message
      $(".waitingmessage").show();
      database.ref("/players/2").onDisconnect().remove();
      database.ref("/chatLog").onDisconnect().remove();
      return;
  }
  if (playerOneName === null && playerTwoName != null) {
    
      //start our player one
      startPlayerOne();
      playerOneTurn = true;
      //show rock, paper, scissors
      $(".playeronechoicesrow").show();
      //remove player one on disconnect
      database.ref("/players/1").onDisconnect().remove();
      database.ref("/chatLog").onDisconnect().remove();
      return;
  }
});

//player one win function

//player two win function

//upon first load or if connection changes
connectionsRef.on("value", function(snapshot) {

  //console.log(snapshot.val());

  //keep track of the user who visit
  numPlayers = snapshot.numChildren();

  //display in our html
  //$("#watcher").text("Number of viewers: " + numPlayers);

});

//click event for player one
$(".player-one").on("click", function(event){

  //grab player one choice
  playerOneChoice = $(this).attr("data-value");

  //console.log(event);

  //console.log("player one choice: " + playerOneChoice);

  //save player one choice in our database
  database.ref("/player-guess").push({
    db_playerOneChoice: playerOneChoice
  });

});



//click event for player two
$(".player-two").on("click", function(event){

  //grab player two choice
  playerTwoChoice = $(this).attr("data-value");

  //console.log(event);

  //console.log("player two choice: " + playerTwoChoice);

  //save player two choice in our database
  database.ref("/player-guess").push({
    db_playerTwoChoice: playerTwoChoice
  });

});

//try child_changed....
database.ref("/player-guess").on("value", function (snapshot) {

  //console.log(snapshot.val());
 // console.log(snapshot.child());
  //console.log(snapshot.children());
  //console.log("from database player one: " + snapshot.val().db_playerOneChoice);
  //console.log("from database player two: " + snapshot.val().db_playerTwoChoice);


});

//Hide the necessary pieces on loading the page
$(document).ready(function(){
  $(".greetings").hide();
  $(".yourturn").hide();
  $(".waitingmessage").hide();
  $(".toomanyplayers").hide();
  $(".playeronescore").hide();
  $(".playertwoscore").hide();
  $(".playeronechoicesrow").hide();
  $(".playertwochoicesrow").hide();
});


