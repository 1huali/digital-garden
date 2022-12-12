<?php 
      
      require('openDB.php');
      
    //DATA BASE AND OPEN CONNECTIONS
        //2. create table
        try
      {
        $theQuery = "CREATE TABLE flowerObjects (flowerID INTEGER PRIMARY KEY NOT NULL, creationDate TEXT, user TEXT, motivation TEXT, hideUser TEXT, growthLength TEXT, manualGrowth TEXT, pattern TEXT, fruit TEXT, color TEXT, xPosition TEXT, yPosition TEXT, diaryFile TEXT, growthCompleted TEXT, energyLevels TEXT, email TEXT, careList TEXT, magicUnlocked TEXT, pollen TEXT, other TEXT)";
        $file_db ->exec($theQuery);
        echo ("Table flowerObjects created successfully<br>");
        $file_db = null;
      }
       
      catch(PDOException $e) 
      {
          // Print PDOException message
          echo $e->getMessage();
      }

      
?>