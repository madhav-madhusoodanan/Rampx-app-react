"use client";
import React, { useEffect, useRef, useState } from "react";
import { createChart, ColorType, LineStyle } from "lightweight-charts";

const initialData = [
  { time: "2018-12-22", value: 32.51 },
  { time: "2018-12-23", value: 31.11 },
  { time: "2018-12-24", value: 27.02 },
  { time: "2018-12-25", value: 27.32 },
  { time: "2018-12-26", value: 25.17 },
  { time: "2018-12-27", value: 28.89 },
  { time: "2018-12-28", value: 25.46 },
  { time: "2018-12-29", value: 23.92 },
  { time: "2018-12-30", value: 22.68 },
  { time: "2018-12-31", value: 22.67 },
  { time: "2019-01-01", value: 23.45 },
  { time: "2019-01-02", value: 24.12 },
  { time: "2019-01-03", value: 24.5 },
  { time: "2019-01-04", value: 24.75 },
  { time: "2019-01-05", value: 25.32 },
  { time: "2019-01-06", value: 26.18 },
  { time: "2019-01-07", value: 27.05 },
  { time: "2019-01-08", value: 26.72 },
  { time: "2019-01-09", value: 26.95 },
  { time: "2019-01-10", value: 27.6 },
  { time: "2019-01-11", value: 28.13 },
  { time: "2019-01-12", value: 27.92 },
  { time: "2019-01-13", value: 27.63 },
  { time: "2019-01-14", value: 27.8 },
  { time: "2019-01-15", value: 28.45 },
  { time: "2019-01-16", value: 28.9 },
  { time: "2019-01-17", value: 29.32 },
  { time: "2019-01-18", value: 29.25 },
  { time: "2019-01-19", value: 29.37 },
  { time: "2019-01-20", value: 29.7 },
  { time: "2019-01-21", value: 30.02 },
  { time: "2019-01-22", value: 30.28 },
];

const ExploreVolumeChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const legendRef = useRef<HTMLDivElement | null>(null);
  const [chartLegend, setChartLegend] = useState<string | null>(null);

  const backgroundColor = "transparent";
  const textColor = "gray";

  //   const initLoadData = `$${initialData[initialData.length - 1].value}`;
  //   const legendPrefix = "$";

  useEffect(() => {
    if (!chartContainerRef.current) {
      return;
    }

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0,
          bottom: 0,
        },
        visible: false, // makes the right priceScale disapear
        autoScale: true,
        borderVisible: false,
      },
      // grid: {
      //   vertLines: { style: LineStyle.CustomDotGrid, color: "white" },
      //   horzLines: { style: LineStyle.CustomDotGrid, color: "white" },
      // },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      //   crosshair: {
      //     horzLine: {
      //       visible: false,
      //       labelVisible: false,
      //     },
      //   },
      width: chartContainerRef.current.clientWidth,
      //   height: 330,
      //   TESTING SOME ADD ONs FROM EXAMPLE PLUGINS
      handleScale: false,
      handleScroll: false,
    });

    const areaSeries = chart.addHistogramSeries({
      //   lineColor: "#B3CF3D",
      //   topColor: "#D0F603",
      //   bottomColor: "#D0F603",
      //   lineWidth: 2,
      //   crosshairMarkerVisible: false,
      color: "red",
      priceLineVisible: false,
    });

    areaSeries.setData(initialData);

    chart.subscribeCrosshairMove((param) => {
      let priceFormatted = "";
      if (param.time) {
        const data = param.seriesData.get(areaSeries);
        if (data) {
          let price;
          if ("value" in data) {
            price = data.value;
          } else if ("close" in data) {
            price = data.close;
          }
          if (price !== undefined) {
            priceFormatted = price.toFixed(2);
          }
        }
      }
      setChartLegend(priceFormatted);
    });

    chart.timeScale().fitContent();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [backgroundColor, textColor]);

  return (
    <div>
      <div className="text-a-gray font-medium">RampX Volume</div>

      <div className="relative">
        <div ref={chartContainerRef} className="w-full h-[350px]"></div>
        <div
          ref={legendRef}
          className="font-syne lining-nums absolute top-0 left-0 font-semibold text-white text-[36px] z-10 mb-20"
        >
          ${chartLegend || initialData[initialData.length - 1].value}M
        </div>
      </div>
    </div>
  );
};

export default ExploreVolumeChart;
