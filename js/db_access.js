// get AD login info ///////////////////////////////////////////////////////////
function getLoginUserInfo(php_file, user, pass) {
    var result = new Array();
    $.ajax({
        type:"POST",
        datatype:"json",
        url:php_file,
        data:{username:user, password:pass},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

// get DB Tardis ///////////////////////////////////////////////////////////////
function tardis_getCurrentTerm() {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/tardis_getCurrentTerm.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function tardis_getTermCodeList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/tardis_getTermCodeList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function tardis_getOnlineHybridStudentEmailList(TermCode, StartDate, EndDate) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/tardis_getOnlineHybridStudentEmailList.php",
        data:{TermCode:TermCode, StartDate:StartDate, EndDate:EndDate},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}
// get DB //////////////////////////////////////////////////////////////////////
function db_getAdminByEmail(AdminEmail) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminByEmail.php",
        data:{AdminEmail:AdminEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getAdminList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getAdminList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getSurveyCourseCount(TermCode) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getSurveyCourseCount.php",
        data:{TermCode:TermCode},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getInstSurveyCourseList(TermCode, InstructorUID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getInstSurveyCourseList.php",
        data:{TermCode:TermCode, InstructorUID:InstructorUID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getSurveyDateByTermCode(TermCode) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getSurveyDateByTermCode.php",
        data:{TermCode:TermCode},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getOptOutList(TermCode) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getOptOutList.php",
        data:{TermCode:TermCode},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getTermCodeList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getTermCodeList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getOptOutTerm() {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getOptOutTerm.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

// insert DB ///////////////////////////////////////////////////////////////////
function db_insertAdmin(AdminName, AdminEmail) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertAdmin.php",
        data:{AdminName:AdminName, AdminEmail:AdminEmail},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertSurveyCourseFromTardis(TermCode) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertSurveyCourseFromTardis.php",
        data:{TermCode:TermCode},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertSurveyDate(TermCode, StartDate, EndDate) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertSurveyDate.php",
        data:{TermCode:TermCode, StartDate:StartDate, EndDate:EndDate},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertOptOutTerm(TermCode) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertOptOutTerm.php",
        data:{TermCode:TermCode},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

// update DB ///////////////////////////////////////////////////////////////////
function db_updateAdmin(AdminID, AdminName, AdminEmail) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateAdmin.php",
        data:{AdminID:AdminID, AdminName:AdminName, AdminEmail:AdminEmail},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateSurveyCourseOptOut(SurveyCourseID, OptOut) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateInstSurveyCourseOptOut.php",
        data:{SurveyCourseID:SurveyCourseID, OptOut:OptOut},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateSurveyDate(TermCode, StartDate, EndDate) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateSurveyDate.php",
        data:{TermCode:TermCode, StartDate:StartDate, EndDate:EndDate},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateOptOutTerm(OptOutTermID, TermCode) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateOptOutTerm.php",
        data:{OptOutTermID:OptOutTermID, TermCode:TermCode},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

// delete DB ///////////////////////////////////////////////////////////////////
function db_deleteAdmin(AdminID) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteAdmin.php",
        data:{AdminID:AdminID},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

// create csv //////////////////////////////////////////////////////////////////
function tardis_getFacultyCourseList(TermCode) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/tardis_getFacultyCourseList.php",
        data:{TermCode:TermCode},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function ireportDBgetUserAccess(Username) {   
    var Result = "";
    $.ajax({
        type:"POST",
        url:"php/ireport_db_getUserAccess.php",
        data:{Username:Username},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}