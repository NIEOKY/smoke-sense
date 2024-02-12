'use client';
import ChatComponent from '@/components/chat-component';
import ChatInput from '@/components/chat-input';
import Navbar from '@/components/nav-bar';
import Image from 'next/image';
import { useState } from 'react';

export interface messageInterface {
  id: number;
  message: string;
  isFromUser: boolean;
}

export default function Home() {
  const [messages, setMessages] = useState<messageInterface[]>([]);
  return (
    <main className="flex flex-col justify-between h-full w-full">
      <Navbar />
      <ChatComponent messages={messages} setMessages={setMessages} />
      <ChatInput messages={messages} setMessages={setMessages} />
    </main>
  );
}
