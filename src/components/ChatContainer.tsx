import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import { type Message } from './index';

interface ChatContainerProps {
  messages: Message[];
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages }) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Guardian Angel</h2>
          <p className="text-gray-600 max-w-md">
            Ask any questions about your child's health concerns, and we'll help you understand what might be happening.
          </p>
        </div>
      ) : (
        messages.map((message) => <ChatMessage key={message.id} message={message} />)
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatContainer;