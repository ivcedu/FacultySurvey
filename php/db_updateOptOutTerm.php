<?php
    require("config.php");
    
    $OptOutTermID = filter_input(INPUT_POST, 'OptOutTermID');
    $TermCode = filter_input(INPUT_POST, 'TermCode');

    $query = "UPDATE [IVCFASV].[dbo].[OptOutTerm] "
                ."SET TermCode = '".$TermCode."' "
                ."WHERE OptOutTermID = '".$OptOutTermID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);