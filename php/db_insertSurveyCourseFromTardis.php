<?php
    require("config.php");
    
    $TermCode = filter_input(INPUT_POST, 'TermCode');
    
    $dbConn->setAttribute(constant('PDO::SQLSRV_ATTR_DIRECT_QUERY'), true);
    
    $query1 = "CREATE TABLE #RESULT1 (TermCode nvarchar(255), InstructorUID nvarchar(255), SectionNum nvarchar(255), CourseID nvarchar(255), CourseTitle nvarchar(255), CourseDescription nvarchar(255))";
    $query2 = "INSERT INTO #RESULT1 "
            . "SELECT crif.TermCode, emif.UserID, crif.SectionNum, crif.CourseID, crif.CourseTitle, crif.CourseDescription "
            . "FROM [SKYBLAST.SOCCCD.EDU].[Tardis].[dbo].[InstructorCourses] AS incr LEFT JOIN [SKYBLAST.SOCCCD.EDU].[Tardis].[dbo].[CourseInfo] AS crif ON incr.TermCode = crif.TermCode AND incr.SectionNum = crif.SectionNum "
            . "LEFT JOIN [SKYBLAST.SOCCCD.EDU].[Tardis].[dbo].[EmployeeInfo] AS emif ON incr.EmployeeID = emif.EmployeeID "
            . "WHERE  CollegeCode = 'I' AND crif.CourseID <> 'TU 301' AND TermCode = '".$TermCode."'";
    
    $query3 = "CREATE TABLE #RESULT2 (SectionNum nvarchar(255), Participants int)";
    $query4 = "INSERT INTO #RESULT2 "
            . "SELECT SectionNum, COUNT(StudentID) "
            . "FROM [SKYBLAST.SOCCCD.EDU].[Tardis].[dbo].[StudentCourses] "
            . "WHERE TermCode = '".$TermCode."' GROUP BY SectionNum";
    
    $query5 = "INSERT INTO [IVCFASV].[dbo].[SurveyCourse] (TermCode, InstructorUID, SectionNum, CourseID, CourseTitle, CourseDescription) "
            . "SELECT rst1.TermCode, rst1.InstructorUID, rst1.SectionNum, rst1.CourseID, rst1.CourseTitle, rst1.CourseDescription "
            . "FROM #RESULT1 AS rst1 INNER JOIN #RESULT2 AS rst2 ON rst1.SectionNum = rst2.SectionNum";
    
    $query6 = "DROP TABLE #RESULT1";
    $query7 = "DROP TABLE #RESULT2";
    
    $dbConn->query($query1);
    $dbConn->query($query2);
    $dbConn->query($query3);
    $dbConn->query($query4);
    
    $cmd = $dbConn->prepare($query5);
    $cmd->execute();
    $data = $cmd->fetchAll();
    
    $dbConn->query($query6);
    $dbConn->query($query7);

    echo json_encode($data);