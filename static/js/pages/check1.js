/*$(document).ready(function(){
    $('input[id = "name"]').bind('input propertychange', function(){
        checkusername();
    });
    $('input[id = "passwd"]').bind('input propertychange', function(){
        checkpasswd();
    });
});*/

$(document).ready(function(){
    document.getElementById("name").oninput = function(){checkusername()};
    document.getElementById("passwd").oninput = function(){checkpasswd()};
    document.getElementById("repasswd").oninput = function(){checkrepasswd()};
    document.getElementById("email").oninput = function(){checkemail()};

});


function checkusername(){
    var re_username  = /^\w{3,10}$/;
    var username = document.getElementById("name").value;
    var err_msg = document.getElementById("msg-error2");
    document.getElementById("envelope").style.top = "27px";

    if(!re_username.test(username)){
        //err_msg.innerText = "用户名必须是3-10位英文字母或数字!";
        $('.ustatus').html("");
        $('.ustatus').removeClass("tick2");
        //$('.status').html('<img src = "/static/img/blue@2x.png">');
        $('.ustatus').addClass('error2');
        return false;
    }else{
        //err_msg.innerText = "用户名正确";
        $('.ustatus').html("");
        //$('.status').html('<img src = "/home/sameen7/MedicalWeb/static/img/check.png">');
        $('.ustatus').removeClass("error2");
        $('.ustatus').addClass('tick2');
    }

    return true;
}

function checkpasswd(){
    var re_password = /^\w{6,20}$/;
    var password = document.getElementById("passwd").value;
    var err_msg = document.getElementById("msg-error2");
    //err_msg.innerText = password_2;
    document.getElementById("log-in").style.top = "27px";
    if(!re_password.test(password)){
        //err_msg.innerText = "密码必须是6-20位!";
        $('.pstatus').html("");
        $('.pstatus').removeClass("tick2");
        $('.pstatus').addClass('error2');
        return false;
    }else{
        $('.pstatus').html("");
        $('.pstatus').removeClass("error2");
        $('.pstatus').addClass('tick2');
    }
    return true;
}

function checkrepasswd(){
    var re_password = /^\w{6,20}$/;
    var password = document.getElementById("passwd").value;
    var password_2 = document.getElementById("repasswd").value;
    var err_msg = document.getElementById("msg-error2");
    document.getElementById("send").style.top = "27px";

    if(re_password.test(password)){
        if(password!=password_2){
            //err_msg.innerText = "两次输入密码必须一致!";
            $('.restatus').html("");
            $('.restatus').removeClass("tick2");
            $('.restatus').addClass('error2');
            return false;
        }else if(password===password_2){
            $('.restatus').html("");
            $('.restatus').removeClass("error2");
            $('.restatus').addClass('tick2');
        }
    }else{
        $('.restatus').html("");
        $('.restatus').removeClass("tick2");
        $('.restatus').addClass('error2');
        return false;
    }
    return true;
}

function checkemail(){
    var re_email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    var email = document.getElementById("email").value;
    var err_msg = document.getElementById("msg-error2");
    document.getElementById("lock").style.top = "27px";

    if(re_email.test(email)){
        $('.estatus').html("");
        $('.estatus').removeClass("error2");
        $('.estatus').addClass('tick2');
        return true;
    }else{
        //err_msg.innerText = "请输入正确的邮箱!";
        $('.estatus').html("");
        $('.estatus').removeClass("tick2");
        $('.estatus').addClass('error2');
        return false;
    }
    return true;
}
