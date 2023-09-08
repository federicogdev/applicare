"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { getCurrentWeekDatesString } from "@/lib/utils";
import { ChartTooltip } from "@/components/chart-tooltip";
import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface IJobStatusCount {
  date: string;
  pending: number;
  declined: number;
  interview: number;
}

interface WeeklyChartProps {
  data: IJobStatusCount[];
}

export const WeeklyChart = ({ data }: WeeklyChartProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  return (
    <Card className="w-full lg:col-span-2 relative lg:h-[65vh] h-[65vh]">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="font-normal mr-1">Weekly Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2 lg:h-[60vh] h-[60vh]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              allowDecimals={false}
              tickLine={false}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{
                fill: resolvedTheme === "dark" ? "#27272a" : "#e5e7eb",
              }}
            />
            <Bar dataKey="pending" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="interview" fill="#f97316" radius={[4, 4, 0, 0]} />
            {/* <Bar dataKey="interview" fill="#06b6d4" radius={[4, 4, 0, 0]} /> */}
            <Bar dataKey="declined" fill="#ef4444" radius={[4, 4, 0, 0]} />
            {/* <Legend iconSize={10} /> */}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
