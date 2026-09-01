/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "./client";
import { BookingType } from "@/app/types/booking";
import { Team } from "@/app/types/team";
import { UserProfile } from "@/app/types/user";
import { Settings } from "@/app/types/settings";

export default class AdminHelper {
  static async fetchAllBooking({
    setBookings,
  }: {
    setBookings: React.Dispatch<React.SetStateAction<BookingType[]>>;
  }) {
    try {
      onSnapshot(collection(db, "bookings"), (snapshot: any) => {
        const bookings: BookingType[] = [];

        for (const doc of snapshot.docs) {
          bookings.push(doc.data());
        }
        setBookings(bookings);
      });
    } catch (error) {
      console.log(error);
      setBookings([]);
    }
  }

  static fetchAllTeams({
    setTeams,
  }: {
    setTeams: React.Dispatch<React.SetStateAction<Team[] | null>>;
  }) {
    return onSnapshot(
      collection(db, "teams"),
      (snapshot) => {
        const teams = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Team[];

        setTeams(teams);
      },
      (error) => {
        console.error("Error fetching teams:", error);
        setTeams([]);

        throw error;
      },
    );
  }

  static fetchAllProfiles({
    setProfiles,
  }: {
    setProfiles: React.Dispatch<React.SetStateAction<UserProfile[] | null>>;
  }) {
    return onSnapshot(
      collection(db, "profiles"),
      (snapshot) => {
        const profiles = snapshot.docs.map((doc) =>
          doc.data(),
        ) as UserProfile[];
        setProfiles(profiles);
      },
      (error) => {
        setProfiles([]);
        throw error;
      },
    );
  }

  static fetchSettings(
    setSettings: React.Dispatch<React.SetStateAction<Settings | null>>,
  ) {
    try {
      const ref = doc(db, "settings", "general");
      return onSnapshot(ref, (snapshot) => {
        if (!snapshot.exists()) return setSettings(null);

        const data = snapshot.data() as Settings;

        setSettings(data);
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateSettings(payload: Settings) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/json",
            Accept: "text/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (response.status !== 200) throw data.message;

      return data;
    } catch (error) {
      throw error;
    }
  }
}
