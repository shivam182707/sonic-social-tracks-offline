
import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import Header from '../components/Header';
import { MusicPlayer } from '../components/MusicPlayer';
import { Download, Trash2, Play, Pause } from 'lucide-react';
import { usePlayer } from '../contexts/PlayerContext';
import { useToast } from '@/hooks/use-toast';

// Mock downloaded songs
const downloadedSongs = [
  {
    id: '1',
    title: 'Without Prejudice',
    artist: 'Qatal',
    album: 'Singles',
    coverUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
    audioUrl: 'https://example.com/song1.mp3',
    downloadDate: '2025-05-14',
    fileSize: '8.2 MB',
    duration: 240
  },
  {
    id: '2',
    title: 'Jhol - Acoustic',
    artist: 'Maanu, Anurag Khalid',
    album: 'Jhol EP',
    coverUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
    audioUrl: 'https://example.com/song2.mp3',
    downloadDate: '2025-05-13',
    fileSize: '7.8 MB',
    duration: 198
  },
  {
    id: '4',
    title: 'Kalank - Title Track',
    artist: 'Pritam, Arijit Singh',
    album: 'Kalank',
    coverUrl: '/lovable-uploads/c7ad0efe-80eb-4ada-871f-0dfd17efa491.png',
    audioUrl: 'https://example.com/song4.mp3',
    downloadDate: '2025-05-10',
    fileSize: '9.5 MB',
    duration: 323
  }
];

const Downloads: React.FC = () => {
  const [songs, setSongs] = useState(downloadedSongs);
  const { currentSong, isPlaying, playSong, pause, resume } = usePlayer();
  const { toast } = useToast();
  
  const handleSearch = (query: string) => {
    // Search functionality would be implemented here
    console.log('Searching:', query);
  };
  
  const handleDelete = (songId: string) => {
    setSongs(songs.filter(song => song.id !== songId));
    toast({
      title: 'Song Removed',
      description: 'The song has been removed from your downloads.',
    });
  };
  
  const handlePlay = (song: typeof downloadedSongs[0]) => {
    if (currentSong?.id === song.id && isPlaying) {
      pause();
    } else if (currentSong?.id === song.id && !isPlaying) {
      resume();
    } else {
      playSong({
        id: song.id,
        title: song.title,
        artist: song.artist,
        coverUrl: song.coverUrl,
        audioUrl: song.audioUrl,
        duration: song.duration
      });
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex h-screen bg-spotify-black text-white overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto pb-24">
        <Header onSearch={handleSearch} />
        
        <div className="px-6 py-4">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-br from-purple-600 to-blue-400 p-4 rounded-lg shadow-lg mr-6">
              <Download className="h-16 w-16 text-white" />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold">Downloads</h1>
              <p className="text-spotify-lightgray">
                Listen to your music offline
              </p>
            </div>
          </div>
          
          {songs.length > 0 ? (
            <div className="bg-spotify-darkgray bg-opacity-40 rounded-md overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700 text-spotify-lightgray text-left text-sm">
                    <th className="p-4 w-12">#</th>
                    <th className="p-4">Title</th>
                    <th className="p-4 hidden md:table-cell">Album</th>
                    <th className="p-4 hidden md:table-cell">Date Added</th>
                    <th className="p-4 hidden sm:table-cell">Size</th>
                    <th className="p-4 text-right">Duration</th>
                    <th className="p-4 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {songs.map((song, index) => (
                    <tr 
                      key={song.id} 
                      className="hover:bg-white hover:bg-opacity-10 group transition"
                    >
                      <td className="p-4 w-12">
                        <button 
                          onClick={() => handlePlay(song)}
                          className="text-spotify-lightgray group-hover:text-white"
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
                            <p className="text-spotify-lightgray text-sm">{song.artist}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-spotify-lightgray hidden md:table-cell">
                        {song.album}
                      </td>
                      <td className="p-4 text-spotify-lightgray hidden md:table-cell">
                        {song.downloadDate}
                      </td>
                      <td className="p-4 text-spotify-lightgray hidden sm:table-cell">
                        {song.fileSize}
                      </td>
                      <td className="p-4 text-spotify-lightgray text-right">
                        {formatTime(song.duration)}
                      </td>
                      <td className="p-4 w-10">
                        <button 
                          onClick={() => handleDelete(song.id)}
                          className="text-spotify-lightgray hover:text-white transition"
                          title="Remove from downloads"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <Download className="h-16 w-16 mx-auto text-spotify-lightgray mb-4" />
              <h2 className="text-xl font-bold mb-2">No downloaded songs</h2>
              <p className="text-spotify-lightgray">
                Your downloaded songs will appear here
              </p>
            </div>
          )}
        </div>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Downloads;
