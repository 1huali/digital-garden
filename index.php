<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0>

    <title>DIGITAL GARDEN (PROTOTYPE_02)</title>
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
    <script src="js/libraries/p5.min.js"></script>   
    <script src="js/Flower.js"></script> 
    <script src="js/libraries/jquery-ui.js"></script> 
  </head>
  <body>

<!-- Fill form to create a personalized flower -->
    <div id="seedIdPopUpFormContainer">
      <h3> Plant A Seed</h3>
      <form id="insertFlower" action="" enctype ="multipart/form-data">
      <fieldset>
        <p><label>Identification:</label><input id="idData" type="text" size="35" maxlength = "40" name = "a_identification" required> </p>
        <p><label>Motivation:</label><input type = "text" size="24" maxlength = "60"  name = "a_motivation" required></p>
        <p><label>User:</label><input type = "text" size="24" maxlength = "40"  name = "a_user" required></p>
        <p><label>Hide User:</label>
        <input type="checkbox" id="hideUserOption" name="show_hide" value="Yes">
       <label for="vehicle1"> Yes</label>

       <p><label>Growth period:</label>
        <!-- <input type = "checkbox" size="24" maxlength = "40"  name = "a_lenght" required></p> -->
       <input type="checkbox" id="length1" name="a_length" value="1">
       <label for="vehicle1"> 1 min</label>
       <input type="checkbox" id="length2" name="a_length" value="10">
       <label for="vehicle2"> 10 min</label>
       <input type="checkbox" id="length3" name="a_length" value="1440">
       <label for="vehicle3"> 1 day</label>
       <p><label>Autonomous growth:</label>
        <input type="checkbox" id="autonomousOption" name="autonomous_manual" value="Yes">
       <label for="vehicle1">Activate</label>

       <p><label for="pattern">Pattern:</label>
       <select id="pattern" name="a_pattern">
    <option value="pattern" name="a_pattern">Axiom F</option>
    </select></p>
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
<input type="button" id="generateButton" value="Generate">
</section>
<section id="lSysTestZone">
<div id="lSystem"></div>

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
