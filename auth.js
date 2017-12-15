// Code required for authenticating users.
//Get Firebase Config
var config = {
    apiKey: "AIzaSyAkrlcozQa4UQ74mF_PwbvppuHjPW5B7f8",
    authDomain: "codingcollab-1512956831401.firebaseapp.com",
    databaseURL: "https://codingcollab-1512956831401.firebaseio.com",
    projectId: "codingcollab-1512956831401",
    storageBucket: "codingcollab-1512956831401.appspot.com",
    messagingSenderId: "177469015452"
  };

//Initialize Firebase
firebase.initializeApp(config);

//Login a CURRENT user
$("#login-btn").on("click", function (event) {
    event.preventDefault();
    console.log("LOGIN button clicked");
    var email = $("#existing-user-email").val();
    var password = $("#existing-user-password").val();
    var auth = firebase.auth();

    //Firebase CURRENT user method
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var auth = firebase.auth();
        console.log(error.code);
        console.log(error.message);
    });

    // Clears all the text boxes
    email = $("#existing-user-email").val("");
    password = $("#existing-user-password").val("");
    
});

//Signup a NEW user
$("#join-btn").on("click", function (event) {
    event.preventDefault();
    console.log("JOIN button clicked");
    var email = $("#new-user-email").val();
    var password = $("#new-user-password").val();
    var auth = firebase.auth();
    console.log("NEW User email: ", email);
    console.log("NEW User password: ", password);
    console.log("NEW User auth: ", auth);
    //Firebase NEW user method
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.code);
        console.log(error.message);
    });

    // Clears all the text boxes
    email = $("#new-user-email").val("");
    password = $("#new-user-password").val("");
});

//Logout button
$("#logout-btn").on("click", function (event) {
    event.preventDefault();
    console.log("LOGOUT button was clicked");
   
    firebase.auth().signOut().then(function () {
        console.log("Logged out!")
    }, function (error) {
        console.log(error.code);
        console.log(error.message);
    });
    // Clears all the text boxes
    email = $("#existing-user-email").val("");
    password = $("#existing-user-password").val("");
});

firebase.auth().onAuthStateChanged(function (user) {

    if (user) {
        console.log("This user is signed in: ", user.email);
       //NOT SURE IF I NEED THESE
    var displayName = user.displayName;
    var email = user.email;
       // var emailVerified = user.emailVerified;
       // var photoURL = user.photoURL;
       // var isAnonymous = user.isAnonymous;
       // var uid = user.uid;
       // var providerData = user.providerData;
        // ...

    } else {
        console.log("User is logged out.");
        // ...
    }
});

