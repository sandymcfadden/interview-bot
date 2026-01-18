export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  audioUrl?: string;
  isLoading?: boolean;
}

export interface ChatRequest {
  message: string;
  conversationHistory?: Pick<Message, 'role' | 'content'>[];
}

export interface ChatResponse {
  response: string;
}

export interface SpeechRequest {
  text: string;
}

export type Theme = 'light' | 'dark';
