"use client";
import { useContext, useEffect, useState } from "react";
import Navbar from "../components/nav/Navbar";
import { BookingsContext, UserContext } from "../lib/context";
import { toast } from "react-toastify";
import { BookingType } from "../types/booking";
import WithUserRoutes from "../RouteProtection/userRoutes";
import Footer from "../components/Footer";

const TeamLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookings, setBookings] = useState<BookingType[]>([]);

  const { currentUser } = useContext(UserContext);

  //fetch bookings

  async function fetchUserTeamBookings() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/booking/fetch_all_single_team?uid=${currentUser?.uid}`,
    );

    const data = await response.json();

    if (response.status !== 200) {
      toast.error(data.error);
      return;
    }

    setBookings(data.data);
  }

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (currentUser) await fetchUserTeamBookings();
    }, 0);

    return () => clearTimeout(timer);
  }, [currentUser]);

  return (
    <>
      <Navbar />
      <BookingsContext.Provider value={{ bookings, setBookings }}>
        {children}
      </BookingsContext.Provider>
      <Footer/>
    </>
  );
}

export default WithUserRoutes(TeamLayout);