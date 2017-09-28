/**
 * Created by wangcaimeng on 2017/3/14.
 * */
$(document).ready(function(){

    editUserDetail();

    $("#submitUserDetail").click(function () {
        submitUserDetail();
        editUserDetail();
    });
});

    function editUserDetail() {
        $.ajax({
            type: "GET",
            url: "/i6/",
            data: {},
            dataType: "json",
            success: function (item) {
                $("#DoctorInfo input[name='sex'][value='"+item.sex+"']").attr('checked',true);
                $("#DoctorInfo input[name='D_id']").val(item.D_id);
                $("#DoctorInfo input[name='name']").val(item.name);
                $("#DoctorInfo input[name='birthday']").val(item.birthday);
                $("#DoctorInfo input[name='userName']").val(item.userName);
                $("#DoctorInfo input[name='cellphone']").val(item.cellphone);
                $("#DoctorInfo input[name='weChat']").val(item.weChat);
                $("#DoctorInfo input[name='mail']").val(item.mail);
                $("#DoctorInfo input[name='title']").val(item.title);
                $("#DoctorInfo input[name='hospital']").val(item.hospital);
                $("#DoctorInfo input[name='department']").val(item.department);
                $("#DoctorInfo input[name='userGroup'][value='"+item.userGroup+"']").attr('checked',true);
                $("#DoctorInfo input[name='skincolor'][value='"+item.skincolor+"']").attr('checked',true);
                $("#DoctorInfo input[name='registerDate']").val(item.registerDate);
                checkdusername();
                checkdemail();
            },
            error:function(data){
                errorProcess(data);
            }
        });
    }

    function submitUserDetail(){
        if(confirm("确定修改吗？")){
            $.ajax({
                type: "POST",
                url: "/i7/",
                data: $("#DoctorInfo").serialize(),
                dataType: "json",
                success: function (data) {
                    successProcess(data);
                 },
                error:function(data){
                    errorProcess(data);
                }
            });
        }
    }

    function checkdname(){
        var re_name  = /^[a-zA-Z\u4e00-\u9fa5]+$/g;
        var name = $("#DoctorInfo input[name='name']").val();
        //patientinfo.push(item);
        //var id = item.P_id;
        //document.getElementById("envelope").style.top = "27px";
        //$('.idstatus').css("height", "100px");
        if(name.length == 0 || name == null || name == "" || name == undefined){
            $('.dnamestatus').removeClass("tick");
            $('.dnamestatus').removeClass("error");

        }else if(!re_name.test(name)){
            //err_msg.innerText = "用户名必须是3-10位英文字母或数字!";
            $('.dnamestatus').html("");
            $('.dnamestatus').removeClass("tick");
            //$('.status').html('<img src = "/static/img/blue@2x.png">');
            $('.dnamestatus').addClass('error');
//            $('.dnamestatus').css("margin-top", "8px");
            return false;
        }else{
            //err_msg.innerText = "用户名正确";
            $('.dnamestatus').html("");
           //$('.status').html('<img src = "/home/sameen7/MedicalWeb/static/img/check.png">');
            $('.dnamestatus').removeClass("error");
            $('.dnamestatus').addClass('tick');
//            $('.dnamestatus').css("margin-top", "8px");
        }

        return true;
    }
    function checkdusername(){
        var re_username  = /^\w{3,10}$/;
        var username = $("#DoctorInfo input[name='userName']").val();

        if(!re_username.test(username)){
            //err_msg.innerText = "用户名必须是3-10位英文字母或数字!";
            $('.dusernamestatus').html("");
            $('.dusernamestatus').removeClass("tick");
            //$('.status').html('<img src = "/static/img/blue@2x.png">');
            $('.dusernamestatus').addClass('error');
            return false;
        }else{
            //err_msg.innerText = "用户名正确";
            $('.dusernamestatus').html("");
            //$('.status').html('<img src = "/home/sameen7/MedicalWeb/static/img/check.png">');
            $('.dusernamestatus').removeClass("error");
            $('.dusernamestatus').addClass('tick');
        }

        return true;
    }
    function checkdpassword(){
        var re_password = /^\w{6,20}$/;
        var password = $("#DoctorInfo input[name='password']").val();
        if(password.length == 0 || password == null || password == "" || password == undefined){
            $('.dpassstatus').removeClass("tick");
            $('.dpassstatus').removeClass("error");

        }else if(!re_password.test(password)){
            //err_msg.innerText = "密码必须是6-20位!";
            $('.dpassstatus').html("");
            $('.dpassstatus').removeClass("tick");
            $('.dpassstatus').addClass('error');
            return false;
        }else{
            $('.dpassstatus').html("");
            $('.dpassstatus').removeClass("error");
            $('.dpassstatus').addClass('tick');
        }
        return true;
    }
    function checkdcellphone(){
        var re_cell  = /^1(3|4|5|7|8)\d{9}$/;
        var cell = $("#DoctorInfo input[name='cellphone']").val();
        //patientinfo.push(item);
        //var id = item.P_id;
        //document.getElementById("envelope").style.top = "27px";
        //$('.idstatus').css("height", "100px");
        if(cell.length == 0 || cell == null || cell == "" || cell == undefined){
            $('.dcellstatus').removeClass("tick");
            $('.dcellstatus').removeClass("error");

        }else if(!re_cell.test(cell)){
            //err_msg.innerText = "用户名必须是3-10位英文字母或数字!";
            $('.dcellstatus').html("");
            $('.dcellstatus').removeClass("tick");
            //$('.status').html('<img src = "/static/img/blue@2x.png">');
            $('.dcellstatus').addClass('error');
//            $('.dcellstatus').css("margin-top", "15px");
            return false;
        }else{
            //err_msg.innerText = "用户名正确";
            $('.dcellstatus').html("");
           //$('.status').html('<img src = "/home/sameen7/MedicalWeb/static/img/check.png">');
            $('.dcellstatus').removeClass("error");
            $('.dcellstatus').addClass('tick');
//            $('.dcellstatus').css("margin-top", "15px");
        }

        return true;
    }
    function checkdemail(){
        var re_mail  = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        var mail = $("#DoctorInfo input[name='mail']").val();

        //patientinfo.push(item);
        //var id = item.P_id;
        //document.getElementById("envelope").style.top = "27px";
        //$('.idstatus').css("height", "100px");
        if(mail.length == 0 || mail == null || mail == "" || mail == undefined){
            $('.demailstatus').removeClass("tick");
            $('.demailstatus').removeClass("error");

        }else if(!re_mail.test(mail)){
            //err_msg.innerText = "用户名必须是3-10位英文字母或数字!";
            $('.demailstatus').html("");
            $('.demailstatus').removeClass("tick");
            //$('.status').html('<img src = "/static/img/blue@2x.png">');
            $('.demailstatus').addClass('error');
//            $('.dmailstatus').css("margin-top", "8px");
            return false;
        }else{
            //err_msg.innerText = "用户名正确";
            $('.demailstatus').html("");
           //$('.status').html('<img src = "/home/sameen7/MedicalWeb/static/img/check.png">');
            $('.demailstatus').removeClass("error");
            $('.demailstatus').addClass('tick');
//            $('.dmailstatus').css("margin-top", "8px");
        }

        return true;
    }




