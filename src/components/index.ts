export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface CommonConcern {
  id: string;
  label: string;
  icon: string;
  description?: string;
}
//export default Message;