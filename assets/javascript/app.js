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

var userwins = 0;
var compwins = 0;
var p1Choice = '';
var p2Choice = '';
var isPlayer1 = false
var isPlayer2 = false
var current = '';
$('#userwins').text(userwins)
$('#compwins').text(compwins)

database.ref('/player').on("value", function (snap) {

  if (snap.val()) {
    console.log(snap.val())
      if (snap.child("p1").exists()) {
        isPlayer1 = snap.val().p1.isPlayer1;
        p1Choice = snap.val().p1.p1Choice;
      } else {

      }
      if (snap.child("p2").exists()) {
        isPlayer2 = snap.val().p2.isPlayer2;
        p2Choice = snap.val().p2.p2Choice;
      }
    }
    if(snap.child("p1").exists() && snap.child("p2").exists()) {
      game(snap.val().p1.p1Choice + snap.val().p2.p2Choice)
      database.ref('/player').set({

      });
  
    }


})


$(document).on('click', '.choice', function () {
  if (!isPlayer1) {
    database.ref('/player/p1').set({
       
        p1Choice: $(this).val(),
        isPlayer1: true
      
    })
  }
  else {
    database.ref('/player/p2').set({
      
        p2Choice: $(this).val(),
        isPlayer2: true
      
    })

  }

})


function game(finalchoice) {

  $('#userchoise').text(p1Choice)
  $('#compchoise').text(p2Choice)

  switch (finalchoice) {
    case 'pr':
    case 'rs':
    case 'sp':
      console.log('You won!');
      userwins++;
      $('#desicion').text('You won!');
      $('#userwins').text(userwins);
      break;
    case 'rp':
    case 'sr':
    case 'ps':
      console.log('You lost!');
      compwins++;
      $('#desicion').text('Comp wins.');
      $('#compwins').text(compwins);
      break;
    default:
      console.log('Draw!');
      $('#desicion').text('Draw!');
      break;
  }

}











