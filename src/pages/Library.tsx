
import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import Header from '../components/Header';
import { MusicPlayer } from '../components/MusicPlayer';
import MusicCard from '../components/MusicCard';
import { Song } from '../types/music';
import { getMusicService } from '../services/musicService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

const Library: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLibrary = async () => {
      setIsLoading(true);
      try {
        const musicService = getMusicService();
        const allSongs = await musicService.getAllSongs();
        setSongs(allSongs);
      } catch (error) {
        console.error("Error fetching library:", error);
        toast({
          title: "Failed to load library",
          description: "There was an error loading your library. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLibrary();
  }, []);

  const handleSearch = (query: string) => {
    // Would implement search within library
    console.log("Searching library for:", query);
  };

  return (
    <div className="flex h-screen bg-vector-black text-white overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto pb-24">
        <Header onSearch={handleSearch} />
        
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold mb-6">Your Library</h1>
          
          <Tabs defaultValue="songs" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="songs">Songs</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
              <TabsTrigger value="albums">Albums</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
            </TabsList>
            
            <TabsContent value="songs">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <p>Loading your library...</p>
                </div>
              ) : songs.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {songs.map((song) => (
                    <MusicCard key={song.id} song={song} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <h3 className="text-xl font-medium mb-2">Your library is empty</h3>
                  <p className="text-vector-lightgray">
                    Start adding songs to your library by exploring our catalog
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="artists">
              <div className="text-center py-20">
                <p>Artist view coming soon</p>
              </div>
            </TabsContent>
            
            <TabsContent value="albums">
              <div className="text-center py-20">
                <p>Albums view coming soon</p>
              </div>
            </TabsContent>
            
            <TabsContent value="playlists">
              <div className="text-center py-20">
                <p>Playlist view coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Library;
