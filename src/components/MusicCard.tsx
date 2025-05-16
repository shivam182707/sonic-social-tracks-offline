
import React from 'react';
import { Play, Download } from 'lucide-react';
import { Song } from '../types/music';
import { usePlayer } from '../contexts/PlayerContext';
import { useToast } from '@/hooks/use-toast';

interface MusicCardProps {
  song: Song;
}

const MusicCard: React.FC<MusicCardProps> = ({ song }) => {
  const { playSong, currentSong, isPlaying, pause } = usePlayer();
  const { toast } = useToast();
  
  const handlePlayClick = () => {
    if (currentSong?.id === song.id && isPlaying) {
      pause();
    } else {
      playSong(song);
    }
  };
  
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Create a temporary link to trigger download
    const a = document.createElement('a');
    
    // In real app, would use song.audioUrl
    // Using SoundHelix samples for demo
    const sampleUrls = [
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    ];
    const songIdNumber = parseInt(song.id) || 0;
    a.href = sampleUrls[songIdNumber % sampleUrls.length];
    
    a.download = `${song.title} - ${song.artist}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: 'Download Started',
      description: `Downloading ${song.title}`,
    });
  };

  const isCurrentlyPlaying = currentSong?.id === song.id && isPlaying;

  return (
    <div className="music-card group cursor-pointer" onClick={handlePlayClick}>
      <div className="relative">
        <img src={song.coverUrl} alt={song.title} />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <button 
            className="bg-vector-green text-black rounded-full p-3 hover:scale-105 transition shadow-lg"
            onClick={handlePlayClick}
          >
            <Play className={`h-6 w-6 fill-current ${isCurrentlyPlaying ? 'animate-pulse' : ''}`} />
          </button>
        </div>
        <button
          className="absolute bottom-2 right-2 bg-vector-darkgray bg-opacity-70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-90"
          onClick={handleDownload}
          title="Download"
        >
          <Download className="h-4 w-4" />
        </button>
        
        {isCurrentlyPlaying && (
          <div className="absolute top-2 right-2 bg-vector-green text-black text-xs font-bold px-2 py-1 rounded-full">
            Playing
          </div>
        )}
      </div>
      <div className="music-card-info">
        <h3 className="music-card-title">{song.title}</h3>
        <p className="music-card-artist">{song.artist}</p>
      </div>
    </div>
  );
};

export default MusicCard;
