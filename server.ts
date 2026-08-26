import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "25mb" }));

  // Lazy initialize Gemini client
  function getGeminiClient(): GoogleGenAI | null {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    try {
      return new GoogleGenAI({ apiKey });
    } catch {
      return null;
    }
  }

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "Punarnava Ecosystem Server", timestamp: new Date().toISOString() });
  });

  // AI Assistant endpoint
  app.post("/api/puna-assistant", async (req, res) => {
    const { prompt, context } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Graceful fallback response when API key is not configured
      return res.json({
        reply: `Punarnava AI: Based on your query "${prompt}", you can either segregate this item using the Smart Sort scanner, deposit organic waste to your local Digital Dung & Biomass Bank for bio-methane conversion, or list valuable recyclable metals/plastics on the Fair-Value Scrap Marketplace to get verified instant bids from certified recyclers!`,
        source: "local-rule-engine",
      });
    }

    try {
      const systemInstruction = `You are "Puna", the friendly, intelligent AI advisor for PUNARNAVA — an AI + IoT circular waste-to-wealth platform.
Your expertise covers:
1. Smart Waste Segregation (Dry, Wet, Hazardous, E-waste, Metals, PET, HDPE, Cardboard).
2. Digital Dung Bank & Biomass to Bioenergy (Biogas calculation: ~0.04-0.06 m³ biogas per kg cattle dung; electricity ~1.5-2.0 kWh/m³; CBG ~0.45 kg/m³; Organic bio-slurry fertilizer).
3. Fair-Value Scrap Marketplace (Current Indian scrap market rates: Copper ₹600-750/kg, Brass ₹450-520/kg, Aluminum ₹140-180/kg, Iron/Steel ₹30-40/kg, PET ₹15-25/kg, Cardboard ₹8-14/kg, E-waste PCB ₹150-500/kg).
4. Environmental impact (CO2 offset, landfill diversion).

Keep answers concise (2-4 sentences max), inspiring, practical, friendly, with clear environmental and monetary value takeaways. Format with bullet points if helpful. Context: ${context || "general"}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return res.json({
        reply: response.text || "I'm here to help you turn your waste into valuable resources!",
        source: "gemini-2.5-flash",
      });
    } catch (err: any) {
      return res.json({
        reply: `Punarnava Assistant: For "${prompt}", the best practice is to clean and dry the material, sort it into its designated bin, or aggregate it for pickup via our marketplace. Every kilogram diverted saves up to 1.8 kg of carbon emissions!`,
        source: "local-fallback",
        error: err.message,
      });
    }
  });

  // AI Waste Visual Analyzer endpoint
  app.post("/api/analyze-waste", async (req, res) => {
    const { imageBase64, mimeType, itemName } = req.body;
    const ai = getGeminiClient();

    if (!ai || !imageBase64) {
      return res.json({
        fallback: true,
        message: "Using calibrated offline AI vision model."
      });
    }

    try {
      const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");
      const prompt = `Analyze this discarded item for the Punarnava Waste-to-Wealth ecosystem.
Return strict JSON with the following fields:
{
  "itemName": "Specific item name (e.g., Transparent PET Mineral Water Bottle)",
  "category": "Recyclable | Organic / Biomass | E-Waste | Metal & Scrap | Hazardous | Inert Dry",
  "material": "Specific polymer or material (e.g., Polyethylene Terephthalate - PET #1)",
  "confidence": 98.4,
  "recommendedBin": "Blue Recyclable Bin | Green Wet/Biomass Bin | Red Hazardous Bin | Yellow Metal Bin",
  "estimatedValueRange": "₹X – ₹Y",
  "action": "Send to Recycler | Convert in Dung Bank / Biogas Digester | E-Waste Depot | Compost",
  "environmentalBenefit": "Specific environmental offset fact (e.g., Saves 0.42 kg CO2 and 1.2 liters of water)",
  "smartBinCompartment": 1,
  "tips": "Quick preparation tip (e.g., Rinse, remove cap, crush flat to save 70% bin volume)"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType || "image/jpeg"
            }
          },
          prompt
        ],
        config: {
          responseMimeType: "application/json",
          temperature: 0.2
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({ success: true, result: parsed, source: "gemini-vision" });
    } catch (err: any) {
      return res.json({ fallback: true, error: err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🌿 Punarnava server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
