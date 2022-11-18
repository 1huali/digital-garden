<?php
//check if there has been something posted to the server to be processed
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
// need to process
 $id = $_POST['a_identification'];
 $by = $_POST['a_gardener'];
 $loc = $_POST['a_location'];
 $GrowthLength = $_POST['a_length'];
 $bloomTime = $_POST['a_bloom'];
 $color = $_POST['a_color'];
 $about = $_POST['about'];

 //writes the data to a file 
    //given that the file is opened for writing (w) or appending (a).
    $theFile = fopen("digital flower-encyclopedia.txt", "a") or die("Unable to open file!");

    fwrite($theFile, "ID:".$identification."\n");
    fwrite($theFile, "Gardener:".$by."\n");
    fwrite($theFile,  "Location:".$loc."\n");
    fwrite($theFile,  "Cycle Length:".$GrowthLength."\n");
    fwrite($theFile,  "Bloom Time:".$bloomTime."\n");
    fwrite($theFile,  "Color:".$color."\n");
    fwrite($theFile,  "About:".$about."\n");

    //dont forget to close it cos then it will just be blank
    fclose($theFile);
    echo("WE HAVE SUCCESSFULLY read the vars AND saved to the file ... ");


exit;
}//POST
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0>

    <title>DIGITAL GARDEN (PROTOTYPE_01)</title>
    <audio controls hidden id="chimeSound">
      <source src="assets/sounds/dust-chime.mp3" type="audio/mpeg">
      </audio>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.2/dist/leaflet.css"
      integrity="sha256-sA+zWATbFveLLNqWO2gtiw3HL/lh1giY/Inf1BJ0z14="
      crossorigin=""/> 
    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="css/style.css" />

      <!-- Leaflet Javascript file -->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
      <script src="https://unpkg.com/leaflet@1.9.2/dist/leaflet.js"
      integrity="sha256-o9N1jGDZrf5tS+Ft4gbIK7mYMipq9lqpVJ91xHSyKhg="crossorigin=""></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script> 
    <script src="Flower.js"></script> 
    <script src="js/libraries/jquery-ui.js"></script> 
  </head>
  <body>

<!-- Fill form to create a personalized flower -->
    <div id="seedIdPopUpFormContainer">
      <h3> Plant A Seed</h3>
      <form id="insertFlower" action="" enctype ="multipart/form-data">
      <fieldset>
        <p><label>Identification:</label><input id="idData" type="text" size="35" maxlength = "40" name = "a_identification" required> </p>
        <p><label>Motivation:</label><input type = "text" size="24" maxlength = "60"  name = "a_about" required></p>
        <p><label>by (optional):</label><input type = "text" size="24" maxlength = "40"  name = "a_gardener" required></p>
       <p><label>Growth period:</label>
        <!-- <input type = "checkbox" size="24" maxlength = "40"  name = "a_lenght" required></p> -->
       <input type="checkbox" id="length1" name="a_length" value="10mins">
       <label for="vehicle1"> 10 min</label>
       <input type="checkbox" id="length2" name="a_length" value="24hrs">
       <label for="vehicle2"> 1 day</label>
       <input type="checkbox" id="length3" name="a_length" value="168hrs">
       <label for="vehicle3"> 1 week</label>
       <p><label for="fruit">Fruit:</label>
  <select id="fruit" name="a_fruit">
    <option value="ascii3">☆</option>
    <option value="ascii2">♥</option>
    <option value="ascii1">¥</option>
    <option value="ascii0" selected>✿</option>
    <option value="other">Other</option>
    <!-- if other : allow typing -->
  </select></p>
       <p><label>Color</label><input type="color" id="favcolor" name="a_color" value="#ff0000"></p>
       <p><label>Location:</label><input id="locationData" type = "text" size="30" maxlength = "40"  name = "a_location" required></p>
       <p><label>Bloom Time:
       <input type="checkbox" id="length1" name="a_bloom" value="8am">
       <label for="vehicle1"> Day Time</label>
       <input type="checkbox" id="length2" name="a_bloom" value="4pm">
       <label for="vehicle2"> Blue Hour</label>
       <input type="checkbox" id="length3" name="a_bloom" value="10pm">
       <label for="vehicle3"> Dark Time</label>
      </p>
       <input id="submitButton" type="submit" value="Submit">
       <input id="cancelFlowerFormButton" type="button" value="Cancel">
      </fieldset>
    </form>
      </div>

    <div id="mapBox">
<div class="map" id="mainMap"></div>
</div> 

<section id="flowerData-container">
<section id="flowerMaintenanceButtons">
<div id="currentFlower"> &#60;<i>no flower selected</i>&#62;</div> 
<input id="waterButton" class="optionButtons" type="button" value="Water">   Water: <span id="waterHeartLevelBox"> ?♥ ♥ ♥ ♥ ♥  </span><br>
<input id="fertilizerButton" class="optionButtons" type="button" value="Fertilize"> Vitamins: <span id="vitaminsHeartLevelBox"> ?♥ ♥ ♥ ♥ ♥  </span><br>
<input id="talkButton" class="optionButtons" type="button" value="Talk"><br>
</section>
</section>

 <!-- <section id="playModeData-container">
  related to the json file ; kinda inactive atm but i'm keeping the placeholder if ever
 </section> -->

 <div id="talkBoxDialog" title="Genetic Memory">
    <div id="archive-container">
    </div>    
    <div id="diary-container">
      <input id="diaryTextContainer" type="text" placeholder="What is on your mind?">
      <input id="saveButton" class="optionButtons" type="button" value="Send"> <br>
      <input id="closeDialogButton" type="button" value="Done">
    </div>
</div>

<div id="titleBar">
<h2 id="title">THE DIGITAL GARDEN</h2>
<section id="userDataContainer">
<div id="messageBar"> msg : <span id="message">Sit down and reflect as you need</span></div>

user: <span id="currentUser">hello</span><br>
<div id="password-container">password:<input id="password" type="text"></div>
      <input id="identifyButton" class="optionButtons" type="button" value="Identify">
      <input id="loginButton" type="button" value="Login">
      <input id="setPasswordButton" type="button" value="Save">
      <br>
      <input id="flowerListButton" class="optionButtons" type="button" value="Flower"> seeds: <span id="userFlowerIndex">0</span>/ <span id="totalFlowerIndex">0</span>
</section>
</div>

<section id="idBoxDialog" title="Authentification">

</section>

    <!-- My script(s) -->
    <script src="js/script.js"></script>
  </body>

</html>