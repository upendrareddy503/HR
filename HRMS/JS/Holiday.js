$(document).ready(function () {

    loadHoliday();
    $('input[id$=tbDate]').datepicker({ dateFormat: 'dd-mm-yy' });

});

function AddHoliday() {

    var res = validate();
    if (res == false) {

        return false;
    }
    var Obj_Holi = {
        Thi_Name: $('#txt_holName').val(),
        Thi_Date: $('#tbDate').val(),
        Thi_Year: $('#txt_Year').val(),

    };
    $.ajax({
        url: "/Master/Insert_HolidayName",
        type: "Post",
        data: JSON.stringify(Obj_Holi),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            loadHoliday();
            //clearTextBox();
            $('#MyModal').modal('hide');
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function loadHoliday() {

    $.ajax({
        url: "/Master/Holiday_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#tblHoliday").dataTable({
                data: data,
                "bDestroy": true,
                columns: [
                    { "data": "Thi_Name" },
                    {
                        "data": "Thi_Date",
                        "render": function (jsonDate) {
                            var date = new Date(parseInt(jsonDate.substr(6)));
                            var month = date.getMonth() + 1;
                            return date.getDate() + "/" + month + "/" + date.getFullYear()
                        }
                    },
                    { "data": "Thi_Year" },
                    {
                        "data": "Thi_id",
                        "render": function (Thi_id) {

                            return '<div class="dropdown dropdown-action"><a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#" data-toggle="modal" data-target="#add_holiday" onclick="GetID(' + Thi_id + ')"><i class="fa fa-pencil m-r-5"></i>Edit</a><a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_department" onclick="Deleted(' + Thi_id + ')"><i class="fa fa-trash-o m-r-5"></i> Delete</a></div></div>'
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

function UpdateHoliday() {
  
    var res = validate();
    if (res == false) {

        return false;
    }
    var Obj_Holi = {
        Thi_id: $('#hdnHoliday').val(),
        Thi_Name: $('#txt_holName').val(),
        Thi_Date: $('#tbDate').val(),
        Thi_Year: $('#txt_Year').val()
    };
    $.ajax({
        url: "/Master/Update_HolidayName",
        type: "Post",
        data: JSON.stringify(Obj_Holi),

        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            loadHoliday();
            $('#MyModal').modal('hide');
            clearTextBox();
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function GetID(Id) {

    $.ajax({
        url: "/Master/GetHolidayByID/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            $('#hdnHoliday').val(r.Thi_id);
            $('#txt_holName').val(r.Thi_Name);
            if (r.Thi_Date != null) {
                var Date1 = "";
                var date = new Date(parseInt(r.Thi_Date.substr(6)));
                var month = date.getMonth() + 1;
                Date1 = date.getDate() + "-" + month + "-" + date.getFullYear()

                $("[id*=tbDate]").val(Date1);
            }
            // $('#tbDate').val(dateformat(r.Thi_Date));
            $('#txt_Year').val(r.Thi_Year);
         
            $('#btnAdd').hide();
            $('#btnUpdate').show();
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
    return false;
}
function Deleted(Id) {
   
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Master/Delete_Holiday/" + Id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadHoliday();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}


function dateformat(datevalue) {
    var nowDate = new Date(parseInt(datevalue.substr(6)));
    var result = "";
    result += nowDate.format("dd-mm-yyyy")
    return result;

}

function validate() {

    var isValid = true;
    if ($('#txt_holName').val().trim() == "") {
        $('#txt_holName').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#txt_holName').css('border-color', 'lightgrey');
    }
    if ($('#tbDate').val().trim() == "") {
        $('#tbDate').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#tbDate').css('border-color', 'lightgrey');
    }
    if ($('#txt_Year').val().trim() == "") {
        $('#txt_Year').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#txt_Year').css('border-color', 'lightgrey');
    }
    return isValid;
}


function clearTextBox() {


    $('#txt_holName').val('');
    $('#tbDate').val('');
    $('#txt_Year').val('');
    $("#btnUpdate").hide();
    $("#btnAdd").show();
    $('#txt_holName').css('border-color', 'lightgrey');
    $('#tbDate').css('border-color', 'lightgrey');
    $('#txt_Year').css('border-color', 'lightgrey');

}