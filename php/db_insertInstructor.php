<?php
    require("config.php");
    
    $InstNum = filter_input(INPUT_POST, 'InstNum');
    $InstUser = filter_input(INPUT_POST, 'InstUser');
    $InstName = filter_input(INPUT_POST, 'InstName');
    $InstEmail = filter_input(INPUT_POST, 'InstEmail');
    
    $query = "INSERT INTO [IVCFASV].[dbo].[Instructor] (InstNum, InstUser, InstName, InstEmail) "
                ."VALUES ('$InstNum', '$InstUser', '$InstName', '$InstEmail')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);