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
    var userId;


    function displayProfile(userKey) {
        console.log("display profile!")
        console.log(userKey);
        database.ref("/Users").child(userKey).on("value", function(snapshot) {
            
            //Capture snapshot of logged in user's profile and save in object
            console.log(snapshot.val());
            var currentProfile = snapshot.val();

            //Save all information from user profile into a variable for reference
            var profileName = currentProfile.name;
            var profileAddress = currentProfile.address;
            var profileCity = currentProfile.city;
            var profileZip = currentProfile.zip;

            var profileLocal = currentProfile.connectMethod.local;
            var profileLocalVir = currentProfile.connectMethod.localVir;
            var profileVirtual = currentProfile.connectMethod.virtual;

            var profileBeginSelf = currentProfile.experienceLev.expBeginSelf;
            var profileBeginStudy = currentProfile.experienceLev.expBeginStudy;
            var profileInter = currentProfile.experienceLev.expInt;
            var profileAdv = currentProfile.experienceLev.expAdv;

            var profileFront = currentProfile.platformType.frontEnd;
            var profileBack = currentProfile.platformType.backEnd;
            var profileFull = currentProfile.platformType.fullStack;
            var profileIos = currentProfile.platformType.ios;
            var profileAndroid = currentProfile.platformType.android;

            var profileHtml = currentProfile.languageType.htmlCss;
            var profileJsjq = currentProfile.languageType.jsJq;
            var profilePython = currentProfile.languageType.python;
            var profileJava = currentProfile.languageType.java;
            var profileCplus = currentProfile.languageType.cPlus;

            var profileBeMentor = currentProfile.collabType.beMentor;
            var profileHaveMentor = currentProfile.collabType.haveMentor;
            var profileMeetCoder = currentProfile.collabType.meetCoder;

            var profileGithub = currentProfile.gitHub;
            var profileLinkedIn = currentProfile.linkedIn;
            var profileOtherProfile = currentProfile.otherProfile;
            var profileIagree = currentProfile.agreement.iAgree;
            var profileIcertify = currentProfile.agreement.iCertify;
            var profileMatchScore = currentProfile.matchScore;

            //Need to add steps to append in the table. Note, most data is "true" or "false". Need to convert to  how text should display
            // $("#prof-display-table > tbody").append(`<tr><td>I prefer to connect: ${thisUser.userLocal}<td></tr>`)

            determineMatches(currentProfile)
        })
    };

    //Function to compare current user to all existing users
    function determineMatches(currentProfile) {
        console.log("Determine Matches!")

        //Listen for change to any user profiles
        database.ref("/Users").on("value", function (snapshot) {
            var matchedUsersArray = [];
            allUsers = snapshot.val();
            console.log("Current User Connect Methods: ");
            console.log(currentProfile.connectMethod.local, currentProfile.connectMethod.localVir, currentProfile.connectMethod.virtual);
            console.log("-----------------------------------------");

            console.log("Current User Interests: ");
            console.log(currentProfile.platformType.frontEnd, currentProfile.platformType.backEnd, currentProfile.platformType.fullStack, currentProfile.platformType.ios, currentProfile.platformType.android);
            console.log("-----------------------------------------");

            console.log("Current User Language: ");
            console.log(currentProfile.languageType.htmlCss, currentProfile.languageType.jsJq, currentProfile.languageType.python, currentProfile.languageType.java, currentProfile.languageType.cPlus);
            console.log("-----------------------------------------");

            console.log("Current User Collab Type: ");
            console.log(currentProfile.collabType.haveMentor, currentProfile.collabType.beMentor, currentProfile.collabType.meetCoder);
            console.log("-----------------------------------------");

            //For each property (user) in the /Users section of database
            for (key in allUsers) {

                
                var scoreTracker = [];
                console.log(`COMPARE - current user ${currentProfile.name} and other user: ${allUsers[key].name}`);
                                
                allUsers[key].matchScore = 0; //Resets the matchScore and matchTracker for each existing user everytime the matches are displayed, and recalculates
                allUsers[key].matchTracker = "0000000000000000";
                var matchTrackerIndex = 0;
                // var newMatchTracker = (allUsers[key].matchTracker.substr(0, matchTrackerIndex) + "1" + allUsers[key].matchTracker.substr(matchTrackerIndex + 1));
                
                
                console.log(allUsers[key])
                console.log(`${allUsers[key].name} match score before comparison: ${allUsers[key].matchScore} and matchTracker before comparison ${allUsers[key].matchTracker}`);
                var commonInterestScore = 0;


                //If the current user's email matches an existing user's email (same user), do nothing
                if (currentProfile.name === allUsers[key].name) {
                    console.log("same user, don't compare") //Using name for now. Will need to get a unique identifier

                } else {

                    //COMPARE CONNECTION METHOD - current user vs. other users

                    console.log("CONNECT METHODS - EXISTING USERS: ");
                    console.log(allUsers[key].connectMethod.local, allUsers[key].connectMethod.localVir, allUsers[key].connectMethod.virtual);

                    if (currentProfile.connectMethod.local && allUsers[key].connectMethod.local) { // && allUsers[key].connectMethod.local) {
                        console.log(`Both you and ${allUsers[key].name} want to connect locally!`);
                            
                                //function for determining user distance based on longitude/latitude, return distance in miles as a variable
                            //if (users location is 50 miles or less from existing user location)
                            
                            //you both want to connect locally, and you're in the same area

                        //Increase match score
                        allUsers[key].matchScore += 15;

                        //Update matchTracker string, change index from 0 to 1 to track where the match occured                        
                        
                        // console.log(allUsers[key].matchTracker);
                        // console.log(matchTrackerIndex);
                        // console.log(allUsers[key].matchTracker.substr(matchTrackerIndex, 1));
                        // console.log(allUsers[key].matchTracker.substr(matchTrackerIndex, 1) + "1");

                        


                        console.log(matchTrackerIndex);                        
                        allUsers[key].matchTracker = (allUsers[key].matchTracker.substr(0, matchTrackerIndex) + "1" + allUsers[key].matchTracker.substr(matchTrackerIndex + 1));
                        console.log(allUsers[key].matchTracker);
                       
                    };

                    matchTrackerIndex++;

                    if (currentProfile.connectMethod.localVir && allUsers[key].connectMethod.localVir) {
                        console.log("You both want to connect locally & virtually!");
                        //if (users location is 50 miles or less from existing user)
                        //you both want to connect virtually & locally, and you're in the same area!
                        //Increase match score

                        allUsers[key].matchScore += 10;

                        console.log(matchTrackerIndex);                        
                        allUsers[key].matchTracker = (allUsers[key].matchTracker.substr(0, matchTrackerIndex) + "1" + allUsers[key].matchTracker.substr(matchTrackerIndex + 1));
                        console.log(allUsers[key].matchTracker);
                        
                        
                        
                        // allUsers[key].matchTracker = (allUsers[key].matchTracker.substr(0, matchTrackerIndex) + "1" + allUsers[key].matchTracker.substr(matchTrackerIndex + 1));
                        // console.log(allUsers[key].matchTracker); //Should return same as above
                        // console.log(allUsers[key].matchTracker.substr(0, matchTrackerIndex)); //Should return character at first in index: 1


                        // console.log(allUsers[key].matchTracker.substr(0, matchTrackerIndex) + "1"); //Should return first index and number 1 concatenated: 11
                        // console.log(allUsers[key].matchTracker.substr(matchTrackerIndex + 1)); //Should return all characters at 2nd index position (3rd character) - the end of the string
                        // console.log(allUsers[key].matchTracker.substr(0, matchTrackerIndex) + "1" + allUsers[key].matchTracker.substr(matchTrackerIndex + 1)); //should return full string with new value: 1100000000000000
                        // console.log(newMatchTracker) //SHould return same as above
                        
                        
                    };
                    matchTrackerIndex++;

                    if (currentProfile.connectMethod.virtual && allUsers[key].connectMethod.virtual) {
                        console.log("You both want to connect virtually!");
                        //Increase match score
                        allUsers[key].matchScore += 5;

                        console.log(matchTrackerIndex);                        
                        allUsers[key].matchTracker = (allUsers[key].matchTracker.substr(0, matchTrackerIndex) + "1" + allUsers[key].matchTracker.substr(matchTrackerIndex + 1));
                        console.log(allUsers[key].matchTracker);
                    };
                    matchTrackerIndex++;

                    //COMPARE PLATFORM - current user vs. other users

                    console.log("PLATFORM INTERESTS - EXISTING USERS: ");
                    console.log(allUsers[key].platformType.frontEnd, allUsers[key].platformType.backEnd, allUsers[key].platformType.fullStack, allUsers[key].platformType.ios, allUsers[key].platformType.android);

                    if (currentProfile.platformType.frontEnd && allUsers[key].platformType.frontEnd) {
                        console.log("You both are interested in front end development!");
                        commonInterestScore++;
                        //Increase match score
                        allUsers[key].matchScore += 4;
                        console.log(matchTrackerIndex);                        
                        allUsers[key].matchTracker = (allUsers[key].matchTracker.substr(0, matchTrackerIndex) + "1" + allUsers[key].matchTracker.substr(matchTrackerIndex + 1));
                        console.log(allUsers[key].matchTracker);

                    };
                    matchTrackerIndex++;

                    if (currentProfile.platformType.backEnd && allUsers[key].platformType.backEnd) {
                        console.log("You both are interested in backend development!");
                        commonInterestScore++;
                        //Increase match score
                        allUsers[key].matchScore += 4;
                        console.log(matchTrackerIndex);                        
                        allUsers[key].matchTracker = (allUsers[key].matchTracker.substr(0, matchTrackerIndex) + "1" + allUsers[key].matchTracker.substr(matchTrackerIndex + 1));
                        console.log(allUsers[key].matchTracker);
                    };

                    matchTrackerIndex++;
                    if (currentProfile.platformType.fullStack && allUsers[key].platformType.fullStack) {
                        console.log("You both are interested in fullstack development!");
                        commonInterestScore++;
                        //Increase match score
                        allUsers[key].matchScore += 4;
                        console.log(matchTrackerIndex);                        
                        allUsers[key].matchTracker = (allUsers[key].matchTracker.substr(0, matchTrackerIndex) + "1" + allUsers[key].matchTracker.substr(matchTrackerIndex + 1));
                        console.log(allUsers[key].matchTracker);
                    };

                    matchTrackerIndex++;
                    if (currentProfile.platformType.ios && allUsers[key].platformType.ios) {
                        console.log("You both are interested in developing iOS apps!");
                        commonInterestScore++;
                        //Increase match score
                        allUsers[key].matchScore += 4;
                        console.log(matchTrackerIndex);                        
                        allUsers[key].matchTracker = (allUsers[key].matchTracker.substr(0, matchTrackerIndex) + "1" + allUsers[key].matchTracker.substr(matchTrackerIndex + 1));
                        console.log(allUsers[key].matchTracker);
                    };

                    matchTrackerIndex++;
                    if (currentProfile.platformType.android && allUsers[key].platformType.android) {
                        console.log("You both are interested in developing android apps!");
                        commonInterestScore++;
                        //Increase match score
                        allUsers[key].matchScore += 4;
                        console.log(matchTrackerIndex);                        
                        allUsers[key].matchTracker = (allUsers[key].matchTracker.substr(0, matchTrackerIndex) + "1" + allUsers[key].matchTracker.substr(matchTrackerIndex + 1));
                        console.log(allUsers[key].matchTracker);
                    };
                    matchTrackerIndex++;

                    //COMPARE LANGUAGE - current user vs. other users 

                    console.log("LANGUAGE TYPE - EXISTING USERS: ");
                    console.log(allUsers[key].languageType.htmlCss, allUsers[key].languageType.jsJq, allUsers[key].languageType.python, allUsers[key].languageType.java, allUsers[key].languageType.cPlus);


                    if (currentProfile.languageType.htmlCss && allUsers[key].languageType.htmlCss) {
                        console.log("You both are interested in html & CSS!");
                        commonInterestScore++;
                        //Increase match score
                        allUsers[key].matchScore += 5;
                        console.log(matchTrackerIndex);                        
                        allUsers[key].matchTracker = (allUsers[key].matchTracker.substr(0, matchTrackerIndex) + "1" + allUsers[key].matchTracker.substr(matchTrackerIndex + 1));
                        console.log(allUsers[key].matchTracker);
                    };
                    matchTrackerIndex++;

                    if (currentProfile.languageType.jsJq && allUsers[key].languageType.jsJq) {
                        console.log("You both are interested in javaScript!");
                        commonInterestScore++;
                        //Increase match score
                        allUsers[key].matchScore += 5;
                        console.log(matchTrackerIndex);                        
                        allUsers[key].matchTracker = (allUsers[key].matchTracker.substr(0, matchTrackerIndex) + "1" + allUsers[key].matchTracker.substr(matchTrackerIndex + 1));
                        console.log(allUsers[key].matchTracker);
                    };
                    matchTrackerIndex++;

                    if (currentProfile.languageType.python && allUsers[key].languageType.python) {
                        console.log("You both are interested in Python!");
                        commonInterestScore++;
                        //Increase match score
                        allUsers[key].matchScore += 5;
                        console.log(matchTrackerIndex);                        
                        allUsers[key].matchTracker = (allUsers[key].matchTracker.substr(0, matchTrackerIndex) + "1" + allUsers[key].matchTracker.substr(matchTrackerIndex + 1));
                        console.log(allUsers[key].matchTracker);
                    };
                    matchTrackerIndex++;

                    if (currentProfile.languageType.java && allUsers[key].languageType.java) {
                        console.log("You both are interested in Java!");
                        commonInterestScore++;
                        //Increase match score
                        allUsers[key].matchScore += 5;
                        console.log(matchTrackerIndex);                        
                        allUsers[key].matchTracker = (allUsers[key].matchTracker.substr(0, matchTrackerIndex) + "1" + allUsers[key].matchTracker.substr(matchTrackerIndex + 1));
                        console.log(allUsers[key].matchTracker);
                    };

                    matchTrackerIndex++;
                    if (currentProfile.languageType.cPlus && allUsers[key].languageType.cPlus) {
                        console.log("You both are interested in C++!");
                        commonInterestScore++;
                        //Increase match score
                        allUsers[key].matchScore += 5;
                        console.log(matchTrackerIndex);                        
                        allUsers[key].matchTracker = (allUsers[key].matchTracker.substr(0, matchTrackerIndex) + "1" + allUsers[key].matchTracker.substr(matchTrackerIndex + 1));
                        console.log(allUsers[key].matchTracker);
                    };
                    matchTrackerIndex++;


                    //COMPARE COLLAB TYPE - current user vs. other users - Left off here

                    console.log("COLLAB TYPE - EXISTING USERS: ");
                    console.log(allUsers[key].collabType.beMentor, allUsers[key].collabType.haveMentor, allUsers[key].collabType.meetCoder);

                    if (currentProfile.collabType.haveMentor && allUsers[key].collabType.beMentor) {
                        console.log("You  are interested being mentored, and this user is interested in being a mentee!");
                        //Increase match score
                        allUsers[key].matchScore += 15;

                        console.log(matchTrackerIndex);                        
                        allUsers[key].matchTracker = (allUsers[key].matchTracker.substr(0, matchTrackerIndex) + "1" + allUsers[key].matchTracker.substr(matchTrackerIndex + 1));
                        console.log(allUsers[key].matchTracker);
                        matchTrackerIndex++; //Happens inside "if" to skip logging the next index since match happens on question 14 or 15, but not both

                    } else if (currentProfile.collabType.beMentor && allUsers[key].collabType.haveMentor) {
                        
                        matchTrackerIndex++; //To skip logging an answer for question 14
                        console.log("You  are interested in being a mentor, and this user is interested in being mentored!");
                        //Increase match score
                        allUsers[key].matchScore += 15;

                        console.log(matchTrackerIndex);                        
                        allUsers[key].matchTracker = (allUsers[key].matchTracker.substr(0, matchTrackerIndex) + "1" + allUsers[key].matchTracker.substr(matchTrackerIndex + 1));
                        console.log(allUsers[key].matchTracker);
                    };

                    matchTrackerIndex++;

                    if (currentProfile.collabType.meetCoder && allUsers[key].collabType.meetCoder) {
                        console.log(commonInterestScore);
                        if (commonInterestScore > 2) { //If user has 3 or more common interests
                            console.log("You have 3 or more common interests!!");

                            //Increase match score
                            allUsers[key].matchScore += 10;

                            console.log(matchTrackerIndex);                        
                            allUsers[key].matchTracker = (allUsers[key].matchTracker.substr(0, matchTrackerIndex) + "1" + allUsers[key].matchTracker.substr(matchTrackerIndex + 1));
                            console.log(allUsers[key].matchTracker);
                        }

                    };

                    console.log(currentProfile.name + "has a matchScore of " + allUsers[key].matchScore + " with " + allUsers[key].name);
                    if (allUsers[key].matchScore > 0) {
                        console.log(allUsers[key].matchTracker);
                        var matchedUser = allUsers[key];
                        matchedUsersArray.push(matchedUser); //Save a copy of the matched user in an array
                    }

                    console.log("------------------------------------")
                    }
                } //End of for loop
            
            //Pass all the matched users into an array
            displayMatches(matchedUsersArray);

        })
    };

    function displayMatches(arrayOfUserObjects){
        $(".leftColumnMatches").empty();
        $(".rightColumnMatches").empty();


        console.log("displayMatches function!")
        console.log(arrayOfUserObjects);
        
        arrayOfUserObjects.sort(function(a,b) {
           return b.matchScore-a.matchScore
        });

        var sortedArray = arrayOfUserObjects;

        console.log(sortedArray);

        for (var i = 0; i < 6; i < i++) {
            
            //For matchUsers at index position 0,2,4 - left column
            if (i%2 == 0){
                console.log("left Column!");
                $(".leftColumnMatches").append(`<div class="row">
                                                <div class="icon-block">
                                                <h2 class="center brown-text">
                                                    <img src="extras/human-481829_640.png" alt="User Match Avatar" style="width:50px;height:50px;">
                                                </h2>
                                               <h5 class="center teal-text"> <a class="matchNameLinks" href="#">${sortedArray[i].name}</a></h5>
                                                <p class="center light">Match Score is ${sortedArray[i].matchScore}!
                                                <br>Wants to be a mentor</p>
                                                </div>
                                                </div>`);
                console.log(`Match ${i + 1} of 6 max appended!`);
                                                



            } else { //For matchUsers at index position 1,3,5 - right column
                console.log("left Column!");
                $(".rightColumnMatches").append(`<div class="row">
                                                    <div class="icon-block">
                                                    <h2 class="center brown-text">
                                                        <img src="extras/human-481829_640.png" alt="User Match Avatar" style="width:50px;height:50px;">
                                                    </h2>
                                                    <h5 class="center teal-text"><a class="matchNameLinks" href="#">${sortedArray[i].name}</a></h5>
                                                    <p class="center light">Match Score is ${sortedArray[i].matchScore}!
                                                    <br>Wants to be a mentor</p>
                                                    </div>
                                                    </div>`);

                console.log(`Match ${i + 1} of 6 max appended!`);
            }

        }
        console.log("Finished displaying matches")
        
    };

    //HOME PAGE

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

        //Firebase NEW user method

        //Firebase NEW user method
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (user) {
                var userData = database.ref("/Users");
                console.log("create new user", firebase.auth().currentUser);
                console.log("user:", user);
                userData.push({
                    name: user.email //Using push generates the wrong key and need to push full user object, not just email
                });
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error.code);
                console.log(error.message);
            });

        // Clears all the login text boxes
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

    //Listen for change in user sign in status
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
            displayProfile(userID);
        } else {
            console.log("No users logged in");
        }
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
            zip: "",
            //coordinates: {
                //long: convert from given address
                //lat: convert from given address
            // },
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
                cPlus: false,
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
            matchTracker: "0000000000000000"
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
            newUser.languageType.cPlus = true;
            console.log("c++: ", newUser.languageType.cPlus);
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
  
    //LOCATIONS PAGE

    var map;

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
  
    //Loads map centered on Orlando
    window.initMap = function () {
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