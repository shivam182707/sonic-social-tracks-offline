
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { MusicPlayer } from '../components/MusicPlayer';
import MusicCard from '../components/MusicCard';
import ArtistCard from '../components/ArtistCard';
import FriendsList from '../components/FriendsList';
import { Song, Artist, Album } from '../types/music';
import { getMusicService } from '../services/musicService';

const Index: React.FC = () => {
  const [trendingSongs, setTrendingSongs] = useState<Song[]>([]);
  const [popularArtists, setPopularArtists] = useState<Artist[]>([]);
  const [popularAlbums, setPopularAlbums] = useState<Album[]>([]);
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const musicService = getMusicService();
      
      try {
        const songs = await musicService.getTrendingSongs();
        setTrendingSongs(songs);
        
        const artists = await musicService.getPopularArtists();
        setPopularArtists(artists);
        
        const albums = await musicService.getPopularAlbums();
        setPopularAlbums(albums);
      } catch (error) {
        console.error('Error fetching music data:', error);
      }
    };
    
    fetchData();
  }, []);
  
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    const musicService = getMusicService();
    
    try {
      const results = await musicService.searchSongs(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching songs:', error);
    }
  };

  return (
    <div className="flex h-screen bg-vector-black text-white overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto pb-24">
        <Header onSearch={handleSearch} />
        
        <div className="px-6 py-4">
          {isSearching ? (
            <div>
              <h2 className="text-2xl font-bold mb-6">Search Results</h2>
              
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {searchResults.map((song) => (
                    <MusicCard key={song.id} song={song} />
                  ))}
                </div>
              ) : (
                <p className="text-vector-lightgray text-center py-10">No results found</p>
              )}
            </div>
          ) : (
            <>
              <section className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Trending songs</h2>
                  <button className="text-vector-lightgray text-sm font-bold hover:underline">
                    Show all
                  </button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {trendingSongs.map((song) => (
                    <MusicCard key={song.id} song={song} />
                  ))}
                </div>
              </section>
              
              <section className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Popular artists</h2>
                  <button className="text-vector-lightgray text-sm font-bold hover:underline">
                    Show all
                  </button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {popularArtists.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                  ))}
                </div>
              </section>
              
              <section className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Popular albums and singles</h2>
                  <button className="text-vector-lightgray text-sm font-bold hover:underline">
                    Show all
                  </button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {trendingSongs.map((song) => (
                    <MusicCard key={song.id} song={song} />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
      
      <aside className="hidden lg:block w-80 border-l border-gray-800 overflow-y-auto p-4">
        <FriendsList />
      </aside>
      
      <MusicPlayer />
    </div>
  );
};

export default Index;
