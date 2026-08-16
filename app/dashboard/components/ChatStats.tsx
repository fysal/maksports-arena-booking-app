'use client'
import React from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ChatStats = () => {

    const data = [
      {
        day: "Mon",
        bookings: 12,
      },
      {
        day: "Tue",
        bookings: 22,
      },
      {
        day: "Wed",
        bookings: 29,
      },
      {
        day: "Thu",
        bookings: 16,
      },
      {
        day: "Fri",
        bookings: 26,
      },
      {
        day: "Sat",
        bookings: 15,
      },
      {
        day: "Sun",
        bookings: 80,
      },
    ];
  return (
    <div className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}>
          <defs>
            <linearGradient id="bookingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16a34a" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />

          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
            }}
          />

          <Area
            type="monotone"
            dataKey="bookings"
            stroke="#16a34a"
            strokeWidth={3}
            fill="url(#bookingGradient)"
            dot={{
              fill: "#16a34a",
              strokeWidth: 2,
              r: 4,
            }}
            activeDot={{
              r: 7,
              fill: "#16a34a",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChatStats