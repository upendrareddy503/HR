$(document).ready(function () {


    getGroup();
    loadShift();
    $('.time').timepicker();
    $('#txt_OutTime').change(function () {
        if ($('#txt_InTime').val() != '') {
            if (ConvertTimeformat($('#txt_OutTime').val()) < ConvertTimeformat($('#txt_InTime').val())) {
                $('#sp_outtime').show().text('Out time should not be less than In time.');
                $('#txt_OutTime').val('').focus();
                
            }
            else {
                $('#sp_outtime').hide().text('');

                var valuein = $('#txt_InTime').val();
                var valueout = $('#txt_OutTime').val();

                //create date format          
                var timeStart = new Date("01/01/2007 " + valuein).getHours();
                var timeEnd = new Date("01/01/2007 " + valueout).getHours();

                var hourDiff = timeEnd - timeStart;
                $('#txt_Hours').val(hourDiff);
            }
        }
    });



    $('#txt_CutIn').change(function () {
        if ($('#txt_InTime').val() != '' && $('#txt_OutTime').val() != '') {
            if (ConvertTimeformat($('#txt_CutIn').val()) < ConvertTimeformat($('#txt_InTime').val())) {
                $('#sp_LateCutIn').show().text('Late cut time should not be less than In time.');
                $('#txt_CutIn').val('').focus();
            }
            else if (ConvertTimeformat($('#txt_CutIn').val()) > ConvertTimeformat($('#txt_OutTime').val())) {
                $('#sp_LateCutIn').show().text('Late cut time should not be greater than Out time.');
                $('#txt_CutIn').val('').focus();
            }
            else {
                $('#sp_LateCutIn').hide().text('');
            }
        }
    });


    $('#txt_ShiftCutOff').change(function () {
        if ($('#txt_InTime').val() != '' && $('#txt_OutTime').val() != '') {
            if (ConvertTimeformat($('#txt_ShiftCutOff').val()) < ConvertTimeformat($('#txt_InTime').val())) {
                $('#sp_ShiftCutOff').show().text('Shift cutoff time should not be less than In time.');
                $('#txt_ShiftCutOff').val('').focus();
            }
            else if (ConvertTimeformat($('#txt_ShiftCutOff').val()) > ConvertTimeformat($('#txt_OutTime').val())) {
                $('#sp_ShiftCutOff').show().text('Shift cutoff time should not be greater than Out time.');
                $('#txt_ShiftCutOff').val('').focus();
            }
            else {
                $('#sp_ShiftCutOff').hide().text('');
            }
        }
    });


    $('#txt_SecShiftIn').change(function () {
        if ($('#txt_InTime').val() != '' && $('#txt_OutTime').val() != '') {
            if (ConvertTimeformat($('#txt_SecShiftIn').val()) < ConvertTimeformat($('#txt_InTime').val())) {
                $('#sp_SecShiftIn').show().text('Second Shift In time should not be less than In time.');
                $('#txt_SecShiftIn').val('').focus();
            }
            else if (ConvertTimeformat($('#txt_SecShiftIn').val()) > ConvertTimeformat($('#txt_OutTime').val())) {
                $('#sp_SecShiftIn').show().text('Second Shift In time should not be greater than Out time.');
                $('#txt_SecShiftIn').val('').focus();
            }
            else {
                $('#sp_SecShiftIn').hide().text('');
            }
        }
    });


    $('#txt_SecShiftLateIn').change(function () {
        if ($('#txt_InTime').val() != '' && $('#txt_OutTime').val() != '') {
            if (ConvertTimeformat($('#txt_SecShiftLateIn').val()) < ConvertTimeformat($('#txt_InTime').val())) {
                $('#sp_SecShiftLateIn').show().text('Second Shift late In time should not be less than In time.');
                $('#txt_SecShiftLateIn').val('').focus();
            }
            else if (ConvertTimeformat($('#txt_SecShiftLateIn').val()) > ConvertTimeformat($('#txt_OutTime').val())) {
                $('#sp_SecShiftLateIn').show().text('Second Shift late In time should not be greater than Out time.');
                $('#txt_SecShiftLateIn').val('').focus();
            }

            else if ($('#txt_SecShiftIn').val() != '' && ConvertTimeformat($('#txt_SecShiftLateIn').val()) < ConvertTimeformat($('#txt_SecShiftIn').val())) {
                $('#sp_SecShiftLateIn').show().text('Second Shift late In time should not be less than second shift In time.');
                $('#txt_SecShiftLateIn').val('').focus();
            }
            else {
                $('#sp_SecShiftLateIn').hide().text('');
            }
        }
    });


    $('#txt_SecShiftCutOff').change(function () {
        if ($('#txt_InTime').val() != '' && $('#txt_OutTime').val() != '') {
            if (ConvertTimeformat($('#txt_SecShiftCutOff').val()) < ConvertTimeformat($('#txt_InTime').val())) {
                $('#sp_SecShiftCutOff').show().text('Second Shift Cutoff In time should not be less than In time.');
                $('#txt_SecShiftCutOff').val('').focus();
            }
            else if (ConvertTimeformat($('#txt_SecShiftCutOff').val()) > ConvertTimeformat($('#txt_OutTime').val())) {
                $('#sp_SecShiftCutOff').show().text('Second Shift Cutoff In time should not be greater than Out time.');
                $('#txt_SecShiftCutOff').val('').focus();
            }

            else if ($('#txt_SecShiftIn').val() != '' && ConvertTimeformat($('#txt_SecShiftLateIn').val()) < ConvertTimeformat($('#txt_SecShiftIn').val())) {
                $('#sp_SecShiftCutOff').show().text('Second Shift Cutoff In time should not be less than second shift In time.');
                $('#txt_SecShiftCutOff').val('').focus();
            }
            else {
                $('#sp_SecShiftCutOff').hide().text('');
            }
        }
    });



    $('#txt_OTBShift').change(function () {
        if ($('#txt_InTime').val() != '') {
            if (ConvertTimeformat($('#txt_OTBShift').val()) > ConvertTimeformat($('#txt_InTime').val())) {
                $('#sp_OTBShift').show().text('OT before shift should not be greater than In time.');
                $('#txt_OTBShift').val('').focus();

            }
            else {
                $('#sp_OTBShift').hide().text('');
            }
        }
    });


    $('#txt_OTAShift').change(function () {
        if ($('#txt_OutTime').val() != '') {
            if (ConvertTimeformat($('#txt_OTAShift').val()) < ConvertTimeformat($('#txt_OutTime').val())) {
                $('#sp_OTAShift').show().text('OT After Shift should not be less than Out time.');
                $('#txt_OTAShift').val('').focus();

            }
            else {
                $('#sp_OTAShift').hide().text('');
            }
        }
    });

  

});

function ConvertTimeformat(str) {

    var time = str;
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);

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

function loadShift() {

    $.ajax({
        url: "/Attendance/Shift_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#tblshiftmaster").dataTable({
                data: data,
                "bDestroy": true,
                columns: [
                    {
                        "title": "Sl. No."
                    },
                    //{
                    //    "data": "GroupName"
                    //},
                    { "data": "ShiftName" },
                    { "data": "ShiftCode" },
                    {
                        "data": "ShiftID",
                        "render": function (ShiftID) {
                            return '<div class="dropdown dropdown-action" align="Right"><a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#" data-toggle="modal" data-target="#add_indicator" onclick="GetID(' + ShiftID + ')"><i class="fa fa-pencil m-r-5"></i>Edit</a><a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_Shift" onclick="Deleted(' + ShiftID + ')"><i class="fa fa-trash-o m-r-5"></i> Delete</a></div></div>'
                        }
                    }
                ],
                "columnDefs": [{
                    "render": function (data, type, full, meta) {
                        dataSet[meta.row].id = meta.row + 1; // adds id to dataset
                        return meta.row + 1; // adds id to serial no
                    },
                    "targets": 0
                }],
            })


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
    var res = validate();
    if (res == false) {

        return false;
    }
    var ShiftInTime = ConvertTimeformat($('[id*=txt_InTime]').val());
    var ShiftLateInCutTime = ConvertTimeformat($('[id*=txt_CutIn]').val());
    var ShiftInCutTime = ConvertTimeformat($('[id*=txt_ShiftCutOff]').val());
    var SecShiftInTime = ConvertTimeformat($('[id*=txt_SecShiftIn]').val());
    var SecShiftLateInTime = ConvertTimeformat($('[id*=txt_SecShiftLateIn]').val());
    var SecShiftInCutTime = ConvertTimeformat($('[id*=txt_SecShiftCutOff]').val());
    var ShiftOutTime = ConvertTimeformat($('[id*=txt_OutTime]').val());
    var ShiftOTBefore = ConvertTimeformat($('[id*=txt_OTBShift]').val());
    var ShiftOTAfter = ConvertTimeformat($('[id*=txt_OTAShift]').val());
    var TotalHours = $('[id*=txt_Hours]').val();
    var obj_Shift = {
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
        url: "/Attendance/Insert_Shift",
        type: "Post",
        data: JSON.stringify(obj_Shift),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function () {
            loadShift();
            clear_Shift();
            //$('#MyModal').modal('hide');
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function DeleteShift() {
    var Id = $('#hdnShiftId').val();
        $.ajax({
            url: "/Attendance/Delete_Shift/" + Id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadShift();
                $('#hdnShiftId').val('');
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    
}

function GetID(Id) {
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

            var ShiftLateInCutTime = hours_am_pm(r.ShiftLateInCutTime);
            var ShiftInCutTime = hours_am_pm(r.ShiftInCutTime);
            var SecShiftInTime = hours_am_pm(r.SecShiftInTime);
            var SecShiftLateInTime = hours_am_pm(r.SecShiftLateInTime);
            var SecShiftInCutTime = hours_am_pm(r.SecShiftInCutTime);
            var ShiftOutTime = hours_am_pm(r.ShiftOutTime);
            var ShiftOTBefore = hours_am_pm(r.ShiftOTBefore);
            var ShiftOTAfter = hours_am_pm(r.ShiftOTAfter);
            var TotalHours = r.TotalHours;
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
    var res = validate();
    if (res == false) {

        return false;
    }
    var ShiftInTime = ConvertTimeformat($('[id*=txt_InTime]').val());
    var ShiftLateInCutTime = ConvertTimeformat($('[id*=txt_CutIn]').val());
    var ShiftInCutTime = ConvertTimeformat($('[id*=txt_ShiftCutOff]').val());
    var SecShiftInTime = ConvertTimeformat($('[id*=txt_SecShiftIn]').val());
    var SecShiftLateInTime = ConvertTimeformat($('[id*=txt_SecShiftLateIn]').val());
    var SecShiftInCutTime = ConvertTimeformat($('[id*=txt_SecShiftCutOff]').val());
    var ShiftOutTime = ConvertTimeformat($('[id*=txt_OutTime]').val());
    var ShiftOTBefore = ConvertTimeformat($('[id*=txt_OTBShift]').val());
    var ShiftOTAfter = ConvertTimeformat($('[id*=txt_OTAShift]').val());
    var TotalHours = $('[id*=txt_Hours]').val();
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
            loadShift();
            clear_Shift()();

            //$('#MyModal').modal('hide');
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}
function clear_Shift() {
    $("input:text").val("");
    $('#ddl_EmpGroup').val('0');
    $('#hdnShiftId').val('');

    $('#btnAdd').show();
    $('#btnUpdate').hide();
}


function validate() {

    var isValid = true;
    if ($('#txt_ShiftName').val().trim() == "") {
        $('#txt_ShiftName').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#txt_ShiftName').css('border-color', 'lightgrey');
    }

    if ($('#txt_ShiftCode').val().trim() == "") {
        $('#txt_ShiftCode').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#txt_ShiftCode').css('border-color', 'lightgrey');
    }
    if ($('#txt_InTime').val().trim() == "") {
        $('#txt_InTime').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#txt_InTime').css('border-color', 'lightgrey');
    }
    if ($('#txt_CutIn').val().trim() == "") {
        $('#txt_CutIn').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#txt_CutIn').css('border-color', 'lightgrey');
    }
    if ($('#txt_ShiftCutOff').val().trim() == "") {
        $('#txt_ShiftCutOff').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#txt_ShiftCutOff').css('border-color', 'lightgrey');
    }

    if ($('#txt_SecShiftIn').val().trim() == "") {
        $('#txt_SecShiftIn').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#txt_SecShiftIn').css('border-color', 'lightgrey');
    }

    if ($('#txt_SecShiftLateIn').val().trim() == "") {
        $('#txt_SecShiftLateIn').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#txt_SecShiftLateIn').css('border-color', 'lightgrey');
    }

    if ($('#txt_SecShiftCutOff').val().trim() == "") {
        $('#txt_SecShiftCutOff').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#txt_SecShiftCutOff').css('border-color', 'lightgrey');
    }

    if ($('#txt_OutTime').val().trim() == "") {
        $('#txt_OutTime').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#txt_OutTime').css('border-color', 'lightgrey');
    }

    if ($('#txt_OTBShift').val().trim() == "") {
        $('#txt_OTBShift').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#txt_OTBShift').css('border-color', 'lightgrey');
    }
    if ($('#txt_OTAShift').val().trim() == "") {
        $('#txt_OTAShift').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#txt_OTAShift').css('border-color', 'lightgrey');
    }

    if ($('#txt_Hours').val().trim() == "") {
        $('#txt_Hours').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#txt_Hours').css('border-color', 'lightgrey');
    }

    if ($('#ddl_EmpGroup').val().trim() == "0") {
        $('#ddl_EmpGroup').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#ddl_EmpGroup').css('border-color', 'lightgrey');
    }
    return isValid;
}

function Deleted(Id) {

    $('#hdnShiftId').val(Id);
    //var ans = confirm(errormessage.responseText);

}