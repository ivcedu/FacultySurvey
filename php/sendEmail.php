<?php
    require("class.phpmailer.php");

    $Email = filter_input(INPUT_POST, 'Email');
    $Name = filter_input(INPUT_POST, 'Name');
    $CCEmail = filter_input(INPUT_POST, 'CCEmail');
    $CCName = filter_input(INPUT_POST, 'CCName');
    $Subject = filter_input(INPUT_POST, 'Subject');
    $Message = filter_input(INPUT_POST, 'Message');

    $mail = new PHPMailer();
    $mail->IsSMTP();
    $mail->Host = "smtp1.socccd.edu";
    $mail->From = "donotreply@ivc.edu";
    $mail->FromName = "Do Not Reply";
    $mail->AddAddress($Email, $Name);
    $mail->AddCC($CCEmail, $CCName);
    $mail->IsHTML(true); // send as HTML
    $mail->Subject = $Subject;
    $mail->Body = $Message;

    if($mail->Send()) {
        echo "true";
    }
    else {
        echo "false";
    }