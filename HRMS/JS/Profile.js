$(document).ready(function () {

    loadprofile();


});



function loadprofile() {

    $.ajax({
        url: "/Dashboard/profile_Details",
        type: "Get",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (r) {

            $('#username').text(r.Tei_FirstName + ' ' + r.Tei_LastName);
            $('#Desig').text(r.Tdg_Name);
            $('#Dep').text(r.Tdp_Name);
            $('#Empid').text(r.Tei_Empno);
            $('#Dateofjoin').text(r.Tei_Empno);
            $('#phone').text(r.Tei_Phone);
            $('#Email').text(r.Tei_Email);
            $('#birthday').text(r.Tei_Email);
            $('#Address').text(r.Tei_Address1);
            $('#Gender').text(r.Tei_Gender);
            
            $('#Aadharno').text(r.Tei_AadharNo);
            $('#PFnumber').text(r.Tegi_PfNo);
            $('#ESINumber').text(r.Tegi_EsiNo);
            $('#UANNumber').text(r.Tegi_UANNumber);
            $('#imgDashPreview').attr("src",r.Tei_Photo);
            
        },
        error: function (errmsg) {
            alert(errmsg.responseText);
        }
    });
}

