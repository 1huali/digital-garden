<?php 
      
      require('openDB.php');
      
    //DATA BASE AND OPEN CONNECTIONS
        //2. create table
        try
      {
        $theQuery = "CREATE TABLE flowerObjects (flowerID INTEGER PRIMARY KEY NOT NULL, creationDate TEXT, user TEXT, enableDisplay TEXT, growthLength TEXT, enableAutonomous , pattern TEXT, lattitude TEXT, longitude TEXT, diaryFile TEXT, completedState TEXT, energyLevels TEXT, other TEXT)";
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