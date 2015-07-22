////////////////////////////////////////////////////////////////////////////////
function proc_sendEmail(email, name, cc_email, cc_name, subject, message) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/sendEmail.php",
        data:{Email:email, Name:name, CCEmail:cc_email, CCName:cc_name, Subject:subject, Message:message},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}