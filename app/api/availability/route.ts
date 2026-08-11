import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/app/lib/firebase/admin";
import { generateTimeSlots } from "@/app/lib/utils/slots";

export async function GET(request: NextRequest) {
  try {
    const date = request.nextUrl.searchParams.get("date");

    const duration: number = Number(
      request.nextUrl.searchParams.get("duration"),
    );

    if (!date) {
      return NextResponse.json(
        {
          error: "Date is required",
        },
        { status: 400 },
      );
    }

    const snapshot = await adminDb
      .collection("bookings")
      .where("date", "==", date)
      .where("status", "==", "confirmed")
      .get();

    //if (!snapshot) return NextResponse.json({ error: "There are no bookings" });

    const bookedSlots = snapshot.docs.map((doc) => doc.data().startTime);

    const slots = generateTimeSlots({
      durationMinutes: duration,
    });

    const availability = slots.map((slot) => ({
      ...slot,
      available: !bookedSlots.includes(slot.startTime),
    }));

    return NextResponse.json({
      date,
      slots: availability,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Unable to load availability",
      },
      { status: 500 },
    );
  }
}
