import React, { useState } from 'react';
//import { Search } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, placeholder = "What are your concerns?" }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          
        </div>
        <input
          type="text"
          className="block w-full py-4 pl-10 pr-20 text-gray-700 bg-pink-100 border-none rounded-full focus:ring-2 focus:ring-pink-300 focus:outline-none transition-all"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2.5 bottom-2 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-full text-sm px-4 py-2 transition-colors"
          disabled={!input.trim()}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ChatInput;