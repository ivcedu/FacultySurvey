<?php
    require("config.php");
    
    $TermCode = filter_input(INPUT_POST, 'TermCode');

    $query = "SELECT COUNT(TermCode) AS TotalCourses FROM [IVCFASV].[dbo].[SurveyCourse] WHERE TermCode = '".$TermCode ."' GROUP BY TermCode";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();

    echo json_encode($data['TotalCourses']);