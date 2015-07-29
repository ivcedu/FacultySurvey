<?php
    require("config.php");
    
    $TermCode = filter_input(INPUT_POST, 'TermCode');

    $query = "SELECT * FROM [TOPSPIN.SOCCCD.EDU\TOPSPIN].[Tardis].[dbo].[CourseInfo] "
            . "WHERE TermCode = '".$TermCode."' AND CollegeCode = 'I'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);