
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex items-center bg-white bg-opacity-10 rounded-full overflow-hidden">
        <button 
          type="submit"
          className="p-2 text-gray-400 hover:text-white transition"
        >
          <Search className="h-5 w-5" />
        </button>
        <input
          type="text"
          placeholder="What do you want to play?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-400 py-2 pr-4 w-full"
        />
      </div>
    </form>
  );
};

export default SearchBar;
