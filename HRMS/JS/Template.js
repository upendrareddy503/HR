$(document).ready(function () {
    $('#btnEmpTempUpload').click(function () {
        $('#btnEmpTempUpl').click();
    });
    $("#btnEmpTempUpl").change(function () {
        var data = new FormData();
        var files = $(this).get(0).files;
        if (files.length > 0) {
            data.append("MyImages", files[0]);
        }
        $.ajax({
            url: "/Employee/UploadHomeReport",
            type: "POST",
            processData: false,
            contentType: false,
            data: data,
            success: function (response) {
            }
        });
    });
})