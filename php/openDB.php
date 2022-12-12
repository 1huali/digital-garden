<?php 

    //DATA BASE AND OPEN CONNECTIONS
    //1. open database
    try {
        // Create (connect to) SQLite database in file
        $file_db = new PDO('sqlite:../../db-digital_garden/flower-record.db');
      // Set errormode to exceptions
        $file_db->setAttribute(PDO::ATTR_ERRMODE,
                                PDO::ERRMODE_EXCEPTION);
        // echo("opened or connected to the database flower-record <br>");
       }
      catch(PDOException $e) {
        // Print PDOException message
        echo $e->getMessage();
      }

      ?>