$(document).ready(function () {
    loadData();
    getDivision();
});

function getDivision() {
    $.ajax({
        url: "/Master/Division_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            $('#ddl_Division').empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r, function (key, item) {
                $('#ddl_Division').append($("<option></option>").val(item.DivisionId).html(item.DivisionName));
            });
        }
    });
}
function loadData() {
    $.ajax({
        url: "/Master/Department_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {

            $("#tblDepartment").dataTable({
                data: r,
                "bDestroy": true,
                columns: [
                    { "data": "DivisionName" },
                    { "data": "Department_Name" },
                    {
                        "data": "Department_Id",
                        "render": function (Department_Id) {
                            return '<div class="dropdown dropdown-action"><a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#" data-toggle="modal" data-target="#add_department" onclick="GetID(' + Department_Id + ')"><i class="fa fa-pencil m-r-5"></i>Edit</a><a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_department" onclick="Deleted(' + Department_Id + ')"><i class="fa fa-trash-o m-r-5"></i> Delete</a></div></div>'
                        }
                    }
                ]
            })


            //$("#example").dataTable({
            //    data: data,
            //    columns: [
            //        { "data": "DivisionName" },
            //        { "data": "Department_Name" },
            //        {
            //            "data": "Department_Id",
            //            "render": function (Department_Id) {
            //                return '<a href="#" onclick="getbyID(' + Department_Id + ')">Edit</a>|<a href="#" onclick="Delete(' + Department_Id + ')">Delete</a></td > '
            //            }
            //        }
            //    ]
            //})
            ////var html = '';
            ////var i = 0;
            ////$.each(r, function (key, item) {
            ////    html += '<tr>';
            ////    html += '<td>' + parseInt(i+1) + '</td>';
            ////    html += '<td>' + item.DivisionName + '</td>';
            ////    html += '<td>' + item.Department_Name + '</td>';
            ////    html += '<td><a href="#"  onclick="getbyID(' + item.Department_Id + ')">Edit</a>|<a href="#" onclick="Delete(' + item.Department_Id + ')">Delete</a></td > ';
            ////    html += '</tr>';

            ////});
            
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
}

function AddDepartment() {

    var res = validate();
    if (res == false) {

        return false;
    }
    var Obj_Dep = {
        DivisionId: $('#ddl_Division').val(),
        Department_Name: $('#txt_DepName').val()
    };
    $.ajax({
        url: "/Master/Insert_Department",
        type: "Post",
        data: JSON.stringify(Obj_Dep),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
           
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
            loadData();
            clearTextBox();
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function getbyID(Id) {
  
    $("#ddl_Division").css('border-color', 'lightngrey');
    $("#txt_DepName").css('border-color', 'lightngrey');
    $.ajax({
        url: "/Master/GetDepartmentByID/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            $('#hdnDepartmentID').val(r.Department_Id);
            $('#txt_DepName').val(r.Department_Name);
            $('#ddl_Division').val(r.DivisionId);
            $('#myModal').modal('show');
            $('#btnAdd').hide();
            $('#btnUpdate').show();
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
    return false;
}
function UpdateDepartment() {
    var res = validate();
    if (res == false) {

        return false;
    }
  
    var Obj_Dep = {
        Department_Id: $('#hdnDepartmentID').val(),
        DivisionId: $('#ddl_Division').val(),
        Department_Name: $('#txt_DepName').val()
    };
    $.ajax({
        url: "/Master/Update_Department",
        type: "Post",
        data: JSON.stringify(Obj_Dep),

        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            loadData();
            var msg = r.split('$');
            alert(msg);
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
            url: "/Master/Delete_Department/" + Id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (r) {
                loadData();
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
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function clearTextBox() {

    $("#hdnDepartmentID").val('');
    $('#txt_DepName').val('');
    $('#ddl_Division').val('0');
    $("#btnUpdate").hide();
    $("#btnAdd").show();
    $('#txt_DepName').css('border-color', 'lightgrey');
    $('#ddl_Division').css('border-color', 'lightgrey');
   
}

function closeTextBox() {

    $("#hdnDepartmentID").val('');
    $('#txt_DepName').val('');
    $('#ddl_Division').val('0');
    $("#btnUpdate").hide();
    $("#btnAdd").show();
    $('#txt_DepName').css('border-color', 'lightgrey');
    $('#ddl_Division').css('border-color', 'lightgrey');
    $('#myModal').modal('hide');
}
function validate() {

    var isValid = true;
    $('[id*=txt_DepName],[id*=ddl_Division]').each(function () {
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