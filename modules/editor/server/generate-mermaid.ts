"use server";

import { generateText } from "ai";
import { createGroq, groq } from "@ai-sdk/groq";

export const generateMermaidCode = async (prompt: string) => {
  try {
   

    const { text } = await generateText({
      model: groq("openai/gpt-oss-120b"),
      prompt: `Generate a Mermaid.js diagram for the following request: "${prompt}". 
      Respond ONLY with the raw valid Mermaid code block. Do NOT include markdown formatting like \`\`\`mermaid or \`\`\`. 
      Start directly with the diagram type (e.g. graph TD, sequenceDiagram, pie, etc). Do not add any conversational text or explanation.`,
    });

    // Ensure we strictly extract exactly what is inside the markdown block 
    // if the AI decided to be conversational.
    let cleanText = text;
    const mermaidMatch = text.match(/```(?:mermaid)?([\s\S]*?)```/i);
    if (mermaidMatch) {
      cleanText = mermaidMatch[1].trim();
    } else {
      // Fallback if no codeblocks were used
      cleanText = cleanText.replace(/```mermaid/gi, "").replace(/```/g, "").trim();
    }

    // Securely encode to URL-safe base64 on the server
    // This perfectly prevents + or / characters from breaking the URL
    const base64Code = Buffer.from(cleanText, "utf-8").toString("base64url");
    
    // Create the image URL using the IMG endpoint (which returns PNG) 
    // This makes it extremely easy to download as a standard image file!
    const imageUrl = `https://mermaid.ink/img/${base64Code}?type=png`;

    return { data: imageUrl };
  } catch (error) {
    console.error("Error generating mermaid:", error);
    return { error: "Failed to generate diagram." };
  }
};
