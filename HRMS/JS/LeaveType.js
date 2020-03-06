$(document).ready(function () {
    loadLeavetype();
    getGroup();
});

function getGroup() {    
    $.ajax({
        url: "/Group/List",
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

function loadLeavetype() {
    $.ajax({
        url: "/Attendance/Leave_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#tblleaveGroup").dataTable({
                data: data,
                "bDestroy": true,
                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                    $("td:first", nRow).html(iDisplayIndex + 1);
                    return nRow;
                },
                columns: [
                    {
                        "data": "LId"
                    },
                    { "data": "LName" },
                    { "data": "LCode" },
                    { "data": "LNoDays" },
                    { "data": "LType" },
                    {
                        "data": "LId",
                        "render": function (LId) {
                            return '<div class="dropdown dropdown-action" align="right"><a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#" data-toggle="modal" data-target="#add_department" onclick="GetID(' + LId + ')"><i class="fa fa-pencil m-r-5"></i>Edit</a><a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_department" onclick="Deleted(' + LId + ')"><i class="fa fa-trash-o m-r-5"></i> Delete</a></div></div>'
                        }
                    }
                ],
                "columnDefs": [{
                    'targets': [0, 2],
                    'orderable': false

                }],
                "order": [1, 'asc']

            })    



           
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
}

function Add_leaveType() {    
    var res = validate();
    if (res == false) {

        return false;
    }
    var Obj_Leav = {
        GroupId: $('#ddl_Group').val(),
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
        data: JSON.stringify(Obj_Leav),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            loadLeavetype();
            //clearTextBox();            
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}


function Update() {
    var res = validate();
    if (res == false) {

        return false;
    }
    var Obj_Leav = {
        LId: $('#hdnLId').val(),
        GroupId: $('#ddl_Group').val(),
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
        data: JSON.stringify(Obj_Leav),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            loadLeavetype();
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
                loadLeavetype();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}