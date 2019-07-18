$(document).ready(function () {
    EmpRolesTables();
    getGroup();
    $('#ddl_Group').change(function () {
        if ($(this).val() != '0') {
            var Id = $(this).val();
            getDivisions(Id);
            //$.ajax({
            //    url: "/EmployeeRules/GetDivision/"+ Id,
            //    type: "Get",
            //    contentType: "application/json;charset=utf-8",
            //    dataType: "json",
            //    success: function (r) {
            //        $('#ddl_Division').empty().append('<option selected="selected" value="0">Select</option>');
            //        $.each(r, function (key, item) {
            //            $('#ddl_Division').append($("<option></option>").val(item.DivisionId).html(item.DivisionName));
            //        });
            //    }
            //});
        }
    });
})

function getDivisions(Id) {
    $.ajax({
        url: "/EmployeeRules/GetDivision/" + Id,
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
function EmpRolesTables() {
    $.ajax({
        url: "/EmployeeRules/EmployeeList",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {
            var html = '<table class="table table-bordered table-hover" id="tbl">';
            var i = 1;
            var thead = "";
            var tboby = "<tboby>";
            thead = "<thead> <tr><th>S.no </th><th>Employe id </th>"
            var thcolumn = "";
            $.each(r, function (key, item) {
                thcolumn += "<th><input type='checkbox' class='headName' value=" + item.Ter_Name + "/> " + item.Ter_Name + "</th>"
            });
            var tr = "";
            //$.each(r.EmployeeColumns, function (index, item) {
            //    tr += "<tr><td>" + (index++) + "</td>"

            //    $.each(r.EmployeeColumns, function (key, value) {
            //        tr += "<td>" + item + "</td>"
            //    });

            //    tr += "</tr>"

            //});

            thead += thcolumn + "</tr></thead>";
            tboby += tr + "</tbody>";
            html += thead + tboby + "</table>";
            // tbody += "<tr>" + emprulebind + "</tr>"
            $('#emprulebind').html(html);

        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    })
}

function Show() {
    if ($('#ddl_Group').val() != "0") {
        var obj_Emprule = {
            GroupId: $('#ddl_Group').val(),
        };
        $.ajax({
            url: "/EmployeeRules/Showdetails",

            type: "Post",
            data: JSON.stringify(obj_Emprule),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {
                var html = '';
                var i = 1;

                $.each(r, function (key, item) {
                    html += '<tr>';
                    html += '<td>' + parseInt(i + 1) + '</td>';
                    html += '<td>' + item.Tei_Empno + '</td>';
                    html += '<td>' + item.Tei_FirstName + '</td>';
                    alert(item.Rules);
                    var Rules = item.Rules.split('$');
                    for (var j = 0; j < Rules.length; j++)
                        var Rules1 = Rules[j].split('|');
                    var BatchId = $("#tbl thead tr:nth-child(" + 0 + ") th:nth-child(4) .headName").val();
                    alert(BatchId);
                    //var Rules1 = Rules.split('|');
                    //alert(Rules1);
                    //var Rules = data.d[i].Rules.split('$');
                    //var Rules1 = Rules.split(/[\s,]+/);

                    //alert(Rules1[Rules1.length-1]);
                });

            }

        });
    }
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
            $('#txt_Employeename').val(r.Tei_FirstName);
            $('#ddl_Group').val(r.GroupId);
            getDivisions(r.GroupId);
            $('#ddl_Division').val(r.DivisionId);
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

    //$("#txt_EmloyeeId").autocomplete({
    //    source: function (request, response) {
    //        var param = { Perfix: $('#txt_EmloyeeId').val() };
    //        $.ajax({
    //            url: "/EmployeeRules/EmployeeIdwise",
    //            data: JSON.stringify(param),
    //            dataType: "json",
    //            type: "POST",
    //            contentType: "application/json; charset=utf-8",
    //            success: function (data) {
    //                alert(data.d);
    //                response($.map(data.d, function (item) {
    //                    return {
    //                        label: item.split('-')[0],
    //                        val: item.split('-')[1]
    //                    }
    //                }))
    //            },
    //            error: function (XMLHttpRequest, textStatus, errorThrown) {
    //                var err = eval("(" + XMLHttpRequest.responseText + ")");
    //                alert(err.Message)
    //                // console.log("Ajax Error!");  
    //            }
    //        });
    //    },
    //    select: function (e, i) {
    //        $("#empruleId").val(i.item.val);
    //    },
    //    minLength: 1 //This is the Char length of inputTextBox  
    //});
});