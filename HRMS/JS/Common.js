function onlyString(e) {
    var key = e.keyCode;
    if (key >= 48 && key <= 57) {
        return false;
    }
    return true;
}


function isNumberKey(e) {
    var charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function validateEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function clearCSS() {
    //$('select').each(function () {
    $('.validate').css({
        "border": "",
        "background": ""
    });
    //});
}

function validate() {

    var isValid = true;
    $('.validate').each(function () {
        if ($.trim($(this).val()) == '' || $.trim($(this).val()) == '0') {
            isValid = false;
            $(this).css("border", "1px solid red");
        }
        else {
            $(this).css({
                "border": "",
                "background": ""
            });
        }
    });
    return isValid;
}
