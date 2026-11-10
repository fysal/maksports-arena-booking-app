"use client";
import { Fragment } from "react/jsx-runtime";
import WithAuthRoutes from "../RouteProtection/authRoutes";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/Footer";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default WithAuthRoutes(AuthLayout);
