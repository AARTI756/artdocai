
import React, { useState, useRef, useEffect, useCallback } from 'react';
import FileUpload from '../components/common/FileUpload';
import Card from '../components/common/Card';
import Spinner from '../components/common/Spinner';
import { generateTextFromImage } from '../services/geminiService';

const DrawAndFindPage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const isDrawing = useRef(false);

  const getCanvasContext = () => canvasRef.current?.getContext('2d');

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = getCanvasContext();
    if (!ctx) return;
    isDrawing.current = true;
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  }, []);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const ctx = getCanvasContext();
    if (!ctx) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  }, []);

  const stopDrawing = useCallback(() => {
    isDrawing.current = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = getCanvasContext();
    if (!ctx) return;
    
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.7)';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [image]);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setResult('');
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleFind = async () => {
    if (!imageRef.current || !canvasRef.current || !file) return;

    setIsLoading(true);
    setResult('');

    const compositeCanvas = document.createElement('canvas');
    compositeCanvas.width = imageRef.current.naturalWidth;
    compositeCanvas.height = imageRef.current.naturalHeight;
    const ctx = compositeCanvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(imageRef.current, 0, 0);
    ctx.drawImage(canvasRef.current, 0, 0, imageRef.current.naturalWidth, imageRef.current.naturalHeight);

    const base64Image = compositeCanvas.toDataURL(file.type).split(',')[1];
    const prompt = "Analyze the user's red markings on this document. What information are they trying to highlight or extract? Provide a summary or transcription of the marked area.";
    
    const aiResult = await generateTextFromImage(prompt, base64Image, file.type);
    setResult(aiResult);
    setIsLoading(false);
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
  };

  const reset = () => {
    setImage(null);
    setFile(null);
    setResult('');
    setIsLoading(false);
    clearCanvas();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-2">Draw and Find</h1>
      <p className="text-center text-gray-400 mb-8">Upload an image of your document, circle the information you need, and let AI find it for you.</p>

      {!image ? (
        <FileUpload onFileSelect={handleFileSelect} acceptedTypes="image/*" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Your Document</h2>
            <div className="relative border border-gray-600 rounded-md overflow-hidden">
                <img ref={imageRef} src={image} alt="Document preview" className="w-full h-auto" onLoad={() => {
                    if (imageRef.current && canvasRef.current) {
                        canvasRef.current.width = imageRef.current.clientWidth;
                        canvasRef.current.height = imageRef.current.clientHeight;
                    }
                }} />
                <canvas 
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                />
            </div>
            <div className="mt-4 flex gap-4">
                <button onClick={handleFind} className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-md w-full hover:bg-cyan-600" disabled={isLoading}>
                    {isLoading ? 'Finding...' : 'Find Information'}
                </button>
                <button onClick={clearCanvas} className="bg-gray-600 text-white font-bold py-2 px-4 rounded-md w-full hover:bg-gray-500">Clear Drawing</button>
            </div>
          </Card>
          
          <Card className="flex flex-col">
            <h2 className="text-xl font-semibold mb-4">AI Result</h2>
            <div className="flex-grow bg-gray-900 rounded-md p-4 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Spinner />
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{result || 'Results will appear here.'}</p>
              )}
            </div>
             <button onClick={reset} className="bg-red-500 text-white font-bold mt-4 py-2 px-4 rounded-md w-full hover:bg-red-600">Reset</button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DrawAndFindPage;
