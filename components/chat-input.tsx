'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { messageInterface } from '@/app/page';
type Props = {
  messages: messageInterface[];
  setMessages: React.Dispatch<React.SetStateAction<messageInterface[]>>;
};

const ChatInput: React.FC<Props> = ({ messages, setMessages }) => {
  const [message, setMessage] = useState('');
  const endOfMessagesRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        message,
        isFromUser: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col justify-between h-full w-full md:w-1/2 p-2">
        <div className="flex items-center justify-between space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full h-12 p-2 rounded-xl bg-gray-100 dark:bg-slate-800 resize-none"
            placeholder="Type a message..."
          />
          <Button
            onClick={handleSendMessage}
            className="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-xl flex items-center justify-center transition-all duration-300"
          >
            <Send className=" text-gray-900 dark:text-white" size={28} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
