$(document).ready(function () {
    getGroup();
});
function getGroup() {
    alert('jf');
    $.ajax({
        url: "/Group/List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            $('#ddl_EmpGroup').empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r, function (key, item) {
                $('#ddl_EmpGroup').append($("<option></option>").val(item.GroupId).html(item.GroupName));
            });
        }
    });
}
function AddShift() {
    var obj_Shift = {
        GroupId: $('#ddl_EmpGroup').val(),
        ShiftName: $('#txt_ShiftName').val(),
        ShiftCode: $('#txt_ShiftCode').val(),
        ShiftInTime: $('#txt_InTime').val(),
        ShiftLateInCutTime: $('#txt_CutIn').val(),
        ShiftInCutTime: $('#txt_ShiftCutOff').val(),
        SecShiftInTime: $('#txt_SecShiftIn').val(),
        SecShiftLateInTime: $('#txt_SecShiftLateIn').val(),
        SecShiftInCutTime: $('#txt_SecShiftCutOff').val(),
        ShiftOutTime: $('#txt_OutTime').val(),
        ShiftOTBefore: $('#txt_OTBShift').val(),
        ShiftOTAfter: $('#txt_OTAShift').val(),
        TotalHours: $('#txt_Hours').val()
    };
    $.ajax({
        url: "/Attendance/Insert_Shift",
        type: "Post",
        data: JSON.stringify(obj_Shift),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function () {
            //loadData();
            //clearTextBox();
            //$('#MyModal').modal('hide');
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}