
import React from 'react';
import { ChevronLeft, ChevronRight, Bell, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useAuth } from '../contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-spotify-dark bg-opacity-95 sticky top-0 z-40 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <div className="flex space-x-2 mr-4">
          <button 
            onClick={() => navigate(-1)}
            className="bg-black bg-opacity-70 rounded-full p-2 text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button 
            onClick={() => navigate(1)}
            className="bg-black bg-opacity-70 rounded-full p-2 text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        
        <SearchBar onSearch={onSearch} className="hidden md:block mr-4 w-80" />
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="hidden sm:flex items-center space-x-1 bg-black bg-opacity-70 hover:bg-opacity-90 transition py-1 px-3 rounded-full">
          <svg viewBox="0 0 16 16" className="h-4 w-4 text-white">
            <path fill="currentColor" d="M11.196 8 6 5v6l5.196-3z"></path>
            <path fill="currentColor" d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z"></path>
          </svg>
          <span className="text-white text-xs font-medium ml-1">Web Player</span>
        </div>
        
        <button className="bg-black bg-opacity-70 rounded-full p-2 text-white">
          <Bell className="h-5 w-5" />
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-black bg-opacity-70 hover:bg-opacity-90 transition rounded-full p-1 flex items-center">
              <div className="bg-spotify-green rounded-full h-6 w-6 flex items-center justify-center mr-1">
                <User className="h-4 w-4 text-black" />
              </div>
              <span className="text-white text-sm font-medium mr-1 hidden sm:inline">
                {currentUser?.username || 'User'}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-spotify-darkgray border-spotify-darkgray text-white">
            <DropdownMenuItem 
              onClick={handleLogout}
              className="cursor-pointer hover:bg-gray-700 flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
