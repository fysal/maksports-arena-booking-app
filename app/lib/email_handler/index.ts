import { BookingType } from "@/app/types/booking";
import admin_email_template from "./templates/admin_template";
import team_email_template from "./templates/team_template";

export default class EmailHandler {
  static async notify_admin({ payload }: { payload: BookingType }) {
    try {
      const { email } = payload.preference;
      //Email code goes here

      const options = {
        to: `${email}`,
        subject: "Field Booking made",
        from: `"Mak Sports Arena" < ${process.env.NEXT_PUBLIC_ADMIN_SENDER}>`,
        text: "A booking has been submitted ",
        html: admin_email_template(payload),
      };
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/send_email_handler`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(options),
        },
      );
      console.log("Email has been sent");
    } catch (error) {
      //Error code goes here
      console.log(error);
    }
  }

  static async notify_team({ booking }: { booking: BookingType }) {
    try {
      //Code goes here
      if (!booking.contactInformation.email) return;

      const options = {
        to: `${booking.contactInformation.email}`,
        from: `"Mak Sports Arena" < ${process.env.NEXT_PUBLIC_ADMIN_SENDER}>`,
        subject: "Booking Confirmation",
        text: "Your booking was successful",
        html: team_email_template(booking),
      };

      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/send_email_handler`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(options),
        },
      );
      console.log("Email sent to client");
    } catch (error) {
      console.log(error);
    }
  }
}
