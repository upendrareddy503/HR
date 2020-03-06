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
            $('#phone').text(r.Tei_Phone);
            $('#Email').text(r.Tei_Email);
            $('#birthday').text(r.Tei_Email);
            $('#Address').text(r.Tei_Address1);
            $('#Gender').text(r.Tei_Gender);
            var date = new Date(parseInt(r.Tei_JoiningDate.substr(6)));
            var month = date.getMonth() + 1;           
            $('#Dateofjoin').text(date.getDate() + "-" + month + "-" + date.getFullYear());
            var date1 = new Date(parseInt(r.Tei_DateofBirth.substr(6)));
            var month1 = date1.getMonth() + 1; 
            $('#Dateofbirth').text(date1.getDate() + "-" + month1 + "-" + date1.getFullYear());            
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

