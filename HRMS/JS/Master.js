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
            $('#ddl_Group').empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r, function (key, item) {
                $('#ddl_Group').append($("<option></option>").val(item.GroupId).html(item.GroupName));
            });
        }
    });
}
function loadData() {
    $.ajax({
        url: "/Master/Division_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#example").dataTable({
                data: data,
                columns: [
                    { "data": "GroupName" },
                    { "data": "DivisionName" },
                    {
                        "data": "DivisionId",
                        "render": function (DivisionId) {
                            return '<a href="#" onclick="getbyID(' + DivisionId + ')">Edit</a>|<a href="#" onclick="Delete(' + DivisionId + ')">Delete</a></td > '
                        }
                    }
                ]
            })
            //var html = '';
            //var i = 1;
            //$.each(r, function (key, item) {
            //    html += '<tr>';
            //    html += '<td>' + parseInt(i) + '</td>';
            //    html += '<td>' + item.GroupName + '</td>';
            //    html += '<td>' + item.DivisionName + '</td>';
            //    html += '<td><a href="#"  onclick="getbyID(' + item.DivisionId + ')">Edit</a>|<a href="#" onclick="DeleteDivision(' + item.DivisionId + ')">Delete</a></td > ';
            //    html += '</tr>';
            //});
            //$('.tbody').html(html);
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
}

function AddDivision() {

    var res = validate();
    if (res == false) {

        return false;
    }
    var obj_Div = {
        GroupId: $('#ddl_Group').val(),
        DivisionName: $('#txt_DivName').val()
    };
    $.ajax({
        url: "/Master/Insert_Division",
        type: "Post",
        data: JSON.stringify(obj_Div),
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
    $("#ddl_Group").css('border-color', 'lightngrey');
    $("#txt_DivName").css('border-color', 'lightngrey');
    $.ajax({
        url: "/Master/GetDivisionByID/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            $('#hdnDivisionID').val(r.DivisionId);
            $('#txt_DivName').val(r.DivisionName);
            $('#ddl_Group').val(r.GroupId);
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
function UpdateDivision() {
    var res = validate();
    if (res == false) {

        return false;
    }
    var obj_Div = {
        DivisionId: $('#hdnDivisionID').val(),
        DivisionName: $('#txt_DivName').val(),
        GroupId: $('#ddl_Group').val()
    };
    $.ajax({
        url: "/Master/Update_Division",
        type: "Post",
        data: JSON.stringify(obj_Div),

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
function DeleteDivision(Id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Master/Delete_Divsion/" + Id,
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

    $("#hdnDivisionID").val('');
    $('#txt_DivName').val('');
    $('#ddl_Group').val('0');
    $("#btnUpdate").hide();
    $("#btnAdd").show();
    $('#txt_DivName').css('border-color', 'lightgrey');
    $('#ddl_Group').css('border-color', 'lightgrey');
    $('#MyModal').modal('hide');
}
function validate() {

    var isValid = true;
    $('[id*=txt_DivName],[id*=ddl_Group]').each(function () {
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