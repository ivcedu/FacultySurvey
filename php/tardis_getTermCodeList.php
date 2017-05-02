<?php
    require("config.php");

    $query = "SELECT TOP (3) TermCode FROM [SKYBLAST.SOCCCD.EDU].[Tardis].[dbo].[StudentCourses] GROUP BY TermCode ORDER BY TermCode DESC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);