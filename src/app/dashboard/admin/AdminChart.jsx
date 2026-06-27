"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "Registrations",
    color: "hsl(var(--primary))",
  },
};

export default function AdminChart({ data }) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full aspect-auto min-h-[250px]">
      <BarChart accessibilityLayer data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeOpacity={0.5} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
        />
        <ChartTooltip
          cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="count"
          radius={[6, 6, 0, 0]}
          maxBarSize={48}
          fill="url(#barFill)"
        />
      </BarChart>
    </ChartContainer>
  );
}
