$(document).ready(function () {
    Getdata();
    //$('#example').DataTable();
      
});


function Getdata() {
    $.ajax({
        url: "/Group/List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            
            //var html = '';
            //var i = 1;
            $("#tblGroup").dataTable({
                data: r,
                "bDestroy": true,
                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                    $("td:first", nRow).html(iDisplayIndex + 1);
                    return nRow;
                },
                columns: [
                    {
                        "data": "GroupId"
                    },
                    { "data": "GroupName" },
                    {
                        "data": "GroupId",
                        "render": function (GroupId) {
                            return '<div class="dropdown dropdown-action" align="Right"><a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#" data-toggle="modal" data-target="#add_department" onclick="GetID(' + GroupId + ')"><i class="fa fa-pencil m-r-5"></i>Edit</a><a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_department" onclick="Deleted(' + GroupId + ')"><i class="fa fa-trash-o m-r-5"></i> Delete</a></div></div>'
                        }
                    }
                ],
                "columnDefs": [{
                    'targets': [0, 2],
                    'orderable': false

                }],
                "order":[1,'asc']
            })
            
            //$.each(r, function (key, item) {

            //    html += '<tr>';
            //    html += '<td>' + parseInt(i++) + '</td>';
            //    html += '<td>' + item.GroupName + '</td>';
            //    html += '<td class="text-right">';
            //    html += '<div class="dropdown dropdown-action">';
            //    html += ' <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>';
            //    html += '<div class="dropdown-menu dropdown-menu-right">';
            //    html += '<a class="dropdown-item" href="#" data-toggle="modal" data-target="#add_department" onclick="GetID(' + item.GroupId + ')"><i class="fa fa-pencil m-r-5"></i>Edit</a><a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_department" onclick="Deleted(' + item.GroupId + ')"><i class="fa fa-trash-o m-r-5"></i> Delete</a></td >';
            //    html += '</div>';
            //    html += '</div>'
            //    html += '</td>';
            //    html += '</tr>';
            //});
            //$('tbody').html(html);
            //$('#example').DataTable(html);
            //$('datatable').addClass(html);
            
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
}
function Insert() {
   
    var res = validate();
    if (res == false) {
       
        return false;
    }
    var obj_GrpIns = {
        GroupId: $('#GroupId').val(),
        GroupName: $('#GroupName').val()
    };
    $.ajax({
        url: "/Group/Insert_Group",
        type: "Post",
        data: JSON.stringify(obj_GrpIns),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            Getdata();
            
                       
            var msg = r.split('$');
           
            if (msg[1] == "True") {
               
                $(".errMsg").fadeIn().html("<ul><li>" + msg[0]+"</li></ul>");
                setTimeout(function () {
                    $('.errMsg').fadeOut('slow');
                }, 2000);
            }
            else {
                $(".errMsg1").fadeIn().html("<ul><li>" + msg[0]+"</li></ul>");
                setTimeout(function () {
                    $('.errMsg1').fadeOut('slow');
                }, 2000);
            }
            clearGroup();
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function GetID(Id) {
    
    $("#GroupName").css('border-color', 'lightngrey');
    $.ajax({
        url: "/Master/GetGroupByID/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
           
            $('#GroupId').val(r.GroupId);
            $('#GroupName').val(r.GroupName);
            
            $('#btnAdd').hide();
            $('#btnUpdate').show();
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
    return false;
}
function Updated() {
    var res = validate();
    if (res == false) {

        return false;
    }
    var obj_GrpUpd = {
        GroupId: $('#GroupId').val(),
        GroupName: $('#GroupName').val()
        
    };
    $.ajax({
        url: "/Group/Update_Group",
        type: "Post",
        data: JSON.stringify(obj_GrpUpd),
        
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            Getdata();
            
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
            clearGroup();
        },
        
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}
function Deleted(Id) {
   
    $('#GroupId').val(Id)
    var ans = confirm(errormessage.responseText);
    
}


function FinalDelete() {
    var Id = $('#GroupId').val();
   
    $.ajax({
        url: "/Group/Delete_Group/" + Id,
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            Getdata();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function clearGroup() {
    
    $("#GroupId").val('');
    $('#GroupName').val('');
    $("#btnUpdate").hide();
    $("#btnAdd").show();
    $('#GroupName').css('border-color', 'lightgrey');    
    $('#MyModal').modal('hide');
}
function validate() {
   
    var isValid = true;
    if ($('#GroupName').val().trim() == "") {
        $('#GroupName').css('border-color', 'red');
        isValid = false;
    }
    else {
        $('#GroupName').css('border-color', 'lightgrey');
    }
    return isValid;
}