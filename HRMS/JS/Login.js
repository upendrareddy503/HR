$(document).ready(function () {
    $('#btnLogin').click(function () {
        var obj_Login = {
            Tei_FirstName: $('#txt_CustID').val(),
            Tei_LastName: $('#txt_UserName').val(),
            Tei_Gender: $('#txt_Pwd').val()
        };
        $.ajax({
            url: "/Default/Login",
            type: "Post",
            data: JSON.stringify(obj_Login),
            contentType: "application/json;charset=utf-8",
            dataType: 'json',
            success: function (data) {
                if (data.UserID != null && data.UserID != "" && data.UserID != 0) {
                    window.location.href = "Dashboard";
                }
                else {
                    $(".errMsg1").fadeIn().html("<ul><li>Invaild Credintials</li></ul>");
                    setTimeout(function () {
                        $('.errMsg1').fadeOut('slow');
                    }, 2000);
                }
            }
        });
    })
})