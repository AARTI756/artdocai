import React, { useState } from 'react';
import Card from '../components/common/Card';
import Spinner from '../components/common/Spinner';
import { performCalculation } from '../services/geminiService';

const AICalculatorPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    if (!query.trim()) {
      setError('Please enter a calculation or question.');
      return;
    }
    setError('');
    setIsLoading(true);
    setResult('');
    try {
      const aiResult = await performCalculation(query);
      setResult(aiResult);
    } catch (err) {
      setError('An error occurred while calculating.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">AI Calculator</h1>
        <p className="text-gray-500 mt-2">
          Perform complex calculations and get instant results with our AI-powered calculator that understands natural language.
        </p>
      </div>
      <Card>
        <div className="flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleCalculate()}
            placeholder="e.g., 'square root of 144 + 20% of 50'"
            className="flex-grow p-3 bg-gray-100 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            disabled={isLoading}
          />
          <button
            onClick={handleCalculate}
            disabled={isLoading}
            className="bg-cyan-500 text-white p-3 rounded-r-md hover:bg-cyan-600 disabled:bg-gray-400 flex items-center justify-center w-32"
          >
            {isLoading ? <Spinner /> : 'Calculate'}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        
        {(isLoading || result) && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">Result</h2>
            <div className="mt-2 p-4 bg-gray-50 border border-gray-200 rounded-md min-h-[6rem] flex items-center justify-center">
              {isLoading ? (
                <Spinner />
              ) : (
                <p className="text-3xl font-bold text-cyan-600">{result}</p>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AICalculatorPage;
