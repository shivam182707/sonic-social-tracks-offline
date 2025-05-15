
import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { Message, User } from '../types/music';
import { getMusicService } from '../services/musicService';
import { useAuth } from '../contexts/AuthContext';

interface ChatBoxProps {
  recipientId: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ recipientId }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(scrollToBottom, [messages]);
  
  useEffect(() => {
    const fetchMessages = async () => {
      if (currentUser) {
        const musicService = getMusicService();
        try {
          const data = await musicService.getMessages(currentUser.id);
          // Filter messages between current user and recipient
          const relevantMessages = data.filter(
            msg => (msg.senderId === currentUser.id && msg.receiverId === recipientId) ||
                  (msg.senderId === recipientId && msg.receiverId === currentUser.id)
          );
          setMessages(relevantMessages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchMessages();
    
    // In a real app, we would set up a websocket or polling here
  }, [currentUser, recipientId]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !currentUser) return;
    
    const musicService = getMusicService();
    try {
      const sentMessage = await musicService.sendMessage({
        senderId: currentUser.id,
        senderName: currentUser.username,
        receiverId: recipientId,
        content: newMessage
      });
      
      setMessages([...messages, sentMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  if (loading) {
    return <div className="text-center py-4">Loading messages...</div>;
  }
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length > 0 ? (
          <>
            {messages.map((message) => {
              const isSentByMe = message.senderId === currentUser?.id;
              
              return (
                <div 
                  key={message.id}
                  className={`mb-3 flex ${isSentByMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    isSentByMe ? 'bg-spotify-green text-black' : 'bg-gray-700 text-white'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="text-center text-spotify-lightgray my-6">
            <p>No messages yet</p>
            <p className="text-xs mt-1">Send a message to start the conversation</p>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSendMessage} className="border-t border-gray-800 p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 text-white rounded-l-full py-2 px-4 focus:outline-none"
          />
          <button 
            type="submit"
            className="bg-spotify-green text-black p-2 rounded-r-full hover:bg-opacity-90 transition"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
