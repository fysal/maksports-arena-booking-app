import { IFormDataType } from "@/app/dashboard/bookings/widget/EditBooking";
import { BookingType } from "@/app/types/booking";

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
  }: {
    openingTime: string;
    closingTime: string;
    dateString: string;
    duration: number;
  }) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/availability?date=${dateString}&&duration=${duration}&&openingTime=${openingTime}&&closingTime=${closingTime}`,
        {
          headers: {
            "Content-Type": "text/json",
            Accept: "text/json",
          },
        },
      );
      const result = await response.json();

      return result;
    } catch (error) {
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
