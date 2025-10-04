export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

/* 🌍 Translator */
export interface TranslationResult {
  originalText: string;
  translatedText: string;
  targetLanguage: string;
}

/* 💻 Code Interpreter */
export interface CodeAnalysis {
  explanation: string;
  improvements: string[];
  warnings?: string[];
}

/* 🎙 Voice-to-Text */
export interface TranscriptionResult {
  transcript: string;
  confidence?: number; // optional if API provides
  summary?: string; // optional summarization
}


