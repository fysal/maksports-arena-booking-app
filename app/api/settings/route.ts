import { adminDb } from "@/app/lib/firebase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const ref = adminDb.collection("settings").doc("general");

    const snapsht = ref.get();

    if (!(await snapsht).exists) {
      await adminDb
        .collection("settings")
        .doc("general")
        .set({
          ...body,
        });

      return NextResponse.json(
        {
          message: "Settings setup successfully",
        },
        { status: 200 },
      );
    }

    await ref.update(
      {
        ...body,
      },
      { merge: true },
    );

    return NextResponse.json(
      {
        message: "Settings updated successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch settings",
        error,
      },

      { status: 500 },
    );
  }
}
