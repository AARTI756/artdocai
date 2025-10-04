import React, { useState } from "react";
import Card from "../components/common/Card";
import Spinner from "../components/common/Spinner";
import { translateText } from "../services/geminiService";
import type { TranslationResult } from "../types";

const TranslatorPage: React.FC = () => {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("es"); // default Spanish
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTranslate = async () => {
    if (!text.trim()) {
      setError("Please enter text to translate.");
      return;
    }
    setError("");
    setIsLoading(true);
    setResult(null);

    try {
      const response = await translateText(text, language);
      setResult(response);
    } catch (err) {
      setError("An error occurred while translating.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">AI Translator</h1>
        <p className="text-gray-500 mt-2">
          Translate text into different languages instantly with AI.
        </p>
      </div>
      <Card>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to translate..."
          rows={4}
          className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <div className="mt-4 flex gap-4 items-center">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="hi">Hindi</option>
            <option value="zh">Chinese</option>
          </select>
          <button
            onClick={handleTranslate}
            disabled={isLoading}
            className="bg-cyan-500 text-white px-6 py-2 rounded-md hover:bg-cyan-600 disabled:bg-gray-400 flex items-center justify-center"
          >
            {isLoading ? <Spinner /> : "Translate"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {result && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Translation ({result.targetLanguage})
            </h2>
            <p className="mt-2 p-4 bg-gray-50 border border-gray-200 rounded-md">
              {result.translatedText}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TranslatorPage;
