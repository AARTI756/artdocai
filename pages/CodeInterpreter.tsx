import React, { useState } from "react";
import { interpretCode } from "../services/geminiService";
import type { CodeAnalysis } from "../types";

const CodeInterpreter: React.FC = () => {
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInterpret = async () => {
    setLoading(true);
    const result = await interpretCode(code);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">AI Code Interpreter</h2>

      {/* Code Input */}
      <textarea
        className="w-full h-40 p-2 border rounded-md font-mono text-sm"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
      />

      <button
        onClick={handleInterpret}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Interpret Code"}
      </button>

      {/* Analysis Results */}
      {analysis && (
        <div className="p-4 border rounded-md bg-gray-50 space-y-3">
          <div>
            <h3 className="font-semibold">📘 Explanation</h3>
            <p>{analysis.explanation}</p>
          </div>

          {analysis.improvements && analysis.improvements.length > 0 && (
            <div>
              <h3 className="font-semibold">✅ Improvements</h3>
              <ul className="list-disc list-inside">
                {analysis.improvements.map((imp, i) => (
                  <li key={i}>{imp}</li>
                ))}
              </ul>
            </div>
          )}

          {analysis.warnings && analysis.warnings.length > 0 && (
            <div>
              <h3 className="font-semibold">⚠️ Warnings</h3>
              <ul className="list-disc list-inside text-red-600">
                {analysis.warnings.map((warn, i) => (
                  <li key={i}>{warn}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeInterpreter;
