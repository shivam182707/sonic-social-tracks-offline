
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Download } from 'lucide-react';
import { usePlayer } from '../contexts/PlayerContext';
import { cn } from '../lib/utils';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const MusicPlayer: React.FC = () => {
  const { toast } = useToast();
  
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    pause,
    resume,
    next,
    previous,
    setVolume,
    seekTo
  } = usePlayer();

  const handleDownload = () => {
    if (currentSong) {
      // In a real app, this would trigger a download
      toast({
        title: 'Download Started',
        description: `Downloading ${currentSong.title}`,
      });
    }
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-spotify-darkgray border-t border-gray-700 p-3 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Song info */}
        <div className="flex items-center w-1/4">
          <img 
            src={currentSong.coverUrl} 
            alt={currentSong.title}
            className="h-14 w-14 rounded shadow-md mr-3"
          />
          <div className="truncate">
            <p className="text-white text-sm font-medium truncate">{currentSong.title}</p>
            <p className="text-spotify-lightgray text-xs truncate">{currentSong.artist}</p>
          </div>
        </div>

        {/* Player controls */}
        <div className="flex flex-col items-center w-1/2">
          <div className="flex items-center space-x-4 mb-1">
            <button 
              className="text-spotify-lightgray hover:text-white transition"
              onClick={previous}
            >
              <SkipBack className="h-5 w-5" />
            </button>
            <button 
              className="bg-white text-black rounded-full p-1.5 hover:scale-105 transition"
              onClick={isPlaying ? pause : resume}
            >
              {isPlaying ? 
                <Pause className="h-5 w-5" /> : 
                <Play className="h-5 w-5" />
              }
            </button>
            <button 
              className="text-spotify-lightgray hover:text-white transition"
              onClick={next}
            >
              <SkipForward className="h-5 w-5" />
            </button>
          </div>
          
          <div className="w-full flex items-center space-x-3">
            <span className="text-spotify-lightgray text-xs min-w-[40px] text-right">
              {formatTime(currentTime)}
            </span>
            <Slider 
              defaultValue={[0]} 
              max={duration} 
              value={[currentTime]} 
              onValueChange={(values) => seekTo(values[0])}
              className="flex-1"
            />
            <span className="text-spotify-lightgray text-xs min-w-[40px]">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume & extras */}
        <div className="flex items-center justify-end w-1/4 space-x-4">
          <button 
            className="text-spotify-lightgray hover:text-white transition p-1"
            onClick={handleDownload}
            title="Download"
          >
            <Download className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            <Volume2 className="text-spotify-lightgray h-4 w-4" />
            <Slider 
              defaultValue={[100]} 
              max={100} 
              value={[volume * 100]} 
              onValueChange={(values) => setVolume(values[0] / 100)}
              className="w-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
