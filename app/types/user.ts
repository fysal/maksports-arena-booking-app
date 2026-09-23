export type UserRole = "team" | "admin" | "customer";

type userStatusType = "active" | "blocked";

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  phoneNumber?: string;
  role?: UserRole;
  teamId?: string;
  createdAt: string;
  isAnonymous?: boolean;
  refreshToken?: string;
  emailVerified?: boolean;
  accountType: UserRole;
  status?: userStatusType;
}

export type currentUserType = {
  uid: string;
  teamName: string;
  name: string;
  phoneNumber: string;
  accountType: UserRole;
  photoUrl: string;
  email: string;
  provider: string;
  role: UserRole;
  teamId?: string;
  createdAt: string;
  isAnonymous: boolean;
  refreshToken?: string;
  emailVerified?: boolean;
  status?: userStatusType;
};
