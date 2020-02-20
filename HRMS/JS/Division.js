$(document).ready(function () {
    DivisionData();
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
function DivisionData() {


    $.ajax({
        url: "/Master/Division_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#tblDivision").dataTable({
                data: data,
                columns: [
                    { "data": "Sno" },
                    { "data": "GroupName" },
                    { "data": "DivisionName" },
                    {
                        "data": "DivisionId",
                        "render": function (DivisionId) {

                            return '<div class="dropdown dropdown-action"><a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#" data-toggle="modal" data-target="#add_department" onclick="GetID(' + DivisionId + ')"><i class="fa fa-pencil m-r-5"></i>Edit</a><a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_department" onclick="DeleteDivision(' + DivisionId + ')"><i class="fa fa-trash-o m-r-5"></i> Delete</a></div></div>'
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

function Add_Div() {

    OnBeginCreate();
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
            var msg = r.split('$');
            if (msg[1] == "true") {
                OnCompleteCreate();
                bootbox.alert(msg[0]);
            }
            else {
                bootbox.alert(msg[0]);
            }

            DivisionDat();
            
            //clearTextBox();
            //$('#MyModal').modal('hide');
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function GetID(Id) {
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
function Update_Div() {
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
            DivisionData();
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


function OnBeginCreate() {
    $("#divProgressCreate").html('<img src="/Content/Images/ajax-loader.gif" alt="Loading..." />&nbsp;&nbsp;Processing please wait...');
    document.getElementById("create-product-buttons").style.display = 'none';
}
function OnCompleteCreate() {
    $("#divProgressCreate").html("");
    $('#page-content').scrollToTop();
    document.getElementById("create-product-buttons").style.display = 'block';
}
function OnSuccessCreate() {
    var ls = '@(ViewBag.FormStatus)';
    if (ls == 'Message:') {
        $("input").each(function () {
            $(this).val("");
        });
    }
    else {

    }
}

