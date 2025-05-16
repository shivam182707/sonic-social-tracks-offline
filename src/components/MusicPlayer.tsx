
import React, { useRef, useEffect, useState } from 'react';
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
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
    seekTo,
    updateDuration,
    updateCurrentTime
  } = usePlayer();

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      
      // Setup event listeners
      audio.addEventListener('timeupdate', () => {
        updateCurrentTime(audio.currentTime);
      });
      
      audio.addEventListener('loadedmetadata', () => {
        updateDuration(audio.duration);
        setIsLoading(false);
      });
      
      audio.addEventListener('ended', () => {
        next();
      });
      
      audio.addEventListener('error', (e) => {
        console.error("Error playing audio:", e);
        setError("Could not play this track. Please try another song.");
        setIsLoading(false);
        toast({
          title: "Playback Error",
          description: "Could not play this track. Please try another song.",
          variant: "destructive"
        });
      });
      
      audioRef.current = audio;
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);
  
  // Handle song changes
  useEffect(() => {
    if (!audioRef.current || !currentSong?.audioUrl) return;
    
    setIsLoading(true);
    setError(null);
    
    // Use appropriate audio URLs - For now we'll use some free sample MP3s
    // In a real app, you would use the actual song.audioUrl
    const getWorkingAudioUrl = () => {
      // For demo, let's use SoundHelix samples based on song ID to always get working audio
      const sampleUrls = [
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
      ];
      
      // Use song ID to pick a sample, or default to first sample
      const songIdNumber = parseInt(currentSong.id) || 0;
      return sampleUrls[songIdNumber % sampleUrls.length];
    };
    
    const audioUrl = getWorkingAudioUrl();
    audioRef.current.src = audioUrl;
    audioRef.current.volume = volume;
    setAudioSrc(audioUrl);
    
    if (isPlaying) {
      audioRef.current.play()
        .catch(err => {
          console.error("Error playing audio:", err);
          setError("Playback error occurred");
          setIsLoading(false);
          pause();
        });
    }
  }, [currentSong]);
  
  // Handle play/pause changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play()
        .catch(err => {
          console.error("Error playing audio:", err);
          pause();
        });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  // Handle seek position
  useEffect(() => {
    if (audioRef.current && !isNaN(currentTime) && Math.abs(audioRef.current.currentTime - currentTime) > 1) {
      audioRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  const handleDownload = () => {
    if (currentSong) {
      // Create an anchor element and trigger download
      const a = document.createElement('a');
      a.href = audioSrc;
      a.download = `${currentSong.title} - ${currentSong.artist}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast({
        title: 'Download Started',
        description: `Downloading ${currentSong.title}`,
      });
    }
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-vector-darkgray border-t border-gray-700 p-3 z-50">
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
            <p className="text-vector-lightgray text-xs truncate">{currentSong.artist}</p>
          </div>
        </div>

        {/* Player controls */}
        <div className="flex flex-col items-center w-1/2">
          <div className="flex items-center space-x-4 mb-1">
            <button 
              className="text-vector-lightgray hover:text-white transition"
              onClick={previous}
            >
              <SkipBack className="h-5 w-5" />
            </button>
            <button 
              className={cn(
                "bg-white text-black rounded-full p-1.5 hover:scale-105 transition",
                isLoading && "opacity-50"
              )}
              onClick={isPlaying ? pause : resume}
              disabled={isLoading}
            >
              {isPlaying ? 
                <Pause className="h-5 w-5" /> : 
                <Play className="h-5 w-5" />
              }
            </button>
            <button 
              className="text-vector-lightgray hover:text-white transition"
              onClick={next}
            >
              <SkipForward className="h-5 w-5" />
            </button>
          </div>
          
          <div className="w-full flex items-center space-x-3">
            <span className="text-vector-lightgray text-xs min-w-[40px] text-right">
              {formatTime(currentTime)}
            </span>
            <Slider 
              defaultValue={[0]} 
              max={duration || 100} 
              value={[currentTime]} 
              onValueChange={(values) => seekTo(values[0])}
              className="flex-1"
            />
            <span className="text-vector-lightgray text-xs min-w-[40px]">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume & extras */}
        <div className="flex items-center justify-end w-1/4 space-x-4">
          <button 
            className="text-vector-lightgray hover:text-white transition p-1"
            onClick={handleDownload}
            title="Download"
          >
            <Download className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            <Volume2 className="text-vector-lightgray h-4 w-4" />
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
