
export type UserStatus = 'active' | 'offline' | 'busy' | 'away';

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  password?: string;
  role: string;
  memberSince: string;
  status: UserStatus;
}

export interface WorkSession {
  id: string;
  date: string;
  startTime: number;
  endTime?: number;
  duration: number; // in milliseconds
}

// Updated ChatMessage to include optional role for Gemini integration compatibility
export interface ChatMessage {
  id?: string;
  senderId?: string;
  role?: 'user' | 'model';
  text: string;
  timestamp?: number;
}

export interface ProjectFile {
  id: string;
  name: string;
  type: 'code' | 'image' | 'pdf' | 'folder';
  content?: string;
  parentId: string | null;
  uploadedBy: string;
  comments: { user: string, text: string, date: string }[];
}

// Added TeamMember interface required by constants.tsx
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
}

// Added Project interface required by constants.tsx
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}
