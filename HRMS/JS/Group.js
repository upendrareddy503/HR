$(document).ready(function () {
    loadData();
   
});

function loadData() {
    $.ajax({
        url: "/Group/List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            var html = '';
            var i = 1;
            $.each(r, function (key, item) {
                html += '<tr>';
                html += '<td>' + parseInt(i) + '</td>';
                html += '<td>' + item.GroupName + '</td>';
                html += '<td><a href="#"  onclick="getbyID(' + item.GroupId + ')">Edit</a>|<a href="#" onclick="Delete(' + item.GroupId + ')">Delete</a></td > ';
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
    
    var res = validate();
    if (res == false) {
       
        return false;
    }
    var obj_GrpIns = {
        GroupId: $('#GroupId').val(),
        GroupName: $('#GroupName').val()
    };
    $.ajax({
        url: "/Group/Insert_Group",
        type: "Post",
        data: JSON.stringify(obj_GrpIns),
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
   
    $("#GroupName").css('border-color', 'lightngrey');
    $.ajax({
        url: "/Group/GetByID/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            $('#GroupId').val(r.GroupId);
            $('#GroupName').val(r.GroupName);
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
function Update() {
    var res = validate();
    if (res == false) {

        return false;
    }
    var obj_GrpUpd = {
        GroupId: $('#GroupId').val(),
        GroupName: $('#GroupName').val()
        
    };
    $.ajax({
        url: "/Group/Update_Group",
        type: "Post",
        data: JSON.stringify(obj_GrpUpd),
        
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
            url: "/Group/Delete_Group/" + Id,            
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
    
    $("#DivisionId").val('');
    $('#GroupName').val('');
    $("#btnUpdate").hide();
    $("#btnAdd").show();
    $('#GroupName').css('border-color', 'lightgrey');    
    $('#MyModal').modal('hide');
}
function validate() {
  
    var isValid = true;
    if ($('#GroupName').val().trim() == "") {
        $('#GroupName').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#GroupName').css('border-color', 'lightgrey');
    }
    return isValid;
}