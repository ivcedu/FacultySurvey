<?php
    require("config.php");
    
    $TermCode = filter_input(INPUT_POST, 'TermCode');

    $query = "SELECT TOP 1 * FROM [IVCFASV].[dbo].[SurveyDate] WHERE TermCode = '" . $TermCode . "'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);