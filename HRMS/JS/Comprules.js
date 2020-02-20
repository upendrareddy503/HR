$(document).ready(function () {

    loadData();


});
function AddComrule() {

    var obj_comprule = {
        Tcr_No_Lates_Month: $('#txtlates').val(),
        Tcr_No_Permission_Month: $('#txtpermission').val(),
        Tcr_No_Hours_Permission: $('#txtpermissionH').val(),
        Tcr_Ratio_Late: $('#txtsaldedr').val(),
        Tcr_Ratio_Absent: $('#txtsaldedabsn').val(),

    };
    $.ajax({
        url: "/Difrules/Insert_ComRules",
        type: "Post",
        data: JSON.stringify(obj_comprule),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            loadData();
            // clearTextBox();
            // $('#MyModal').modal('hide');
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}
function loadData() {
    $.ajax({
        url: "/Difrules/List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {

            if (r.TxnId != "" && r.TxnId != null && r.TxnId != '0') {
                $('#hdncomp').val(r.TxnId);
                $('#txtpermission').val(r.Tcr_No_Permission_Month);
                $('#txtpermissionH').val(r.Tcr_No_Hours_Permission);
                $('#txtsaldedr').val(r.Tcr_Ratio_Late);
                $('#txtsaldedabsn').val(r.Tcr_Ratio_Absent);
                $('#txtlates').val(r.Tcr_No_Lates_Month);
                $('#btnAddc').hide();
                $("#btnUpdate").show();
            }
            else {
                $('#btnAddc').show();
                $("#btnUpdate").hide();
            }
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
}
function UpdateComprule() {


    var obj_comprule = {

        TxnId: $('#hdncomp').val(),
        Tcr_No_Lates_Month: $('#txtlates').val(),
        Tcr_Ratio_Late: $('#txtsaldedr').val(),
        Tcr_Ratio_Absent: $('#txtsaldedabsn').val(),
        Tcr_No_Permission_Month: $('#txtpermission').val(),
        Tcr_No_Hours_Permission: $('#txtpermissionH').val()


    };
    $.ajax({
        url: "/Difrules/Update_CompRules",
        type: "Post",
        data: JSON.stringify(obj_comprule),

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
