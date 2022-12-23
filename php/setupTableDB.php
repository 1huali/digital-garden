<?php 
      
      require('openDB.php');
      
    //DATA BASE AND OPEN CONNECTIONS
        //2. create table
        try
      {

        $file_db->exec("PRAGMA foreign_keys = on"); //by default, foreign key are not enabled so here, it sets it on

// sets the 1st table 
        $theQuery = "CREATE TABLE flowerObjects (flowerID INTEGER PRIMARY KEY NOT NULL, creationDate TEXT, user TEXT, motivation TEXT, hideUser TEXT, growthLength TEXT, manualGrowth TEXT, pattern TEXT, fruit TEXT, color TEXT, xPosition TEXT, yPosition TEXT, journalFile TEXT, growthCompleted TEXT, userVisits TEXT, email TEXT, careList TEXT, magicUnlocked TEXT, pollen TEXT, other TEXT)";
        $file_db ->exec($theQuery);
        echo ("Table flowerObjects created successfully<br>");
        $file_db = null;

// sets the 2nd table


      }
       
      catch(PDOException $e) 
      {
          // Print PDOException message
          echo $e->getMessage();
      }

      
?>