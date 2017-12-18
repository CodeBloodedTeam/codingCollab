$(document).ready(function () {
    $("#user-home-page").hide();
    $('.modal').modal();

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

    var userID;

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

        firebase.auth().onAuthStateChanged(function (user) {

            if (user) {
                console.log("This user is signed in: ", user.email);
                //NOT SURE IF I NEED THESE
                var displayName = user.displayName;
                var email = user.email;
                userID = user.uid;
                console.log(email, userID)
                $("#home-page").hide();
                $("#user-home-page").show();
            } else {
                console.log("User is logged out.");
            }
        });

        // Clears all the text boxes
        email = $("#existing-user-email").val("");
        password = $("#existing-user-password").val("");
    });

    //Signup a NEW user
    $("#create-btn").on("click", function (event) {
        event.preventDefault();
        $("#home-page").hide();
        $("#user-home-page").show();
        console.log("JOIN button clicked");

        var email = $("#new-user-email").val();
        var password = $("#new-user-password").val();
        var repeatPassword = $("#icon_lock new-user-password").val();
        var auth = firebase.auth();

        //Firebase NEW user method
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error.code);
            console.log(error.message);
        });

        // Handling the account status and redirecting to a new page.
        firebase.auth().onAuthStateChanged(function (user) {

            if (user) {
                console.log("This user is signed in: ", user.email);
                var displayName = user.displayName;
                var email = user.email;
                userID = user.uid;
                console.log("NEW User email: ", email);
                console.log("NEW User password: ", password);
                console.log("NEW User auth: ", auth);
                console.log("NEW User Id: ", userID);
            } else {
                console.log("User is logged out.");
            }
        });

        // Clears all the text boxes
        email = $("#new-user-email").val("");
        password = $("#new-user-password").val("");
        repeatPassword = $("#icon_lock new-user-password").val("");
    });

    $("#logout-btn").on("click", function (event) {
        event.preventDefault();
        console.log("LOGOUT button was clicked");
        $("#home-page").show();
        $("#user-home-page").hide();

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

    $(".button-collapse").sideNav({
        menuWidth: 300, // Default is 300
        edge: 'right', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true, // Choose whether you can drag to open on touch screens,
    });

    $("#login").on("click", function (event) {
        $('.button-collapse').sideNav('show');
    });

    $("#get-started").on("click", function (event) {
        $('.button-collapse').sideNav('show');
    });

    $("#join-now").on("click", function (event) {
        $('.button-collapse').sideNav('show');
    });

    var database = firebase.database();

    var users = [];
    var userCount = 1;

    // 2. Create the on-click function that triggers the Submit of new user inputs. This function sends the inputs to Firebase using .push.
    $("#profile-submit").on("click", function () {

        // Prevents the page from refreshing.
        event.preventDefault();

        // Gets the inputs from the form:
        var newUser = {
            name: "",
            address: "",
            city: "",
            // state: "",
            zip: "",
            connectMethod: {
                local: false,
                localVir: false,
                virtual: false,
            },
            experienceLev: {
                expBeginSelf: false,
                expBeginStudy: false,
                expInt: false,
                expAdv: false,
            },
            platformType: {
                frontEnd: false,
                backEnd: false,
                fullStack: false,
                ios: false,
                android: false,
                otherDevText: "",
            },
            languageType: {
                htmlCss: false,
                jsJq: false,
                python: false,
                java: false,
                cSharp: false,
                otherLangText1: "",
                otherLangText2: "",
            },
            collabType: {
                beMentor: false,
                haveMentor: false,
                meetCoder: false,
                collabProj: "",
            },
            gitHub: "",
            linkedIn: "",
            otherProfile: "",
            agreement: {
                iAgree: false,
                iCertify: false,
            },
        };
        var userName = $("#display-name").val().trim();
        newUser.name = userName;
        var userAddress = $("#add-address").val().trim();
        newUser.address = userAddress;
        var userCity = $("#add-city").val().trim();
        newUser.city = userCity;
        var userZip = $("#add-zip").val().trim();
        newUser.zip = userZip;
        console.log("Name: ", newUser.name);
        console.log("Address: ", newUser.address);
        console.log("City: ", newUser.city);
        console.log("ZIP: ", newUser.zip);

        // connectMethod:
        if ($("#connect-local").is(':checked')) {
            newUser.connectMethod.local = true;
            console.log("Local: ", newUser.connectMethod.local);
        };

        if ($("#connect-loc-vir").is(':checked')) {
            newUser.connectMethod.localVir = true;
            console.log("LocalVirtual: ", newUser.connectMethod.localVir);
        };

        if ($("#connect-vir").is(':checked')) {
            newUser.connectMethod.virtual = true;
            console.log("Virtual: ", newUser.connectMethod.virtual);
        };

        // experienceLev:
        if ($("#exp-beg-self").is(':checked')) {
            newUser.experienceLev.expBeginSelf = true;
            console.log("Beginner-Self: ", newUser.experienceLev.expBeginSelf);
        };

        if ($("#exp-beg-stud").is(':checked')) {
            newUser.experienceLev.expBeginStudy = true;
            console.log("Beginner-Studying: ", newUser.experienceLev.expBeginStudy);
        };

        if ($("#exp-int").is(':checked')) {
            newUser.experienceLev.expInt = true;
            console.log("Intermediate: ", newUser.experienceLev.expInt);
        };

        if ($("#exp-adv").is(':checked')) {
            newUser.experienceLev.expAdv = true;
            console.log("Advanced: ", newUser.experienceLev.expAdv);
        };

        // platformType
        if ($("#front-end").is(':checked')) {
            newUser.platformType.frontEnd = true;
            console.log("FrontEnd: ", newUser.platformType.frontEnd);
        };

        if ($("#back-end").is(':checked')) {
            newUser.platformType.backEnd = true;
            console.log("Backend: ", newUser.platformType.backEnd);
        };

        if ($("#full-stack").is(':checked')) {
            newUser.platformType.fullStack = true;
            console.log("fullstack: ", newUser.platformType.fullStack);
        };

        if ($("#ios").is(':checked')) {
            newUser.platformType.ios = true;
            console.log("ios: ", newUser.platformType.ios);
        };

        if ($("#android").is(':checked')) {
            newUser.platformType.android = true;
            console.log("android: ", newUser.platformType.android);
        };

        // languageType
        if ($("#html-css").is(':checked')) {
            newUser.languageType.htmlCss = true;
            console.log("html/css: ", newUser.languageType.htmlCss);
        };

        if ($("#js-jq").is(':checked')) {
            newUser.languageType.jsJq = true;
            console.log("js/jq: ", newUser.languageType.jsJq);
        };

        if ($("#python").is(':checked')) {
            newUser.languageType.python = true;
            console.log("python: ", newUser.languageType.python);
        };

        if ($("#java").is(':checked')) {
            newUser.languageType.java = true;
            console.log("java: ", newUser.languageType.java);
        };

        if ($("#c-plus").is(':checked')) {
            newUser.languageType.cSharp = true;
            console.log("c++: ", newUser.languageType.cSharp);
        };

        if ($("#php").is(':checked')) {
            newUser.languageType.php = true;
            console.log("php: ", newUser.languageType.php);
        };

        // collabType
        if ($("#be-mentor").is(':checked')) {
            newUser.collabType.beMentor = true;
            console.log("Be a Mentor: ", newUser.collabType.beMentor);
        };

        if ($("#have-mentor").is(':checked')) {
            newUser.collabType.haveMentor = true;
            console.log("have a mentor: ", newUser.collabType.haveMentor);
        };

        if ($("#meet-coder").is(':checked')) {
            newUser.collabType.meetCoder = true;
            console.log("meet a coder: ", newUser.collabType.meetCoder);
        };

        // Profiles
        var userGithub = $("#git-hub").val().trim();
        newUser.gitHub = userGithub;
        console.log("GitHub: ", newUser.gitHub);

        var userLinkedIn = $("#link-in").val().trim();
        newUser.linkedIn = userLinkedIn;
        console.log("LinkedIn: ", newUser.linkedIn);

        var userOtherProfile = $("#other-prof").val().trim();
        newUser.otherProfile = userOtherProfile;
        console.log("OtherProfile: ", newUser.otherProfile);

        // agreement
        if ($("#i-agree").is(':checked')) {
            newUser.agreement.iAgree = true;
            console.log("I agree: ", newUser.agreement.iAgree);
        };

        if ($("#i-am-18").is(':checked')) {
            newUser.agreement.iCertify = true;
            console.log("I Certify: ", newUser.agreement.iCertify);
        };

    // Push the data to Firebase:
    database.ref("/Users").child(userID).set(newUser);
    console.log(newUser);

    // ** MIGHT NOT CLEAR THESE! ** Clear all the text boxes after user clicks Submit:
    //   name = $("#display-name").val("");
    //   address = $("#add-address").val("");
    //   city = $("#add-city").val("");
    //   state = $("#sel-state").val("");
    //   zip = $("#add-zip").val("");
    //   ...
});
    // 3. Create Firebase event for adding new profiles to the database as multiple records. Need to use childSnapshot. 
    // // Firebase is always watching for changes to the data.
    // // When changes occurs it will print them to console. This is pulling the Child data which is represented by the new train id number in Firebase.
    database.ref("/Users").on("child_added", function (childSnapshot, prevChildKey) {

        // Print the initial data to the console.
        console.log("Child Log: ", childSnapshot.val());

        // Store everything in a new variable
        var currentProfile = childSnapshot.val();
        var profileName = currentProfile.userName;
        var profileAddress = currentProfile.userAddress;
        var profileCity = currentProfile.userCity;
        var profileZip = currentProfile.userZip;
        var profileLocal = currentProfile.userLocal;
        var profileLocalVir = currentProfile.userLocalVir;
        var profileVirtual = currentProfile.userVirtual;
        var profileBeginSelf = currentProfile.userBeginSelf;
        var profileBeginStudy = currentProfile.userBeginStudy;
        var profileInter = currentProfile.userInter;
        var profileAdv = currentProfile.userAdv;
        var profileFront = currentProfile.userFront;
        var profileBack = currentProfile.userBack;
        var profileFull = currentProfile.userFull;
        var profileIos = currentProfile.userIos;
        var profileAndroid = currentProfile.userAndroid;
        var profileHtml = currentProfile.userHtml;
        var profileJsjq = currentProfile.userJsjq;
        var profilePython = currentProfile.userPython;
        var profileJava = currentProfile.userJava;
        var profileCplus = currentProfile.userCplus;
        var profilePhp = currentProfile.userPhp;
        var profileBeMentor = currentProfile.userBeMentor;
        var profileHaveMentor = currentProfile.userHaveMentor;
        var profileMeetCoder = currentProfile.userMeetCoder;
        var profileGithub = currentProfile.userGithub;
        var profileLinkedIn = currentProfile.userLinkedIn;
        var profileOtherProfile = currentProfile.userOtherProfile;
        var profileIagree = currentProfile.userIagree;
        var profileIcertify = currentProfile.userIcertify;

        console.log("Profile Name: ", profileName);
        console.log("Profile Address: ", profileAddress);
        console.log("Profile City: ", profileCity);
        console.log("Profile Zip: ", profileZip);
        console.log("Profile Local: ", profileLocal);
        console.log("Profile LocalVir: ", profileLocalVir);
        console.log("Profile Virtual: ", profileVirtual);

        // 5. Append each profile's data into an HTML table. NOT SURE how we are displaying yet.

        $("#prof-display-table > tbody").append("<tr><td>I prefer to connect: </td><td>" + profileLocal +
            "</td></tr><tr><td>Experience Level: </td><td>" + profileBeginSelf +
            "</td></tr><tr><td>I'm interested in developing: </td><td>" + profileFront +
            "</td></tr><tr><td>Coding Languages I know or Want to Learn: </td><td>" + profileJava +
            "</td></tr><tr><td>I want to use Coding Collab to: </td><td>" + profileBeMentor +
            "</td></tr><tr><td>More Ways to Connect with Me: </td><td>" + profileGithub + "</td></tr>");
    });

});