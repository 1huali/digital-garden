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
    <link rel="stylesheet" type="text/css" href="css/style.css"/>

      <!-- Leaflet Javascript file -->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
      <script src="https://unpkg.com/leaflet@1.9.2/dist/leaflet.js"
      integrity="sha256-o9N1jGDZrf5tS+Ft4gbIK7mYMipq9lqpVJ91xHSyKhg="crossorigin=""></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script> 
    <script src="js/libraries/p5.min.js"></script>   
    <script src="js/Flower.js"></script> 
    <script src="js/Fractals.js"></script> 
    <script src="js/AxiomF.js"></script> 
    <script src="js/Journal.js" ></script>
    <script src="js/Energy.js" ></script>
    <script src="js/Button.js" ></script>
    <script src="js/InputForm.js"></script>
    <script src="js/libraries/jquery-ui.js"></script> 
    <script src="https://kit.fontawesome.com/82ea518a78.js" crossorigin="anonymous"></script>
   
    <script src="js/script.js"></script>
    <script src="js/branch.js"></script>

  </head>
  <body>

  <section id="gardenInfoHeader">
<h1 id="title">THE DIGITAL GARDEN</h1>
<div id="about-container">
<article>This is a space to plant and seed personal objectives.</article>
<article> Login or identify to plant or access your flowers. </article> 
</div>
<div id="messageContainer">
<div id="messageBar"> Message : <marquee scrollamount="2" direction="left" width="200px"><i><span id="message">aaaaaa</span></i></marquee> </div>
</div>
 seeds: <span id="userFlowerIndex">0</span>/ <span id="totalFlowerIndex">0</span>
</section>

<!-- Fill form to create a personalized flower -->
    <section id="seedIdPopUpForm-container" class="seedFillForm-dialog" title="Plant A Seed">
      <form id="insertFlower" action="" enctype ="multipart/form-data">
      <fieldset>
        <p><label>Identification </label><input id="idData" type="text" size="35" maxlength = "40" name = "flower_identification" required> </p>
        <p><label>Motivation </label><input type = "text" size="24" maxlength = "60"  name = "a_motivation" required></p>
        <p><label>User </label><input id="usernameInputField" type = "text" size="24" maxlength = "40"  name = "a_user" required></p>
        <p><label>Hide User </label>
        <input type="checkbox" id="hideUserOption" name="hide_user" value="Yes">
       <label for="hideUser"> Yes</label>
       <p><label>Growth period </label>
       <input type="number" id="length1" name="a_length" min="1"> min
       <p><label>Manual growth </label>
        <input type="checkbox" id="manualOption" name="manual_growth" value="Yes">
       <label for="manual_growth">Activate </label>
       <p><label for="pattern">Pattern </label>
       <select id="pattern" name="a_pattern">
       <option value="fractals" name="a_pattern">Fractals</option>
    <option value="lsystemAxiomF" name="a_pattern">Axiom F</option>
    </select></p>
       <p><label for="fruit">Fruit </label>
  <select id="fruit" name="a_fruit">
    <option value="☆">☆</option>
    <option value="♥">♥</option>
    <option value="¥">¥</option>
    <option value="✿" selected>✿</option>
    <option value="other">Other</option>
    <!-- if other : allow typing -->
  </select></p>
       <p><label>Color</label><input type="color" id="favcolor" name="a_color" value="#ffbfe0"></p>
       <p><label>Location:</label><input id="locationData" type = "text" size="30" maxlength = "40"></p>
       <input id="submitButton" type="submit" value="Submit">
      </fieldset>
    </form>
      </section>

    <div id="mapBox">
<div class="map" id="mainMap"></div>
</div> 

<!-- TEST FOR L-SYSTEM - useless -->
<!-- <input type="button" id="generateButton" value="Generate"> -->
<!-- <section id="lSysTestZone">
<div id="lSystem"></div>
 </section> -->

  <section id="flowerData-container"> 
  <h2>CURRENT SESSION</h2>
 <article> hello <span id="currentUserId">&#60;<i>no user identified</i>&#62;</span></article>
 <article>
<label for="flowerDropDownList">Seeds : </label>
<select id="flowerList-select">
    <option value="none">none</option>
  </select></article>
  current flower : <span id="demo">none</span>

<div id="flowerStatistic-buttons">
<!-- <div id="currentFlowerContainer"> <h2> &#60;<i>no flower id</i>&#62;</h2></div>  -->
<article> <input id="waterButton" class="buttons" type="button" value="Water">Water: <span id="waterHeartLevelBox"> n/a  </span></article>
<article> <input id="loveButton" class="buttons" type="button" value="Love"> xPos: <span id="xPosBox"> n/a  </span></article>
<article> <input id="talkButton" class="buttons" type="button" value="Talk"> yPos: <span id="yPosBox"> n/a  </span></article>
<article> Thoughts: <span id="flowerThoughts-container"> </span></article>
</div>
</section> 

<!-- DIALOG BOX -->
 <section id="talkBoxDialog" title="Genetic Memory">
    <div id="archive-container">
    </div>    
    <div id="journal-container">
      <input id="journalTextContainer" type="text" placeholder="What is on your mind?">
      <article> <input id="sendThoughtButton" class="buttons" type="button" value="Send"> </article>
    </div>
</section>

<section id="identificationBoxDialog" title="User Identification">
<article>hello <span id="currentUser">&#60;<i>no user identified</i>&#62;</span></article>
<div id="login-container">login: <input id="login" type="text"></div><input id="identifyButton" class="buttons" type="button" value="Identify">

<article>
<div id="password-container">password:<input id="password" type="text"></div>
      <input id="loginButton" type="button" value="Login">
      <input id="setPasswordButton" type="button" value="Save">
      </article>
      <!-- <input id="closeDialogButton" type="button" value="Done"> -->
</section>
  </body>
</html>
