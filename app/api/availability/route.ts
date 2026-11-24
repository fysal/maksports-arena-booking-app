import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/app/lib/firebase/admin";
import { generateTimeSlots } from "@/app/lib/utils/slots";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const date = searchParams.get("date");
    const pitchId = searchParams.get("pitchId");
    const duration = Number(searchParams.get("duration"));

    console.log(date);

    const openingTime =
      searchParams.get("openingTime") ??
      process.env.NEXT_PUBLIC_DEFAULT_OPENING_TIME!;

    const closingTime =
      searchParams.get("closingTime") ??
      process.env.NEXT_PUBLIC_DEFAULT_CLOSING_TIME!;

    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    if (!pitchId || !["mk-thdr", "mk-lght"].includes(pitchId)) {
      return NextResponse.json(
        { error: "A valid pitch ID is required" },
        { status: 400 },
      );
    }

    if (!Number.isFinite(duration) || duration <= 0) {
      return NextResponse.json(
        { error: "A valid duration is required" },
        { status: 400 },
      );
    }

    // Convert both 24-hour and 12-hour times to minutes.
    const timeToMinutes = (time: string): number => {
      const normalized = time.trim().toUpperCase();
      const match = normalized.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/);

      if (!match) {
        throw new Error(`Invalid time format: ${time}`);
      }

      let hours = Number(match[1]);
      const minutes = Number(match[2]);
      const period = match[3];

      if (minutes > 59) {
        throw new Error(`Invalid time: ${time}`);
      }

      if (period) {
        if (hours < 1 || hours > 12) {
          throw new Error(`Invalid time: ${time}`);
        }

        if (period === "AM" && hours === 12) hours = 0;
        if (period === "PM" && hours !== 12) hours += 12;
      } else if (hours > 23) {
        throw new Error(`Invalid time: ${time}`);
      }

      return hours * 60 + minutes;
    };

    // Generate the available slots for the requested duration.
    const slots = generateTimeSlots({
      openingTime,
      closingTime,
      durationMinutes: duration,
    });

    // Fetch reservations for this date.
    const [year, month, day] = date.split("-").map(Number);

    // Uganda is UTC+3.
    const startOfDay = new Date(Date.UTC(year, month - 1, day, -3, 0, 0));

    const endOfDay = new Date(Date.UTC(year, month - 1, day + 1, -3, 0, 0));

    const snapshot = await adminDb
      .collection("arenaSlots")
      .where("date", ">=", startOfDay.toISOString())
      .where("date", "<", endOfDay.toISOString())
      .get();

    if (snapshot.empty) console.log("There are not booked slots");
    // Only reservations belonging to the selected pitch.
    const reservedSlots = snapshot.docs
      .map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          pitchId: data.pitchId as string,
          status: data.status as string,
          startTime: data.startTime as string,
          endTime: data.endTime as string,
        };
      })
      .filter((slot) => {
        const status = String(slot.status).toLowerCase();

        return (
          slot.pitchId === pitchId &&
          ["booked", "pending", "blocked"].includes(status)
        );
      });

    const now = new Date();

    const ugandaTime = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Kampala",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(now);

    const currentDate = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Africa/Kampala",
    }).format(now);

    const currentTimeInMinutes = timeToMinutes(ugandaTime);

    // Only apply the current-time restriction when booking today.
    const isToday = date === currentDate;

    // Determine availability by checking overlapping time ranges.
    const availability = slots.map((slot) => {
      const slotStart = timeToMinutes(slot.startTime);
      const slotEnd = timeToMinutes(slot.endTime);

      const conflictingSlot = reservedSlots.find((reserved) => {
        const reservedStart = timeToMinutes(reserved.startTime);
        const reservedEnd = timeToMinutes(reserved.endTime);

        return slotStart < reservedEnd && slotEnd > reservedStart;
      });

      // A slot is unavailable if it has already started today.
      const hasPassed = isToday && slotStart <= currentTimeInMinutes;

      return {
        ...slot,
        available: !conflictingSlot && !hasPassed,
      };
    });

    return NextResponse.json({
      date,
      pitchId,
      slots: availability,
    });
  } catch (error) {
    console.error("Availability API error:", error);

    return NextResponse.json(
      { error: "Unable to load availability" },
      { status: 500 },
    );
  }
}
