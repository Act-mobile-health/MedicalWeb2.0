
$(document).ready(function(){
    showInvitations();
    console.log("111");
    $("#invitebt").click(function(){
        submitNewInvitation();
    });
});

//#34495E
function showInvitations(){
    $("#invitations tbody").empty();
    $.ajax({
        type: "GET",
        url: "/i60/",
        data: {},
        dataType: "json",
        success: function (json_data) {
            $.each(json_data,function(index,item){
                $("#invitations tbody").append(
                    '<tr>'+
                    '<td>'+item.id+'</td>'+
                    '<td><a style="color:#29b6f6;" href="/register?code='+item.code+'">'+item.code+'</a></td>'+
                    '<td>可用</td>'+
                    '</tr>');
            });
            checkinvite();
        },
        error:function(data){
                    errorProcess(data);
        }

    });

}

function submitNewInvitation(){
    $.ajax({
        type:"POST",
        url:"/i61/",
        dataType:"json",
        data:{
            prefix: $("#prefix").val(),
            uid: $("#uid").val(),
            num: $("#num").val()
        },
        success:function(data){
            var result = data.result;
            if(result=="0"){
                alert("添加成功");
            }
            else{
                alert("添加失败");
            }
        },
        error:function(jqXHR){

        }
    });
    showInvitations();
}

function checkinvite(){
    var re_invite = /^\w{1,7}$/;
    var invite = $("#prefix").val();
    if(invite.length == 0 || invite == null || invite == "" || invite == undefined){
        $('.invitestatus').removeClass("tick");
        $('.invitestatus').removeClass("error");

    }else if(!re_invite.test(invite)){
        $('.invitestatus').html("");
        $('.invitestatus').removeClass("tick");
        $('.invitestatus').addClass('error');
        $('.invitestatus').css("padding-left", "0px");
        $('.invitestatus').css("margin-left", "133px");
        $('.invitestatus').css("margin-bottom", "0px");
        $('.invitestatus').css("margin-top", "15px");
        return false;
    }else{
        $('.invitestatus').html("");
        $('.invitestatus').removeClass("error");
        $('.invitestatus').addClass('tick');
        $('.invitestatus').css("padding-left", "0px");
        $('.invitestatus').css("margin-left", "133px");
        $('.invitestatus').css("margin-bottom", "0px");
        $('.invitestatus').css("margin-top", "15px");
    }
    return true;
}


