// src/context/MessageContext.tsx
import { createContext, useContext, useState,useRef,useEffect } from 'react';
import type {ReactNode} from 'react'
export type MessageType = 'success' | 'error' | 'info';

export type Message = {
  content: string;
  type: MessageType;
};

type MessageContextType = {
  message: Message | null;
  setMessage: (msg: Message, duration?: number) => void;
  clearMessage: () => void;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessageState] = useState<Message | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setMessage = (msg: Message, duration: number = 3000) => {
    setMessageState(msg);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (duration > 0) {
      timeoutRef.current = setTimeout(() => setMessageState(null), duration);
    }
  };

  const clearMessage = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMessageState(null);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <MessageContext.Provider value={{ message, setMessage, clearMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage deve ser usado dentro de <MessageProvider>');
  }
  return context;
};
