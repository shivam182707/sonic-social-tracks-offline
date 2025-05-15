
import React, { useState, useEffect } from 'react';
import { User, Message } from '../types/music';
import { getMusicService } from '../services/musicService';
import { useAuth } from '../contexts/AuthContext';

const FriendsList: React.FC = () => {
  const { currentUser } = useAuth();
  const [friends, setFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchFriends = async () => {
      if (currentUser) {
        const musicService = getMusicService();
        try {
          const data = await musicService.getFriends(currentUser.id);
          setFriends(data);
        } catch (error) {
          console.error('Error fetching friends:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchFriends();
  }, [currentUser]);
  
  if (loading) {
    return <div className="text-center py-4">Loading friends...</div>;
  }
  
  return (
    <div className="bg-spotify-black bg-opacity-60 rounded-lg p-4">
      <h2 className="text-white font-bold mb-4">Friends</h2>
      <div className="space-y-2">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div 
              key={friend.id}
              className="flex items-center p-2 hover:bg-gray-800 rounded-md transition cursor-pointer"
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
              <div>
                <p className="text-white text-sm font-medium">{friend.username}</p>
                <p className="text-spotify-lightgray text-xs">
                  {friend.isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-spotify-lightgray text-center">No friends yet</p>
        )}
      </div>
    </div>
  );
};

export default FriendsList;
