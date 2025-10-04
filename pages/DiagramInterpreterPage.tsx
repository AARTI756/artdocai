import React, { useState } from 'react';
import FileUpload from '../components/common/FileUpload';
import Card from '../components/common/Card';
import Spinner from '../components/common/Spinner';
import { generateTextFromImage } from '../services/geminiService';

const DiagramInterpreterPage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setResult('');
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleInterpret = async () => {
    if (!file) return;

    setIsLoading(true);
    setResult('');

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (e) => {
        const base64Image = (e.target?.result as string).split(',')[1];
        const prompt = "Please interpret and explain the diagram in this image in a clear and concise way. Describe its components, their relationships, and the overall purpose or flow it represents.";
        
        const aiResult = await generateTextFromImage(prompt, base64Image, file.type);
        setResult(aiResult);
        setIsLoading(false);
    };
  };

  const reset = () => {
    setImage(null);
    setFile(null);
    setResult('');
    setIsLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-2">Diagram Interpreter</h1>
      <p className="text-center text-gray-500 mb-8">Upload an image of a diagram, and our AI will provide a detailed explanation.</p>

      {!image ? (
        <FileUpload onFileSelect={handleFileSelect} acceptedTypes="image/*" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Your Diagram</h2>
            <img src={image} alt="Diagram preview" className="w-full h-auto rounded-md border border-gray-300" />
            <div className="mt-4 flex gap-4">
              <button onClick={handleInterpret} className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-md w-full hover:bg-cyan-600" disabled={isLoading}>
                {isLoading ? 'Interpreting...' : 'Interpret Diagram'}
              </button>
              <button onClick={reset} className="bg-red-500 text-white font-bold py-2 px-4 rounded-md w-full hover:bg-red-600">Reset</button>
            </div>
          </Card>
          
          <Card className="flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">AI Interpretation</h2>
            <div className="flex-grow bg-gray-50 rounded-md p-4 overflow-y-auto border border-gray-200">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Spinner />
                </div>
              ) : (
                <p className="whitespace-pre-wrap text-gray-700">{result || 'Interpretation will appear here.'}</p>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DiagramInterpreterPage;