import useChatStore from '@/stores/chatstore';
import { MessageType } from '@/types/chat-types';
import React, { useEffect, useRef } from 'react';

const ChatComponent = () => {
  const messages = useChatStore((state) => state.messages);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Si hay mensajes, hacer scroll al último mensaje cada vez que cambie la lista de mensajes
    if (messages.length > 0) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); // Dependencias del useEffect, en este caso la lista de mensajes

  return (
    <div className="flex items-center justify-center w-full overflow-auto h-full">
      <div className="h-full overflow-auto flex flex-col py-4 w-full space-y-4 md:w-1/2">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className="flex items-center justify-start space-x-2 p-2 "
            >
              {message.isFromUser ? (
                <div className="flex items-start justify-start space-x-2 ">
                  <p className="bg-blue-500 text-2xl mt-2 min-w-12 min-h-12 text-white flex items-center justify-center p-2 rounded-full">
                    🧑
                  </p>
                  <p className="text-2xl p-2 rounded-lg">{message.message}</p>
                </div>
              ) : (
                <div className="flex items-start justify-start space-x-2">
                  <p className="bg-neutral-800 min-w-12 min-h-12 text-white flex items-center justify-center p-2 rounded-full">
                    🤖
                  </p>
                  <p className="text-2xl p-2 rounded-lg items-end">
                    {message.message}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-2">
            <p className="text-2xl p-4 rounded-lg items-center justify-center text-neutral-500 text-center  ">
              Smoke-Sense es un asistente especializado en temas relacionados
              con el tabaquismo.
            </p>
            <p className="text-2xl p-4 rounded-lg items-center justify-center text-neutral-500 text-center  ">
              Además, utiliza técnicas de predicción de datos para determinar si
              una persona es fumadora o no. Si desea obtener más información
              sobre este tema, por favor escribe.
            </p>
            <p className="text-2xl p-4 rounded-lg items-end text-neutral-500 text-justify ">
              {'*Hola*'}
            </p>
          </div>
        )}
        {/* Elemento al final de la lista de mensajes que sirve como referencia para hacer scroll */}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default ChatComponent;
