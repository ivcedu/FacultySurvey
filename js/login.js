////////////////////////////////////////////////////////////////////////////////
window.onload = function() {  
    $('#logn_error').hide();
    var curBrowser = bowser.name;
    var curVersion = Number(bowser.version);
    
    switch (curBrowser) {
        case "Safari":
            if (curVersion < 6)
                window.open('browser_not_support.html', '_self');
            break;
        case "Chrome":
            if (curVersion < 7)
                window.open('browser_not_support.html', '_self');
            break;
        case "Firefox":
            if (curVersion < 22)
                window.open('browser_not_support.html', '_self');
            break;
        case "Internet Explorer":
            if (curVersion < 11)
                window.open('browser_not_support.html', '_self');
            break;
        default:     
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {      
    $('#btn_login').click(function() {
        // ireport.ivc.edu validation //////////////////////////////////////////
        if(location.href.indexOf("ireport.ivc.edu") >= 0 && !ireportValidation()) {
            swal({  title: "Access Denied",
                    text: "This is a Development site. It will redirect to IVC Application site",
                    type: "error",
                    confirmButtonText: "OK" },
                    function() {
                        sessionStorage.clear();
                        window.open('https://services.ivc.edu/', '_self');
                        return false;
                    }
            );
        }
        ////////////////////////////////////////////////////////////////////////
        else {
            var login_error = loginInfo();
            if(login_error === "") {
                if (isUserAdmin()) {
                    window.open('adminImportCourses.html', '_self');
                    return false;
                }
                else {
                    if (!validateFacultySurvey()) {
                        swal({title: "Read", text: "Faculty Opt Out student evaluation survey has not been start or due date has been past", type: "warning"});
                    }
                    else {
                        window.open('instOptOut.html', '_self');
                    }
                    return false;
                }
            }
            else {
                $('#error_msg').html(login_error);
                $('#logn_error').show();
                this.blur();
                return false;
            }
        }
    });
    
    $.backstretch(["images/fs_back_web_3.jpg"], {duration: 3000, fade: 750});
});

////////////////////////////////////////////////////////////////////////////////
function loginEmailValidation(login_email) {    
    if (login_email.indexOf("@ivc.edu") !== -1 || login_email.indexOf("@saddleback.edu") !== -1) {
        return "";
    }
    else {
        return "Invalid Email";
    }
}

////////////////////////////////////////////////////////////////////////////////
function loginInfo() {    
    var result = new Array();
    var username = $('#username').val().toLowerCase();
    var password = $('#password').val();
    var error = loginEmailValidation(username);
    if(error !== "") {
        return error;
    }
    
    if (username.indexOf("@ivc.edu") >= 1) {
        username = username.replace("@ivc.edu", "");
        result = getLoginUserInfo("php/login.php", username, password);
    }
    else {
        username = username.replace("@saddleback.edu", "");
        result = getLoginUserInfo("php/login_saddleback.php", username, password);
    }
    
    if (result.length === 0) {
        return "Invalid Email or Password";
    }
    else {
        var ID = objToString(result[0]);
        var name = objToString(result[1]);
        var email = objToString(result[2]);
        var type = objToString(result[3]);
        
        sessionData_login(ID, name, email, type);
        return "";
    }
}

////////////////////////////////////////////////////////////////////////////////
function isUserAdmin() {
    var result = new Array();
    result = db_getAdminByEmail(sessionStorage.getItem('ss_fasv_loginEmail'));
    
    if (result.length === 1) {
        return true;
    }
    else {
        return false;
    }
}

////////////////////////////////////////////////////////////////////////////////
function validateFacultySurvey() {
    var term_code = db_getOptOutTerm();
    var result = new Array();
    result = db_getSurveyDateByTermCode(term_code);
    
    if (result.length === 1) {
        var today = new Date();
        var start_date = new Date(result[0]['StartDate']);
        var end_date = new Date(result[0]['EndDate']);
        end_date.setDate(end_date.getDate() + 1);
        
        if (today >= start_date && today <= end_date) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

////////////////////////////////////////////////////////////////////////////////
function ireportValidation() {
    var username = $('#username').val().toLowerCase().replace("@ivc.edu", "").replace("@saddleback.edu", "");
    if (ireportDBgetUserAccess(username) !== null) {
        return true;
    }
    else {
        return false;
    }
}