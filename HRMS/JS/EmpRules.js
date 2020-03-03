$(document).ready(function () {
    EmpRolesTables();
    getGroup();

    $('input[id$=tApplicstionDate]').datepicker({});
    dateFormat: "dd-mm-yyyy"

    

    $('#ddl_Group').change(function () {
        if ($(this).val() != '0') {
            var Id = $(this).val();
            getDepartment(Id);
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


function getDepartment(Id) {
    $.ajax({
        url: "/EmployeeRules/GetDepartment/" + Id,
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (r) {
            $('#ddl_Dept').empty().append('<option selected="selected" value="0">Select</option>');
            $.each(r, function (key, item) {
                $('#ddl_Dept').append($("<option></option>").val(item.Department_Id).html(item.Department_Name));
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
            var thead = "";
            thead = "<thead> <tr><th>Employe id </th><th>Employee Name</th>"
            var thcolumn = "";
            var i = 0;
            $.each(r, function (key, item) {
                thcolumn += "<th><input type='checkbox' class='headName' value='" + item.Ter_Name + "' /> " + item.Ter_Name + "</th>"
                i=(parseInt(i))+1;
            });
            thcolumn += "<th style='display:none'>ID</th>";
            var tr = "";
            //$.each(r.EmployeeColumns, function (index, item) {
            //    tr += "<tr><td>" + (index++) + "</td>"

            //    $.each(r.EmployeeColumns, function (key, value) {
            //        tr += "<td>" + item + "</td>"
            //    });

            //    tr += "</tr>"

            //});

            thead += thcolumn + "</tr></thead>";            
            html += thead + "<tbody class='tRules'></tbody></table>";            
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
        var obj_Emprule;
        var URL;
        alert($('#ddl_Group').val())
        
        if ($('#txt_EmloyeeId').val() != "" && $('#ddl_Dept').val()!=0) {
             obj_Emprule = {
                GroupId: $('#ddl_Group').val(),               
                 Tei_Id: $('#hdnEmpId').val()
            };
            URL = "/employeerules/ShowEmployeedetails";
        }
        else if ($('#txt_EmloyeeId').val() == "" && $('#ddl_Dept').val() != 0) {
            obj_Emprule = {
                GroupId: $('#ddl_Group').val(),
                Tegi_DepartmentId: $('#ddl_Dept').val()
            };
            URL = "/employeerules/ShowDeptdetails";
        }
        else {
             obj_Emprule = {
                GroupId: $('#ddl_Group').val()              
            };
            URL = "/employeerules/Showdetails";
        }
        
        $.ajax({
            url: URL,
            type: "Post",
            data: JSON.stringify(obj_Emprule),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (r) {                
                var html = '';
                var i = 1;
                $.each(r, function (key, item) {
                    html += '<tr>';                   
                    html += '<td>' + item.Tei_Empno + '</td>';
                    html += '<td>' + item.Tei_FirstName + '</td>';                    
                    var Rules = item.Rules.split('$');
                    var length = parseInt(Rules.length + 3);
                    $("#hdnLength").val(length);                    
                    for (var j = 3; j < length; j++) {                        
                        var Rules1 = Rules[parseInt(j-3)].split('|');
                        //alert(Rules1[2]);
                        //var BatchId = $("#tbl thead tr:nth-child(1) th:nth-child(" + parseInt(j) + ") .headName").val();                        
                        
                            if (Rules1[2] == 'Y') {
                                html+='<td><input type="checkbox" class="chkRules" value="' + Rules1[0] + '" checked="true" /></td>'
                            }
                            else {
                                html+='<td><input type="checkbox" class="chkRules" value="' + Rules1[0] + '"/></td>'
                            }                        
                    }
                    html += '<td style="display:none">' + item.Tei_Id+'</td>';
                    html += '</tr>';
                    //var Rules1 = Rules.split('|');
                    //alert(Rules1);
                    //var Rules = data.d[i].Rules.split('$');
                    //var Rules1 = Rules.split(/[\s,]+/);

                    //alert(Rules1[Rules1.length-1]);                    
                });

                
                $('.tRules').html(html);
                

            }

        });
    }
}

function Add_EmpRules() {  
    alert($("#hdnLength").val());
    if ($("#tbl tbody tr").length > 0) {
        var len = $("#tbl tbody tr").length;
        var EmpId="";
        var Rules = "";
        var Rules1 = "";
        for (var i = 1; i <= len; i++) {
            EmpId += $("#tbl tbody tr:nth-child(" + i + ") td:nth-child(" + $("#hdnLength").val()+")").html() + "$" ;
            for (var j = 2; j < $("#hdnLength").val(); j++) {
                if ($("#tbl tbody tr:nth-child(" + i + ") td:nth-child(" + j + ") .chkRules").prop('checked') == true) {                    
                    Rules += $("#tbl tbody tr:nth-child(" + i + ") td:nth-child(" + j + ") .chkRules").val()+"," ;
                }

            }
            Rules1 += "$" + Rules.slice(0, -1);
            Rules = "";            
        }
        var obj_Emprule;
        obj_Emprule = {
            Tei_Empno: EmpId.slice(0,-1),
            Rules: Rules1
        };
        $.ajax({
            url: "/EmployeeRules/SaveRules",
            type: "Post",
            data: JSON.stringify(obj_Emprule),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function () { }
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
            $('#hdnEmpId').val(r.Tei_Id)            
            $('#txt_Employeename').val(r.Tei_FirstName);            
            $('#ddl_Group').val(r.Tegi_GroupId);
            getDepartment(r.Tegi_GroupId);
            $('#ddl_Dept').val(r.Tegi_DepartmentId);
            //getDivisions(r.Tegi_GroupId);
            //$('#ddl_Division').val(r.Tegi_DivisionId);
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


    $("#txt_Employeename").autocomplete({

        source: function (request, response) {
            // var param = { Perfix: $('#txt_EmloyeeId').val() };
            $.ajax({
                url: "/EmployeeRules/EmployeeNamewise",
                type: "POST",
                dataType: "json",
                data: { Prefix: request.term },
                success: function (data) {
                    arr = data;
                    response($.map(data, function (item) {
                        return { label: item.Tei_FirstName, value: item.Tei_FirstName };
                    }))

                }
            })
        },
        select: function (ev, val) {
            var r = arr.find(x => x.Tei_FirstName = val.item.value)
            $('#hdnEmpId').val(r.Tei_Id)
            $('#txt_EmloyeeId').val(r.Tei_Empno);
            $('#ddl_Group').val(r.Tegi_GroupId);
            getDepartment(r.Tegi_GroupId);
            $('#ddl_Dept').val(r.Tegi_DepartmentId);
            //getDivisions(r.Tegi_GroupId);
            //$('#ddl_Division').val(r.Tegi_DivisionId);
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