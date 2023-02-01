<?php
require('openDB.php');

// $queryInsert = "INSERT INTO flowerObjects (creationDate, user, enableDisplay, growthLength, enableAutonomous, pattern, lattitude, longitude, completedState, energyLevels) VALUES ('test','test', 'test','test','test','test','test','test','test','test','test')";
// $file_db->exec($queryInsert);
// $file_db = null;
// echo("done");
// exit;

//check if there has been something posted to the server to be processed
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
  try{
// stringify the data : 
 $flowerId = $_POST['flower_identification'];
 $growthCompleted = $_POST['completed_state'];
  // $journalId = $_POST['journal_identification'];
  // $journalFile = $_POST['journal_file'];
  $msg = $_POST['msg'];
  $msgDate = $_POST['msg_date'];
  $user = $_POST['user'];
  $growthStage = $_POST['growthStage'];



        /*The data stringified (ajax) his put into quote() for driver (sqlite library for php PDO). */
        $flowerId =$file_db->quote($flowerId);
        $growthCompleted=$file_db->quote($growthCompleted);
        // $journalId=$file_db->quote("null"); //created automatically in the DB
        $journalFile=$file_db->quote("null");
        $msg=$file_db->quote($msg);
        $msgDate=$file_db->quote($msgDate);
        $user =$file_db->quote($user);
        $growthStage=$file_db->quote($growthStage);


           $queryInsert = "INSERT INTO flowerJournal_TWO (journalFile, msg, msgDate, user, growthStage, growthCompleted, fID) VALUES ($journalFile,$msg, $msgDate, $user, $growthCompleted, $growthStage, $flowerId)";
           $file_db->exec($queryInsert);
           $file_db = null;
           echo("done");
           exit;
         }
         catch(PDOException $e) {
             // Print PDOException message
             echo $e->getMessage();
           }

    exit;

}//POST
?>