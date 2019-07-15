var firebaseConfig = {
  apiKey: "AIzaSyDMa8F9axhjR2EACxjjPbjiVziH7gqfZjA",
  authDomain: "mydata-efc36.firebaseapp.com",
  databaseURL: "https://mydata-efc36.firebaseio.com",
  projectId: "mydata-efc36",
  storageBucket: "mydata-efc36.appspot.com",
  messagingSenderId: "233509212002",
  appId: "1:233509212002:web:2c66b91bda714330"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var p1wins = 0;
var p2wins = 0;
var p1Choice = '';
var p2Choice = '';
var isPlayer1 = false;
var isPlayer2 = false;
$('#userwins').text(p1wins);
$('#compwins').text(p2wins);

database.ref('/player').on("value", function (snap) {
  $('#userwins').text(p1wins);
  $('#compwins').text(p2wins);
  isPlayer1 = false;
  isPlayer2 = false;
  
  if (snap.child("p1").exists()) {
    isPlayer1 = snap.val().p1.isPlayer1;
    p1Choice = snap.val().p1.p1Choice;
  } else {
    $('#desicion').text('Waiting for player1...');
  }
  if (snap.child("p2").exists()) {
    isPlayer2 = snap.val().p2.isPlayer2;
    p2Choice = snap.val().p2.p2Choice;
    $('#row3').show();
  } else if((snap.child("p1").exists())) {
    $('#desicion').text('Waiting for player2...');
  }

  if (snap.child("p1").exists() && snap.child("p2").exists()) {
    game(snap.val().p1.p1Choice + snap.val().p2.p2Choice)
    database.ref('/player').set({

    })
  }
})

$(document).on('click', '.choice', function () {
  if (!isPlayer1) {
    database.ref('/player/p1').set({
      p1Choice: $(this).val(),
      isPlayer1: true
    })
    $('#row3').hide()
  }
  else {
    database.ref('/player/p2').set({
      p2Choice: $(this).val(),
      isPlayer2: true
    })
  }
})

function game(finalchoice) {
  $('#userchoise').text(p1Choice);
  $('#compchoise').text(p2Choice);

  switch (finalchoice) {
    case 'pr':
    case 'rs':
    case 'sp':
      console.log('P1 Wins!');
      p1wins++;
      break;
    case 'rp':
    case 'sr':
    case 'ps':
      console.log('P2 Wins!');
      p2wins++;
      break;
    default:
      console.log('Draw!');
      $('#desicion').text('Draw!');
      break;
  }
}











