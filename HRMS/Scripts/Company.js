$(document).ready(function () {
    loadData();
   
});

function loadData() {
    $.ajax({
        url: "/Company/List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            var html = '';
            var i = 1;
            $.each(r, function (key, item) {
                html += '<tr>';
                html += '<td>' + parseInt(i) + '</td>';
                html += '<td>' + item.Tci_Name + '</td>';
                html += '<td><a href="#"  onclick="getbyID(' + item.Tci_id + ')">Edit</a>|<a href="#" onclick="Delete(' + item.Tci_id + ')">Delete</a></td > ';
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
    alert("ddd");
    var obj_ComInser = {
        Tci_id: $('#Tci_id').val(),
        Tci_Name: $('#txt_CompanyName').val(),
        Tci_Code:$('#txt_Code').val(),
        Tci_Address: $('#txt_Address').val(),
        Tci_City:$('#txt_City').val(),
        Tci_District:$('#txt_District').val(),
        Tci_State:$('#txt_State').val(),
        Tci_Country:$('#txt_Country').val(),
        Tci_phoneNo:$('#txt_PhoneNo').val(),
        Tci_EstDate:$('#txt_EstDate').val(),
        Tci_EmailID:$('#txt_EmailID').val(),
        Tci_GST:$('#txt_GST').val(),
        Tci_Tan:$('#txt_Tan').val(),
        Tci_Pan_No:$('#txt_Pan').val(),
        Tci_Website:$('#txt_Website').val(),
    };
   
    $.ajax({
        url: "/Company/Insert_Company",
        type: "Post",
        data: JSON.stringify(obj_ComInser),
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
   
    $("#Tci_Name").css('border-color', 'lightngrey');
    $.ajax({
        url: "/Company/GetByID/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            $('#Tci_id').val(r.Tci_id);
            $('#Tci_Name').val(r.Tci_Name);
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
   
    var obj_ComUpd = {
        Tci_id: $('#Tci_id').val(),
        Tci_Name: $('#Tci_Name').val()
        
    };
    $.ajax({
        url: "/Company/Update_Company",
        type: "Post",
        data: JSON.stringify(obj_ComUpd),
        
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
            url: "/Company/Delete_Company/" + Id,            
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
    
   
    $('#txt_CompanyName').val('');
    $('#txt_Code').val('');
    $('#txt_Address').val('');
    $('#txt_City').val('');
    $('#txt_District').val('');
    $('#txt_State').val('');
    $('#txt_Country').val('');
    $('#txt_PhoneNo').val('');
    $('#txt_EstDate').val('');
    $('#txt_EmailID').val('');
    $('#txt_GST').val('');
    $('#txt_Tan').val('');
    $('#txt_Pan').val('');
    $('#txt_Website').val('');
    $("#btnUpdate").hide();
    $("#btnAdd").show();
    $('#DivisionName').css('border-color', 'lightgrey');    
    $('#MyModal').modal('hide');
}
function validate() {

    var isValid = true;
    if ($('#CompanyName').val().trim() == "") {
        $('#CompanyName').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#GroupName').css('border-color', 'lightgrey');
    }
    return isValid;
}
