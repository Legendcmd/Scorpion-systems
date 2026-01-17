
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the Scorpion AI, the digital concierge for Scorpion Systems. 
Our team consists of Alex "Venom" Chen (Architect), Sarah "Stinger" Vance (AI Research), and Marcus "Apex" Thorne (Strategy).
We specialize in Project Obsidian (Security), Neural Hive (AI), and Aegis (Cloud).
Be professional, sharp, efficient, and slightly tech-noir in your tone. 
Help visitors understand our capabilities and why Scorpion Systems is the best choice for high-stakes engineering.
Keep responses concise.
`;

export const getScorpionResponse = async (prompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
        topP: 0.9,
      },
    });
    return response.text || "Connection lost. Re-establishing link...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The Scorpion network is currently under heavy load. Please try again later.";
  }
};
