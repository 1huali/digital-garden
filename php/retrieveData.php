<?php
//check if there has been something posted to the server to be processed
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
 
  require('openDB.php');
   try {
      // need to process
      // could have different types of queries
      $criteria = $_POST['a_crit'];
      if($criteria == "ALL")
      {
      $querySelect='SELECT * FROM animalCollection';
      $result = $file_db->query($querySelect);
      if (!$result) die("Cannot execute query.");
      }
    // get a row...
    // MAKE AN ARRAY::
    $res = array();
    $i=0;
    while($row = $result->fetch(PDO::FETCH_ASSOC))
    {
      // note the result from SQL is ALREADy ASSOCIATIVE
      $res[$i] = $row;
      $i++;
    }//end while
    // endcode the resulting array as JSON
    $myJSONObj = json_encode($res);
    echo $myJSONObj;
 
  } //end try
     catch(PDOException $e) {
       // Print PDOException message
       echo $e->getMessage();
 
     }
      exit;
}//POST
?>
 
<!DOCTYPE html>
<html>
<head>
<title>Sample Retrieval USING JQUERY AND AJAX </title>
<!-- get JQUERY -->
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<!--set some style properties::: -->
<link rel="stylesheet" type="text/css" href="css/galleryStyle.css">
</head>
<body>
<div class= "formContainer">
<!--form done using more current tags... -->
<form id="retrieveFromGallery" action="">
<!-- group the related elements in a form -->
<h3> RETRIEVE STUFF :::</h3>
<fieldset>
<p><label>Criteria:</label><input type = "text" size="10" maxlength = "15"  name = "a_crit" value = "ALL" required></p>
<p class = "sub"><input type = "submit" name = "submit" value = "get Results" id ="buttonS" /></p>
 </fieldset>
</form>
</div>
<!-- NEW for the result -->
<div id = "back"></div>
<script>
$(document).ready (function(){
    $("#retrieveFromGallery").submit(function(event) {
       //stop submit the form, we will post it manually. PREVENT THE DEFAULT behaviour ...
    event.preventDefault();
     console.log("button clicked");
     let form = $('#retrieveFromGallery')[0];
     let data = new FormData(form);
     $.ajax({
            type: "POST",
            enctype: 'text/plain',
            url: "retrieveGalleryAJAX.php",
            data: data,
            processData: false,//prevents from converting into a query string
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (response) {
            console.log(response);
            //use the JSON .parse function to convert the JSON string into a Javascript object
            let parsedJSON = JSON.parse(response);
            console.log(parsedJSON);
            displayResponse(parsedJSON);
           },
           error:function(){
          console.log("error occurred");
        }
      });
   });
 
   // validate and process form here
    function displayResponse(theResult){
      // theResult is AN ARRAY of objects ...
      for(let i=0; i< theResult.length; i++)
      {
      // get the next object
      let currentObject = theResult[i];
      let container = $('<div>').addClass("outer");
      let contentContainer = $('<div>').addClass("content");
      // go through each property in the current object ....
      for (let property in currentObject) {
        if(property ==="image"){
          let img = $("<img>");
          $(img).attr('src',currentObject[property]);
 
          $(img).appendTo(contentContainer);
        }
        else{
          let para = $('<p>');
          $(para).text(property+"::" +currentObject[property]);
            $(para).appendTo(contentContainer);
        }
 
      }
      $(contentContainer).appendTo(container);
      $(container).appendTo("#back");
    }
  }
 
});
</script>
</body>
</html>