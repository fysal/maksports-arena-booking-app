/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./client";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import crypto from "crypto";
import { toast } from "react-toastify";
import { generateRandomIds } from "../utils/utils";

type registerTeamInfo = {
  teamName: string;
  contactPerson: string;
  phoneNumber: string;
  email: string;
  password: string;
};
export async function registerTeam(formData: registerTeamInfo) {
  try {
    const { email, password } = formData;
    //Check if the team name is available. throw error is team exists

    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const user = userCredentials.user;

    await Promise.all([
      createTeamProfile(formData, user.uid),
      createProfile(user.uid, formData),
    ]);

    toast.success("Team registered successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to register team");
  }
}

export async function loginUser(email: string, password: string) {
  try {
    if (!email || !password) return;
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Welcome back!");
  } catch (error) {
    console.log(error);

    toast.error("Failed to sign in");
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
    toast.success("You've logged out");
  } catch (error) {
    console.log(error);
    toast.error("Failed to logout");
  }
}

export async function createTeamProfile(data: registerTeamInfo, uid: string) {
  try {
    const { teamName } = data;
    const id = generateRandomIds(); 
    await setDoc(doc(db, "teams", id), {
      teamName,
      id,
      uid,
      createdAt: Date.now(),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function createProfile(uid: string, formData: registerTeamInfo) {
  const { contactPerson: name, email, phoneNumber } = formData;
  try {
    setDoc(doc(db, "profiles", uid), {
      uid,
      name,
      email,
      phoneNumber,
      accountType: "customer",
      createdAt: Date.now(),
    });
  } catch (error) {
    console.log(error);
  }
}

export async function loadUserProfile(uid: string) {
  try {
    const result = await new Promise((resolve) => {
      onSnapshot(doc(db, "profiles", uid), (doc) => {
        resolve(doc.data());
      });
    });

    return result;
  } catch (error) {
    throw error;
  }
}

export async function checkCurrentUserExists(
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>,
) {
  try {
    onAuthStateChanged(auth, async (usr) => {
      if (!usr) setCurrentUser(null);
      else {
        const profile: any = await loadUserProfile(usr.uid);
        setCurrentUser({
          provider: usr.providerId,
          photoUrl: usr.photoURL,
          ...profile,
        });
      }
    });
  } catch (error) {
    throw error;
  }
}

export async function loadTeamInformaition(uid: string) {
  try {
    const teamsQuery = query(
      collection(db, "teams"),
      where("uid", "==", uid),
    );
    const querySnapshot = await getDocs(teamsQuery);

    if (querySnapshot.empty) return null;
    return querySnapshot.docs[0].data();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
