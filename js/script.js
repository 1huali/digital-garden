/**
Digital Garden
Wawa Li
Prototype 2
24 novembre 2022
*/

"use strict";
function setup() {
    console.log("p5 setup");
  }

$(document).ready(function(){

    // let journal= new Journal();
    let inputForm = new InputForm();

    let flowerArray=[];
    
    let selectedFlower;
    let flowerMenuSelect = document.getElementById("flowerList-select"); 

        // localStorage.clear();
    //??why message doesnt display?
    document.getElementById("message").innerHTML = "Welcome to the digital garden. Sit and reflect as you need."

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
    
    //message bar :
//     if (userLoggedIn === false){
// setTimeout(() => {
//     document.getElementById("message").innerHTML= "Wander in peace or register"
//   }, "7000")
// };

    let currentFlowerContainer = document.getElementById("currentFlowerContainer");
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
    let currentUserBox = document.getElementById("currentUser");
    let currentUserIdBox = document.getElementById("currentUserId"); //same than userId but in titleBar
    let loginButton = document.getElementById("loginButton");
    let setPasswordButton = document.getElementById("setPasswordButton");

    let userKey = "username";
    let userValue = "";
    let userSeedCount = document.getElementById("userFlowerIndex"); 
    let globalSeedCount = document.getElementById("totalFlowerIndex"); 


    
    let generateButton= document.getElementById('generateButton');


    flowerMenuSelect.addEventListener("change", function(){
        selectedFlower = flowerMenuSelect.value;
        document.getElementById("demo").innerHTML = selectedFlower ;
        if (flowerMenuSelect.value === "none"){
            console.log("no flower");
            flowerMenuSelect = -1;
        } else {
        //displays the energy levels of the selected flowers
        flowerArray[selectedFlower].printPositions(selectedFlower);
        flowerArray[selectedFlower].energy.printCurrentEnergyLevel();
        }

    });

           //MAP SETTING ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 
       // We create a leaflet map, and in setView, we determine coordinates and zoom level
       let mainMap = L.map('mainMap').setView([45.50884, -73.58781], 5);
       let coordinateMarker = L.marker();
       $(".leaflet-control-zoom").css("visibility", "hidden");
       mainMap.touchZoom.disable();
       mainMap.doubleClickZoom.disable();
       mainMap.scrollWheelZoom.disable();

       //source : https://mathi330.github.io/cart351/Demo/demo.html
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 3, // you cannot zoom in more than 9, if set to 10, the map turns gray
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

           //AJAX SETTING ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 
    $.ajax({
                  type: "POST",
                  enctype: 'text/plain',
                  url: "php/retrieveData.php",
                  processData: false,//prevents from converting into a query string
                  contentType: false,
                  cache: false,
                  timeout: 600000,
                  success: function (response) {
                  console.log(response);
                  //use the JSON .parse function to convert the JSON string into a Javascript object
                  let parsedJSON = JSON.parse(response);

                  for(let i = 0; i<parsedJSON.length; i++){
                    //take order from the constructor, but names from the table (look at "INSERT INTO" variables name)
                    // console.log(parsedJSON[i].xPosition)
                    // console.log(parsedJSON[i].yPosition)
            //retrieving data, outputting from the database :  
                    flowerArray.push(new Flower(parseInt(parsedJSON[i].xPosition),
                    parseInt(parsedJSON[i].yPosition),
                      null,
                      mainMap,
                      parsedJSON[i].flowerID,
                      null,
                      parseFloat(parsedJSON[i].growthLength),
                      parsedJSON[i].user
                    ));

                    //for the flowers display since the condition for display is true for flowerGenerated
                    flowerArray[flowerArray.length-1].flowerGenerated = true;
                    flowerArray[flowerArray.length-1].assignFormValues (parseFloat(parsedJSON[i].creationDate),parseFloat(parsedJSON[i].growthLength),parsedJSON[i].manualGrowth,parsedJSON[i].hideUser,parsedJSON[i].fruit,parsedJSON[i].user,parsedJSON[i].pattern,parsedJSON[i].color);
                    // flowerArray[flowerArray.length-1].isGrowing = true;

                  }
            //Retrieve total number of flowers on the field :
                    globalSeedCount.innerHTML = flowerArray.length;

           //LOGIN SETTING ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 

    //local storge set-up
    function saveUserLogin (username){
    // Create a local storage item (key value pair)
    //The localStorage property is read-only.
    //username : password and input fields
    userValue = username;
    currentUser = username;
    appendFlowerSelect();
    assignUsernameTemporary();

    // check if this key-val alreday exists
     if (localStorage[userKey]) {
    //   valToStore = password;
    currentUserBox.innerHTML = userValue;
    currentUserIdBox.innerHTML = userValue;
    // console.log("ask for password");
    document.getElementById("password-container").style = "display : block";
    identifyButton.style = "display : none";
    loginButton.style = "display : block";

    } else {
        //WRITE to local storage
    console.log("new user added:"+userValue);
    currentUserBox.innerHTML = userValue;
    identifyButton.style = "display : none";
    document.getElementById("password-container").style = "display : block";
    setPasswordButton.style = "display : block";
    localStorage.setItem(userKey,userValue);
    }

    //!! close dialog
    };

    //if the user is recognized in the storage, verify the password
    function verifyPassword (password) {
console.log(localStorage.getItem("password"));
                //get the password and check if its the right one
                if (password === localStorage.getItem("password")){
                    userLoggedIn = true;
                    mainMap.on('dblclick', onMapDblClick);
                    console.log("nice2c u again");
                    logUserProfile();
                    flowerArray[flowerArray.length-1].setOptionButtons();
                } else {
                    userLoggedIn = false;
                    console.log("try again");
                }
    };

    let passwordKey= "password";
    let passwordValue= "";

    function addPassword (password) {

        passwordValue = password;
        localStorage.setItem(passwordKey,passwordValue);
        //add to local storage
    };

    loginButton.addEventListener("click", function(){
        let userInputPassword = document.getElementById("password").value;
        verifyPassword(userInputPassword);
    });

    setPasswordButton.addEventListener("click", function(){
        let userInputPassword = document.getElementById("password").value;
        console.log("password inputed: "+userInputPassword);
        addPassword(userInputPassword);
    });

    //The user if set, and the ID dialog box closes :
    function logUserProfile(){
        // console.log(userLoggedIn);
        $("#identificationBoxDialog").dialog('close');
        console.log("You are logged as: "+localStorage.getItem("username"));
        console.log("and your pw is: "+localStorage.getItem("password"));
    }

    //end local storage setup

    function assignUsernameTemporary(){
        //temporary function where the connected user is filled in the fill form, although it has to be changed for something more solid
        document.getElementById("usernameInputField").value = currentUser;
        if (userLoggedIn=false){
            //eventually when ppl that are not logged in can also plant seeds, this option will work
        document.getElementById("usernameInputField").value = "passerby";
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
    // requestAnimationFrame(loop);

//end SETUPS  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 


           //DIALOG POP-UP BOXES SETTING ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀  ❀ 

//login box
              //id dialog box : 
              //??doesn't create at timeout, but used to work
              setTimeout(() => {
                console.log("about to open ID dialogBox")
                $("#identificationBoxDialog").dialog('open');
              }, "1800")

              $( "#identificationBoxDialog" ).dialog({

                position: { my: "right top", at: "right top", of: window },
                classes: {
                    "ui-dialog": "identificationBox"
                }
              });

            //   $("#identificationBoxDialog").dialog('close');
              $( "#identificationBoxDialog" ).dialog({

                dialogClass: "identificationBox",
                buttons: [
                  {
                    text: "Close",
                    click: function() {
                      $( this ).dialog( "close" );
                    }
                  }
                ]
              });

    
//END FILL FORM


//?? do we still need this box
    $.getJSON('Instructions.json',function(data) {
            // showJournal(data);
            showFlowerData(data);


        talkButton.addEventListener("click", function(){
            flowerArray[selectedFlower].journal.openJournal();
            //activate flowerArray : blossom();
        });

        //submit at seed fill form
        submitButton.addEventListener("click", function(){
            //displays the users total flower array length :
            userSeedCount.innerHTML= flowerArray.length;
       //displays the grand total flower array length :
           //!!to-do)

        });


        waterButton.addEventListener("click", function(){
            //increments the waterDaily level count
        flowerArray[selectedFlower].energy.waterDailyLevel++;
        if (flowerArray[selectedFlower].energy.waterDailyLevel ===3){
            document.getElementById("flowerThoughts-container").innerHTML= "Enough water for today, thank u!!"
        }
        //thoughts associated with the water level
        if (flowerArray[selectedFlower].energy.waterDailyLevel ===7){
            document.getElementById("flowerThoughts-container").innerHTML= "Omg i'm gonna drown please stop"
        }

        //prints the waterDaily level
            for (let i=0; i<flowerArray[selectedFlower].energy.waterDailyLevel;i++){
                //resets it?
                document.getElementById('waterHeartLevelBox').innerHTML ="";
                //goes thru the water level icon visuals
                document.getElementById('waterHeartLevelBox').innerHTML += flowerArray[selectedFlower].energy.waterLevelArray[i];
                //!! switch to call from energy class

            }

        });

        loveButton.addEventListener("click", function(){
            flowerArray[flowerArray.length-1].loveDailyLevel++;
                            //!! switch to call from energy class

            loveSound.play();
                setTimeout(() => {
                    document.getElementById("flowerThoughts-container").innerHTML= "I love U too!!"
                  }, "100");
        });


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

        // generateButton.addEventListener("click", function(){

        //     for (let i=0;i<flowerArray.length;i++){
        //         flowerArray[i].generate();
        //     }
        // });



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
//imprime les infos en bas à gauche ??peut-êre que je vais devoir le delete
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
                    //creating an individual flower object, passing its data thru newFlower and pushing it to the flower array :
                    let newFlower = new Flower(e.containerPoint.x, e.containerPoint.y,coordinateMarker ,mainMap ,flowerArray.length,chimeSound);
                    inputForm.openInputForm(newFlower);
                    flowerArray.push(newFlower);
                    userSeedCount.innerHTML= flowerArray.length;

                // idDataContainer.value = flowerArray[flowerArray.length-1].flowerId;

                currentFlowerContainer.innerHTML="<"+idDataContainer.value+"> <br>";
            } else {
                document.getElementById("message").innerHTML = "Limit exceeded, try again in 24 hours."

                //User can plant in 24 hours :
                setTimeout(() => {
                    counter=0;
                }, "86400000")

            }
                    //create an array for dropdown menu to add dynamically a flower to the list 
                // let x= flowerArray[flowerArray.length-1].flowerId;
                // currentFlower.push(x);
                // console.log(currentFlower);
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

    // ??set up for fractal tree (temporary)
    // object.addEventListener("click", function (){
    //     console.log("click for fractal generation");
    // });


    function printIcon(){
        for (let i = 0; i < 1; i++) {
            document.getElementById('waterHeartLevelBox').innerHTML += flowerArray[i].waterLevelArray[i];
                            //!! switch to call from energy class

        }
        // for (let i = 0; i < flowerArray[flowerArray.length-1].loveDailyLevel; i++) {
        //     document.getElementById('vitaminsHeartLevelBox').innerHTML += vitaminsHeartLevelBoxArray[i];
        // }
    }

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

},

error:function(){
console.log("error occurred");
}
});
        }); //end of windowOnLoad / document.ready