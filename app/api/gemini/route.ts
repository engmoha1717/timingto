import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY; // No NEXT_PUBLIC_ prefix
  
  if (!apiKey) {
    return NextResponse.json(
      { error: "API Key missing" },
      { status: 500 }
    );
  }

  try {
    const { sourceCity, sourceTime, targetCity, targetTime } = await request.json();
    
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

    return NextResponse.json({ text: response.text || "Could not generate context." });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Unable to retrieve AI insights" },
      { status: 500 }
    );
  }
}