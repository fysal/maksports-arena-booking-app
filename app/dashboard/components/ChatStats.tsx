"use client";
import { BookingsContext } from "@/app/lib/context";
import { getWeekOfMonth } from "@/app/lib/utils/utils";
import React, { useContext, useMemo } from "react";
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
  const { bookings } = useContext(BookingsContext);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const currentWeek = getWeekOfMonth();

  //filter bookings for the current week

  const bookigsInWeek = useMemo(() => {
    return bookings.filter(
      (booking) => getWeekOfMonth(new Date(booking.date)) === currentWeek,
    );
  }, [bookings, currentWeek]);

  function bookingsPerDay(day: number): number {
    return bookigsInWeek.filter(
      (booking) => new Date(booking.date).getDay() === day,
    ).length;
  }

  const dataInDays = useMemo(() => {
    return daysOfWeek.map((day, index) => ({
      day,
      bookings: bookingsPerDay(index + 1),
    }));
  }, [bookigsInWeek, bookingsPerDay, daysOfWeek]);

  console.log(dataInDays);

  return (
    <div className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={dataInDays}
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
};

export default ChatStats;
