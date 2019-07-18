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

var childrens = 0;
var p1wins = 0;
var p2wins = 0;
var isPlayer1 = false;
var isPlayer2 = false;

$('#userwins').text(p1wins);
$('#compwins').text(p2wins);

database.ref().on("value", function (snap) {

  if (snap.child("/playerConnection/p1").exists()) {
    $('#player1').hide();
  }

  else if (snap.child("/playerConnection/p2").exists()) {
    $('#player2').hide();
  }

  if (!snap.child('playerChoice/p1').exists() && snap.child('playerConnection/p2').exists() && !isPlayer1) {
    $('#row3').hide();
    $('#status').text('Waiting for P1');
    $('#status').append('<img id="loading" src="assets/images/loading.gif" alt="loading icon"></img>')
    $('#row2').show();
  }

  if (snap.child('playerChoice/p1').exists() && isPlayer2) {
    $('#row3').show();
    $('#row2').hide()
  }

  if (snap.child('playerChoice/p2').exists() && isPlayer1) {
    $('#row3').show();
    $('#row2').hide()
  }

  if (snap.child("/playerChoice/p2").exists() && snap.child("/playerChoice/p1").exists()) {
    game(snap.val().playerChoice.p1.p1Choice + snap.val().playerChoice.p2.p2Choice)
    database.ref('/playerChoice').set({})
  }
})


$('#messageInput').keypress(function (e) {
  var myDataRef = database.ref('/chat')
  if (e.keyCode == 13) {
    var name = $('#nameInput').val();
    var text = $('#messageInput').val();
    //myDataRef.set('User ' + name + ' says ' + text);
    myDataRef.push({
      name: name,
      text: text
    });
    $('#messageInput').val('');
  }
});

database.ref('/chat').on('child_added', function (snapshot) {
  var message = snapshot.val();
  displayChatMessage(message.name, message.text);
});

function displayChatMessage(name, text) {
  $('<div/>').text(text).prepend($('<em/>').text(name + ': ')).appendTo($('#topcard'));
  
};




$(document).on('click', '.player', function () {
  $('#row1').show()
  $('#row2').show();
  $('#row3').show();
  $('#playerselect').hide();
  if ($(this).val() === 'player1') {
    isPlayer1 = true;
    database.ref('/playerConnection/p1').set({
      isPlayer1: true
    })
  }
  else {
    isPlayer2 = true;
    database.ref('/playerConnection/p2').set({
      isPlayer2: true
    })
  }
})

$(document).on('click', '.choice', function () {
  if (!isPlayer1) {
    database.ref('/playerChoice/p2').set({
      p2Choice: $(this).attr('value'),
    })
    $('#status').text('Waiting for P1');
    $('#status').append('<img id="loading" src="assets/images/loading.gif" alt="loading icon"></img>')
    $('#row2').show();
    $('#row3').hide()
  }
  else {
    database.ref('/playerChoice/p1').set({
      p1Choice: $(this).attr('value'),
    })
    $('#status').text('Waiting for P2 ');
    $('#status').append('<img id="loading" src="assets/images/loading.gif" alt="loading icon"></img>')
    $('#row2').show();
    $('#row3').hide();
  }
})

function game(finalchoice) {
  switch (finalchoice) {
    case 'pr':
    case 'rs':
    case 'sp':
      $('#desicion').text(winLoss(finalchoice, 'w'));
      p1wins++;
      setTimeout(function () {
        $('#desicion').text('');
      }, 1000)
      break;
    case 'rp':
    case 'sr':
    case 'ps':
      $('#desicion').text(winLoss(finalchoice, 'l'));
      setTimeout(function () {
        $('#desicion').text('');
      }, 1000)
      p2wins++;
      break;
    default:
      console.log('Draw!');
      $('#desicion').text('Draw!');
      setTimeout(function () {
        $('#desicion').text('');
      }, 1000)
      break;
  }
  $('#userwins').text(p1wins);
  $('#compwins').text(p2wins);
}

$('#reset').on('click', function () {
  database.ref().set({})
  location.reload()
})

function letterFix(letter) {
  if (letter === 'p') {
    return 'Paper'
  }
  else if (letter === 'r') {
    return 'Rock'
  }
  else {
    return 'Scissors'
  }
}

function winLoss(playerContest, action) {
  choice1 = letterFix(playerContest.charAt(0));
  choice2 = letterFix(playerContest.charAt(1));
  if (action === 'w') {
    return choice1 + ' beats ' + choice2 + '!!  P1 Wins'
  }
  else if (action === 'l') {
    return choice1 + ' beats ' + choice2 + '!!  P2 Wins'
  }
}

$('#row1').hide()
$('#row2').hide();
$('#row3').hide();











