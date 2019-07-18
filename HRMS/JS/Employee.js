$(document).ready(function () {

    getCountry();
    getState();
    getGroup();
    getDesignation();
    getShift();
    getRules();
    getDesignation_Reporting();
    $('.datepicker').datepicker();
    var error_Email = false;
    $('#spEmailValid').hide();
    $('#Secound').hide();
    $('#spPhoneValid').hide();
    $('#PreviousEx').hide();

    $('#chkAll').change(function () {        
        if ($("#tblAllowance tbody tr").length > 0) {
            for (var i = 1; i <= $("#tblAllowance tbody tr").length; i++) {
                if ($(this).prop("checked") == true) {
                    $("#tblAllowance tbody tr:nth-child(" + i + ") td:nth-child(2) .chkAllow").attr('checked', true);
                    $("#tblAllowance tbody tr:nth-child(" + i + ") td:nth-child(4) .ddlAllwType").removeAttr('disabled');
                    $("#tblAllowance tbody tr:nth-child(" + i + ") td:nth-child(5) .txtAmt").removeAttr('disabled');
                }
                else {
                    $("#tblAllowance tbody tr:nth-child(" + i + ") td:nth-child(2) .chkAllow").attr('checked', false);
                    $("#tblAllowance tbody tr:nth-child(" + i + ") td:nth-child(4) .ddlAllwType").attr('disabled', 'disabled');
                    $("#tblAllowance tbody tr:nth-child(" + i + ") td:nth-child(5) .txtAmt").attr('disabled', 'disabled');
                }
            }
        }
    });
    $("#userimage").change(function () {
        // $('.input-group.date').datepicker();
        var data = new FormData();
        alert(data);
        var files = $("#userimage").get(0).files;
        if (files.length > 0) {
            data.append("MyImages", files[0]);
        }

        $.ajax({
            url: "/Employee/UploadFile",
            type: "POST",
            processData: false,
            contentType: false,
            data: data,
            success: function (response) {
                //code after success
                var my_path = "/Images/Emp/" + response + "?";
                var d = new Date();
                $("#imgPreview").attr("src", my_path + d.getTime());
                //$("#imgPreview").attr('src', '/Images/User/' + response);
            },
            error: function (er) {
                alert(er);
            }

        });
    });

    $('#ddl_Type').change(function () {
        if ($(this).val() == "2") {
            $('#btnNext').show();
            $('#btnAdd').hide();
        }
        else {
            $('#btnAdd').show();
            $('#btnNext').hide();
        }
    });

    $('#ddl_Experience').change(function () {
        if ($(this).val() == "2") {
            $('#PreviousEx').show();

        }
        else {
            $('#PreviousEx').hide();
        }
    });

    $('#ddl_Group').change(function () {
        if ($(this).val() != "0") {

            getDivision();
            getAllowances($(this).val());
        }
    });

    $('#ddl_Division').change(function () {
        if ($(this).val() != "0") {

            getDepartment();
        }
    });

    //$('#ddl_Group').change(function () {
    //    var Id;
        
    //    Id = $('#ddl_Group').val();
    //    alert(Id);
    //    $.ajax({
    //        url: "/Payroll/Get_Dropdown/" + Id,
    //        type: "Post",
    //        contentType: "application/json;charset=utf-8",
    //        dataType: "json",
    //        success: function (r) {
    //            //$('#ddl_allowance').empty().append('<option selected="selected" value="0">Select</option>');
    //            //$.each(r, function (key, item) {
    //            //    $('#ddl_allowance').append($("<option></option>").val(item.Alw_Id).html(item.Alw_Name));
    //            //});
    //            //$('[id*=ddl_allowance]').multiselect({
    //            //    includeSelectAllOption: true

    //            //});
                
    //        }
    //    });

    //});
    $("[id*=txt_EmailID]").focusout(function () {


        $('#spEmail').css('display', 'none');
        $(this).css("border", "");
        if (!ValidateEmail($("[id*=txt_EmailID]").val())) {

            $('#spEmailValid').css('display', 'none');
            $(this).css("border", "1px solid red");

        }
    });

    function getAllowances(Id) {

        $.ajax({
            url: "/Payroll/Allowance_List/" + Id,
            type: "Get",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {               
                //$('#ddl_allowance').empty();
                //$.each(r, function (key, item) {
                //    $('#ddl_allowance').append($("<option></option>").val(item.Alw_Id).html(item.Alw_Name));
                //});
                //$('[id*=ddlBasedOn]').multiselect({
                //    includeSelectAllOption: true

                //});               
                var html = '';
                var i = 0;
                $.each(r, function (key, item) {                    
                    html += '<tr>';                    
                    html += '<td style="display:none">' + item.Alw_Id + '</td>';
                    html += '<td><input type="checkbox" id="chkAllow" class="chkAllow" onchange="f1(' + i + ', this)"></td>';
                    html += '<td>' + item.Alw_Name + '</td>';
                    html += '<td><select id="ddlAllwType" disabled="disabled" class="ddlAllwType"><option value="A">Amt</option><option value="P">%</option></select>'
                    html += "<td><input type='text' class='txtAmt' maxlength='8' disabled='disabled' class='txtAmt' style='width:80px' value='" + item.Alw_Val + "'></td>"                    
                    html += '</tr>';
                    $("#tblAllowance tbody tr:nth-child(" + i + ") td:nth-child(4) .ddlAllwType").val(item.Alw_Type);
                    i = i + 1;
                });
                $('.tbody').html(html);
            },
            error: function (errmsg) {
                alert(errmsg.responseText);
            }
        });
    }

    //$('#ddl_allowance').change(function () {
    //    var allowances = "";
    //    $('[id*=ddl_allowance] > option:selected').each(function () {
    //        allowances += $(this).val() + ',';
    //    });
    //    var obj_Allw = {           
    //        Alw_BasedOn: allowances

    //    };
    //    $.ajax({
    //        url: "/Employee/GetAllowances",
    //        type: "Post",
    //        contentType: "application/json;charset=utf-8",
    //        data: JSON.stringify(obj_Allw),
    //        dataType: "json",
    //        success: function (r) {
    //            $('#ddlBasedOn').empty();
    //            $.each(r, function (key, item) {
    //                $('#ddlBasedOn').append($("<option></option>").val(item.Alw_Id).html(item.Alw_Name));
    //            });
    //            $('[id*=ddlBasedOn]').multiselect({
    //                includeSelectAllOption: true

    //            });
    //        }
    //    });
    //})

    function getDivision() {

        var Id;
        Id = $('#ddl_Group').val();

        //var parm = { ID: ID };
        $.ajax({
            url: "/Master/GetDivision_GID/" + Id,
            type: "Post",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                $('#ddl_Division').empty().append('<option selected="selected" value="0">Select</option>');
                $.each(r, function (key, item) {
                    $('#ddl_Division').append($("<option></option>").val(item.DivisionId).html(item.DivisionName));
                });
                $('#btnNext').show();
                $('#btnAdd').hide();
            }
        });
    }

    function getDepartment() {
        var Id;
        Id = $('#ddl_Division').val();
       
        $.ajax({
            url: "/Master/GetDepartment_ID/" + Id,
            type: "Post",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                $('#ddl_Department').empty().append('<option selected="selected" value="0">Select</option>');
                $.each(r, function (key, item) {
                    $('#ddl_Department').append($("<option></option>").val(item.Department_Id).html(item.Department_Name));
                });
                $('#btnNext').show();
                $('#btnAdd').hide();
            }
        });
    }
});
function ValidateEmail(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
}



function getCountry() {
    $.ajax({
        url: "/Master/Country_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            $('#ddl_Country').empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r, function (key, item) {
                $('#ddl_Country').append($("<option></option>").val(item.CountryId).html(item.CountryName));
            });
        }
    });
}

function getState() {
    $.ajax({
        url: "/Master/State_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            $('#ddl_State').empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r, function (key, item) {
                $('#ddl_State').append($("<option></option>").val(item.StateId).html(item.StateName));
            });
        }
    });
}

function getGroup() {
    $.ajax({
        url: "/Master/Group_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            $('#ddl_Group').empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r, function (key, item) {
                $('#ddl_Group').append($("<option></option>").val(item.GroupId).html(item.GroupName));
            });
        }
    });
}

function getShift() {
    $.ajax({
        url: "/Attendance/GetShift_Details",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            $('#ddl_Shift').empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r, function (key, item) {
                $('#ddl_Shift').append($("<option></option>").val(item.ShiftID).html(item.ShiftName));
            });
        }
    });
}


function getRules() {
    $.ajax({
        url: "/Attendance/Get_Rules",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            $.each(r, function (key, item) {
                $('#ddl_Rules').append($("<option></option>").val(item.RulesID).html(item.RulesName));
            });
            $('[id*=ddl_Rules]').multiselect({
                includeSelectAllOption: true

            });
            $.each(r, function (key, item) {
                
                if (item.RulesName != "On Duties")
                    $("#ddl_Rules").val(item.RulesID);
            });
        }
    });
}


function getDesignation() {
    $.ajax({
        url: "/Master/Designation_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            $('#ddl_Designation').empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r, function (key, item) {
                $('#ddl_Designation').append($("<option></option>").val(item.DesignationId).html(item.DesignationName));
            });
        }
    });
}
function getDesignation_Reporting() {
    $.ajax({
        url: "/Master/Designation_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            $('#ddl_DesignationReport').empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r, function (key, item) {
                $('#ddl_DesignationReport').append($("<option></option>").val(item.DesignationId).html(item.DesignationName));
            });
            $('[id*=ddl_DesignationReport]').multiselect({
                includeSelectAllOption: true

            });
        }
    });
}

function NextAdd() {

    var res = validate();
    if (res == false) {

        return false;
    }
    else {
    $('#Secound').show();
    $('#first').hide();

    var obj_EmpIns = {

        Tei_Title: $('#ddl_Title').val(),
        Tei_FirstName: $('#txt_FirstName').val(),
        Tei_LastName: $('#txt_LastName').val(),
        Tei_Gender: $("input[name='gender']:checked").val(),
        Tei_Empno: $('#txt_emp').val(),
        Tei_Email: $('#txt_EmailID').val(),
        Tei_Type: $('#ddl_Type').val(),
        Tei_Address: $('#txt_Address').val(),
        Tei_Address1: $('#txt_Address1').val(),
        Tei_Father: $('#txt_FatherName').val(),
        Tei_DateofBirth: $('#txt_DOB').val(),
        Tei_JoiningDate: $('#txt_DOJ').val(),
        Tei_stateId: $('#ddl_State').val(),
        Tei_CountryId: $('#ddl_Country').val(),
        Tei_Phone: $('#txt_PhoneNo').val(),
        Tei_Email: $('#txt_EmailID').val(),
        Tei_AadharNo: $('txt_AadharNo').val()
    };

    $.ajax({
        url: "/Employee/Next_Employee",
        type: "Post",
        data: JSON.stringify(obj_EmpIns),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            var msg = r;            
            $('#hid').val(r.Tei_ID);
            $('#hid').val(msg);
            //loadData();
            //clearTextBox();
            //$('#MyModal').modal('hide');
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
     }
}

function Add() {

    var res = validate();
    if (res == false) {

        return false;
    }
    var obj_EmpIns = {

        Tei_Title: $('#ddl_Title').val(),
        Tei_FirstName: $('#txt_FirstName').val(),
        Tei_LastName: $('#txt_LastName').val(),
        Tei_Gender: $("input[name='gender']:checked").val(),
        Tei_Empno: $('#txt_emp').val(),
        Tei_Email: $('#txt_EmailID').val(),
        Tei_Type: $('#ddl_Type').val(),
        Tei_Address: $('#txt_Address').val(),
        Tei_Address1: $('#txt_Address1').val(),
        Tei_Photo: ($('#imgPreview').attr('src')),
        Tei_Father: $('#txt_FatherName').val(),
        Tei_DateofBirth: $('#txt_DOB').val(),
        Tei_JoiningDate: $('#txt_DOJ').val(),
        Tei_stateId: $('#ddl_State').val(),
        Tei_CountryId: $('#ddl_Country').val(),
        Tei_Phone: $('#txt_PhoneNo').val(),
        Tei_Email: $('#txt_EmailID').val(),


    };

    $.ajax({
        url: "/Employee/Insert_Employee",
        type: "Post",
        data: JSON.stringify(obj_EmpIns),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            loadData();
            clearTextBox();
            $('#MyModal').modal('hide');
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function f1(index, x) {    
    if ($(x).prop("checked") == true) {
        $("#tblAllowance tbody tr:nth-child(" + (index + 1) + ") td:nth-child(4) .ddlAllwType").removeAttr('disabled');
        $("#tblAllowance tbody tr:nth-child(" + (index + 1) + ") td:nth-child(5) .txtAmt").removeAttr('disabled');
    }
    else {
        $("#tblAllowance tbody tr:nth-child(" + (index + 1) + ") td:nth-child(4) .ddlAllwType").attr('disabled', 'disabled');
        $("#tblAllowance tbody tr:nth-child(" + (index + 1) + ") td:nth-child(5) .txtAmt").attr('disabled', 'disabled');
    }
}

function Forword() {

    $('#Third').show();
    $('#Secound').hide();
    $('#first').hide();
}
function Previous2() {
    
    $('#Third').hide();
    $('#Secound').hide();
    $('#first').show();
}

function Previous3() {

    $('#Third').hide();
    $('#Secound').show();
    $('#first').hide();
}


function getbyID(Id) {

    $("#txt_Location").css('border-color', 'lightngrey');
    $.ajax({
        url: "/Master/GetLocationByID/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {

            $('#hid').val(r.Tli_Id);
            $('#txt_Location').val(r.Tli_Name);
            $('#txt_Code').val(r.Tli_code);
            $('#txt_Address').val(r.Tli_Address);
            $('#txt_City').val(r.Tli_City);
            $('#txt_District').val(r.Tli_District);
            $('#txt_State').val(r.Tsi_Id);
            $('#ddl_Country').val(r.Tci_Id);
            $('#txt_PhoneNo').val(r.Tli_phoneno);
            var date = r.Tli_EstDate;
            var nowDate = new Date(parseInt(date.substr(6)));
            var Emp_Join_Date = "";
            Emp_Join_Date = nowDate;

            $('#datepicker').val(Emp_Join_Date);
            $('#txt_EmailID').val(r.Tli_EmailID);
            $('#txt_GST').val(r.Tli_GST);
            $('#txt_Tan').val(r.Tli_Tan);
            $('#txt_Pan').val(r.Tli_Pan_No);
            $('#txt_Website').val(r.Tli_Website)
            $('#MyModal').modal('show');
            $('#btnAdd').hide();
            $('#btnUpdate').show();
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
    return false;
}

function FinalAdd2() {
    var AllowanceId = "";
    var AllowanceValue = "";
    var AllowanceType = "";
    var Allowances = "";
    if ($("#tblAllowance tbody tr").length > 0) {
        for (var i = 1; i <= $("#tblAllowance tbody tr").length; i++) {
            if ($("#tblAllowance tbody tr:nth-child(" + i + ") td:nth-child(2) .chkAllow").prop("checked") == true) {
                AllowanceId =$("#tblAllowance tbody tr:nth-child(" + i + ") td:nth-child(1)").html();
                AllowanceValue = $("#tblAllowance tbody tr:nth-child(" + i + ") td:nth-child(4) .ddlAllwType").val();
                AllowanceType = $("#tblAllowance tbody tr:nth-child(" + i + ") td:nth-child(5) .txtAmt").val();
                Allowances += "|" + AllowanceId + "," + AllowanceValue + "," + AllowanceType;               
            }
        }
    }
}
function Update() {

    var res = validate();
    if (res == false) {

        return false;
    }

    var obj_locUpd = {

        Tei_Title: $('#ddl_Title').val(),
        Tei_FirstName: $('#txt_FirstName').val(),
        Tei_LastName: $('#txt_LastName').val(),
        Tei_Gender: $("input[name='gender']:checked").val(),
        Tei_Empno: $('#txt_emp').val(),
        Tei_Email: $('#txt_EmailID').val(),
        Tei_Type: $('#ddl_Type').val(),
        Tei_Address: $('#txt_Address').val(),
        Tei_Address1: $('#txt_Address1').val(),
        Tei_Photo: ($('#imgPreview').attr('src')),
        Tei_Father: $('#txt_FatherName').val(),
        Tei_DateofBirth: $('#txt_DOB').val(),
        Tei_JoiningDate: $('#txt_DOJ').val(),
        Tei_stateId: $('#ddl_State').val(),
        Tei_CountryId: $('#ddl_Country').val(),
        Tei_Phone: $('#txt_PhoneNo').val(),
        Tei_Email: $('#txt_EmailID').val(),

    };


    $.ajax({
        url: "/Master/Update_Location",
        type: "Post",
        data: JSON.stringify(obj_locUpd),

        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            loadData();
            $('#MyModal').modal('hide');
            clearTextBox();
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
};
function Delete(Id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Master/Delete_Location/" + Id,
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

function clearTextBox() {


    $('#ddl_Title').val('');
    $('#txt_FirstName').val('');
    $('#txt_LastName').val('');
    $('#txt_emp').val('');
    $('#txt_EmailID').val('');
    $('#ddl_Type').val('');
    $('#txt_Address').val('');
    $('#txt_Address1').val('');
    $('#txt_FatherName').val('');
    $('#txt_DOB').val('');
    $('#txt_DOJ').val('');
    $('#ddl_State').val('');
    $('#ddl_Country').val('');
    $('#txt_PhoneNo').val('');
    $('#txt_EmailID').val('');

}
function validate() {

    var isValid = true;

    $('[id*=ddl_Type],[id*=ddl_Title],[id*=txt_emp],[id*=txt_FirstName],[id*=txt_LastName], [id *= txt_DOJ], [id *= txt_PhoneNo], [id *= txt_DOB], [id *= txt_Address]').each(function () {
        if ($(this).length > 0) {
            if ($.trim($(this).val()) == '' || $.trim($(this).val()) == '0') {
                isValid = false;
                $(this).css("border", "1px solid red");
            }
            else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        }
    });
    if (isValid == false) {
        return false;
    }

    return isValid;
}


function validateNext() {

    var isValid = true;

    $('[id *= ddl_Group],[id *= ddl_Division],[id *= ddl_Department],[id *= ddl_Designation]').each(function () {
        if ($(this).length > 0) {
            if ($.trim($(this).val()) == '' || $.trim($(this).val()) == '0') {
                isValid = false;
                $(this).css("border", "1px solid red");
            }
            else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        }
    });
    if (isValid == false) {
        return false;
    }

    return isValid;
}

//function checkEmpID() {
//    if ($("[id*=txt_EmailID]").val() == '') {
//        $('#spEmailValid').show();
//        $(this).css("border", "1px solid red");
//        error_EmpID = true;
//    }
//    else {
//        $('#spEmailValid').hide();
//    }
//}
