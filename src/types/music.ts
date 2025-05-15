
export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  coverUrl: string;
  audioUrl: string;
  duration: number;
  category?: string;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  bio?: string;
  songs?: Song[];
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  songs: Song[];
  releaseYear?: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  friends?: User[];
  playlists?: Playlist[];
  isOnline?: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  userId: string;
  coverUrl?: string;
  songs: Song[];
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: string;
}
