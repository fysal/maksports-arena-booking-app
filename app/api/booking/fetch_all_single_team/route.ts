import { adminDb } from "@/app/lib/firebase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("uid");

    if (!userId)
      return NextResponse.json(
        {
          success: false,
          error: "Poorly formatted parameter",
        },
        { status: 409 },
      );

    const snapshot = await adminDb
      .collection("bookings")
      .where("createdBy", "==", userId)
      .get();

    if (snapshot.empty)
      return NextResponse.json(
        {
          success: true,
          data: [],
          message: "Empty",
        },
        { status: 200 },
      );

    const data = snapshot.docs.map((doc) => doc.data());

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch bookings",
        err,
      },
      { status: 500 },
    );
  }
}
