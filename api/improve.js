
import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: "Gemini API key is not configured."
    });
  }

  try {
    const { text, goal } = req.body || {};

    if (
      typeof text !== "string" ||
      !text.trim() ||
      text.length > 5000
    ) {
      return res.status(400).json({
        error: "Enter text between 1 and 5000 characters."
      });
    }

    const allowedGoals = [
      "professional summary",
      "project description",
      "experience description"
    ];

    const selectedGoal = allowedGoals.includes(goal)
      ? goal
      : "professional summary";

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const result = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents:
        "Improve this resume text for: " + selectedGoal +
        ". Use professional language, preserve the original facts, " +
        "and do not invent skills, qualifications, employers, or achievements. " +
        "Return only the improved text.\n\nOriginal text:\n" +
        text.trim(),
      config: {
        temperature: 0.3,
        maxOutputTokens: 600
      }
    });

    return res.status(200).json({
      improvedText: result.text
    });
  } catch (error) {
    console.error("Gemini request failed:", error);

    return res.status(502).json({
      error: "AI generation failed. Check your API configuration and try again."
    });
  }
}
