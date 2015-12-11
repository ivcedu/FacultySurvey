<?php
    require("config.php");

    $TermCode = filter_input(INPUT_POST, 'TermCode');
    
    $query = "SELECT tdin.FirstName + ' ' + tdin.LastName AS Instructor, srcr.SectionNum AS Ticket, srcr.CourseID AS Course "
            . "FROM [IVCFASV].[dbo].[SurveyCourse] AS srcr INNER JOIN [TOPSPIN.SOCCCD.EDU\TOPSPIN].[Tardis].[dbo].[InstructorInfo] AS tdin ON srcr.InstructorUID = tdin.UserID "
            . "WHERE srcr.TermCode = '".$TermCode."' AND srcr.OptOut = 1";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);