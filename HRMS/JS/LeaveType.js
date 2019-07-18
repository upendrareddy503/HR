$(document).ready(function () {
    loadData();
    getGroup();
});

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

function loadData() {
    $.ajax({
        url: "/Attendance/Leave_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            var html = '';
            var i = 0;
            $.each(r, function (key, item) {

                html += '<tr>';
                html += '<td>' + parseInt(i+1) + '</td>';
                html += '<td>' + item.LName + '</td>';
                html += '<td><a href="#"  onclick="getbyID(' + item.LId + ')">Edit</a>|<a href="#" onclick="Delete(' + item.LId + ')">Delete</a></td > ';
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

    var obj_Leave = {
        GroupId: $('#ddl_EmpGroup').val(),
        LName: $('#txt_LName').val(),
        LCode: $('#txt_LCode').val(),
        LNoDays: $('#txt_LNoDays').val(),
        LType: $('#ddlLType').val(),
        LProperty: $('#ddlLProperty').val(),
        LAvailMax: $('#txt_LAvailMax').val(),
        LAvailMin: $('#txt_LAvailMin').val(), 
        LNoTimeAvail: $('#txt_LNoTimeAvail').val(),         
        LSandwich: $("input[name='Week']:checked").val(),
        LAdvancelive: $('#txt_LAdvancelive').val(),
        Lprefixed: $("input[name='Prefix']:checked").val()
    };

    $.ajax({
        url: "/Attendance/Insert_Leave",
        type: "Post",
        data: JSON.stringify(obj_Leave),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            loadData();
            //clearTextBox();            
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}


function Update() {

    var obj_Leave = {
        LId: $('#hdnLId').val(),
        GroupId: $('#ddl_EmpGroup').val(),
        LName: $('#txt_LName').val(),
        LCode: $('#txt_LCode').val(),
        LNoDays: $('#txt_LNoDays').val(),
        LType: $('#ddlLType').val(),
        LProperty: $('#ddlLProperty').val(),
        LAvailMax: $('#txt_LAvailMax').val(),
        LAvailMin: $('#txt_LAvailMin').val(),
        LNoTimeAvail: $('#txt_LNoTimeAvail').val(),
        LSandwich: $("input[name='Week']:checked").val(),
        LAdvancelive: $('#txt_LAdvancelive').val(),
        Lprefixed: $("input[name='Prefix']:checked").val()
    };

    $.ajax({
        url: "/Attendance/Update_Leave",
        type: "Post",
        data: JSON.stringify(obj_Leave),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            loadData();
            //clearTextBox();            
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}


function getbyID(Id) {    
    $.ajax({
        url: "/Attendance/GetLeaveByID/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            $('#hdnLId').val(r.LId);
            $('#ddl_EmpGroup').val(r.GroupId)
            $('#txt_LName').val(r.LName);
            $('#txt_LCode').val(r.LCode);
            $('#txt_LNoDays').val(r.LNoDays);
            $('#ddlLType').val(r.LType);
            $('#ddlLProperty').val(r.LProperty);
            $('#txt_LAvailMax').val(r.LAvailMax);
            $('#txt_LNoTimeAvail').val(r.LNoTimeAvail);
            $("input[name='Week']:checked").val(r.LSandwich);
            $('#txt_LAdvancelive').val(r.LAdvancelive);
            $("input[name='Prefix']:checked").val(r.Lprefixed);
            $('#btnAdd').hide();
            $('#btnUpdate').show();
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
    return false;
}

function Delete(Id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Attendance/Delete_Leave/" + Id,
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