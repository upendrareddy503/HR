﻿
$(document).ready(function () {

    getCountry();
    getState();
    getGroup();
    getDesignation();
    
   // getDepartment();
    getShift();
    getRules();   
    $('.datepicker').datepicker();  
    $('#spEmailValid').hide();
    $('#Second').hide();
    $('#spPhoneValid').hide();
    $('#PreviousEx').hide();
    $('#PreviousEx1').hide();
    //$('[id*=ddl_ReportingTo]').multiselect();
    $('[id*=ddl_ReportingTo]').multiselect({
        includeSelectAllOption: true

    });
    $('[id*=ddl_allowance]').multiselect({
        includeSelectAllOption: true

    });
    
    $('[id*=ddl_WeekOff]').multiselect({
        includeSelectAllOption: true
    });
    $('#txt_emp').change(function () {
        var emp = $('#txt_emp');
        var Id = emp.val();
        $.ajax({
            url: "/Employee/Get_EmpID/" + Id,
            type: "Post",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                if (parseInt(r) >= 1) {
                    $('#spEmpCode').show();
                    emp.val('').focus();
                    emp.css("border", "1px solid red");
                }
                else {
                    $('#spEmpCode').hide();
                    emp.css("border", "");
                }
            }
        });
    });
    $('#txt_PhoneNo').change(function () {
        var emp = $('#txt_PhoneNo');
        var Id = emp.val();
        $.ajax({
            url: "/Employee/Get_EmpPhone/" + Id,
            type: "Post",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                if (parseInt(r) >= 1) {
                    $('#spEmpPhone').show();
                    emp.val('').focus();
                    emp.css("border", "1px solid red");
                }
                else {
                    $('#spEmpPhone').hide();
                    emp.css("border", "");
                }
            }
        });
    });
    $("#userimage").change(function () {
        // $('.input-group.date').datepicker();
        var data = new FormData();        
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
                $("#imgPreview").width("100px");
                $("#imgPreview").height("100px");
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
            $('#PreviousEx1').show();

        }
        else {
            $('#PreviousEx').hide();
            $('#PreviousEx1').hide();
        }
    });

    //$('#ddl_Division').change(function () {
    //    if ($(this).val() != "0") {

    //        getDepartment();
    //    }
    //});

    $('#ddl_Group').change(function () {
        if ($(this).val() != '0') {
            var Id;

            Id = $(this).val();
            getDepartment(Id);
            
            getALLowanceByGroup(Id);
        }

    });

    
    $("[id*=txt_EmailID]").change(function () {


       
        $(this).css("border", "");
        if (!validateEmail($("[id*=txt_EmailID]").val())) {

            $('#spEmailValid').show();
            $('#spEmpEmail').hide();
            $(this).css("border", "1px solid red").focus();            
        }
        else {
            $('#spEmailValid').hide();
            $(this).css("border", "");
            var emp = $('#txt_EmailID');            
            var obj_EmpIns = { Tei_Email:emp.val() };
            $.ajax({
                url: "/Employee/Get_Email/",
                type: "Post",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify(obj_EmpIns),
                dataType: "json",
                success: function (r) {
                    if (parseInt(r) >= 1) {
                        $('#spEmpEmail').show();
                        emp.val('').focus();
                        emp.css("border", "1px solid red");
                    }
                    else {
                        $('#spEmpEmail').hide();
                        emp.css("border", "");
                    }
                }
            });
        }
    });

    $('#ddl_DesignationReport').change(function () {
        var Id;

        Id = $('#ddl_DesignationReport').val();
        
        getDesignationReport(Id);

    });
    
    //function getDivision() {

    //    var Id;
    //    Id = $('#ddl_Group').val();

    //    //var parm = { ID: ID };
    //    $.ajax({
    //        url: "/Master/GetDivision_GID/" + Id,
    //        type: "Post",
    //        contentType: "application/json;charset=utf-8",
    //        dataType: "json",
    //        success: function (r) {
    //            $('#ddl_Division').empty().append('<option selected="selected" value="0">Select</option>');
    //            $.each(r, function (key, item) {
    //                $('#ddl_Division').append($("<option></option>").val(item.DivisionId).html(item.DivisionName));
    //            });
    //            $('#btnNext').show();
    //            $('#btnAdd').hide();
    //        }
    //    });
    //}

    //function getDepartment() {
    //    var Id;
    //    Id = $('#ddl_Division').val();
       
    //    $.ajax({
    //        url: "/Master/GetDepartment_ID/" + Id,
    //        type: "Post",
    //        contentType: "application/json;charset=utf-8",
    //        dataType: "json",
    //        success: function (r) {
    //            $('#ddl_Department').empty().append('<option selected="selected" value="0">Select</option>');
    //            $.each(r, function (key, item) {
    //                $('#ddl_Department').append($("<option></option>").val(item.Department_Id).html(item.Department_Name));
    //            });
    //            $('#btnNext').show();
    //            $('#btnAdd').hide();
    //        }
    //    });
    //}
});
   
function getDesignationReport(Id) {
    $.ajax({
        url: "/Employee/Get_DesignationReport/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (r) {
            $('#ddl_ReportingTo').empty();
            $.each(r, function (key, item) {
                $('#ddl_ReportingTo').append($("<option></option>").val(item.Tei_Id).html(item.Tei_FirstName));

            });

            $('#ddl_ReportingTo').multiselect('rebuild');


        }
    });
}
function getDepartment(Id) {
    $.ajax({
        url: "/EmployeeRules/GetDepartment/" + Id,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (r) {
            $('#ddl_Department').empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r, function (key, item) {
                $('#ddl_Department').append($("<option></option>").val(item.Department_Id).html(item.Department_Name));
            });
        }
    });
}
function getALLowanceByGroup(Id) {
    $.ajax({
        url: "/Payroll/Allowance_List/" + Id,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (r) {
            $('#ddl_allowance').empty();
            $.each(r, function (key, item) {
                $('#ddl_allowance').append($("<option></option>").val(item.Alw_Id).html(item.Alw_Name));

            });

            $('#ddl_allowance').multiselect('rebuild');          

        }
    });
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
            //$.each(r, function (key, item) {
                
            //    if (item.RulesName != "On Duties")
            //        $("#ddl_Rules").val(item.RulesID);
            //});
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
            $('#ddl_DesignationReport').empty();
            $.each(r, function (key, item) {
                $('#ddl_Designation').append($("<option></option>").val(item.DesignationId).html(item.DesignationName));
                $('#ddl_DesignationReport').append($("<option></option>").val(item.DesignationId).html(item.DesignationName));
            });
            $('[id*=ddl_DesignationReport]').multiselect({
                includeSelectAllOption: true

            });
        }
    });
}


function NextAdd() {

    var res = validateFirst();
    if (res == false) {

        return false;
    }
    var old_Company = "";
    var Prev_Disig = "";
    var Prev_Exp = "";
    var Reg_Date = "";
    var Prev_CTC = "";
    if ($('#ddl_Experience').val() == '2') {
        old_Company = $('#txt_CompanyName').val();
        Prev_Disig = $('#txt_PreviousDeg').val();
        Prev_Exp = $('#txt_Noofyears').val();
        Reg_Date = $('#txt_ResDate').val();
        Prev_CTC = $('#txt_SalaryCTC').val();
    }
    var obj_EmpNxt = {

        Tei_Title: $('#ddl_Title').val(),
        Tei_FirstName: $('#txt_FirstName').val(),
        Tei_LastName: $('#txt_LastName').val(),
        Tei_Gender: $("input[name='gender']:checked").val(),
        Tei_Empno: $('#txt_emp').val(),
        Tei_Email: $('#txt_EmailID').val(),
        Tei_Type: $('#ddl_Type').val(),
        Tei_Address1: $('#txt_Address').val(),
        Tei_Address2: $('#txt_Address1').val(),
        Tei_Photo: ($('#imgPreview').attr('src')),
        Tei_Father: $('#txt_FatherName').val(),
        Tei_DateofBirth: $('#txt_DOB').val(),
        Tei_JoiningDate: $('#txt_DOJ').val(),
        Tei_stateId: $('#ddl_State').val(),
        Tei_CountryId: $('#ddl_Country').val(),
        Tei_Phone: $('#txt_PhoneNo').val(),
        Tei_AadharNo: $('#txt_AadharNo').val(),
        Tei_TypeofExpe: $('#ddl_Experience').val(),
        Tei_BloodGroup: $('#ddl_BloodGroup').val(),
        Tei_Old_Company: old_Company,
        Tei_prev_Disig: Prev_Disig,
        Tei_Prev_Exp: Prev_Exp,
        Tegi_Region_Date: Reg_Date,
        Tegi_Prev_CTC: Prev_CTC,
        Tei_Id: $('#hid').val()
    };

    $.ajax({
        url: "/Employee/Next_Employee",
        type: "Post",
        data: JSON.stringify(obj_EmpNxt),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            
            $('#hid').val(r);

            $('#first').hide();
            $('#Second').show();
            //loadData();
            //clearTextBox();
            //$('#MyModal').modal('hide');
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
     
}




function AddTemp() {
    
    var res = validate();
    if (res == false) {

        return false;
    }
    var old_Company = "";
    var Prev_Disig = "";
    var Prev_Exp = "";
    var Reg_Date = "";
    var Prev_CTC = "";
    if ($('#ddl_Experience').val() == '2') {
        old_Company= $('#txt_CompanyName').val();
        Prev_Disig = $('#txt_PreviousDeg').val();
        Prev_Exp = $('#txt_Noofyears').val();
        Reg_Date = $('#txt_ResDate').val();
        Prev_CTC = $('#txt_SalaryCTC').val();
    }
    var obj_EmpIns = {

        Tei_Title: $('#ddl_Title').val(),
        Tei_FirstName: $('#txt_FirstName').val(),
        Tei_LastName: $('#txt_LastName').val(),
        Tei_Gender: $("input[name='gender']:checked").val(),
        Tei_Empno: $('#txt_emp').val(),
        Tei_Email: $('#txt_EmailID').val(),
        Tei_Type: $('#ddl_Type').val(),
        Tei_Address1: $('#txt_Address').val(),
        Tei_Address2: $('#txt_Address1').val(),
        Tei_Photo: ($('#imgPreview').attr('src')),
        Tei_Father: $('#txt_FatherName').val(),
        Tei_DateofBirth: $('#txt_DOB').val(),
        Tei_JoiningDate: $('#txt_DOJ').val(),
        Tei_stateId: $('#ddl_State').val(),
        Tei_CountryId: $('#ddl_Country').val(),
        Tei_Phone: $('#txt_PhoneNo').val(),
        Tei_AadharNo: $('#txt_AadharNo').val(),
        Tei_TypeofExpe: $('#ddl_Experience').val(),
        Tei_BloodGroup: $('#ddl_BloodGroup').val(),
        Tei_Old_Company: old_Company,
        Tei_prev_Disig: Prev_Disig,
        Tei_Prev_Exp: Prev_Exp,
        Tegi_Region_Date: Reg_Date,
        Tegi_Prev_CTC: Prev_CTC        
    };

    $.ajax({
        url: "/Employee/Insert_Employee",
        type: "Post",
        data: JSON.stringify(obj_EmpIns),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            //loadData();
            clearEmp();
            //$('#MyModal').modal('hide');
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}


function Forword() {
   
    var res = validateSec();
    if (res == false) {

        return false;
    }
    var Rules = "";
    $('[id*=ddl_Rules] > option:selected').each(function () {
        Rules += $(this).val() + ',';
    });
    var ReportingTo = "";
    $('[id*=ddl_ReportingTo] > option:selected').each(function () {
        ReportingTo += $(this).val() + ',';
    });
    var DesignationReport = "";
    $('[id*=ddl_DesignationReport] > option:selected').each(function () {
        DesignationReport += $(this).val() + ',';
    });
    var WeekOff = "";
    $('[id*=ddl_WeekOff] > option:selected').each(function () {
        WeekOff += $(this).val() + ',';
    });
    var obj_EmpIns = {
        Tei_Id: $('#hid').val(),
        Tegi_Shift_Group: $('#ddl_Shift').val(),
        Tegi_GroupId: $('#ddl_Group').val(),
        //Tegi_DivisionId: $('#ddl_Division').val(),
        Tegi_DepartmentId: $('#ddl_Department').val(),
        Tegi_DesignationId: $('#ddl_Designation').val(),
        Tei_PfNo: $('#txt_PfNo').val(),
        Tei_EsiNo: $('#txt_ESno').val(),
        Tegi_Weekoff: WeekOff,
        Tegi_ReportingLevel: ReportingTo,
        Tegi_DesignationReport: DesignationReport,
        Tegi_UANNumber: $('#txt_UANNumber').val(),
        Tegi_PF_Type: $('#ddl_PFType').val(),
        Tegi_Emp_Rules: Rules,
        Tegi_Grade: $('#ddl_Grade').val(),
    };

    $.ajax({
        url: "/Employee/Second_Employee",
        type: "Post",
        data: JSON.stringify(obj_EmpIns),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {

            //$('#hid').val(r);
            $('#Third').show();
            $('#Second').hide();
            $('#first').hide();
            //loadData();
            //clearTextBox();
            //$('#MyModal').modal('hide');
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function validateSec() {
    var isValid = true;
    $('.validateSec').each(function () {
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
    });
    return isValid;
}

function FinalAdd2() {
    var Allowances = "";
    $('[id*=ddl_allowance] > option:selected').each(function () {
            Allowances += $(this).val() + ',';
        });
    var obj_EmpIns = {
        Tei_Id: $('#hid').val(),
        Tes_Sal_CTC: $('#ddl_SalaryType').val(),
        Tes_Sal: $('#txt_Salary').val(),
        Tes_Sal_Efctive_Date: $('#txt_SalEffectivedate').val(),
        Tea_Allowance_Type: Allowances
    }
    $.ajax({
        url: "/Employee/Third_Employee",
        type: "Post",
        data: JSON.stringify(obj_EmpIns),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {

            //$('#hid').val(r);
            $('#Third').show();
            $('#Second').hide();
            $('#first').hide();
            //loadData();
            //clearTextBox();
            //$('#MyModal').modal('hide');
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}


function Previous2() {
    
    $('#Third').hide();
    $('#Second').hide();
    $('#first').show();
}

function Previous3() {

    $('#Third').hide();
    $('#Second').show();
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
function Update() {

    var res = validateFirst();
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
            clearEmp();
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

function clearEmp() {


    $('#ddl_Title').val('0');
    $('#txt_FirstName').val('');
    $('#txt_LastName').val('');
    $("#rdbgenderM").prop("checked", false);
    $("#rdbgenderF").prop("checked", false);
    $('#txt_emp').val('');
    $('#txt_EmailID').val('');
    $('#ddl_Type').val('0');
    $('#txt_Address').val('');
    $('#txt_Address1').val('');
    $('#imgPreview').removeAttr('src');
    $('#imgPreview').removeAttr('style');
    $('#txt_FatherName').val('');
    $('#txt_DOB').val('');
    $('#txt_DOJ').val('');
    $('#ddl_State').val('0');
    $('#ddl_Country').val('0');
    $('#txt_PhoneNo').val('');
    $('#ddl_Experience').val('0');
    $('#ddl_BloodGroup').val('0');
    $('#PreviousEx').hide();
    $('#PreviousEx1').hide();
    $('#txt_CompanyName').val('');
    $('#txt_Noofyears').val('');
    $('#txt_ResDate').val('');
    $('#txt_PreviousDeg').val('');
    $('#txt_SalaryCTC').val('');
    $('#hid').val('');
    $('#txt_AadharNo').val('');
    $('#btnAdd').text('Add');
    $('#btnNext').hide();
    clearCSS();
    $('#Third').hide();
    $('#Second').hide();
    $('#first').show();
    clearSecondTab();
    clearThirdTab();

}
function clearSecondTab() {
    $('#ddl_Group').val('0');
    $('#ddl_Department').empty().append('<option selected="selected" value="0">Select</option>');
    $('#ddl_Shift').val('0');
    $('#ddl_Rules').multiselect('deselectAll', false);
    $("#ddl_Rules").multiselect('refresh');
    $('#ddl_Grade').val('0');
    $('#txt_PfNo').val('');
    $('#ddl_Designation').val('0');
    $('#ddl_WeekOff').multiselect('deselectAll', false);
    $("#ddl_WeekOff").multiselect('refresh');
    $('#ddl_PFType').val('0');
    $('#ddl_DesignationReport').multiselect('deselectAll', false);
    $("#ddl_DesignationReport").multiselect('refresh');
    $('#ddl_ReportingTo').empty();
    $('#ddl_ReportingTo').multiselect('rebuild');
    $('#txt_UANNumber').val('');
    $('#txt_ESno').val('');

}
function clearThirdTab() {
    $('#ddl_SalaryType').val('0');
    $('#txt_Salary').val('');
    
    $('#txt_SalEffectivedate').val('');
    
    $('#ddl_allowance').empty();
    $('#ddl_allowance').multiselect('rebuild');
    
}
function validateFirst() {

    var isValid = true;

    $('.validateFirst').each(function () {
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




$('#fileUploadExcel').click(function () {
    // $('.input-group.date').datepicker();
    var files = $('#fileUpload').files();
    //var myID = 3; //uncomment this to make sure the ajax URL works
    if (files.length > 0) {
        if (window.FormData !== undefined) {
            var data = new FormData();
            for (var x = 0; x < files.length; x++) {
                data.append("file" + x, files[x]);
            }
           
            $.ajax({
                url: "/Employee/UploadHomeReport",
                type: "POST",
                processData: false,
                contentType: false,
                data: data,
                success: function (result) {                   
                    console.log(result);
                },
                error: function (er) {
                    alert(er);
                }

            });
        }
    }
    return false;
});
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
