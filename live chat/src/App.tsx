import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';

interface Message {
  id: number;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hey there! Welcome to our chat app 👋",
      timestamp: new Date(Date.now() - 60000),
      isOwn: false,
    },
  ]);

  const handleSend = (content: string) => {
    const newMessage = {
      id: Date.now(),
      content,
      timestamp: new Date(),
      isOwn: true,
    };
    setMessages([...messages, newMessage]);

    // Simulate reply after 1 second
    setTimeout(() => {
      const replies = [
        "That's interesting! Tell me more.",
        "I see what you mean!",
        "Great point! 🎉",
        "Thanks for sharing that!",
      ];
      const replyMessage = {
        id: Date.now() + 1,
        content: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date(),
        isOwn: false,
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white border-b px-6 py-4 flex items-center gap-3"
        >
          <div className="bg-blue-600 rounded-full p-2">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Chat App</h1>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </motion.div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence>
            {messages.map(message => (
              <ChatMessage
                key={message.id}
                content={message.content}
                timestamp={message.timestamp}
                isOwn={message.isOwn}
                avatar={
                  message.isOwn
                    ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
                    : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
                }
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Chat Input */}
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}

export default App;