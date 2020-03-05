$(document).ready(function () {
    loadDivEmpList();
    $('#btnCloseDivModal').click(function () {
        loadDivEmpList();
        clearEmp();
    });
});

function loadDivEmpList() {

    $.ajax({
        url: "/Employee/List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            var html = "";
            $.each(r, function (key, item) {

                html += '<div class="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">';
                html += '<div class="profile-widget">';
                html += '<div class="profile-img"> ';
                html += '<a href="#" class="avatar"><img src="' + item.Tei_Photo + '" alt=""></a>';
                html += '</div>';
                html += '<div class="dropdown profile-action">';
                html += '<a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>';
                html += '<div class="dropdown-menu dropdown-menu-right">';
                html += '<a class="dropdown-item" href="#" data-toggle="modal" data-target="#add_employee" onclick="GetListID(' + item.Tei_Id + ')"><i class="fa fa-pencil m-r-5"></i>Edit</a>';
                html += '<a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_Employee" onclick="Deleted(' + item.Tei_Id + ')"><i class="fa fa-trash-o m-r-5"></i> Delete</a>';
                html += '</div>';
                html += '</div>';
                html += '<h4 class="user-name m-t-10 mb-0 text-ellipsis"><a href="profile.html">' + item.Tei_FirstName + '</a></h4>';
                html += '</div>';
                html += '</div>';
            });
            $('#divContent').html(html);
        }
    });
}


function FinalDivDelete() {
    var Id = $('#hid').val();

    $.ajax({
        url: "/Employee/Delete_Employee/" + Id,
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            loadDivEmpList();
            $('#hid').val('');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
