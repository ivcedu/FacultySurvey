<?php
    require("config.php");
    
    $TermCode = filter_input(INPUT_POST, 'TermCode');
    $StartDate = filter_input(INPUT_POST, 'StartDate');
    $EndDate = filter_input(INPUT_POST, 'EndDate');

    $query = "SELECT DISTINCT stin.CollegeEmail "
            . "FROM [SKYBLAST.SOCCCD.EDU].[Tardis].[dbo].[AdvocateStudentInfo] AS stin INNER JOIN [SKYBLAST.SOCCCD.EDU].[Tardis].[dbo].[AdvocateStudentCourses] AS stcr ON stin.StudentID = stcr.StudentID "
            . "INNER JOIN [SKYBLAST.SOCCCD.EDU].[Tardis].[dbo].[CourseInfo] AS crin ON stcr.TicketNumber = crin.SectionNum "
            . "WHERE stcr.DropDate = '' "
            . "AND crin.CollegeCode = 'I' AND stcr.TermCode = '".$TermCode."' AND crin.TermCode = '".$TermCode."' "
            . "AND (crin.InstructionMethod = 'M72' OR crin.InstructionMethod = 'M73') "
            . "AND crin.EndDate BETWEEN '".$StartDate."' AND '".$EndDate."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);