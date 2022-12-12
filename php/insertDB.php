<?php
require('openDB.php');

// $queryInsert = "INSERT INTO flowerObjects (creationDate, user, enableDisplay, growthLength, enableAutonomous, pattern, lattitude, longitude, diaryFile, completedState, energyLevels) VALUES ('test','test', 'test','test','test','test','test','test','test','test','test')";
// $file_db->exec($queryInsert);
// $file_db = null;
// echo("done");
// exit;

//check if there has been something posted to the server to be processed
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
// stringify the data : 
 $flowerId = $_POST['flower_identification'];
 $timeStamp = $_POST['a_timeStamp'];
 $user = $_POST['a_user'];
 $motivation = $_POST['a_motivation'];
 $hideUser = $_POST['hide_user'];
 $growthLength = $_POST['a_length'];
 $manualGrowth = $_POST['manual_growth'];
 $pattern = $_POST['a_pattern'];
 $fruit = $_POST['a_fruit'];
 $color = $_POST['a_color'];
 $xPosition = $_POST['x_pos'];
 $yPosition = $_POST['y_pos'];
 $diaryFile = $_POST['diary_file'];
 $completedState = $_POST['completed_state'];
 $energyLevels = $_POST['energy_levels'];
 $email = $_POST['email'];
 $careList = $_POST['care_list'];
 $magicUnlocked = $_POST['magic_unlocked'];
 $pollen = $_POST['pollen'];
 $other = $_POST['other'];

    try{
        /*The data stringified (ajax) his put into quote() for driver (sqlite library for php PDO). */
           $flowerId =$file_db->quote($flowerId);
           $timeStamp =$file_db->quote($timeStamp);
           $user =$file_db->quote($user);
           $motivation = $file_db->quote($motivation);
           $hideUser =$file_db->quote($hideUser);
           $growthLength =$file_db->quote($growthLength);
           $manualGrowth = $file_db->quote($manualGrowth);
           $pattern =$file_db->quote($pattern);
           $fruit =$file_db->quote($fruit);
           $color =$file_db->quote($color);
           $xPosition =$file_db->quote($xPosition);
           $yPosition =$file_db->quote($yPosition);
           $diaryFile =$file_db->quote($diaryFile);
           $completedState=$file_db->quote("false");
           $energyLevels=$file_db->quote("null"); //!!
           $email=$file_db->quote("null");
           $careList=$careList->quote("null");
           $magicUnlocked=$magicUnlocked->quote("false");
           $pollen=$pollen->quote('false');
           $other=$other->quote("null");


           $queryInsert = "INSERT INTO flowerObjects (creationDate, user, motivation, hideUser, growthLength, manualGrowth, pattern, fruit, color, xPosition, yPosition, diaryFile, completedState, energyLevels, email, careList, magicUnlocked, pollen, other) VALUES ($timeStamp,$user,$motivation,$hideUser, $growthLength,$manualGrowth,$fruit,$color,$xPosition,$yPosition,$diaryFile,$completedState,$energyLevels,$email,$careList,$magicUnlocked,$pollen,$other)";
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