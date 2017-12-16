$(document).ready(function () {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

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

    //Logout button
    $("#logout").on("click", function (event) {
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

});