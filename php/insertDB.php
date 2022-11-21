<?php
require('openDB.php');

//check if there has been something posted to the server to be processed
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
// need to process
 $id = $_POST['a_identification'];
 $motivation = $_POST['a_motivation'];
 $by = $_POST['a_user'];
 $growthLength = $_POST['a_length'];
 $displayUser = $_POST['show_hidden'];
 $pattern = $_POST['a_pattern'];
 $fruit = $_POST['a_fruit'];
 $color = $_POST['a_color'];
 $location = $_POST['a_location'];
 $timeStamp = $_POST['a_timeStamp'];


    try{
        /*The data stringified (ajax) and quote() for driver (PDO). */
           $id =$file_db->quote($id);
           $motivation = $file_db->quote($motivation);
           $user =$file_db->quote($by);
           $growthLength =$file_db->quote($GrowthLength);
           $displayUser =$file_db->quote($displayUser);
           $pattern =$file_db->quote($pattern);
           $fruit =$file_db->quote($fruit);
           $color =$file_db->quote($color);
           $location =$file_db->quote($location);
           $timeStamp =$file_db->quote($timeStamp);
           $completedState=$file_db->quote("false");


           $queryInsert = "INSERT INTO flowerObjects (creationDate, user, enableDisplay, growthLength, enableAutonomous, pattern, lattitude, longitude, diaryFile, completedState, energyLevels) VALUES ($id,'test', 'test','test','test','test','test','test','test','test','test')";
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