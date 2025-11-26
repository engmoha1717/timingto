import { GoogleGenAI } from "@google/genai";

export const getGeminiContext = async (
  sourceCity: string,
  sourceTime: string,
  targetCity: string,
  targetTime: string
): Promise<string> => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    return "AI context unavailable (API Key missing).";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      I am converting time. 
      Source: ${sourceCity} is ${sourceTime}.
      Target: ${targetCity} is ${targetTime}.
      
      Give me a very short, friendly 1-2 sentence advice about communication etiquette between these two places right now. 
      Example: "It's late in Tokyo, better to send an email than call."
      Keep it professional but witty.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    return response.text || "Could not generate context.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to retrieve AI insights at the moment.";
  }
};