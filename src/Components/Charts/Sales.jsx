import React, { Component } from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import SalesData from '../../Data/SalesData'

export default class Sales extends Component {

    componentDidMount() {

        am4core.useTheme(am4themes_animated);

        let chart = am4core.create("SalesChart", am4charts.XYChart);

        // Add data
        chart.data = SalesData;

        // Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        //dateAxis.renderer.grid.template.location = 0;
        //dateAxis.renderer.minGridDistance = 30;

        let valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis1.title.text = "Sales";

        let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis2.title.text = "Market Days";
        valueAxis2.renderer.opposite = true;
        valueAxis2.renderer.grid.template.disabled = true;

        // Create series
        let series1 = chart.series.push(new am4charts.ColumnSeries());
        series1.dataFields.valueY = "sales1";
        series1.dataFields.dateX = "date";
        series1.yAxis = valueAxis1;
        series1.name = "Target Sales";
        series1.tooltipText = "{name}\n[bold font-size: 20]${valueY}M[/]";
        series1.fill = chart.colors.getIndex(0);
        series1.strokeWidth = 0;
        series1.clustered = false;
        series1.columns.template.width = am4core.percent(40);

        let series2 = chart.series.push(new am4charts.ColumnSeries());
        series2.dataFields.valueY = "sales2";
        series2.dataFields.dateX = "date";
        series2.yAxis = valueAxis1;
        series2.name = "Actual Sales";
        series2.tooltipText = "{name}\n[bold font-size: 20]${valueY}M[/]";
        series2.fill = chart.colors.getIndex(0).lighten(0.5);
        series2.strokeWidth = 0;
        series2.clustered = false;
        series2.toBack();

        let series3 = chart.series.push(new am4charts.LineSeries());
        series3.dataFields.valueY = "market1";
        series3.dataFields.dateX = "date";
        series3.name = "Market Days";
        series3.strokeWidth = 2;
        series3.tensionX = 0.7;
        series3.yAxis = valueAxis2;
        series3.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";

        let bullet3 = series3.bullets.push(new am4charts.CircleBullet());
        bullet3.circle.radius = 3;
        bullet3.circle.strokeWidth = 2;
        bullet3.circle.fill = am4core.color("#fff");

        let series4 = chart.series.push(new am4charts.LineSeries());
        series4.dataFields.valueY = "market2";
        series4.dataFields.dateX = "date";
        series4.name = "Market Days ALL";
        series4.strokeWidth = 2;
        series4.tensionX = 0.7;
        series4.yAxis = valueAxis2;
        series4.tooltipText = "{name}\n[bold font-size: 20]{valueY}[/]";
        series4.stroke = chart.colors.getIndex(0).lighten(0.5);
        series4.strokeDasharray = "3,3";

        let bullet4 = series4.bullets.push(new am4charts.CircleBullet());
        bullet4.circle.radius = 3;
        bullet4.circle.strokeWidth = 2;
        bullet4.circle.fill = am4core.color("#fff");

        // Add cursor
        chart.cursor = new am4charts.XYCursor();

        // Add legend
        chart.legend = new am4charts.Legend();
        chart.legend.position = "top";

        // Add scrollbar
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series1);
        chart.scrollbarX.series.push(series3);
        chart.scrollbarX.parent = chart.bottomAxesContainer;

        this.chart = chart;
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }
    render() {
        return (
            <div>
                <div id="SalesChart" style={{ width: "100%", height: "500px" }}></div>
            </div>
        )
    }
}
