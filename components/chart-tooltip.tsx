import React from "react";
import { TooltipProps } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const ChartTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{label}</CardTitle>
        </CardHeader>
        <CardContent>
          {payload.map((entry, index) => (
            <p
              className="capitalize"
              key={index}
            >{`${entry.name}: ${entry.value}`}</p>
          ))}
        </CardContent>
      </Card>
    );
  }

  return null;
};
