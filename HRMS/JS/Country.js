$(document).ready(function () {
    loadData();
   

});
function loadData() {
    $.ajax({
        url: "/Master/Country_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {

            $("#example").dataTable({
                data: data,
                columns: [
                    { "data": "CountryName" },
                    {
                        "data": "CountryId",
                        "render": function (CountryId) {
                            return '<a href="#" onclick="getbyID(' + CountryId + ')">Edit</a>|<a href="#" onclick="Delete(' + CountryId +')">Delete</a></td > '
                        }
                    }
                ]
            })

        },
        //    var html = '';
        //    var i = 1;
        //    $.each(r, function (key, item) {
        //        html += '<tr>';
        //        html += '<td>' + parseInt(i) + '</td>';
        //        html += '<td>' + item.CountryName + '</td>';
        //        html += '<td><a href="#"  onclick="getbyID(' + item.CountryId + ')">Edit</a>|<a href="#" onclick="Delete(' + item.CountryId + ')">Delete</a></td > ';
        //        html += '</tr>';
        //        i++;
        //    });
        //    $('.tbody').html(html);
        //},
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
    var obj_CountryIns = {
        CountryId: $('#CountryId').val(),
        CountryName: $('#CountryName').val()
    };
    $.ajax({
        url: "/Master/Insert_Country",
        type: "Post",
        data: JSON.stringify(obj_CountryIns),
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
  
    $("#CountryName").css('border-color', 'lightngrey');
    $.ajax({
        url: "/Master/GetCountryByID/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {

            $('#CountryId').val(r.CountryId);
            $('#CountryName').val(r.CountryName);
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
function Update() {
    var res = validate();
    if (res == false) {

        return false;
    }
    var obj_CountryUpd = {
        CountryId: $('#CountryId').val(),
        CountryName: $('#CountryName').val()

    };
    $.ajax({
        url: "/Master/Update_Country",
        type: "Post",
        data: JSON.stringify(obj_CountryUpd),

        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            
            var msg = r.split('$');
            ;
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
function Delete(Id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Master/Delete_Country/" + Id,
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
    
    $('#CountryName').val('');
    $("#btnUpdate").hide();
    $("#btnAdd").show();
    $('#CountryName').css('border-color', 'lightgrey');
    
}
function CloseTextBox() {
    
    $('#CountryName').val('');
    $("#btnUpdate").hide();
    $("#btnAdd").show();
    $('#CountryName').css('border-color', 'lightgrey');
    $('#myModal').modal('hide');
}
function validate() {

    var isValid = true;
    if ($('#CountryName').val().trim() == "") {
        $('#CountryName').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#CountryName').css('border-color', 'lightgrey');
    }
    return isValid;
}