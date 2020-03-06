$(document).ready(function () {

    loadHoliday();
    loadTimings();
});


function loadTimings() {
    $.ajax({
        url: "/Dashboard/GetPunchTimings",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
        }
    });
}



function loadHoliday() {

    $.ajax({
        url: "/Master/Holiday_ListDashboard",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
          
            var html = '';
            var i = 1;
            $.each(data, function (key, item) {
                var date = new Date(parseInt(item.Thi_Date.substr(6)));
                            var month = date.getMonth() + 1;
                 
                html += '<tr>';
                html += '<td class="holiday-title mb-0"><h4>' + item.Thi_Name + ' ' + date.getDate() + '-' + month + '-' + date.getFullYear() + '</h4></td>';
               
                html += '</tr>';
            });
          
            $('.Tdata').html(html);
        },


       
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
}



function clearholiday() {
    clearCSS();

    $('#txt_holName').val('');
    $('#tbDate').val('');
    $('#txt_Year').val('');
    $("#btnUpdate").hide();
    $("#btnAdd").show();

}