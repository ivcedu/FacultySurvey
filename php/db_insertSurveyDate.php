<?php
    require("config.php");
    
    $TermCode = filter_input(INPUT_POST, 'TermCode');
    $StartDate = filter_input(INPUT_POST, 'StartDate');
    $EndDate = filter_input(INPUT_POST, 'EndDate');
    
    $query = "INSERT INTO [IVCFASV].[dbo].[SurveyDate] (TermCode, StartDate, EndDate) "
            . "VALUES ('$TermCode', '$StartDate', '$EndDate')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);