<?php
    require("config.php");

    $TermCode = filter_input(INPUT_GET, 'TermCode');

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

    $query7 = "SELECT 'Instructor' AS UserType, rst3.Title, rst3.FirstName, rst3.LastName, rst3.Email, rst3.CourseTitle, rst3.SectionNum, rst3.CourseID, '1' AS CourseType, rst3.Participants "
            . "FROM #RESULT3 AS rst3";
    
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
    
    $filename = "export_faculty_list.csv";  
    header("Content-Disposition: attachment; filename=\"$filename\"");
    header("Content-Type: text/csv;");
    $out = fopen("php://output", 'w+');

    // Write the spreadsheet column titles / labels
    fputcsv($out, array('usertype','title','firstname', 'surname', 'email', 'course_name', 'course_code', 'program_of_studies', 'course_type', 'course_participants'));
    // Write all the records to the spreadsheet
    foreach($data as $row) {
        fputcsv($out, array($row['UserType'], $row['Title'], $row['FirstName'], $row['LastName'], $row['Email'], $row['CourseTitle'], $row['SectionNum'], $row['CourseID'], $row['CourseType'], $row['Participants']));
    }
    
    fclose($out);
    exit;