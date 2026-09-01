import { adminDb } from "@/app/lib/firebase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, date, startTime, endTime, status, admin_note } =
      await req.json();

    const bookingRef = adminDb.collection("bookings").doc(id);

    const dataSnap = await bookingRef.get();

    if (!dataSnap.exists)
      return NextResponse.json(
        {
          message: "Booking not found",
        },
        { status: 404 },
      );

    await bookingRef.update({
      date,
      startTime,
      endTime,
      status,
      admin_note,
      updatedAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Booking updated successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to update booking",
        err: JSON.stringify(error),
      },
      { status: 500 },
    );
  }
}
