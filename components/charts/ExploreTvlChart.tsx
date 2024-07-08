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
  { time: "2019-01-23", value: 28.23 },
  { time: "2019-01-24", value: 26.61 },
  { time: "2019-01-25", value: 27.19 },
  { time: "2019-01-26", value: 31.52 },
  { time: "2019-01-27", value: 36.17 },
  { time: "2019-01-28", value: 37.15 },
  { time: "2019-01-29", value: 41.86 },
  { time: "2019-01-30", value: 37.42 },
  { time: "2019-01-31", value: 35.11 },
  { time: "2019-02-01", value: 33.08 },
  { time: "2019-02-02", value: 35.41 },
  { time: "2019-02-03", value: 31.4 },
  { time: "2019-02-04", value: 28.21 },
  { time: "2019-02-05", value: 33.04 },
  { time: "2019-02-06", value: 37.66 },
  { time: "2019-02-07", value: 40.51 },
  { time: "2019-02-08", value: 36.33 },
  { time: "2019-02-09", value: 35.99 },
  { time: "2019-02-10", value: 34.94 },
  { time: "2019-02-11", value: 34.98 },
  { time: "2019-02-12", value: 32.41 },
  { time: "2019-02-13", value: 32.36 },
  { time: "2019-02-14", value: 28.79 },
  { time: "2019-02-15", value: 32.58 },
  { time: "2019-02-16", value: 29.95 },
  { time: "2019-02-17", value: 34.46 },
  { time: "2019-02-18", value: 37.9 },
  { time: "2019-02-19", value: 34.89 },
  { time: "2019-02-20", value: 35.21 },
  { time: "2019-02-21", value: 35.89 },
  { time: "2019-02-22", value: 35.57 },
  { time: "2019-02-23", value: 33.64 },
  { time: "2019-02-24", value: 35.94 },
  { time: "2019-02-25", value: 36.52 },
  { time: "2019-02-26", value: 36.37 },
  { time: "2019-02-27", value: 40.43 },
  { time: "2019-02-28", value: 39.95 },
  { time: "2019-03-01", value: 35.53 },
  { time: "2019-03-02", value: 33.48 },
  { time: "2019-03-03", value: 36.96 },
  { time: "2019-03-04", value: 34.4 },
  { time: "2019-03-05", value: 34.33 },
  { time: "2019-03-06", value: 38.49 },
  { time: "2019-03-07", value: 42.7 },
  { time: "2019-03-08", value: 42.13 },
  { time: "2019-03-09", value: 42.08 },
  { time: "2019-03-10", value: 42.66 },
  { time: "2019-03-11", value: 45.71 },
  { time: "2019-03-12", value: 42.49 },
  { time: "2019-03-13", value: 41.65 },
  { time: "2019-03-14", value: 39.37 },
  { time: "2019-03-15", value: 37.19 },
  { time: "2019-03-16", value: 37.93 },
  { time: "2019-03-17", value: 40.07 },
  { time: "2019-03-18", value: 36.35 },
  { time: "2019-03-19", value: 37.26 },
  { time: "2019-03-20", value: 41.41 },
  { time: "2019-03-21", value: 39.42 },
  { time: "2019-03-22", value: 39.48 },
  { time: "2019-03-23", value: 36.7 },
  { time: "2019-03-24", value: 32.68 },
  { time: "2019-03-25", value: 29.23 },
  { time: "2019-03-26", value: 26.83 },
  { time: "2019-03-27", value: 28.85 },
];

const ExploreTvlChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const legendRef = useRef<HTMLDivElement | null>(null);
  const [chartLegend, setChartLegend] = useState<string | null>(null);
  //   const [isInteracting, setIsInteracting] = useState<boolean | null>(false);

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
          top: 0.3,
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

    const areaSeries = chart.addAreaSeries({
      lineColor: "#B3CF3D",
      topColor: "#D0F603",
      bottomColor: "#D0F603",
      //   topColor: "rgba(208, 246, 3, 0.10)",
      //   bottomColor: "rgba(208, 246, 3, 0.10)",
      //   topColor: isInteracting ? "rgba(208, 246, 3, 0.10)" : "#D0F603",
      //   bottomColor: isInteracting ? "rgba(208, 246, 3, 0.10)" : "#D0F603",
      lineWidth: 2,
      crosshairMarkerVisible: false,
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
      //   if (!isInteracting) {
      //     setIsInteracting(true);
      //   }
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
      <div className="text-a-gray font-medium">RampX TVL</div>

      <div className="relative">
        <div ref={chartContainerRef} className="w-full h-[350px] "></div>
        <div
          ref={legendRef}
          className="font-syne lining-nums absolute top-0 left-0 font-semibold text-white text-[36px] z-10 "
        >
          ${chartLegend || initialData[initialData.length - 1].value}M
          <p className="text-base">fds</p>
        </div>
      </div>
    </div>
  );
};

export default ExploreTvlChart;
