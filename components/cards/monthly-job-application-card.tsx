import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import clsx from "clsx";

interface MonthlyJobApplicationCardProps {
  label: string;
  prevMonthApplication?: number;
  currentMonthApplication?: number;
  icon: any;
}

export const MonthlyJobApplicationCard = ({
  label,
  prevMonthApplication = 0,
  currentMonthApplication = 0,
  icon: Icon,
}: MonthlyJobApplicationCardProps) => {
  const percentageChange =
    prevMonthApplication !== 0
      ? ((currentMonthApplication - prevMonthApplication) /
          Math.abs(prevMonthApplication)) *
        100
      : currentMonthApplication !== 0
      ? Infinity
      : 0;

  const difference = currentMonthApplication - prevMonthApplication;

  const displayText =
    currentMonthApplication !== 0
      ? prevMonthApplication !== 0
        ? `${percentageChange >= 0 ? "+" : ""}${percentageChange.toFixed(
            2
          )}% from last month`
        : `${difference >= 0 ? "+" : ""}${difference} jobs from last month`
      : "+0% from last month";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">{label} </CardTitle>
        <Icon />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {currentMonthApplication} applications
        </div>

        <p
          className={clsx(
            "text-xs text-muted-foreground",
            difference >= 0 || percentageChange >= 0
              ? "text-emerald-600"
              : "text-red-500"
          )}
        >
          {displayText}
        </p>
      </CardContent>
    </Card>
  );
};
