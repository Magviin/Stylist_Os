import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing NEXT_PUBLIC_GEMINI_API_KEY in .env.local");
}

// 1. Initialize the modern 2026 client
const ai = new GoogleGenAI({ apiKey });

// 2. Added userProfile argument so the scanner knows whose closet it's looking at
export async function analyzeClothing(base64Image: string, userProfile: any = {}) {
  // Use a fallback object if userProfile is null/undefined
  const profile = userProfile || {}; 
  const model = "gemini-3-flash-preview"; 

  const prompt = `
    Analyze this clothing item for ${profile.name || "the user"}. 
    Their core aesthetic is ${profile.aesthetic || "General Fashion"}.

    STRICT RULES:
    1. MATERIAL: Identify the specific fabric (e.g., Corduroy, 100% Cotton, Wool). REQUIRED.
    2. TAGS: List all that apply. 
       Options: [undershirt, mid-layer, vest, coat, top, bottom, shoes, accessory]
    3. VIBE: Identify aesthetic (e.g., Dark Academia, Streetwear, Wilburst).
    4. SIZE: Extract only if a tag is clearly visible.
    5. TONE: Be direct and authentic. 

    Return ONLY a JSON object:
    {
      "item_name": "string",
      "material": "string",
      "tags": ["string"],
      "vibe": "string",
      "size": "string",
      "notes": "string"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        prompt,
        {
          inlineData: {
            data: base64Image,
            mimeType: "image/jpeg",
          },
        },
      ],
      config: { 
        responseMimeType: "application/json" 
      }
    });

    if (!response.text) {
      throw new Error("AI returned an empty response.");
    }

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Analysis Failed:", error);
    throw new Error("Could not analyze image. Check your API key or connection.");
  }
}

// 3. Added userProfile argument to the chat logic
export async function runStylistChat(
  message: string, 
  currentPreferences: any[] = [], 
  wardrobe: any[] = [], 
  userProfile: any = {}
) {
  // Defensive check: If wardrobe or profile is missing, don't crash
  const profile = userProfile || {};
  const safeWardrobe = wardrobe || [];
  
  const wardrobeData = safeWardrobe.map(i => ({ 
    id: i.id, 
    name: i.item_name, 
    tags: i.tags, 
    vibe: i.vibe,
    material: i.material
  }));

  const systemPrompt = `
    You are the Stylist_OS Core. 
    
    USER_IDENTITY:
    - Name: ${profile.name || "User"}
    - Core Aesthetic: ${profile.aesthetic || "General Fashion"}
    - Lifestyle/Context: ${profile.lifestyle || "Standard daily wear"}
    
    CURRENT_PROTOCOL: ${JSON.stringify(currentPreferences)}
    WARDROBE_INVENTORY: ${JSON.stringify(wardrobeData)}

    POWERS & DECISION MATRIX:
    1. ADD_PREFERENCE: Use if User sets a permanent rule.
    2. OUTFIT_SUGGESTION: Use if User asks what to wear. 
    3. NONE: Standard chat/banter.

    RESPONSE_FORMAT (STRICT JSON):
    {
      "reply": "Direct response.",
      "action": "NONE" | "ADD_PREFERENCE" | "OUTFIT_SUGGESTION",
      "actionData": {
        "outfit_name": "Name",
        "items": ["id1"], 
        "reasoning": "Reason"
      }
    }
  `;

  const fullPrompt = systemPrompt + "\n\nUser Message: " + message;

  try {
    // Primary Attempt: Google Cloud
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
    const client = new GoogleGenAI({ apiKey });
    const model = "gemini-3-flash-preview"; 

    const result = await client.models.generateContent({
      model: model,
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      config: { responseMimeType: "application/json" }
    });

    if (!result.text) throw new Error("Cloud AI returned empty.");
    return JSON.parse(result.text);

  } catch (cloudError) {
    console.warn("Cloud API choked. Sliding into the local Ollama backend...");

    // Secondary Attempt: Local Hardware Failover
    try {
      const ollamaRes = await fetch("http://127.0.0.1:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3", 
          prompt: fullPrompt,
          format: "json", 
          stream: false
        })
      });

      const ollamaData = await ollamaRes.json();
      
      if (!ollamaData.response) throw new Error("Local model returned nothing.");
      return JSON.parse(ollamaData.response);

    } catch (localError) {
      console.error("Total system failure:", localError);
      return { 
        reply: "Both the cloud and my local brain just shit the bed. Check your terminal.", 
        action: "NONE" 
      };
    }
  }
}