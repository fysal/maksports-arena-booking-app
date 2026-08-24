"use client";
import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import WithAdminRoutes from "../RouteProtection/adminRoutes";
import { BookingType } from "../types/booking";
import MainLayoutDecorator from "../layoutDecorator";
import { BookingsContext } from "../lib/context";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {

  const [bookings, setBookings] = useState<BookingType[]>([]);
  return (
    <div className="flex min-h-screen bg-slate-50">
      <BookingsContext.Provider value={{ bookings, setBookings }}>
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </BookingsContext.Provider>
    </div>
  );
};

export default WithAdminRoutes(AdminLayout);
