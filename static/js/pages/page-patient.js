/**
 * Created by 91034 on 2017/3/19.
 */
var patientSet = new HashMap();

$(document).ready(function () {
    var tab = new $.fn.tab({
		tabList:"#demo1 .ui-tab-container .ui-tab-list li",
		contentList:"#demo1 .ui-tab-container .ui-tab-content"
	});
	var tab = new $.fn.tab({
		tabList:"#demo1 .ui-tab-container .ui-tab-list2 li",
		contentList:"#demo1 .ui-tab-container .ui-tab-content2"
	});
    $("input.mh_date").datejs({
		Event : "click",//可选
		Left : 0,//弹出时间停靠的左边位置
		Top : -16,//弹出时间停靠的顶部边位置
		fuhao : "-",//日期连接符默认为-
		isTime : false,//是否开启时间值默认为false
		beginY : 2017,//年份的开始默认为1949
		endY :2020//年份的结束默认为2049
	});
    $("#selectList").find(".more").toggle(function(){
            $(this).addClass("more_bg");
            $(".more-none").show()
    },function(){
        $(this).removeClass("more_bg");
        $(".more-none").hide()
    });
    $("#select").toggle(function(){
            $(this).addClass("w1200");
            $(".w1200").show()
    },function(){
        $(this).removeClass("w1200");
        $(".w1200").hide()
    });
    var taboy_box=$(".lefttable-list");
    taboy_box.children("tbody").find("tr:gt(2)").hide();
    $(".leftbox-morea").toggle(function(){
        $(this).parent().prev().find("tr").show();
        $(this).addClass("more-i")
    },function(){
        $(this).removeClass("more-i");
        $(this).parent().prev().children("tbody").find("tr:gt(2)").hide();
    }
    );

    appendAllPatientTable();
    $("#refresh").click(function () {
        appendAllPatientTable();
    });

    dataSet = {
        'filter':'01100000000',
        'sex':2,
        'agelower':0,   'ageupper':20,
        'LungFlower':0, 'LungFupper':0,
        'MVlower':0,    'MVupper':0,
        'MRClower':0,   'MRCupper':0,
        'CATlower':0,   'CATupper':0,
        'lung3':0,
        'Sklower':0,    'Skupper':0,
        'Hslower':0,    'Hsupper':0,
        'para':''
    }


    $("#PatientInfobt").click(function () {
        var attr = new Array();
        attr[0] = checkid();
        attr[1] = checkage();
        attr[2] = checkname();
        attr[3] = checkIDnum();
        attr[4] = checkheight();
        attr[5] = checkweight();
        attr[6] = checkcell();
        attr[7] = checktele();
        if(attr[0] && attr[1] && attr[2] && attr[3] && attr[4] && attr[5] && attr[6] && attr[7]){
            if(confirm("确定提交吗？")){
                $.ajax({
                    type: "POST",
                    url: "/i17/",
                    data: $("#PatientInfo").serialize(),
                    dataType: "json",
                    success: function (data) {
                        successProcess(data);
                        appendAllPatientTable();
                    },
                    error:function(data){
                        errorProcess(data);
                    }
                });
            }
        }else{
            for(var i = 0; i < attr.length; i++){
                if(!attr[i]){
                    switch(i){
                        case 0:
                            //$("#PatientInfoDetails input[name='P_id']").focus();
                            alert("请输入合法的患者编号！");
                            break;
                        case 1:
                            //$("#PatientInfoDetails input[name='age']").focus();
                            alert("请输入合法的年龄！");
                            break;
                        case 2:
                            //$("#PatientInfoDetails input[name='name']").focus();
                            alert("请输入合法的姓名！");
                            break;
                        case 3:
                            //$("#PatientInfoDetails input[name='IDCardNum']").focus();
                            alert("请输入合法的身份证号！");
                            break;
                        case 4:
                            //$("#PatientInfoDetails input[name='height']").focus();
                            alert("请输入合法的身高！");
                            break;
                        case 5:
                            //$("#PatientInfoDetails input[name='weight']").focus();
                            alert("请输入合法的体重！");
                            break;
                        case 6:
//                            $("#PatientInfoDetails input[name='cellphone']").focus();
                            alert("请输入合法的手机号！");
                            break;
                        case 7:
//                            $("#PatientInfoDetails input[name='telephone']").focus();
                            alert("请输入合法的固话！");
                            break;
                    }
                }
            }
        }


    });
})


    function appendAllPatientTable() {
        var time;
        var temp;
        $("#patientInfoTable tbody").empty();
        $.ajax({
            type: "GET",
            url: "/i15/",
            data: {},
            dataType: "json",
            success: function (json_data) {
                $.each(json_data,function (index,item) {
                patientSet.put(item.P_id,item);
                time = parseInt(item.o_time) + parseInt(item.h_time) + parseInt(item.e_time);
                temp = time.toString()+"("+item.o_time+"/"+item.e_time+"/"+item.h_time+")";
                $("#patientInfoTable tbody").append(
                    "<tr>"+
                        "<td>"+item.P_id+"</td>"+
                        "<td>"+item.name+"</td>"+
                        "<td>"+SexParse(item.sex)+"</td>"+
                        "<td>"+item.age+"</td>"+
                        "<td>"+item.IDCardNum+"</td>"+
                        "<td>"+item.registerTime+"</td>"+
                        "<td>"+item.cellphone+"</td>"+
//                        "<td>"+item.telephone+"</td>"+
                        "<td style='background:"+colorInfo(time, 0)+"'>"+temp+"</td>"+
                        "<td style='color:"+colorInfo(time, 0)+"'>"+colorInfo(time, 1)+"</td>"+
                        "<td>"+ item.percent + "%" +"</td>"+
//                        "<td><a href=\"/patientDetails/?P_id="+item.P_id+"\" style='color:black;'><u>查看详情</u></a></td>"+
//                        "<td><a href=\"/patientDetails1/?P_id="+item.P_id+"\" style='color:black;'><u>查看详情</u></a></td>"+
                        "<td><a href=\"/patientDetail/?P_id="+item.P_id+"\" style='color:black;'><u>查看详情</u></a></td>"+
                    "</tr>");
                });
                checkid();
                checkname();
                //filterIdByAll(dataSet);
            },
            error:function(data){
                errorProcess(data);
            }
        });
    }

    function appendPartPatientTable(item){
        var time;
        var temp;
        time = parseInt(item.o_time) + parseInt(item.h_time) + parseInt(item.e_time);
        temp = time.toString()+"("+item.o_time+"/"+item.e_time+"/"+item.h_time+")";
        $("#patientInfoTable tbody").append(
            "<tr>"+
            "<td>"+item.P_id+"</td>"+
            "<td>"+item.name+"</td>"+
            "<td>"+SexParse(item.sex)+"</td>"+
            "<td>"+item.age+"</td>"+
            "<td>"+item.IDCardNum+"</td>"+
            "<td>"+item.registerTime+"</td>"+
            "<td>"+item.cellphone+"</td>"+
            //"<td>"+item.telephone+"</td>"+
            "<td style='background:"+colorInfo(time, 0)+"'>"+temp+"</td>"+
            "<td style='color:"+colorInfo(time, 0)+"'>"+colorInfo(time, 1)+"</td>"+
            "<td>"+ item.percent + "%" +"</td>"+
            //"<td><a href=\"/patientDetails/?P_id="+item.P_id+"\" style='color:black;'><u>查看详情</u></a></td>"+
            //"<td><a href=\"/patientDetails1/?P_id="+item.P_id+"\" style='color:black;'><u>查看详情</u></a></td>"+
            "<td><a href=\"/patientDetail/?P_id="+item.P_id+"\" style='color:black;'><u>查看详情</u></a></td>"+
            "</tr>");
    }

    function colorInfo(input, index){
        var a = [["#d9534f","高危"],["#f0ad4e","风险较大"],["#5cb85c","健康"]];
        if(input > 5){
            return a[0][index];
        }
        else if(input > 3){
            return a[1][index];
        }
        else{
            return a[2][index];
        }
    }

    function checkid(){
        var re_id  = /^\d+$/;
        var id = $("#PatientInfoDetails input[name='P_id']").val();
        //patientinfo.push(item);
        //var id = item.P_id;
        //document.getElementById("envelope").style.top = "27px";
        //$('.idstatus').css("height", "100px");
        if(!re_id.test(id)){
            //err_msg.innerText = "用户名必须是3-10位英文字母或数字!";
            $('.idstatus').html("");
            $('.idstatus').removeClass("tick");
            //$('.status').html('<img src = "/static/img/blue@2x.png">');
            $('.idstatus').addClass('error');
            $('.idstatus').css("margin-top", "4px");
            return false;
        }else{
            //err_msg.innerText = "用户名正确";
            $('.idstatus').html("");
           //$('.status').html('<img src = "/home/sameen7/MedicalWeb/static/img/check.png">');
            $('.idstatus').removeClass("error");
            $('.idstatus').addClass('tick');
            $('.idstatus').css("margin-top", "4px");
        }

        return true;
    }
    function checkname(){
        var re_name  = /^[a-zA-Z\u4e00-\u9fa5]+$/g;
        var name = $("#PatientInfoDetails input[name='name']").val();
        //patientinfo.push(item);
        //var id = item.P_id;
        //document.getElementById("envelope").style.top = "27px";
        //$('.idstatus').css("height", "100px");
        if(!re_name.test(name)){
            //err_msg.innerText = "用户名必须是3-10位英文字母或数字!";
            $('.namestatus').html("");
            $('.namestatus').removeClass("tick");
            //$('.status').html('<img src = "/static/img/blue@2x.png">');
            $('.namestatus').addClass('error');
            $('.namestatus').css("margin-top", "4px");
            return false;
        }else{
            //err_msg.innerText = "用户名正确";
            $('.namestatus').html("");
           //$('.status').html('<img src = "/home/sameen7/MedicalWeb/static/img/check.png">');
            $('.namestatus').removeClass("error");
            $('.namestatus').addClass('tick');
            $('.namestatus').css("margin-top", "4px");
        }

        return true;
    }
    function checkage(){
        var re_age  = /^\d+$/;
        var age = $("#PatientInfoDetails input[name='age']").val();
        //patientinfo.push(item);
        //var id = item.P_id;
        //document.getElementById("envelope").style.top = "27px";
        //$('.idstatus').css("height", "100px");
        if(age.length == 0 || age == null || age == "" || age == undefined){
            $('.agestatus').removeClass("tick");
            $('.agestatus').removeClass("error");

        }else if(!re_age.test(age)){
            //err_msg.innerText = "用户名必须是3-10位英文字母或数字!";
            $('.agestatus').html("");
            $('.agestatus').removeClass("tick");
            //$('.status').html('<img src = "/static/img/blue@2x.png">');
            $('.agestatus').addClass('error');
            $('.agestatus').css("margin-top", "4px");
            return false;
        }else{
            //err_msg.innerText = "用户名正确";
            $('.agestatus').html("");
           //$('.status').html('<img src = "/home/sameen7/MedicalWeb/static/img/check.png">');
            $('.agestatus').removeClass("error");
            $('.agestatus').addClass('tick');
            $('.agestatus').css("margin-top", "4px");
        }

        return true;
    }
    function checkIDnum(){
        var re_num  = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
        var num = $("#PatientInfoDetails input[name='IDCardNum']").val();
        //patientinfo.push(item);
        //var id = item.P_id;
        //document.getElementById("envelope").style.top = "27px";
        //$('.idstatus').css("height", "100px");
        if(num.length == 0 || num == null || num == "" || num == undefined){
            $('.idnumstatus').removeClass("tick");
            $('.idnumstatus').removeClass("error");

        }else if(!re_num.test(num)){
            //err_msg.innerText = "用户名必须是3-10位英文字母或数字!";
            $('.idnumstatus').html("");
            $('.idnumstatus').removeClass("tick");
            //$('.status').html('<img src = "/static/img/blue@2x.png">');
            $('.idnumstatus').addClass('error');
            $('.idnumstatus').css("margin-top", "4px");
            return false;
        }else{
            //err_msg.innerText = "用户名正确";
            $('.idnumstatus').html("");
           //$('.status').html('<img src = "/home/sameen7/MedicalWeb/static/img/check.png">');
            $('.idnumstatus').removeClass("error");
            $('.idnumstatus').addClass('tick');
            $('.idnumstatus').css("margin-top", "4px");
        }

        return true;
    }
    function checkheight(){
        var re_height  = /^\d+$/;
        var height = $("#PatientInfoDetails input[name='height']").val();
        //patientinfo.push(item);
        //var id = item.P_id;
        //document.getElementById("envelope").style.top = "27px";
        //$('.idstatus').css("height", "100px");
        if(height.length == 0 || height == null || height == "" || height == undefined){
            $('.heightstatus').removeClass("tick");
            $('.heightstatus').removeClass("error");

        }else if(!re_height.test(height)){
            //err_msg.innerText = "用户名必须是3-10位英文字母或数字!";
            $('.heightstatus').html("");
            $('.heightstatus').removeClass("tick");
            //$('.status').html('<img src = "/static/img/blue@2x.png">');
            $('.heightstatus').addClass('error');
            $('.heightstatus').css("margin-top", "4px");
            return false;
        }else{
            //err_msg.innerText = "用户名正确";
            $('.heightstatus').html("");
           //$('.status').html('<img src = "/home/sameen7/MedicalWeb/static/img/check.png">');
            $('.heightstatus').removeClass("error");
            $('.heightstatus').addClass('tick');
            $('.heightstatus').css("margin-top", "4px");
        }

        return true;
    }
    function checkweight(){
        var re_weight  = /^\d+$/;
        var weight = $("#PatientInfoDetails input[name='weight']").val();
        //patientinfo.push(item);
        //var id = item.P_id;
        //document.getElementById("envelope").style.top = "27px";
        //$('.idstatus').css("height", "100px");
        if(weight.length == 0 || weight == null || weight == "" || weight == undefined){
            $('.weightstatus').removeClass("tick");
            $('.weightstatus').removeClass("error");

        }else if(!re_weight.test(weight)){
            //err_msg.innerText = "用户名必须是3-10位英文字母或数字!";
            $('.weightstatus').html("");
            $('.weightstatus').removeClass("tick");
            //$('.status').html('<img src = "/static/img/blue@2x.png">');
            $('.weightstatus').addClass('error');
            $('.weightstatus').css("margin-top", "4px");
            return false;
        }else{
            //err_msg.innerText = "用户名正确";
            $('.weightstatus').html("");
           //$('.status').html('<img src = "/home/sameen7/MedicalWeb/static/img/check.png">');
            $('.weightstatus').removeClass("error");
            $('.weightstatus').addClass('tick');
            $('.weightstatus').css("margin-top", "4px");
        }

        return true;
    }
    function checkcell(){
        var re_cell  = /^1(3|4|5|7|8)\d{9}$/;
        var cell = $("#PatientInfoDetails input[name='cellphone']").val();
        //patientinfo.push(item);
        //var id = item.P_id;
        //document.getElementById("envelope").style.top = "27px";
        //$('.idstatus').css("height", "100px");
        if(cell.length == 0 || cell == null || cell == "" || cell == undefined){
            $('.cellstatus').removeClass("tick");
            $('.cellstatus').removeClass("error");

        }else if(!re_cell.test(cell)){
            //err_msg.innerText = "用户名必须是3-10位英文字母或数字!";
            $('.cellstatus').html("");
            $('.cellstatus').removeClass("tick");
            //$('.status').html('<img src = "/static/img/blue@2x.png">');
            $('.cellstatus').addClass('error');
            $('.cellstatus').css("margin-top", "4px");
            return false;
        }else{
            //err_msg.innerText = "用户名正确";
            $('.pcellstatus').html("");
           //$('.status').html('<img src = "/home/sameen7/MedicalWeb/static/img/check.png">');
            $('.cellstatus').removeClass("error");
            $('.cellstatus').addClass('tick');
            $('.cellstatus').css("margin-top", "4px");
        }

        return true;
    }
    function checktele(){
        var re_tele  = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
        var tele = $("#PatientInfoDetails input[name='telephone']").val();
        //patientinfo.push(item);
        //var id = item.P_id;
        //document.getElementById("envelope").style.top = "27px";
        //$('.idstatus').css("height", "100px");
        if(tele.length == 0 || tele == null || tele == "" || tele == undefined){
            $('.telestatus').removeClass("tick");
            $('.telestatus').removeClass("error");

        }else if(!re_tele.test(tele)){
            //err_msg.innerText = "用户名必须是3-10位英文字母或数字!";
            $('.telestatus').html("");
            $('.telestatus').removeClass("tick");
            //$('.status').html('<img src = "/static/img/blue@2x.png">');
            $('.telestatus').addClass('error');
            $('.telestatus').css("margin-top", "4px");
            return false;
        }else{
            //err_msg.innerText = "用户名正确";
            $('.telestatus').html("");
           //$('.status').html('<img src = "/home/sameen7/MedicalWeb/static/img/check.png">');
            $('.telestatus').removeClass("error");
            $('.telestatus').addClass('tick');
            $('.telestatus').css("margin-top", "4px");
        }

        return true;
    }

    function filterId(filtertype,gender,lung3,para,lower,upper){
        var dataSet = {};
        switch(filtertype){
            case 1:
                dataSet = {'filtertype':filtertype,'sex':gender};break;
            case 2: case 3: case 4:
            case 5: case 6: case 8:
            case 9:
                dataSet = {'filtertype':filtertype,'lower':lower,'upper':upper};break;
            case 7:
                dataSet = {'filtertype':filtertype,'lung3':lung3};break;
            case 10:
                dataSet = {'filtertype':filtertype,'para':para};break;
            default:break;
        }
        $.ajax({
            type: "POST",
            url: "/i111/",
            dataType: "json",
            data: dataSet,
            success: function (data) {
                /*console.log('data')
                console.log(data);
                console.log('keyset')
                console.log(patientSet.keySet())
                for(pid in data){
                    if(patientSet.containsKey(data[pid])){
                        console.log('pid '+data[pid]);
                        console.log(patientSet.get(data[pid]));
                    }
                }*/
            },
            error: function (a) {
                errorProcess(a);
            }
        });

    }

    function filterIdByAll(dataSet){
        $("#patientInfoTable tbody").empty();
        //console.log('oh my god '+dataSet.filter);
        /*if(dataSet.filter=="00000000000"){
            appendAllPatientTable();
            return;
        }*/
        $.ajax({
            type: "POST",
            url: "/i111/",
            dataType: "json",
            data: dataSet,
            success: function (data) {
                //console.log(data);
                for(pid in data){
                    if(patientSet.containsKey(data[pid])){
                        //console.log(patientSet.get(data[pid]));
                        appendPartPatientTable(patientSet.get(data[pid]));
                    }
                }

            },
            error: function (a) {
                errorProcess(a);
            }
        });

    }

    function HashMap(){
        //定义长度
        var length = 0;
        //创建一个对象
        var obj = new Object();

        /**
        * 判断Map是否为空
        */
        this.isEmpty = function(){
            return length == 0;
        };

        /**
        * 判断对象中是否包含给定Key
        */
        this.containsKey=function(key){
            return (key in obj);
        };

        /**
        * 判断对象中是否包含给定的Value
        */
        this.containsValue=function(value){
            for(var key in obj){
                if(obj[key] == value){
                    return true;
                }
            }
            return false;
        };

        /**
        *向map中添加数据
        */
        this.put=function(key,value){
            if(!this.containsKey(key)){
                length++;
            }
            obj[key] = value;
        };

        /**
        * 根据给定的Key获得Value
        */
        this.get=function(key){
            return this.containsKey(key)?obj[key]:null;
        };

        /**
        * 根据给定的Key删除一个值
        */
        this.remove=function(key){
            if(this.containsKey(key)&&(delete obj[key])){
                length--;
            }
        };

        /**
        * 获得Map中的所有Value
        */
        this.values=function(){
            var _values= new Array();
            for(var key in obj){
                _values.push(obj[key]);
            }
            return _values;
        };

        /**
        * 获得Map中的所有Key
        */
        this.keySet=function(){
            var _keys = new Array();
            for(var key in obj){
                _keys.push(key);
            }
            return _keys;
        };

        /**
        * 获得Map的长度
        */
        this.size = function(){
            return length;
        };

        /**
        * 清空Map
        */
        this.clear = function(){
            length = 0;
            obj = new Object();
        };
    }

