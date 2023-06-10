import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const PieChart = () => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    const chartDiv = chartRef.current;
    const root = am5.Root.new(chartDiv);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        innerRadius: am5.percent(50),
      })
    );

    const data = [
      { country: "ERC-721", sales: 1 / 3 },
      { country: "ERC-1155", sales: 1 / 3 },
      { country: "ERC-20", sales: 1 / 3 },
    ];

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "sales",
        categoryField: "country",
      })
    );
    series.data.setAll(data);

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root.horizontalLayout,
      })
    );
    legend.data.setAll(series.dataItems, am5.color(0xfffff)); // Change text color to white

    // Animation
    series.appear(1000, 100, "bounce");

    // Styling
    series.slices.template.set("", (slice) => {
      const category = slice.dataItem.get("category");
      if (category === "ERC-721") {
        return am5.color("#808080"); // Change color for Data1 to grey
      } else if (category === "Data2") {
        return am5.color("#0000ff"); // Change color for Data2 to blue
      } else if (category === "Data3") {
        return am5.color("#ffffff"); // Change color for Data3 to white
      }
      return am5.color(0x000000);
    });

    // Return function to dispose the chart when unmounted
    return () => {
      root.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }}></div>;
};

export default PieChart;

