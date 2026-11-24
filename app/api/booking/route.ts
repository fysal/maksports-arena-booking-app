/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValue } from "firebase-admin/firestore";

import { NextRequest, NextResponse } from "next/server";

import { adminDb } from "@/app/lib/firebase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { teamId, teamName, date, startTime, endTime, fee, duration, pitch } =
      body;

    const { id: pitchId, pitchName } = pitch;

    if (
      !teamId ||
      !date ||
      !startTime ||
      !endTime ||
      fee == null ||
      !duration ||
      !pitchId
    ) {
      return NextResponse.json(
        {
          error: "Missing required booking information",
        },
        { status: 400 },
      );
    }

    // Only allow valid arena pitches.
    const pitches: Record<string, string> = {
      "mk-thdr": "MAK Thunder",
      "mk-lght": "MAK Lightning",
    };

    if (!pitches[pitchId]) {
      return NextResponse.json(
        {
          error: "Invalid pitch selected.",
        },
        { status: 400 },
      );
    }

    const selectedPitchName = pitches[pitchId];

    // New pitch-specific slot ID.
    const slotId = `${date}_${pitchId}_${startTime.replace(":", "-")}`;

    // Old global slot ID (for backward compatibility).
    const legacySlotId = `${date}_${startTime.replace(":", "-")}`;

    const slotsRef = adminDb.collection("arenaSlots");

    const slotRef = slotsRef.doc(slotId);
    const legacySlotRef = slotsRef.doc(legacySlotId);

    const bookingRef = adminDb.collection("bookings").doc();

    await adminDb.runTransaction(async (transaction) => {
      // Read both documents before making any writes.
      const [slotSnapshot, legacySlotSnapshot] = await Promise.all([
        transaction.get(slotRef),
        transaction.get(legacySlotRef),
      ]);

      // Check the pitch-specific slot.
      if (slotSnapshot.exists) {
        const slot = slotSnapshot.data();

        if (slot?.status === "booked") {
          throw new Error("SLOT_ALREADY_BOOKED");
        }

        if (slot?.status === "pending") {
          throw new Error("SLOT_BEING_BOOKED");
        }

        if (slot?.status === "blocked") {
          throw new Error("SLOT_BLOCKED");
        }
      }

      // Check any existing legacy global slot.
      // Its pitch is unknown, so conservatively block both pitches.
      if (legacySlotSnapshot.exists) {
        const legacySlot = legacySlotSnapshot.data();

        if (legacySlot?.status === "booked") {
          throw new Error("SLOT_ALREADY_BOOKED");
        }

        if (legacySlot?.status === "pending") {
          throw new Error("SLOT_BEING_BOOKED");
        }

        if (legacySlot?.status === "blocked") {
          throw new Error("SLOT_BLOCKED");
        }
      }

      // Reserve the selected pitch's slot.
      transaction.set(slotRef, {
        date,
        startTime,
        endTime,
        pitchId,
        pitchName: selectedPitchName,
        bookingId: bookingRef.id,
        teamId,
        teamName,
        status: "booked",
        slotId: slotRef,
        createdAt: FieldValue.serverTimestamp(),
      });

      // Save the booking with its pitch details.
      transaction.set(bookingRef, {
        ...body,
        teamId,
        teamName,
        date,
        startTime,
        endTime,
        pitch,
        bookingId: bookingRef.id,
        status: "confirmed",
        fee,
        duration,
        createdAt: FieldValue.serverTimestamp(),
      });
    });

    return NextResponse.json(
      {
        success: true,
        bookingId: bookingRef.id,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "SLOT_ALREADY_BOOKED") {
        return NextResponse.json(
          {
            error: "This time slot is not available.",
          },
          { status: 409 },
        );
      }

      if (error.message === "SLOT_BEING_BOOKED") {
        return NextResponse.json(
          {
            error:
              "This slot is being booked by someone ahead of you. Wait a minute then try booking it again.",
          },
          { status: 409 },
        );
      }

      if (error.message === "SLOT_BLOCKED") {
        return NextResponse.json(
          {
            error: "This time slot is unavailable.",
          },
          { status: 409 },
        );
      }
    }

    console.error("Booking creation error:", error);

    return NextResponse.json(
      {
        error: "Unable to create booking.",
      },
      { status: 500 },
    );
  }
}

//Fetch after posting for verication
export async function GET(req: NextRequest) {
  try {
    const ref = req.nextUrl.searchParams.get("id");
    // Validate reference
    if (!ref) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking reference is required",
        },
        { status: 400 },
      );
    }

    const dataRef = adminDb.collection("bookings").doc(ref);
    //check is res exists
    const dataSnap = dataRef.get();

    if (!(await dataSnap).exists) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found",
        },
        { status: 404 },
      );
    }
    const data: any = (await dataSnap).data();

    return NextResponse.json(
      {
        success: true,
        booking: {
          ...data,
        },
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: "Failed to load booking: Server error",
        err,
      },
      { status: 500 },
    );
  }
}
