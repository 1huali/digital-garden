<?php
//check if there has been something posted to the server to be processed
if($_SERVER['REQUEST_METHOD'] == 'POST')
{

  require('openDB.php');

   try {
      // need to process
      // could have different types of queries
      
      $querySelect='SELECT * FROM flowerObjects';
      $result = $file_db->query($querySelect);
      if (!$result) die("Cannot execute query.");
      
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