'use client';
import ChatComponent from '@/components/chat-component';
import ChatInput from '@/components/chat-input';
import Navbar from '@/components/nav-bar';
import { MessageType } from '@/types/chat-types';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  return (
    <main className="flex flex-col justify-between h-full w-full">
      <Navbar />
      <ChatComponent />
      <ChatInput />
    </main>
  );
}
