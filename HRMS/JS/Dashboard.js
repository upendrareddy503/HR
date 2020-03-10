var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var weekdayShort = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep","Oct","Nov", "Dec"];
$(document).ready(function () {
    
    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();
    
    var a = new Date((month < 10 ? '0' : '') + month + "/" + (day < 10 ? '0' : '') + day + "/" + d.getFullYear());
    $('#curDate').text(weekday[a.getDay()] + "," + a.getDate() + " " + monthName[a.getMonth()] + " " + a.getFullYear());
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
            var html = "";
            $.each(data, function (key, item) {
                var str = item.ShiftInTime.split(' ');
                var str1 = str[1].split(':');
                html += "<li>";
                html += "<p class='mb - 0'>Punched at</p>";
                html += "<p class='res-activity-time'>";
                html += "<i class='fa fa-clock-o'></i>";
                html += str1[0] + ":" + str1[1] + " " + str[2];
                html += "</p></li>";
                //alert(str1[0] + ":" + str1[1] + " " + str[2]);
            });
            $('#Timings').html(html);

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
                var a = new Date((month < 10 ? '0' : '') + month + "/" + (date.getDate() < 10 ? '0' : '') + date.getDate() + "/" + date.getFullYear());
                var CurDatae=weekdayShort[a.getDay()] + " " + a.getDate() + " " + monthName[a.getMonth()] + " " + a.getFullYear();

                html += '<tr>';
                html += '<td class="holiday-title mb-0"><h4>' + CurDatae + '-' + item.Thi_Name + '</h4></td>';
                html += '<td class="holiday-title mb-0"></td>';
                
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