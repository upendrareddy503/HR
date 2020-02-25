$(document).ready(function () {
    loadDept();

});


function loadDept() {
    $.ajax({
        url: "/Master/Department_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {

            $("#tblDepartment").dataTable({
                data: data,
                "bDestroy": true,
                columns: [                   
                    { "data": "Department_Name" },
                    {
                        "data": "Department_Id",
                        "render": function (Department_Id) {
                            return '<div class="dropdown dropdown-action" align="right"><a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#" data-toggle="modal" data-target="#add_department" onclick="GetID(' + Department_Id + ')"><i class="fa fa-pencil m-r-5"></i>Edit</a><a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_department" onclick="Deleted(' + Department_Id + ')"><i class="fa fa-trash-o m-r-5"></i> Delete</a></div></div>'
                        }
                    }
                ]
            })            
            
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
}

function Insert_Dept() {

    var res = validate();
    if (res == false) {

        return false;
    }
    var Obj_Dep = {        
        Department_Name: $('#txtDepName').val()
    };
    $.ajax({
        url: "/Master/Insert_Department",
        type: "Post",
        data: JSON.stringify(Obj_Dep),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            loadDept();
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
            clearDept();
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function GetID(Id) {

    clearCSS();
    $.ajax({
        url: "/Master/GetDepartmentByID/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            $('#hdnDepId').val(r.Department_Id);
            $('#txtDepName').val(r.Department_Name);            
            $('#add_department').modal('show');
            $('#btnAdd').hide();
            $('#btnUpdate').show();
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
    return false;
}
function Update_Dept() {
    var res = validate();
    if (res == false) {

        return false;
    }
  
    var Obj_Dep = {
        Department_Id: $('#hdnDepId').val(),      
        Department_Name: $('#txtDepName').val()
    };
    $.ajax({
        url: "/Master/Update_Department",
        type: "Post",
        data: JSON.stringify(Obj_Dep),

        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            loadDept();
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
            clearDept();
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function Deleted(Id) {

    $('#hdnDepId').val(Id)   

}
function DeleteDept() {
    var Id = $('#hdnDepId').val();

        $.ajax({
            url: "/Master/Delete_Allowance/" + Id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (r) {
                loadDept();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
}

function clearDept() {
    clearCSS();
    $("#hdnDepId").val('');
    $('#txtDepName').val('');
    $("#btnUpdate").hide();
    $("#btnAdd").show();
   
}


