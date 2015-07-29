<?php
    require("config.php");
    
    $TermCode = filter_input(INPUT_POST, 'TermCode');

    $query = "INSERT INTO [IVCFASV].[dbo].[SurveyCourse] (TermCode, InstructorUID, SectionNum, CourseID, CourseTitle, CourseDescription) "
            . "SELECT	TermCode, InstructorUID, SectionNum, CourseID, CourseTitle, CourseDescription "
            . "FROM [TOPSPIN.SOCCCD.EDU\TOPSPIN].[Tardis].[dbo].[CourseInfo] "
            . "WHERE  CollegeCode = 'I' AND TermCode = '".$TermCode."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);