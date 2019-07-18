$(document).ready(function () {
    getGroup();
    $('#ddl_EmpGroup').focusout(function () {
        if ($(this).val() != '0')
            loadData($(this).val());
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
        success: function (r) {
            $('#ddlBasedOn').empty();
            $.each(r, function (key, item) {
                $('#ddlBasedOn').append($("<option></option>").val(item.Alw_Id).html(item.Alw_Name));
            });
            $('[id*=ddlBasedOn]').multiselect({
                includeSelectAllOption: true

            });
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

function loadData(Id) {
 
    $.ajax({
        url: "/Payroll/Allowance_List/" + Id,
        type: "Get",
        contentType: "application/json;charset=utf-8",        
        dataType: "json",
        success: function (r) {
            var html = '';
            var i = 0;
            $.each(r, function (key, item) {

                html += '<tr>';
                html += '<td>' + parseInt(i + 1) + '</td>';
                html += '<td>' + item.Alw_Name + '</td>';
                html += '<td><a href="#"  onclick="getbyID(' + item.Alw_Id + ')">Edit</a>|<a href="#" onclick="Delete(' + item.Alw_Id + ')">Delete</a></td > ';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
}

function Add() {
    var Fixed;
    if ($('input[type="checkbox"]').prop("checked") == true)
        Fixed = 'Y';
    else
        Fixed = 'N';
    var BasedOn = '';
    if ($('#ddl_AllwType').val() == 'D') {
        $('[id*=ddlBasedOn] > option:selected').each(function () {
            BasedOn += $(this).val() + ',';
        });
    }

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
            loadData($('#ddl_EmpGroup').val());
            //clearTextBox();            
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function Update() {
    var Fixed;
    if ($('input[type="checkbox"]').prop("checked") == true)
        Fixed = 'Y';
    else
        Fixed = 'N';
    var BasedOn = '';
    if ($('#ddl_AllwType').val() == 'D') {
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
        url: "/Payroll/Insert_Allowance",
        type: "Post",
        data: JSON.stringify(obj_Alw),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            loadData($('#ddl_EmpGroup').val());
            //clearTextBox();            
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}
