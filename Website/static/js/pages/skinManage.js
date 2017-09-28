/**
 * Created by PengJQ
 * */

$(document).ready(function(){
    loadSkin();

});

function loadSkin() {
    $.ajax({
        type: "GET",
        url: "/i6/",
        data: {},
        dataType: "json",
        success: function (item) {
            skincolor = item.skincolor;
            changeSkin(skincolor);
        },
        error:function(data){
            errorProcess(data);
        }
    });
}

/*function loadSkin(){
    $.ajax({
        type: "GET",
        url: "/i9000/",
        data: {},
        dataType: "json",
        success: function (item) {
            skincolor = item.color;
            changeSkin(skincolor);
        },
        error: function(data){
            errorProcess(data);
        }
    });

}*/

function changeSkin(colortype){
    //console.log("color select");
    var color = "#66D37E";

    if(colortype==1){
        color = "#4a4740";
        color2 = "#fff";
        hovercolor = "#858585";
    }
    else if(colortype==2){
        color = "#66D37E";
        color2 = "#285629";
        hovercolor = "#67f186";
    }

    $(".panel-heading").css("background-color",color);

    $(".mycontent .panel-heading").css("color",color2);
    $(".mycontent .panel-heading h6").css("color",color2);
    $(".mysidebar").css("background-color",color);
    $(".diseaseDetail").css("border-color",color);

    $(".btn-primary").css("background-color",color);
    $(".btn-primary").css("border-color",color);

    $(".mysidebar li").hover(function(){
        $(this).css("background-color",hovercolor);
    },function(){
        $(this).css("background-color",color);
    })

}
