$(document).ready(function () {
    loadData();
});

function loadData() {
    $.ajax({
        url: "/Master/Designation_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            var html = '';
            var i = 1;
            $.each(r, function (key, item) {
                html += '<tr>';
                html += '<td>' + parseInt(i) + '</td>';
                html += '<td>' + item.DesignationName + '</td>';
                html += '<td>' + item.LevelId + '</td>';
                html += '<td><a href="#"  onclick="getbyID(' + item.DesignationId + ')">Edit</a>|<a href="#" onclick="DeleteDesignation(' + item.DesignationId + ')">Delete</a></td > ';
                html += '</tr>';
                i++;
            });
            $('.tbody').html(html);
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
}

function AddDesignation() {

    var res = validate();
    if (res == false) {
        return false;
    }

    var obj_Degi = {
        DesignationName: $('#txt_DesignationName').val(),
        LevelId: $('#ddl_Designation').val(),
        LevelName: $('#ddl_Designation').text(),
    };
    $.ajax({
        url: "/Master/Insert_Designation",
        type: "Post",
        data: JSON.stringify(obj_Degi),
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
    $("#txt_DesignationName").css('border-color', 'lightngrey');
    $("#ddl_Designation").css('border-color', 'lightngrey');
    $.ajax({
        url: "/Master/GetDesignationByID/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            $('#hdnDesignationID').val(r.DesignationId);
            $('#txt_DesignationName').val(r.DesignationName);
            $('#ddl_Designation').val(r.LevelId);
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

function UpdateDesignation() {
    var res = validate();
    if (res == false) {

        return false;
    }
    var obj_Degi = {
        DesignationId: $('#hdnDesignationID').val(),
        DesignationName: $('#txt_DesignationName').val(),
        LevelId: $('#ddl_Designation').val(),
        LevelName: $('#ddl_Designation').text()
    };
    $.ajax({
        url: "/Master/Update_Designation",
        type: "Post",
        data: JSON.stringify(obj_Degi),

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

function DeleteDesignation(Id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Master/Delete_Designation/" + Id,
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

    $("#hdnDesignationID").val('');
    $('#txt_DesignationName').val('');
    $('#ddl_Designation').val('0');
    $("#btnUpdate").hide();
    $("#btnAdd").show();
    $('#txt_DesignationName').css('border-color', 'lightgrey');
    $('#ddl_Designation').css('border-color', 'lightgrey');
    $('#MyModal').modal('hide');
}

function validate() {

    var isValid = true;
    $('[id*=txt_DesignationName],[id*=ddl_Designation]').each(function () {
        if ($.trim($(this).val()) == '' || $.trim($(this).val()) == '0') {
            isValid = false;
            $(this).css("border", "1px solid red");
        }
        else {
            $(this).css({
                "border": "",
                "background": ""
            });
        }
    });
    return isValid;
}