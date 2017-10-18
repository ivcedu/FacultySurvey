var m_table;

////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        if (!isUserAdmin()) {
            window.open('login.html', '_self');
            return false;
        }
        
        $('.splash').css('display', 'none');
        getLoginInfo();        
        getCurrentTermCode();
    }
    else {
        window.open('login.html', '_self');
        return false;
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('login.html', '_self');
        return false;
    });
    
    // reload button click /////////////////////////////////////////////////////
    $('#btn_reload').click(function() {
        startSpinning();
        setTimeout(function() {
            getTardisStudentEmailList();
            stopSpinning();
        }, 1500);
        return false;
    });

    // bootstrap datepicker
    $('#start_date').datepicker();
    $('#end_date').datepicker();
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_online_hybrid_list').DataTable({ paging: false, bInfo: false,
                                                        dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp",
                                                        "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
                                                        buttons: [  {extend: 'copy',className: 'btn-sm'},
                                                                    {extend: 'csv',title: 'export_student_email_list', className: 'btn-sm'},
                                                                    {extend: 'pdf', title: 'export_student_email_list', className: 'btn-sm'},
                                                                    {extend: 'print',className: 'btn-sm'}
                                                                ] });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function startSpinning() {
    $('#wrapper').css('opacity', '0.5');
    $('#spinner_loader_img').addClass('preloader__spinner');
    $('#spinner_loader').show();
}

function stopSpinning() {
    $('#wrapper').css('opacity', '1');
    $('#spinner_loader_img').removeClass('preloader__spinner');
    $('#spinner_loader').hide();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

function getLoginInfo() {
    var login_name = sessionStorage.getItem('ss_fasv_loginName');
    $('#login_user').html(login_name);
}

////////////////////////////////////////////////////////////////////////////////
function getCurrentTermCode() {
    var result = new Array(); 
    result = tardis_getCurrentTerm();
    
    $('#cur_term_code').val(result);    
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getTardisStudentEmailList() {
    var term_code = $('#cur_term_code').val();
    var start_date = $('#start_date').val();
    var end_date = $('#end_date').val();
        
    var result = new Array(); 
    result = tardis_getOnlineHybridStudentEmailList(term_code, start_date, end_date);

    m_table.clear();
    m_table.rows.add(result).draw();
}