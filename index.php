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
    <script src="js/ButtonList.js" ></script>
    <script src="js/DraggableBox.js" ></script>
    <script src="js/InputForm.js"></script>
    <script src="js/libraries/jquery-ui.js"></script> 
    <script src="https://kit.fontawesome.com/82ea518a78.js" crossorigin="anonymous"></script>
   
    <script src="js/script.js"></script>
    <script src="js/branch.js"></script>

  </head>
  <body>
  <div id="mapBox">
<div class="map" id="mainMap"></div>
</div> 
  <section id="gardenInfoHeader">
<h1 id="title">THE DIGITAL GARDEN</h1>
<div id="about-container">
<!-- <article>This is a space to plant and seed personal objectives.</article>
<article> Login or identify to plant or access your flowers. </article>  -->
</div>
<div id="messageContainer">
<div id="messageBar"> Online : <marquee scrollamount="2" direction="left" width="200px"><i><span id="message">aaaaaa</span></i></marquee> </div>
 seeds: <span id="userFlowerIndex">0</span>/ <span id="totalFlowerIndex">0</span>
</section>
</div>
<!-- Fill form to create a personalized flower -->
    <!-- <section id="seedIdPopUpForm-container" class="seedFillForm-dialog" title="Plant A Seed"> -->
    <div id="seedBoxDialogDiv" ref-class="mydivseed" class="mydiv">
      <div class="mydivheader mydivseedheader">Plant a Seed</div>
    <div id="plantSeed-container">
      <form id="insertFlower" action="" enctype ="multipart/form-data">
      <fieldset>
        <p><label>Flower ID </label><input id="idData" class="seedInput" type="text" size="35" maxlength = "40" name = "flower_identification" required> </p>
        <p><label>Reason </label><input class="seedInput" type = "text" size="24" maxlength = "60"  name = "a_motivation" required>
        <!-- <label>to exist </label><input type="checkbox" id="noReasonBox" value="Exist"> -->
      </p>
        <p><label>User </label><input class="seedInput" id="usernameInputField" type = "text" size="24" maxlength = "40"  name = "a_user" required></p>
        <p><label>Anonymous user </label>
        <input type="checkbox" id="hideUserOption" class="seedInput" name="hide_user" value="Yes">
       <label for="hideUser"> Yes</label>
       <p><label>Growth period </label>
       <input type="number" id="length1" class="seedInput" name="a_length" min="1" value="1"> min
       <p><label>Manual growth </label>
        <input type="checkbox" id="manualOption" class="seedInput" name="manual_growth" value="Yes">
       <label for="manual_growth">Activate </label>
       <p><label for="pattern">Pattern </label>
       <select id="pattern" class="seedInput" name="a_pattern">
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
       <p><label>Color</label><input type="color" class="seedInput" id="favcolor" name="a_color" value="#ffbfe0"></p>
       <p><label>Location:</label><input id="locationData" class="seedInput" type = "text" size="30" maxlength = "40"></p>
       <input id="submitButton" class="seedInput" type="submit" value="Submit">
       <input id="cancelSeedButton" class="seedInput" type="button" value="Cancel">
      </fieldset>
    </form>
    </div>  
</div>
      <!-- </section> -->

    <!-- <div id="mapBox">
<div class="map" id="mainMap"></div>
</div>  -->

<!-- TEST FOR L-SYSTEM - useless -->
<!-- <input type="button" id="generateButton" value="Generate"> -->
<!-- <section id="lSysTestZone">
<div id="lSystem"></div>
 </section> -->

  <section id="userBoard-container"> 
  <h2>USER BOARD</h2>
 <article> User : <span id="currentUserId">&#60;<i>null</i>&#62;</span></article>
 <article class="x"> 
 <div id="flowerStatistic-buttons">
<article> <input id="waterButton" class="dataButtons" type="button" value="Water">Water: <span id="waterHeartLevelBox"> n/a  </span></article>
<article> <input id="loveButton" class="dataButtons" type="button" value="Love"> xPos: <span id="xPosBox"> n/a  </span></article>
<article> <input id="talkButton" class="dataButtons" type="button" value="Talk"> yPos: <span id="yPosBox"> n/a  </span></article>
<!-- <article> Thoughts: <span id="flowerThoughts-container"> </span></article> -->
</div>
 </article>
 <article>
 current flower : <span id="demo">none</span>
<label id="drpListFlower" for="flowerDropDownList"></label>
<select id="flowerList-select">
    <option value="none">none</option>
  </select></article>
 
</section> 

<!-- DIALOG BOX -->

<div id="talkBoxDiv" ref-class="mydivtalk" class="mydiv">
    <div class="mydivheader mydivtalkheader">Genetic Memory</div>
    <div id="archive-container">
    </div>    
    <div id="journal-container">
      <input id="journalTextContainer" type="text" placeholder="What is on your mind?">
      <article> <input id="sendThoughtButton" class="buttons" type="button" value="Send"> </article>
    </div>
      <input id="closeDialogButton" class="buttons" type="button" value="Close">
</div> 


<div id="identificationBoxDialog" ref-class="mydivid" class="mydiv">
    <div class="mydivheader mydividheader">User Login</div>
<article>Login to access personal data.
</article>
<div id="login-container">username: <input id="login" type="text" required></div>
<input id="identifyButton" class="buttons" type="button" value="Identify">

<article>
<div id="password-container">password:<input id="password" type="text" required></div>
      <input id="loginButton" class="buttons" type="button" value="Login">
      <input class="buttons" id="setPasswordButton" type="button" value="Save">
</article>
  </div> 

  <div id="consoleBoxDialogDiv" ref-class="mydivconsole" class="mydiv">
    <div class="mydivheader mydivconsoleheader">User Console</div>
    <div id="console-container">
    <article id="consoleHeader">&#62; Console ready. </article>
    <article>Welcome to the digital garden!</article>
    <article>This is a space to plant and seed personal objectives.</article>
    <article>&#62; Drag to explore the space.</article>
    <article>&#62; Login to plant or access your flowers. </article> 
    </div>   
</div>
  </body>
</html>
