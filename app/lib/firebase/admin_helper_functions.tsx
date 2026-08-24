/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, doc, onSnapshot } from "firebase/firestore";
import { adminDb } from "./admin";
import { db } from "./client";
import { BookingType } from "@/app/types/booking";

export default class AdminHelper {
  static async fetchAllBooking({
    setBookings,
  }: {
    setBookings: React.Dispatch<React.SetStateAction<BookingType[]>>;
  }) {
    try {
      console.log("backend reached");
      onSnapshot(collection(db, "bookings"), (snapshot: any) => {
        const bookings: BookingType[] = [];

        for (const doc of snapshot.docs) {
          bookings.push(doc.data());
        }
        console.log(bookings[0]);

        setBookings(bookings);
      });
    } catch (error) {
      console.log(error);
      setBookings([]);
    }
  }
}
