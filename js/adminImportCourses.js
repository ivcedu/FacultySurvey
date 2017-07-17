var m_term_code = "";
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        $('.splash').css('display', 'none');
        
        getLoginInfo();
        setTardisTermCodeList();
        getCurrentSurveyDateRange();
    }
    else {
        window.open('login.html', '_self');
    }
};

$(window).bind("resize click", function () {
    // Add special class to minimalize page elements when screen is less than 768px
    setBodySmall();

    // Waint until metsiMenu, collapse and other effect finish and set wrapper height
    setTimeout(function () {
        fixWrapperHeight();
    }, 300);
});

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    // Add special class to minimalize page elements when screen is less than 768px
    setBodySmall();
    
    // Handle minimalize sidebar menu
    $('.hide-menu').click(function(event){
        event.preventDefault();
        if ($(window).width() < 769) {
            $("body").toggleClass("show-sidebar");
        } else {
            $("body").toggleClass("hide-sidebar");
        }
    });
    
    // Initialize metsiMenu plugin to sidebar menu
    $('#side-menu').metisMenu();
    
    // Initialize iCheck plugin
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });
    
    // Initialize animate panel function
    $('.animate-panel').animatePanel();
    
    // Function for collapse hpanel
    $('.showhide').click(function (event) {
        event.preventDefault();
        var hpanel = $(this).closest('div.hpanel');
        var icon = $(this).find('i:first');
        var body = hpanel.find('div.panel-body');
        var footer = hpanel.find('div.panel-footer');
        body.slideToggle(300);
        footer.slideToggle(200);

        // Toggle icon from up to down
        icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        hpanel.toggleClass('').toggleClass('panel-collapse');
        setTimeout(function () {
            hpanel.resize();
            hpanel.find('[id^=map-]').resize();
        }, 50);
    });
    
    // Function for close hpanel
    $('.closebox').click(function (event) {
        event.preventDefault();
        var hpanel = $(this).closest('div.hpanel');
        hpanel.remove();
    });
    
    // Function for small header
    $('.small-header-action').click(function(event){
        event.preventDefault();
        var icon = $(this).find('i:first');
        var breadcrumb  = $(this).parent().find('#hbreadcrumb');
        $(this).parent().parent().parent().toggleClass('small-header');
        breadcrumb.toggleClass('m-t-lg');
        icon.toggleClass('fa-arrow-up').toggleClass('fa-arrow-down');
    });
    
    // Set minimal height of #wrapper to fit the window
    fixWrapperHeight();
    
    // Sparkline bar chart data and options used under Profile image on left navigation panel
    $("#sparkline1").sparkline([5, 6, 7, 2, 0, 4, 2, 4, 5, 7, 2, 4, 12, 11, 4], {
        type: 'bar',
        barWidth: 7,
        height: '30px',
        barColor: '#62cb31',
        negBarColor: '#53ac2a'
    });
    
    // Initialize tooltips
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]"
    });

    // Initialize popover
    $("[data-toggle=popover]").popover();

    // Move modal to body
    // Fix Bootstrap backdrop issue with animation.css
    $('.modal').appendTo("body");
    
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('login.html', '_self');
        return false;
    });
    
    // mod activity change event ///////////////////////////////////////////////
    $('#tardis_term_code_list').change(function() {
        m_term_code = $('#tardis_term_code_list').val();
        getCurrentSurveyDateRange();
        return false;
    });
    
    // update opt-out term conde button click //////////////////////////////////
    $('#btn_term_code_update').click(function() {
        if (updateActiveTermCode()) {
            swal({title: "Update Completed", text: $('#tardis_term_code_list').val() + " Term Code has been set to current active Opt-Out successfully", type: "success"});
        }
        else {
            swal({title: "Error", text: $('#tardis_term_code_list').val() + " Term Code Opt-Out is completed/currently active", type: "error"});
        }
        getCurrentSurveyDateRange();
    });
    
    // update (survey date) button click ///////////////////////////////////////
    $('#btn_date_update').click(function() {
        if (updateSurveyDateRange()) {
            swal({title: "Update Completed", text: "Survey date range has been updated successfully", type: "success"});
        }
        else {
            swal({title: "Error", text: "Start Date and End Date are required", type: "error"});
        }
    });
    
    // import butten click /////////////////////////////////////////////////////
    $('#btn_import').click(function() {
        var course_count = db_getSurveyCourseCount(m_term_code);
        if (course_count === null) {
            db_insertSurveyCourseFromTardis(m_term_code);
            swal({title: "Import Completed", text: "All current term courses has been imported successfully", type: "success"});
        }
        else {
            swal({title: "Courses Exist", text: "All current term courses already imported to DB", type: "info"});          
        }
    });
    
    // faculty list button click ///////////////////////////////////////////////
    $('#btn_excel_faculty').click(function() {        
        location.href = "php/cvs_FacultyCourseList.php?TermCode=" + m_term_code;     
    });
    
    // student list button click ///////////////////////////////////////////////
    $('#btn_excel_student').click(function() {
        location.href = "php/cvs_ParticipantList.php?TermCode=" + m_term_code;
    });
    
    // bootstrap datepicker
    $('#start_date').datepicker();
    $('#end_date').datepicker();
    
    // bootstrap selectpicker
    $('.selectpicker').selectpicker();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});

////////////////////////////////////////////////////////////////////////////////
function fixWrapperHeight() {
    // Get and set current height
    var headerH = 62;
    var navigationH = $("#navigation").height();
    var contentH = $(".content").height();

    // Set new height when contnet height is less then navigation
    if (contentH < navigationH) {
        $("#wrapper").css("min-height", navigationH + 'px');
    }

    // Set new height when contnet height is less then navigation and navigation is less then window
    if (contentH < navigationH && navigationH < $(window).height()) {
        $("#wrapper").css("min-height", $(window).height() - headerH  + 'px');
    }

    // Set new height when contnet is higher then navigation but less then window
    if (contentH > navigationH && contentH < $(window).height()) {
        $("#wrapper").css("min-height", $(window).height() - headerH + 'px');
    }
}

function setBodySmall() {
    if ($(this).width() < 769) {
        $('body').addClass('page-small');
    } else {
        $('body').removeClass('page-small');
        $('body').removeClass('show-sidebar');
    }
}

// Animate panel function
$.fn['animatePanel'] = function() {
    var element = $(this);
    var effect = $(this).data('effect');
    var delay = $(this).data('delay');
    var child = $(this).data('child');

    // Set default values for attrs
    if(!effect) { effect = 'zoomIn';};
    if(!delay) { delay = 0.06; } else { delay = delay / 10; };
    if(!child) { child = '.row > div';} else {child = "." + child;};

    //Set defaul values for start animation and delay
    var startAnimation = 0;
    var start = Math.abs(delay) + startAnimation;

    // Get all visible element and set opactiy to 0
    var panel = element.find(child);
    panel.addClass('opacity-0');

    // Get all elements and add effect class
    panel = element.find(child);
    panel.addClass('animated-panel').addClass(effect);

    // Add delay for each child elements
    panel.each(function (i, elm) {
        start += delay;
        var rounded = Math.round(start * 10) / 10;
        $(elm).css('animation-delay', rounded + 's');
        // Remove opacity 0 after finish
        $(elm).removeClass('opacity-0');
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function getLoginInfo() {
    var login_name = sessionStorage.getItem('ss_fasv_loginName');
    $('#login_user').html(login_name);
}

function setTardisTermCodeList() {
    var result = new Array(); 
    result = tardis_getTermCodeList();
    
    $('#tardis_term_code_list').empty();
    var html = "";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['TermCode'] + "'>" + result[i]['TermCode'] + "</option>";
    }
    
    $('#tardis_term_code_list').append(html);
    m_term_code = db_getOptOutTerm();
    $('#tardis_term_code_list').val(m_term_code);
    $('#tardis_term_code_list').selectpicker('refresh');
}

function getCurrentSurveyDateRange() {
    var result = new Array();
    result = db_getSurveyDateByTermCode(m_term_code);
    
    if (result.length === 1) {
        $('#start_date').val(result[0]['StartDate']);
        $('#end_date').val(result[0]['EndDate']);
    }
    else {
        $('#start_date').val("");
        $('#end_date').val("");
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateSurveyDateRange() {
    var start_date = $('#start_date').val();
    var end_date = $('#end_date').val();

    if (start_date === "" || end_date === "") {
        return false;
    }
    else {
        var result = new Array();
        result = db_getSurveyDateByTermCode(m_term_code);
        
        if (result.length === 0) {
            db_insertSurveyDate(m_term_code, start_date, end_date);
        }
        else {
            db_updateSurveyDate(m_term_code, start_date, end_date);
        }
        
        return true;
    }
}

function updateActiveTermCode() {
    var result = new Array();
    result = db_getSurveyDateByTermCode(m_term_code);
    
    if (result.length === 0) {
        db_updateOptOutTerm(1, m_term_code);
        return true;
    }
    else {
        return false;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//function tardisGetFacultyCourseList() {
//    var result = new Array();
//    result = tardis_getFacultyCourseList(m_term_code);
//    
//    var str_data = "usertype,title,firstname,surename,email,course_name,course_code,program_of_studies,course_type,course_participants\n";
//    for (var i = 0; i < result.length; i++) {
//        str_data += result[i]['UserType'] + ",";
//        str_data += result[i]['Title'] + ",";
//        str_data += result[i]['FirstName'] + ",";
//        str_data += result[i]['LastName'] + ",";
//        str_data += result[i]['Email'] + ",";
//        str_data += result[i]['CourseTitle'] + ",";
//        str_data += result[i]['SectionNum'] + ",";
//        str_data += result[i]['CourseID'] + ",";
//        str_data += result[i]['CourseType'] + ",";
//        str_data += result[i]['Participants'] + "\n";
//    }
//    download(str_data, "export_faculty_list.csv", "text/csv");
//}
//
//function download(strData, strFileName, strMimeType) {
//    var D = document,
//        a = D.createElement("a");
//        strMimeType = strMimeType || "application/octet-stream";
//
//    if (navigator.msSaveBlob) { // IE10
//        return navigator.msSaveBlob(new Blob([strData], {type: strMimeType}), strFileName);
//    }
//
//    if ('download' in a) { //html5 A[download]
//        a.href = "data:" + strMimeType + "," + encodeURIComponent(strData);
//        a.setAttribute("download", strFileName);
//        a.innerHTML = "downloading...";
//        D.body.appendChild(a);
//        setTimeout(function() {
//            a.click();
//            D.body.removeChild(a);
//        }, 66);
//        return true;
//    } /* end if('download' in a) */
//
//    //do iframe dataURL download (old ch+FF):
//    var f = D.createElement("iframe");
//    D.body.appendChild(f);
//    f.src = "data:" +  strMimeType   + "," + encodeURIComponent(strData);
//
//    setTimeout(function() {
//        D.body.removeChild(f);
//    }, 333);
//    return true;
//}