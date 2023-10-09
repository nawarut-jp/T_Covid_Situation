import { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import Card from "./Card";

export default function Chart({ data, date = "30" }) {
  const ref = useRef(null);

  useEffect(() => {
    const setData = () => {
      const option = {
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        title: {
          left: "center",
          text: "Total Cases Covid",
          subtext: "(รายงานผลช่วงเวลา " + date + " วัน)",
          subtextStyle: {
            fontSize: 16,
            fontFamily: 'Kanit'
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          data: data.data,
          // boundaryGap: false
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100,
          },
          {
            start: 0,
            end: 100,
          },
        ],
        series: [
          {
            name: "Cases : ",
            type: "line",
            smooth: true,
            symbol: "none",
            areaStyle: {},
            data: data.series,
          },
        ],
      };
      ref.current.getEchartsInstance().setOption(option);
    };
    const timer = setTimeout(() => {
      setData();
    }, 700);
    return () => clearTimeout(timer);
  }, [data]);

  const defaultOption = {
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[0], "10%"];
      },
    },
    title: {
      left: "center",
      text: "Total Cases Covid",
      subtext: "(รายงานผลช่วงเวลา 30 วัน)",
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      //   data: ['05/03/2023', '06/03/2023', '07/03/2023', '08/03/2023', '09/03/2023'],
      data: [""],
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
      },
    ],
    series: [
      {
        name: "Cases : ",
        type: "line",
        smooth: true,
        symbol: "none",
        areaStyle: {},
        data: [0],
      },
    ],
  };

  return (
    <Card>
      <ReactECharts option={defaultOption} ref={ref} />
    </Card>
  );
}
