var config = {
    //checks that this person is authorized to use firebase database through apiKey and authDomain
    apiKey: "AIzaSyC1J1aOKWhyaAivbs6BRWlEh8MdtniQv5g",
    authDomain: "first-firebase-9d38b.firebaseapp.com",
    databaseURL: "https://first-firebase-9d38b.firebaseio.com",
    projectId: "first-firebase-9d38b",
    storageBucket: "first-firebase-9d38b.appspot.com",
    messagingSenderId: "613087652658"
  };

firebase.initializeApp(config);

//VARIABLES
//-------------------------------------------------
var database = firebase.database();

var player1Choice = "";
var player2Choice = "";
var player1 = null;
var player2 = null;
var turn = 1
var player1Score=0;
var player2Score=0;




//-------------------------------------------------
database.ref("/players/").on("value", function(snapshot){
    if (snapshot.child("player1").exists()) {
        player1 = snapshot.val().player1;
        $("#player1Score").text(player1.win)
    } if (snapshot.child("player2").exists()) {
        player2 = snapshot.val().player2;
        $("#player2Score").text(player2.win)
    };
    $("#action").text("Choose a player.")
});

$(document).on("click", "#title1", function (event){
    event.preventDefault
    player1 = {
        win: 0,
        choice: "",
    };
    database.ref().child("/players/player1").set(player1);
    database.ref().child("/turn").set(1);
});

$(document).on("click", "#title2", function (event){
    event.preventDefault
    player2 = {
        win: 0,
        choice: "",
    };
    database.ref().child("/players/player2").set(player2);
    $("#action").text("Player 1 goes first.")
});

$(document).on("click", ".choice1", function () {
        player1Choice = $(this).attr("value");
        console.log(player1Choice);
        database.ref().child("/players/player1/choice").set(player1Choice);
        turn=2;
        database.ref().child("/turn").set(2);
        $("#action").text("Player 2 goes.")
    });

$(document).on("click", ".choice2", function () {
    player2Choice = $(this).attr("value");
    console.log(player2Choice);
    database.ref().child("/players/player2/choice").set(player2Choice);
    rpsCompare ();
    $("#action").text("Player 1 goes.")
});

function rpsCompare() {
    if (player1Choice==="rock") {
       if (player2Choice==="rock"){
           //tie
           $("#message").text("Tie, try again.")
       } else if (player2Choice==="paper") {
           //player2 wins
           $("#message").text("Paper covers rock, Player2 wins")
            database.ref().child("/players/player2/win").set(player2.win + 1);
       } else { //scissors
            $("#message").text("Rock smashes scissors, Player1 wins")
            database.ref().child("/players/player1/win").set(player1.win + 1);
       }
    } else if (player1Choice ==="paper") {
        if (player2Choice==="rock") {
            //player1 wins
            $("#message").text("Paper covers rock, Player1 wins")
            database.ref().child("/players/player1/win").set(player1.win + 1);
        } else if (player2Choice==="paper") {
            //tie
            $("#message").text("Tie, try again.")
        } else { //scissors
            //player2 wins
            $("#message").text("Scissors cuts paper, Player2 wins")
            database.ref().child("/players/player2/win").set(player2.win + 1);
        }
    } else if (player1Choice==="scissors") {
        if (player2Choice === "rock") {
            //player2 wins
            $("#message").text("Rock smashes scissors, Player2 wins")
            database.ref().child("/players/player2/win").set(player2.win + 1);
        } else if (player2Choice==="paper") {
            //player1 wins
            $("#message").text("Scissors cuts paper, Player1 wins")
            database.ref().child("/players/player1/win").set(player1.win + 1);
        } else {
            //tie
            $("#message").text("Tie, try again.")
        };
    };
    turn=1
    database.ref().child("/turn").set(1);
}; 



