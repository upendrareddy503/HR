$(document).ready(function () {
    loadCountry();
   
});
function loadCountry() {
    $.ajax({
        url: "/Master/Country_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {

            $("#tblCountry").dataTable({
                data: data,
                "bDestroy": true,
                columns: [
                    { "data": "CountryName" },
                    {
                        "data": "CountryId",
                        "render": function (CountryId) {
                            return '<div class="dropdown dropdown-action" align="right"><a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#" data-toggle="modal" data-target="#add_country" onclick="GetID(' + CountryId + ')"><i class="fa fa-pencil m-r-5"></i>Edit</a><a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_country" onclick="Deleted(' + CountryId + ')"><i class="fa fa-trash-o m-r-5"></i> Delete</a></div></div>'
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

function Insert_Country() {
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
            loadCountry();
            clearConFields();
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
function Update_Country() {
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
            loadCountry();
            clearConFields();
        },
        
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function Deleted(Id) {

    $('#CountryId').val(Id)
   // var ans = confirm(errormessage.responseText);

}

function DeleteCountry() {
    var Id = $('#CountryId').val();
        $.ajax({
            url: "/Master/Delete_Country/" + Id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (r) {
                loadCountry();
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

function clearConFields() {

    $("#CountryId").val('');
    $('#CountryName').val('');
    $("#btnUpdate").hide();
    $("#btnAdd").show();
    $('#CountryName').css('border-color', 'lightgrey');
    
}
//function CloseTextBox() {

//    $('#CountryName').val('');
//    $("#btnUpdate").hide();
//    $("#btnAdd").show();
//    $('#CountryName').css('border-color', 'lightgrey');
//    $('#myModal').modal('hide');
//}
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