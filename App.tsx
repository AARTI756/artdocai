import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ChatWithPDFPage from './pages/ChatWithPDFPage';
import DiagramInterpreterPage from './pages/DiagramInterpreterPage';
import AICalculatorPage from './pages/AICalculatorPage';
import TranslatorPage from './pages/translator';        // 🌍 Translator
import CodeInterpreterPage from './pages/CodeInterpreter'; // 💻 Code Interpreter

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat-with-pdf" element={<ChatWithPDFPage />} />
          <Route path="/diagram-interpreter" element={<DiagramInterpreterPage />} />
          <Route path="/ai-calculator" element={<AICalculatorPage />} />
        <Route path="/translator" element={<TranslatorPage />} />             {/* 🌍 */}
          <Route path="/code-interpreter" element={<CodeInterpreterPage />} />  {/* 💻 */}

        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;