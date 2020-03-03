$(document).ready(function () {
    $.ajax({
        url: "/Employee/List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            $("#tblEmp").dataTable({
                data: r,
                "bDestroy": true,               
                columns: [
                    {
                        "data": "Tei_FirstName",
                        render: function (data, type, row) {
                            return '<h2 class="table-avatar"><a href="#" class="avatar"><img alt="" src="' + row.Tei_Photo + '"></a><a href="#">' + row.Tei_FirstName + '</a></h2>'
                        }
                    },
                    {
                        "data": "Tei_Empno"
                    },
                    {
                        "data": "Tei_Email"
                    },
                    {
                        "data": "Tei_Phone"
                    },
                    {
                        "data": "Tei_Id",
                        "render": function (Tei_Id) {
                            return '<div class="dropdown dropdown-action" align="Right"><a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#" data-toggle="modal" data-target="#add_department" onclick="GetID(' + Tei_Id + ')"><i class="fa fa-pencil m-r-5"></i>Edit</a><a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_department" onclick="Deleted(' + Tei_Id + ')"><i class="fa fa-trash-o m-r-5"></i> Delete</a></div></div>'
                        }
                    }
                ],
               
            })
        }

    });
});