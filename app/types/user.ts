export type UserRole = "team" | "admin";

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  teamId?: string;
  createdAt: string;
}
