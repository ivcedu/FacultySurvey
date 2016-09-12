<?php
    require("config.php");
    
    $TermCode = filter_input(INPUT_POST, 'TermCode');
    
    $query = "INSERT INTO [IVCFASV].[dbo].[OptOutTerm] (TermCode) "
                ."VALUES ('$TermCode')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);