"use client";

import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CandlestickData as CustomCandlestickData } from "@/utils/marketData";

interface CandlestickChartProps {
  data: CustomCandlestickData[];
  height?: number;
}

export default function CandlestickChart({ data, height = 300 }: CandlestickChartProps) {
  const chartData = useMemo(() => {
    return data.map((item, index) => ({
      time: index,
      price: item.close,
      timestamp: new Date(item.time).toLocaleTimeString(),
    }));
  }, [data]);

  return (
    <div className="w-full bg-gray-900 rounded-md border border-gray-700 p-2" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="time"
            stroke="#ffffff"
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: "#374151" }}
          />
          <YAxis
            stroke="#ffffff"
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: "#374151" }}
            domain={['dataMin - 1', 'dataMax + 1']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "6px",
              color: "#ffffff",
            }}
            labelStyle={{ color: "#ffffff" }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#10b981" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}