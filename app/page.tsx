import ChatComponent from '@/components/chat-component';
import Navbar from '@/components/nav-bar';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col justify-between h-full w-full">
      <Navbar />
      <ChatComponent />
    </main>
  );
}
