$(document).ready(function () {

    loadData();


});
function AddAttrule() {

    //var chkvalue = "";
    //if ($('#CoffAllow').prop('checked') == true) { chkvalue = 1 } else { chkvalue = 0 }

    var obj_attnrules = {
        Tar_Cutoff_Day: $('#txtCuttDay').val(),
        Tar_Ratio_NormalDay: $('#txtOTNr').val(),
        Tar_Ratio_WeekDay: $('#txtOTWr').val(),
        //Tar_Compoff:chkvalue,
        Tar_Compoff: $('#CoffAllow').val(),

        Tar_leave_approve: $('#txtLeaveA').val(),
        Tar_OD_approve: $('#txtODA').val(),
        Tar_Earned_LeaveTyp: $('#ddl_earntype').val(),

        Tar_Earned_Value: $('#txtMonth').val(),



    };
    $.ajax({
        url: "/Difrules/Insert_AttnRules",
        type: "Post",
        data: JSON.stringify(obj_attnrules),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            loadData();

        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function loadData() {
    $.ajax({
        url: "/Difrules/AttnRuleList",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert(r.TxnId);
            if (r.TxnId != "" && r.TxnId != null && r.TxnId != '0') {
                $('#hdnattn').val(r.TxnId);
                $('#txtCuttDay').val(r.Tar_Ratio_NormalDay);
                $('#txtOTWr').val(r.Tar_Ratio_WeekDay);
                $('#CoffAllow').val(r.Tar_Compoff);
                $('#txtLeaveA').val(r.Tar_leave_approve);
                $('#txtODA').val(r.Tar_OD_approve);
                $('#ddl_earntype').val(r.Tar_Earned_LeaveTyp);
                $('#txtMonth').val(r.Tar_Earned_Value);
                $('#btnAdd').hide();
                $("#btnUpdate").show();


            }
            else {
                $('#btnAdd').show();
                $("#btnUpdate").hide();
            }
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
}
function UpdateAttrule() {


    var obj_attnrules = {

        TxnId: $('#hdnattn').val(),
        Tar_Ratio_NormalDay: $('#txtCuttDay').val(),
        Tar_Ratio_WeekDay: $('#txtOTWr').val(),
        Tar_Compoff: $('#CoffAllow').val(),
        Tar_leave_approve: $('#txtLeaveA').val(),
        Tar_OD_approve: $('#txtODA').val(),
        Tar_Earned_LeaveTyp: $('#ddl_earntype').val(),
        Tar_Earned_Value: $('#txtMonth').val()


    };
    $.ajax({
        url: "/Difrules/Update_AttnRules",
        type: "Post",
        data: JSON.stringify(obj_attnrules),

        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            loadData();

        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}
