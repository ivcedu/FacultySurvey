<?php
    require("config.php");

    $TermCode = filter_input(INPUT_GET, 'TermCode');

    $query = "SELECT svcr.SectionNum, stin.Email "
            . "FROM [IVCFASV].[dbo].[SurveyCourse] AS svcr LEFT JOIN [TOPSPIN.SOCCCD.EDU\TOPSPIN].[Tardis].[dbo].[StudentCourses] AS stcr ON svcr.SectionNum = stcr.SectionNum AND stcr.TermCode = '".$TermCode."'"
            . "LEFT JOIN [TOPSPIN.SOCCCD.EDU\TOPSPIN].[Tardis].[dbo].[StudentInfo] AS stin ON stcr.StudentID = stin.StudentID "
            . "WHERE svcr.TermCode = '".$TermCode."' AND svcr.OptOut = 0";

    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $data = $cmd->fetchAll();
    
    $filename = "export_participant_list.csv";  
    header("Content-Disposition: attachment; filename=\"$filename\"");
    header("Content-Type: text/csv;");
    $out = fopen("php://output", 'w+');

    // Write the spreadsheet column titles / labels
//    fputcsv($out, array('SectionNum','StudentEmail'));
    // Write all the records to the spreadsheet
    foreach($data as $row) {
        fputcsv($out, array($row['SectionNum'], $row['Email']));
    }
    
    fclose($out);
    exit;