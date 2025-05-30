import { type Message } from './components/index';

// Mock responses for common concerns
const mockResponses: Record<string, string> = {
  'excessive-crying': 
    "Excessive crying could be due to several reasons including colic, gas, hunger, or discomfort. If your baby is under 3 months, crying for more than 3 hours a day for at least 3 days a week could indicate colic. Check if they're fed, clean, and comfortable. If crying persists with fever or unusual behavior, please consult a doctor.",
  
  'vomiting': 
    "Vomiting in children is common and often caused by viral infections, food poisoning, or motion sickness. Ensure they stay hydrated with small sips of clear fluids. If vomiting persists for more than 24 hours, is accompanied by fever over 101°F, severe abdominal pain, or signs of dehydration, seek medical attention.",
  
  'stool-problems': 
    "Stool problems like diarrhea or constipation are common in children. Diarrhea is often caused by infections and usually resolves within a few days. Constipation might be due to diet changes or holding behavior. Ensure proper hydration and fiber intake. If symptoms persist or are accompanied by fever or severe pain, consult a healthcare provider.",
  
  'default': 
    "I understand you're concerned about your child. Based on what you've described, this could be due to several causes. It's important to monitor symptoms and note any changes. If symptoms persist, worsen, or are accompanied by fever, unusual behavior, or if you're concerned, please consult with your pediatrician for a proper diagnosis and treatment plan."
};

// Function to simulate API call to get response from backend
export const getChatResponse = async (userMessage: string): Promise<Message> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    return {
      id: Date.now().toString(),
      content: data.message,
      sender: 'bot',
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};