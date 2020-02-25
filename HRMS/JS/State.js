

$(document).ready(function () {

    loadState();
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
function loadState() {
    $.ajax({
        url: "/Master/State_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {

            $("#tblState").dataTable({
                data: data,
                "bDestroy": true,
                columns: [
                    { "data": "StateName" },
                    { "data": "CountryName" },
                    { "data": "StateCode" },
                    { "data": "StateGstCode" },
                    {
                        "data": "StateId",
                        "render": function (StateId) {
                            return '<div class="dropdown dropdown-action" align="right"><a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#" data-toggle="modal" data-target="#add_state" onclick="GetID(' + StateId + ')"><i class="fa fa-pencil m-r-5"></i>Edit</a><a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_state" onclick="Deleted(' + StateId + ')"><i class="fa fa-trash-o m-r-5"></i> Delete</a></div></div>'
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

function Insert_State() {
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
            loadState();
            Clear_State();
          
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

function GetID(Id) {
    clearCSS();
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

function Update_State() {
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
            loadState();
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
            Clear_State();
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function DeleteState(Id) {
  
        $.ajax({
            url: "/Master/Delete_State/" + Id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (r) {
                loadState();
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

function Clear_State() {

    $("#hdnStateID").val('');
    $('#txt_StateName').val('');
    $('#txt_StateCode').val('');
    $('#txt_StateGstCode').val('');
    $('#ddl_Country').val('0');
    $("#btnUpdate").hide();
    $("#btnAdd").show();
    clearCSS();
   
}



