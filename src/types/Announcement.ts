import type { User } from "./User";

export interface Announcement {
  _id: string;
  title: string;
  content: string;
  youtubeUrl?: string;
  published: boolean;
  featured: boolean;
  createdBy?: User;
  createdAt: string;
  updatedAt: string;
}
