<?php
require('openDB.php');

//temporary view of result
//?? doesnt work
try {

    $sql_select='SELECT * FROM flowerObjects';
    // the result set
    $result = $file_db->query($sql_select);
    if (!$result) die("Cannot execute query.");
// var_dump($result->fetch(PDO::FETCH_ASSOC));
//
    echo "<h3> Query Results:::</h3>";
echo"<div id='back'>";
// get a row...
while($row = $result->fetch(PDO::FETCH_ASSOC))
{
   echo "<div class ='outer'>";
   echo "<div class ='content'>";
   // go through each column in this row
   // retrieve key entry pairs
   foreach ($row as $key=>$entry)
   {
     //if the column name is not 'image'
      if($key!="image")
      {
        // echo the key and entry
          echo "<p>".$key." :: ".$entry."</p>";
      }
   }
}//end while
echo"</div>";
}

catch(PDOException $e) {
    // Print PDOException message
    echo $e->getMessage();
  }
 
?>