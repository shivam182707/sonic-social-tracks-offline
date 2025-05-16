
import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import Header from '../components/Header';
import { MusicPlayer } from '../components/MusicPlayer';
import { Plus, MoreHorizontal, Play, Pause } from 'lucide-react';
import { usePlayer } from '../contexts/PlayerContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

// Mock playlists data
const playlists = [
  {
    id: '1',
    name: 'My Favorites',
    coverUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
    songCount: 12,
    createdBy: 'You',
    songs: [
      {
        id: '101',
        title: 'Without Prejudice',
        artist: 'Qatal',
        coverUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
        duration: 240,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
      },
      {
        id: '102',
        title: 'Jhol - Acoustic',
        artist: 'Maanu, Anurag Khalid',
        coverUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
        duration: 198,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
      }
    ]
  },
  {
    id: '2',
    name: 'Chill Vibes',
    coverUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
    songCount: 8,
    createdBy: 'You',
    songs: [
      {
        id: '201',
        title: 'Lofi Study Beat',
        artist: 'ChillHop',
        coverUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
        duration: 185,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
      }
    ]
  },
  {
    id: '3',
    name: 'Workout Mix',
    coverUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
    songCount: 15,
    createdBy: 'You',
    songs: []
  }
];

const Playlists: React.FC = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0]);
  const { currentSong, isPlaying, playSong, pause, resume } = usePlayer();
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    console.log('Searching:', query);
  };

  const handleCreatePlaylist = () => {
    toast({
      title: "New Playlist Created",
      description: "Your new playlist has been created successfully.",
    });
  };

  const handleSongPlay = (song: any) => {
    if (currentSong?.id === song.id && isPlaying) {
      pause();
    } else if (currentSong?.id === song.id && !isPlaying) {
      resume();
    } else {
      playSong(song);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex h-screen bg-vector-black text-white overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto pb-24">
        <Header onSearch={handleSearch} />
        
        <div className="flex">
          {/* Playlists sidebar */}
          <div className="w-64 p-4 border-r border-gray-800 overflow-y-auto h-[calc(100vh-64px-80px)]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Your Playlists</h2>
              <Button 
                size="sm" 
                onClick={handleCreatePlaylist}
                className="bg-vector-green text-black hover:bg-opacity-90"
              >
                <Plus className="h-4 w-4 mr-1" /> New
              </Button>
            </div>
            
            <div className="space-y-2">
              {playlists.map(playlist => (
                <div 
                  key={playlist.id}
                  onClick={() => setSelectedPlaylist(playlist)}
                  className={`flex items-center p-2 rounded-md cursor-pointer ${
                    selectedPlaylist.id === playlist.id 
                      ? 'bg-gray-800' 
                      : 'hover:bg-gray-900'
                  }`}
                >
                  <img 
                    src={playlist.coverUrl} 
                    alt={playlist.name}
                    className="w-10 h-10 rounded mr-3"
                  />
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium truncate">{playlist.name}</p>
                    <p className="text-xs text-vector-lightgray">{playlist.songCount} songs</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Playlist content */}
          <div className="flex-1 p-6">
            {selectedPlaylist && (
              <>
                <div className="flex items-end mb-8">
                  <img 
                    src={selectedPlaylist.coverUrl}
                    alt={selectedPlaylist.name}
                    className="w-48 h-48 shadow-lg rounded-md"
                  />
                  <div className="ml-6">
                    <p className="uppercase text-xs text-vector-lightgray font-bold">Playlist</p>
                    <h1 className="text-4xl font-bold mt-2 mb-4">{selectedPlaylist.name}</h1>
                    <p className="text-sm text-vector-lightgray">
                      Created by {selectedPlaylist.createdBy} • {selectedPlaylist.songCount} songs
                    </p>
                    
                    <div className="mt-6 flex items-center space-x-4">
                      <Button className="bg-vector-green text-black hover:bg-opacity-90 rounded-full px-8">
                        <Play className="h-5 w-5 mr-2" /> Play
                      </Button>
                      <Button variant="outline" className="border-gray-600 text-white rounded-full">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-b from-gray-900 to-transparent rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800 text-vector-lightgray text-left text-sm">
                        <th className="p-4 w-12">#</th>
                        <th className="p-4">Title</th>
                        <th className="p-4">Artist</th>
                        <th className="p-4 text-right">Duration</th>
                        <th className="p-4 w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPlaylist.songs.length > 0 ? (
                        selectedPlaylist.songs.map((song, index) => (
                          <tr 
                            key={song.id} 
                            className="hover:bg-white hover:bg-opacity-5 group transition"
                            onClick={() => handleSongPlay(song)}
                          >
                            <td className="p-4 w-12">
                              <div className="text-vector-lightgray group-hover:hidden">
                                {index + 1}
                              </div>
                              <button 
                                className="text-vector-lightgray hidden group-hover:block"
                              >
                                {currentSong?.id === song.id && isPlaying ? (
                                  <Pause className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </button>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center">
                                <img 
                                  src={song.coverUrl} 
                                  alt={song.title}
                                  className="w-10 h-10 mr-3"
                                />
                                <div>
                                  <p className="text-white font-medium">{song.title}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-vector-lightgray">
                              {song.artist}
                            </td>
                            <td className="p-4 text-vector-lightgray text-right">
                              {formatTime(song.duration)}
                            </td>
                            <td className="p-4 w-10">
                              <button className="text-vector-lightgray opacity-0 group-hover:opacity-100">
                                <MoreHorizontal className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center py-10 text-vector-lightgray">
                            This playlist is empty. Add some songs to get started.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Playlists;
