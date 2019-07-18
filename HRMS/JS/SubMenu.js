$(document).ready(function () {
    loadData();
    getSubmenu();
});

function getSubmenu() {
    $.ajax({
        url: "/Menu/Menu_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            $('#ddl_menu').empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r, function (key, item) {
                $('#ddl_menu').append($("<option></option>").val(item.TxnId).html(item.Description));
            });
        }
    });
}
function loadData() {
    $.ajax({
        url: "/Menu/SubMenu_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            var html = '';
            var i = 0;
            $.each(r, function (key, item) {
                html += '<tr>';
                html += '<td>' + parseInt(i + 1) + '</td>';
                html += '<td>' + item.Description + '</td>';

                html += '<td>' + item.Url_Name + '</td>';

                // html += '<td>' + item.Order_No + '</td>';
                html += '<td><a href="#"  onclick="getbyID(' + item.TxnId + ')">Edit</a>|<a href="#" onclick="Delete(' + item.TxnId + ')">Delete</a></td > ';
                html += '</tr>';

            });
            $('.tbody').html(html);
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
}

function AddSubMenu() {


    var obj_SMenu = {
        MainMenuId: $('#ddl_menu').val(),
        Description: $('#txt_Descrip').val(),
        Url_Name: $('#txt_url').val(),

        Order_No: $('#txt_Orderno').val()
    };
    $.ajax({
        url: "/Menu/Insert_SubMenu",
        type: "Post",
        data: JSON.stringify(obj_SMenu),
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

function getbyID(Id) {

    $.ajax({
        url: "/Menu/GetSubMenuByID/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',

        success: function (r) {

            $('#hdnSubmenu').val(r.TxnId);
            $('#txt_Descrip').val(r.Description);
            $('#txt_url').val(r.Url_Name);
            $('#ddl_menu').val(r.MainMenuId);
            $('#txt_Orderno').val(r.Order_No);
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
function Updatesubmneu() {


    var obj_SMenu = {
        //Department_Id: $('#hdnDepartmentID').val(),
        //DivisionId: $('#ddl_Division').val(),
        //Department_Name: $('#txt_DepName').val()
        MainMenuId: $('#ddl_menu').val(),
        TxnId: $('#hdnSubmenu').val(),
        Description: $('#txt_Descrip').val(),
        Url_Name: $('#txt_url').val(),
        Order_No: $('#txt_Orderno').val()
    };
    $.ajax({
        url: "/Menu/Update_SubMenu",
        type: "Post",
        data: JSON.stringify(obj_SMenu),

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
}
function Delete(Id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Menu/Delete_SubMenu/" + Id,
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

    $("#hdnSubmenu").val('');
    $('#txt_Descrip').val('');
    $('#txt_url').val('');
    $('#txt_Orderno').val('');
    $('#ddl_menu').val('0');
    $("#btnUpdate").hide();
    $("#btnAdd").show();

    $('#MyModal').modal('hide');
}


