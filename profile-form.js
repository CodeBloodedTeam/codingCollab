// 1. Create and set up the connection to Firebase using the config function received after setting up the train-time database on Firebase:
var config = {
    apiKey: "AIzaSyAkrlcozQa4UQ74mF_PwbvppuHjPW5B7f8",
    authDomain: "codingcollab-1512956831401.firebaseapp.com",
    databaseURL: "https://codingcollab-1512956831401.firebaseio.com",
    projectId: "codingcollab-1512956831401",
    storageBucket: "codingcollab-1512956831401.appspot.com",
    messagingSenderId: "177469015452"
};

firebase.initializeApp(config);

// Create a new variable to reference the database.
var database = firebase.database();

// Initial Variables:
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
                state: "",
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
                    otherDev: false,
                    otherDevText: "",
                },
                languageType: {
                    htmlCss: false,
                    jsJq: false,
                    python: false,
                    java: false,
                    cSharp: false,
                    otherLang1: false,
                    otherLangText1: "",
                    otherLang2: false,
                    otherLangText2: "",
                },
                collabType: {
                    beMentor: false,
                    haveMentor: false,
                    meetCoder: false,
                    collabProj: false,
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
            var userState = $("#sel-state").val().trim();
            newUser.state = userState;
            var userZip = $("#add-zip").val().trim();
            newUser.zip = userZip;
            console.log("Name: ", newUser.name);
            console.log("Address: ", newUser.address);
            console.log("City: ", newUser.city);
            console.log("State: ", newUser.state);
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
                console.log("Local: ", newUser.experienceLev.expBeginSelf);
            };
            if ($("#exp-beg-study").is(':checked')) {
                newUser.experienceLev.expBeginStudy = true;
                console.log("Local: ", newUser.experienceLev.expBeginStudy);
            };
            if ($("#exp-int").is(':checked')) {
                newUser.experienceLev.expInt = true;
                console.log("Local: ", newUser.experienceLev.expInt);
            };
            if ($("#exp-adv").is(':checked')) {
                newUser.experienceLev.expAdv = true;
                console.log("Local: ", newUser.experienceLev.expAdv);
            };

            // platformType
            if ($("#front-end").is(':checked')) {
                newUser.platformType.frontEnd = true;
                console.log("Local: ", newUser.platformType.frontEnd);
            };
            if ($("#back-end").is(':checked')) {
                newUser.platformType.backEnd = true;
                console.log("Local: ", newUser.platformType.backEnd);
            };
            if ($("#full-stack").is(':checked')) {
                newUser.platformType.fullStack = true;
                console.log("Local: ", newUser.platformType.fullStack);
            };
            if ($("#ios").is(':checked')) {
                newUser.platformType.ios = true;
                console.log("Local: ", newUser.platformType.ios);
            };
            if ($("#android").is(':checked')) {
                newUser.platformType.android = true;
                console.log("Local: ", newUser.android);
            };
            if ($("#other-dev").is(':checked')) {
                newUser.platformType.otherDevText = $("#other-dev-text").val().trim();
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
            if ($("#other-lang1").is(':checked')) {
                newUser.languageType.otherLang1 = $("#other-lang1-text").val().trim();
                console.log("OtherLang1: ", languageType.otherLang1);
            };
            if ($("#other-lang2").is(':checked')) {
                newUser.languageType.otherLang2 = $("#other-lang2-text").val().trim();
                console.log("OtherLang2: ", languageType.otherLang2);
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
            if ($("#collab-proj").is(':checked')) {
                newUser.collabType.collabProj = true;
                console.log("collab proj: ", newUser.collabType.collabProj);
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
            if ($("#i-certify").is(':checked')) {
                newUser.agreement.iCertify = true;
                console.log("I Certify: ", newUser.agreement.iCertify);
            };

        });


        // Creates a local "temporary" object for holding user input data. Prepares it for push.
        //   var newProfile = {
        //     tstamp: firebase.database.ServerValue.TIMESTAMP,
        //     name: name,
        //     address: address,
        //     city: city,
        //     state: state,
        //     zip: zip,
        // connectLocal: connectLocal,
        // connectLocalVir: connectLocalVir,
        // connectVir: connectVir
        //   };

        //   console.log("New Profile Temp Object: ", newProfile);
        // Push the data to Firebase:
        //   database.ref().push(newProfile);

        // Clear all the text boxes after user clicks Submit:
        //   name = $("#display-name").val("");
        //   address = $("#add-address").val("");
        //   city = $("#add-city").val("");
        //   state = $("#sel-state").val("");
        //   zip = $("#add-zip").val("");
        //   connectLocal = $("#connect-local").val("");
        //   connectLocalVir = $("#connect-loc-vir").val("");
        //   connectVir = $("#connect-vir").val("");
        // });

        // 3. Create Firebase event for adding new trains to the database as multiple records. Need to use childSnapshot. 
        // // Firebase is always watching for changes to the data.
        // // When changes occurs it will print them to console and html. This is pulling the Child data which is represented by the new train id number in Firebase.
        // database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        // Print the initial data to the console.
        //   console.log("child log: ", childSnapshot.val());

        // Log the value of the various properties
        //   console.log(childSnapshot.val().name);
        //   console.log(childSnapshot.val().address);
        //   console.log(childSnapshot.val().city);
        //   console.log(childSnapshot.val().state);
        //   console.log(childSnapshot.val().zip);
        //   console.log(childSnapshot.val().connectLocal);
        //   console.log(childSnapshot.val().connectLocalVir);
        //   console.log(childSnapshot.val().connectVir);

        // Store everything in a new variable
        //   var currentProfile = childSnapshot.val();
        //   var profileName = currentProfile.name;
        //   var profileAddress = currentProfile.address;
        //   var profileCity = currentProfile.city;
        //   var profileState = currentProfile.state;
        //   var profileZip = currentProfile.zip;
        //   var profileLocal = current.profile.connectLocal;
        //   var profileLocalVir = currentProfile.connectLocalVir;
        //   var profileVir = currentProfile.connectVir;

        //   console.log("Profile Name: ", profileName);
        //   console.log("Profile Address: ", profileAddress);
        //   console.log("Profile City: ", profileCity);
        //   console.log("Profile Zip: ", profileZip);
        //   console.log("Local: ", connectLocal);
        //   console.log("Local But Virtual: ", connectLocalVir);
        //   console.log("Virtual: ", connectVir);


        //   // 5. Append each profile's data into an HTML table.
        //   $("#profile-table > thead").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
        //     trainFreq + "</td><td>" + nextTrain + "</td><td>" + timeToTrain + "</td><td><button class='delRow' value='Delete'>Delete</button>");