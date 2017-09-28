
//chart 1

function chart1() {
    var countweek = 0;
    var countmonth = 0;
    var countyear = 0;
    var countall = 0;
    var mydate = new Date();
    mydate = mydate.valueOf();
    var weekago = mydate - 7 * 24 * 60 * 60 * 1000;
    weekago = new Date(weekago);
    var monthago = mydate - 30 * 24 * 60 * 60 * 1000;
    monthago = new Date(monthago);
    var yearago = mydate - 365 * 24 * 60 * 60 * 1000;
    yearago = new Date(yearago);
    $.ajax({
        type: "GET",
        url: "/i15/",
        data: {},
        dataType: "json",
        success: function (json_data) {
            $.each(json_data, function (index, item) {
                var rt = "" + item.registerTime;
                var year = rt.split("-")[0];
                var month = rt.split("-")[1] - 1;
                var date = rt.split("-")[2];
                var thedate = new Date();
                thedate.setFullYear(year, month, date);
                if (thedate > weekago) {
                    countweek++;
                    countmonth++;
                    countyear++;
                    countall++;
                } else if (thedate > monthago) {
                    countmonth++;
                    countyear++;
                    countall++;
                } else if (thedate > yearago) {
                    countyear++;
                    countall++;
                } else {
                    countall++;
                }
            });
            drawchart1(countweek,countmonth,countyear,countall);
        },
        error: function (data) {
            errorProcess(data);
        }
    });
}
/*
function drawchart1(countweek,countmonth,countyear,countall){
    var myChart1 = echarts.init(document.getElementById('maintest1'), 'shine');
    option1 = {
        title: {
            text: '患者比例图',
            subtext: 'asdalfkna',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x: 'center',
            y: 'bottom',
            data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        series: [
            {
                name: '半径模式',
                type: 'pie',
                radius: [20, 110],
                center: ['50%', '50%'],
                roseType: 'radius',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                lableLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: [
                    {value: countall, name: 'all'},
                    {value: countyear, name: 'year'},
                    {value: countmonth, name: 'month'},
                    {value: countweek, name: 'week'},
                    {value: 0, name: 'rose5'},
                    {value: 0, name: 'rose6'},
                    {value: 0, name: 'rose7'},
                    {value: 0, name: 'rose8'}
                ]
            }
        ]
    };
    myChart1.setOption(option1);
}*/
function drawchart1(countweek,countmonth,countyear,countall) {
    var myChart1 = echarts.init(document.getElementById('maintest1'), 'shine');
    option1 = {
        title: {
            text: '近期新增患者人数',
            x: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data: ['患者比例图']
        },
        xAxis: [
            {
                type: 'category',
                data: ['All', 'Year', 'Month', 'week'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '加入患者人数',
                min: 0,
                max: 50,
                interval: 5,
                axisLabel: {
                    formatter: '{value} 人'
                }
            }
        ],
        series: [
            {
                name: '加入患者人数',
                type: 'bar',
                data: [countall,countyear,countmonth,countweek]
            }
        ]
    };
    myChart1.setOption(option1);
}

//chart 2

function chart2() {
    var percent=[0,0,0,0,0];
    $.ajax({
        type: "GET",
        url: "/i15/",
        data: {},
        dataType: "json",
        success: function (json_data) {
            $.each(json_data, function (index, item) {
                if (item.percent<0.2) {
                    percent[0]++;
                } else if (item.percent<0.4) {
                    percent[1]++;
                } else if (item.percent<0.6) {
                    percent[2]++;
                } else if (item.percent<0.8) {
                    percent[3]++;
                } else{
                    percent[4]++;
                }
            });
            drawchart2(percent[0],percent[1],percent[2],percent[3],percent[4]);
        },
        error: function (data) {
            errorProcess(data);
        }
    });
}
/*
function drawchart2(p1,p2,p3,p4,p5) {
    var myChart2 = echarts.init(document.getElementById('maintest2'), 'shine');
    option2 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data: ['全部患者']
        },
        xAxis: [
            {
                type: 'category',
                data: ['0.0-0.2', '0.2-0.4', '0.4-0.6', '0.6-0.8', '0.8-1.0'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '信息完整度人数',
                min: 0,
                max: 50,
                interval: 5,
                axisLabel: {
                    formatter: '{value} 人'
                }
            }
        ],
        series: [
            {
                name: '信息完整度人数',
                type: 'bar',
                data: [p1,p2,p3,p4,p5]
            }
        ]
    };
    myChart2.setOption(option2);
}*/
function drawchart2(p1,p2,p3,p4,p5){
    var myChart2 = echarts.init(document.getElementById('maintest2'), 'shine');
    option2 = {
        title: {
            text: '信息完整度',
            subtext: 'asdalfkna',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x: 'center',
            y: 'bottom',
            data: ['0-0.2', '0.2-0.4', '0.4-0.6', '0.6-0.8', '0.8-1']
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        series: [
            {
                name: '半径模式',
                type: 'pie',
                radius: [20, 110],
                center: ['50%', '50%'],
                roseType: 'radius',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                lableLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: [
                    {value: p1, name: '0-0.2'},
                    {value: p2, name: '0.2-0.4'},
                    {value: p3, name: '0.4-0.6'},
                    {value: p4, name: '0.6-0.8'},
                    {value: p5, name: '0.8-1'}
                ]
            }
        ]
    };
    myChart2.setOption(option2);
}

//chart 3

function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
        name: now.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
        ]
    }
}
var myChart3 = echarts.init(document.getElementById('maintest3'),'shine');
var data = [];
var now = +new Date(1997, 9, 3);
var oneDay = 24 * 3600 * 1000;
var value = Math.random() * 1000;
for (var i = 0; i < 1000; i++) {
    data.push(randomData());
}

option3 = {
    title: {
        text: '动态数据 + 时间坐标轴',
    x:'center'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        },
        axisPointer: {
            animation: false
        }
    },
    xAxis: {
        type: 'time',
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        }
    },
    series: [{
        name: '模拟数据',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data
    }]
};

setInterval(function () {

    for (var i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData());
    }

    myChart3.setOption(option3);
}, 1000);

//chart 4

function chart4() {
    var mydate = new Date();
    mydate = mydate.valueOf();
    var monthago = mydate - 30 * 24 * 60 * 60 * 1000;
    monthago = new Date(monthago);
    var percent=[0,0,0,0];
    $.ajax({
        type: "GET",
        url: "/i15/",
        data: {},
        dataType: "json",
        success: function (json_data) {
            $.each(json_data, function (index, item) {
                var cnt=0;
                $.ajax({
                    type: "GET",
                    url: "/i96/",
                    data: {P_id:item.P_id},
                    dataType: "json",
                    success: function (json_data) {
                        $.each(json_data, function (index, item) {
                            var rt = "" + item.date;
                            var year = rt.split("-")[0];
                            var month = rt.split("-")[1] - 1;
                            var date = rt.split("-")[2];
                            var thedate = new Date();
                            thedate.setFullYear(year, month, date);
                            if(thedate>monthago)cnt++;
                        });
                        if(cnt<10) {
                            percent[0]++;
                        }else if(cnt<20){
                            percent[1]++;
                        }else if(cnt<30){
                            percent[2]++;
                        }else{
                            percent[3]++;
                        }
                    },
                    error: function (data) {
                        errorProcess(data);
                    }
                });
            });
            drawchart4(percent[0],percent[1],percent[2],percent[3]);
        },
        error: function (data) {
            errorProcess(data);
        }
    });
}
/*
function drawchart4(p1,p2,p3,p4) {
    var myChart4 = echarts.init(document.getElementById('maintest4'), 'shine');
    option4 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data: ['全部患者']
        },
        xAxis: [
            {
                type: 'category',
                data: ['0-10', '10-20', '20-30', '30-'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '活跃用户',
                min: 0,
                max: 50,
                interval: 5,
                axisLabel: {
                    formatter: '{value} 人'
                }
            }
        ],
        series: [
            {
                name: '活跃用户',
                type: 'bar',
                data: [p1,p2,p3,p4]
            }
        ]
    };
    myChart4.setOption(option4);
}*/
function drawchart4(p1,p2,p3,p4){
    var myChart4 = echarts.init(document.getElementById('maintest4'), 'shine');
    option4 = {
        title: {
            text: '活跃用户',
            subtext: ' ',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x: 'center',
            y: 'bottom',
            data: ['0-10', '10-20', '20-30', '30--']
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        series: [
            {
                name: '半径模式',
                type: 'pie',
                radius: [20, 110],
                center: ['50%', '50%'],
                roseType: 'radius',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                lableLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: [
                    {value: p1, name: '0-10'},
                    {value: p2, name: '10-20'},
                    {value: p3, name: '20-30'},
                    {value: p4, name: '30--'}
                ]
            }
        ]
    };
    myChart4.setOption(option4);
}
//chart 5

function chart5(){
    var h=[0,0,0,0,0,0,0];
    var e=[0,0,0,0,0,0,0];
    var o=[0,0,0,0,0,0,0];
    var mydate = new Date();
    mydate = mydate.valueOf();
    var sevenweeksago = mydate - 49 * 24 * 60 * 60 * 1000;
    sevenweeksago = new Date(sevenweeksago);
    $.ajax({
        type: "GET",
        url: "/i109/",
        data: {type:0},
        dataType: "json",
        success: function (json_data) {
            $.each(json_data, function (index, item) {
                var rt = "" + item.date;
                var year = rt.split("-")[0];
                var month = rt.split("-")[1] - 1;
                var date = rt.split("-")[2];
                var thedate = new Date();
                thedate.setFullYear(year, month, date);
                if (thedate > sevenweeksago) {
                    o[parseInt(Math.round(((mydate-thedate)/(24 * 60 * 60 * 1000))/7))]++;
                }
            });
            $.ajax({
                type: "GET",
                url: "/i109/",
                data: {type: 1},
                dataType: "json",
                success: function (json_data) {
                    $.each(json_data, function (index, item) {
                        var rt = "" + item.date;
                        var year = rt.split("-")[0];
                        var month = rt.split("-")[1] - 1;
                        var date = rt.split("-")[2];
                        var thedate = new Date();
                        thedate.setFullYear(year, month, date);
                        if (thedate > sevenweeksago) {
                            e[parseInt(Math.round(((mydate-thedate)/(24 * 60 * 60 * 1000))/7))]++;
                        }
                    });
                    $.ajax({
                        type: "GET",
                        url: "/i109/",
                        data: {type: 2},
                        dataType: "json",
                        success: function (json_data) {
                            $.each(json_data, function (index, item) {
                                var rt = "" + item.date;
                                var year = rt.split("-")[0];
                                var month = rt.split("-")[1] - 1;
                                var date = rt.split("-")[2];
                                var thedate = new Date();
                                thedate.setFullYear(year, month, date);
                                if (thedate > sevenweeksago) {
                                    h[parseInt(Math.round(((mydate-thedate)/(24 * 60 * 60 * 1000))/7))]++;
                                }
                            });
                            drawchart5(o[0],o[1],o[2],o[3],o[4],o[5],o[6],e[0],e[1],e[2],e[3],e[4],e[5],e[6],h[0],h[1],h[2],h[3],h[4],h[5],h[6]);
                        },
                        error: function (data) {
                            errorProcess(data);
                        }
                    });
                },
                error: function (data) {
                    errorProcess(data);
                }
            });
        },
        error: function (data) {
            errorProcess(data);
        }
    });
}

function drawchart5(o1,o2,o3,o4,o5,o6,o7,e1,e2,e3,e4,e5,e6,e7,h1,h2,h3,h4,h5,h6,h7) {
    var myChart5 = echarts.init(document.getElementById('maintest5'), 'shine');
    option5 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data: ['门诊人数', '急诊人数','住院人数']
        },
        xAxis: [
            {
                type: 'category',
                data: ['0', '1', '2', '3', '4', '5', '6'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '门诊次数',
                min: 0,
                max: 50,
                interval: 5,
                axisLabel: {
                    formatter: '{value} 次'
                }
            },
            // {
            //     type: 'value',
            //     name: '急诊次数',
            //     min: 0,
            //     max: 50,
            //     interval: 5,
            //     axisLabel: {
            //         formatter: '{value} 次'
            //     }
            // },
            // {
            //     type: 'value',
            //     name: '住院次数',
            //     min: 0,
            //     max: 50,
            //     interval: 5,
            //     axisLabel: {
            //         formatter: '{value} 次'
            //     }
            // }
        ],
        series: [
            {
                name: '门诊人数',
                type: 'line',
                data: [o1,o2,o3,o4,o5,o6,o7]
            },
            {
                name: '急诊人数',
                type: 'line',
                data: [e1,e2,e3,e4,e5,e6,e7]
            },
            {
                name: '住院人数',
                type: 'line',
                data: [h1,h2,h3,h4,h5,h6,h7]
            }
        ]
    };
    myChart5.setOption(option5);
}