import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";

const XyChart = () => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    const root = am5.Root.new(chartRef.current);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout,
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        rendererLabels: {
          text: {
            fill: am5.color(0xffffff), // Change text color to white
          },
        },
        min: 0, // Set minimum value for y-axis
        max: 10, // Set maximum value for y-axis
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: "category",
      })
    );

    const series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "SBTs", // Change series name to "SBTs"
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value1",
        categoryXField: "category",
        fill: am5.color(0x5DAFD5), // Change series color to blue
      })
    );

    const series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "NFTs", // Change series name to "NFTs"
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value2",
        categoryXField: "category",
        fill: am5.color(0x5B69D3), // Change series color to white
      })
    );

    const legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);
    legend.set("", am5.color(0xffffff));

    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    const data = [
      { category: "SBTs", value1: 3, value2: 5}, // Change category and values
      { category: "NFTs", value1: 4, value2: 6 }, // Change category and values
      { category: "ERC-20s", value1: 5, value2: 8 }, // Change category and values
    ];

    xAxis.data.setAll(data);
    series1.data.setAll(data);
    series2.data.setAll(data);

    // Styling
    root.interfaceColors.set("grid", am5.color(0xffffff));

    return () => {
      root.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "500px", height: "500px" }} />;
};

export default XyChart;

