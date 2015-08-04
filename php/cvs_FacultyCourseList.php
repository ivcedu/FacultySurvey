<?php
    require("config.php");

    $TermCode = filter_input(INPUT_GET, 'TermCode');
//    $TermCode = filter_input(INPUT_POST, 'TermCode');

    $query = "SELECT 'Instructor' AS UserType, empl.Title, empl.FirstName, empl.LastName, empl.Email, svcr.CourseTitle, svcr.SectionNum, svcr.CourseID, '1' AS CourseType, "
            . "(SELECT COUNT(StudentID) FROM [TOPSPIN.SOCCCD.EDU\TOPSPIN].[Tardis].[dbo].[StudentCourses] WHERE TermCode = '".$TermCode."' AND SectionNum = svcr.SectionNum) AS Participants "
            . "FROM [IVCFASV].[dbo].[SurveyCourse] AS svcr LEFT JOIN [TOPSPIN.SOCCCD.EDU\TOPSPIN].[Tardis].[dbo].[EmployeeInfo] AS empl ON svcr.InstructorUID = empl.UserID "
            . "WHERE svcr.TermCode = '".$TermCode."' AND svcr.OptOut = 0";

    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $data = $cmd->fetchAll();
    
    $filename = "export_faculty_list.csv";  
    header("Content-Disposition: attachment; filename=\"$filename\"");
    header("Content-Type: text/csv;");
    $out = fopen("php://output", 'w+');

    // Write the spreadsheet column titles / labels
    fputcsv($out, array('usertype','title','firstname', 'surename', 'email', 'course_name', 'course_code', 'program_of_studies', 'course_type', 'course_participants'));
    // Write all the records to the spreadsheet
    foreach($data as $row) {
        fputcsv($out, array($row['UserType'], $row['Title'], $row['FirstName'], $row['LastName'], $row['Email'], $row['CourseTitle'], $row['SectionNum'], $row['CourseID'], $row['CourseType'], $row['Participants']));
    }
    
    fclose($out);
    exit;