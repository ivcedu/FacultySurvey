<?php
    require("config.php");
    
    $TermCode = filter_input(INPUT_POST, 'TermCode');
    $StartDate = filter_input(INPUT_POST, 'StartDate');
    $EndDate = filter_input(INPUT_POST, 'EndDate');

    $query = "UPDATE [IVCFASV].[dbo].[SurveyDate] "
                ."SET StartDate = '".$StartDate."', EndDate = '".$EndDate."' "
                ."WHERE TermCode = '".$TermCode."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);