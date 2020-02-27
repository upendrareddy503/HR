$(document).ready(function () {
    load_Customer();
   

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





function load_Customer() {
    $.ajax({
        url: "/Customer/customer_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#tblCustomer").dataTable({
                data: data,
                "bDestroy": true,
                columns: [

                    { "data": "Tcm_Name" },
                    { "data": "Tcm_Address" },
                    { "data": "Tcm_EmailID" },

                    {
                        "data": "CustomerId",
                        "render": function (CustomerId) {
                            return '<div class="dropdown dropdown-action"><a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a><div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#" data-toggle="modal" data-target="#add_Customer" onclick="Edit_Customer(' + CustomerId + ')"><i class="fa fa-pencil m-r-5"></i>Edit</a><a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_department" onclick="Deleted(' + CustomerId + ')"><i class="fa fa-trash-o m-r-5"></i> Delete</a></div></div>'
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

function Add_Customer() {
    var res = validate();
    if (res == false) {

        return false;
    }

    var obj_ComInser = {
        Tcm_id: $('#Tci_id').val(),
        Tcm_Name: $('#txt_CustomerName').val(),
        Tcm_Code: $('#txt_Code').val(),
        Tcm_Address: $('#txt_Address').val(),
        Tcm_phoneNo: $('#txt_PhoneNo').val(),
        Tcm_EmailID: $('#txt_EmailID').val(),
        Tcm_GST: $('#txt_GST').val(),
        Tcm_Pan_No: $('#Pan').val(),
       
    };

    $.ajax({
        url: "/Customer/Insert_Customer",
        type: "Post",
        data: JSON.stringify(obj_ComInser),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            load_Customer();
           // clearTextBox();
            $('#MyModal').modal('hide');
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}

function Edit_Customer(Id) {

   
    $.ajax({
        url: "/Customer/GetCustomerByID/" + Id,
        type: "Post",
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
           
            $('#txt_CustomerName').val(r.Tcm_Name);
            $('#txt_Code').val(r.Tcm_Code);
            $('#txt_Address').val(r.Tcm_Address);
            $('#txt_PhoneNo').val(r.Tcm_phoneNo);
            $('#txt_EmailID').val(r.Tcm_EmailID);
            $('#txt_GST').val(r.Tcm_GST);
            $('#Pan').val(r.Tcm_Pan_No);
            alert(r.CustomerId);
            $('#hcid').val(r.CustomerId);
            
            $('#btnAdd').hide();
            $('#btnUpdate').show();
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
    return false;
}
function Update_Customer() {

    var res = validate();
    if (res == false) {

        return false;
    }
    
    var obj_ComUpd = {
        CustomerId: $('#hcid').val(),
        Tcm_Name: $('#txt_CustomerName').val(),
        Tcm_Code: $('#txt_Code').val(),
        Tcm_Address: $('#txt_Address').val(),
        Tcm_phoneNo: $('#txt_PhoneNo').val(),      
        Tcm_EmailID: $('#txt_EmailID').val(),
        Tcm_GST: $('#txt_GST').val(),
        Tcm_Pan_No: $('#Pan').val()
        
    };
    $.ajax({
        url: "/Customer/Update_Customer",
        type: "Post",
        data: JSON.stringify(obj_ComUpd),

        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        success: function (r) {
            load_Customer();
            $('#MyModal').modal('hide');
            clearTextBox();
        },
        error: function (errMsg) {
            alert(errMsg.responseText);
        }
    });
}
function Deleted(Id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Customer/Delete_Company/" + Id,
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




