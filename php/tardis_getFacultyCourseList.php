<?php
    require("config.php");

    $TermCode = filter_input(INPUT_POST, 'TermCode');

    $dbConn->setAttribute(constant('PDO::SQLSRV_ATTR_DIRECT_QUERY'), true);
    
    $query1 = "CREATE TABLE #RESULT1 (Title nvarchar(255), FirstName nvarchar(255), LastName nvarchar(255), Email nvarchar(255), CourseTitle nvarchar(255), SectionNum nvarchar(255), CourseID nvarchar(255))";
    $query2 = "INSERT INTO #RESULT1 SELECT empl.Title, empl.FirstName, empl.LastName, empl.Email, svcr.CourseTitle, svcr.SectionNum, svcr.CourseID "
            . "FROM [IVCFASV].[dbo].[SurveyCourse] AS svcr LEFT JOIN [TOPSPIN.SOCCCD.EDU\TOPSPIN].[Tardis].[dbo].[EmployeeInfo] AS empl ON svcr.InstructorUID = empl.UserID "
            . "WHERE svcr.TermCode = '".$TermCode."' AND svcr.OptOut = 0";
    
    $query3 = "CREATE TABLE #RESULT2 (SectionNum nvarchar(255), Participants int)";
    $query4 = "INSERT INTO #RESULT2 SELECT SectionNum, COUNT(StudentID) "
            . "FROM [TOPSPIN.SOCCCD.EDU\TOPSPIN].[Tardis].[dbo].[StudentCourses] "
            . "WHERE TermCode = '".$TermCode."' GROUP BY SectionNum";
    
    $query5 = "CREATE TABLE #RESULT3 (Title nvarchar(255), FirstName nvarchar(255), LastName nvarchar(255), Email nvarchar(255), CourseTitle nvarchar(255), SectionNum nvarchar(255), CourseID nvarchar(255), Participants int)";
    $query6 = "INSERT INTO #RESULT3 SELECT rst1.Title, rst1.FirstName, rst1.LastName, rst1.Email, rst1.CourseTitle, rst1.SectionNum, rst1.CourseID, rst2.Participants "
            . "FROM #RESULT1 AS rst1 LEFT JOIN #RESULT2 AS rst2 ON rst1.SectionNum = rst2.SectionNum";

    $query7 = "SELECT 'Instructor' AS UserType, Title, FirstName, LastName, Email, CourseTitle, SectionNum, CourseID, '1' AS CourseType, Participants "
            . "FROM #RESULT3 "
            . "WHERE Participants IS NOT NULL";
    
    $query8 = "DROP TABLE #RESULT1";
    $query9 = "DROP TABLE #RESULT2";
    $query10 = "DROP TABLE #RESULT3";

    $dbConn->query($query1);
    $dbConn->query($query2);
    $dbConn->query($query3);
    $dbConn->query($query4);
    $dbConn->query($query5);
    $dbConn->query($query6);
    
    $cmd = $dbConn->prepare($query7);
    $cmd->execute();
    $data = $cmd->fetchAll();
    
    $dbConn->query($query8);
    $dbConn->query($query9);
    $dbConn->query($query10);
    
    echo json_encode($data);