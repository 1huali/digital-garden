/**
Digital Garden
Wawa Li
Prototype with only placeholders
14 novembre 2022
*/

"use strict";
function setup() {
    console.log("hello stup")

  }

$(document).ready(function(){
    // localStorage.clear();

    let flowerListButton = document.getElementById('flowerListButton');
    let modeButton = document.getElementById('modeButton');
    // let playMode = ["mainMode", "processMode"];
    let currentPlayMode= "mainMode";
    let editMode = true;
    let waterButton = document.getElementById("waterButton");
    let vitaminsButton = document.getElementById("fertilizerButton");
    let talkButton = document.getElementById('talkButton');

   // We create a leaflet map, and in setView, we determine coordinates and zoom level
    let mainMap = L.map('mainMap').setView([45.50884, -73.58781], 5);
    let coordinateMarker = L.marker();
    $(".leaflet-control-zoom").css("visibility", "hidden");
    mainMap.touchZoom.disable();
    mainMap.doubleClickZoom.disable();
    mainMap.scrollWheelZoom.disable();

    let locationDataContainer = document.getElementById('locationData');

//setup function kinda
    let section = $('section');
    let seedIdPopUpForm = document.getElementsByClassName("seedIdPopUpFormContainer");
    // when the map is double clicked, go through the onMapDblClick function
    mainMap.on('dblclick', onMapDblClick);

    let flowerArray=[];
    let currentFlowerContainer = document.getElementById("currentFlower");
    let currentFlower;
    let flowerArrayIndex=0;
    let idDataContainer = document.getElementById('idData');
    //get flower.flowerEl name printed in the container
    let idData; 

    let myFlowerArray=[];

    let doneButton = document.getElementById("doneDiaryButton");
    let submitButton = document.getElementById("submitButton");
    let flowerGenerated= false;

    document.getElementById('waterHeartLevelBox').innerHTML = " ♥ ♥ ♥ ♥ ♥  ";
    document.getElementById('vitaminsHeartLevelBox').innerHTML = " ♥ ♥ ♥ ♥ ♥  ";
    let waterLevel = 5;

    let waterHeartLevelBoxArray=[" ♥"," ♥"," ♥"," ♥"," ♥"];
    let vitaminsLevel = 5;
    let vitaminsHeartLevelBoxArray=[" ♥"," ♥"," ♥"," ♥"," ♥"];
    let levelIcon = " ♥ ";

    let archiveContainer = document.getElementById("archive-container");
    // let archiveButton = document.getElementById('showArchiveButton');
    // let closeArchiveButton = document.getElementById("closeArchiveButton");
    //!! WILL NEED A CLOSE BUTTON TO SHUT THE CHAT BOX 
    let saveThoughtButton = document.getElementById('saveButton');
    let thoughtCount = 0;
    let thoughts=[];
    let creationSound = document.getElementById("chimeSound");

    let identifyButton = document.getElementById("identifyButton");
    let visitorListArray= [];
    let username;
    let password;
    let currentUserBox = document.getElementById("currentUser");
    let loginButton = document.getElementById("loginButton");
    let setPasswordButton = document.getElementById("setPasswordButton");

    let userKey = "username";
    let userValue = "";
    //local storge set-up
    function saveUserLogin (username){
    // Create a local storage item (key value pair)
    //The localStorage property is read-only.
    //username : password and input fields
    userValue = username;

    // check if this key-val alreday exists
     if (localStorage[userKey]) {
    //   valToStore = password;
    currentUserBox.innerHTML = userValue;
    console.log("ask for password")
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
    };

    //if the user is recognized in the storage, verify the password
    function verifyPassword (password) {
console.log(localStorage.getItem("password"));
                //get the password and check if its the right one
                if (password === localStorage.getItem("password")){
                    console.log("nice2c u again");
                    setUserProfile();
                } else {

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
        console.log(userInputPassword);
        addPassword(userInputPassword);
    });

    function setUserProfile(){
        console.log("You are logged as "+localStorage.getItem("username"));
        console.log("and your pw is "+localStorage.getItem("password"));

    }
    //end local storage setup

    //L-SYSTEM
    let generateButton = document.getElementById('generateButton');
    
    generateButton.addEventListener("click", function(){
        console.log("gets into genBUtt")
        generateFlower();
    });
    
    function generateFlower(){
        for (let i=0;i < flowerArray.length; i++){
            flowerArray[i].generate();
        flowerArray[i].turtle();
        }
      }
    // end L-SYSTEM

    requestAnimationFrame(loop);
//end SETUPS


//creates a talkbox dialog
 $( "#talkBoxDialog" ).dialog({

                position: { my: "left top", at: "right bottom", of: window },
                classes: {
                    "ui-dialog": "talkBox"
                }

              });

//closes the talkbox dialog after creating it
              $("#talkBoxDialog").dialog('close');


    $.getJSON('Instructions.json',function(data) {
            showJournal(data);
            showFlowerData(data);


        talkButton.addEventListener("click", function(){
            $("#talkBoxDialog").dialog('open');
        });

        submitButton.addEventListener("click", function(){

            flowerArray[flowerArray.length-1].flowerGenerated = true;
            document.getElementById("seedIdPopUpFormContainer").style.display = "none";
            creationSound.play();

            currentFlower = flowerArray[flowerArray.length-1].flowerId;
            currentFlowerContainer.innerHTML= "&#60;"+currentFlower+"&#62;";
            document.getElementById("totalFlowerIndex").innerHTML=flowerArray.length;
            // idForm.reset(); to implement
        });

        document.getElementById("cancelFlowerFormButton").addEventListener("click", function (){
            document.getElementById("seedIdPopUpFormContainer").style.display = "none";
            //??double-click doesnt work anymore
        });

        //submission of php flower form :
            $("#insertFlower").submit(function(event) {
               //stop submit the form, we will post it manually. PREVENT THE DEFAULT behaviour ...
              event.preventDefault();
            //  console.log("insert triggered");

            //retrieve the infos into objet key/value pairs
             let form = $('#insertFlower')[0];
             let data = new FormData(form);
             /*console.log to inspect the data */
    
             for (let pair of data.entries()) {
    
            // console.log(pair[0]+ ', ' + pair[1]);
        }

        /*https://api.jquery.com/jQuery.ajax/*/
     $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "index.php",
        data: data,
        processData: false,//prevents from converting into a query string
        /*contentType option to false is used for multipart/form-data forms that pass files.
        When one sets the contentType option to false, it forces jQuery not to add a Content-Type header, otherwise, the boundary string will be missing from it.
        Also, when submitting files via multipart/form-data, one must leave the processData flag set to false, otherwise, jQuery will try to convert your FormData into a string, which will fail. */

        /*contentType: "application/x-www-form-urlencoded; charset=UTF-8", // this is the default value, so it's optional*/

        contentType: false, //contentType is the type of data you're sending,i.e.application/json; charset=utf-8
        cache: false,
        timeout: 600000,
        success: function (response) {
        //response is a STRING (not a JavaScript object -> so we need to convert)
        console.log("we had success!");
        console.log(response);
       },
       error:function(){
      console.log("error occurred");
    }
  });
           });

        waterButton.addEventListener("click", function(){
            console.log("water++");
            waterLevel = 5;
        });

        vitaminsButton.addEventListener("click", function(){
            console.log("vitamins++");
            vitaminsLevel = 5;

        });

        //thoughts are saved in an array and displayed with their date :
        saveThoughtButton.addEventListener('click', function(){
            let thoughtDate = thoughtDateData();
            console.log("saved to archive");
            thoughtCount += 1;
            let thought = document.getElementById("diaryTextContainer").value;
            thoughts.push(thought);
            let singleLineElement = $("<article>").addClass("single-archive-line").html(thought + ": on " + thoughtDate ).appendTo("#archive-container");
//??set to php
        });

        //current user identification : !!Add an association with flower
        identifyButton.addEventListener('click', function (){
            let visitor = prompt("Hello! Who r u?", "secret passerby");
            visitorListArray.push(visitor);
            saveUserLogin(visitor)

            if (visitor != null) {
                document.getElementById("message").innerHTML =
                "Hello " + visitor + " !! Thank U for passing by";
              }
        });


        function thoughtDateData(){
            //add hours if less than 24 hours?
            let date = new Date()
            let day = date.getDate();
            let month = date.getMonth()+1;
            let year = date.getFullYear();
            
            let fullDate = `${day}.${month}.${year}.`;
            return fullDate;
        }

//vitamins and waters ggoing down !!needs to be associated with the cycle length
        setInterval(waterUpdate, 30000);
        function waterUpdate() {
            waterLevel -= 1;
            printIcon();
        
            if (waterLevel <= 1) {
              waterLevel = 1;
            }
        };

        setInterval(vitaminsUpdate, 20000);
        function vitaminsUpdate() {
            vitaminsLevel -= 1;
            printIcon();
        if (vitaminsLevel <= 1) {
            vitaminsLevel = 1;
        }
    };

    //prints html hearts icons on the energy bar of each flower
function printIcon(){
    document.getElementById('waterHeartLevelBox').innerHTML = "" ;
    document.getElementById('vitaminsHeartLevelBox').innerHTML = "" ;


    for (let i = 0; i < waterLevel; i++) {
        document.getElementById('waterHeartLevelBox').innerHTML += waterHeartLevelBoxArray[i];
    }
    for (let i = 0; i < vitaminsLevel; i++) {
        document.getElementById('vitaminsHeartLevelBox').innerHTML += vitaminsHeartLevelBoxArray[i];
    }
}
        }) //getJson 

        .fail(function() {
            // built function in that will alert if error
                    console.log( "error" );
                });
              

//source : https://mathi330.github.io/cart351/Demo/demo.html
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 3, // you cannot zoom in more than 9, if set to 10, the map turns gray
        // doubleClickZoom: false, // this is just so when I double click on the map it doesn't zoom in
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="blank_">OpenStreetMap</a>' // link to where we got the data for the map
    }).addTo(mainMap); // add tile layer to map

    flowerListButton.addEventListener('click', function() {
        // pan between flower array 

            flowerArrayIndex++;
            if (flowerArray.length>0){
            if (flowerArrayIndex === flowerArray.length-1){
                // console.log("gets here");
                //!!! to fix
                flowerArrayIndex = 0;
                console.log("flowerArrayIndex");
        }
    }
        // if (flowerArray.length === 0){
        //     document.getElementById("message").innerHTML = "<no flowers registered>";
        // }
    });

                waterButton.addEventListener("click", function () {
                    // console.log("water ++");
                }); //end water button

                fertilizerButton.addEventListener("click", function () {
                    // console.log("vitamins ++");
                }); //end fertilizer button

                talkButton.addEventListener("click", function () {
                    // console.log("opens up to the diary typing section");
                }); //talk button fertilizer button


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

        //  let imageUrl = 'https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg';
        // let bounds= [[40.712216, -74.22655], [40.773941, -74.12544]];
        // let image = L.imageOverlay(imageUrl, bounds).addTo(mainMap);
        // mainMap.fitBounds(bounds);


            function showJournal(data){
                let playModeDataContainer = $("#playModeData-container");
                $(playModeDataContainer).empty();
              displaySingleInstruction(data,playModeDataContainer);

            };

            //Display a marker on map at user's double-click
            function onMapDblClick(e){

                if (flowerArray.length === 0){
                    
                    coordinateMarker // take the marker we have created earlier
                    .setLatLng(e.latlng) // set the coordinates of the marker to the coordinates of the mouse when it was double clicked
                    .addTo(mainMap); // add the marker to the map
                    locationDataContainer.value = e.latlng;
                    seedFillFormPopUp();
                    
                    flowerArray.push(new Flower(e.containerPoint.x, e.containerPoint.y,coordinateMarker ,mainMap ,flowerArray.length,creationSound));
                idDataContainer.value = flowerArray[flowerArray.length-1].flowerId;
                } else if (flowerArray[flowerArray.length-1].flowerGenerated === true){
                    
                    coordinateMarker // take the marker we have created earlier
                    .setLatLng(e.latlng) // set the coordinates of the marker to the coordinates of the mouse when it was double clicked
                    .addTo(mainMap); // add the marker to the map
                    locationDataContainer.value = e.latlng;
                    seedFillFormPopUp();
                    
                    flowerArray.push(new Flower(e.containerPoint.x, e.containerPoint.y,coordinateMarker ,mainMap ,flowerArray.length,creationSound));
                idDataContainer.value = flowerArray[flowerArray.length-1].flowerId;
                }
        }

            function loop(){

                for (let i=0; i < flowerArray.length; i++){

                    if (flowerArray[i].flowerGenerated === true){
                    flowerArray[i].displayFlower();
                   // flowerArray[i].grow();
                }
                


                }
                requestAnimationFrame(loop);
            }

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

    function seedFillFormPopUp(){
        document.getElementById("seedIdPopUpFormContainer").style.display = "block";
    }

        }); //end of windowOnLoad / document.ready