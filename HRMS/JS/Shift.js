$(document).ready(function () {
    getGroup();
    loadData();
    $('.time').timepicker(); 
});

function ConvertTimeformat(str) {
    alert(str);
    var time = str;
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    alert(minutes);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    var TotalHours = sHours + ":" + sMinutes;
    return TotalHours;    
}

function hours_am_pm(time) {
    alert(time);
    //var hours = time[0] + time[1];
    //var min = time[2] + time[3];
    //if (hours < 12) {
    //    return hours + ':' + min + ' AM';
    //} else {
    //    hours = hours - 12;
    //    //hours = (hours.length < 10) ? '0' + hours : hours;
    //    if (hours.length < 10) {
    //        hours = '0' + hours;
    //    }
    //    return hours + ':' + min + ' PM';
    //}

    var ts = time;
    var H = +ts.substr(0, 2);
    var h = (H % 12) || 12;
    h = (h < 10) ? ("0" + h) : h;  // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
    alert(ts);
}

function loadData() {
    $.ajax({
        url: "/Attendance/Shift_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            var html = '';
            var i = 1;
            $.each(r, function (key, item) {
                html += '<tr>';
                html += '<td>' + parseInt(i) + '</td>';
                html += '<td>' + item.ShiftName + '</td>';
                html += '<td>' + item.ShiftCode + '</td>';
                html += '<td><a href="#"  onclick="getbyID(' + item.ShiftID + ')">Edit</a>|<a href="#" onclick="DeleteDivision(' + item.ShiftID + ')">Delete</a></td > ';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
}
function getGroup() {    
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
    var ShiftInTime = ConvertTimeformat($('[id*=txt_InTime]').val());
    var ShiftLateInCutTime = ConvertTimeformat($('[id*=txt_CutIn]').val());
    var ShiftInCutTime = ConvertTimeformat($('[id*=txt_ShiftCutOff]').val());
    var SecShiftInTime = ConvertTimeformat($('[id*=txt_SecShiftIn]').val());
    var SecShiftLateInTime = ConvertTimeformat($('[id*=txt_SecShiftLateIn]').val());
    var SecShiftInCutTime = ConvertTimeformat($('[id*=txt_SecShiftCutOff]').val());
    var ShiftOutTime = ConvertTimeformat($('[id*=txt_OutTime]').val());
    var ShiftOTBefore = ConvertTimeformat($('[id*=txt_OTBShift]').val());
    var ShiftOTAfter = ConvertTimeformat($('[id*=txt_OTAShift]').val());
    var TotalHours = ConvertTimeformat($('[id*=txt_Hours]').val());    
    var obj_Shift = {
        GroupId: $('#ddl_EmpGroup').val(),
        ShiftName: $('[id*=txt_ShiftName]').val(),
        ShiftCode: $('[id*=txt_ShiftCode]').val(),
        ShiftInTime: ShiftInTime ,
        ShiftLateInCutTime: ShiftLateInCutTime,
        ShiftInCutTime: ShiftInCutTime,
        SecShiftInTime: SecShiftInTime,
        SecShiftLateInTime: SecShiftLateInTime,
        SecShiftInCutTime: SecShiftInCutTime,
        ShiftOutTime: ShiftOutTime,
        ShiftOTBefore: ShiftOTBefore,
        ShiftOTAfter: ShiftOTAfter,
        TotalHours: TotalHours
    };
    $.ajax({
        url: "/Attendance/Insert_Shift",
        type: "Post",
        data: JSON.stringify(obj_Shift),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function () {
            loadData();
            clearTextBox();
            //$('#MyModal').modal('hide');
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function DeleteDivision(Id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Attendance/Delete_Shift/" + Id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function getbyID(Id) {   
    $.ajax({
        url: "/Attendance/GetShiftByID/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            $('#hdnShiftId').val(r.ShiftID);
            $('#ddl_EmpGroup').val(r.GroupId);
            $('#txt_ShiftName').val(r.ShiftName);
            $('#txt_ShiftCode').val(r.ShiftCode);

            var ShiftInTime = hours_am_pm(r.ShiftInTime);
            alert(ShiftInTime);
            var ShiftLateInCutTime = hours_am_pm(r.ShiftLateInCutTime);
            var ShiftInCutTime = hours_am_pm(r.ShiftInCutTime);
            var SecShiftInTime = hours_am_pm(r.SecShiftInTime);
            var SecShiftLateInTime = hours_am_pm(r.SecShiftLateInTime);
            var SecShiftInCutTime = hours_am_pm(r.SecShiftInCutTime);
            var ShiftOutTime = hours_am_pm(r.ShiftOutTime);
            var ShiftOTBefore = hours_am_pm(r.ShiftOTBefore);
            var ShiftOTAfter = hours_am_pm(r.ShiftOTAfter);
            var TotalHours = hours_am_pm(r.TotalHours);
            $('[id*=txt_InTime]').val(ShiftInTime);
            $('[id*=txt_CutIn]').val(ShiftLateInCutTime);
            $('[id*=txt_ShiftCutOff]').val(ShiftInCutTime);
            $('[id*=txt_SecShiftIn]').val(SecShiftInTime);
            $('[id*=txt_SecShiftLateIn]').val(SecShiftLateInTime);
            $('[id*=txt_SecShiftCutOff]').val(SecShiftInCutTime);
            $('[id*=txt_OutTime]').val(ShiftOutTime);
            $('[id*=txt_OTBShift]').val(ShiftOTBefore);
            $('[id*=txt_OTAShift]').val(ShiftOTAfter);
            $('[id*=txt_Hours]').val(TotalHours); 

            
            $('#btnAdd').hide();
            $('#btnUpdate').show();
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
    return false;
}

function UpdateShift() {
    var ShiftInTime = ConvertTimeformat($('[id*=txt_InTime]').val());
    var ShiftLateInCutTime = ConvertTimeformat($('[id*=txt_CutIn]').val());
    var ShiftInCutTime = ConvertTimeformat($('[id*=txt_ShiftCutOff]').val());
    var SecShiftInTime = ConvertTimeformat($('[id*=txt_SecShiftIn]').val());
    var SecShiftLateInTime = ConvertTimeformat($('[id*=txt_SecShiftLateIn]').val());
    var SecShiftInCutTime = ConvertTimeformat($('[id*=txt_SecShiftCutOff]').val());
    var ShiftOutTime = ConvertTimeformat($('[id*=txt_OutTime]').val());
    var ShiftOTBefore = ConvertTimeformat($('[id*=txt_OTBShift]').val());
    var ShiftOTAfter = ConvertTimeformat($('[id*=txt_OTAShift]').val());
    var TotalHours = ConvertTimeformat($('[id*=txt_Hours]').val()); 
    var obj_Shift = {
        ShiftID: $('#hdnShiftId').val(),
        GroupId: $('#ddl_EmpGroup').val(),
        ShiftName: $('[id*=txt_ShiftName]').val(),
        ShiftCode: $('[id*=txt_ShiftCode]').val(),
        ShiftInTime: ShiftInTime,
        ShiftLateInCutTime: ShiftLateInCutTime,
        ShiftInCutTime: ShiftInCutTime,
        SecShiftInTime: SecShiftInTime,
        SecShiftLateInTime: SecShiftLateInTime,
        SecShiftInCutTime: SecShiftInCutTime,
        ShiftOutTime: ShiftOutTime,
        ShiftOTBefore: ShiftOTBefore,
        ShiftOTAfter: ShiftOTAfter,
        TotalHours: TotalHours
    };
    $.ajax({
        url: "/Attendance/Update_Shift",
        type: "Post",
        data: JSON.stringify(obj_Shift),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function () {
            loadData();
            clearTextBox();
            
            //$('#MyModal').modal('hide');
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}
function clearTextBox() {
    $("input:text").val("");
    $('#ddl_EmpGroup').val('0');
    $('#hdnShiftId').val('');

    $('#btnAdd').show();
    $('#btnUpdate').hide();
}