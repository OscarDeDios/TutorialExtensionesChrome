//http://www.sitepoint.com/fancy-responsive-charts-with-chart-js/

$(document).ready(function(){
       
    var dataStored = new Object;
    if (localStorage["gmailPressed"]) {
        dataStored = JSON.parse(localStorage["gmailPressed"]);
    }
    else return;

    var labels = new Array();
    var data = new Array();

    var ahora = new Date().getTime();
    var mlsegDia = 1000 * 60 * 60 * 24;
    var formatter = new Intl.DateTimeFormat("es", { month: "short" });

    for (var i=0;i<30;i++)
    {
        var diaAux = ahora - (mlsegDia * (30 - i - 1));
        var d = new Date(diaAux);
        var dateString = d.getFullYear() + '-' + ('0' + parseInt(d.getMonth()+1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);

        labels.push(formatter.format(d) + d.getDate());
        if (dataStored[dateString]) {
            data.push(dataStored[dateString]);
        }
        else {
            data.push(0);
        }
    }

    var lineChartData = {
        labels: labels,
        datasets: [{
            fillColor: "rgba(220,220,220,0)",
            strokeColor: "rgba(220,180,0,1)",
            pointColor: "rgba(220,180,0,1)",
            data: data
        }]

    }

    Chart.defaults.global.animationSteps = 50;
    Chart.defaults.global.tooltipYPadding = 16;
    Chart.defaults.global.tooltipCornerRadius = 0;
    Chart.defaults.global.tooltipTitleFontStyle = "normal";
    Chart.defaults.global.tooltipFillColor = "rgba(0,160,0,0.8)";
    Chart.defaults.global.animationEasing = "easeOutBounce";
    Chart.defaults.global.responsive = true;
    Chart.defaults.global.scaleLineColor = "black";
    Chart.defaults.global.scaleFontSize = 16;

    var ctx = document.getElementById("canvas").getContext("2d");
    var LineChartDemo = new Chart(ctx).Line(lineChartData, {
        pointDotRadius: 10,
        bezierCurve: true,
        scaleShowVerticalLines: false,
        scaleGridLineColor: "black",
        pointDot : true,
        pointDotRadius : 2
    });
});