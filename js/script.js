/**
Digital Garden
Wawa Li
Prototype 3
24 novembre 2022
*/

"use strict";
//only one box can be dragegd at the time :
let boxIsDragging=false;

$(document).ready(function(){

    //when user press "talk" button
//  $( "#talkBoxDialog" ).dialog({
//     position: { my: "left top", at: "right bottom", of: window },
//     classes: {
//         "ui-dialog": "talkBox"
//     },
//     buttons: [
//         {
//           text: "Close",
//           click: function() {
//             $( this ).dialog( "close" );
//             // this.closingSound.play();
//           }
//         }
//       ]
//   });

//closes the talkbox dialog after creating it
//   $("#talkBoxDialog").dialog('close');

    // let journal= new Journal();
    let inputForm = new InputForm();


    let flowerArray=[];
    let thoughtArrayDB=[];
    
    let selectedFlower=null;
    let flowerMenuSelect = document.getElementById("flowerList-select"); 

        // localStorage.clear();
    //??why message doesnt display?
    // document.getElementById("message").innerHTML = "Welcome to the digital garden. Sit and reflect as you need."
    document.getElementById("message").innerHTML = "yeeeee."

    let modeButton = document.getElementById('modeButton');
    // let playMode = ["mainMode", "processMode"];
    let currentPlayMode= "mainMode";
    let editMode = true;

    let waterButton = document.getElementById("waterButton");
    let loveButton = document.getElementById("loveButton");
    let talkButton = document.getElementById('talkButton');

    let userLoggedIn = false;
    let currentUser;

    let locationDataContainer = document.getElementById('locationData');

//setup function kinda
    let section = $('section');

    // let currentFlowerContainer = document.getElementById("currentFlowerContainer");
    let currentFlower=[];
    let flowerArrayIndex=0;
    let idDataContainer = document.getElementById('idData');
    //get flower.flowerEl name printed in the container
    let idData; 
    let myFlowerArray=[];

    // let sendThoughtButton = document.getElementById("sendThoughtButton");
    let submitButton = document.getElementById("submitButton"); //fill form
    let flowerGenerated= false;

    let loveSound = document.getElementById("chimeSound");

    let identifyButton = document.getElementById("identifyButton");
    let visitorListArray= [];
    let username;
    let password;
    let currentUserIdBox = document.getElementById("currentUserId"); //same than userId but in titleBar
    let loginButton = document.getElementById("loginButton");
    let setPasswordButton = document.getElementById("setPasswordButton");

    let userKey = "username";
    let userValue = "";
    let userSeedCount = document.getElementById("userFlowerIndex"); 
    let globalSeedCount = document.getElementById("totalFlowerIndex"); 
    // let consoleDialogBox = document.getElementById("consoleBoxDialog");

    let generateButton= document.getElementById('generateButton');
    let closeTalkBoxButton = document.getElementById("closeDialogButton");
    let talkBoxDiv = new DraggableBox(document.getElementById("talkBoxDiv"));
    let consoleBoxDiv = new DraggableBox(document.getElementById("consoleBoxDialogDiv"));
    let identificationBoxDialog = new DraggableBox(document.getElementById("identificationBoxDialog"));
    let seedBoxDiv = new DraggableBox(document.getElementById("seedBoxDialogDiv"))
// USER CONSOLE SETUP : 
    function appendConsoleMsg(msg){
        let consoleContainer = $("#console-container");
        let dataHTMLElement = $("<p>").addClass("mode-prop");
        dataHTMLElement.html(msg);
        // $(consoleContainer).empty();
        $(dataHTMLElement).prependTo(consoleContainer);
    }
    function appendConsoleInstruction(msg){
        let consoleContainer = $("#console-container");
        let dataHTMLElement = $("<p>").addClass("instruction-prop");
        dataHTMLElement.html(msg);
        // $(consoleContainer).empty();
        $(dataHTMLElement).prependTo(consoleContainer);
    }
    function appendConsoleFlowerMsg(msg){
        let consoleContainer = $("#console-container");
        let dataHTMLElement = $("<p>").addClass("flower-prop");
        dataHTMLElement.html(msg);
        // $(consoleContainer).empty();
        $(dataHTMLElement).prependTo(consoleContainer);
    }

    function panViewToCurrentFlower(selection){
        mainMap.panTo(flowerArray[selection].n_latLng);

    }

    flowerMenuSelect.addEventListener("change", function(){
        panViewToCurrentFlower(flowerMenuSelect.value);

        if (selectedFlower !== null){
        flowerArray[selectedFlower].deactivateJournal();
        }

 
        if (flowerMenuSelect.value === "none"){
            console.log("no flower");
            flowerMenuSelect.value = "";
            selectedFlower = null;
        } else {
            selectedFlower = flowerMenuSelect.value;

            //display on the user board which flower is selected :
            document.getElementById("demo").innerHTML = selectedFlower ;
            //how to set untrue
            for (let i=0; i< flowerArray.length; i++){
                //reset all to false first, then set the exception:
                flowerArray[i].selected=false;
        }
        flowerArray[selectedFlower].selected=true;
        for (let i=0; i< flowerArray.length; i++){
            flowerArray[i].highlightFlower();
        }
        //displays the energy levels of the selected flowers
        flowerArray[flowerArray.length-1].buttons.setOptionButtons();
        // flowerArray[selectedFlower].printPositions(selectedFlower);
        flowerArray[selectedFlower].energy.printCurrentEnergyLevel();
        }

    });

           //MAP SETTING ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 
       // We create a leaflet map, and in setView, we determine coordinates and zoom level
       let mainMap = L.map('mainMap').setView([45.50884, -73.58781], 19);
       let coordinateMarker = L.marker();
       $(".leaflet-control-zoom").css("visibility", "hidden");
       mainMap.touchZoom.disable();
       mainMap.doubleClickZoom.disable();
       mainMap.scrollWheelZoom.disable();

       //source : https://mathi330.github.io/cart351/Demo/demo.html
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 9, // you cannot zoom in more than 9, if set to 10, the map turns gray
        // doubleClickZoom: false, // this is just so when I double click on the map it doesn't zoom in
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="blank_">OpenStreetMap</a>' // link to where we got the data for the map
    }).addTo(mainMap); // add tile layer to map
//custom tiles : https://leafletjs.com/examples/extending/extending-2-layers.html
L.TileLayer.Kitten = L.TileLayer.extend({
    getTileUrl: function(coords) {
        let i = Math.ceil( Math.random() * 3 );
        return "https://hybrid.concordia.ca/l_wanhua/cart351/ascii-lands/ascii-land_plain"+i+".jpg";
    },
    getAttribution: function() {
        return "<a href='https://placekitten.com/attribution.html'>ASCII Custom Earths</a>"
    }
});

L.tileLayer.kitten = function() {
    return new L.TileLayer.Kitten();
}

L.tileLayer.kitten().addTo(mainMap);

           //AJAX post SETTING ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 
    $.ajax({
                  type: "POST",
                  enctype: 'text/plain',
                  url: "php/retrieveData_flowerObject.php",
                  processData: false,//prevents from converting into a query string
                  contentType: false,
                  cache: false,
                  timeout: 600000,
                  success: function (response) {
                //   console.log(response);
                  //use the JSON .parse function to convert the JSON string into a Javascript object
                  let parsedJSON = JSON.parse(response);

                  for(let i = 0; i<parsedJSON.length; i++){
                    //take order from the constructor, but names from the table (look at "INSERT INTO" variables name)
                    // console.log(parsedJSON[i].pattern)
                    //retrieving data, outputting from the database to pass in a class:  
            if (parsedJSON[i].pattern==="fractals"){
                flowerArray.push(new Fractals(parseFloat(parsedJSON[i].xPosition),
                parseFloat(parsedJSON[i].yPosition),
                  null,
                  mainMap,
                  parsedJSON[i].flowerID,
                  null,
                  parseFloat(parsedJSON[i].growthLength),
                  parsedJSON[i].user
                ));
            } else if (parsedJSON[i].pattern==="lsystemAxiomF"){
                flowerArray.push(new AxiomF(parseFloat(parsedJSON[i].xPosition),
                parseFloat(parsedJSON[i].yPosition),
                  null,
                  mainMap,
                  parsedJSON[i].flowerID,
                  null,
                  parseFloat(parsedJSON[i].growthLength),
                  parsedJSON[i].user
                ));
            }

                    //for the flowers display since the condition for display is true for flowerGenerated
                    flowerArray[flowerArray.length-1].flowerGenerated = true;
                    flowerArray[flowerArray.length-1].assignFormValues (parseFloat(parsedJSON[i].creationDate),parseFloat(parsedJSON[i].growthLength),parsedJSON[i].manualGrowth,parsedJSON[i].hideUser,parsedJSON[i].fruit,parsedJSON[i].user,parsedJSON[i].pattern,parsedJSON[i].color,parsedJSON[i].motivation,);
                    // flowerArray[flowerArray.length-1].isGrowing = true;

                  }

                  $.ajax({
                    type: "POST",
                    enctype: 'text/plain',
                    url: "php/retrieveData_journal.php",
                    processData: false,//prevents from converting into a query string
                    contentType: false,
                    cache: false,
                    timeout: 600000,
                    success: function (response) {
                    // console.log(response);
                    //use the JSON .parse function to convert the JSON string into a Javascript object
                    let parsedJSONjournal = JSON.parse(response);
  
                    for(let i = 0; i<parsedJSONjournal.length; i++){
                      //take order from the constructor, but names from the table (look at "INSERT INTO" variables name)
//retrieving data, outputting from the database to create obj:  
 
                        thoughtArrayDB.push({
                            msg: parsedJSONjournal[i].msg,
                            flowerId: parsedJSONjournal[i].fID,
                            msgDate: parsedJSONjournal[i].msgDate
                        });
                    }
                            for (let j=0; j < flowerArray.length; j++){
                                for (let k=0;k<thoughtArrayDB.length; k++){
                                    //going thru the thoughtsObj array from the DB, filter those who matches a flower# and store them in their  array in the journal class:  
                                    if (thoughtArrayDB[k].flowerId === flowerArray[j].flowerDBid){
                                        flowerArray[j].journal.talkHistoryArrayDB.push(thoughtArrayDB[k]);
                                    }
                                }
                            }
//debugging purposes
                        // for (let m=0; m< flowerArray.length; m++){
                        //     flowerArray[m].journal.thoughtsHistory();
                        // }
            //Retrieve total number of flowers on the field :
                    globalSeedCount.innerHTML = flowerArray.length;

           //LOGIN SETTING ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 
        //current user identification : 
        identifyButton.addEventListener('click', function (){
            // let visitor = prompt("Hello! Who r u?", "secret passerby");
            let visitor = document.getElementById("login").value;
            visitorListArray.push(visitor);
            saveUserLogin(visitor)

            // if (visitor != null) {
            //     document.getElementById("message").innerHTML =
            //     "Hello " + visitor + " !! Thank U for passing by";
            //   }

        });

    //local storage set-up
    function saveUserLogin (username){
    // Create a local storage item (key value pair)
    //The localStorage property is read-only.
    //username : password and input fields
    userValue = username;
    currentUser = username;

    // check if this key-val alreday exists
    if (localStorage[userKey] === userValue) {
    //   valToStore = password;
    appendConsoleMsg("> Welcome back, " + userValue);
    appendConsoleInstruction("> Password required");

    // loginCurrentUserDisplay.innerHTML = userValue;
    currentUserIdBox.innerHTML = userValue;
    // console.log("ask for password");
    document.getElementById("password-container").style = "display : block";
    identifyButton.style = "display : none";
    loginButton.style = "display : block";

    } else {
        //WRITE to local storage
    appendConsoleMsg("> New user added:"+userValue);
    currentUserIdBox.innerHTML = userValue;
    identifyButton.style = "display : none";
    document.getElementById("password-container").style = "display : block";
    setPasswordButton.style = "display : block";
    localStorage.setItem(userKey,userValue);
    }

    appendFlowerSelect();
    //!! close dialog
    };

    //if the user is recognized in the storage, verify the password
    function verifyPassword (password) {
console.log(localStorage.getItem("password"));
                //get the password and check if its the right one
                if (password === localStorage.getItem("password")){
                    userLoggedIn = true;
                    mainMap.on('dblclick', onMapDblClick);
                    appendConsoleMsg("> Nice2c u again");
                    appendConsoleMsg("You are logged in.");
                    appendConsoleInstruction("> You can : " + "<br> - Double-click to plant seed. <br>- Access you flowers array in the user board.");
                    logUserProfile();
                    autofillUser();

                    // flowerArray[flowerArray.length-1].buttons.setOptionButtons();
                } else {
                    userLoggedIn = false;
                    appendConsoleMsg("Log in failed.");
                    appendConsoleInstruction("> Incorrect. please try again");
                }

    };

    let passwordKey= "password";
    let passwordValue= "";

    function addPassword (password) {

        passwordValue = password;
        localStorage.setItem(passwordKey,passwordValue);
        appendConsoleMsg("> Password saved.");

        // $("#identificationBoxDialog").dialog('close');
        document.getElementById("identificationBoxDialog").style= "display:none";
        userLoggedIn = true;
        autofillUser();
        //add to local storage
    };

    loginButton.addEventListener("click", function(){
        let userInputPassword = document.getElementById("password").value;
        verifyPassword(userInputPassword);
    });

    setPasswordButton.addEventListener("click", function(){
        let userInputPassword = document.getElementById("password").value;
        console.log("password inputed: "+userInputPassword);
        appendConsoleMsg("> Password saved.")
        addPassword(userInputPassword);
    });

    //The user if set, and the ID dialog box closes :
    function logUserProfile(){
        // console.log(userLoggedIn);
        document.getElementById("identificationBoxDialog").style= "display:none";
        // $("#identificationBoxDialog").dialog('close');
        appendConsoleMsg("> Currently logged as: "+localStorage.getItem("username"));
        appendConsoleMsg("> Your pw is: "+localStorage.getItem("password"));

    }

    //end local storage setup

    function autofillUser(){
        //temporary function where the connected user is filled in the fill form (although it has to be changed for something more solid)
        if (userLoggedIn === false){
            //eventually when ppl that are not logged in can also plant seeds, this option will work
        document.getElementById("usernameInputField").value = "unidentified";
        } else {
            document.getElementById("usernameInputField").value = currentUser;

        }
    }
           //OBJECT SETTING ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 

    function generateFlower(){
        for (let i=0;i < flowerArray.length; i++){

        if (flowerArray[i].flowerGenerated === true){
        // printIcon();
        flowerArray[i].generate();
        flowerArray[i].turtle();

        }

    }
      }

      
    // end L-SYSTEM

//end SETUPS  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 


           //DIALOG POP-UP BOXES SETTING ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 

let consoleBoxDialogDiv = document.getElementById("consoleBoxDialogDiv");
consoleBoxDialogDiv.style = "display:block";

                // $( "#consoleBoxDialog" ).dialog({
                //     dialogClass: "identificationBox",
                //     position: ({
                //         my: "right top",
                //         at: "right top",
                //         of: window
                //       }),
                // });


//?? do we still need this box
    $.getJSON('Instructions.json',function(data) {
            showFlowerData(data);


        talkButton.addEventListener("click", function(){
            if (selectedFlower === null){
                appendConsoleInstruction("Select a flower from the list.")
                 } else {
                    // console.log(selectedFlower);
            // flowerArray[selectedFlower].journal.openJournal();
            appendConsoleMsg("> "+flowerArray[selectedFlower].flowerId+" journal opened.")

            if (flowerArray[selectedFlower].dialogActivate === false){
            flowerArray[selectedFlower].activateJournal();
            // console.log(flowerArray[selectedFlower].flowerDBid);
            flowerArray[selectedFlower].journal.talkHistory();
        }
            }
        });

        submitButton.addEventListener("click", function(){
                    //submit at seed fill form
            //displays the users total flower array length :
            userSeedCount.innerHTML= flowerArray.length;

        });


        waterButton.addEventListener("click", function(){

            if (selectedFlower === null){
                appendConsoleInstruction("> Please select a flower.");
                 } else {
            //increments the waterDaily level count
        flowerArray[selectedFlower].energy.waterDailyLevel++;
        appendConsoleMsg("> Water +1");

        if (flowerArray[selectedFlower].energy.waterDailyLevel ===4){
            appendConsoleFlowerMsg("> Flower : Enough water for today, thank u!!")
            // document.getElementById("flowerThoughts-container").innerHTML= "Enough water for today, thank u!!"
        }
        //thoughts associated with the water level
        if (flowerArray[selectedFlower].energy.waterDailyLevel ===7){
            appendConsoleFlowerMsg("> Flower : Omg i'm gonna drown please stop")
            // document.getElementById("flowerThoughts-container").innerHTML= "Omg i'm gonna drown please stop"
        }

        //prints the waterDaily level
            for (let i=0; i<flowerArray[selectedFlower].energy.waterDailyLevel;i++){
                //resets it?
                document.getElementById('waterHeartLevelBox').innerHTML ="";
                //goes thru the water level icon visuals
                document.getElementById('waterHeartLevelBox').innerHTML += flowerArray[selectedFlower].energy.waterLevelArray[i];
                //!! switch to call from energy class

            }
        }
        });

        loveButton.addEventListener("click", function(){
            // flowerArray.buttons.pressLoveButton();
            //messages and trigger when the loveButton is pressed :
            if (selectedFlower === null){
                    appendConsoleInstruction("> Please select a flower.");
                 } else {
            flowerArray[flowerArray.length-1].loveDailyLevel++;
                            //!! switch to call from energy class

            loveSound.play();
                setTimeout(() => {
                    appendConsoleFlowerMsg("> Flower : I love U too!!")
                    // document.getElementById("flowerThoughts-container").innerHTML= "I love U too!!"
                  }, "100");
                }

                flowerArray[selectedFlower].blossom=true;

        });


        closeTalkBoxButton.addEventListener("click", function (){
            flowerArray[selectedFlower].journal.closeJournal();
        })

        document.getElementById("cancelSeedButton").addEventListener("click", function(){
            document.getElementById("seedBoxDialogDiv").style="display:none";
        });

        }) //getJson 

        .fail(function() {
            // built function in that will alert if error
                    console.log( "error" );
                });


        //  let imageUrl = 'https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg';
        // let bounds= [[40.712216, -74.22655], [40.773941, -74.12544]];
        // let image = L.imageOverlay(imageUrl, bounds).addTo(mainMap);
        // mainMap.fitBounds(bounds);


        //??do we still need?
//imprime les infos en bas à gauche ??peut-êre que je vais devoir le delet

            function showJournal(data){
                let flowerDataContainer = $("#flowerData-container");
                $(flowerDataContainer).empty();
              displaySingleInstruction(data,flowerDataContainer);
            };

            //Display a marker on map at user's double-click
            function onMapDblClick(e){

                let counter=0;
                counter++;

                if (counter < 3){
                    coordinateMarker // take the marker we have created earlier
                    .setLatLng(e.latlng) // set the coordinates of the marker to the coordinates of the mouse when it was double clicked
                    .addTo(mainMap); // add the marker to the map
                    locationDataContainer.value = e.latlng;

                    inputForm.onSubmit(e.latlng,coordinateMarker ,mainMap ,flowerArray,chimeSound,appendConsoleMsg);

                    //creating an individual flower object, passing its data thru newFlower and pushing it to the flower array :
                    // let newFlower = new Flower(e.latlng.lat, e.latlng.lng, coordinateMarker ,mainMap ,flowerArray.length,chimeSound);
                    inputForm.openInputForm(null);
                    // flowerArray.push(newFlower);
                    userSeedCount.innerHTML= flowerArray.length;
                   let creationTimeStamp= new Date();

                idDataContainer.value = "flower"+ flowerArray.length + "_"+creationTimeStamp.getTime();

                // currentFlowerContainer.innerHTML="<"+idDataContainer.value+"> <br>";
            } else {
                appendConsoleMsg("> Limit exceeded, try again in 24 hours.")

                //User can plant in 24 hours :
                setTimeout(() => {
                    counter=0;
                }, "86400000")
            }

           
        }


            //bottom-left container, #playModeDataContainer;
            function displaySingleInstruction(data,parentContainer){
                
                        if (currentPlayMode === 'exploreMode'){
// need to store the data array from json file, then store it into an HTML Class element and then print it in a container
                            let dataToPrint = data.Explore_Mode;

                            $.each(dataToPrint, function( key, value ) {
                            let dataHTMLElement = $("<p>").addClass("mode-prop");

                            dataHTMLElement.html(`${key} : ${value}`);
                            $(dataHTMLElement).appendTo(parentContainer);
                            
                        });

                        } else if (currentPlayMode === 'processMode'){
                            let dataToPrint = data.Process_Mode;

                            $.each(dataToPrint, function( key, value ) {
                            let dataHTMLElement = $("<p>").addClass("mode-prop");

                            dataHTMLElement.html(`${key} : ${value}`);
                            $(dataHTMLElement).appendTo(parentContainer);
                            
                        });
                            
                        } else if (currentPlayMode === 'mainMode') {
                            let dataToPrint = data.Main_Mode;

                            $.each(dataToPrint, function( key, value ) {
                            let dataHTMLElement = $("<p>").addClass("mode-prop");

                            dataHTMLElement.html(`${key} : ${value}`);
                            $(dataHTMLElement).appendTo(parentContainer);
                            
                        });
                        }
                // });
                if (userLoggedIn === true){
                }
            } //END DISPLAY

        function showFlowerData(data){
            let flowerDataContainer = $("#flowerData-container");
            let genData = data.User_Data;

        $.each(genData.Flower, function( flowerKey, flowerValue ) {
            let dataHTMLElement = $("<p>").addClass("mode-prop");

        dataHTMLElement.html(`${flowerKey} : ${flowerValue}`);
        $(dataHTMLElement).appendTo(flowerDataContainer);
    });

    }


    function printIcon(){
        for (let i = 0; i < 1; i++) {
            document.getElementById('waterHeartLevelBox').innerHTML += flowerArray[i].waterLevelArray[i];
                            //!! switch to call from energy class

        }
    }

    //appends all the ID of the user's flowers in the flower selection menu:
    function appendFlowerSelect(){
        for (let i =0;i< flowerArray.length; i++){
            if (flowerArray[i].user === currentUser ){
            let option = document.createElement("option");
            option.text =   flowerArray[i].flowerId;
            option.value = i;
            flowerMenuSelect.add(option);
        }

        }
    }

        }, //end success post journal
error:function(){
console.log("error occurred");
}
}); // end ajax post journal
        },//end success flowerObj journal
                  error:function(){
                    console.log("error occurred");
                    } 
}); // end ajax flowerObj journal
        }); //end of windowOnLoad / document.ready