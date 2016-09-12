<?php
    require("config.php");

    $query = "SELECT TermCode FROM [IVCFASV].[dbo].[OptOutTerm]";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetch();

    echo json_encode($data['TermCode']);