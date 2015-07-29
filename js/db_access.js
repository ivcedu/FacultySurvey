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

function tardis_getInstCourseList(TermCode) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/tardis_getCourseList.php",
        data:{TermCode:TermCode, InstructorUID:InstructorUID},
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

function db_getInstructorInfo(InstEmail) {
    var result = "";
    $.ajax({
        type:"POST",
        url:"php/db_getInstructorInfo.php",
        data:{InstEmail:InstEmail},
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

function db_insertInstructor(InstNum, InstUser, InstName, InstEmail) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertInstructor.php",
        data:{InstNum:InstNum, InstUser:InstUser, InstName:InstName, InstEmail:InstEmail},
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

// delete DB ///////////////////////////////////////////////////////////////////
//function db_deleteAdmin(AdminID) {
//    var Result = false;
//    $.ajax({
//        type:"POST",
//        url:"php/db_deleteAdmin.php",
//        data:{AdminID:AdminID},
//        async: false,  
//        success:function(data) {
//            Result = JSON.parse(data);
//        }
//    });
//    return Result;
//}