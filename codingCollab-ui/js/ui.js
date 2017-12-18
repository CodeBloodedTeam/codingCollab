$(document).ready(function () {
    $("#user-home-page").hide();
    $("#locations-page").hide();
    $('.modal').modal();

    
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
    var database = firebase.database();

//GLOBAL VARIABLES AND FUNCTIONS
  
    var allUsers;
    var users = []; //May not be needed
    var userCount = 1; //May not be needed


    function displayProfile(userKey) {
        console.log("display profile!")

        database.ref("/Users").child(userKey).on("value", function (snapshot) {
            var database = firebase.database();

            console.log(snapshot.val());
            var currentProfile = snapshot.val();

            //Save all information from user profile into a variable for reference
            var profileName = currentProfile.name;
            var profileAddress = currentProfile.address;
            var profileCity = currentProfile.city;
            var profileZip = currentProfile.zip;
            console.log(profileName, profileAddress, profileCity, profileZip)

            var profileLocal = currentProfile.connectMethod.local;
            var profileLocalVir = currentProfile.connectMethod.localVir;
            var profileVirtual = currentProfile.connectMethod.virtual;
            console.log(profileLocal, profileLocalVir, profileVirtual)

            var profileBeginSelf = currentProfile.experienceLev.expBeginSelf;
            var profileBeginStudy = currentProfile.experienceLev.expBeginStudy;
            var profileInter = currentProfile.experienceLev.expInt;
            var profileAdv = currentProfile.experienceLev.expAdv;
            console.log(profileBeginSelf, profileBeginStudy, profileInter, profileAdv)

            var profileFront = currentProfile.platformType.frontEnd;
            var profileBack = currentProfile.platformType.backEnd;
            var profileFull = currentProfile.platformType.fullStack;
            var profileIos = currentProfile.platformType.ios;
            var profileAndroid = currentProfile.platformType.android;
            console.log(profileFront, profileBack, profileFull, profileIos, profileAndroid)

            var profileHtml = currentProfile.languageType.htmlCss;
            var profileJsjq = currentProfile.languageType.jsJq;
            var profilePython = currentProfile.languageType.python;
            var profileJava = currentProfile.languageType.java;
            var profileCplus = currentProfile.languageType.cSharp;
            console.log(profileHtml, profileJsjq, profilePython, profileJava, profileCplus)

            var profileBeMentor = currentProfile.collabType.beMentor;
            var profileHaveMentor = currentProfile.collabType.haveMentor;
            var profileMeetCoder = currentProfile.collabType.meetCoder;
            console.log(profileBeMentor, profileHaveMentor, profileMeetCoder);

            var profileGithub = currentProfile.gitHub;
            var profileLinkedIn = currentProfile.linkedIn;
            var profileOtherProfile = currentProfile.otherProfile;
            var profileIagree = currentProfile.agreement.iAgree;
            var profileIcertify = currentProfile.agreement.iCertify;
            var profileMatchSchore = currentProfile.matchscore;

            console.log(profileGithub, profileLinkedIn, profileOtherProfile, profileIagree, profileIcertify);

            //Need to add steps to append in the table. Note, most data is "true" or "false". Need to convert to  how text should display
            // $("#prof-display-table > tbody").append(`<tr><td>I prefer to connect: ${thisUser.userLocal}<td></tr>`)

            displayMatches(currentProfile)
        })
    };

    //Function to compare current user to all existing users
    function displayMatches(currentProfile) {
        console.log("Display Matches!")
        database.ref("/Users").on("value", function (snapshot) {
            var matchedUsers = [];
            allUsers = snapshot.val();
            console.log("Current User Connect Methods: ");
            console.log(currentProfile.connectMethod.local, currentProfile.connectMethod.localVir, currentProfile.connectMethod.virtual);
            console.log("-----------------------------------------");
            console.log(allUsers);
            for (key in allUsers) {
                console.log(allUsers[key]);
                allUsers[key].matchScore = 0; //Resets the matchScore for each existing user everytime the matches are displayed, and recalculates
                
                //If the current user's email matches an existing user's email (same user), do nothing
                if (currentProfile.name === allUsers[key].name){
                    console.log("same user, don't compare") //Using name for now. Will need to get a unique identifier
                } else {                 
                //Compare connection method, increase match score if the same:
                   
                    console.log("Existing User Connect Methods: ");
                    console.log(allUsers[key].connectMethod.local, allUsers[key].connectMethod.localVir, allUsers[key].connectMethod.virtual);
                    
                    if (currentProfile.connectMethod.local && allUsers[key].connectMethod.local) { // && allUsers[key].connectMethod.local) {
                        console.log(`Both you and ${allUsers[key].name} want to connect locally!`);
                        //if (users location is 50 miles or less from existing user)
                                //you both want to connect locally, and you're in the same area
                                 //Increase match score
                    }else{
                        
                        console.log("One or both of you do not want to meet locally");
                    };
                    if (currentProfile.connectMethod.localVir && allUsers[key].connectMethod.localVir) {
                        console.log("You both want to connect locally & virtually!");
                        //if (users location is 50 miles or less from existing user)
                                //you both want to connect virtually & locally, and you're in the same area!
                                 //Increase match score

                    };
                    if (currentProfile.connectMethod.virtual&& allUsers[key].connectMethod.virtual) {
                        console.log("You both want to connect virtually!");
                        //Increase match score
                    };
                //Compare Interests
                    



                            //Matching Steps (General)
                        //Determine what to check, and weight for each.
                        //If match score is greater than TBD amount, add that matched profile to a matchedUsers array.
                        //Iterate through the array and display the chosen data for each matchObject in the Dom, up to 6 matches.

                    }
                }
            })
        };
    

//Login an EXISTING user - When login button is clicked:
    $("#login-btn").on("click", function (event) {
        event.preventDefault();
        console.log("LOGIN button clicked");

        //Store users information
        var email = $("#existing-user-email").val();
        var password = $("#existing-user-password").val();
        var auth = firebase.auth();


        //Firebase CURRENT user method - Confirms email and password are correct or returns error message
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var auth = firebase.auth();
            console.log(error.code);
            console.log(error.message);
        });
        //Listen for users state to change (sign-in vs signed out)
        firebase.auth().onAuthStateChanged(function (user) {

            if (user) { //If user is signed in, store data and display user home page
                console.log("This user is signed in: ", user.email);
                var email = user.email;
                var userID = user.uid;
                console.log(email, userID)
                $("#home-page").hide();
                $("#user-home-page").show();
                $("#locations-page").hide();

                //Call function displayProfile with userID as argument - defined above
                displayProfile(userID)
            } else {
                console.log("User is logged out.");
            }
        });

        // Clears all the text boxes
        email = $("#existing-user-email").val("");
        password = $("#existing-user-password").val("");
    });

//Signup a NEW user - when the join button is clicked
    $("#create-btn").on("click", function (event) {
        event.preventDefault();
        $("#home-page").hide();
        $("#user-home-page").show();
        $("#locations-page").hide();
        console.log("JOIN button clicked");

        var email = $("#new-user-email").val();
        var password = $("#new-user-password").val();
        var repeatPassword = $("#repeat-password").val();
        var auth = firebase.auth();

        console.log(email, password, repeatPassword);

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
                console.log(user); //This is not logging the correct person
                console.log("This user is signed in: ", user.email);
                var email = user.email;
                var userID = user.uid;
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
        repeatPassword = $("#repeat-password").val("");
    });

//Logout current user - when logout button is clicked
    $("#logout-btn").on("click", function (event) {
        event.preventDefault();
        console.log("LOGOUT button was clicked");
        $("#home-page").show();
        $("#user-home-page").hide();
        $("#locations-page").hide();

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

//Side bar functionality
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

//USER HOME PAGE / PROFILE

    // When user submits or edits profile and clicks submit
    $("#profile-submit").on("click", function () {

        // Prevents the page from refreshing.
        event.preventDefault();

        // Placeholder object - Will be updated with the inputs from the form:
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
            matchScore: 0,
        };
        
        //Capture user inputs and update newUser object with new values
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

        // Push the data to Firebase - create Users child with userID as name, and newUser object as value
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
    // database.ref("/Users").on("child_added", function (childSnapshot, prevChildKey) {

    //     // Print the initial data to the console.
    //     console.log("Child Log: ", childSnapshot.val());

    //     // Store everything in a new variable
    //     var currentProfile = childSnapshot.val();
    //     var profileName = currentProfile.userName;
    //     var profileAddress = currentProfile.userAddress;
    //     var profileCity = currentProfile.userCity;
    //     var profileZip = currentProfile.userZip;
    //     var profileLocal = currentProfile.userLocal;
    //     var profileLocalVir = currentProfile.userLocalVir;
    //     var profileVirtual = currentProfile.userVirtual;
    //     var profileBeginSelf = currentProfile.userBeginSelf;
    //     var profileBeginStudy = currentProfile.userBeginStudy;
    //     var profileInter = currentProfile.userInter;
    //     var profileAdv = currentProfile.userAdv;
    //     var profileFront = currentProfile.userFront;
    //     var profileBack = currentProfile.userBack;
    //     var profileFull = currentProfile.userFull;
    //     var profileIos = currentProfile.userIos;
    //     var profileAndroid = currentProfile.userAndroid;
    //     var profileHtml = currentProfile.userHtml;
    //     var profileJsjq = currentProfile.userJsjq;
    //     var profilePython = currentProfile.userPython;
    //     var profileJava = currentProfile.userJava;
    //     var profileCplus = currentProfile.userCplus;
    //     var profilePhp = currentProfile.userPhp;
    //     var profileBeMentor = currentProfile.userBeMentor;
    //     var profileHaveMentor = currentProfile.userHaveMentor;
    //     var profileMeetCoder = currentProfile.userMeetCoder;
    //     var profileGithub = currentProfile.userGithub;
    //     var profileLinkedIn = currentProfile.userLinkedIn;
    //     var profileOtherProfile = currentProfile.userOtherProfile;
    //     var profileIagree = currentProfile.userIagree;
    //     var profileIcertify = currentProfile.userIcertify;

    //     console.log("Profile Name: ", profileName);
    //     console.log("Profile Address: ", profileAddress);
    //     console.log("Profile City: ", profileCity);
    //     console.log("Profile Zip: ", profileZip);
    //     console.log("Profile Local: ", profileLocal);
    //     console.log("Profile LocalVir: ", profileLocalVir);
    //     console.log("Profile Virtual: ", profileVirtual);

    //     // 5. Append each profile's data into an HTML table. NOT SURE how we are displaying yet.
    //     $("#prof-display-table > tbody").append("<tr><td>I prefer to connect: </td><td>" + profileLocal +
    //         "</td></tr><tr><td>Experience Level: </td><td>" + profileBeginSelf +
    //         "</td></tr><tr><td>I'm interested in developing: </td><td>" + profileFront +
    //         "</td></tr><tr><td>Coding Languages I know or Want to Learn: </td><td>" + profileJava +
    //         "</td></tr><tr><td>I want to use Coding Collab to: </td><td>" + profileBeMentor +
    //         "</td></tr><tr><td>More Ways to Connect with Me: </td><td>" + profileGithub + "</td></tr>");
    // });


    //When the locations link is clicked: 
    $("#locations-link").on("click", function (event) {
        event.preventDefault();
        $("#home-page").hide();
        $("#user-home-page").hide();
        $("#locations-page").show();

        // Loads Google maps and google places APIs=>
        function loadScript() {
            var myKey = "AIzaSyBe-zoP-oMRoBbGvHbH1q7hpNX4swuSI_4";
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = "https://maps.googleapis.com/maps/api/js?key=" + myKey + "&libraries=places&callback=initMap";
            document.body.appendChild(script);
        }
        loadScript();
    });

    var map;
    
    //Loads map centered on Orlando
    window.initMap = function() {
        map = new google.maps.Map(document.getElementById("map"), {
            center: {
                lat: 28.538336,
                lng: -81.379234
            },
            zoom: 12
        });

        //Google place IDs for top study locations
        var studyLocations = [
            "ChIJ0XspYxh554gRocPv5I_Kpm8",
            "ChIJu8iKN_x654gRTwmd9gWtGOU",
            "ChIJ_R3H1WZ654gR4pxbRDOomyY",
            "ChIJYbI5wzp554gRqxMJA_4M4_s",
            "ChIJkxKmNSp_54gRR9FoPq3FKfw",
            "ChIJKVxLkxVl54gRt2oJxMj55PI",
            "ChIJSfDF0dNn54gRT6ZhphMmEyU",
            "ChIJC99qTMtn54gRtlbMV-DDSJY",
            "ChIJ0ctB7cV654gRxMBMcdr9AN0",
            "ChIJGwBhSMV654gR0W59VlLMV2w"
        ]; 

        var service = new google.maps.places.PlacesService(map);

        //For each study location in array, make all call to google places API to get addiional details and dispaly a marker and info window (on click) at the long/lat
        studyLocations.forEach(function (item, index, array) {
            service.getDetails({
                placeId: item
            }, function (place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log(place);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: place.geometry.location
                    });

                    var infowindow = new google.maps.InfoWindow();

                    google.maps.event.addListener(marker, 'click', function () {
                        infowindow.setContent(`<div><strong>${place.name}</strong></div>`);
                        infowindow.open(map, this);
                    });
                    displayLocations(place);
                }
            });
        });
    };

    //For each study location, append the place data to the DOM via table
    function displayLocations(locationObject) {
        var name = locationObject.name;
        var address = locationObject.vicinity;
        var hours = locationObject.opening_hours.weekday_text;
        var rating = locationObject.rating;


        console.log(locationObject.name, locationObject.formatted_address, locationObject.opening_hours.weekday_text,
            locationObject.opening_hours.open_now, locationObject.rating)
        $("table > tbody").append(
            `<tr><td>${name}</td><td>${address}</td><td>${hours[0]}</td><td>${rating}<td></tr>`)

    };

});