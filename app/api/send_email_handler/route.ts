import { adminDb } from "@/app/lib/firebase/admin";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const options = await req.json();

  try {
    // const ref = adminDb.collection("settings").doc("general");

    // const snapshot = ref.get();

    // if (!(await snapshot).exists) return;
    console.log("We are on the server");

    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_BREVO_SMTP_SERVER,
      port: process.env.NEXT_PUBLIC_BREVO_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.NEXT_PUBLIC_BREVO_USERNAME,
        pass: process.env.NEXT_PUBLIC_BREVO_PASSWORD,
      },
    });

    const response = await transporter.sendMail({
      ...options,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
