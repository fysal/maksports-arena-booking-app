/* eslint-disable @typescript-eslint/no-explicit-any */
export type TeamStatus = "active" | "inactive" | "suspended";

export interface Team {
  id: string;
  teamName: string;
  uid: string;
  createdAt: string;
  shortName?: string;
  description?: string;
  number_of_players?: number | string | null;
  status?: TeamStatus | any;
}
