<?php
    require("config.php");

    $TermCode = filter_input(INPUT_POST, 'TermCode');

    $query = "SELECT 'Instructor' AS UserType, empl.Title, empl.FirstName, empl.LastName, empl.Email, svcr.CourseTitle, svcr.SectionNum, svcr.CourseID, '1' AS CourseType, "
            . "(SELECT COUNT(StudentID) FROM [TOPSPIN.SOCCCD.EDU\TOPSPIN].[Tardis].[dbo].[StudentCourses] WHERE TermCode = '".$TermCode."' AND SectionNum = svcr.SectionNum) AS Participants "
            . "FROM [IVCFASV].[dbo].[SurveyCourse] AS svcr LEFT JOIN [TOPSPIN.SOCCCD.EDU\TOPSPIN].[Tardis].[dbo].[EmployeeInfo] AS empl ON svcr.InstructorUID = empl.UserID "
            . "WHERE svcr.TermCode = '".$TermCode."' AND svcr.OptOut = 0";

    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $data = $cmd->fetchAll();
    
    echo json_encode($data);