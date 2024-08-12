"use client";
import { useState } from "react";

import { Area, AreaChart, CartesianGrid, XAxis, Legend } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/custom-charts/explore-main-chart";
import { Skeleton } from "../ui/skeleton";

const chartData = [
  { time: "2018-12-22", value: 3.51 },
  { time: "2018-12-23", value: 2.11 },
  { time: "2018-12-24", value: 7.02 },
  { time: "2018-12-25", value: 3.32 },
  { time: "2018-12-26", value: 5.17 },
  { time: "2018-12-27", value: 13.89 },
  { time: "2018-12-28", value: 8.46 },
  { time: "2018-12-29", value: 9.92 },
  { time: "2018-12-30", value: 12.68 },
  { time: "2018-12-31", value: 6.67 },
  { time: "2019-01-01", value: 13.45 },
  { time: "2019-01-02", value: 20.12 },
  { time: "2019-01-03", value: 24.5 },
  { time: "2019-01-04", value: 24.75 },
  { time: "2019-01-05", value: 25.32 },
  { time: "2019-01-06", value: 26.18 },
  { time: "2019-01-07", value: 33.05 },
  { time: "2019-01-08", value: 44.72 },
  { time: "2019-01-09", value: 52.95 },
  { time: "2019-01-10", value: 66.6 },
  { time: "2019-01-11", value: 54.13 },
  { time: "2019-01-12", value: 59.92 },
  { time: "2019-01-13", value: 70.63 },
  { time: "2019-01-14", value: 80.8 },
  { time: "2019-01-15", value: 90.45 },
  { time: "2019-01-16", value: 105.9 },
  { time: "2019-01-17", value: 85.32 },
  { time: "2019-01-18", value: 87.25 },
  { time: "2019-01-19", value: 95.37 },
  { time: "2019-01-20", value: 70.7 },
  { time: "2019-01-21", value: 75.02 },
  { time: "2019-01-22", value: 65.28 },
  { time: "2019-01-23", value: 60.23 },
  { time: "2019-01-24", value: 55.61 },
  { time: "2019-01-25", value: 50.19 },
  { time: "2019-01-26", value: 45.52 },
  { time: "2019-01-27", value: 40.17 },
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

const monthAbbreviations = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// const RenderLegend = (props: any) => {
//   const { payload } = props;

//   console.log("PAYLOAD", payload[0]);
//   const colors = ["#ff223f"];
//   return (
//     <div className="d-flex justify-content-end">
//       {payload.map((entry: any, index: number) => (
//         <>
//           <TrendingUp className="mx-2" size={18} color={colors[index]} />
//           <span className="mx-2" key={`item-${index}`}>
//             {entry.value}
//           </span>
//         </>
//       ))}
//     </div>
//   );
// };

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "white",
  },
} satisfies ChartConfig;

const TvlChart = () => {
  const [mouseEnteredChart, setMouseEnteredChart] = useState<boolean>(false);

  const tickFormatter = (value: string) => {
    const date = new Date(value);
    const month = monthAbbreviations[date.getMonth()];
    const year = String(date.getFullYear()).slice(-2);
    return `${month} ${year}`;
  };

  return (
    <div className="">
      <CardHeader className="">
        <CardDescription className="font-medium text-a-gray text-base">
          RampX TVL
        </CardDescription>
        <CardTitle className="font-semibold text-white text-[36px] lining-nums h-[54px]">
          {!mouseEnteredChart && `$${chartData[chartData.length - 1].value}M`}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={chartConfig}
          // onMouseEnter={() => {
          //   setDefaultDataShown(false);
          //   setChartOpacity(0.2);
          // }}
          onMouseLeave={() => setMouseEnteredChart(false)}
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            onMouseMove={(state) => {
              if (state.isTooltipActive) {
                setMouseEnteredChart(true);
              } else {
                setMouseEnteredChart(false);
              }
            }}
            // margin={{
            //   left: 12,
            //   right: 12,
            // }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              style={{
                // fontSize: "0.8rem",
                // fontFamily: "Arial",
                fill: "rgba(124, 124, 124)",
                // @ts-ignore it works just fine despite it saying property does not exist
                "font-variant-numeric": "lining-nums",
              }}
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={30}
              tickFormatter={tickFormatter}
              //   tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  className="bg-a-charcoal"
                />
              }
            />
            <Area
              dataKey="value"
              type="natural"
              fill="#D0F603"
              fillOpacity={mouseEnteredChart ? 0.2 : 1}
              stroke="#D0F603"
              strokeWidth={2}
            />
            {/* <Legend
              content={<RenderLegend   />}
              verticalAlign="top"
            /> */}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter> */}
    </div>
  );
};
export default TvlChart;
