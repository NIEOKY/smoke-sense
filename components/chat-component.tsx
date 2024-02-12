import React, { useEffect, useRef } from 'react';
import { messageInterface } from '@/app/page';

type Props = {
  messages: messageInterface[];
  setMessages: React.Dispatch<React.SetStateAction<messageInterface[]>>;
};

const ChatComponent = ({ messages }: Props) => {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    // Si hay mensajes, hacer scroll al último mensaje cada vez que cambie la lista de mensajes
    if (messages.length > 0) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); // Dependencias del useEffect, en este caso la lista de mensajes

  return (
    <div className="flex items-center justify-center w-full overflow-auto h-full">
      <div className="h-full overflow-auto flex flex-col py-4 w-full md:w-1/2">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className="flex items-center justify-between p-2"
            >
              <p>{message.message}</p>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center p-2">
            <p>No messages yet</p>
          </div>
        )}
        {/* Elemento al final de la lista de mensajes que sirve como referencia para hacer scroll */}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default ChatComponent;
