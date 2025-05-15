
import React, { createContext, useContext, useState } from 'react';
import { Song } from '../types/music';

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  queue: Song[];
  playSong: (song: Song) => void;
  pause: () => void;
  resume: () => void;
  next: () => void;
  previous: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (songId: string) => void;
  clearQueue: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState<Song[]>([]);
  
  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setCurrentTime(0);
    setDuration(song.duration);
    
    // In a real application, this would interact with an audio element
    console.log(`Playing song: ${song.title} by ${song.artist}`);
  };
  
  const pause = () => {
    setIsPlaying(false);
    console.log('Paused playback');
  };
  
  const resume = () => {
    if (currentSong) {
      setIsPlaying(true);
      console.log(`Resumed playback: ${currentSong.title}`);
    }
  };
  
  const next = () => {
    if (queue.length > 0) {
      const nextSong = queue[0];
      setQueue(queue.slice(1));
      playSong(nextSong);
      console.log(`Playing next song: ${nextSong.title}`);
    } else {
      console.log('No more songs in queue');
    }
  };
  
  const previous = () => {
    console.log('Playing previous song (not implemented)');
  };
  
  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    console.log(`Volume set to: ${newVolume}`);
  };
  
  const seekTo = (time: number) => {
    setCurrentTime(time);
    console.log(`Seeking to: ${time} seconds`);
  };
  
  const addToQueue = (song: Song) => {
    setQueue([...queue, song]);
    console.log(`Added to queue: ${song.title}`);
  };
  
  const removeFromQueue = (songId: string) => {
    setQueue(queue.filter(song => song.id !== songId));
    console.log(`Removed song id ${songId} from queue`);
  };
  
  const clearQueue = () => {
    setQueue([]);
    console.log('Queue cleared');
  };
  
  const value = {
    currentSong,
    isPlaying,
    volume,
    currentTime,
    duration,
    queue,
    playSong,
    pause,
    resume,
    next,
    previous,
    setVolume,
    seekTo,
    addToQueue,
    removeFromQueue,
    clearQueue
  };
  
  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
