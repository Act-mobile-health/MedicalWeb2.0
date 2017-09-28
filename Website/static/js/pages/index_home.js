$(document).ready(function() {
    showExperimentGroup();
    getGroup();
    chart1();
    chart2();
    chart4();
    chart5();
    $("#experimentGroupbt").click(function () {
        submitExperimentGroup();
    });
    $("#patients").click(function(){
           var url = "/patientinfos";
           window.parent.history.pushState({},0,url);
    });
    $("#visito").click(function(){
           var url = "/outpatientinfos";
           window.parent.history.pushState({},0,url);
    });
    $("#visite").click(function(){
           var url = "/emergencypatientinfos";
           window.parent.history.pushState({},0,url);
    });
    $("#visith").click(function(){
           var url = "/hospitalpatientinfos";
           window.parent.history.pushState({},0,url);
    });
    if (parseInt($('.st-ff-count').data('runit'))) {
        $('.st-ff-count').countTo({
            speed: 3000,
            refreshInterval: 50
        });
        $('.st-ff-count').data('runit', "0");
    }
});




function changeUrl(i){
    var url = "/group/?G_id="+i;
    window.parent.history.pushState({},0,url);
}

function showExperimentGroup(){
    group = document.getElementById("experimentGroup");
    group.innerHTML = '<a data-toggle="modal" onclick = "addExperimentGroup()" href="#ExperimentGroupDetails"><h3 style="color:white;font-size:15px;">+ 添加实验组</h3></a><hr style="margin:10px auto"/>';
    $.ajax({
        type: "GET",
        url: "/i37/",
        data: {},
        dataType: "json",
        success: function (json_data) {

            $.each(json_data,function(index,item){
                group.innerHTML=group.innerHTML+'';
                if(G_id == item.G_id){
                    group.innerHTML = group.innerHTML + '<a onclick="changeUrl('+item.G_id+')" href="/index_group/?G_id='+item.G_id+'"><h3 style="color:white;"> 实验组'+(index+1)+':'+item.name+'</h3></a><hr style="margin:10px auto"/>';
                }
                else{
                    group.innerHTML = group.innerHTML + '<a onclick="changeUrl('+item.G_id+')" href="/index_group/?G_id='+item.G_id+'"><h3 style="color:white;"> 实验组'+(index+1)+':'+item.name+'</h3></a><hr style="margin:10px auto"/>';
                }
            });
            checkename();
        },
        error:function(data){
            errorProcess(data);
        }
    });
}

function addExperimentGroup(){
    $("#ExperimentGroupInfo :text").val("");
}

function submitExperimentGroup(){
    if (confirm("确定提交吗？")){
        $.ajax({
            type: "POST",
            url: "/i38/",
            data: $("#ExperimentGroupInfo").serialize(),
            dataType: "json",
            success: function (data) {
                successProcess(data);
            },
            error:function(data){
                errorProcess(data);
            }
        });
        jump();
        showExperimentGroup();
    }
}

function getGroup(){
    $.ajax({
        type:"GET",
        url:"/i63/",
        dataType:"json",
        data:{},
        success:function(data){
            if(data.result == "1"){
               document.getElementById('setting').style.display = 'block';
            }
        },
        error:function(d){
            errorProcess(data);
            console.log(d);
        }
    });
}

function jump(){
    $.ajax({
        type: "GET",
        url: "/i37/",
        data: {},
        dataType: "json",
        success: function (json_data) {
            $.each(json_data,function(index,item){
                window.location.href="/group/?G_id="+item.G_id;
            });
        },
        error:function(data){
            errorProcess(data);
        }
    });
}
function checkename(){
    var name = $("#ExperimentGroupInfo input[name='name']").val();
    if(name.length == 0 || name == null || name == "" || name == undefined){
        $('.enamestatus').html("");
        $('.enamestatus').removeClass("tick");
        $('.enamestatus').addClass('error');
        $('.enamestatus').css("margin-top", "6px");
        return false;
    }else{
        $('.enamestatus').html("");
        $('.enamestatus').removeClass("error");
        $('.enamestatus').addClass('tick');
        $('.enamestatus').css("margin-top", "6px");
    }

    return true;
}
