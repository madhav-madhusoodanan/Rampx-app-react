"use client";
import React from "react";
import { Line, LineChart } from "recharts";

// TODO - Replace any type once return value is more clear

const TokenMiniChart = ({ data, isPositive, height, width, dataKey }: any) => {
  return (
    <>
      <LineChart
        width={width}
        height={height}
        data={data}
        margin={{ top: 30, right: 16, left: 16, bottom: 22 }}
      >
        <Line
          type="linear"
          dataKey={dataKey ?? "price"}
          stroke={isPositive ? "#40b66b" : "#ff5f52"}
          dot={false}
        />
      </LineChart>
    </>
  );
};

export default TokenMiniChart;
