$(document).ready(function () {
    loadData_location();
    getCountry();
    getState();
    $('#datepicker').datepicker();
    var error_Email = false;
    $('#spEmailValid').hide();

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

function loadData_location() {
    $.ajax({
        url: "/Master/Location_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#tblLocation").dataTable({
                data: data,
                //"bDestroy": true,
                columns: [

                    { "data": "Tli_Name" },
                    { "data": "Tli_Address" },
                    { "data": "Tli_gst" },

                    {
                        "data": "Tli_Id",
                        "render": function (Tli_Id) {
                            return '<div class="dropdown dropdown-action"><a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#" data-toggle="modal" data-target="#add_location" onclick="get_location(' + Tli_Id + ')"><i class="fa fa-pencil m-r-5"></i>Edit</a></div>'
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

function Add() {

    var res = validate();
    if (res == false) {

        return false;
    }
    var obj_LocInser = {
        // Tli_id: $('#Tli_id').val(),
        Tli_Name: $('#txt_Location').val(),
        Tli_code: $('#txt_Code').val(),
        Tli_Address: $('#txt_Address').val(),
        Tli_City: $('#txt_City').val(),
        Tli_District: $('#txt_District').val(),
        Tli_State: $('#txt_State').val(),
        Tli_Country: $('#ddl_Country').val(),
        Tli_phoneNo: $('#txt_PhoneNo').val(),
        Tli_EstDate: $('#datepicker').val(),
        Tli_EmailID: $('#txt_EmailID').val(),
        Tli_gst: $('#txt_GST').val(),
        Tli_Tan: $('#txt_Tan').val(),
        Tli_Pan_no: $('#txt_Pan').val(),
        Tli_Website: $('#txt_Website').val(),
        Tli_Esi_no: $('#txt_ESI').val(),
        Tli_pf_no: $('#txt_PFno').val(),
        Tli_otherinfo: $('#txt_otherinfo').val()

    };

    $.ajax({
        url: "/Master/Insert_Location",
        type: "Post",
        data: JSON.stringify(obj_LocInser),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            loadData_location();
            clearTextBox();
            $('#MyModal').modal('hide');
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function get_location(Id) {

    $("#txt_Location").css('border-color', 'lightngrey');
    $.ajax({
        url: "/Master/GetLocationByID/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {

            $('#hid').val(r.Tli_Id);
            $('#txt_Location').val(r.Tli_Name);
            $('#txt_Code').val(r.Tli_code);
            alert(r.Tli_code);
            $('#txt_Address').val(r.Tli_Address);
            $('#txt_City').val(r.Tli_City);
            $('#txt_District').val(r.Tli_District);
            $('#txt_State').val(r.Tsi_Id);
            $('#ddl_Country').val(r.Tci_Id);
            $('#txt_PhoneNo').val(r.Tli_phoneno);

            //var date = r.Tli_EstDate;
            //var nowDate = new Date(parseInt(date.substring(6, date.length - 2)));
            //var Emp_Join_Date = "";
            //Emp_Join_Date = nowDate.format("yyyy-mm-dd");

            //$('#datepicker').val(Emp_Join_Date);
            $('#txt_EmailID').val(r.Tli_EmailID);
            $('#txt_GST').val(r.Tli_GST);
            $('#txt_Tan').val(r.Tli_Tan);
            $('#txt_Pan').val(r.Tli_Pan_No);
            $('#txt_Website').val(r.Tli_Website)
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
function Update_Location() {

    var res = validate();
    if (res == false) {

        return false;
    }

    var obj_locUpd = {

        Tli_id: $('#hid').val(),
        Tli_Name: $('#txt_Location').val(),
        Tli_code: $('#txt_Code').val(),
        Tli_Address: $('#txt_Address').val(),
        Tli_City: $('#txt_City').val(),
        Tli_District: $('#txt_District').val(),
        Tli_State: $('#txt_State').val(),
        Tli_Country: $('#ddl_Country').val(),
        Tli_phoneNo: $('#txt_PhoneNo').val(),
        Tli_EstDate: $('#datepicker').val(),
        Tli_EmailID: $('#txt_EmailID').val(),
        Tli_gst: $('#txt_GST').val(),
        Tli_Tan: $('#txt_Tan').val(),
        Tli_Pan_no: $('#txt_Pan').val(),
        Tli_Website: $('#txt_Website').val()
        //Tli_Esi_no: $('#txt_ESI').val(),
        //Tli_pf_no: $('#txt_PFno').val(),
        //Tli_otherinfo: $('#txt_otherinfo').val()
    };


    $.ajax({
        url: "/Master/Update_Location",
        type: "Post",
        data: JSON.stringify(obj_locUpd),

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
};
function Delete(Id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Master/Delete_Location/" + Id,
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


    $('#txt_Location').val('');
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

    $('[id*=txt_Location],[id*=txt_Address],[id*=txt_GST],[id*=txt_PhoneNo],[id*=txt_EmailID]').each(function () {
        if ($(this).length > 0) {
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
        }
    });
    if (isValid == false) {
        return false;
    }

    return isValid;
}

