$(document).ready(function () {
    LoadAllEmpList();
    $('#btnCloseModal').click(function () {
        LoadAllEmpList();
        clearEmp();
    });
    $('#add_employee').click(function () {
        this.modal({
            backdrop: 'static',
            keyboard: false
        })
    });
});

function LoadAllEmpList() {
    $.ajax({
        url: "/Employee/List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            $("#tblEmp").dataTable({
                data: r,
                "bDestroy": true,
                columns: [
                    {
                        "data": "Tei_FirstName",
                        render: function (data, type, row) {
                            return '<h2 class="table-avatar"><a href="#" class="avatar"><img alt="" src="' + row.Tei_Photo + '"></a><a href="#">' + row.Tei_FirstName + '</a></h2>'
                        }
                    },
                    {
                        "data": "Tei_Empno"
                    },
                    {
                        "data": "Tei_Email"
                    },
                    {
                        "data": "Tei_Phone"
                    },
                    {
                        "data": "Tei_Id",
                        "render": function (Tei_Id) {
                            return '<div class="dropdown dropdown-action" align="Right"><a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#" data-toggle="modal" data-target="#add_employee" onclick="GetListID(' + Tei_Id + ')"><i class="fa fa-pencil m-r-5"></i>Edit</a><a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_Employee" onclick="Deleted(' + Tei_Id + ')"><i class="fa fa-trash-o m-r-5"></i> Delete</a></div></div>'
                        }
                    }
                ]

            })
        }

    });
}
function GetListID(Id) {
    //$('#add_employee').show();    
    $.ajax({
        url: "/Employee/Get_All_Emp/" + Id,
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
                $('#ddl_SalaryType').val(r.Tes_Sal_CTC);
                $('#txt_Salary').val(r.Tes_Sal);
                if (r.Tes_Sal_Efctive_Date != null && r.Tes_Sal_Efctive_Date != "") {
                    var date = new Date(parseInt(r.Tes_Sal_Efctive_Date.substr(6)));
                    var month = date.getMonth() + 1;
                    var CurDate = "";
                    if (parseInt(date.getDate()) < 10)
                        CurDate = "0" + date.getDate();
                    else
                        CurDate = date.getDate();
                    if (month < 10)
                        month = "0" + month;
                    $('#txt_SalEffectivedate').val(month + "/" + CurDate + "/" + date.getFullYear());
                }
                alert(r.Tea_Name);
                var AllwOptions = r.Tea_Name.split(",");
                $("#ddl_allowance").val(AllwOptions);
                $("#ddl_allowance").multiselect('refresh');                
            }

        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
    return false;
}




function Deleted(Id) {

    $('#hid').val(Id);  
}
function FinalDelete() {
    var Id = $('#hid').val();

    $.ajax({
        url: "/Employee/Delete_Employee/" + Id,
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            LoadAllEmpList();
            $('#hid').val(''); 
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}