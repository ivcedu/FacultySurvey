<?php
    require("config.php");

    $query = "SELECT TermCode FROM [IVCFASV].[dbo].[SurveyCourse] GROUP BY TermCode ORDER BY TermCode DESC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);