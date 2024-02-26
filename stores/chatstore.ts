import { create } from 'zustand';
import { MessageType } from '@/types/chat-types';

interface ChatState {
  messages: MessageType[];
  setMessages: (messages: MessageType[]) => void;
  addMessage: (message: MessageType) => void;
}

const useChatStore = create<ChatState>()((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message: MessageType) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
}));

export default useChatStore;
