$(document).ready(function () {

    loadData();
    // getGroup();

});

function loadData() {
    $.ajax({
        url: "/Menu/Menu_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            var html = '';
            var i = 1;
            $.each(r, function (key, item) {

                html += '<tr>';
                html += '<td>' + parseInt(i) + '</td>';
                html += '<td>' + item.Description + '</td>';
                html += '<td>' + item.Url_Name + '</td>';
                html += '<td>' + item.Code + '</td>';
                html += '<td>' + item.Order_No + '</td>';
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


function Add() {

    //var res = validate();
    //if (res == false) {

    //    return false;
    //}
    alert($('#txt_Descrip').val());
    var obj_menu = {
        // GroupId: $('#ddl_Group').val(),
        Description: $('#txt_Descrip').val(),
        Url_Name: $('#txt_url').val(),
        Code: $('#txt_Code').val(),
        Order_No: $('#txt_Orderno').val()
    };
    $.ajax({
        url: "/Menu/Insert_Menu",
        type: "Post",
        data: JSON.stringify(obj_menu),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            loadData();
            //clearTextBox();
            $('#MyModal').modal('hide');
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function Update() {

    var obj_menu = {
        Description: $('#txt_Descrip').val(),
        Url_Name: $('#txt_url').val(),
        Code: $('#txt_Code').val(),
        Order_No: $('#txt_Orderno').val(),
        TxnId: $('#TxnIdhid').val()

    };
    $.ajax({
        url: "/Menu/Update_Menu",
        type: "Post",
        data: JSON.stringify(obj_menu),

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
            url: "/Menu/Delete_Menu/" + Id,
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


    $('#txt_Descrip').val('');
    $('#txt_url').val('');
    $('#txt_Code').val('');
    $('#txt_Orderno').val('');

    $("#btnUpdate").hide();
    $("#btnAdd").show();
    /// $('#DivisionName').css('border-color', 'lightgrey');    
    $('#MyModal').modal('hide');
}


function getbyID(Id) {


    $.ajax({
        url: "/Menu/GetMenuByID/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            $('#TxnIdhid').val(r.TxnId);
            $('#txt_Descrip').val(r.Description);
            $('#txt_url').val(r.Url_Name);
            $('#txt_Code').val(r.Code);
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