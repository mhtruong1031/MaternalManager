//import Alert from "./components/Alerts";
//import Button from "./components/Button";
import Gradient from "./LoadingPage";
import React, { useState } from 'react';
import ChatContainer from "./components/ChatContainer.tsx";
import ChatInput from "./components/ChatInput.tsx";
import family from "../public/family.png";
import hug from "../public/hug.png";
import side from "../public/side_sitting.png";
import sitting from "../public/sitting.png";
import CommonConcerns from './components/CommonConcerns.tsx';
import { type Message, type CommonConcern } from "./components/index.ts";
import { getChatResponse } from "./api.ts";
import {commonConcerns } from "./Concerns.ts";


function App(){
  const [messages, setMessages] = useState<Message[]>([]);
  const [isResponding, setIsResponding] = useState(false);

  const handleSendMsg = async (content: string) => {
    if(!content.trim()) return;

    // User Message goes to Chat Container
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsResponding(true);

    try {
      const botResponse = await getChatResponse(content);
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting response', error);
      // error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: 'Sorry, I had trouble processing your question. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsResponding(false);
    }
  };

  const handleSelectConcern = async (concern: CommonConcern) => {
    await handleSendMsg(`I'm concerned about my child's ${concern.label.toLowerCase()}`);
  };
  

  const [loading, setLoading] = React.useState(false);
  
  React.useEffect(() => {
      setLoading(true)
      setTimeout(() => {
      setLoading(false)
      }, 3000)
  }, [])
 return (
  <div className="flex justify-center items-center absolute z-0">
    {loading ? (
      <Gradient 
        className={ 
        "h-screen w-screen" } 
      >
        <p className={ "text-black h-screen justify-center items-center" }>Guardian Guidance</p>
      </Gradient>) : 

      <div>
        
        <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <img
              src={family}
              alt="Family playing together"
              className="rounded-2xl shadow-md w-full h-auto object-cover"
            />
            <img
              src={side}
              alt="Mother with baby"
              className="rounded-2xl shadow-md w-full h-auto object-cover"
            />
            <img
              src={hug}
              alt="Family with children"
              className="rounded-2xl shadow-md w-full h-auto object-cover"
            />
            <img
              src={sitting}
              alt="Mother holding child"
              className="rounded-2xl shadow-md w-full h-auto object-cover"
            />
          </div>


        <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-4 overflow-hidden">
          <ChatContainer messages={messages} />

          <div className="mt-auto space-y-4">
            {messages.length === 0 && (
            <CommonConcerns 
              concerns={commonConcerns}
              onSelectConcern={handleSelectConcern}
            />
          )}
            
            <ChatInput 
            onSendMessage={handleSendMsg}
            placeholder={isResponding ? "Processing..." : "What are your concerns?"}
            />

          {isResponding && (
            <div className="flex justify-center">
              <div className="animate-pulse flex space-x-2">
                <div className="h-2 w-2 bg-ppink-400 rounded-full"></div>
                <div className="h-2 w-2 bg-ppink-400 rounded-full"></div>
                <div className="h-2 w-2 bg-ppink-400 rounded-full"></div>
              </div>
            </div>
          )}

          <p className="text-xs text-center text-gray-500 mt-2">
            Note: This is a demonstration only. Always consult a healthcare professional for medical advice.
          </p>
          </div>
        </main>
      </div>

      }

  </div>
    
  
 );
}

export default App;