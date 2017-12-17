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
    // var userState = $("#sel-state").val().trim();
    // newUser.state = userState;
    var userZip = $("#add-zip").val().trim();
    newUser.zip = userZip;
    console.log("Name: ", newUser.name);
    console.log("Address: ", newUser.address);
    console.log("City: ", newUser.city);
    // console.log("State: ", newUser.state);
    console.log("ZIP: ", newUser.zip);

    // connectMethod:
    if ($("#connect-local").is(':checked')) {
        var userLocal = newUser.connectMethod.local = true;
        console.log("Local: ", newUser.connectMethod.local);
    } else {
        var userLocal = newUser.connectMethod.local = false;
        console.log("Local: ", newUser.connectMethod.local);
    };

    if ($("#connect-loc-vir").is(':checked')) {
        var userLocalVir = newUser.connectMethod.localVir = true;
        console.log("LocalVirtual: ", newUser.connectMethod.localVir);
    } else {
        var userLocalVir = newUser.connectMethod.localVir = false;
        console.log("LocalVirtual: ", newUser.connectMethod.localVir);
    };

    if ($("#connect-vir").is(':checked')) {
        var userVirtual = newUser.connectMethod.virtual = true;
        console.log("Virtual: ", newUser.connectMethod.virtual);
    } else {
        var userVirtual = newUser.connectMethod.virtual = false;
        console.log("Virtual: ", newUser.connectMethod.virtual);
    };

    // experienceLev:
    if ($("#exp-beg-self").is(':checked')) {
        var userBeginSelf = newUser.experienceLev.expBeginSelf = true;
        console.log("Beginner-Self: ", newUser.experienceLev.expBeginSelf);
    } else {
        var userBeginSelf = newUser.experienceLev.expBeginSelf = false;
        console.log("Beginner-Self: ", newUser.experienceLev.expBeginSelf);
    };
    if ($("#exp-beg-stud").is(':checked')) {
        var userBeginStudy = newUser.experienceLev.expBeginStudy = true;
        console.log("Beginner-Studying: ", newUser.experienceLev.expBeginStudy);
    } else {
        var userBeginStudy = newUser.experienceLev.expBeginStudy = false;
        console.log("Beginner-Studying: ", newUser.experienceLev.expBeginStudy);
    };
    if ($("#exp-int").is(':checked')) {
        var userInter = newUser.experienceLev.expInt = true;
        console.log("Intermediate: ", newUser.experienceLev.expInt);
    } else {
        var userInter = newUser.experienceLev.expInt = false;
        console.log("Intermediate: ", newUser.experienceLev.expInt);
    };
    if ($("#exp-adv").is(':checked')) {
        var userAdv = newUser.experienceLev.expAdv = true;
        console.log("Advanced: ", newUser.experienceLev.expAdv);
    } else {
        var userAdv = newUser.experienceLev.expAdv = false;
        console.log("Advanced: ", newUser.experienceLev.expAdv);
    };

    // platformType
    if ($("#front-end").is(':checked')) {
        var userFront = newUser.platformType.frontEnd = true;
        console.log("FrontEnd: ", newUser.platformType.frontEnd);
    } else {
        var userFront = newUser.platformType.frontEnd = false;
        console.log("FrontEnd: ", newUser.platformType.frontEnd);
    };
    if ($("#back-end").is(':checked')) {
        var userBack = newUser.platformType.backEnd = true;
        console.log("Backend: ", newUser.platformType.backEnd);
    } else {
        var userBack = newUser.platformType.backEnd = false;
        console.log("Backend: ", newUser.platformType.backEnd);
    };
    if ($("#full-stack").is(':checked')) {
        var userFull = newUser.platformType.fullStack = true;
        console.log("fullstack: ", newUser.platformType.fullStack);
    } else {
        var userFull = newUser.platformType.fullStack = false;
        console.log("fullstack: ", newUser.platformType.fullStack);
    };
    if ($("#ios").is(':checked')) {
        var userIos = newUser.platformType.ios = true;
        console.log("ios: ", newUser.platformType.ios);
    } else {
        var userIos = newUser.platformType.ios = false;
        console.log("ios: ", newUser.platformType.ios);
    };
    if ($("#android").is(':checked')) {
        var userAndroid = newUser.platformType.android = true;
        console.log("android: ", newUser.platformType.android);
    } else {
        var userAndroid = newUser.platformType.android = false;
        console.log("android: ", newUser.platformType.android);
    };
    
    // var userOtherDevText = $("#other-dev-text").val().trim();
    // newUser.otherDevText = userOtherDevText;

    // languageType
    if ($("#html-css").is(':checked')) {
        var userHtml = newUser.languageType.htmlCss = true;
        console.log("html/css: ", newUser.languageType.htmlCss);
    } else {
        var userHtml = newUser.languageType.htmlCss = false;
        console.log("html/css: ", newUser.languageType.htmlCss);
    };
    if ($("#js-jq").is(':checked')) {
        var userJsjq = newUser.languageType.jsJq = true;
        console.log("js/jq: ", newUser.languageType.jsJq);
    } else {
        var userJsjq = newUser.languageType.jsJq = false;
        console.log("js/jq: ", newUser.languageType.jsJq);
    };
    if ($("#python").is(':checked')) {
        var userPython = newUser.languageType.python = true;
        console.log("python: ", newUser.languageType.python);
    } else {
        var userPython = newUser.languageType.python = false;
        console.log("python: ", newUser.languageType.python);
    };
    if ($("#java").is(':checked')) {
        var userJava = newUser.languageType.java = true;
        console.log("java: ", newUser.languageType.java);
    } else {
        var userJava = newUser.languageType.java = false;
        console.log("java: ", newUser.languageType.java);
    };
    if ($("#c-plus").is(':checked')) {
        var userCplus = newUser.languageType.cSharp = true;
        console.log("c++: ", newUser.languageType.cSharp);
    } else {
        var userCplus = newUser.languageType.cSharp = false;
        console.log("c++: ", newUser.languageType.cSharp);
    };
    if ($("#php").is(':checked')) {
        var userPhp = newUser.languageType.php = true;
        console.log("php: ", newUser.languageType.php);
    } else {
        var userPhp = newUser.languageType.php = false;
        console.log("php: ", newUser.languageType.php);
    };

    // var userLangText1 = $("#other-lang-text1").val().trim();
    // newUser.otherLangText1 = userLangText1;
    // var userLangText2 = $("#other-lang-text2").val().trim();
    // newUser.otherLangText2 = userLangText2;

    // collabType
    if ($("#be-mentor").is(':checked')) {
        var userBeMentor = newUser.collabType.beMentor = true;
        console.log("Be a Mentor: ", newUser.collabType.beMentor);
    } else {
        var userBeMentor = newUser.collabType.beMentor = false;
        console.log("Be a Mentor: ", newUser.collabType.beMentor)
    };
    if ($("#have-mentor").is(':checked')) {
        var userHaveMentor = newUser.collabType.haveMentor = true;
        console.log("have a mentor: ", newUser.collabType.haveMentor);
    } else {
        var userHaveMentor = newUser.collabType.haveMentor = false;
        console.log("have a mentor: ", newUser.collabType.haveMentor)
    };
    if ($("#meet-coder").is(':checked')) {
        var userMeetCoder = newUser.collabType.meetCoder = true;
        console.log("meet a coder: ", newUser.collabType.meetCoder);
    } else {
        var userMeetCoder = newUser.collabType.meetCoder = false;
        console.log("meet a coder: ", newUser.collabType.meetCoder);
    };
    // var userCollabProj = $("#collab-proj-text").val().trim();
    // newUser.collabProj = userCollabProj;

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
        var userIagree = newUser.agreement.iAgree = true;
        console.log("I agree: ", newUser.agreement.iAgree);
    } else {
        var userIagree = newUser.agreement.iAgree = false;
        console.log("I agree: ", newUser.agreement.iAgree);
    };
    if ($("#i-am-18").is(':checked')) {
        var userIcertify = newUser.agreement.iCertify = true;
        console.log("I Certify: ", newUser.agreement.iCertify);
    } else {
        var userIcertify = newUser.agreement.iCertify = false;
        console.log("I Certify: ", newUser.agreement.iCertify);
    };


// Creates a local "temporary" object for holding user input data. Prepares it for push.
var newProfile = {
    userName: userName,
    userAddress: userAddress,
    userCity: userCity,
    // userState: userState,
    userZip: userZip,
    userLocal: userLocal,
    userLocalVir: userLocalVir,
    userVirtual: userVirtual,
    userBeginSelf: userBeginSelf,
    userBeginStudy: userBeginStudy,
    userInter: userInter,
    userAdv: userAdv,
    userFront: userFront,
    userBack: userBack,
    userFull: userFull,
    userIos: userIos,
    userAndroid: userAndroid,
    // userOtherDevText: userOtherDevText,
    userHtml: userHtml,
    userJsjq: userJsjq,
    userPython: userPython,
    userJava: userJava,
    userCplus: userCplus,
    userPhp: userPhp,
    // userLangText1: userLangText1,
    // userLangText2: userLangText2,
    userBeMentor: userBeMentor,
    userHaveMentor: userHaveMentor,
    userMeetCoder: userMeetCoder,
    // userCollabProj: userCollabProj,
    userGithub: userGithub,
    userLinkedIn: userLinkedIn,
    userOtherProfile: userOtherProfile,
    userIagree: userIagree,
    userIcertify: userIcertify
};
console.log("New Profile Temp Object: ", newProfile);

// Push the data to Firebase:
  database.ref().push(newProfile);

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
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

// Print the initial data to the console.
  console.log("Child Log: ", childSnapshot.val());

// Store everything in a new variable
  var currentProfile = childSnapshot.val();
    var profileName = currentProfile.userName;
    var profileAddress = currentProfile.userAddress;
    var profileCity = currentProfile.userCity;
    // var profileState = currentProfile.userState;
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
    // var porfileOtherDevText = currentProfile.userOtherDevText;
    var profileHtml = currentProfile.userHtml;
    var profileJsjq = currentProfile.userJsjq;
    var profilePython = currentProfile.userPython;
    var profileJava = currentProfile.userJava;
    var profileCplus = currentProfile.userCplus;
    var profilePhp = currentProfile.userPhp;
    // var profileLangText1 = currentProfile.userLangText1;
    // var profileLangText2 = currentProfile.userLangText2;
    var profileBeMentor = currentProfile.userBeMentor;
    var profileHaveMentor = currentProfile.userHaveMentor;
    var profileMeetCoder = currentProfile.userMeetCoder;
    // var profileCollabProj = currentProfile.userCollabProj;
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
    // console.log("OtherDevText: ", profileOtherDevText);


// 5. Append each profile's data into an HTML table. NOT SURE how we are displaying yet.
//   $("#profile-table > thead").append("<tr><td>" ...)

});