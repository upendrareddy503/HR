$(document).ready(function () {

    loadData();
    getCountry();

});

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
function loadData() {
    $.ajax({
        url: "/Master/State_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {

            $("#example").dataTable({
                data: data,
                columns: [
                    { "data": "StateName" },
                    { "data": "CountryName" },
                    { "data": "StateCode" },
                    { "data": "StateGstCode" },
                    {
                        "data": "StateId",
                        "render": function (StateId) {
                            return '<a href="#" onclick="getbyID(' + StateId + ')">Edit</a>|<a href="#" onclick="Delete(' + StateId + ')">Delete</a></td > '
                        }
                    }
                ]
            })

        },
         
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
}

function AddState() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var obj_Stt = {
        CountryId: $('#ddl_Country').val(),
        StateName: $('#txt_StateName').val(),
        StateCode: $('#txt_StateCode').val(),
        StateGstCode: $('#txt_StateGstCode').val()
    };
    $.ajax({
        url: "/Master/Insert_State",
        type: "Post",
        data: JSON.stringify(obj_Stt),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            loadData();
            clearTextBox();
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
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function getbyID(Id) {
    $("#ddl_Country").css('border-color', 'lightngrey');
    $("#txt_StateName").css('border-color', 'lightngrey');
    $.ajax({
        url: "/Master/GetStateByID/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            $('#hdnStateID').val(r.StateId);
            $('#txt_StateName').val(r.StateName);
            $('#txt_StateCode').val(r.StateCode);
            $('#txt_StateGstCode').val(r.StateGstCode);
            $('#ddl_Country').val(r.CountryId);
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

function UpdateState() {
    var res = validate();
    if (res == false) {

        return false;
    }
    var obj_Stt = {
        StateId: $('#hdnStateID').val(),
        StateName: $('#txt_StateName').val(),
        CountryId: $('#ddl_Country').val(),
        StateGstCode: $('#txt_StateGstCode').val(),
        StateCode: $('#txt_StateCode').val()
    };
    $.ajax({
        url: "/Master/Update_State",
        type: "Post",
        data: JSON.stringify(obj_Stt),

        contentType: "application/json;charset=utf-8",
        dataType: 'json',
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
            clearTextBox();
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function DeleteState(Id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Master/Delete_State/" + Id,
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

    $("#hdnStateID").val('');
    $('#txt_StateName').val('');
    $('#txt_StateCode').val('');
    $('#txt_StateGstCode').val('');
    $('#ddl_Country').val('0');
    $("#btnUpdate").hide();
    $("#btnAdd").show();
    $('#txt_StateName').css('border-color', 'lightgrey');
    $('#ddl_Country').css('border-color', 'lightgrey');
   
}


function CloseTextBox() {

    $("#hdnStateID").val('');
    $('#txt_StateName').val('');
    $('#txt_StateCode').val('');
    $('#txt_StateGstCode').val('');
    $('#ddl_Country').val('0');
    $("#btnUpdate").hide();
    $("#btnAdd").show();
    $('#txt_StateName').css('border-color', 'lightgrey');
    $('#ddl_Country').css('border-color', 'lightgrey');
    $('#txt_StateCode').css('border-color', 'lightgrey');
    $('#txt_StateGstCode').css('border-color', 'lightgrey');
    $('#myModal').modal('hide');
}

function validate() {

    var isValid = true;
    $('[id*=txt_StateName],[id*=txt_StateCode],[id*=txt_StateGstCode],[id*=ddl_Country]').each(function () {
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