/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValue } from "firebase-admin/firestore";

import { NextRequest, NextResponse } from "next/server";

import { adminDb } from "@/app/lib/firebase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      teamId,
      teamName,
      date,
      startTime,
      endTime,
      fee,
      duration,
    } = body;

    if (
      !teamId ||
      !date ||
      !startTime ||
      !endTime ||
      !fee ||
      !duration
    ) {
      return NextResponse.json(
        {
          error: "Missing required booking information",
        },
        { status: 400 },
      );
    }

    const slotId = `${date}_${startTime.replace(":", "-")}`;

    const slotRef = adminDb.collection("arenaSlots").doc(slotId);

    const bookingRef = adminDb.collection("bookings").doc();

    await adminDb.runTransaction(async (transaction) => {
      const slotSnapshot = await transaction.get(slotRef);

      if (slotSnapshot.exists) {
        const slot = slotSnapshot.data();

        if (slot?.status === "booked") {
          throw new Error("SLOT_ALREADY_BOOKED");
        }
        if (slot?.status === "pending") throw new Error("SLOT_BEING_BOOKED");

        if (slot?.status === "blocked") {
          throw new Error("SLOT_BLOCKED");
        }
      }

      transaction.set(slotRef, {
        date,
        startTime,
        endTime,
        bookingId: bookingRef.id,
        teamId,
        teamName,
        status: "booked",
        createdAt: FieldValue.serverTimestamp(),
      });

      transaction.set(bookingRef, {
        ...body,
        teamId,
        teamName,
        date,
        startTime,
        endTime,
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
    if (error instanceof Error && error.message === "SLOT_ALREADY_BOOKED") {
      return NextResponse.json(
        {
          error: "This time slot has already been booked.",
        },
        { status: 409 },
      );
    }

    if (error instanceof Error && error.message === "SLOT_BEING_BOOKED") {
      return NextResponse.json(
        {
          error:
            "This slot is being booked by someone ahead of you. Wait a minute then try booking it again.",
        },
        { status: 409 },
      );
    }
    if (error instanceof Error && error.message === "SLOT_BLOCKED") {
      return NextResponse.json(
        {
          error: "This time slot is unavailable.",
        },
        { status: 409 },
      );
    }

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
