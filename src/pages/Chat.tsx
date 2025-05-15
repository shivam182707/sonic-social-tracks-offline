
import React, { useState, useEffect } from 'react';
import { User } from '../types/music';
import { getMusicService } from '../services/musicService';
import { useAuth } from '../contexts/AuthContext';
import { Sidebar } from '../components/Sidebar';
import Header from '../components/Header';
import ChatBox from '../components/ChatBox';
import { MusicPlayer } from '../components/MusicPlayer';

const Chat: React.FC = () => {
  const { currentUser } = useAuth();
  const [friends, setFriends] = useState<User[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchFriends = async () => {
      if (currentUser) {
        const musicService = getMusicService();
        try {
          const data = await musicService.getFriends(currentUser.id);
          setFriends(data);
          if (data.length > 0) {
            setSelectedFriend(data[0]);
          }
        } catch (error) {
          console.error('Error fetching friends:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchFriends();
  }, [currentUser]);
  
  const handleSearch = (query: string) => {
    // Handle search
    console.log('Searching:', query);
  };

  return (
    <div className="flex h-screen bg-spotify-black text-white overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header onSearch={handleSearch} />
        
        <div className="flex-1 flex overflow-hidden">
          {/* Friends sidebar */}
          <div className="w-64 border-r border-gray-800 overflow-y-auto">
            <div className="p-4">
              <h2 className="text-lg font-bold mb-4">Messages</h2>
              
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                <div className="space-y-1">
                  {friends.length > 0 ? (
                    friends.map((friend) => (
                      <button
                        key={friend.id}
                        className={`w-full flex items-center p-2 rounded-md transition ${
                          selectedFriend?.id === friend.id 
                            ? 'bg-gray-800'
                            : 'hover:bg-gray-800'
                        }`}
                        onClick={() => setSelectedFriend(friend)}
                      >
                        <div className="relative">
                          <img
                            src={friend.avatarUrl || 'https://i.pravatar.cc/150'}
                            alt={friend.username}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          {friend.isOnline && (
                            <div className="absolute bottom-0 right-2 w-3 h-3 bg-spotify-green rounded-full border-2 border-spotify-black"></div>
                          )}
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium">{friend.username}</p>
                          <p className="text-xs text-spotify-lightgray truncate">
                            {friend.isOnline ? 'Online' : 'Offline'}
                          </p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <p className="text-spotify-lightgray text-center">No friends found</p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Chat area */}
          <div className="flex-1 flex flex-col">
            {selectedFriend ? (
              <>
                <div className="p-4 border-b border-gray-800 flex items-center">
                  <img
                    src={selectedFriend.avatarUrl || 'https://i.pravatar.cc/150'}
                    alt={selectedFriend.username}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">{selectedFriend.username}</p>
                    <p className="text-xs text-spotify-lightgray">
                      {selectedFriend.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                
                <ChatBox recipientId={selectedFriend.id} />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-spotify-lightgray">
                <div className="text-center">
                  <p>Select a friend to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <MusicPlayer />
    </div>
  );
};

export default Chat;
