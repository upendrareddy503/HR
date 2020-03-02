$(document).ready(function () {
    getGroup();
    loadAllAllw();
    $('#ddl_EmpGroup1').change(function () {
        if ($(this).val() != '0')
            loadAllw($(this).val());
    });
    $('#ddl_AllwType').change(function () {
        if ($(this).val() != '0') {
            if ($(this).val() == '1')
                $('#divBasedOn').hide();
            else {
                $('#divBasedOn').show();
                getAdditionAllow();
            }
        }
    });
});

function getAdditionAllow() {

    var obj_Allw = {

        GroupId: $('#ddl_EmpGroup').val(),
        Alw_Type: $('#ddl_AllwType').val()

    };
    $.ajax({
        url: "/Payroll/GetAlwByAddition",
        type: "Post",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(obj_Allw),
        dataType: "json",
        async: false,
        success: function (r) {
            $('#ddlBasedOn').empty();
            $('[id*=ddlBasedOn]').multiselect({
                includeSelectAllOption: true

            });
            $.each(r, function (key, item) {
                $('#ddlBasedOn').append($("<option></option>").val(item.Alw_Id).html(item.Alw_Name));

            });

            $('#ddlBasedOn').multiselect('rebuild');


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
            $('#ddl_EmpGroup1').empty().append('<option selected="selected" value="0">All</option>');
            $.each(r, function (key, item) {
                $('#ddl_EmpGroup').append($("<option></option>").val(item.GroupId).html(item.GroupName));
                $('#ddl_EmpGroup1').append($("<option></option>").val(item.GroupId).html(item.GroupName));
            });
        }
    });
}

function loadAllw(Id) {

    $.ajax({
        url: "/Payroll/Allowance_List/" + Id,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            $("#tblAllowance").dataTable({
                data: r,
                "bDestroy": true,
                columns: [
                    { "data": "Alw_Name" },
                    { "data": "GroupName" },
                    {
                        "data": "Alw_Id",
                        "render": function (Alw_Id) {
                            return '<div class="dropdown dropdown-action"><a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#" data-toggle="modal" data-target="#add_Allowance" onclick="GetID(' + Alw_Id + ')"><i class="fa fa-pencil m-r-5"></i>Edit</a><a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_Allowance" onclick="Deleted(' + Alw_Id + ')"><i class="fa fa-trash-o m-r-5"></i> Delete</a></div></div>'
                        }
                    }
                ]
            });

        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
}

function loadAllAllw() {

    $.ajax({
        url: "/Payroll/Allowance_List_All/",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            $("#tblAllowance").dataTable({
                data: r,
                "bDestroy": true,
                columns: [
                    { "data": "Alw_Name" },
                    { "data": "GroupName" },
                    {
                        "data": "Alw_Id",
                        "render": function (Alw_Id) {
                            return '<div class="dropdown dropdown-action"><a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#" data-toggle="modal" data-target="#add_Allowance" onclick="GetID(' + Alw_Id + ')"><i class="fa fa-pencil m-r-5"></i>Edit</a><a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_Allowance" onclick="Deleted(' + Alw_Id + ')"><i class="fa fa-trash-o m-r-5"></i> Delete</a></div></div>'
                        }
                    }
                ]
            });

        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
}

function Insert_Allw() {
    var res = validate();
    if (res == false) {

        return false;
    }

    var Fixed;
    if ($('input[type="checkbox"]').prop("checked") == true)
        Fixed = 'Y';
    else
        Fixed = 'N';
    var BasedOn = '';
    if ($('#ddl_AllwType').val() == '2') {
        $('[id*=ddlBasedOn] > option:selected').each(function () {
            BasedOn += $(this).val() + ',';
        });
    }
    alert(BasedOn);

    var obj_Alw = {
        GroupId: $('#ddl_EmpGroup').val(),
        Alw_Name: $('#txt_AllwName').val(),
        Alw_Type: $('#ddl_AllwType').val(),
        Alw_Val_Type: $('#ddl_AllwValType').val(),
        Alw_Val: $('#txt_AllwValue').val(),
        Alw_BasedOn: BasedOn,
        Alw_Fixed: Fixed
    };

    $.ajax({
        url: "/Payroll/Insert_Allowance",
        type: "Post",
        data: JSON.stringify(obj_Alw),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            if ($('#ddl_EmpGroup1').val() != '0')
                loadAllw($('#ddl_EmpGroup1').val());
            else
                loadAllAllw();
            clearAllw();
            //clearTextBox();    
            var msg = r.split('$');

            if (msg[1] == "True") {

                $(".errMsg").fadeIn().html("<ul><li>" + msg[0] + "</li></ul>");
                setTimeout(function () {
                    $('.errMsg').fadeOut('slow');
                }, 2000);
            }
            else {
                $(".errMsg1").fadeIn().html("<ul><li>" + msg[0] + "</li></ul>");
                setTimeout(function () {
                    $('.errMsg1').fadeOut('slow');
                }, 2000);
            }
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}


function GetID(Id) {

    clearCSS();
    $.ajax({
        url: "/Payroll/GetAllowanceByID/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        async: false,
        success: function (r) {
            $('#ddl_EmpGroup').val(r.GroupId);
            $('#hdnAllwId').val(r.Alw_Id);
            $('#txt_AllwName').val(r.Alw_Name);
            $('#ddl_AllwType').val(r.Alw_Type);
            $('#ddl_AllwValType').val(r.Alw_Val_Type);
            $('#txt_AllwValue').val(r.Alw_Val);
            if (r.Alw_Fixed == "Y")
                $('#chkFixed').prop('checked', true);
            else
                $('#chkFixed').prop('checked', false);
            if ($('#ddl_AllwType').val() == '2') {
                $('#divBasedOn').show();
                getAdditionAllow();
                var selectedOptions = r.Alw_BasedOn.split(',');

                $("#ddlBasedOn").val(selectedOptions);

                $("#ddlBasedOn").multiselect('refresh');
            }
            else
                $('#divBasedOn').hide();
            $('#btnUpdate').show();
            $('#btnAdd').hide();


        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
    return false;
}

function Update_Allw() {
    var res = validate();
    if (res == false) {

        return false;
    }

    var Fixed;
    if ($('input[type="checkbox"]').prop("checked") == true)
        Fixed = 'Y';
    else
        Fixed = 'N';
    var BasedOn = '';
    if ($('#ddl_AllwType').val() == '2') {
        $('[id*=ddlBasedOn] > option:selected').each(function () {
            BasedOn += $(this).val() + ',';
        });
    }
    var obj_Alw = {
        Alw_Id: $('#hdnAllwId').val(),
        GroupId: $('#ddl_EmpGroup').val(),
        Alw_Name: $('#txt_AllwName').val(),
        Alw_Type: $('#ddl_AllwType').val(),
        Alw_Val_Type: $('#ddl_AllwValType').val(),
        Alw_Val: $('#txt_AllwValue').val(),
        Alw_BasedOn: BasedOn,
        Alw_Fixed: Fixed
    };

    $.ajax({
        url: "/Payroll/Update_Allowance",
        type: "Post",
        data: JSON.stringify(obj_Alw),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            if ($('#ddl_EmpGroup1').val() != '0')
                loadAllw($('#ddl_EmpGroup1').val());
            else
                loadAllAllw();
            clearAllw();
            //clearTextBox();   
            var msg = r.split('$');

            if (msg[1] == "True") {

                $(".errMsg").fadeIn().html("<ul><li>" + msg[0] + "</li></ul>");
                setTimeout(function () {
                    $('.errMsg').fadeOut('slow');
                }, 2000);
            }
            else {
                $(".errMsg1").fadeIn().html("<ul><li>" + msg[0] + "</li></ul>");
                setTimeout(function () {
                    $('.errMsg1').fadeOut('slow');
                }, 2000);
            }
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function Deleted(Id) {

    $('#hdnAllwId').val(Id)

}

function DeleteAllw() {
    var Id = $('#hdnAllwId').val();

    $.ajax({
        url: "/Payroll/Delete_Allowance/" + Id,
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (r) {
            if ($('#ddl_EmpGroup1').val() != '0')
                loadAllw($('#ddl_EmpGroup1').val());
            else
                loadAllAllw();
            clearAllw();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function clearAllw() {
    $('#hdnAllwId').val('');
    $('#txt_AllwName').val('');
    $('#ddl_AllwType').val('0');
    $('#ddl_AllwValType').val('A');
    $('#txt_AllwValue').val('');
    $('#chkFixed').prop('checked', false);
    $('#divBasedOn').hide();
    if ($('#ddl_AllwType').val() == '2') {
        $("#ddlBasedOn").multiselect("deSelectAll");
        $("#ddlBasedOn").multiselect('refresh');
    }
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#ddl_EmpGroup').val('0');
}
