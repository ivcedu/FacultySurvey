<?php
    require("config.php");
    
    $InstNum = filter_input(INPUT_POST, 'InstNum');
    $InstName = filter_input(INPUT_POST, 'InstName');
    $InstEmail = filter_input(INPUT_POST, 'InstEmail');
    
    $query = "INSERT INTO [IVCFASV].[dbo].[Instructor] (InstNum, InstName, InstEmail) "
                ."VALUES ('$InstNum', '$InstName', '$InstEmail')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);