<?php
    require("config.php");
    
    $SurveyCourseID = filter_input(INPUT_POST, 'SurveyCourseID');
    $OptOut = filter_input(INPUT_POST, 'OptOut');

    $query = "UPDATE [IVCFASV].[dbo].[SurveyCourse] "
                ."SET OptOut = '".$OptOut."' "
                ."WHERE SurveyCourseID = '".$SurveyCourseID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);