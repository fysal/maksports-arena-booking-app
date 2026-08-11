import React from "react";

const HomeStats = () => {
  const stats = [
    {
      value: "500+",
      text: "Team Registered",
    },
    { value: "20K+", text: "Bookings Made" },
    { value: "99.9%", text: "Booking Accuracy" },
  ];
  return (
    <div className="mt-10 flex flex-wrap gap-8">
      {stats.map((stat, idx: number) => (
        <div key={idx}>
          <p className="text-3xl font-black">{stat.value}</p>
          <p className="text-sm text-slate-500">{stat.text}</p>
        </div>
      ))}
    </div>
  );
};

export default HomeStats;
