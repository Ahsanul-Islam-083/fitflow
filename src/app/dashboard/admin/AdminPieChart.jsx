"use client";

import { Pie, PieChart, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const DONUT_COLORS = [
  "#2563eb",
  "#0ea5e9",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#f97316",
  "#ef4444",
  "#a855f7",
];

export default function AdminPieChart({ data, nameKey, dataKey, config }) {
  const total = data.reduce((sum, entry) => sum + (entry[dataKey] || 0), 0);

  return (
    <ChartContainer config={config} className="h-full w-full aspect-auto min-h-[250px]">
      <PieChart>
        <defs>
          {DONUT_COLORS.map((color, i) => (
            <linearGradient key={`donut-grad-${i}`} id={`donutGrad${i}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.85} />
              <stop offset="100%" stopColor={color} stopOpacity={1} />
            </linearGradient>
          ))}
        </defs>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent />}
        />
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          innerRadius={65}
          outerRadius={95}
          stroke="hsl(var(--background))"
          strokeWidth={3}
          cornerRadius={4}
          paddingAngle={3}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={`url(#donutGrad${index % DONUT_COLORS.length})`}
            />
          ))}
        </Pie>
        {/* Center total label */}
        <text
          x="50%"
          y="48%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={28}
          fontWeight={700}
          fill="hsl(var(--foreground))"
        >
          {total}
        </text>
        <text
          x="50%"
          y="62%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={11}
          fontWeight={500}
          fill="hsl(var(--muted-foreground))"
          letterSpacing={1}
        >
          Total
        </text>
      </PieChart>
    </ChartContainer>
  );
}
