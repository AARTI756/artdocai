import { GoogleGenerativeAI } from "@google/generative-ai";
import type {
  ChatMessage,
  TranslationResult,
  CodeAnalysis,
  TranscriptionResult,
} from "../types";

/* =========================================================
   🔑 API KEY SETUP
   ========================================================= */
const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  throw new Error("VITE_API_KEY environment variable is not set in .env.local");
}

/**
 * Initialize Gemini client
 */
const ai = new GoogleGenerativeAI(API_KEY);

/**
 * ✅ Always use a *supported* and current model.
 * You can check with: https://generativelanguage.googleapis.com/v1/models?key=YOUR_API_KEY
 *
 * Recommended models (2025):
 *  - "models/gemini-2.5-flash"  → fast, inexpensive, multimodal
 *  - "models/gemini-2.5-pro"    → more powerful, slower, costlier
 */
const MODEL_NAME = "models/gemini-2.5-flash";

/* =========================================================
   Helper: safely extract text
   ========================================================= */
const getText = (response: any): string => {
  try {
    return response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } catch {
    return "";
  }
};

/* =========================================================
   🖼 IMAGE → TEXT
   ========================================================= */
export const generateTextFromImage = async (
  prompt: string,
  imageBase64: string,
  mimeType: string
): Promise<string> => {
  try {
    const model = ai.getGenerativeModel({ model: MODEL_NAME });
    const response = await model.generateContent([
      { text: prompt },
      { inlineData: { data: imageBase64, mimeType } },
    ]);
    return getText(response.response);
  } catch (error) {
    console.error("Error generating text from image:", error);
    return "Sorry, I encountered an error while analyzing the image.";
  }
};

/* =========================================================
   📑 DOCUMENT CONVERSATION
   ========================================================= */
export const continueConversation = async (
  history: ChatMessage[],
  newPrompt: string,
  documentContext: string
): Promise<string> => {
  try {
    const systemInstruction = `You are an expert document analysis assistant. Use only this content:\n${documentContext}`;

    const model = ai.getGenerativeModel({ model: MODEL_NAME });
    const response = await model.generateContent([
      { text: systemInstruction },
      { text: newPrompt },
    ]);

    return getText(response.response);
  } catch (error) {
    console.error("Error continuing conversation:", error);
    return "Sorry, I couldn't process your request.";
  }
};

/* =========================================================
   ➗ CALCULATOR
   ========================================================= */
export const performCalculation = async (query: string): Promise<string> => {
  try {
    const systemInstruction =
      "You are a math assistant. Return only the final numeric result. No words, no explanations.";

    const model = ai.getGenerativeModel({ model: MODEL_NAME });
    const response = await model.generateContent([
      { text: systemInstruction },
      { text: query },
    ]);

    console.log("Raw result:", JSON.stringify(response, null, 2));
    return getText(response.response);
  } catch (error) {
    console.error("Error performing calculation:", error);
    return "Sorry, I couldn't process that calculation.";
  }
};

/* =========================================================
   🌐 TRANSLATOR
   ========================================================= */
export async function translateText(
  text: string,
  targetLanguage: string
): Promise<TranslationResult> {
  if (!text.trim()) {
    return {
      originalText: text,
      translatedText: "Please provide some text to translate.",
      targetLanguage,
    };
  }

  try {
    const model = ai.getGenerativeModel({ model: MODEL_NAME });
    const prompt = `Translate the following text to ${targetLanguage}:\n\n${text}`;

    const result = await model.generateContent([{ text: prompt }]);
    const translatedText = getText(result.response);

    return {
      originalText: text,
      translatedText,
      targetLanguage,
    };
  } catch (err) {
    console.error("Translation error:", err);
    return {
      originalText: text,
      translatedText: "⚠️ Error occurred while translating.",
      targetLanguage,
    };
  }
}

/* =========================================================
   💻 CODE INTERPRETER
   ========================================================= */
export const interpretCode = async (code: string): Promise<CodeAnalysis> => {
  try {
    const systemInstruction = `You are an AI code interpreter.
Return ONLY valid JSON with this structure:
{
  "explanation": "string",
  "improvements": ["string", "string"],
  "warnings": ["string", "string"] // optional
}`;

    const model = ai.getGenerativeModel({ model: MODEL_NAME });
    const response = await model.generateContent([
      { text: systemInstruction },
      { text: code },
    ]);

    const raw = getText(response.response).trim();
    console.log("Raw AI Output:", raw);

    let cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed: CodeAnalysis = JSON.parse(cleaned);

    return {
      explanation: parsed.explanation || "No explanation provided.",
      improvements: parsed.improvements || [],
      warnings: parsed.warnings || [],
    };
  } catch (error) {
    console.error("Error interpreting code:", error);
    return {
      explanation: "⚠️ Error: Could not interpret the code.",
      improvements: [],
      warnings: [],
    };
  }
};

/* =========================================================
   🎙 VOICE-TO-TEXT
   ========================================================= */
export const transcribeAudio = async (
  audioBlob: Blob
): Promise<TranscriptionResult> => {
  try {
    const base64 = await blobToBase64(audioBlob);
    const systemInstruction = `Transcribe the audio and return a JSON object with:
      - transcript (string)
      - confidence (number, 0–1 if possible)
      - summary (string, optional).`;

    const model = ai.getGenerativeModel({ model: MODEL_NAME });
    const response = await model.generateContent([
      { inlineData: { data: base64, mimeType: "audio/webm" } },
      { text: systemInstruction },
    ]);

    let raw = getText(response.response).trim();
    raw = raw.replace(/```json|```/g, "").trim();

    const parsed: TranscriptionResult = JSON.parse(raw);

    return {
      transcript: parsed.transcript || "",
      confidence: parsed.confidence || 0,
      summary: parsed.summary || "",
    };
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return {
      transcript: "Sorry, I couldn't transcribe the audio.",
      confidence: 0,
      summary: "",
    };
  }
};

/* =========================================================
   Helper: Convert Blob → Base64
   ========================================================= */
const blobToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = (reader.result as string).split(",")[1];
      resolve(base64data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
