$(document).ready(function () {
    $('input[id$=tbDate]').datepicker({});
    dateFormat: "dd-mm-yyyy"
    loadData();



});

function AddHoliday() {


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
            loadData();
            //clearTextBox();
            $('#MyModal').modal('hide');
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function loadData() {
    $.ajax({
        url: "/Master/Holiday_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            var html = '';
            var i = 1;
            $.each(r, function (key, item) {

                html += '<tr>';
                html += '<td>' + parseInt(i) + '</td>';
                html += '<td>' + item.Thi_Name + '</td>';
                html += '<td>' + dateformat(item.Thi_Date) + '</td>';
                //html += '<td/>' + (item).string.Format("{0:dd-MMM-yyyy}"), item.Thi_Date + '</td>';
                html += '<td>' + item.Thi_Year + '</td>';

                html += '<td><a href="#"  onclick="getbyID(' + item.Thi_id + ')">Edit</a>|<a href="#" onclick="Delete(' + item.Thi_id + ')">Delete</a></td > ';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
}

function UpdateHoliday() {

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
            loadData();
            $('#MyModal').modal('hide');
            clearTextBox();
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function getbyID(Id) {


    $.ajax({
        url: "/Master/GetHolidayByID/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            $('#hdnHoliday').val(r.Thi_id);
            $('#txt_holName').val(r.Thi_Name);
            $('#tbDate').val(dateformat(r.Thi_Date));
            $('#txt_Year').val(r.Thi_Year);

            //{
            //    dateFormat: 'dd-M-yy' 
            //};


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
function Delete(Id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {

        $.ajax({
            url: "/Master/Delete_Holiday/" + Id,
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


function dateformat(datevalue) {


    var nowDate = new Date(parseInt(datevalue.substr(6)));
    var result = "";

    result += nowDate.format("dd-mm-yyyy")

    return result;

}