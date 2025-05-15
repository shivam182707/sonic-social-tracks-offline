
import { Song, Artist, Album, Playlist, User, Message } from '../types/music';

// Mock song data
const songs: Song[] = [
  {
    id: '1',
    title: 'Without Prejudice',
    artist: 'Qatal',
    coverUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
    audioUrl: 'https://example.com/song1.mp3',
    duration: 240,
    category: 'Trending'
  },
  {
    id: '2',
    title: 'Jhol - Acoustic',
    artist: 'Maanu, Anurag Khalid',
    coverUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
    audioUrl: 'https://example.com/song2.mp3',
    duration: 198,
    category: 'Trending'
  },
  {
    id: '3',
    title: 'Shree Hanuman Chalisa',
    artist: 'Hariharan',
    coverUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
    audioUrl: 'https://example.com/song3.mp3',
    duration: 294,
    category: 'Trending'
  },
  {
    id: '4',
    title: 'Kalank - Title Track',
    artist: 'Pritam, Arijit Singh',
    coverUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
    audioUrl: 'https://example.com/song4.mp3',
    duration: 323,
    category: 'Trending'
  },
  {
    id: '5',
    title: 'Minnalvala (From "Narivetta")',
    artist: 'Jaakes Bejoy, Sid Sriram',
    coverUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
    audioUrl: 'https://example.com/song5.mp3',
    duration: 275,
    category: 'Trending'
  },
  {
    id: '6',
    title: 'Pretty Little Baby - Stereo Mix',
    artist: 'Connie Francis',
    coverUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
    audioUrl: 'https://example.com/song6.mp3',
    duration: 183,
    category: 'Trending'
  },
];

// Mock artist data
const artists: Artist[] = [
  {
    id: '1',
    name: 'Pritam',
    imageUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
    bio: 'Famous Indian composer and music director'
  },
  {
    id: '2',
    name: 'Arijit Singh',
    imageUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
    bio: 'Popular Indian playback singer'
  },
  {
    id: '3',
    name: 'A.R. Rahman',
    imageUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
    bio: 'Oscar-winning Indian composer'
  },
  {
    id: '4',
    name: 'Sachin-Jigar',
    imageUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
    bio: 'Indian musical duo'
  },
  {
    id: '5',
    name: 'Vishal-Shekhar',
    imageUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
    bio: 'Indian musical duo'
  },
  {
    id: '6',
    name: 'Atif Aslam',
    imageUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
    bio: 'Popular Pakistani singer'
  }
];

// Mock albums
const albums: Album[] = [
  {
    id: '1',
    title: 'Qatal',
    artist: 'Guru Randhawa',
    coverUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
    songs: [songs[0]],
    releaseYear: 2023
  },
  {
    id: '2',
    title: 'Jhol',
    artist: 'Maanu',
    coverUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
    songs: [songs[1]],
    releaseYear: 2022
  }
];

// Mock users
const users: User[] = [
  {
    id: '1',
    username: 'musicLover',
    email: 'user@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    isOnline: true
  },
  {
    id: '2',
    username: 'rockStar',
    email: 'rock@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
    isOnline: true
  },
  {
    id: '3',
    username: 'classicalFan',
    email: 'classical@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    isOnline: false
  }
];

// Mock playlists
const playlists: Playlist[] = [
  {
    id: '1',
    name: 'My Favorites',
    userId: '1',
    coverUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
    songs: [songs[0], songs[2], songs[4]],
    createdAt: new Date().toISOString()
  }
];

// Mock messages
const messages: Message[] = [
  {
    id: '1',
    senderId: '2',
    senderName: 'rockStar',
    receiverId: '1',
    content: 'Hey! Have you checked out the new Pritam album?',
    timestamp: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: '2',
    senderId: '1',
    senderName: 'musicLover',
    receiverId: '2',
    content: 'Not yet, is it good?',
    timestamp: new Date(Date.now() - 3500000).toISOString()
  },
  {
    id: '3',
    senderId: '2',
    senderName: 'rockStar',
    receiverId: '1',
    content: 'It\'s amazing! I\'ll send you a link',
    timestamp: new Date(Date.now() - 3400000).toISOString()
  }
];

// Music service functions
export const getMusicService = () => {
  return {
    // Songs related functions
    getTrendingSongs: async (): Promise<Song[]> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(songs.filter(song => song.category === 'Trending')), 300);
      });
    },
    
    getAllSongs: async (): Promise<Song[]> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve([...songs]), 300);
      });
    },
    
    getSongById: async (id: string): Promise<Song | undefined> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(songs.find(song => song.id === id)), 300);
      });
    },
    
    searchSongs: async (query: string): Promise<Song[]> => {
      const lowerQuery = query.toLowerCase();
      return new Promise((resolve) => {
        const results = songs.filter(song => 
          song.title.toLowerCase().includes(lowerQuery) || 
          song.artist.toLowerCase().includes(lowerQuery)
        );
        setTimeout(() => resolve(results), 300);
      });
    },
    
    // Artists related functions
    getPopularArtists: async (): Promise<Artist[]> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve([...artists]), 300);
      });
    },
    
    getArtistById: async (id: string): Promise<Artist | undefined> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(artists.find(artist => artist.id === id)), 300);
      });
    },
    
    // Albums related functions
    getPopularAlbums: async (): Promise<Album[]> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve([...albums]), 300);
      });
    },
    
    // Users and social functions
    getFriends: async (userId: string): Promise<User[]> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(users.filter(user => user.id !== userId)), 300);
      });
    },
    
    getMessages: async (userId: string): Promise<Message[]> => {
      return new Promise((resolve) => {
        const userMessages = messages.filter(
          msg => msg.senderId === userId || msg.receiverId === userId
        );
        setTimeout(() => resolve(userMessages), 300);
      });
    },
    
    sendMessage: async (message: Omit<Message, 'id' | 'timestamp'>): Promise<Message> => {
      const newMessage: Message = {
        ...message,
        id: `msg_${Date.now()}`,
        timestamp: new Date().toISOString()
      };
      
      messages.push(newMessage);
      return new Promise((resolve) => {
        setTimeout(() => resolve(newMessage), 300);
      });
    },
    
    // Playlists functions
    getUserPlaylists: async (userId: string): Promise<Playlist[]> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(playlists.filter(playlist => playlist.userId === userId)), 300);
      });
    },
    
    createPlaylist: async (playlist: Omit<Playlist, 'id'>): Promise<Playlist> => {
      const newPlaylist: Playlist = {
        ...playlist,
        id: `playlist_${Date.now()}`
      };
      
      playlists.push(newPlaylist);
      return new Promise((resolve) => {
        setTimeout(() => resolve(newPlaylist), 300);
      });
    }
  };
};
