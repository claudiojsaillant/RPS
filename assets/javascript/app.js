var firebaseConfig = {
  apiKey: "AIzaSyDMa8F9axhjR2EACxjjPbjiVziH7gqfZjA",
  authDomain: "mydata-efc36.firebaseapp.com",
  databaseURL: "https://mydata-efc36.firebaseio.com",
  projectId: "mydata-efc36",
  storageBucket: "mydata-efc36.appspot.com",
  messagingSenderId: "233509212002",
  appId: "1:233509212002:web:2c66b91bda714330"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  
  // Create a variable to reference the database.
  var database = firebase.database();



$("").click(function(event){


  
  // db push
database.ref().push({
  //push stuff
  dateAdded: firebase.database.ServerValue.TIMESTAMP
});

});

// Firebase watcher .on("child_added"...
database.ref().on("child_added", function(snap){
 
})


