$(document).ready(function () {
    
    getGroup();
    
    $('input[id$=tApplicstionDate]').datepicker({
        dateFormat: "dd-mm-yyyy"
    });
    $('input[id$=txtfromdate]').datepicker({
        dateFormat: "dd-mm-yyyy"
    });
  

    $('input[id$=txttodate]').datepicker({
        dateFormat: "dd-mm-yyyy"
    });
    
    
    //hide and show for Employeeid text change event 
    //$('#txt_EmloyeeId').on('change', function () {
    //    if ($("#txt_EmloyeeId").val() != "") {
    //        $('#txt_Division').show();
    //        $('#division').show();
    //        $('#txt_Group').show();
    //        $('#group').show();
    //        $('#ddl_type').show();
    //        $('#type').show();
    //    }


    //});

    //hide for employee details

    $('#ddl_Group').change(function () {
        if ($(this).val() != '0') {
            var Id = $(this).val();
            getDivisions(Id);
                   }
    });
    


    //script for type of permission of leave dropdown
    $("#ddl_type").on("change", function () {
        if ($(this).val() === '1') {

            $('#leave').show();
            $('#datatype').show();
        }
        else if ($(this).val() === '2') {
            $('#leave').hide();
            $('#datatype').show();
        }
        else {
            $('#leave').hide();
            $('#datatype').show();
        }
    });



    //hide for date particulars  
    //$('#daywiseleave').hide();
    //$('#halfwiseleave').hide();


    //hide and show for leave daywise perticulars
    //$('#daywisee').on('change', function () {

    //    $('#daywiseleave').show();
    //    $('#halfwiseleave').hide();

    //});
    //$('#halfdaywisee').on('change', function () {
    //    $('#daywiseleave').hide();
    //    $('#halfwiseleave').show();


    //});

    //$("form input:radio").change(function () {
    //    if ($(this).val() == "daywisee") {
    //        // Disable your roomnumber element here
    //        //$('.roomNumber').attr('disabled', 'disabled');
    //        $('#daywiseleave').show();
    //    } else {
    //        // Re-enable here I guess
    //        //  $('.roomNumber').removeAttr('disabled');
    //        $('#halfwiseleave').hide();
    //    }
    //});


});


function getGroup() {
    $.ajax({
        url: "/Group/List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            $('#ddl_Group').empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r, function (key, item) {
                $('#ddl_Group').append($("<option></option>").val(item.GroupId).html(item.GroupName));
            });
        }
    });
}
function getDivisions(Id) {
    $.ajax({
        url: "/EmployeeRules/GetDivision/" + Id,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (r) {
            $('#ddl_Division').empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r, function (key, item) {
                $('#ddl_Division').append($("<option></option>").val(item.DivisionId).html(item.DivisionName));
            });
        }
    });
}
function getDivision() {
    $.ajax({
        url: "/Master/Division_List",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            $('#ddl_Division').empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r, function (key, item) {
                $('#ddl_Division').append($("<option></option>").val(item.DivisionId).html(item.DivisionName));
            });
        }
    });
}

var arr = []
$(document).ready(function () {
    $("#txt_EmloyeeId").autocomplete({

        source: function (request, response) {
            // var param = { Perfix: $('#txt_EmloyeeId').val() };
            $.ajax({
                url: "/EmployeeRules/EmployeeIdwise",
                type: "POST",
                dataType: "json",
                data: { Prefix: request.term },
                success: function (data) {
                    arr = data;
                    response($.map(data, function (item) {
                        return { label: item.Tei_Empno, value: item.Tei_Empno };
                    }))

                }
            })
        },
        select: function (ev, val) {
            var r = arr.find(x => x.Tei_Empno = val.item.value)
            $('#hdnEmpId').val(r.Tei_Id)
            $('#txt_Employeename').val(r.Tei_FirstName);
            $('#ddl_Group').val(r.Tegi_GroupId);
            getDivisions(r.Tegi_GroupId);
            $('#ddl_Division').val(r.Tei_DivisionId);
            //  $('#ddl_Division').append($("<option     />").val(r.Tei_DivisionId).text(this.Tdi_Name));
            //$('#ddl_Division').append($("<option></option>").val(item.Tei_DivisionId).text(item.Tei_DivisionId));
            // $('#ddl_Department').append($("<option></option>").val(item.Tei_DepartmentId).text(item.Tdp_Name));

        },


        messages: {
            noResults: "",
            results: function (count) {
                return count + (count > 1 ? ' results' : ' result ') + ' found';
            }
        }
    });

});






