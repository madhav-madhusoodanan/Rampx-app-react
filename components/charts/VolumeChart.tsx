"use client";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts";
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/custom-charts/explore-main-chart";

const chartData = [
  //   { month: "January", desktop: 186, mobile: 80 },

  { time: "2019-01-01", value: 186 },
  { time: "2019-02-01", value: 305 },
  { time: "2019-03-01", value: 237 },
  { time: "2019-04-01", value: 73 },
  { time: "2019-05-01", value: 209 },
  { time: "2019-06-01", value: 214 },
  { time: "2019-07-01", value: 115 },
  { time: "2019-08-01", value: 523 },
  { time: "2019-09-01", value: 443 },
  { time: "2019-10-01", value: 223 },
  { time: "2019-11-01", value: 332 },
  { time: "2019-12-01", value: 112 },
  { time: "2020-01-01", value: 335 },
  //   { time: "2020-02-01", value: 250 },
  //   { time: "2020-03-01", value: 275 },
  //   { time: "2020-04-01", value: 210 },
  //   { time: "2020-05-01", value: 300 },
  { time: "2020-06-01", value: 280 },
  { time: "2020-07-01", value: 310 },
  { time: "2020-08-01", value: 330 },
  { time: "2020-09-01", value: 270 },
  { time: "2020-10-01", value: 290 },
  { time: "2020-11-01", value: 305 },
  { time: "2021-04-01", value: 580 },
  { time: "2021-05-01", value: 200 },
  { time: "2021-06-01", value: 400 },
  { time: "2021-07-01", value: 390 },
  { time: "2021-08-01", value: 99 },
  { time: "2021-09-01", value: 200 },
  { time: "2021-10-01", value: 560 },
  { time: "2021-11-01", value: 310 },
  { time: "2021-12-01", value: 405 },
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

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "white",
  },
} satisfies ChartConfig;

const VolumeChart = () => {
  const [mouseEnteredChart, setMouseEnteredChart] = useState<boolean>(false);
  const [focusBar, setFocusBar] = useState<number | undefined | null>(null);

  const tickFormatter = (value: string) => {
    const date = new Date(value);
    const month = monthAbbreviations[date.getMonth()];
    const year = String(date.getFullYear()).slice(-2);
    return `${month} ${year}`;
  };

  return (
    <div>
      <CardHeader className="">
        <CardDescription className="font-medium text-a-gray text-base">
          RampX Volume
        </CardDescription>
        <CardTitle className="font-semibold text-white text-[36px] lining-nums h-[54px]">
          {!mouseEnteredChart && `$${chartData[chartData.length - 1].value}M`}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={chartConfig}
          //   onMouseEnter={() => setMouseEnteredChart(true)}
          onMouseLeave={() => setMouseEnteredChart(false)}
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            onMouseMove={(state) => {
              if (state.isTooltipActive) {
                setFocusBar(state.activeTooltipIndex);
                setMouseEnteredChart(true);
              } else {
                setFocusBar(null);
                setMouseEnteredChart(false);
              }
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              minTickGap={30}
              style={{
                fill: "rgba(124, 124, 124)",
                // @ts-ignore it works just fine despite it saying property does not exist
                "font-variant-numeric": "lining-nums",
              }}
              tickFormatter={tickFormatter}
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
            <Bar
              dataKey="value"
              stackId="a"
              fill="#D0F603"
              radius={[100, 100, 100, 100]}
            >
              {chartData.map((entry, index) => (
                <Cell
                  fill={
                    focusBar === index || !mouseEnteredChart
                      ? "#D0F603"
                      : "rgb(208, 246, 3, 0.2)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
};

export default VolumeChart;
