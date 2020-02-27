$(document).ready(function () {
    load_Company();
    getCountry();
    getState();
    $('#datepicker').datepicker();
    $("#userimage").change(function () {
        // $('.input-group.date').datepicker();
        var data = new FormData();
        alert(data);
        var files = $("#userimage").get(0).files;
        if (files.length > 0) {
            data.append("MyImages", files[0]);
        }

        $.ajax({
            url: "/Master/UploadFile",
            type: "POST",
            processData: false,
            contentType: false,
            data: data,
            success: function (response) {
                //code after success
                var my_path = "/Images/User/" + response + "?";
                var d = new Date();
                $("#imgPreview").attr("src", my_path + d.getTime());
                //$("#imgPreview").attr('src', '/Images/User/' + response);
            },
            error: function (er) {
                alert(er);
            }

        });
    });

    $("[id*=txt_EmailID]").focusout(function () {

        if ($("[id*=txt_EmailID]").val() == '') {
            $('#spEmail').show();
            $('#spEmailValid').css('display', 'none');
            $(this).css("border", "1px solid red");
            return false;
        }
        else {
            $('#spEmail').css('display', 'none');
            if (ValidateEmail($("[id*=txt_EmailID]").val())) {
                $('#spEmailValid').css('display', 'none');
                $(this).css("border", "1px solid red");
            }
            else {
                $('#spEmailValid').show();
                $('#spEmail').show('display', 'none');
                $(this).css("border", "1px solid red");
            }
        }
    });
});
function ValidateEmail(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
};



function getCountry() {
    $.ajax({
        url: "/Master/Country_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            $('#ddl_Country').empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r, function (key, item) {
                $('#ddl_Country').append($("<option></option>").val(item.CountryId).html(item.CountryName));
            });
        }
    });
}




function getState() {
    $.ajax({
        url: "/Master/State_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            $('#ddl_State').empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r, function (key, item) {
                $('#ddl_State').append($("<option></option>").val(item.StateId).html(item.StateName));
            });
        }
    });
}

function load_Company() {
    $.ajax({
        url: "/Master/Company_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#tblCompany").dataTable({
                data: data,
                "bDestroy": true,
                columns: [

                    { "data": "Tci_Name" },
                    { "data": "Tci_Address" },
                    { "data": "Tci_EmailID" },

                    {
                        "data": "CompanyId",
                        "render": function (CompanyId) {
                            return '<div class="dropdown dropdown-action"><a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#" data-toggle="modal" data-target="#add_Company" onclick="Edit_Company(' + CompanyId + ')"><i class="fa fa-pencil m-r-5"></i>Edit</a></div>'
                        }
                    }
                ],

            })

        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
}

function Add_company() {
    var res = validate();
    if (res == false) {

        return false;
    }

    var obj_ComInser = {
        Tci_id: $('#Tci_id').val(),
        Tci_Name: $('#txt_CompanyName').val(),
        Tci_Code: $('#txt_Code').val(),
        Tci_Address: $('#txt_Address').val(),
        Tci_City: $('#txt_City').val(),
        Tci_District: $('#txt_District').val(),
        Tci_State: $('#txt_State').val(),
        Tci_Country: $('#ddl_Country').val(),
        Tci_Logo: ($('#imgPreview').attr('src')),
        Tci_phoneNo: $('#txt_PhoneNo').val(),
        Tci_EDate: $('#txt_EstDate').val(),
        Tci_EmailID: $('#txt_EmailID').val(),
        Tci_GST: $('#txt_GST').val(),
        Tci_Tan: $('#txt_Tan').val(),
        Tci_Pan_No: $('#txt_Pan').val(),
        Tci_Website: $('#txt_Website').val(),
    };

    $.ajax({
        url: "/Master/Insert_Company",
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

function Edit_Company(Id) {

    clearCSS();
    $.ajax({
        url: "/Master/GetCompanyByID/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            $('#hcid').val(r.CompanyId);
            $('#txt_CompanyName').val(r.Tci_Name);
            $('#txt_Code').val(r.Tci_Code);
            $('#txt_Address').val(r.Tci_Address);
            $('#txt_City').val(r.Tci_City);
            $('#txt_District').val(r.Tci_District);
            $('#txt_State').val(r.Tci_State);
            $('#ddl_Country').val(r.Tci_Country);
            $('#txt_PhoneNo').val(r.Tci_phoneNo);
            $('#txt_EmailID').val(r.Tci_EmailID);
            $('#txt_GST').val(r.Tci_GST);
            $('#txt_Tan').val(r.Tci_Tan);
            $('#txt_Pan').val(r.Tci_Pan_No);
            $('#txt_Website').val(r.Tci_Website)
            $('#imgPreview').attr('src', r.Tci_Logo);
            if (r.Tci_EDate != null && r.Tci_EDate != "") {
                var date = new Date(parseInt(r.Tci_EstDate.substr(6)));
                var month = date.getMonth() + 1;
                alert(date);

                $('#datepicker').val(date.getDate() + "-" + month + "-" + date.getFullYear());
            }

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
function Update_company() {

    var res = validate();
    if (res == false) {

        return false;
    }
    
    var obj_ComUpd = {
        CompanyId: $('#hcid').val(),
        Tci_EDate: $('#datepicker').val(),
        Tci_Name: $('#txt_CompanyName').val(),
        Tci_Code: $('#txt_Code').val(),
        Tci_Address: $('#txt_Address').val(),
        Tci_City: $('#txt_City').val(),
        Tci_District: $('#txt_District').val(),
        Tci_State: $('#txt_State').val(),
        Tci_Country: $('#ddl_Country').val(),
        Tci_phoneNo: $('#txt_PhoneNo').val(),      
        Tci_EmailID: $('#txt_EmailID').val(),
        Tci_GST: $('#txt_GST').val(),
        Tci_Tan: $('#txt_Tan').val(),
        Tci_Pan_No: $('#txt_Pan').val(),
        Tci_Website: $('#txt_Website').val(),
        Tci_Logo: ($('#imgPreview').attr('src'))

    };
    $.ajax({
        url: "/Master/Update_Company",
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
function Deleted(Id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Master/Delete_Company/" + Id,
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
    $('#ddl_Country').val('');
    $('#txt_PhoneNo').val('');
    $('#txt_EstDate').val('');
    $('#txt_EmailID').val('');
    $('#txt_GST').val('');
    $('#txt_Tan').valawwd('');
    $('#txt_Pan').val('');
    $('#txt_Website').val('');
    $("#btnUpdate").hide();
    $("#btnAdd").show();
    /// $('#DivisionName').css('border-color', 'lightgrey');    
    $('#MyModal').modal('hide');
}




