'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Send, CigaretteOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { MessageType } from '@/types/chat-types';
import useChatStore from '@/stores/chatstore';
import { GenerateAIResponse } from '@/chatbot/openai';

async function enviarJSONAlServidor(jsonString: string) {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL; // URL del endpoint

  try {
    const response = await fetch(url as string, {
      method: 'POST', // Método HTTP
      headers: {
        'Content-Type': 'application/json', // Indicar el tipo de contenido
      },
      body: jsonString, // Cuerpo de la petición con el JSON como string
    });

    if (!response.ok) {
      // Manejar respuestas de error
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    // Convertir la respuesta a JSON y luego obtener el primer elemento del array
    const data = await response.json(); // Convierte la respuesta a un objeto JSON
    if (data.length > 0) {
      return data[0]; // Retorna el primer elemento del array
    } else {
      throw new Error('La respuesta del servidor no contiene datos.');
    }
  } catch (error) {
    console.error('Error al enviar JSON al servidor:', error);
    return null; // Considera manejar el error de manera diferente si es necesario
  }
}
function extraerJSON(input: string): string | null {
  // Esta expresión regular intenta encontrar estructuras que parezcan JSON.
  // Es bastante simplista y puede necesitar ajustes para casos más complejos.
  const regex =
    /{[^{}]*}|{(?:[^{}]|{[^{}]*})*}|\[[^\[\]]*\]|\[(?:[^\[\]]|\[[^\[\]]*\])*\]/;

  const match = input.match(regex);
  if (match) {
    const posibleJSON = match[0];
    try {
      // Intenta parsear para asegurar que es un JSON válido.
      JSON.parse(posibleJSON);
      return posibleJSON; // Es un JSON válido.
    } catch (e) {
      // No es un JSON válido.
      return null;
    }
  } else {
    // No se encontró ninguna estructura que parezca JSON.
    return null;
  }
}

const ChatInput = () => {
  const openaiKey = process.env.NEXT_PUBLIC_OPENAI_SECRET;
  const messages = useChatStore((state) => state.messages);
  const addMessage = useChatStore((state) => state.addMessage);
  const [message, setMessage] = useState('');
  const [canSendMessage, setCanSendMessage] = useState(true);

  const endOfMessagesRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    // Asegúrate de marcar esta función como async
    if (!canSendMessage) return;
    if (message.trim() !== '') {
      const userMessage: MessageType = {
        id: Math.floor(Math.random() * 100000),
        message,
        isFromUser: true,
      };
      addMessage(userMessage);
      setMessage('');
      setCanSendMessage(false);

      // Llamar a GenerateAIResponse y obtener la respuesta del bot
      const botResponse = await GenerateAIResponse([...messages, userMessage]);
      const json = extraerJSON(botResponse!);
      if (json) {
        console.log(json);
        //post the json to the server
        const response = await enviarJSONAlServidor(json);
        const botMessage: MessageType = {
          id: Math.floor(Math.random() * 100000),
          message: response!,
          isFromUser: false,
        };
        addMessage(botMessage);
      } else if (botResponse && botResponse) {
        // Asegúrate de que la respuesta del bot tenga contenido
        const botMessage: MessageType = {
          id: Math.floor(Math.random() * 100000),
          message: botResponse,
          isFromUser: false,
        };

        addMessage(botMessage);
      }
      setCanSendMessage(true);
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
            disabled={!canSendMessage}
            onClick={handleSendMessage}
            className="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-xl flex items-center justify-center transition-all duration-300"
          >
            {canSendMessage ? (
              <Send className="text-gray-900 dark:text-white" size={28} />
            ) : (
              <CigaretteOff
                className="text-gray-400 dark:text-slate-400 animate-spin duration-3000 transition-all"
                size={28}
              />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
