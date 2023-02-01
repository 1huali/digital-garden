<?php 
      
      require('openDB.php');
      
    //DATA BASE AND OPEN CONNECTIONS
        //2. create table
        try
      {

        $file_db->exec("PRAGMA foreign_keys = on"); //by default, foreign key are not enabled so here, it sets it on

// sets the 1st table 
        // $theQuery = "CREATE TABLE flowerObjects (flowerID INTEGER PRIMARY KEY NOT NULL, creationDate TEXT, user TEXT, motivation TEXT, hideUser TEXT, growthLength TEXT, manualGrowth TEXT, pattern TEXT, fruit TEXT, color TEXT, xPosition TEXT, yPosition TEXT, growthCompleted TEXT, userVisits TEXT, email TEXT, careList TEXT, magicUnlocked TEXT, pollen TEXT, other TEXT)";
        // $file_db ->exec($theQuery);
        // echo ("Table flowerObjects created successfully<br>");
        // $file_db = null;

// sets the 2nd table
// specify that it is a foreign key AND specify where it comes from (LINK) at "FOREIGN KEY (uID) REFERENCES users(userID)"
$theQueryT = 'CREATE TABLE IF NOT EXISTS flowerJournal_TWO (journalID INTEGER PRIMARY KEY NOT NULL, journalFile TEXT, msg TEXT, msgDate TEXT, user TEXT, growthStage TEXT, growthCompleted TEXT, fID INTEGER, FOREIGN KEY (fID) REFERENCES flowerObjects(flowerID))';
$file_db ->exec($theQueryT);
echo("created flowerJournal_TWO table successfully<br>");
  // Close file db connection (only once)
   $file_db = null;

      }
       
      catch(PDOException $e) 
      {
          // Print PDOException message
          echo $e->getMessage();
      }

      
?>