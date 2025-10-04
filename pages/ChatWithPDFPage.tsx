import React, { useState } from 'react';
import type { ChatMessage } from '../types';
import { continueConversation } from '../services/geminiService';
import Card from '../components/common/Card';
import Spinner from '../components/common/Spinner';

const ChatWithPDFPage: React.FC = () => {
  const [documentText, setDocumentText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendMessage = async () => {
    if (!userInput.trim() || !documentText.trim()) {
        setError("Please provide document content and a question.");
        return;
    }
    setError('');
    setIsLoading(true);

    const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');

    try {
      const aiResponse = await continueConversation(newMessages, userInput, documentText);
      setMessages([...newMessages, { sender: 'ai', text: aiResponse }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setMessages([...newMessages, { sender: 'ai', text: `Error: ${errorMessage}` }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-2">Chat with your Document</h1>
      <p className="text-center text-gray-500 mb-8">Paste your document's text below and start asking questions.</p>

      <Card className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">Document Content</h2>
        <textarea
          value={documentText}
          onChange={(e) => setDocumentText(e.target.value)}
          placeholder="Paste the text from your PDF or document here..."
          className="w-full h-48 p-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-800"
        />
        <p className="text-xs text-gray-500 mt-2">Note: Actual file uploading is not supported in this demo. Please paste text content directly.</p>
      </Card>
      
      <Card>
        <div className="h-96 overflow-y-auto mb-4 p-4 bg-gray-100 rounded-md space-y-4 border border-gray-200">
          {messages.length === 0 && <div className="text-center text-gray-500">Conversation will appear here.</div>}
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
            placeholder="Ask a question about the document..."
            className="flex-grow p-3 bg-gray-100 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-800"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="bg-cyan-500 text-white p-3 rounded-r-md hover:bg-cyan-600 disabled:bg-gray-400 flex items-center justify-center w-24"
          >
            {isLoading ? <Spinner /> : 'Send'}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </Card>
    </div>
  );
};

export default ChatWithPDFPage;