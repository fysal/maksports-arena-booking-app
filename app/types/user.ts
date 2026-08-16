export type UserRole = "team" | "admin" | "customer";

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  teamId?: string;
  createdAt: string;
  isAnonymous: boolean;
  refreshToken?: string;
  emailVerified?: boolean;
  accountType: UserRole;
}

export type currentUserType = {
  uid: string;
  teamName: string;
  name: string;
  phoneNumber: string;
  accountType: UserRole;
  photoUrl: string;
  email: string;
  role: UserRole;
  teamId?: string;
  createdAt: string;
  isAnonymous: boolean;
  refreshToken?: string;
  emailVerified?: boolean;
};
