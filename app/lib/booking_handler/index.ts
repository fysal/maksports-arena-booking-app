import { IFormDataType } from "@/app/dashboard/bookings/widget/EditBooking";
import { BookingType } from "@/app/types/booking";
import EmailHandler from "../email_handler";

export default class BookingHandler {
  static async bookSlot(payload: BookingType) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/booking`,
        {
          method: "POST",
          headers: {
            "Accept-Content": "text/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();

      //call payment api before returning results

      //Send emails
      // console.log(payload);

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async fetchAvailableslots({
    openingTime,
    closingTime,
    dateString,
    duration,
    pitchId,
  }: {
    openingTime: string;
    closingTime: string;
    dateString: string;
    duration: number;
    pitchId: string;
  }) {
    try {
      const params = new URLSearchParams({
        date: dateString,
        duration: duration.toString(),
        openingTime,
        closingTime,
        pitchId,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/availability?${params.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch available slots");
      }

      const result = await response.json();

      return result;
    } catch (error) {
      console.error("Availability request failed:", error);
      throw error;
    }
  }

  static async updateBooking(payload: IFormDataType, id: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/booking/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/json",
            Accept: "text/json",
          },
          body: JSON.stringify({ ...payload, id }),
        },
      );

      const data = await response.json();

      if (response.status !== 200) throw data.message;

      return data;
    } catch (error) {
      throw error;
    }
  }
}
