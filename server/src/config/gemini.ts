import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { ENV } from "./env";

const ai = new GoogleGenAI({ apiKey: ENV.GEMINI_API_KEY });

export const LLM = ai.chats.create({
  model: ENV.GEMINI_MODEL,
  history: [],
  config: {
    systemInstruction: ENV.GEMINI_SYSTEM_PROMPT,
    thinkingConfig: {
      thinkingLevel: ThinkingLevel.LOW,
    },
  },
});
