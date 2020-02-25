$(document).ready(function () {
    loadDes();
});

function loadDes() {
    $.ajax({
        url: "/Master/Designation_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {

            $("#tblDesignation").dataTable({
                data: r,
                "bDestroy": true,
                columns: [
                    { "data": "DesignationName" },
                    {
                        "data": "LevelId",
                        "render": function (LevelId) {
                            return 'Level' + LevelId
                        }
                    },
                    {
                        "data": "DesignationId",
                        "render": function (DesignationId) {
                            return '<div class="dropdown dropdown-action" align="right"><a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#" data-toggle="modal" data-target="#add_Designation" onclick="GetID(' + DesignationId + ')"><i class="fa fa-pencil m-r-5"></i>Edit</a><a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_Designation" onclick="Deleted(' + DesignationId + ')"><i class="fa fa-trash-o m-r-5"></i> Delete</a></div></div>'
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

function Insert_Des() {

    var res = validate();
    if (res == false) {
        return false;
    }

    var obj_Degi = {
        DesignationName: $('#txt_DesignationName').val(),
        LevelId: $('#ddl_Designation').val()
    };
    $.ajax({
        url: "/Master/Insert_Designation",
        type: "Post",
        data: JSON.stringify(obj_Degi),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            loadDes();
            clearDes();
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
        url: "/Master/GetDesignationByID/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            $('#hdnDesignationID').val(r.DesignationId);
            $('#txt_DesignationName').val(r.DesignationName);
            $('#ddl_Designation').val(r.LevelId);
            $('#add_Designation').modal('show');
            $('#btnAdd').hide();
            $('#btnUpdate').show();
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
    return false;
}

function Update_Des() {
    var res = validate();
    if (res == false) {

        return false;
    }
    var obj_Degi = {
        DesignationId: $('#hdnDesignationID').val(),
        DesignationName: $('#txt_DesignationName').val(),
        LevelId: $('#ddl_Designation').val()
    };
    $.ajax({
        url: "/Master/Update_Designation",
        type: "Post",
        data: JSON.stringify(obj_Degi),

        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            loadDes();
            clearDes();
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

    $('#hdnDesignationID').val(Id)

}

function DeleteDes() {
    var Id = $('#hdnDesignationID').val();
    $.ajax({
        url: "/Master/Delete_Designation/" + Id,
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            loadDes();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

}

function clearDes() {

    $("#hdnDesignationID").val('');
    $('#txt_DesignationName').val('');
    $('#ddl_Designation').val('0');
    $("#btnUpdate").hide();
    $("#btnAdd").show();
    clearCSS();
}
