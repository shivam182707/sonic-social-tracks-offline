
import React, { useState, useEffect } from 'react';
import { getMusicService } from '../services/musicService';
import { Song } from '../types/music';
import { Sidebar } from '../components/Sidebar';
import Header from '../components/Header';
import { MusicPlayer } from '../components/MusicPlayer';
import MusicCard from '../components/MusicCard';
import { SearchIcon } from 'lucide-react';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);
  
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    
    setIsSearching(true);
    
    try {
      const musicService = getMusicService();
      const results = await musicService.searchSongs(query);
      setSearchResults(results);
      
      // Save to recent searches
      if (query.trim() && !recentSearches.includes(query)) {
        const updatedSearches = [query, ...recentSearches].slice(0, 5);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      }
    } catch (error) {
      console.error('Error searching songs:', error);
    }
  };
  
  const handleRecentSearchClick = (search: string) => {
    handleSearch(search);
  };
  
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className="flex h-screen bg-spotify-black text-white overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto pb-24">
        <Header onSearch={handleSearch} />
        
        <div className="px-6 py-4">
          {/* When not searching */}
          {!isSearching && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Search</h1>
              
              {recentSearches.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Recent searches</h2>
                    <button 
                      onClick={clearRecentSearches}
                      className="text-sm text-spotify-lightgray hover:underline"
                    >
                      Clear all
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearchClick(search)}
                        className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full transition"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-8 text-center">
                <SearchIcon className="h-16 w-16 mx-auto text-spotify-lightgray mb-4" />
                <p className="text-xl">Search for songs, artists, or albums</p>
                <p className="text-spotify-lightgray mt-2">Find your favorite music</p>
              </div>
            </div>
          )}
          
          {/* Search results */}
          {isSearching && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Search results for "{searchQuery}"
              </h2>
              
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {searchResults.map((song) => (
                    <MusicCard key={song.id} song={song} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-xl">No results found for "{searchQuery}"</p>
                  <p className="text-spotify-lightgray mt-2">
                    Please try a different search term
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Search;
