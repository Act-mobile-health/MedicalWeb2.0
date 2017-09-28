var SelectSet = new HashMap();

function SelectSetInit(){
    SelectSet.put('date',[-1,-1]);
    SelectSet.put('gender','0');
    SelectSet.put('age',[-1,-1]);
    SelectSet.put('MVtime',[-1,-1]);
    SelectSet.put('Sktime',[-1,-1]);
    SelectSet.put('Hstime',[-1,-1]);
    SelectSet.put('CAT',[-1,-1]);
    SelectSet.put('MRC',[-1,-1]);
    SelectSet.put('Risk',[-1,-1]);
    SelectSet.put('LungF','0');
}

function SelectSetHandle(){
    var filterArr = new Array(11);
    filterArr[0] = 0;filterArr[10] = 0;
    filterArr[1] = SelectSet.get('gender')=='0'?0:1;
    filterArr[2] = SelectSet.get('age')[0]==-1?0:1;
    filterArr[3] = 0;
    filterArr[4] = SelectSet.get('MVtime')[0]==-1?0:1;
    filterArr[5] = SelectSet.get('MRC')[0]==-1?0:1;
    filterArr[6] = SelectSet.get('CAT')[0]==-1?0:1;
    filterArr[7] = SelectSet.get('Risk')[0]==-1?0:1;
    filterArr[8] = SelectSet.get('Sktime')[0]==-1?0:1;
    filterArr[9] = SelectSet.get('Hstime')[0]==-1?0:1;
    filterStr = filterArr.join('');
    console.log(filterStr);
    var dataSet = {
        'filter':filterStr,
        'sex':parseInt(SelectSet.get('gender')),
        'agelower':parseInt(SelectSet.get('age')[0]),   'ageupper':parseInt(SelectSet.get('age')[1]),
        'LungFlower':parseInt(SelectSet.get('LungF')), 'LungFupper':parseInt(SelectSet.get('LungF')),
        'MVlower':parseInt(SelectSet.get('MVtime')[0]),    'MVupper':parseInt(SelectSet.get('MVtime')[1]),
        'MRClower':parseInt(SelectSet.get('MRC')[0]),   'MRCupper':parseInt(SelectSet.get('MRC')[1]),
        'CATlower':parseInt(SelectSet.get('CAT')[0]),   'CATupper':parseInt(SelectSet.get('CAT')[1]),
        'lung3':parseInt(SelectSet.get('Risk')[1]),
        'Sklower':parseInt(SelectSet.get('Sktime')[0]),    'Skupper':parseInt(SelectSet.get('Sktime')[1]),
        'Hslower':parseInt(SelectSet.get('Hstime')[0]),    'Hsupper':parseInt(SelectSet.get('Hstime')[1]),
        'para':''
    }
    //SelectSetInit();
    console.log(dataSet);
    return dataSet;
}

function showSelect(){
    //console.log(SelectSet.values());
    var StrArr = new Array();
    var datestr = SelectSet.get('date')[0]==-1?'':SelectSet.get('date')[0]+'~'+SelectSet.get('date')[1]; StrArr.push(datestr);
    var genderstr = SelectSet.get('gender')=='0'?'':SelectSet.get('gender')==1?'男':'女'; StrArr.push(genderstr);
    var agestr = SelectSet.get('age')[0]==-1?'':"年龄: "+SelectSet.get('age')[0]+'~'+SelectSet.get('age')[1]; StrArr.push(agestr);
    var MVtimestr = SelectSet.get('MVtime')[0]==-1?'':"就医次数: "+SelectSet.get('MVtime')[0]+'~'+SelectSet.get('MVtime')[1];   StrArr.push(MVtimestr);
    var Sktimestr = SelectSet.get('Sktime')[0]==-1?'':"急性加重次数: "+SelectSet.get('Sktime')[0]+'~'+SelectSet.get('Sktime')[1]; StrArr.push(Sktimestr);
    var Hstimestr = SelectSet.get('Hstime')[0]==-1?'':"住院次数: "+SelectSet.get('Hstime')[0]+'~'+SelectSet.get('Hstime')[1];   StrArr.push(Hstimestr);
    var CATstr = SelectSet.get('CAT')[0]==-1?'':"CAT评分: "+SelectSet.get('CAT')[0]+'~'+SelectSet.get('CAT')[1];  StrArr.push(CATstr);
    var MRCstr = SelectSet.get('MRC')[0]==-1?'':"MRC评分: "+SelectSet.get('MRC')[0]+'~'+SelectSet.get('MRC')[1];  StrArr.push(MRCstr);
    var Riskstr = SelectSet.get('Risk')[0]==-1?'':"急性加重风险: "+SelectSet.get('Risk')[0]+'~'+SelectSet.get('Risk')[1]; StrArr.push(Riskstr);
    var LungFstr = SelectSet.get('LungF')=='0'?'':"肺功能分级: "+(SelectSet.get('LungF')=='1'?'轻度':SelectSet.get('LungF')=='2'?'中度':'重度');   StrArr.push(LungFstr);
    $('#myhaschoosen').empty();
    for(var i=0;i<StrArr.length;i++){
        //console.log(StrArr[i]);
        if(StrArr[i]!=''){
            var str = '<div class="selectedInfor selectedShow" style="height:20px;"><span>'+StrArr[i]+'</span></div>';
            //$('#myhaschoosen').after(str);
            $('#myhaschoosen').append(str);
        }
    }
    var set = SelectSetHandle();
    filterIdByAll(set);
}

function ClearSelect(){
    SelectSetInit();
    showSelect();
}

$(document).ready(function (e) {
    SelectSetInit();
    /*$(".hasBeenSelected").click(function(){
        showSelect();
    });*/
    $("#myclearList").click(function(){
        ClearSelect();
        $('.radiofirst').attr('checked','checked');
        appendAllPatientTable();
    });
    $("#filtersubmit").click(function(){
        /*var set = SelectSetHandle();
        filterIdByAll(set);*/
        showSelect();
    });
    $("#dateSelect").click(function(){
        var dateval = $('input:radio[name="dateradio"]:checked').val();
        if (dateval!=null){
            var lower = 0;
            var upper = 0;
            switch(dateval){
                case "0": lower = 0;upper = 10000;break;
                case "1": lower = 0;upper = 2;break;
                case "2": lower = 3;upper = 5;break;
                case "3": lower = 6;upper = 9;break;
                default:  lower = 0;upper = 10000;break;
            }
            SelectSet.put('date',[lower,upper]);
            //console.log(lower,upper);
            showSelect();
        }
    });
    $("#datesubmit").click(function(){
        $('input:radio[name="dateradio"]').attr("checked",false);
        var lower = $('input:text[name="datetext1"]').val();
        var upper = $('input:text[name="datetext2"]').val();
        lower = lower!=''?parseInt(lower):-1;
        upper = upper!=''?parseInt(upper):-1;
        SelectSet.put('date',[lower,upper]);
        $('input:text[name="datetext1"]').val("");
        $('input:text[name="datetext2"]').val("");
        //console.log(lower,upper);
        showSelect();
    });
    $("#genderSelect").click(function(){
        var genderval = $('input:radio[name="genderradio"]:checked').val();
        SelectSet.put('gender',genderval);
        //console.log(genderval)
        showSelect();
    });
    $("#agesubmit").click(function(){
        var lower = $('input:text[name="agetext1"]').val();
        var upper = $('input:text[name="agetext2"]').val();
        lower = lower!=''?parseInt(lower):-1;
        upper = upper!=''?parseInt(upper):-1;
        SelectSet.put('age',[lower,upper]);
        $('input:text[name="agetext1"]').val("");
        $('input:text[name="agetext2"]').val("");
        //console.log(lower,upper);
        showSelect();
    });
    $("#MedicalVisitSelect").click(function(){
        var MVtimeval = $('input:radio[name="MVtimeradio"]:checked').val();
        if (MVtimeval!=null){
            var lower = 0;
            var upper = 0;
            switch(MVtimeval){
                case "0": lower = -1;upper = -1;break;
                case "1": lower = 0;upper = 2;break;
                case "2": lower = 3;upper = 5;break;
                case "3": lower = 6;upper = 9;break;
                case "4": lower = 10;upper = 10000;break;
                default:  lower = 0;upper = 10000;break;
            }
            SelectSet.put('MVtime',[lower,upper]);
            //console.log(lower,upper);
            showSelect();
        }
    });
    $("#MVtimesubmit").click(function(){
        $('input:radio[name="MVtimeradio"]').attr("checked",false);
        var lower = $('input:text[name="MVtimetext1"]').val();
        var upper = $('input:text[name="MVtimetext2"]').val();
        lower = lower!=''?parseInt(lower):-1;
        upper = upper!=''?parseInt(upper):-1;
        SelectSet.put('MVtime',[lower,upper]);
        $('input:text[name="MVtimetext1"]').val("");
        $('input:text[name="MVtimetext2"]').val("");
        //console.log(lower,upper);
        showSelect();
    });
    $("#SickerTimesSelect").click(function(){
        var Sktimeval = $('input:radio[name="Sktimeradio"]:checked').val();
        if (Sktimeval!=null){
            var lower = 0;
            var upper = 0;
            switch(Sktimeval){
                case "0": lower = -1;upper = -1;break;
                case "1": lower = 0;upper = 4;break;
                case "2": lower = 5;upper = 9;break;
                case "3": lower = 10;upper = 19;break;
                case "4": lower = 20;upper = 10000;break;
                default:  lower = 0;upper = 10000;break;
            }
            SelectSet.put('Sktime',[lower,upper]);
            //console.log(lower,upper);
            showSelect();
        }
    });
    $("#Sktimesubmit").click(function(){
        $('input:radio[name="Sktimeradio"]').attr("checked",false);
        var lower = $('input:text[name="Sktimetext1"]').val();
        var upper = $('input:text[name="Sktimetext2"]').val();
        lower = lower!=''?parseInt(lower):-1;
        upper = upper!=''?parseInt(upper):-1;
        SelectSet.put('Sktime',[lower,upper]);
        $('input:text[name="Sktimetext1"]').val("");
        $('input:text[name="Sktimetext2"]').val("");
        //console.log(lower,upper);
        showSelect();
    });
    $("#HospitalTimesSelect").click(function(){
        var Hstimeval = $('input:radio[name="Hstimeradio"]:checked').val();
        if (Hstimeval!=null){
            var lower = 0;
            var upper = 0;
            switch(Hstimeval){
                case "0": lower = -1;upper = -1;break;
                case "1": lower = 0;upper = 4;break;
                case "2": lower = 5;upper = 9;break;
                case "3": lower = 10;upper = 10000;break;
                default:  lower = 0;upper = 10000;break;
            }
            SelectSet.put('Hstime',[lower,upper]);
            //console.log(lower,upper);
            showSelect();
        }
    });
    $("#Hstimesubmit").click(function(){
        $('input:radio[name="Hstimeradio"]').attr("checked",false);
        var lower = $('input:text[name="Hstimetext1"]').val();
        var upper = $('input:text[name="Hstimetext2"]').val();
        lower = lower!=''?parseInt(lower):-1;
        upper = upper!=''?parseInt(upper):-1;
        SelectSet.put('Hstime',[lower,upper]);
        $('input:text[name="Hstimetext1"]').val("");
        $('input:text[name="Hstimetext2"]').val("");
        //console.log(lower,upper);
        showSelect();
    });
    $("#CATsubmit").click(function(){
        var lower = $('input:text[name="CATtext1"]').val();
        var upper = $('input:text[name="CATtext2"]').val();
        lower = lower!=''?parseInt(lower):-1;
        upper = upper!=''?parseInt(upper):-1;
        SelectSet.put('CAT',[lower,upper]);
        $('input:text[name="CATtext1"]').val("");
        $('input:text[name="CATtext2"]').val("");
        //console.log(lower,upper);
        showSelect();
    });
    $("#MRCsubmit").click(function(){
        var lower = $('input:text[name="MRCtext1"]').val();
        var upper = $('input:text[name="MRCtext2"]').val();
        lower = lower!=''?parseInt(lower):-1;
        upper = upper!=''?parseInt(upper):-1;
        SelectSet.put('MRC',[lower,upper]);
        $('input:text[name="MRCtext1"]').val("");
        $('input:text[name="MRCtext2"]').val("");
        //console.log(lower,upper);
        showSelect();
    });
    $("#Risksubmit").click(function(){
        var lower = $('input:text[name="Risktext1"]').val();
        var upper = $('input:text[name="Risktext2"]').val();
        lower = lower!=''?parseInt(lower):-1;
        upper = upper!=''?parseInt(upper):-1;
        SelectSet.put('Risk',[lower,upper]);
        $('input:text[name="Risktext1"]').val("");
        $('input:text[name="Risktext2"]').val("");
        //console.log(lower,upper);
        showSelect();
    });
    $("#LungFuncSelect").click(function(){
        var LungFval = $('input:radio[name="LungFradio"]:checked').val();
        SelectSet.put('LungF',LungFval);
        //console.log(LungFval);
        showSelect();
    });


});
