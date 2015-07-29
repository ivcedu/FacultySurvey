<?php
    require("config.php");

    $TermCode = filter_input(INPUT_POST, 'TermCode');
    $InstructorUID= filter_input(INPUT_POST, 'InstructorUID');
    
    $query = "SELECT * "
            . "FROM [IVCFASV].[dbo].[SurveyCourse] "
            . "WHERE TermCode = '".$TermCode."' AND InstructorUID = '".$InstructorUID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);