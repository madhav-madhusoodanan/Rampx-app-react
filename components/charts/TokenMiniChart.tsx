"use client";
import React from "react";
import { Line, LineChart } from "recharts";

// TODO - Replace any type once return value is more clear

const TokenMiniChart = ({ data, isPositive }: any) => {
  return (
    <>
      <LineChart
        width={150}
        height={60}
        data={data}
        margin={{ top: 10, right: 16, left: 16, bottom: 22 }}
      >
        <Line
          type="linear"
          dataKey="stats"
          stroke={isPositive ? "#40b66b" : "#ff5f52"}
          dot={false}
        />
      </LineChart>
    </>
  );
};

export default TokenMiniChart;
