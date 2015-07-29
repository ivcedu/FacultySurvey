<?php
    require("config.php");
    
    $InstEmail = filter_input(INPUT_POST, 'InstEmail');

    $query = "SELECT InstructorID FROM [IVCFASV].[dbo].[Instructor] WHERE InstEmail = '".$InstEmail ."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();

    echo json_encode($data['InstructorID']);