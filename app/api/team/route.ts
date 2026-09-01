import { adminDb } from "@/app/lib/firebase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      teamName,
      shortName,
      email,
      phoneNumber,
      description,
      id,
      uid,
      number_of_players,
      name,
    } = data;

    const team = adminDb.collection("teams").doc(id);

    const profile = adminDb.collection("profiles").doc(uid);

    await Promise.all([
      team.update({
        teamName,
        shortName,
        description,
        number_of_players: number_of_players ?? "0",
      }),
      profile.update({
        name,
        email,
        phoneNumber,
        status: data?.status ?? "active"
      }),
    ]);

    return NextResponse.json(
      {
        message: "Team information updated successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update team information",
        er: error,
      },
      { status: 500 },
    );
  }
}
