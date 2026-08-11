import { slotBookingType } from "../types";

export default class BookingHandler {
  static async bookSlot(payload: slotBookingType) {
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

      //call payment api

      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async fetchAvailableslots({
    dateString,
    duration,
  }: {
    dateString: string;
    duration: number;
  }) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/availability?date=${dateString}&&duration=${duration}`,
      );
      const result = await response.json();

      return result;
    } catch (error) {
      throw error;
    }
  }
}
