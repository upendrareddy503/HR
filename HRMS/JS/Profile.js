$(document).ready(function () {

    loadprofile();


});

function loadprofile() {
    $.ajax({
        url: "/Dashboard/profile_Details",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            $('#username').text(r.Tei_FirstName + ' ' + r.Tei_LastName);
            $('#Desig').text(r.Tdg_Name);
            $('#Dep').text(r.Tdp_Name);
            $('#Empid').text(r.Tei_Empno);
            $('#phone').text(r.Tei_Phone);
            $('#Email').text(r.Tei_Email);
            $('#birthday').text(r.Tei_Email);
            $('#Address').text(r.Tei_Address1);
            $('#Gender').text(r.Tei_Gender);
            var date = new Date(parseInt(r.Tei_JoiningDate.substr(6)));
            var month = date.getMonth() + 1;           
            $('#Dateofjoin').text(date.getDate() + "-" + month + "-" + date.getFullYear());
            var date1 = new Date(parseInt(r.Tei_DateofBirth.substr(6)));
            var month1 = date1.getMonth() + 1; 
            $('#Dateofbirth').text(date1.getDate() + "-" + month1 + "-" + date1.getFullYear());            
            $('#Aadharno').text(r.Tei_AadharNo);
            $('#PFnumber').text(r.Tegi_PfNo);
            $('#ESINumber').text(r.Tegi_EsiNo);
            $('#UANNumber').text(r.Tegi_UANNumber);
            $('#imgDashPreview').attr("src", r.Tei_Photo);
            $('#Bloodgroup').text(r.Tei_BloodGroup);
            $('#hdnEmpID').text(r.Tei_Id);
            
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
}



function Get_ProfileID(Id) {
    //$('#add_employee').show();    
    $.ajax({
        url: "/Employee/EmployeeById/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            $('#ddl_Title').val(r.Tei_Title);
            $('#txt_FirstName').val(r.Tei_FirstName);
            $('#txt_LastName').val(r.Tei_LastName);
            if (r.Tei_Gender == 'M')
                $("#rdbgenderM").prop("checked", true);
            else
                $("#rdbgenderF").prop("checked", true);
            //$("input[name='gender']:checked").val(r.Tei_Gender);
            $('#txt_emp').val(r.Tei_Empno);
            $('#txt_EmailID').val(r.Tei_Email);
            $('#ddl_Type').val(r.Tei_Type);
            $('#txt_Address').val(r.Tei_Address1);
            $('#txt_Address1').val(r.Tei_Address2);
            if (r.Tei_Photo != "") {
                $('#imgPreview').attr('src', r.Tei_Photo);
                $("#imgPreview").width("100px");
                $("#imgPreview").height("100px");
            }
            $('#hid').val(r.Tei_Id);
            $('#txt_FatherName').val(r.Tei_Father);
            if (r.Tei_DateofBirth != null && r.Tei_DateofBirth != "") {
                var date = new Date(parseInt(r.Tei_DateofBirth.substr(6)));
                var month = date.getMonth() + 1;
                var CurDate = "";
                if (parseInt(date.getDate()) < 10)
                    CurDate = "0" + date.getDate();
                else
                    CurDate = date.getDate();
                if (month < 10)
                    month = "0" + month;
                $('#txt_DOB').val(month + "/" + CurDate + "/" + date.getFullYear());
            }
            if (r.Tei_JoiningDate != null && r.Tei_JoiningDate != "") {
                var date = new Date(parseInt(r.Tei_JoiningDate.substr(6)));
                var month = date.getMonth() + 1;
                var CurDate = "";
                if (parseInt(date.getDate()) < 10)
                    CurDate = "0" + date.getDate();
                else
                    CurDate = date.getDate();
                if (month < 10)
                    month = "0" + month;
                $('#txt_DOJ').val(month + "/" + CurDate + "/" + date.getFullYear());
            }
            //$('#txt_DOB').val(r.Tei_DateofBirth);
            //$('#txt_DOJ').val(r.Tei_JoiningDate);
            $('#ddl_State').val(r.Tei_stateId);
            $('#ddl_Country').val(r.Tei_CountryId);
            $('#txt_PhoneNo').val(r.Tei_Phone);
            $('#txt_AadharNo').val(r.Tei_AadharNo);
            $('#ddl_Experience').val(r.Tei_TypeofExpe);
            if (r.Tei_BloodGroup != '')
                $('#ddl_BloodGroup').val(r.Tei_BloodGroup);
            if (r.Tei_TypeofExpe == '2') {
                $('#PreviousEx').show();
                $('#PreviousEx1').show();
                $('#txt_CompanyName').val(r.Tei_Old_Company);
                $('#txt_Noofyears').val(r.Tei_Prev_Exp);
                if (r.Tegi_Region_Date != null && r.Tegi_Region_Date != "") {
                    var date = new Date(parseInt(r.Tegi_Region_Date.substr(6)));
                    var month = date.getMonth() + 1;
                    var CurDate = "";
                    if (parseInt(date.getDate()) < 10)
                        CurDate = "0" + date.getDate();
                    else
                        CurDate = date.getDate();
                    if (month < 10)
                        month = "0" + month;
                    $('#txt_ResDate').val(month + "/" + CurDate + "/" + date.getFullYear());
                }
                $('#txt_PreviousDeg').val(r.Tei_prev_Disig);
                $('#txt_SalaryCTC').val(r.Tegi_Prev_CTC);
            }
            else {
                $('#PreviousEx').hide();
                $('#PreviousEx1').hide();
            }
            if (r.Tei_Type == '1') {
                $('#btnAdd').text('Update');
                $('#btnAdd').show();
                $('#btnNext').hide();
            }
            else {
                $('#btnAdd').text('Add');
                $('#btnAdd').hide();
                $('#btnNext').show();
                $('#ddl_Group').val(r.Tegi_GroupId);
                getDepartment(r.Tegi_GroupId);
                getALLowanceByGroup(r.Tegi_GroupId);
                $('#ddl_Department').val(r.Tegi_DepartmentId);
                $('#ddl_Shift').val(r.Tegi_Shift_Group);
                var RulesOptions = r.Tegi_Emp_Rules.split(",");
                $("#ddl_Rules").val(RulesOptions);
                $("#ddl_Rules").multiselect('refresh');
                if (r.Tegi_Grade != '')
                    $('#ddl_Grade').val(r.Tegi_Grade);
                $('#txt_PfNo').val(r.Tegi_PfNo);
                $('#ddl_Designation').val(r.Tegi_DesignationId);
                var WeekOffOptions = r.Tegi_Weekoff.split(",");
                $("#ddl_WeekOff").val(WeekOffOptions);
                $("#ddl_WeekOff").multiselect('refresh');
                if (r.Tegi_PF_Type != '')
                    $('#ddl_PFType').val(r.Tegi_PF_Type);
                var DesOptions = r.Tegi_DesignationReport.split(",");
                $("#ddl_DesignationReport").val(DesOptions);
                $("#ddl_DesignationReport").multiselect('refresh');
                getDesignationReport(r.Tegi_DesignationReport);
                var RptOptions = r.Tegi_ReportingLevel.split(",");
                $("#ddl_ReportingTo").val(RptOptions);
                $("#ddl_ReportingTo").multiselect('refresh');

                $('#txt_UANNumber').val(r.Tegi_UANNumber);
                $('#txt_ESno').val(r.Tei_EsiNo);
            }

        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
    return false;
}

