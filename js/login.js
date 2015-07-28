var m_ID = "";
var m_name = "";
var m_email = "";
var m_type = "";

var m_username = "";
var m_password = "";

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
        $('#error_msg').html("");
        $('#logn_error').hide();

        if(loginInfo()) {
            sessionData_login(m_ID, m_name, m_email, m_type);
            if (isUserAdmin()) {
                window.open('adminImportCourses.html', '_self');
                return false;
            }
            else {
                if (m_type.toLowerCase().indexOf("faculty") >= 0) {
                    sessionStorage.setItem('ss_fasv_loginUserName', m_username);
                    window.open('instOptOut.html', '_self');
                    return false;
                }
                else {
                    swal({title: "Access Denied", text: "You are not an IVC Faculty nor Administrator", type: "error"});
                    return false;
                }
            }
        }
        else {
            $('#error_msg').html("Invalid username or password");
            $('#logn_error').show();
            return false;
        }
    });
});

////////////////////////////////////////////////////////////////////////////////
function loginInfo() {   
    var result = new Array();
    m_username = $('#username').val().toLowerCase().replace("@ivc.edu", "");
    m_password = $('#password').val();
    
    result = getLoginUserInfo("php/login.php", m_username, m_password);
    
    if (result.length === 0) {
        return false;
    }
    else {
        m_ID = objToString(result[0]);
        m_name = objToString(result[1]);
        m_email = objToString(result[2]);
        m_type = objToString(result[3]);
        
        if (location.href.indexOf("ireport.ivc.edu") >= 0) {
            sessionStorage.setItem('m_parentSite', 'https://ireport.ivc.edu');
        }
        else {
            sessionStorage.setItem('m_parentSite', 'https://services.ivc.edu');
        }
        
        return true;
    }
}

function isUserAdmin() {
    var result = new Array();
    result = db_getAdminByEmail(sessionStorage.getItem('ss_fasv_loginEmail'));
    
    if (result.length === 1) {
        m_type = "Admin";
        return true;
    }
    else {
        return false;
    }
}