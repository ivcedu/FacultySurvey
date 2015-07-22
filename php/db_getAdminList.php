<?php
    require("config.php");

    $query = "SELECT * FROM [IVCFASV].[dbo].[Admin]";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);